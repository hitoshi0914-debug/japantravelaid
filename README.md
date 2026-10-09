# Japan Travel Aid（japantravelaid.com）

訪日客向けのスマホ用お助けツールを1つのサイト・1つの PWA にまとめたもの。
Astro で静的に生成し、Cloudflare（Workers の静的アセット配信）で公開する。構成と公開手順は japanrockbar（rock-bar-portal）と同じ。

| URL | ツール | 主なファイル |
|---|---|---|
| `/en/` | ツールの入口（アイコン） | `src/pages/[lang]/index.astro`, `src/data/tools.ts` |
| `/en/medicine/…` | 市販薬・救急ガイド（指差しカード） | `src/pages/[lang]/medicine/`, `src/components/pharmacist/` |
| `/en/smoking/` | 喫煙所ファインダー | `src/pages/[lang]/smoking/`, `src/components/smoking/`, `scripts/smoking/`（データは `npm run data:smoking` → `public/smoking/spots.json`） |

言語: `/en/` と `/ja/` を生成する。市販薬ガイドは英語だけ（`src/data/tools.ts` の `langs`）、喫煙所は英語・日本語（中国語・韓国語は `/en/smoking/` の中で切り替え）。日本語のブラウザで `/` を開くと `/ja/` へ。

### 喫煙所ファインダー（2026-10-07 の決定）

- 地図 `/<lang>/smoking/` には広告を置かない。広告は地域ページ `/<lang>/smoking/<地域>/`（例 `tokyo-taito`）と地域一覧 `/<lang>/smoking/areas/` に出る（AdSense 自動広告）
- 地域ページは `public/smoking/spots.json` の `area` から自動で作る。3件未満は noindex・サイトマップ外
- 東京23区は自治体データで厚くする: 区の CSV を `--municipal <市区町村コード>=<CSV>` で足す（列名は台東区と同じ候補から自動で探す）。全国は OSM
- 掲載は公衆喫煙所と駅・商業施設の喫煙所。喫煙可の飲食店は除外
- 各カードの「閉鎖・間違いを報告」は Google フォーム。`scripts/smoking/create_report_form.gs` を Apps Script で1回実行し、出てきた URL を `site.config.ts` の `smokingReportFormUrl` に書く（空のあいだはリンクを出さない）
- データの作り直し: `python3 scripts/smoking/build_spots.py --taito-csv … [--municipal 13113=…]`（初回は市区町村判定用の住所データ約 50MB をダウンロード）

ツールを足すときは `src/data/tools.ts` に1行足し、`src/pages/[lang]/<id>/` にページを作る。React の島・Tailwind（ページ単位で読み込み）・素の CSS のどれを使ってもよい。
以下の 1〜5 は市販薬・救急ガイドの設計。

```sh
npm install
npm run dev      # http://localhost:4321/en/
npm run build    # dist/ に出力（最後に dist/sw.js を自動生成）
npm run check    # 型チェック
npm run deploy   # ビルドして Cloudflare に公開（初回のみ npx wrangler login）
```

main にマージすると GitHub Actions（`.github/workflows/deploy.yml`）が自動で公開する。リポジトリの Secrets に `CLOUDFLARE_API_TOKEN` が必要。

喫煙所データは GitHub Actions（`.github/workflows/update-smoking-data.yml`）が毎週月曜に作り直し、変わっていれば commit して公開する。
OSM は全国分を自動で取得する。区の公衆喫煙所 CSV は `scripts/smoking/municipal_sources.txt` に「区名=URL」で足す。
OSM の取得に失敗したときや件数が半分以下に減ったときは、上書きせずに失敗として止まる。
今入っている `public/smoking/spots.json` は【サンプル】のダミーなので、公開前に Actions タブから一度手動で実行する。

---

## 1. 技術スタック

| 役割 | 採用 | 理由 |
|---|---|---|
| フレームワーク | **Astro 7**（静的出力） | ページはほぼ静的。JS を最小にでき、店頭の弱い電波でも速い。japanrockbar と同じ運用 |
| 操作が必要な部分 | **React**（Astro の島、`client:load`） | 指差しカードだけ。喫煙所ファインダー（react-leaflet）と揃えた |
| 状態管理 | `useReducer` ＋ localStorage | 状態はカード1つ分。ライブラリ不要 |
| スタイル | 素の CSS（`src/styles/global.css` のトークン） | japanrockbar と同じ。Tailwind は不要と判断 |
| アイコン | ピクトグラム＝絵文字（MVP）、UI 部品＝Lucide | 絵文字はスマホで確実に出る。オリジナル SVG ができたら `Tile.icon` で差し替え |
| オフライン（PWA） | 自前の Service Worker（ビルド時に `integrations/service-worker.mjs` が全ページを列挙して `sw.js` を生成） | 初回訪問で全ページを保存。地下・店の奥でもカードが開く |
| ホスティング | Cloudflare Workers 静的アセット ＋ GitHub Actions | japanrockbar と同じアカウント |
| 計測・収益 | GA4（Consent Mode v2）・Search Console・AdSense | japanrockbar のコンポーネントを流用 |

