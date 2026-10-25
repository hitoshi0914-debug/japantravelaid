import type { CardChoice, CardGroup, CardTextField, StaffPhrase } from '../components/card/types';
import type { Localized } from '../i18n/locales';

// 指差しカード（タクシーで見せる）の文言データ。カードの画面は薬剤師カードと共通（src/components/card/）。
// 行き先は自由に書ける欄（textField）にして、カードの一番上に大きく出す。
// 乗っている間に使う一言（ここで止めて など）は quickPhrases、運転手さんが指差す質問は phrases。

/** 訳を locales.ts と同じ並び（en, ja, ko, zh-tw, zh-cn, de, fr, it, es）で書くための短縮形。 */
const t = (en: string, ja: string, ko: string, zhTw: string, zhCn: string, de: string, fr: string, it: string, es: string): Localized => ({
  en, ja, ko, 'zh-tw': zhTw, 'zh-cn': zhCn, de, fr, it, es,
});

const c = (id: string, pictogram: string, label: Localized): CardChoice => ({ id, pictogram, label });

export const taxiDestination: CardTextField = {
  label: t('Where to?', '行き先', '목적지', '目的地', '目的地', 'Wohin?', 'Destination', 'Destinazione', 'Destino'),
  hint: t(
    'Copy the address or place name from Google Maps or your hotel booking. Japanese text is easiest for the driver.',
    'Google マップやホテルの予約から住所・名前をコピーして貼り付けてください。日本語だと運転手さんに伝わりやすいです。',
    'Google 지도나 호텔 예약에서 주소 · 장소 이름을 복사해 붙여 넣으세요. 일본어로 쓰면 기사님이 알아보기 쉬워요.',
    '從 Google 地圖或飯店訂房資料複製地址或地名貼上。用日文寫，司機最容易看懂。',
    '从 Google 地图或酒店预订信息复制地址或地名粘贴进来。用日文写，司机最容易看懂。',
    'Kopieren Sie die Adresse oder den Ortsnamen aus Google Maps oder Ihrer Hotelbuchung. Auf Japanisch versteht der Fahrer es am besten.',
    'Copiez l’adresse ou le nom du lieu depuis Google Maps ou votre réservation d’hôtel. En japonais, c’est plus simple pour le chauffeur.',
    'Copia l’indirizzo o il nome del luogo da Google Maps o dalla prenotazione dell’hotel. In giapponese è più facile per l’autista.',
    'Copie la dirección o el nombre del lugar de Google Maps o de su reserva de hotel. En japonés es más fácil para el conductor.',
  ),
  placeholder: t('e.g. 東京都渋谷区道玄坂1-2-3 / Shibuya Station', '例: 東京都渋谷区道玄坂1-2-3 / 渋谷駅', '예: 東京都渋谷区道玄坂1-2-3 / 시부야역', '例：東京都渋谷区道玄坂1-2-3／澀谷站', '例：東京都渋谷区道玄坂1-2-3／涩谷站', 'z. B. 東京都渋谷区道玄坂1-2-3 / Bahnhof Shibuya', 'ex. : 東京都渋谷区道玄坂1-2-3 / gare de Shibuya', 'es. 東京都渋谷区道玄坂1-2-3 / stazione di Shibuya', 'p. ej., 東京都渋谷区道玄坂1-2-3 / estación de Shibuya'),
  cardHeading: '行き先',
};

