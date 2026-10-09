// 公開後に登録するサービスの ID。ここに書いてビルド・デプロイし直すと有効になる（空のあいだは何も出力しない）。
// 手順は README.md の「公開と収益化」。japanrockbar と同じ流れ。
export const siteConfig = {
  siteName: 'Japan Travel Aid',
  /** Google Analytics 4 の測定 ID（例: 'G-ABC123XYZ'）。このサイト用に新しいプロパティを作る。 */
  gaMeasurementId: 'G-GW8TF28R2E',
  /** Google Search Console の「HTML タグ」の content の値だけ。 */
  googleSiteVerification: '',
  /** Bing Webmaster Tools の「HTML Meta Tag」の content の値だけ。 */
  bingSiteVerification: '',
  /**
   * Google AdSense のサイト運営者 ID。japanrockbar と同じアカウントを使う場合は同じ ID（'pub-9333391296410668'）で、
   * AdSense の「サイト」にこのドメインを追加して審査を受ける。審査に出すまでは空にしておく。
   */
  adsensePublisherId: 'pub-9333391296410668',
  /**
   * 喫煙所の「閉鎖・間違いを報告」に使う Google フォームの「事前入力した URL」。スポット ID の欄に SPOT_ID と入れたもの
   * （scripts/smoking/create_report_form.gs を実行すると実行ログに出る）。空のあいだは報告リンクを出さない。
   */
  smokingReportFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSefLzHWrz7NgyfW2WRHLZ2kvho_I4Ys9bynWN9lYPb1MhTqZA/viewform?usp=pp_url&entry.1105871521=SPOT_ID',
  /**
   * 「喫煙所を追加」の Google フォームの「事前入力した URL」。緯度・経度の欄に LAT・LNG と入れたもの
   * （scripts/smoking/create_submit_form.gs を実行すると実行ログに出る）。空のあいだは追加ボタンを出さない。
   */
  smokingSubmitFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSehC0d8OxepcvWQDFfGghY3IfTDDp1N8v0tnzOcdVz9Nt08rQ/viewform?usp=pp_url&entry.1866195325=LAT&entry.1852076158=LNG',
  /**
   * スマホアプリのストアの URL。公開されたら書く。書いたストアのダウンロードボタンだけが全ページの下に出る（空のあいだは出さない）。
   * ボタンの画像は各社の公式バッジを public/badges/ に置く（App Store: app-store.svg、Google Play: google-play.png）。
   * Apple・Google とも、アプリが公開される前にバッジを出すことは認めていない。
   */
  appStoreUrl: '',
  googlePlayUrl: '',
  /**
   * 寄付（Ko-fi、受け取りは会社名義の PayPal）。全ページの下と about に「応援する」ボタンを出す。空なら出さない。
   * 地図（喫煙所ファインダー）と薬剤師カードの画面には出さない。アプリには入れない（ストアの規約でアプリ内の寄付は各社の決済が必要）。
   */
  donateUrl: 'https://ko-fi.com/T6R528FYGN',
  /**
   * お問い合わせの Google フォームの「事前入力した URL」。ページの欄に PAGE と入れたもの
   * （scripts/contact/create_contact_form.gs を実行すると実行ログに出る）。全ページの下と about に出す。空のあいだは出さない。
   */
  contactFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdEk6JLv6s8HuD93G16eLyv6yK0qOfOn_hkZVNJWWPQzyoBDg/viewform?usp=pp_url&entry.1930517132=PAGE',
  /** 連絡先（about・プライバシーポリシーに出す）。 */
  contactEmail: '',
};
