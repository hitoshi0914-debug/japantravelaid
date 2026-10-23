#!/usr/bin/env python3
"""fetch_town_coupon.py・fetch_clubjt.py の結果から、地図で使うファイルを public/smoking/shops/ に書く。

- f/<緯度>_<経度>.json … 誰でも使える喫煙所（タウンクーポンの「フリー喫煙所」と CLUB JT の喫煙所。
  OSM の喫煙所（spots.json）から 30m 以内のものは同じ場所とみなして除く）。地図でいつも現在地のまわりの 9 枚を読み込み、公衆喫煙所と同じように出す
- t/<緯度>_<経度>.json … 喫煙できるお店（注文が必要）。地図で「喫煙できるお店も表示」を選んだときだけ、現在地のまわりの 9 枚を読み込む。
  CLUB JT のお店は、タウンクーポンのお店から 20m 以内なら同じ店とみなして除く
- タイルは 0.02 度（約 2km）四方。index.json … タイルの一覧・件数・出典
- 各項目の src は出典（tc=タウンクーポン / jt=CLUB JT）

使い方: python3 scripts/smoking/make_shop_tiles.py town_coupon.json [--clubjt clubjt.json.gz]
"""
from __future__ import annotations

import argparse
import gzip
import json
import math
import re
import shutil
import sys
import unicodedata
from datetime import datetime, timezone
from pathlib import Path

OUT = Path("public/smoking/shops")
TILE = 0.02
SOURCES = {
    "tc": {"id": "town-coupon", "name": "タウンクーポン（たばこすう）", "license": "掲載許可済み", "url": "https://www.town-coupon.com/"},
    "jt": {"id": "clubjt", "name": "CLUB JT 喫煙所マップ（JT）", "license": "JT の協力", "url": "https://www.clubjt.jp/map/"},
}
# CLUB JT で載せないもの: シーシャ（紙巻き・加熱式とは別）、たばこを売るだけの店
JT_SKIP_GENRES = {"SHISHA"}


def tile_key(lat: float, lng: float) -> str:
    return f"{math.floor(lat / TILE)}_{math.floor(lng / TILE)}"


def short_address(addr: str) -> str:
    # 「…１丁目１−１ メトロプラザ5 1F　店名」の店名部分は除く（全角スペースのあとは店名のことが多い）
    return unicodedata.normalize("NFKC", addr.split("　")[0]).strip()


def to_item(s: dict) -> dict | None:
    d = s.get("detail") or {}
    if "lat" not in s:
        return None
    smoke = d.get("喫煙", "")
    tob = d.get("たばこ", "")
    item = {
        "id": f"tc-{s['id']}",
        "lat": s["lat"], "lng": s["lng"],
        "name": s["name"].replace("　", " ").strip(),
        "address": short_address(d.get("address", "")),
        # seat=席で吸える / room=店内の喫煙所で吸える
        "smoke": "seat" if "席" in smoke else "room" if "喫煙所" in smoke or "喫煙室" in smoke else None,
        "tobacco": "heated_only" if "加熱式のみ" in tob else "any" if "全たばこ" in tob or "紙" in tob else "unknown",
        "hours": re.sub(r"\s+", " ", unicodedata.normalize("NFKC", d.get("時間", ""))).strip() or None,
        "url": s["url"],
        "src": "tc",
    }
    return item


def jt_item(s: dict) -> dict | None:
    if s["unstable"] or s["onlyBuying"] or s["genre"] in JT_SKIP_GENRES or s["atype"] == "NO_SMOKING" or s["name"].startswith("TEST"):
        return None
    hours = re.sub(r"\s+", " ", unicodedata.normalize("NFKC", s.get("hours") or "")).strip()
    return {
        "id": f"jt-{s['id']}",
        "lat": round(s["lat"], 6), "lng": round(s["lng"], 6),
        "name": unicodedata.normalize("NFKC", s["name"]).strip(),
        "address": unicodedata.normalize("NFKC", s.get("address") or "").strip(),
        "smoke": "seat" if s["atype"] == "SEAT" else "room" if s["atype"] in ("SMOKING_BOOTH", "GENERAL_SMOKING_AREA") else None,
        "tobacco": "heated_only" if s["stype"] in ("HEATING", "LOW_HEATING") else "any" if s["stype"] == "PAPER_ROLL" else "unknown",
        "hours": hours or None,
        "url": f"https://www.clubjt.jp/map/?lat={s['lat']:.6f}&lng={s['lng']:.6f}",
        "src": "jt",
    }


