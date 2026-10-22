#!/usr/bin/env python3
"""タウンクーポン（たばこすう、https://www.town-coupon.com/）の喫煙できるお店・喫煙所を集めて
scripts/smoking/town_coupon.json に書く。2026-10-22 先方の協力（掲載情報の取り込み）をいただいて追加。

1. WordPress の REST API（/wp-json/wp/v2/shop_information）で全施設の一覧を取り、
   喫煙のカテゴリ（free-smoking-area・users-smoking-area・tabacco-su）が付いたものだけ残す
2. 前回から更新された施設だけ詳細ページを開き、住所・喫煙の仕方・たばこの種類・時間を読む
3. 住所から国土地理院の住所検索 API で緯度経度を求める

先方のサーバーに負担をかけないよう、1 秒に 1 回まで・1 回の実行で開く詳細ページは --max-details 件まで。
残りは次の実行で続きから取る（ファイルに取れたところまで保存するので、何度でも続けて実行できる）。
外部ライブラリは使わない。
"""
from __future__ import annotations

import argparse
import html
import json
import re
import sys
import time
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path

BASE = "https://www.town-coupon.com"
LIST_URL = BASE + "/wp-json/wp/v2/shop_information?per_page=100&page={page}&_fields=id,slug,link,title,class_list,modified"
GSI_URL = "https://msearch.gsi.go.jp/address-search/AddressSearch?q={q}"
USER_AGENT = "JapanTravelAid/1.0 (+https://japantravelaid.com/; smoking map, with permission)"
SMOKING_CATS = {"free-smoking-area", "users-smoking-area", "tabacco-su"}
WAIT_SEC = 1.0


def log(msg: str) -> None:
    print(msg, file=sys.stderr, flush=True)


def get(url: str, tries: int = 3) -> tuple[bytes, dict]:
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=60) as res:
                return res.read(), dict(res.headers)
        except Exception as e:  # noqa: BLE001
            if i == tries - 1:
                raise
            log(f"  再試行 {url}: {e}")
            time.sleep(5 * (i + 1))
    raise RuntimeError("unreachable")


def list_shops() -> list[dict]:
    shops, page, total_pages = [], 1, 1
    while page <= total_pages:
        body, headers = get(LIST_URL.format(page=page))
        total_pages = int({k.lower(): v for k, v in headers.items()}.get("x-wp-totalpages", total_pages))
        for it in json.loads(body):
            cats = {c[len("shop_category-"):] for c in it.get("class_list", []) if c.startswith("shop_category-")}
            if cats & SMOKING_CATS:
                shops.append({
                    "id": it["id"], "slug": it["slug"], "url": it["link"],
                    "name": html.unescape(it["title"]["rendered"]).strip(),
                    "categories": sorted(cats), "modified": it["modified"],
                })
        if page % 20 == 0:
            log(f"一覧 {page}/{total_pages} ページ、喫煙カテゴリ {len(shops)} 件")
        page += 1
        time.sleep(WAIT_SEC / 2)
    return shops


def text(fragment: str) -> str:
    fragment = re.sub(r"<br\s*/?>", " / ", fragment)
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", fragment))).strip()


def parse_detail(page: str) -> dict:
    out: dict = {}
    m = re.search(r'<iframe[^>]+src="https://maps\.google\.[^"]*?[?&]q=([^"&]+)', page)
    if m:
        out["address"] = html.unescape(urllib.parse.unquote(m.group(1))).strip()
    inner = page[page.find('class="s_i_inner"'):]
    # 店の表（施設名・電話・種別・対象・喫煙・たばこ・時間・備考）。備考の中の入れ子の表は読まない
    for th, td in re.findall(r"<th>\s*([^<]+?)\s*</th>\s*<td>(.*?)</td>\s*</tr>", inner, re.S):
        if th in ("種別", "対象", "喫煙", "たばこ", "時間") and th not in out:
            out[th] = text(td)
        if th == "備考":
            break
    m = re.search(r"喫煙環境.*?<td>(.*?)</td>", inner, re.S)
    if m:
        out["喫煙環境"] = text(m.group(1))
    m = re.search(r"交\s*通.*?<td>(.*?)</td>", inner, re.S)
    if m:
        out["交通"] = text(m.group(1))
    return out


def geocode(address: str) -> tuple[float, float, str] | None:
    # 建物名などは検索の邪魔になるので、番地まで（最初の空白の前）だけで探す
    q = re.split(r"\s", unicodedata.normalize("NFKC", address).strip())[0].replace("−", "-")
    body, _ = get(GSI_URL.format(q=urllib.parse.quote(q)))
    res = json.loads(body)
    if not res:
        return None
    lng, lat = res[0]["geometry"]["coordinates"]
    return round(lat, 6), round(lng, 6), res[0]["properties"].get("title", "")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--out", default="scripts/smoking/town_coupon.json")
    ap.add_argument("--max-details", type=int, default=1500, help="1 回の実行で開く詳細ページの上限")
    ap.add_argument("--list-only", action="store_true", help="一覧だけ取って件数を表示する")
    args = ap.parse_args()

    out = Path(args.out)
    prev = {s["id"]: s for s in json.loads(out.read_text(encoding="utf-8"))["shops"]} if out.exists() else {}

    shops = list_shops()
    log(f"喫煙カテゴリの施設: {len(shops)} 件")
    if args.list_only:
        from collections import Counter
        log(str(Counter(c for s in shops for c in s["categories"])))
        return 0

    fetched = geocoded = 0
    result = []
    for s in shops:
        old = prev.get(s["id"])
        if old and old.get("modified") == s["modified"] and "detail" in old:
            s["detail"] = old["detail"]
            if "lat" in old:
                s["lat"], s["lng"], s["geocoded"] = old["lat"], old["lng"], old.get("geocoded", "")
        elif fetched < args.max_details:
            try:
                body, _ = get(s["url"])
                s["detail"] = parse_detail(body.decode("utf-8", "replace"))
            except Exception as e:  # noqa: BLE001
                log(f"  詳細を読めませんでした {s['url']}: {e}")
            fetched += 1
            time.sleep(WAIT_SEC)
        addr = s.get("detail", {}).get("address")
        if addr and "lat" not in s and geocoded < args.max_details:
            try:
                g = geocode(addr)
                if g:
                    s["lat"], s["lng"], s["geocoded"] = g
            except Exception as e:  # noqa: BLE001
                log(f"  住所から位置を求められませんでした {addr}: {e}")
            geocoded += 1
            time.sleep(WAIT_SEC / 2)
        result.append(s)

    done = sum(1 for s in result if "detail" in s)
    located = sum(1 for s in result if "lat" in s)
    log(f"詳細を開いた {fetched} 件・位置を求めた {geocoded} 件 / 詳細あり {done}・位置あり {located}（全 {len(result)} 件）")
    doc = {"source": BASE, "complete": done == len(result), "shops": result}
    out.write_text(json.dumps(doc, ensure_ascii=False, indent=0), encoding="utf-8")
    return 0


if __name__ == "__main__":
    sys.exit(main())
