#!/usr/bin/env python3
"""OSM（Overpass API）から日本全国の薬局・ドラッグストアを取って、地図で使うタイルを public/pharmacy/ に書く。

- t/<緯度>_<経度>.json … 0.05 度（約 5km）四方のタイル。地図は現在地のまわりの 9 枚を読み込む
- index.json … タイルの一覧・件数・出典（OSM、ODbL）
- 各項目: lat, lng, n（名前）, e（英語名、あれば）, k（d=ドラッグストア＝市販薬あり / p=調剤薬局）, h（営業時間 opening_hours、あれば）
- 薬の商品名は扱わない。名前・種類・営業時間だけ

使い方:
  python3 scripts/pharmacy/build_pharmacies.py                          # Overpass から取得
  python3 scripts/pharmacy/build_pharmacies.py --overpass-file osm.json # 取得済みの応答を使う
"""
from __future__ import annotations

import argparse
import json
import math
import shutil
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

OUT = Path("public/pharmacy")
TILE = 0.05
OVERPASS_URLS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.private.coffee/api/interpreter",
    "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
]
OVERPASS_QUERY = """
[out:json][timeout:300];
area["ISO3166-1"="JP"][admin_level=2]->.jp;
(
  nwr["amenity"="pharmacy"](area.jp);
  nwr["shop"="chemist"](area.jp);
);
out center tags;
"""
USER_AGENT = "japantravelaid-pharmacy-finder/0.1 (+https://japantravelaid.com/en/medicine/drugstores/)"
SOURCE = {"id": "osm", "name": "OpenStreetMap", "license": "ODbL 1.0", "url": "https://www.openstreetmap.org/copyright"}
# 名前に「薬局」が付いていても市販薬を広く売るドラッグストアのチェーン
DRUGSTORE_WORDS = (
    "ドラッグ", "drug", "マツモトキヨシ", "マツキヨ", "ウエルシア", "ツルハ", "スギ薬局", "ココカラファイン", "サンドラッグ",
    "ダイコク", "コスモス", "クリエイト", "カワチ", "トモズ", "セイムス", "キリン堂", "クスリのアオキ", "ゲンキー", "サツドラ",
    "ククル", "コクミン", "ドラモリ", "ザグザグ", "レディ薬局", "ウォンツ", "くすりの福太郎", "富士薬品",
    "V・drug", "ヤックス", "B&D",
)


def log(msg: str) -> None:
    print(msg, file=sys.stderr, flush=True)


def fetch_overpass() -> dict:
    data = urllib.parse.urlencode({"data": OVERPASS_QUERY}).encode()
    errors = []
    for attempt in range(2):
        for url in OVERPASS_URLS:
            log(f"Overpass API から取得中…（{url}）")
            try:
                req = urllib.request.Request(url, data=data, headers={"User-Agent": USER_AGENT})
                with urllib.request.urlopen(req, timeout=360) as res:
                    payload = json.load(res)
                if payload.get("elements"):
                    return payload
                errors.append(f"{url}: 0 件")
            except Exception as e:  # 混雑（429/504）・タイムアウトは次のサーバーへ
                errors.append(f"{url}: {e}")
                log(f"  失敗: {e}")
        time.sleep(30)
    raise RuntimeError("Overpass API から取得できませんでした: " + " / ".join(errors))


def kind(tags: dict) -> str:
    name = (tags.get("name", "") + " " + tags.get("brand", "")).lower()
    if tags.get("shop") in ("chemist", "drugstore") or any(w.lower() in name for w in DRUGSTORE_WORDS):
        return "d"
    return "p"


def to_item(el: dict) -> dict | None:
    tags = el.get("tags") or {}
    lat = el.get("lat", (el.get("center") or {}).get("lat"))
    lng = el.get("lon", (el.get("center") or {}).get("lon"))
    if lat is None or lng is None or tags.get("disused") or tags.get("opening_hours") == "closed":
        return None
    item = {"lat": round(lat, 6), "lng": round(lng, 6), "n": (tags.get("name") or tags.get("brand") or "").strip(), "k": kind(tags)}
    en = tags.get("name:en") or tags.get("brand:en")
    if en and en != item["n"]:
        item["e"] = en.strip()
    if tags.get("opening_hours"):
        item["h"] = tags["opening_hours"].strip()
    return item


def tile_key(lat: float, lng: float) -> str:
    return f"{math.floor(lat / TILE)}_{math.floor(lng / TILE)}"


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--overpass-file", help="取得済みの Overpass 応答 JSON（API を呼ばない）")
    ap.add_argument("--out", default=str(OUT))
    args = ap.parse_args()
    payload = json.loads(Path(args.overpass_file).read_text()) if args.overpass_file else fetch_overpass()

    tiles: dict[str, list] = {}
    seen = set()
    for el in payload.get("elements", []):
        item = to_item(el)
        if not item:
            continue
        key = (round(item["lat"], 4), round(item["lng"], 4))  # 約 10m 以内の同じ名前は1件に
        if (key, item["n"]) in seen:
            continue
        seen.add((key, item["n"]))
        tiles.setdefault(tile_key(item["lat"], item["lng"]), []).append(item)
    count = sum(len(v) for v in tiles.values())
    if count == 0:
        raise SystemExit("薬局が 0 件なので書き出しません")

    out = Path(args.out)
    shutil.rmtree(out / "t", ignore_errors=True)
    (out / "t").mkdir(parents=True)
    for k, items in tiles.items():
        (out / "t" / f"{k}.json").write_text(json.dumps(items, ensure_ascii=False, separators=(",", ":")))
    index = {
        "tile": TILE,
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "sources": [SOURCE],
        "count": count,
        "tiles": sorted(tiles),
    }
    (out / "index.json").write_text(json.dumps(index, ensure_ascii=False, separators=(",", ":")))
    log(f"{count} 件・{len(tiles)} タイルを {out} に書きました")


if __name__ == "__main__":
    main()
