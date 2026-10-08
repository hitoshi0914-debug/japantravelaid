#!/usr/bin/env python3
"""喫煙所データを集めて public/smoking/spots.json（スキーマは SCHEMA.md）を作る。

データ源:
  1. OpenStreetMap Overpass API … 日本国内の amenity=smoking_area（ODbL、出典表示が必要）
  2. 自治体オープンデータの CSV/JSON … 例: 台東区の公衆喫煙所一覧（CC BY 4.0 が多い）

自治体ごとに列名が違うので、列の対応は MUNICIPAL_SOURCES に書く。
同じ場所が両方に載っている場合（MERGE_RADIUS_M 以内）は自治体データを優先して 1 件にまとめる。

市区町村（area）の判定:
  Geolonia 住所データ（全国の町丁目と代表点・市区町村名のローマ字、CC BY 4.0）を使う。
  1. 住所が「東京都台東区…」のように書いてあれば、その市区町村
  2. 住所がなければ（OSM の大半）、いちばん近い町丁目の代表点の市区町村（境界付近は隣の市区町村になることがある）
  初回はダウンロードして scripts/smoking/cache/ に保存する（約 50MB、git には入れない）。

使い方:
  python3 scripts/smoking/build_spots.py --taito-csv scripts/smoking/sample/taito_sample.csv
  python3 scripts/smoking/build_spots.py --taito-csv https://.../smoking.csv          # URL でも可
  python3 scripts/smoking/build_spots.py --municipal shibuya=https://…/shibuya.csv  # 区の CSV（区名・スラッグ・市区町村コードのどれでも）
  python3 scripts/smoking/build_spots.py --overpass-file cache/osm.json               # 取得済みの Overpass 応答を使う
  python3 scripts/smoking/build_spots.py --no-osm --taito-csv ...                     # OSM を使わない

外部ライブラリは使わない（Python 3.10 以上の標準ライブラリのみ）。
"""
from __future__ import annotations

import argparse
import csv
import io
import json
import math
import sys
import time
import urllib.parse
import urllib.request
from datetime import date, datetime, timezone
from pathlib import Path

# 公開 Overpass サーバーは混むと 504 を返すので、順に試す（同じ OSM データの別サーバー）。
OVERPASS_URLS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.private.coffee/api/interpreter",
    "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
]
# 日本全土の喫煙所。way（エリアとして描かれた喫煙所）は中心点を使う。
OVERPASS_QUERY = """
[out:json][timeout:180];
area["ISO3166-1"="JP"][admin_level=2]->.jp;
(
  node["amenity"="smoking_area"](area.jp);
  way["amenity"="smoking_area"](area.jp);
);
out center tags;
"""
USER_AGENT = "japan-smoking-area-finder/0.1 (+https://japantravelaid.com/smoking/)"
MERGE_RADIUS_M = 25.0
TOWNS_URL = "https://raw.githubusercontent.com/geolonia/japanese-addresses/master/data/latest.csv"
TOWNS_CACHE = Path(__file__).parent / "cache" / "geolonia-latest.csv"
# 住所がない喫煙所を市区町村に割り当てるとき、この距離より遠い町丁目しかなければ割り当てない。
AREA_MAX_DISTANCE_M = 5000.0

# 喫煙可の飲食店は載せない（ユーザー決定 2026-10-07）。OSM で飲食店に付いた喫煙所を名前・タグで外す。
RESTAURANT_TAGS = ("cuisine",)
RESTAURANT_WORDS = ("喫茶", "カフェ", "居酒屋", "レストラン", "食堂", "ラーメン", "焼肉", "バー ", "cafe", "café", "restaurant", "izakaya", "diner")
JAPAN_BBOX = (20.0, 122.0, 46.0, 154.0)  # 南, 西, 北, 東

