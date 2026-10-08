# spots.json スキーマ（version 2）

元の依頼文にあった「上記スキーマ」は共有されていなかったため、試作用にこの形で定義した。
変えたい場合は `scripts/build_spots.py` と `src/components/SmokingFinder.tsx` の型（`Spot`）を合わせて直す。

```jsonc
{
  "version": 1,
  "generated_at": "2026-10-07T03:00:00+00:00",   // 生成日時（UTC）
  "sources": [                                    // 画面下部の出典表示に使う
    { "id": "osm", "name": "OpenStreetMap contributors", "license": "ODbL 1.0", "url": "https://www.openstreetmap.org/copyright" }
  ],
  "spots": [
    {
      "id": "taito-city-T001",            // 出典ごとに一意（osm-node-123 / taito-city-<ID>）
      "lat": 35.71236, "lng": 139.77682,  // WGS84
      "name":    { "ja": "上野駅前 喫煙所", "en": "Ueno Sta. Smoking Area" },  // ja / en / zh-Hant / zh-Hans / ko、あるものだけ
      "address": { "ja": "東京都台東区上野7丁目" },
      "type": "outdoor",        // outdoor（パーティション型など屋外）| booth（コンテナ・ブース）| indoor | unknown
      "access": "public",       // public | customers（店舗・施設利用者のみ）| unknown
      "fee": false,             // 有料なら true、不明は null
      "hours": "7:00-22:00",    // 自由書式（OSM は opening_hours 書式）、不明は null
      "note": null,
      "sources": [ { "source": "taito-city", "ref": "T001" }, { "source": "osm", "ref": "node/123" } ],  // 結合した場合は複数
      "updated": "2026-10-07",  // 出典側の確認日（分からなければ null）
      "tobacco": "any",         // version 2〜。any（紙巻きOK）| heated_only（加熱式のみ）| unknown
      "area": {                 // version 2〜。市区町村（判定できなければ null）。地域ページ /<lang>/smoking/<slug>/ に使う
        "code": "13106", "pref": "東京都", "city": "台東区",
        "pref_en": "Tokyo", "city_en": "Taito-ku", "slug": "tokyo-taito"
      }
    }
  ]
}
```

- 名前がその言語にない時、画面は「繁⇔簡 → 英語 → 日本語」の順に代わりを出す。
- 自治体データと OSM が 25m 以内で重なったら 1 件にまとめる（自治体データ優先、OSM は空欄を補うだけ）。
- ファイルは空白なしで書き出す（数千件でも数百 KB 程度に収まる想定）。
- 喫煙可の飲食店は載せない。OSM で `cuisine` タグがあるもの・名前に飲食店の語（喫茶・カフェ・居酒屋など）があるものは除外する。
- `tobacco`: 「加熱式たばこ専用」などの語があれば heated_only、「紙巻」などがあれば any。書かれていなければ屋外（type=outdoor）は any（加熱式専用は健康増進法の屋内喫煙室の区分なので）、それ以外は unknown。OSM は `heated_tobacco=only`・`cigarettes=yes` も見る。unknown は利用者の報告で埋めていく。
- `area`: Geolonia 住所データで判定。住所があれば住所の市区町村、なければいちばん近い町丁目の代表点（5km 以内）の市区町村。
- 地域ページは件数が 3 未満なら noindex・サイトマップ外（`src/lib/smoking.ts` の `MIN_INDEXABLE_SPOTS`）。
