import type { CardChoice, CardGroup, CardTextField, StaffPhrase } from '../components/card/types';
import type { Localized } from '../i18n/locales';

// 指差しカード（バスで見せる）の文言データ。カードの画面は薬剤師カードと共通（src/components/card/）。
// 地方の路線バス（整理券・後ろ乗り・降りるとき払う・おつりが出ない運賃箱）で困りやすいことを中心にする。

/** 訳を locales.ts と同じ並び（en, ja, ko, zh-tw, zh-cn, de, fr, it, es）で書くための短縮形。 */
const t = (en: string, ja: string, ko: string, zhTw: string, zhCn: string, de: string, fr: string, it: string, es: string): Localized => ({
  en, ja, ko, 'zh-tw': zhTw, 'zh-cn': zhCn, de, fr, it, es,
});

const c = (id: string, pictogram: string, label: Localized): CardChoice => ({ id, pictogram, label });

export const busDestination: CardTextField = {
  label: t('Where I want to get off', '降りたいバス停・行き先', '내리고 싶은 정류장 · 목적지', '想下車的站・目的地', '想下车的站・目的地', 'Wo ich aussteigen möchte', 'Où je veux descendre', 'Dove voglio scendere', 'Dónde quiero bajarme'),
  hint: t(
    'Copy the bus stop or place name from Google Maps if you can (Japanese is best). You can leave it empty.',
    'できれば Google マップからバス停・場所の名前をコピーしてください（日本語が一番伝わります）。空のままでも使えます。',
    '가능하면 Google 지도에서 정류장 · 장소 이름을 복사하세요 (일본어가 가장 잘 통해요). 비워 둬도 돼요.',
    '可以的話從 Google 地圖複製站名或地名（日文最容易溝通）。不填也可以使用。',
    '可以的话从 Google 地图复制站名或地名（日文最容易沟通）。不填也可以使用。',
    'Kopieren Sie die Haltestelle oder den Ort möglichst aus Google Maps (Japanisch ist am besten). Sie können es auch leer lassen.',
    'Si possible, copiez le nom de l’arrêt ou du lieu depuis Google Maps (le japonais est l’idéal). Vous pouvez aussi laisser vide.',
    'Se puoi, copia il nome della fermata o del luogo da Google Maps (in giapponese è meglio). Puoi anche lasciarlo vuoto.',
    'Si puede, copie el nombre de la parada o del lugar de Google Maps (en japonés es mejor). También puede dejarlo vacío.',
  ),
  placeholder: t('e.g. 白川郷 / Shirakawa-go', '例: 白川郷', '예: 白川郷 / 시라카와고', '例：白川郷', '例：白川乡（白川郷）', 'z. B. 白川郷 / Shirakawa-go', 'ex. : 白川郷 / Shirakawa-go', 'es. 白川郷 / Shirakawa-go', 'p. ej., 白川郷 / Shirakawa-go'),
  cardHeading: '降りたいところ',
};

