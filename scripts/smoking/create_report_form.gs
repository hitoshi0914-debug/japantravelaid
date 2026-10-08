/**
 * 喫煙所の「閉鎖・間違いを報告」用の Google フォームと回答シートを作る（1回だけ実行）。
 *
 * 使い方:
 *   1. https://script.google.com/ で「新しいプロジェクト」を作り、このファイルの中身を貼り付ける
 *   2. 関数 createReportForm を選んで「実行」（初回は Google アカウントの許可を求められる）
 *   3. 実行ログに出る「事前入力した URL」を src/site.config.ts の smokingReportFormUrl に貼ってデプロイ
 *
 * 回答はスプレッドシート「Japan Travel Aid 喫煙所の報告」にたまる。確認して直したら
 * scripts/smoking/build_spots.py のデータ（自治体 CSV・除外リストなど）に反映する。
 */
function createReportForm() {
  var form = FormApp.create('Japan Travel Aid – Report a smoking area / 喫煙所の報告');
  form.setDescription(
    'Tell us if a smoking area is closed or the information is wrong. Thank you!\n' +
    '喫煙所の閉鎖や情報の間違いを教えてください。ご協力ありがとうございます。'
  );
  form.setCollectEmail(false);

  var spotId = form.addTextItem().setTitle('Spot ID / スポットID').setRequired(true)
    .setHelpText('Filled in automatically. / 自動で入力されます。');

  form.addMultipleChoiceItem()
    .setTitle('What is wrong? / どんな問題ですか？')
    .setChoiceValues([
      'Closed / removed — 閉鎖・撤去された',
      'Wrong location — 場所が違う',
      'Heated tobacco only — 加熱式たばこ専用だった',
      'Cigarettes are OK — 紙巻きたばこも吸えた',
      'Customers only — 利用者（客）限定だった',
      'Wrong hours — 利用時間が違う',
      'Other — その他',
    ])
    .setRequired(true);

  form.addParagraphTextItem().setTitle('Details (optional) / 詳しく（任意）');

  var sheet = SpreadsheetApp.create('Japan Travel Aid 喫煙所の報告');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // スポット ID の欄に SPOT_ID と入れた「事前入力した URL」を作る（サイトが ID に置き換えて開く）。
  var response = form.createResponse().withItemResponse(spotId.createResponse('SPOT_ID'));
  var prefilled = response.toPrefilledUrl();

  Logger.log('フォーム（編集）: ' + form.getEditUrl());
  Logger.log('回答シート: ' + sheet.getUrl());
  Logger.log('site.config.ts の smokingReportFormUrl に貼る URL: ' + prefilled);
}
