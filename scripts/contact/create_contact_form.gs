/**
 * お問い合わせフォーム（Google フォーム）と回答シートを作る。届いたらこのアカウントの Gmail に通知する。
 *
 * 使い方（1回だけ）:
 *   1. https://script.google.com/ で「新しいプロジェクト」を作り、このファイルの中身を貼り付けて保存する
 *   2. 関数 createContactForm を選んで「実行」（初回は Google アカウントの許可を求められる）
 *      → 実行ログの「事前入力した URL」を src/site.config.ts の contactFormUrl に貼る
 *
 * 全ページの下の「お問い合わせ」から開く。ページの欄にはそのページのパス（例: en/medicine/pharmacist/）が自動で入る。
 * メールアドレスは任意。サイトにはメールアドレスを出さない。
 */

function createContactForm() {
  var form = FormApp.create('Japan Travel Aid – Contact / お問い合わせ');
  form.setDescription(
    'Questions, corrections or ideas are welcome. You can write in any language.\n' +
    'We cannot give medical advice. In an emergency, call 119.\n' +
    'ご質問・誤りのご指摘・ご要望をお寄せください。どの言語でも構いません。\n' +
    '医療の相談にはお答えできません。緊急時は 119 へ。'
  );
  form.setCollectEmail(false);
  form.setConfirmationMessage('Thank you! / ありがとうございました。');

  form.addMultipleChoiceItem()
    .setTitle('Topic / 内容')
    .setChoiceValues([
      'Mistake in a card or page — カード・ページの誤り',
      'Idea or request — ご要望・アイデア',
      'App support — アプリについて',
      'Other — その他',
    ])
    .setRequired(true);

  form.addParagraphTextItem().setTitle('Message / お問い合わせ内容').setRequired(true);

  var email = form.addTextItem().setTitle('Email (optional, only if you want a reply) / メールアドレス（任意・返信が必要な方のみ）');
  email.setValidation(FormApp.createTextValidation().requireTextIsEmail().build());

  var page = form.addTextItem().setTitle('Page / ページ')
    .setHelpText('Filled in automatically. / 自動で入ります。');

  var sheet = SpreadsheetApp.create('Japan Travel Aid お問い合わせ');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // 届いたら Gmail に通知する
  ScriptApp.newTrigger('notifyContact').forForm(form).onFormSubmit().create();

  // ページの欄に PAGE と入れた「事前入力した URL」を作る（サイトがページのパスに置き換えて開く）。
  var prefilled = form.createResponse().withItemResponse(page.createResponse('PAGE')).toPrefilledUrl();

  Logger.log('フォーム（編集）: ' + form.getEditUrl());
  Logger.log('回答シート: ' + sheet.getUrl());
  Logger.log('site.config.ts の contactFormUrl に貼る URL: ' + prefilled);
}

function notifyContact(e) {
  var lines = e.response.getItemResponses().map(function (r) {
    return r.getItem().getTitle() + '\n' + r.getResponse();
  });
  MailApp.sendEmail(
    Session.getEffectiveUser().getEmail(),
    'Japan Travel Aid お問い合わせが届きました',
    lines.join('\n\n')
  );
}