export const taxiGroups: CardGroup[] = [
  {
    id: 'request', single: false,
    title: t('Requests', 'お願い', '부탁', '請求', '请求', 'Wünsche', 'Demandes', 'Richieste', 'Peticiones'),
    cardHeading: 'お願い',
    choices: [
      c('hurry', '⏱️', t('I’m in a hurry', '急いでいます', '급해요', '我在趕時間', '我在赶时间', 'Ich habe es eilig', 'Je suis pressé(e)', 'Ho fretta', 'Tengo prisa')),
      c('highway-ok', '🛣️', t('Toll expressway is OK', '高速道路を使ってもかまいません', '고속도로 이용해도 괜찮아요', '可以走高速公路', '可以走高速公路', 'Autobahn mit Maut ist okay', 'L’autoroute à péage, c’est d’accord', 'L’autostrada a pagamento va bene', 'Puede usar la autopista de peaje')),
      c('no-highway', '🚗', t('No toll expressway, please', '高速道路は使わないでください', '고속도로는 이용하지 말아 주세요', '請不要走高速公路', '请不要走高速公路', 'Bitte keine Mautautobahn', 'Pas d’autoroute à péage, s’il vous plaît', 'Niente autostrada a pagamento, per favore', 'Sin autopista de peaje, por favor')),
      c('trunk', '🧳', t('Please open the trunk for my luggage', '荷物があるのでトランクを開けてください', '짐이 있어서 트렁크를 열어 주세요', '我有行李，請打開後車廂', '我有行李，请打开后备箱', 'Bitte öffnen Sie den Kofferraum für mein Gepäck', 'Pouvez-vous ouvrir le coffre pour mes bagages ?', 'Apra il bagagliaio per i bagagli, per favore', 'Abra el maletero para mi equipaje, por favor')),
      c('wait', '⏸️', t('Please wait for me when we arrive', '着いたら待っていてください', '도착하면 기다려 주세요', '到了之後請等我一下', '到了之后请等我一下', 'Bitte warten Sie bei der Ankunft auf mich', 'Attendez-moi à l’arrivée, s’il vous plaît', 'Mi aspetti all’arrivo, per favore', 'Espéreme al llegar, por favor')),
      c('atm', '🏧', t('Stop at an ATM / convenience store on the way', '途中でATM・コンビニに寄ってください', '가는 길에 ATM · 편의점에 들러 주세요', '途中請停一下ATM・便利商店', '途中请停一下ATM・便利店', 'Unterwegs bitte an einem Geldautomaten / Konbini halten', 'Arrêtez-vous à un distributeur / konbini en route', 'Si fermi a un bancomat / konbini lungo la strada', 'Pare en un cajero / konbini por el camino')),
      c('receipt', '🧾', t('Receipt, please', '領収書をください', '영수증 주세요', '請給我收據', '请给我收据', 'Eine Quittung, bitte', 'Un reçu, s’il vous plaît', 'La ricevuta, per favore', 'El recibo, por favor')),
    ],
  },
  {
    id: 'pay', single: true,
    title: t('How I’d like to pay', '支払い方法', '결제 방법', '付款方式', '付款方式', 'Zahlungsart', 'Mode de paiement', 'Come pagare', 'Forma de pago'),
    cardHeading: 'お支払い',
    choices: [
      c('card', '💳', t('Credit card — is that OK?', 'クレジットカードで払えますか？', '신용카드로 결제할 수 있나요?', '可以刷信用卡嗎？', '可以刷信用卡吗？', 'Kann ich mit Kreditkarte zahlen?', 'Puis-je payer par carte bancaire ?', 'Posso pagare con carta di credito?', '¿Puedo pagar con tarjeta de crédito?')),
      c('ic', '🎫', t('IC card (Suica, PASMO…) — is that OK?', '交通系ICカード（Suica・PASMOなど）で払えますか？', '교통 IC카드 (Suica, PASMO 등)로 결제할 수 있나요?', '可以用交通IC卡（Suica、PASMO等）付嗎？', '可以用交通IC卡（Suica、PASMO等）付吗？', 'Kann ich mit IC-Karte (Suica, PASMO …) zahlen?', 'Puis-je payer avec une carte IC (Suica, PASMO…) ?', 'Posso pagare con carta IC (Suica, PASMO…)?', '¿Puedo pagar con tarjeta IC (Suica, PASMO…)?')),
      c('qr', '📱', t('QR code / phone payment — is that OK?', 'QRコード・スマホ決済で払えますか？', 'QR코드 · 휴대폰 결제로 할 수 있나요?', '可以用QR碼・手機支付嗎？', '可以用二维码・手机支付吗？', 'Kann ich per QR-Code / Handy zahlen?', 'Puis-je payer par QR code / téléphone ?', 'Posso pagare con QR code / telefono?', '¿Puedo pagar con código QR / móvil?')),
      c('cash', '💴', t('Cash', '現金で払います', '현금으로 낼게요', '我付現金', '我付现金', 'Bar', 'En espèces', 'In contanti', 'En efectivo')),
    ],
  },
  {
    id: 'care', single: false,
    title: t('Please note', '注意', '주의 사항', '注意事項', '注意事项', 'Bitte beachten', 'À noter', 'Da sapere', 'A tener en cuenta'),
    cardHeading: 'ご注意ください',
    choices: [
      c('sick', '🤢', t('I feel sick — please drive gently', '気分が悪いので、ゆっくり運転してください', '속이 안 좋아서 천천히 운전해 주세요', '我不太舒服，請開慢一點', '我不太舒服，请开慢一点', 'Mir ist übel – bitte fahren Sie sanft', 'J’ai mal au cœur, conduisez doucement s’il vous plaît', 'Mi sento male, guidi piano per favore', 'Me encuentro mal, conduzca suave por favor')),
      c('wheelchair', '♿', t('I use a wheelchair', '車いすを使っています', '휠체어를 사용해요', '我使用輪椅', '我使用轮椅', 'Ich benutze einen Rollstuhl', 'J’utilise un fauteuil roulant', 'Uso una sedia a rotelle', 'Uso silla de ruedas')),
      c('child', '👶', t('I have a small child', '小さな子どもがいます', '어린아이가 있어요', '我帶著小孩', '我带着小孩', 'Ich habe ein kleines Kind dabei', 'J’ai un jeune enfant', 'Ho un bambino piccolo', 'Llevo un niño pequeño')),
    ],
  },
];