export const busGroups: CardGroup[] = [
  {
    id: 'request', single: false,
    title: t('Requests', 'お願い', '부탁', '請求', '请求', 'Wünsche', 'Demandes', 'Richieste', 'Peticiones'),
    cardHeading: 'お願い',
    choices: [
      c('tell-me', '🔔', t('Please tell me when we get there', '着いたら教えてください', '도착하면 알려 주세요', '到了請告訴我', '到了请告诉我', 'Sagen Sie mir bitte Bescheid, wenn wir da sind', 'Prévenez-moi quand nous arrivons, s’il vous plaît', 'Mi avvisi quando arriviamo, per favore', 'Avíseme cuando lleguemos, por favor')),
      c('which-bus', '🚌', t('Which bus goes there?', 'どのバスに乗ればいいですか？', '어느 버스를 타면 되나요?', '要搭哪一班公車？', '要坐哪一路公交车？', 'Welcher Bus fährt dorthin?', 'Quel bus y va ?', 'Quale autobus ci va?', '¿Qué autobús va allí?')),
      c('return', '🔁', t('Where do I catch the bus back?', '帰りのバスはどこから乗りますか？', '돌아오는 버스는 어디서 타나요?', '回程的公車要在哪裡搭？', '回程的公交车在哪里坐？', 'Wo fährt der Bus zurück?', 'Où prendre le bus du retour ?', 'Dove prendo l’autobus del ritorno?', '¿Dónde tomo el autobús de vuelta?')),
      c('luggage', '🧳', t('I have large luggage', '大きな荷物があります', '큰 짐이 있어요', '我有大件行李', '我有大件行李', 'Ich habe großes Gepäck', 'J’ai de gros bagages', 'Ho bagagli grandi', 'Llevo equipaje grande')),
    ],
  },
  {
    id: 'pay', single: false,
    title: t('Paying', '支払い', '결제', '付款', '付款', 'Bezahlen', 'Paiement', 'Pagamento', 'Pago'),
    cardHeading: 'お支払い',
    choices: [
      c('ic', '🎫', t('Can I pay with an IC card (Suica etc.)?', '交通系ICカード（Suicaなど）は使えますか？', '교통 IC카드 (Suica 등)를 쓸 수 있나요?', '可以用交通IC卡（Suica等）嗎？', '可以用交通IC卡（Suica等）吗？', 'Kann ich mit IC-Karte (Suica usw.) zahlen?', 'Puis-je payer avec une carte IC (Suica…) ?', 'Posso pagare con carta IC (Suica ecc.)?', '¿Puedo pagar con tarjeta IC (Suica, etc.)?')),
      c('big-bill', '💴', t('I only have a 10,000 / 5,000 yen bill', '1万円札・5千円札しかありません', '만 엔 · 5천 엔 지폐밖에 없어요', '我只有一萬日圓・五千日圓鈔票', '我只有一万日元・五千日元纸币', 'Ich habe nur einen 10.000- / 5.000-Yen-Schein', 'Je n’ai qu’un billet de 10 000 / 5 000 yens', 'Ho solo una banconota da 10.000 / 5.000 yen', 'Solo tengo un billete de 10 000 / 5 000 yenes')),
      c('day-pass', '🎟️', t('I have a day pass / bus pass', '1日乗車券・フリーパスを持っています', '1일 승차권 · 프리패스를 가지고 있어요', '我有一日券・周遊券', '我有一日票・通票', 'Ich habe eine Tageskarte / einen Buspass', 'J’ai un pass journée / pass bus', 'Ho un biglietto giornaliero / abbonamento', 'Tengo un pase de un día / bono de autobús')),
      c('no-ticket', '❓', t('I didn’t take a numbered ticket when I got on', '乗るときに整理券を取りませんでした', '탈 때 정리권을 안 뽑았어요', '上車時我沒有拿整理券（號碼票）', '上车时我没有拿整理券（号码票）', 'Ich habe beim Einsteigen kein Nummernticket gezogen', 'Je n’ai pas pris de ticket numéroté en montant', 'Non ho preso il biglietto numerato salendo', 'No cogí el tique numerado al subir')),
    ],
  },
  {
    id: 'care', single: false,
    title: t('Please note', '注意', '주의 사항', '注意事項', '注意事项', 'Bitte beachten', 'À noter', 'Da sapere', 'A tener en cuenta'),
    cardHeading: 'ご注意ください',
    choices: [
      c('wheelchair', '♿', t('I use a wheelchair', '車いすを使っています', '휠체어를 사용해요', '我使用輪椅', '我使用轮椅', 'Ich benutze einen Rollstuhl', 'J’utilise un fauteuil roulant', 'Uso una sedia a rotelle', 'Uso silla de ruedas')),
      c('stroller', '👶', t('I have a baby stroller', 'ベビーカーがあります', '유모차가 있어요', '我有嬰兒車', '我有婴儿车', 'Ich habe einen Kinderwagen', 'J’ai une poussette', 'Ho un passeggino', 'Llevo un carrito de bebé')),
      c('sick', '🤢', t('I feel sick', '気分が悪いです', '몸이 안 좋아요', '我不太舒服', '我不太舒服', 'Mir geht es nicht gut', 'Je ne me sens pas bien', 'Non mi sento bene', 'Me encuentro mal')),
    ],
  },
];

export const busIntro: Localized = t(
  'I don’t speak Japanese.\nI want to go to the place below.',
  '日本語が話せません。\n下のところへ行きたいです。',
  '일본어를 못 합니다.\n아래 장소에 가고 싶어요.',
  '我不會說日語。\n我想去下面這個地方。',
  '我不会说日语。\n我想去下面这个地方。',
  'Ich spreche kein Japanisch.\nIch möchte zu folgendem Ort.',
  'Je ne parle pas japonais.\nJe veux aller à l’endroit ci-dessous.',
  'Non parlo giapponese.\nVorrei andare al luogo qui sotto.',
  'No hablo japonés.\nQuiero ir al lugar de abajo.',
);

export const busCardTitle = '運転手さん・係の方へ';

export const busAnswerHeading: Localized = t(
  'Driver: point to answer', '運転手さん：指差しでお答えください', '기사님: 손가락으로 가리켜 답해 주세요', '司機：請用手指點選回答', '司机：请用手指点选回答',
  'Fahrer: Bitte auf die Antwort zeigen', 'Chauffeur : montrez la réponse du doigt', 'Autista: indichi la risposta', 'Conductor: señale la respuesta',
);