# 自治体データの列の対応。キーは --<key>-csv / --<key>-json の引数名になる。
# 実際の CSV を入れたら列名をここで合わせる（カタログによって「名称」「施設名」などと揺れる）。
MUNICIPAL_SOURCES = {
    "taito": {
        "source_id": "taito-city",
        "name": "台東区 公衆喫煙所一覧",
        "license": "CC BY 4.0",
        "url": "https://www.city.taito.lg.jp/",
        "city": {"ja": "台東区", "en": "Taito City"},
        "columns": {
            "id": ["ID", "No", "No.", "番号", "通し番号"],
            "name_ja": ["名称", "施設名", "喫煙所名", "設置場所"],
            "name_en": ["名称_英語", "名称（英語）", "Name", "名称_英字"],
            "address_ja": ["住所", "所在地", "所在地_連結表記"],
            "lat": ["緯度", "lat", "Latitude", "LAT"],
            "lng": ["経度", "lon", "lng", "Longitude", "LON"],
            "type": ["種別", "形態", "設置形態", "種類"],
            "tobacco": ["たばこの種類", "対象たばこ", "喫煙可能なたばこ"],
            "hours": ["利用可能時間", "開設時間", "時間", "利用時間"],
            "note": ["備考"],
        },
    },
}

# --municipal <市区町村コード>=<CSV/JSON> で使う、列名の候補（台東区と同じ）。
GENERIC_COLUMNS = MUNICIPAL_SOURCES["taito"]["columns"]

# 自治体データの「種別」の値 → スキーマの type
TYPE_WORDS = {
    "booth": ["コンテナ", "ブース", "ボックス", "トレーラー", "booth", "container"],
    "indoor": ["屋内", "室内", "indoor"],
    "outdoor": ["屋外", "パーティション", "開放", "outdoor", "open"],
}


def log(msg: str) -> None:
    print(msg, file=sys.stderr)