/** カード上部の定型文（運転手さん向けの日本語 ＋ 本人確認用の訳）。 */
export const taxiIntro: Localized = t(
  'I don’t speak Japanese.\nPlease take me to the place below.',
  '日本語が話せません。\nここまでお願いします。',
  '일본어를 못 합니다.\n아래 장소까지 부탁드립니다.',
  '我不會說日語。\n請載我到下面這個地方。',
  '我不会说日语。\n请送我到下面这个地方。',
  'Ich spreche kein Japanisch.\nBitte bringen Sie mich zu folgendem Ort.',
  'Je ne parle pas japonais.\nEmmenez-moi à l’endroit ci-dessous, s’il vous plaît.',
  'Non parlo giapponese.\nMi porti al luogo qui sotto, per favore.',
  'No hablo japonés.\nLléveme al lugar de abajo, por favor.',
);

export const taxiCardTitle = '運転手さんへ';

export const taxiAnswerHeading: Localized = t(
  'Driver: point to answer', '運転手さん：指差しでお答えください', '기사님: 손가락으로 가리켜 답해 주세요', '司機：請用手指點選回答', '司机：请用手指点选回答',
  'Fahrer: Bitte auf die Antwort zeigen', 'Chauffeur : montrez la réponse du doigt', 'Autista: indichi la risposta', 'Conductor: señale la respuesta',
);

export const taxiQuickHeading: Localized = t(
  'Tap to show the driver', '運転手さんに見せる', '눌러서 기사님께 보여주기', '點一下給司機看', '点一下给司机看',
  'Antippen und dem Fahrer zeigen', 'Touchez pour montrer au chauffeur', 'Tocca per mostrarlo all’autista', 'Toque para mostrárselo al conductor',
);

export const taxiPickPrompt = t(
  'Enter where you’re going', '行き先を入力してください', '목적지를 입력하세요', '請輸入目的地', '请输入目的地',
  'Geben Sie Ihr Ziel ein', 'Saisissez votre destination', 'Inserisci la destinazione', 'Escriba su destino',
);