export const busQuickHeading: Localized = t(
  'Tap to show the driver', '運転手さんに見せる', '눌러서 기사님께 보여주기', '點一下給司機看', '点一下给司机看',
  'Antippen und dem Fahrer zeigen', 'Touchez pour montrer au chauffeur', 'Tocca per mostrarlo all’autista', 'Toque para mostrárselo al conductor',
);

export const busPickPrompt = t(
  'Enter where you’re going', '行き先を入力してください', '목적지를 입력하세요', '請輸入目的地', '请输入目的地',
  'Geben Sie Ihr Ziel ein', 'Saisissez votre destination', 'Inserisci la destinazione', 'Escriba su destino',
);

// ---- 本人が見せる一言 ----
export const busQuickPhrases: StaffPhrase[] = [
  { id: 'goes-to', ...t('Does this bus go to the place above?', 'このバスは上のところへ行きますか？', '이 버스는 위의 장소에 가나요?', '這班公車有到上面那個地方嗎？', '这路公交车到上面那个地方吗？', 'Fährt dieser Bus zu dem oben genannten Ort?', 'Ce bus va-t-il à l’endroit ci-dessus ?', 'Questo autobus va al luogo qui sopra?', '¿Este autobús va al lugar de arriba?') },
  { id: 'how-much', ...t('How much is the fare?', '運賃はいくらですか？', '요금은 얼마예요?', '車資多少錢？', '车费多少钱？', 'Wie viel kostet die Fahrt?', 'Combien coûte le trajet ?', 'Quanto costa il biglietto?', '¿Cuánto cuesta el billete?') },
  { id: 'change', ...t('Could you change this bill for me?', '両替をお願いします。', '잔돈으로 바꿔 주세요.', '請幫我換零錢。', '请帮我换零钱。', 'Könnten Sie mir das wechseln?', 'Pouvez-vous me faire la monnaie ?', 'Può cambiarmi questa banconota?', '¿Me puede cambiar este billete?') },
  { id: 'how-many', ...t('How many stops until mine?', 'あといくつ目のバス停ですか？', '몇 정거장 더 가야 하나요?', '還有幾站？', '还有几站？', 'Wie viele Haltestellen noch?', 'Encore combien d’arrêts ?', 'Quante fermate mancano?', '¿Cuántas paradas faltan?') },
  { id: 'getting-off', ...t('I’m getting off here!', 'ここで降ります！', '여기서 내려요!', '我要在這裡下車！', '我要在这里下车！', 'Ich steige hier aus!', 'Je descends ici !', 'Scendo qui!', '¡Me bajo aquí!') },
  { id: 'next-bus', ...t('When is the next bus?', '次のバスは何時ですか？', '다음 버스는 몇 시예요?', '下一班公車幾點？', '下一班公交车几点？', 'Wann fährt der nächste Bus?', 'À quelle heure est le prochain bus ?', 'A che ora è il prossimo autobus?', '¿A qué hora sale el próximo autobús?') },
];

// ---- 運転手さんが指差す答え・説明 ----
const yes = c('yes', '⭕', t('Yes', 'はい', '예', '是', '是', 'Ja', 'Oui', 'Sì', 'Sí'));
const no = c('no', '❌', t('No', 'いいえ', '아니요', '不是', '不是', 'Nein', 'Non', 'No', 'No'));