def haversine_m(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    r = 6_371_000.0
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp, dl = p2 - p1, math.radians(lng2 - lng1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(a))


def in_japan(lat: float, lng: float) -> bool:
    s, w, n, e = JAPAN_BBOX
    return s <= lat <= n and w <= lng <= e


def read_text(src: str) -> str:
    """ローカルのパスか URL を読む。自治体 CSV は Shift_JIS のことが多いので順に試す。"""
    if src.startswith(("http://", "https://")):
        req = urllib.request.Request(src, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=60) as res:
            raw = res.read()
    else:
        raw = Path(src).read_bytes()
    for enc in ("utf-8-sig", "cp932", "shift_jis", "euc_jp"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    raise ValueError(f"文字コードを判定できません: {src}")


HEATED_ONLY_WORDS = ["加熱式たばこ専用", "加熱式専用", "加熱式のみ", "加熱式たばこのみ", "heated tobacco only", "heat-not-burn only"]
ANY_TOBACCO_WORDS = ["紙巻", "紙たばこ", "全て", "すべて", "cigarettes ok"]


def guess_tobacco(texts: list[str | None], spot_type: str) -> str:
    """紙巻き可（any）／加熱式のみ（heated_only）／不明（unknown）。
    書かれていなければ、屋外の喫煙所は紙巻きも吸える前提にする
    （「加熱式たばこ専用」は健康増進法の屋内喫煙室の区分なので、屋外には基本的にない）。"""
    joined = " ".join(t for t in texts if t).lower()
    if any(w.lower() in joined for w in HEATED_ONLY_WORDS):
        return "heated_only"
    if any(w.lower() in joined for w in ANY_TOBACCO_WORDS):
        return "any"
    if spot_type == "outdoor":
        return "any"
    return "unknown"


def blank_spot() -> dict:
    return {
        "id": "",
        "lat": 0.0,
        "lng": 0.0,
        "name": {},
        "address": {},
        "type": "unknown",
        "access": "unknown",
        "fee": None,
        "hours": None,
        "note": None,
        "sources": [],
        "updated": None,
        "tobacco": "unknown",
        "area": None,
    }


# ---------- OpenStreetMap ----------

def fetch_overpass() -> dict:
    data = urllib.parse.urlencode({"data": OVERPASS_QUERY}).encode()
    errors = []
    for attempt in range(2):
        for url in OVERPASS_URLS:
            log(f"Overpass API から取得中…（{url}、数十秒かかることがあります）")
            try:
                req = urllib.request.Request(url, data=data, headers={"User-Agent": USER_AGENT})
                with urllib.request.urlopen(req, timeout=240) as res:
                    payload = json.load(res)
                if payload.get("elements"):
                    return payload
                errors.append(f"{url}: 0 件")
            except Exception as e:  # 混雑（429/504）・タイムアウトは次のサーバーへ
                errors.append(f"{url}: {e}")
                log(f"  失敗: {e}")
        time.sleep(30)
    raise RuntimeError("Overpass API から取得できませんでした: " + " / ".join(errors))


def osm_type(tags: dict) -> str:
    if tags.get("indoor") == "yes" or tags.get("location") == "indoor":
        return "indoor"
    if tags.get("shelter") == "yes" or tags.get("booth") == "yes" or tags.get("building"):
        return "booth"
    if tags.get("location") == "outdoor" or tags.get("indoor") == "no":
        return "outdoor"
    return "unknown"


def osm_access(tags: dict) -> str:
    a = tags.get("access")
    if a in (None, "", "yes", "public", "permissive"):
        return "public" if a else "unknown"
    if a in ("customers", "private", "employees", "no"):
        return "customers"
    return "unknown"


def osm_tobacco(tags: dict, spot_type: str) -> str:
    if tags.get("heated_tobacco") == "only":
        return "heated_only"
    if tags.get("cigarettes") == "yes":
        return "any"
    texts = [str(v) for k, v in tags.items() if k.startswith(("name", "description", "note", "smoking"))]
    return guess_tobacco(texts, spot_type)


def is_restaurant(tags: dict) -> bool:
    if any(k in tags for k in RESTAURANT_TAGS):
        return True
    names = " ".join(str(v) for k, v in tags.items() if k.startswith("name")).lower()
    return any(w.lower() in names for w in RESTAURANT_WORDS)


def from_osm(payload: dict) -> list[dict]:
    spots, restaurants = [], 0
    for el in payload.get("elements", []):
        tags = el.get("tags", {})
        if tags.get("amenity") != "smoking_area":
            continue
        if is_restaurant(tags):
            restaurants += 1
            continue
        lat = el.get("lat", el.get("center", {}).get("lat"))
        lng = el.get("lon", el.get("center", {}).get("lon"))
        if lat is None or lng is None or not in_japan(lat, lng):
            continue
        s = blank_spot()
        s["id"] = f"osm-{el['type']}-{el['id']}"
        s["lat"], s["lng"] = round(lat, 7), round(lng, 7)
        for key, lang in (("name", "ja"), ("name:ja", "ja"), ("name:en", "en"), ("name:ko", "ko"),
                          ("name:zh-Hant", "zh-Hant"), ("name:zh-Hans", "zh-Hans"), ("name:zh", "zh-Hans")):
            if tags.get(key) and lang not in s["name"]:
                s["name"][lang] = tags[key]
        addr = "".join(tags.get(k, "") for k in ("addr:province", "addr:city", "addr:quarter",
                                                   "addr:neighbourhood", "addr:block_number", "addr:housenumber"))
        if addr:
            s["address"]["ja"] = addr
        s["type"] = osm_type(tags)
        s["access"] = osm_access(tags)
        if "fee" in tags:
            s["fee"] = tags["fee"] == "yes"
        s["hours"] = tags.get("opening_hours")
        s["note"] = tags.get("description") or tags.get("note")
        s["sources"] = [{"source": "osm", "ref": f"{el['type']}/{el['id']}"}]
        s["updated"] = (tags.get("check_date") or tags.get("survey:date") or None)
        s["tobacco"] = osm_tobacco(tags, s["type"])
        spots.append(s)
    if restaurants:
        log(f"  OSM: 飲食店の喫煙所とみられる {restaurants} 件を除外")
    return spots


# ---------- 自治体オープンデータ ----------

def pick(row: dict, names: list[str]) -> str | None:
    for n in names:
        v = row.get(n)
        if v is not None and str(v).strip():
            return str(v).strip()
    return None


def guess_type(text: str | None) -> str:
    if not text:
        return "unknown"
    low = text.lower()
    for t, words in TYPE_WORDS.items():
        if any(w.lower() in low for w in words):
            return t
    return "unknown"


def from_municipal(key: str, src: str, fmt: str, conf: dict | None = None) -> list[dict]:
    conf = conf or MUNICIPAL_SOURCES[key]
    cols = conf["columns"]
    text = read_text(src)
    if fmt == "csv":
        rows = list(csv.DictReader(io.StringIO(text)))
    else:
        data = json.loads(text)
        rows = data if isinstance(data, list) else data.get("items") or data.get("features") or []
        # GeoJSON の場合は properties と座標を平らにする
        rows = [
            {**r.get("properties", {}), "lng": r["geometry"]["coordinates"][0], "lat": r["geometry"]["coordinates"][1]}
            if isinstance(r, dict) and r.get("type") == "Feature" else r
            for r in rows
        ]
    spots, skipped = [], 0
    for i, row in enumerate(rows, 1):
        try:
            lat = float(pick(row, cols["lat"]) or "")
            lng = float(pick(row, cols["lng"]) or "")
        except ValueError:
            skipped += 1
            continue
        if not in_japan(lat, lng):
            skipped += 1
            continue
        s = blank_spot()
        s["id"] = f"{conf['source_id']}-{pick(row, cols['id']) or i}"
        s["lat"], s["lng"] = round(lat, 7), round(lng, 7)
        if (v := pick(row, cols["name_ja"])):
            s["name"]["ja"] = v
        if (v := pick(row, cols["name_en"])):
            s["name"]["en"] = v
        if (v := pick(row, cols["address_ja"])):
            s["address"]["ja"] = v
        s["type"] = guess_type(pick(row, cols["type"]))
        s["access"] = "public"  # 自治体の公衆喫煙所は誰でも使える前提
        s["fee"] = False
        s["hours"] = pick(row, cols["hours"])
        s["note"] = pick(row, cols["note"])
        s["tobacco"] = guess_tobacco([pick(row, cols["tobacco"]), pick(row, cols["type"]), s["note"], s["name"].get("ja")], s["type"])
        s["sources"] = [{"source": conf["source_id"], "ref": pick(row, cols["id"]) or str(i)}]
        s["updated"] = date.today().isoformat()
        spots.append(s)
    if skipped:
        log(f"  {key}: 座標がない・日本国外の {skipped} 行をスキップ")
    return spots


# ---------- 結合 ----------

def merge(primary: list[dict], secondary: list[dict]) -> list[dict]:
    """primary（自治体）を優先し、近くにある secondary（OSM）は情報を補うだけにする。"""
    out = [dict(s) for s in primary]
    # 0.01 度（約 1km）のグリッドで近傍だけ比べる
    grid: dict[tuple[int, int], list[int]] = {}
    for idx, s in enumerate(out):
        grid.setdefault((int(s["lat"] * 100), int(s["lng"] * 100)), []).append(idx)

    merged = 0
    for s in secondary:
        gy, gx = int(s["lat"] * 100), int(s["lng"] * 100)
        best, best_d = None, MERGE_RADIUS_M
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                for idx in grid.get((gy + dy, gx + dx), []):
                    d = haversine_m(s["lat"], s["lng"], out[idx]["lat"], out[idx]["lng"])
                    if d <= best_d:
                        best, best_d = idx, d
        if best is None:
            out.append(s)
            grid.setdefault((gy, gx), []).append(len(out) - 1)
            continue
        target = out[best]
        for lang, v in s["name"].items():
            target["name"].setdefault(lang, v)
        for lang, v in s["address"].items():
            target["address"].setdefault(lang, v)
        for k in ("hours", "note"):
            target[k] = target[k] or s[k]
        if target["type"] == "unknown":
            target["type"] = s["type"]
        if target["tobacco"] == "unknown":
            target["tobacco"] = s["tobacco"]
        target["sources"] = target["sources"] + s["sources"]
        merged += 1
    log(f"結合: 自治体 {len(primary)} 件 + OSM {len(secondary)} 件 → {len(out)} 件（重複 {merged} 件をまとめた）")
    return out


# ---------- 市区町村（area） ----------

CITY_SUFFIX = {"KU": "-ku", "CHO": "-cho", "MACHI": "-machi", "MURA": "-mura", "SON": "-son"}


def city_words(romaji: str) -> tuple[list[str], str]:
    """'SAPPORO SHI CHUO KU' → (['sapporo', 'chuo'], 'KU')。郡名（… GUN）は落とす。"""
    words = romaji.split()
    if "GUN" in words:
        words = words[words.index("GUN") + 1:]
    kept, last = [], ""
    for w in words:
        if w in ("SHI", "KU", "CHO", "MACHI", "MURA", "SON"):
            last = w
            continue
        kept.append(w.lower())
    return kept, last


def load_municipalities(src: str | None) -> tuple[dict, dict]:
    """(市区町村コード → 情報, 0.01度グリッド → [(lat, lng, コード)]) を返す。"""
    if src:
        text = read_text(src)
    else:
        if not TOWNS_CACHE.exists():
            log("Geolonia 住所データをダウンロード中…（約 50MB、初回のみ）")
            TOWNS_CACHE.parent.mkdir(parents=True, exist_ok=True)
            req = urllib.request.Request(TOWNS_URL, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=600) as res:
                TOWNS_CACHE.write_bytes(res.read())
        text = TOWNS_CACHE.read_text(encoding="utf-8")
    cities: dict[str, dict] = {}
    grid: dict[tuple[int, int], list[tuple[float, float, str]]] = {}
    for r in csv.DictReader(io.StringIO(text)):
        code = r["市区町村コード"]
        if code not in cities:
            pref_en = r["都道府県名ローマ字"].split()[0].title()
            words, suffix = city_words(r["市区町村名ローマ字"])
            name_en = " ".join(w.title() for w in words) + CITY_SUFFIX.get(suffix, "")
            cities[code] = {
                "code": code, "pref": r["都道府県名"], "city": r["市区町村名"],
                "pref_en": pref_en, "city_en": name_en,
                "slug": "-".join([pref_en.lower(), *words]),
                "_suffix": suffix.lower(),
            }
        try:
            lat, lng = float(r["緯度"]), float(r["経度"])
        except ValueError:
            continue
        grid.setdefault((int(lat * 100), int(lng * 100)), []).append((lat, lng, code))
    # 同じ都道府県で「◯◯市」と「◯◯町」が同じスラッグになったら、町村のほうに種別を付けて区別する。
    seen: dict[str, str] = {}
    for code in sorted(cities):
        c = cities[code]
        if c["slug"] in seen:
            c["slug"] = f"{c['slug']}-{c['_suffix'] or code}"
        seen[c["slug"]] = code
    for c in cities.values():
        c.pop("_suffix")
    log(f"市区町村 {len(cities)} 件・町丁目 {sum(len(v) for v in grid.values())} 件を読み込み")
    return cities, grid


def assign_areas(spots: list[dict], cities: dict, grid: dict) -> None:
    # 住所の先頭一致用: 長い名前から試す（「札幌市中央区」を「札幌市」より先に）
    by_name = sorted(((c["pref"], c["city"], code) for code, c in cities.items()), key=lambda x: -len(x[1]))
    by_addr = by_coord = missing = 0
    cell = int(AREA_MAX_DISTANCE_M / 1000) + 1  # 0.01度 ≒ 0.9〜1.1km
    for s in spots:
        addr = s["address"].get("ja", "")
        code = None
        if addr:
            for pref, city, c in by_name:
                if addr.startswith(pref + city) or addr.startswith(city):
                    code = c
                    break
        if code:
            by_addr += 1
        else:
            gy, gx = int(s["lat"] * 100), int(s["lng"] * 100)
            best_d = AREA_MAX_DISTANCE_M
            for dy in range(-cell, cell + 1):
                for dx in range(-cell, cell + 1):
                    for lat, lng, c in grid.get((gy + dy, gx + dx), []):
                        d = haversine_m(s["lat"], s["lng"], lat, lng)
                        if d < best_d:
                            best_d, code = d, c
            if code:
                by_coord += 1
            else:
                missing += 1
        if code:
            c = cities[code]
            s["area"] = {k: c[k] for k in ("code", "pref", "city", "pref_en", "city_en", "slug")}
    log(f"市区町村: 住所から {by_addr} 件・座標から {by_coord} 件・判定できず {missing} 件")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--out", default="public/smoking/spots.json")
    ap.add_argument("--no-osm", action="store_true", help="Overpass API を使わない")
    ap.add_argument("--overpass-file", help="取得済みの Overpass 応答 JSON（API を呼ばない）")
    ap.add_argument("--save-overpass", help="取得した Overpass 応答をこのパスに保存する")
    ap.add_argument("--towns", help="Geolonia 住所データ latest.csv（パスか URL）。省略時はダウンロードしてキャッシュ")
    ap.add_argument("--municipal", action="append", default=[], metavar="CODE=SRC",
                    help="自治体の喫煙所データ（市区町村コード=CSV/JSON のパスか URL）。何度でも指定できる")
    for key in MUNICIPAL_SOURCES:
        ap.add_argument(f"--{key}-csv", help=f"{MUNICIPAL_SOURCES[key]['name']} の CSV（パスか URL）")
        ap.add_argument(f"--{key}-json", help=f"{MUNICIPAL_SOURCES[key]['name']} の JSON/GeoJSON（パスか URL）")
    args = ap.parse_args()

    municipal: list[dict] = []
    used_sources = []
    for key, conf in MUNICIPAL_SOURCES.items():
        for fmt in ("csv", "json"):
            src = getattr(args, f"{key}_{fmt}")
            if src:
                got = from_municipal(key, src, fmt)
                log(f"{conf['name']}: {len(got)} 件")
                municipal += got
                used_sources.append({"id": conf["source_id"], "name": conf["name"],
                                     "license": conf["license"], "url": conf["url"]})

    cities, grid = load_municipalities(args.towns)
    for item in args.municipal:
        key, _, src = item.partition("=")
        # 市区町村コード（13106）、スラッグ（tokyo-taito）、23区は区名（taito）でも指定できる
        c = cities.get(key) or next((v for v in cities.values() if v["slug"] in (key, f"tokyo-{key}")), None)
        code = c["code"] if c else key
        if not c or not src:
            log(f"--municipal {item}: 市区町村コード（または区名）=ファイル の形で指定してください")
            return 2
        conf = {"source_id": f"city-{code}", "name": f"{c['city']} 公衆喫煙所", "license": "CC BY 4.0",
                "url": src if src.startswith("http") else "", "columns": GENERIC_COLUMNS}
        got = from_municipal(code, src, "json" if src.lower().endswith(("json", "geojson")) else "csv", conf)
        log(f"{conf['name']}: {len(got)} 件")
        municipal += got
        used_sources.append({"id": conf["source_id"], "name": conf["name"], "license": conf["license"], "url": conf["url"]})

    osm: list[dict] = []
    if not args.no_osm:
        try:
            payload = json.loads(Path(args.overpass_file).read_text()) if args.overpass_file else fetch_overpass()
            if args.save_overpass:
                Path(args.save_overpass).write_text(json.dumps(payload, ensure_ascii=False))
            osm = from_osm(payload)
            log(f"OpenStreetMap: {len(osm)} 件")
            used_sources.append({"id": "osm", "name": "OpenStreetMap contributors", "license": "ODbL 1.0",
                                 "url": "https://www.openstreetmap.org/copyright"})
        except Exception as e:  # ネットワーク不通でも自治体データだけで出力する
            log(f"OSM の取得に失敗したので自治体データだけで続けます: {e}")

    spots = merge(municipal, osm)
    assign_areas(spots, cities, grid)
    spots.sort(key=lambda s: (s["lat"], s["lng"]))
    used_sources.append({"id": "geolonia", "name": "Geolonia 住所データ（市区町村の判定）", "license": "CC BY 4.0",
                         "url": "https://github.com/geolonia/japanese-addresses"})
    doc = {
        "version": 2,
        "generated_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "sources": used_sources,
        "spots": spots,
    }
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    # 端末に配る量を減らすため、インデントなし・区切りの空白なしで書く
    out.write_text(json.dumps(doc, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    log(f"{out} に {len(spots)} 件を書き出しました（{out.stat().st_size / 1024:.1f} KB）")
    return 0


if __name__ == "__main__":
    sys.exit(main())