// ---- 乗っている間に本人が見せる一言 ----
export const taxiQuickPhrases: StaffPhrase[] = [
  { id: 'stop-here', ...t('Please stop here.', 'ここで止めてください。', '여기서 세워 주세요.', '請在這裡停車。', '请在这里停车。', 'Bitte halten Sie hier.', 'Arrêtez-vous ici, s’il vous plaît.', 'Si fermi qui, per favore.', 'Pare aquí, por favor.') },
  { id: 'a-bit-further', ...t('A little further, please.', 'もう少し先までお願いします。', '조금 더 가 주세요.', '請再往前一點。', '请再往前一点。', 'Bitte noch ein Stück weiter.', 'Un peu plus loin, s’il vous plaît.', 'Ancora un po’ più avanti, per favore.', 'Un poco más adelante, por favor.') },
  { id: 'turn-right', ...t('Turn right here, please.', 'ここを右に曲がってください。', '여기서 오른쪽으로 돌아 주세요.', '請在這裡右轉。', '请在这里右转。', 'Bitte hier rechts abbiegen.', 'Tournez à droite ici, s’il vous plaît.', 'Giri a destra qui, per favore.', 'Gire a la derecha aquí, por favor.') },
  { id: 'turn-left', ...t('Turn left here, please.', 'ここを左に曲がってください。', '여기서 왼쪽으로 돌아 주세요.', '請在這裡左轉。', '请在这里左转。', 'Bitte hier links abbiegen.', 'Tournez à gauche ici, s’il vous plaît.', 'Giri a sinistra qui, per favore.', 'Gire a la izquierda aquí, por favor.') },
  { id: 'hurry-please', ...t('Please hurry.', '急いでください。', '서둘러 주세요.', '請開快一點。', '请开快一点。', 'Bitte beeilen Sie sich.', 'Dépêchez-vous, s’il vous plaît.', 'Faccia in fretta, per favore.', 'Dese prisa, por favor.') },
  { id: 'how-long', ...t('How long will it take?', 'あと何分くらいかかりますか？', '몇 분 정도 더 걸리나요?', '還要幾分鐘左右？', '还要几分钟左右？', 'Wie lange dauert es noch?', 'Combien de temps encore ?', 'Quanto manca ancora?', '¿Cuánto falta?') },
  { id: 'how-much', ...t('About how much will it cost?', '料金はだいたいいくらですか？', '요금은 대략 얼마인가요?', '車資大概多少？', '车费大概多少？', 'Was kostet es ungefähr?', 'Combien ça coûtera environ ?', 'Quanto costerà più o meno?', '¿Cuánto costará más o menos?') },
  { id: 'cooler', ...t('Could you make it cooler / warmer?', 'エアコンを調節してもらえますか？', '에어컨을 조절해 주실 수 있나요?', '可以調一下冷氣嗎？', '可以调一下空调吗？', 'Könnten Sie die Klimaanlage verstellen?', 'Pouvez-vous régler la climatisation ?', 'Può regolare l’aria condizionata?', '¿Puede ajustar el aire acondicionado?') },
];

// ---- 運転手さんが指差す質問・説明と、本人が返す答え ----
const yes = c('yes', '⭕', t('Yes', 'はい', '예', '是', '是', 'Ja', 'Oui', 'Sì', 'Sí'));
const no = c('no', '❌', t('No', 'いいえ', '아니요', '不是', '不是', 'Nein', 'Non', 'No', 'No'));