export const busPhrases: StaffPhrase[] = [
  { id: 'yes', ...yes.label },
  { id: 'no', ...no.label },
  { id: 'will-tell', ...t('Not yet. I’ll tell you when we get there.', 'まだです。着いたらお知らせします。', '아직이에요. 도착하면 알려 드릴게요.', '還沒到。到了我會告訴您。', '还没到。到了我会告诉您。', 'Noch nicht. Ich sage Bescheid, wenn wir da sind.', 'Pas encore. Je vous préviendrai à l’arrivée.', 'Non ancora. La avviso quando arriviamo.', 'Todavía no. Le aviso cuando lleguemos.') },
  { id: 'next', ...t('It’s the next stop. Press the button to get off.', '次です。降りるときはボタンを押してください。', '다음이에요. 내릴 때 버튼을 눌러 주세요.', '下一站就是。下車時請按鈴。', '下一站就是。下车时请按铃。', 'Nächste Haltestelle. Drücken Sie zum Aussteigen den Knopf.', 'C’est le prochain arrêt. Appuyez sur le bouton pour descendre.', 'È la prossima fermata. Prema il pulsante per scendere.', 'Es la próxima parada. Pulse el botón para bajar.') },
  { id: 'not-this-bus', ...t('This bus doesn’t go there. Please take a different bus.', 'このバスは行きません。別のバスに乗ってください。', '이 버스는 안 가요. 다른 버스를 타세요.', '這班公車不到那裡，請搭別班公車。', '这路公交车不到那里，请坐别的车。', 'Dieser Bus fährt nicht dorthin. Nehmen Sie bitte einen anderen Bus.', 'Ce bus n’y va pas. Prenez un autre bus.', 'Questo autobus non ci va. Prenda un altro autobus.', 'Este autobús no va allí. Tome otro autobús.') },
  { id: 'take-ticket', ...t('Please take a numbered ticket when you get on.', '乗るときに整理券を取ってください。', '탈 때 정리권을 뽑아 주세요.', '上車時請拿整理券（號碼票）。', '上车时请拿整理券（号码票）。', 'Ziehen Sie beim Einsteigen bitte ein Nummernticket.', 'Prenez un ticket numéroté en montant.', 'Prenda il biglietto numerato quando sale.', 'Coja un tique numerado al subir.') },
  { id: 'pay-later', ...t('Pay when you get off. The fare is shown on the board at the front.', '料金は降りるときに払ってください。前の表示板の金額です。', '요금은 내릴 때 내세요. 앞쪽 표시판의 금액이에요.', '下車時付款。金額看前面的顯示板。', '下车时付款。金额看前面的显示屏。', 'Zahlen Sie beim Aussteigen. Der Preis steht auf der Anzeige vorne.', 'Payez en descendant. Le prix est affiché à l’avant.', 'Paghi quando scende. Il prezzo è sul tabellone davanti.', 'Pague al bajar. El precio está en el panel de delante.') },
  { id: 'exact-fare', ...t('The fare box gives no change. Use the change machine first.', '運賃箱はおつりが出ません。先に両替機で両替してください。', '요금함에서는 거스름돈이 안 나와요. 먼저 동전 교환기로 바꾸세요.', '投幣箱不找零。請先用兌幣機換零錢。', '投币箱不找零。请先用换币机换零钱。', 'Der Fahrgeldkasten gibt kein Wechselgeld. Bitte zuerst am Wechsler wechseln.', 'La caisse ne rend pas la monnaie. Faites d’abord la monnaie à l’appareil.', 'La cassetta non dà resto. Cambi prima alla macchinetta.', 'La caja no da cambio. Cambie primero en la máquina.') },
  { id: 'no-big-bill', ...t('Sorry, we can’t change 10,000 / 5,000 yen bills here.', '申し訳ありません、1万円札・5千円札は両替できません。', '죄송합니다. 만 엔 · 5천 엔 지폐는 바꿀 수 없어요.', '不好意思，一萬・五千日圓鈔票不能換。', '不好意思，一万・五千日元纸币不能换。', 'Leider können wir 10.000- / 5.000-Yen-Scheine nicht wechseln.', 'Désolé, nous ne pouvons pas changer les billets de 10 000 / 5 000 yens.', 'Mi dispiace, non possiamo cambiare banconote da 10.000 / 5.000 yen.', 'Lo siento, no podemos cambiar billetes de 10 000 / 5 000 yenes.') },
  { id: 'no-ic', ...t('IC cards can’t be used on this bus. Cash only.', 'このバスはICカードが使えません。現金のみです。', '이 버스는 IC카드를 쓸 수 없어요. 현금만 돼요.', '這班公車不能用IC卡，只收現金。', '这路公交车不能用IC卡，只收现金。', 'In diesem Bus gehen keine IC-Karten. Nur Bargeld.', 'Les cartes IC ne sont pas acceptées dans ce bus. Espèces uniquement.', 'Su questo autobus la carta IC non vale. Solo contanti.', 'En este autobús no se aceptan tarjetas IC. Solo efectivo.') },
  { id: 'back-door', ...t('Please get on at the back door.', '後ろのドアから乗ってください。', '뒷문으로 타세요.', '請從後門上車。', '请从后门上车。', 'Bitte hinten einsteigen.', 'Montez par la porte arrière, s’il vous plaît.', 'Salga dalla porta posteriore, per favore.', 'Suba por la puerta de atrás, por favor.') },
  { id: 'last-bus', ...t('This is the last bus today.', '今日はこれが最終バスです。', '오늘은 이게 막차예요.', '這是今天的末班車。', '这是今天的末班车。', 'Das ist heute der letzte Bus.', 'C’est le dernier bus aujourd’hui.', 'È l’ultimo autobus di oggi.', 'Es el último autobús de hoy.') },
];