## 2. ディレクトリ構成

```
src/
  site.config.ts            GA・Search Console・AdSense の ID（空なら何も出ない）
  i18n/
    locales.ts              UI 言語の一覧（いまは en。zh/ko はコメントを外して訳を足すだけ）
    ui.ts                   決まり文句
  data/                     文言・データはすべてここ（コンポーネントに直書きしない）
    categories.ts           TOP の8タイル
    pharmacist.ts           指差しカードの選択肢・薬剤師の質問
    emergency.ts            緊急連絡先
    kanji.ts                箱の言葉・成分名の対訳
    medicines.ts            市販薬カタログのスキーマ（データは出典つきで追加）
  components/
    EmergencyBar.astro      全ページ上部の 119 / #7119
    TileGrid.astro, Tile.astro
    Disclaimer.astro        全ページの免責表示
    Analytics.astro, AdSense.astro, ConsentBanner.astro   （japanrockbar から流用）
    pharmacist/             指差しカード（Preact の島）
      PharmacistApp.tsx     状態の持ち主。select ⇄ card の切り替え・保存・戻るボタン
      state.ts              reducer・保存・URL からの事前選択
      SelectView.tsx        タップで選ぶ画面
      CardView.tsx          全画面カード（画面消灯防止つき）
      AnswerPanel.tsx       薬剤師が指差して答えるエリア
      pharmacist.css
  layouts/Base.astro
  pages/
    index.astro             / → /en/
    [lang]/index.astro      サイトのトップ（ツールの入口）
    [lang]/medicine/index.astro   市販薬・救急ガイドのトップ
    [lang]/medicine/pharmacist.astro
    [lang]/medicine/drugstores.astro
    [lang]/medicine/emergency.astro
    [lang]/medicine/category/[slug].astro   pain / cold / stomach / skin / eye
    [lang]/smoking/index.astro    喫煙所ファインダー
    [lang]/about.astro, privacy.astro
    sitemap.xml.ts, robots.txt.ts, ads.txt.ts
integrations/service-worker.mjs   ビルド後に sw.js を生成
public/manifest.webmanifest, icons/   サイト全体で1つの PWA（start_url /en/）
```

URL は最初から `/en/…` にしておく（言語を足しても既存 URL が変わらず SEO を失わない）。

## 3. TOP 画面

```
┌──────────────────────────────┐
│ 💊 Japan OTC & Emergency Guide │ ← トップ以外は左に「←」
│ ┌─────────────┐┌─────────────┐│
│ │📞 119 救急車 ││📞 #7119 相談 ││ ← 常に最上部・ワンタップで発信
│ └─────────────┘└─────────────┘│
│ ┌─────────────┐┌─────────────┐│
│ │     📍      ││     🗣️      ││ ← 指差しカードは緑で強調
│ │  Drugstores ││ Show to Phar.││
│ ├─────────────┤├─────────────┤│
│ │     💊      ││     🤧      ││
│ │ Headache    ││ Cold&Cough  ││
│ ├─────────────┤├─────────────┤│
│ │     🤢      ││     🩹      ││
│ │ Stomach     ││ Cuts&Skin   ││
│ ├─────────────┤├─────────────┤│
│ │     👁️      ││     🚨      ││ ← 救急は赤
│ │ Eye&Allergy ││ Emergency   ││
│ └─────────────┘└─────────────┘│
│ ⚠️ 免責表示（英・日）            │
└──────────────────────────────┘
```

- 2列 × 4行の正方形タイル。ハンバーガーメニューなし（タイルが唯一のナビ）
- タップ数: TOP →（1）カテゴリ →（2）「カードで相談」→（3）カード表示

## 4. 指差しカード（Show to Pharmacist）

状態は `PharmacistApp` の `useReducer` 1つ（`state.ts`）。

```ts
interface CardState {
  view: 'select' | 'card';
  selection: { who; symptoms; since; wishes; conditions };  // 各 id の配列
  focus: string | null;   // 薬剤師が指差した質問
  reply: string | null;   // 本人の答え
}
```

