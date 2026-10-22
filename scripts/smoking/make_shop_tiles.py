#!/usr/bin/env python3
"""fetch_town_coupon.py の結果から、地図で使うファイルを public/smoking/shops/ に書く。

- free.json … 誰でも使えるフリー喫煙所（タウンクーポンの「フリー喫煙所」）。地図でいつも読み込み、公衆喫煙所と同じように出す
- t/<緯度>_<経度>.json … 喫煙できるお店（注文が必要）。0.02 度（約 2km）四方ごとに分け、
  地図で「喫煙できるお店も表示」を選んだときだけ、現在地のまわりの 9 枚を読み込む
- index.json … お店のあるタイルの一覧・件数・出典

使い方: python3 scripts/smoking/make_shop_tiles.py town_coupon.json
"""
from __future__ import annotations

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
SOURCE = {"id": "town-coupon", "name": "タウンクーポン（たばこすう）", "license": "掲載許可済み", "url": "https://www.town-coupon.com/"}


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
    }
    return item


def main() -> int:
    state = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    free, tiles = [], {}
    for s in state["shops"]:
        item = to_item(s)
        if not item:
            continue
        if "free-smoking-area" in s["categories"]:
            free.append(item)
        else:
            tiles.setdefault(tile_key(item["lat"], item["lng"]), []).append(item)
    if OUT.exists():
        shutil.rmtree(OUT)
    (OUT / "t").mkdir(parents=True)
    dump = lambda obj: json.dumps(obj, ensure_ascii=False, separators=(",", ":"))  # noqa: E731
    free.sort(key=lambda x: x["id"])
    (OUT / "free.json").write_text(dump(free), encoding="utf-8")
    for key, items in tiles.items():
        items.sort(key=lambda x: x["id"])
        (OUT / "t" / f"{key}.json").write_text(dump(items), encoding="utf-8")
    index = {
        "tile": TILE,
        "source": SOURCE,
        "shops": sum(len(v) for v in tiles.values()),
        "free": len(free),
        "tiles": sorted(tiles),
    }
    (OUT / "index.json").write_text(dump(index), encoding="utf-8")
    print(f"フリー喫煙所 {len(free)} 件・お店 {index['shops']} 件（タイル {len(tiles)} 枚）を {OUT} に書きました", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
