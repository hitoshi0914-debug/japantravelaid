#!/usr/bin/env python3
"""JT の喫煙所マップ（CLUB JT、https://www.clubjt.jp/map/）の喫煙所・喫煙できるお店を集めて
clubjt.json.gz に書く。2026-10-23 ユーザー「JT のサイトも協力してもらえそう（データ提供はできない）。
ゆっくり巡回して、まずは東京から」により追加。

地図と同じ API（https://user-api.clubjt.jp/areaSpot?tile=<ズーム16のクアッドキー>&zoom=16）を
タイルごとに 1 回ずつ呼ぶ。先方の負担を減らすため WAIT_SEC 秒に 1 回まで、1 回の実行は --max-minutes 分まで。
取ったタイルと日付を保存し、次の実行は続きから（--refresh-days より古いタイルは取り直す）。
外部ライブラリは使わない。
"""
from __future__ import annotations

import argparse
import gzip
import json
import math
import sys
import time
import urllib.request
from datetime import date, timedelta
from pathlib import Path

API = "https://user-api.clubjt.jp/areaSpot?tile={tile}&zoom=16"
HEADERS = {
    "User-Agent": "JapanTravelAid/1.0 (+https://japantravelaid.com/; smoking map)",
    "Referer": "https://www.clubjt.jp/",
    "Accept": "application/json",
}
WAIT_SEC = 1.5
ZOOM = 16
# 巡回する範囲（南, 西, 北, 東）。上から順に取る
# 2026-10-25 ユーザー「タウンクーポンが終わったら JT はどんどん取りに行って」: 東京のあと、観光客の多い順に全国の主な都市へ広げる
REGIONS = {
    "tokyo23": (35.52, 139.56, 35.83, 139.93),
    "tama": (35.57, 139.00, 35.80, 139.56),
    "osaka": (34.40, 135.30, 34.90, 135.70),
    "kyoto": (34.88, 135.65, 35.10, 135.85),
    "yokohama": (35.30, 139.45, 35.62, 139.78),
    "nagoya": (35.00, 136.80, 35.28, 137.05),
    "fukuoka": (33.50, 130.30, 33.70, 130.50),
    "sapporo": (42.95, 141.20, 43.15, 141.50),
    "kobe": (34.62, 135.00, 34.78, 135.30),
    "nara": (34.65, 135.75, 34.72, 135.86),
    "hiroshima": (34.33, 132.38, 34.45, 132.52),
    "naha": (26.15, 127.63, 26.30, 127.80),
    "sendai": (38.20, 140.80, 38.32, 140.95),
    "kanazawa": (36.52, 136.60, 36.62, 136.72),
    "chiba": (35.50, 139.85, 35.85, 140.40),
    "saitama": (35.80, 139.30, 36.05, 139.90),
    "shonan-hakone": (35.18, 139.00, 35.40, 139.50),
}


def log(msg: str) -> None:
    print(msg, file=sys.stderr, flush=True)


def tile_xy(lat: float, lng: float) -> tuple[int, int]:
    s = math.sin(math.radians(lat))
    x = (lng + 180) / 360
    y = 0.5 - math.log((1 + s) / (1 - s)) / (4 * math.pi)
    return int(x * 2**ZOOM), int(y * 2**ZOOM)


def quadkey(tx: int, ty: int) -> str:
    out = ""
    for i in range(ZOOM, 0, -1):
        m = 1 << (i - 1)
        out += str((1 if tx & m else 0) + (2 if ty & m else 0))
    return out


def region_tiles(south: float, west: float, north: float, east: float) -> list[str]:
    x0, y0 = tile_xy(north, west)
    x1, y1 = tile_xy(south, east)
    return [quadkey(x, y) for y in range(y0, y1 + 1) for x in range(x0, x1 + 1)]


def compact(s: dict, tile: str) -> dict:
    return {
        "id": s["id"], "tile": tile,
        "name": s.get("name") or "",
        "lat": s["lat"], "lng": s["lng"],
        "genre": s.get("genre"), "sub": s.get("subGenre"),
        "stype": s.get("smokingType"), "atype": s.get("smokingAreaType"),
        "hours": s.get("openingHours"), "address": s.get("address"),
        "unstable": bool(s.get("isUnstableSpot")), "onlyBuying": bool(s.get("isOnlyBuying")),
        "roof": bool(s.get("hasRoof")), "chair": bool(s.get("hasChair")), "enclosure": bool(s.get("hasEnclosure")),
    }


def fetch(tile: str) -> list[dict]:
    req = urllib.request.Request(API.format(tile=tile), headers=HEADERS)
    with urllib.request.urlopen(req, timeout=60) as res:
        return json.loads(res.read())


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="clubjt.json.gz")
    ap.add_argument("--regions", default=",".join(REGIONS))
    ap.add_argument("--max-minutes", type=float, default=150)
    ap.add_argument("--refresh-days", type=int, default=30)
    args = ap.parse_args()

    out = Path(args.out)
    state = json.loads(gzip.decompress(out.read_bytes())) if out.exists() else {"tiles": {}, "spots": {}}
    stale = (date.today() - timedelta(days=args.refresh_days)).isoformat()
    todo = []
    for name in args.regions.split(","):
        todo += [t for t in region_tiles(*REGIONS[name]) if state["tiles"].get(t, "") < stale]
    todo = list(dict.fromkeys(todo))
    log(f"取るタイル {len(todo)} 枚（保存済みのお店・喫煙所 {len(state['spots'])} 件）")

    def save() -> None:
        state["complete"] = not todo[done:]
        out.write_bytes(gzip.compress(json.dumps(state, ensure_ascii=False, separators=(",", ":")).encode()))

    deadline = time.time() + args.max_minutes * 60
    done, errors = 0, 0
    for tile in todo:
        if time.time() > deadline:
            break
        try:
            spots = fetch(tile)
            errors = 0
        except Exception as e:  # noqa: BLE001
            errors += 1
            log(f"  {tile}: {e}")
            if errors >= 5:
                log("続けて失敗したので止めます")
                break
            time.sleep(30 * errors)
            continue
        for k in [k for k, v in state["spots"].items() if v["tile"] == tile]:
            del state["spots"][k]
        for s in spots:
            if s.get("lat") is not None and s.get("lng") is not None:
                state["spots"][str(s["id"])] = compact(s, tile)
        state["tiles"][tile] = date.today().isoformat()
        done += 1
        if done % 200 == 0:
            log(f"  {done}/{len(todo)} 枚（{len(state['spots'])} 件）")
            save()
        time.sleep(WAIT_SEC)
    save()
    log(f"{done} 枚を取りました。残り {len(todo) - done} 枚。保存済み {len(state['spots'])} 件")
    return 0


if __name__ == "__main__":
    sys.exit(main())
