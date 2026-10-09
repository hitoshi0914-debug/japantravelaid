# CLAUDE.md

訪日客向けツール集「Japan Travel Aid」（japantravelaid.com）。1つの Astro サイト・1つの PWA に、ツールをパスで分けて置く（`/en/medicine/`・`/en/smoking/`）。構成と手順は README.md。

- 公開・計測・広告の手順は japanrockbar（hitoshi0914-debug/rock-bar-portal）と同じ。サーバー側のコードは使わない純粋な静的サイト
- 島は React に統一（@astrojs/react）。Tailwind はそれを使うページだけで読み込む（`src/styles/smoking.css`）
- 市販薬ガイド: 文言・データは `src/data/` と `src/i18n/` に置く。診断・処方・薬の推奨にあたる表現は書かない。`/medicine/` 以下の全ページに免責表示
- 言語は japanrockbar と同じ9つ（en 基本・ja・ko・zh-tw・zh-cn・de・fr・it・es、`src/i18n/locales.ts`）で、市販薬ガイドも含め全ページを多言語にする（2026-10-08 ユーザー決定）。文言は各ページの言語別の辞書か `src/i18n/ui.ts`、データは `src/data/` の各言語のキー。店員に見せる日本語はどの言語でも日本語のまま
- 喫煙所: 地図画面に広告を置かない（広告は地域ページ）。喫煙可の飲食店は載せない。地域ページは観光地（`src/lib/smoking.ts` の `TOURIST_AREAS`）だけ作り、3件未満なら noindex（2026-10-07・10-09 ユーザー決定）
- 喫煙所ファインダー: 文言は `src/components/smoking/SmokingFinder.tsx` の `T`（9言語）。データは `public/smoking/spots.json` を `scripts/smoking/build_spots.py` で生成（手で編集しない）。OSM の出典表示を必ず残す
- 喫煙所のユーザー投稿: 「喫煙所を追加」Google フォーム → 回答シートで「承認」にチェック → Apps Script ウェブアプリ（`scripts/smoking/create_submit_form.gs`）が承認分を JSON で返し、毎週のデータ更新で取り込む。投稿者はニックネームと投稿数のランク（ブロンズ〜ダイヤ）で表示（2026-10-08 ユーザー決定）
- スマホアプリ化を予定（2026-10-08 ユーザー）。ストアのダウンロードボタンは `src/components/StoreBadges.astro`（全ページの下）。`site.config.ts` の `appStoreUrl`・`googlePlayUrl` を書いたストアだけ出る。公開前にバッジを出さない（Apple・Google の規約）。iOS は審査ガイドライン 1.4.3（たばこ）・4.2（ウェブの包み直しだけのアプリ）に注意
- 寄付: Ko-fi（`site.config.ts` の `donateUrl`、受け取りは会社名義の PayPal）。`src/components/Donate.astro` を全ページの下と about に出す。喫煙所の地図と指差しカード（薬剤師・美容院）の画面には出さない。アプリには入れない（2026-10-09）
- サイトの中心は「旅行中に困ったとき日本人スタッフに見せる指差しカード集」（2026-10-09 ユーザー決定）。カードの共通部品は `src/components/card/`（薬剤師 `PharmacistApp`・美容院 `SalonApp` は設定を渡すだけ）。美容院カードは `/salon/`、データ `src/data/salon.ts`、カードだけで店の検索はしない。喫煙所はトップでカードの下に小さく出す。タップできる場所は 44〜48px 以上