1. **選択**: 誰の薬・症状（必須）・いつから・希望・アレルギー/状態をタップ。選択は localStorage に保存（再訪・オフラインでも残る）
2. **カード**: 全画面。日本語を大きな太字、英語を小さく。注意事項（妊娠・喘息など）は赤背景。表示中は画面が消えない（Wake Lock）。ブラウザの「戻る」でカードだけ閉じる
3. **双方向**: 薬剤師が日本語の質問を指差す → 本人には英語が大きく出て、答えのボタンが出る → 答えをタップすると日本語の答えが大きく出る
4. カテゴリページの「カードで相談」は `/en/medicine/pharmacist/?s=headache,fever` で症状を事前選択

## 5. 法令遵守（薬機法・医師法・薬剤師法）

- データに書くのは「本人の申告」と「薬剤師からの質問」と「公知情報の翻訳」だけ。「おすすめ」「この症状にはこれ」は書かない
- 市販薬ガイドの全ページ（カード内も）に免責表示
- 市販薬カタログ（`src/data/medicines.ts`）は添付文書の出典 URL と確認日がある品目だけ載せる。製品写真は自前撮影かメーカー許諾済みのみ

---

## 公開と収益化（japanrockbar と同じ手順）

1. **GitHub**: リポジトリを作って push
2. **Cloudflare**: `npm run deploy`（または main へのマージ）で `https://japantravelaid.rock-bar-portal.workers.dev/` に公開
3. **独自ドメイン japantravelaid.com**: Cloudflare Registrar で取得 → Workers の Custom Domain に追加（`astro.config.mjs` の `site` は設定済み）
4. **メール**: Cloudflare Email Routing で info@<ドメイン> を Gmail に転送 → `site.config.ts` の `contactEmail`
5. **Google Analytics 4**: 新しいプロパティを作り、ウェブのデータストリームに公開 URL を登録 → `G-…` を `gaMeasurementId` に
6. **Search Console**: ドメインを登録 → 「HTML タグ」の content を `googleSiteVerification` に → デプロイ後に確認 → `sitemap.xml` を送信（Bing Webmaster Tools も同様に `bingSiteVerification`）
7. **AdSense**: 既存アカウントの「サイト」にドメインを追加 → `adsensePublisherId` に `pub-…` を書くと審査コード・`/ads.txt`・プライバシーポリシーの広告の項目が出る → 審査。EU 向けの同意は AdSense の「プライバシーとメッセージ」で設定
   - 医療系サイトの AdSense 審査は、中身の薄いページがあると落ちやすい。市販薬カタログと解説ページがある程度そろってから申請する

### 公開前チェック

- [ ] 緊急連絡先（`src/data/emergency.ts`）を公式サイトで再確認（#7119 の実施地域、JNTO ホットラインの番号・対応言語）
- [ ] 指差しカードの日本語を薬剤師・登録販売者に見てもらう
- [ ] 免責文を確認（必要なら専門家に）

## スマホアプリ（Capacitor）

サイトをそのままアプリに同梱する（電波がなくても開ける）。サイトも今までどおり公開し、ストアのボタンは公開後に `site.config.ts` の URL を書くと出る。

- `npm run build:app`: `PUBLIC_APP=1` でサイトを `dist-app/` にビルドし、`android/` に写す。アプリ版は広告・寄付・ストアのボタン・GA を出さない（`site.config.ts` の最後）
- `android/`: Capacitor が作った Android プロジェクト。ページごとの HTML を開けるように `MainActivity` で `/…/` を `/…/index.html` に読み替えている（`PagesWebViewClient.java`）
- アイコン: `assets/` の画像から `npx @capacitor/assets generate --android` で作る
- 試し用の APK: GitHub の Actions > Android app を実行 > Artifacts からダウンロード
- ストア提出用の AAB: Actions > Android app > Run workflow で `japan-travel-aid-release` ができる。署名のアップロード鍵は GitHub の Secrets（`ANDROID_KEYSTORE_BASE64`・`ANDROID_KEYSTORE_PASSWORD`）にだけ置く。Play App Signing を使うので、鍵を失くしても Play Console から再発行できる
- 順番: Android（喫煙所＋市販薬）を先に出す。iPhone は最初は市販薬・救急だけ（審査ガイドライン 1.4.3 たばこ）で、喫煙所は後のアップデートで足す
- Google Play は会社名義（組織アカウント、D-U-N-S 番号が必要）。個人名義だと「12人・14日間のクローズドテスト」が公開の条件になる
