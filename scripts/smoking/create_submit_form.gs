/**
 * 「喫煙所を追加」フォーム（ユーザー投稿）と回答シートを作り、承認済みの投稿を JSON で返すウェブアプリにする。
 *
 * 使い方（1回だけ）:
 *   1. https://script.google.com/ で「新しいプロジェクト」を作り、このファイルの中身を貼り付けて保存する
 *   2. 関数 createSubmitForm を選んで「実行」（初回は Google アカウントの許可を求められる）
 *      → 実行ログの「事前入力した URL」を src/site.config.ts の smokingSubmitFormUrl に貼る
 *   3. 「デプロイ」>「新しいデプロイ」> 種類「ウェブアプリ」、実行ユーザー「自分」、アクセス「全員」でデプロイ
 *      → ウェブアプリの URL を scripts/smoking/community_source.txt に書く
 *
 * 運用: 回答シートの「承認」列にチェックを入れた投稿だけが、次のデータ更新（毎週、または Actions の手動実行）でサイトに載る。
 * 飲食店の中・場所があいまい・ニックネームが不適切なものは承認しない。
 */

var APPROVE_HEADER = '承認';

var Q = {
  nickname: 'Nickname (shown on the site) / ニックネーム（サイトに表示）',
  lat: 'Latitude / 緯度',
  lng: 'Longitude / 経度',
  name: 'Where is it? (landmark or name) / 場所の目印・名前',
  type: 'Type / 種類',
  tobacco: 'What can you smoke? / 吸えるたばこ',
  customers: 'Customers only? / 利用者（客）限定？',
  hours: 'Hours (optional) / 利用時間（任意）',
  notes: 'Notes for us (not shown) / 補足（サイトには出ません）',
  notRestaurant: 'Confirm / 確認',
};

var TYPE_VALUES = {
  'Outdoor — 屋外': 'outdoor',
  'Booth / container — ブース・コンテナ': 'booth',
  'Indoor smoking room — 屋内の喫煙室': 'indoor',
  'Not sure — 分からない': 'unknown',
};
var TOBACCO_VALUES = {
  'Cigarettes OK — 紙巻きOK': 'any',
  'Heated tobacco only — 加熱式のみ': 'heated_only',
  'Not sure — 分からない': 'unknown',
};
var CUSTOMERS_VALUES = { 'No — いいえ': false, 'Yes — はい': true, 'Not sure — 分からない': null };

function createSubmitForm() {
  var form = FormApp.create('Japan Travel Aid – Add a smoking area / 喫煙所を追加');
  form.setDescription(
    'Know a smoking area that is not on the map? Tell us. We check every post before it appears.\n' +
    'Restaurants, bars and cafés are not listed.\n' +
    '地図にない喫煙所を教えてください。確認してから掲載します。飲食店は載せません。'
  );
  form.setCollectEmail(false);

  var nickname = form.addTextItem().setTitle(Q.nickname)
    .setHelpText('Optional. Do not use your real name. / 任意。本名は使わないでください。');
  nickname.setValidation(FormApp.createTextValidation().requireTextLengthLessThanOrEqualTo(20).build());

  var lat = form.addTextItem().setTitle(Q.lat).setRequired(true)
    .setHelpText('Filled in from your location. / 現在地から自動で入ります。');
  var lng = form.addTextItem().setTitle(Q.lng).setRequired(true);
  form.addTextItem().setTitle(Q.name).setRequired(true)
    .setHelpText('e.g. Shinjuku Station East Exit / 例: 新宿駅東口の交番横');
  form.addMultipleChoiceItem().setTitle(Q.type).setChoiceValues(Object.keys(TYPE_VALUES)).setRequired(true);
  form.addMultipleChoiceItem().setTitle(Q.tobacco).setChoiceValues(Object.keys(TOBACCO_VALUES)).setRequired(true);
  form.addMultipleChoiceItem().setTitle(Q.customers).setChoiceValues(Object.keys(CUSTOMERS_VALUES)).setRequired(true);
  form.addTextItem().setTitle(Q.hours);
  form.addParagraphTextItem().setTitle(Q.notes);
  form.addCheckboxItem().setTitle(Q.notRestaurant)
    .setChoiceValues(['It is not inside a restaurant, bar or café — 飲食店の中ではありません'])
    .setRequired(true);

  var ss = SpreadsheetApp.create('Japan Travel Aid 喫煙所の追加');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  SpreadsheetApp.flush();
  var sheet = ss.getSheets()[0];
  // 回答の列の右に「承認」のチェックボックス列を置く
  var col = sheet.getLastColumn() + 1;
  sheet.getRange(1, col).setValue(APPROVE_HEADER).setFontWeight('bold');
  sheet.getRange(2, col, 1000, 1).insertCheckboxes();
  PropertiesService.getScriptProperties().setProperty('SHEET_ID', ss.getId());

  // 緯度・経度の欄に LAT・LNG と入れた「事前入力した URL」（サイトが現在地に置き換えて開く）
  var prefilled = form.createResponse()
    .withItemResponse(lat.createResponse('LAT'))
    .withItemResponse(lng.createResponse('LNG'))
    .toPrefilledUrl();

  Logger.log('フォーム（編集）: ' + form.getEditUrl());
  Logger.log('回答シート: ' + ss.getUrl());
  Logger.log('site.config.ts の smokingSubmitFormUrl に貼る URL: ' + prefilled);
}

/** 承認済みの投稿だけを JSON で返す（ウェブアプリ）。補足欄やタイムスタンプ以外の個人的な情報は返さない。 */
function doGet() {
  var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  var sheet = SpreadsheetApp.openById(id).getSheets()[0];
  var values = sheet.getDataRange().getValues();
  var head = values[0].map(String);
  var col = function (title) { return head.indexOf(title); };
  var c = {
    ts: 0, nickname: col(Q.nickname), lat: col(Q.lat), lng: col(Q.lng), name: col(Q.name), type: col(Q.type),
    tobacco: col(Q.tobacco), customers: col(Q.customers), hours: col(Q.hours), approve: col(APPROVE_HEADER),
  };
  var out = [];
  for (var i = 1; i < values.length; i++) {
    var r = values[i];
    if (c.approve < 0 || r[c.approve] !== true || !r[c.ts]) continue;
    var ts = new Date(r[c.ts]);
    var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, ts.toISOString() + r[c.lat] + r[c.lng]);
    var hex = digest.map(function (b) { return ((b + 256) % 256).toString(16).padStart(2, '0'); }).join('').slice(0, 10);
    out.push({
      id: hex,
      submitted_at: ts.toISOString(),
      nickname: String(r[c.nickname] || '').trim(),
      lat: Number(r[c.lat]),
      lng: Number(r[c.lng]),
      name: String(r[c.name] || '').trim(),
      type: TYPE_VALUES[r[c.type]] || 'unknown',
      tobacco: TOBACCO_VALUES[r[c.tobacco]] || 'unknown',
      customers_only: r[c.customers] in CUSTOMERS_VALUES ? CUSTOMERS_VALUES[r[c.customers]] : null,
      hours: c.hours >= 0 ? String(r[c.hours] || '').trim() : '',
    });
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