class Near:
    """近くにすでに載せたものがあるかを調べる（おおよそ 1 度=111km で計算）"""

    def __init__(self, meters: float):
        self.deg = meters / 111_000
        self.cells: dict[tuple[int, int], list[tuple[float, float]]] = {}

    def add(self, lat: float, lng: float) -> None:
        self.cells.setdefault((int(lat / self.deg), int(lng / self.deg)), []).append((lat, lng))

    def has(self, lat: float, lng: float) -> bool:
        cy, cx = int(lat / self.deg), int(lng / self.deg)
        kx = math.cos(math.radians(lat))
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                for a, b in self.cells.get((cy + dy, cx + dx), []):
                    if math.hypot(lat - a, (lng - b) * kx) < self.deg:
                        return True
        return False


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("town_coupon")
    ap.add_argument("--clubjt")
    ap.add_argument("--spots", default="public/smoking/spots.json")
    args = ap.parse_args()

    free, shops = [], []
    tc = json.loads(Path(args.town_coupon).read_text(encoding="utf-8"))
    for s in tc["shops"]:
        item = to_item(s)
        if item:
            (free if "free-smoking-area" in s["categories"] else shops).append(item)
    used = {"tc"}
    if args.clubjt and Path(args.clubjt).exists():
        osm, near_shop = Near(30), Near(20)
        for sp in json.loads(Path(args.spots).read_text(encoding="utf-8"))["spots"]:
            osm.add(sp["lat"], sp["lng"])
        for x in free:
            osm.add(x["lat"], x["lng"])
        for x in shops:
            near_shop.add(x["lat"], x["lng"])
        jt = json.loads(gzip.decompress(Path(args.clubjt).read_bytes()))
        before = len(free) + len(shops)
        for s in sorted(jt["spots"].values(), key=lambda v: v["id"]):
            item = jt_item(s)
            if not item:
                continue
            if s["genre"] == "SMOKING_SPOT":
                if not osm.has(item["lat"], item["lng"]):
                    free.append(item)
                    osm.add(item["lat"], item["lng"])
            elif not near_shop.has(item["lat"], item["lng"]):
                shops.append(item)
                near_shop.add(item["lat"], item["lng"])
        if len(free) + len(shops) > before:
            used.add("jt")

    def tiled(items: list[dict]) -> dict[str, list[dict]]:
        out: dict[str, list[dict]] = {}
        for x in items:
            out.setdefault(tile_key(x["lat"], x["lng"]), []).append(x)
        return out

    if OUT.exists():
        shutil.rmtree(OUT)
    dump = lambda obj: json.dumps(obj, ensure_ascii=False, separators=(",", ":"))  # noqa: E731
    index = {"tile": TILE, "sources": [SOURCES[k] for k in ("tc", "jt") if k in used]}
    for kind, items in (("t", shops), ("f", free)):
        tiles = tiled(items)
        (OUT / kind).mkdir(parents=True)
        for key, its in tiles.items():
            its.sort(key=lambda x: x["id"])
            (OUT / kind / f"{key}.json").write_text(dump(its), encoding="utf-8")
        index["shops" if kind == "t" else "free"] = len(items)
        index["tiles" if kind == "t" else "freeTiles"] = sorted(tiles)
    (OUT / "index.json").write_text(dump(index), encoding="utf-8")
    print(f"誰でも使える喫煙所 {len(free)} 件・お店 {len(shops)} 件を {OUT} に書きました", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
