# CLAUDE.md

訪日客向けツール集「Japan Travel Aid」（japantravelaid.com）。1つの Astro サイト・1つの PWA に、ツールをパスで分けて置く（`/en/medicine/`・`/en/smoking/`）。構成と手順は README.md。

- 公開・計測・広告の手順は japanrockbar（hitoshi0914-debug/rock-bar-portal）と同じ。サーバー側のコードは使わない純粋な静的サイト
- 島は React に統一（@astrojs/react）。Tailwind はそれを使うページだけで読み込む（`src/styles/smoking.css`）
- 市販薬ガイド: 文言・データは `src/data/` と `src/i18n/` に置く。診断・処方・薬の推奨にあたる表現は書かない。`/medicine/` 以下の全ページに免責表示
- 言語は /en/（基本）・/ja/・/zh-tw/・/zh-cn/・/ko/ の5つで、全ページを多言語にする（2026-10-08 ユーザー決定）。市販薬ガイドは保留中のため英語だけ（tools.ts の langs）。文言は各ページの言語別の辞書か `src/i18n/ui.ts`
- 喫煙所: 地図画面に広告を置かない（広告は地域ページ）。喫煙可の飲食店は載せない。地域ページは3件未満なら noindex（2026-10-07 ユーザー決定）
- 喫煙所ファインダー: 文言は `src/components/smoking/SmokingFinder.tsx` の `T`（5言語）。データは `public/smoking/spots.json` を `scripts/smoking/build_spots.py` で生成（手で編集しない）。OSM の出典表示を必ず残す
- 喫煙所のユーザー投稿: 「喫煙所を追加」Google フォーム → 回答シートで「承認」にチェック → Apps Script ウェブアプリ（`scripts/smoking/create_submit_form.gs`）が承認分を JSON で返し、毎週のデータ更新で取り込む。投稿者はニックネームと投稿数のランク（ブロンズ〜ダイヤ）で表示（2026-10-08 ユーザー決定）