export const taxiPhrases: StaffPhrase[] = [
  { id: 'yes', ...yes.label },
  { id: 'no', ...no.label },
  { id: 'unknown-place', ...t('I don’t know this place. Can you show me a map?', '場所がわかりません。地図を見せてもらえますか？', '장소를 모르겠어요. 지도를 보여 주시겠어요?', '我不知道這個地方，可以給我看地圖嗎？', '我不知道这个地方，可以给我看地图吗？', 'Ich kenne diesen Ort nicht. Können Sie mir eine Karte zeigen?', 'Je ne connais pas cet endroit. Pouvez-vous me montrer une carte ?', 'Non conosco questo posto. Può mostrarmi una mappa?', 'No conozco este lugar. ¿Me puede enseñar un mapa?'), replies: [
    c('map', '🗺️', t('I’ll show you a map', '地図を見せます', '지도를 보여 드릴게요', '我給您看地圖', '我给您看地图', 'Ich zeige Ihnen eine Karte', 'Je vous montre une carte', 'Le mostro una mappa', 'Le enseño un mapa')),
    c('phone', '📞', t('Please call this place', 'ここに電話してください', '여기에 전화해 주세요', '請打電話到這裡', '请打电话到这里', 'Bitte rufen Sie dort an', 'Appelez cet endroit, s’il vous plaît', 'Chiami questo posto, per favore', 'Llame a este lugar, por favor')),
  ] },
  { id: 'highway', ...t('Shall I take the toll expressway? (toll is extra)', '高速道路を使いますか？（料金は別にかかります）', '고속도로를 이용할까요? (통행료는 따로 들어요)', '要走高速公路嗎？（過路費另計）', '要走高速公路吗？（过路费另算）', 'Soll ich die Mautautobahn nehmen? (Maut extra)', 'Je prends l’autoroute à péage ? (péage en plus)', 'Prendo l’autostrada a pagamento? (pedaggio a parte)', '¿Tomo la autopista de peaje? (peaje aparte)'), replies: [yes, no] },
  { id: 'here-ok', ...t('Is here OK?', 'こちらでよろしいですか？', '여기서 괜찮으세요?', '在這裡可以嗎？', '在这里可以吗？', 'Ist es hier in Ordnung?', 'Ici, ça vous va ?', 'Va bene qui?', '¿Aquí está bien?'), replies: [
    c('ok', '👌', t('Yes, here is fine', 'はい、ここで大丈夫です', '네, 여기서 괜찮아요', '可以，這裡就好', '可以，这里就好', 'Ja, hier ist gut', 'Oui, ici c’est bien', 'Sì, qui va bene', 'Sí, aquí está bien')),
    c('further', '➡️', t('A little further', 'もう少し先まで', '조금 더 가 주세요', '再往前一點', '再往前一点', 'Etwas weiter', 'Un peu plus loin', 'Un po’ più avanti', 'Un poco más adelante')),
  ] },
  { id: 'cash-only', ...t('Sorry, cash only.', '申し訳ありません、現金のみです。', '죄송합니다. 현금만 가능해요.', '不好意思，只收現金。', '不好意思，只收现金。', 'Leider nur Barzahlung.', 'Désolé, espèces uniquement.', 'Mi dispiace, solo contanti.', 'Lo siento, solo efectivo.'), replies: [
    c('have-cash', '💴', t('OK, I have cash', 'はい、現金があります', '네, 현금 있어요', '好，我有現金', '好，我有现金', 'Okay, ich habe Bargeld', 'D’accord, j’ai du liquide', 'Va bene, ho contanti', 'Vale, tengo efectivo')),
    c('need-atm', '🏧', t('Please stop at an ATM first', '先にATMに寄ってください', '먼저 ATM에 들러 주세요', '請先停一下ATM', '请先停一下ATM', 'Bitte zuerst zu einem Geldautomaten', 'Arrêtez-vous d’abord à un distributeur', 'Prima si fermi a un bancomat', 'Pare primero en un cajero')),
  ] },
  { id: 'card-ok', ...t('Card is fine.', 'カードで大丈夫です。', '카드 결제 가능해요.', '可以刷卡。', '可以刷卡。', 'Karte ist in Ordnung.', 'La carte, c’est bon.', 'La carta va bene.', 'Con tarjeta está bien.') },
  { id: 'fare', ...t('Please look at the meter for the fare.', '料金はメーターの金額です。', '요금은 미터기 금액이에요.', '車資以跳表金額為準。', '车费以计价器金额为准。', 'Der Fahrpreis steht auf dem Taxameter.', 'Le prix est celui du compteur.', 'Il prezzo è quello del tassametro.', 'El precio es el del taxímetro.') },
  { id: 'seatbelt', ...t('Please fasten your seat belt.', 'シートベルトをお締めください。', '안전벨트를 매 주세요.', '請繫上安全帶。', '请系好安全带。', 'Bitte schnallen Sie sich an.', 'Attachez votre ceinture, s’il vous plaît.', 'Allacci la cintura, per favore.', 'Abróchese el cinturón, por favor.') },
  { id: 'door', ...t('The door opens and closes automatically. Please don’t touch it.', 'ドアは自動で開け閉めします。触らないでください。', '문은 자동으로 열리고 닫혀요. 만지지 마세요.', '車門會自動開關，請不要碰。', '车门会自动开关，请不要碰。', 'Die Tür öffnet und schließt automatisch. Bitte nicht anfassen.', 'La porte s’ouvre et se ferme toute seule. Ne la touchez pas.', 'La portiera si apre e si chiude da sola. Non la tocchi, per favore.', 'La puerta se abre y se cierra sola. No la toque, por favor.') },
  { id: 'arrived', ...t('We have arrived.', '到着しました。', '도착했습니다.', '到了。', '到了。', 'Wir sind angekommen.', 'Nous sommes arrivés.', 'Siamo arrivati.', 'Hemos llegado.') },
];
