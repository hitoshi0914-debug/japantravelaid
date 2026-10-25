import type { CardChoice, CardGroup, CardTextField, StaffPhrase } from '../components/card/types';
import type { Localized } from '../i18n/locales';

// 指差しカード（駅で見せる・電車ときっぷ）の文言データ。カードの画面は薬剤師カードと共通（src/components/card/）。
// 行きたい駅は自由に書ける欄（textField）。本人が駅員さん・まわりの人に聞く一言は quickPhrases、駅員さんの答えは phrases。

/** 訳を locales.ts と同じ並び（en, ja, ko, zh-tw, zh-cn, de, fr, it, es）で書くための短縮形。 */
const t = (en: string, ja: string, ko: string, zhTw: string, zhCn: string, de: string, fr: string, it: string, es: string): Localized => ({
  en, ja, ko, 'zh-tw': zhTw, 'zh-cn': zhCn, de, fr, it, es,
});

const c = (id: string, pictogram: string, label: Localized): CardChoice => ({ id, pictogram, label });

export const trainDestination: CardTextField = {
  label: t('Station I want to go to', '行きたい駅', '가고 싶은 역', '想去的車站', '想去的车站', 'Zielbahnhof', 'Gare où je veux aller', 'Stazione dove voglio andare', 'Estación a la que quiero ir'),
  hint: t(
    'Copy the station name from Google Maps if you can (Japanese is best). You can leave it empty.',
    'できれば Google マップから駅名をコピーしてください（日本語が一番伝わります）。空のままでも使えます。',
    '가능하면 Google 지도에서 역 이름을 복사하세요 (일본어가 가장 잘 통해요). 비워 둬도 돼요.',
    '可以的話從 Google 地圖複製站名（日文最容易溝通）。不填也可以使用。',
    '可以的话从 Google 地图复制站名（日文最容易沟通）。不填也可以使用。',
    'Kopieren Sie den Bahnhofsnamen möglichst aus Google Maps (Japanisch ist am besten). Sie können es auch leer lassen.',
    'Si possible, copiez le nom de la gare depuis Google Maps (le japonais est l’idéal). Vous pouvez aussi laisser vide.',
    'Se puoi, copia il nome della stazione da Google Maps (in giapponese è meglio). Puoi anche lasciarlo vuoto.',
    'Si puede, copie el nombre de la estación de Google Maps (en japonés es mejor). También puede dejarlo vacío.',
  ),
  placeholder: t('e.g. 京都駅 / Kyoto Station', '例: 京都駅', '예: 京都駅 / 교토역', '例：京都駅／京都站', '例：京都駅／京都站', 'z. B. 京都駅 / Bahnhof Kyoto', 'ex. : 京都駅 / gare de Kyoto', 'es. 京都駅 / stazione di Kyoto', 'p. ej., 京都駅 / estación de Kioto'),
  cardHeading: '行きたい駅',
};

export const trainGroups: CardGroup[] = [
  {
    id: 'trouble', single: false,
    title: t('Problem', '困っていること', '곤란한 일', '遇到的問題', '遇到的问题', 'Problem', 'Problème', 'Problema', 'Problema'),
    cardHeading: '困っています',
    choices: [
      c('missed-stop', '↩️', t('I missed my stop', '降りる駅を乗り過ごしました', '내릴 역을 지나쳤어요', '我坐過站了', '我坐过站了', 'Ich habe meine Haltestelle verpasst', 'J’ai raté mon arrêt', 'Ho saltato la mia fermata', 'Me pasé de estación')),
      c('wrong-train', '🔀', t('I took the wrong train', '違う電車に乗ってしまいました', '다른 전철을 탔어요', '我搭錯車了', '我坐错车了', 'Ich bin in den falschen Zug gestiegen', 'J’ai pris le mauvais train', 'Ho preso il treno sbagliato', 'Tomé el tren equivocado')),
      c('ic-short', '🎫', t('My IC card balance is too low to exit', 'ICカードの残高が足りなくて改札を出られません', 'IC카드 잔액이 부족해서 개찰구를 못 나가요', 'IC卡餘額不足，出不了剪票口', 'IC卡余额不足，出不了检票口', 'Mein IC-Karten-Guthaben reicht nicht zum Ausgang', 'Le solde de ma carte IC ne suffit pas pour sortir', 'Il credito della carta IC non basta per uscire', 'Mi tarjeta IC no tiene saldo suficiente para salir')),
      c('gate-error', '🚧', t('The gate won’t open for my card / ticket', '改札でカード・きっぷが通りません', '개찰구에서 카드 · 표가 안 돼요', '剪票口刷不過卡・票', '检票口刷不过卡・票', 'Die Sperre öffnet nicht mit meiner Karte / meinem Ticket', 'Le portillon refuse ma carte / mon billet', 'Il tornello non si apre con la mia carta / il mio biglietto', 'El torniquete no acepta mi tarjeta / billete')),
      c('lost-ticket', '❓', t('I lost my ticket', 'きっぷをなくしました', '표를 잃어버렸어요', '我的車票不見了', '我的车票丢了', 'Ich habe mein Ticket verloren', 'J’ai perdu mon billet', 'Ho perso il biglietto', 'He perdido el billete')),
      c('left-item', '👜', t('I left something on the train', '電車の中に忘れ物をしました', '전철 안에 물건을 두고 내렸어요', '我把東西忘在電車上了', '我把东西忘在电车上了', 'Ich habe etwas im Zug liegen lassen', 'J’ai oublié quelque chose dans le train', 'Ho dimenticato qualcosa sul treno', 'Me dejé algo en el tren')),
      c('last-train', '🌙', t('I missed the last train', '終電に乗り遅れました', '막차를 놓쳤어요', '我錯過末班車了', '我错过末班车了', 'Ich habe den letzten Zug verpasst', 'J’ai raté le dernier train', 'Ho perso l’ultimo treno', 'He perdido el último tren')),
    ],
  },
  {
    id: 'ticket', single: false,
    title: t('Tickets', 'きっぷ', '표', '車票', '车票', 'Fahrkarten', 'Billets', 'Biglietti', 'Billetes'),
    cardHeading: 'きっぷ',
    choices: [
      c('how-to-buy', '🎟️', t('How do I buy a ticket?', 'きっぷの買い方を教えてください', '표 사는 방법을 알려 주세요', '請教我怎麼買車票', '请教我怎么买车票', 'Wie kaufe ich eine Fahrkarte?', 'Comment acheter un billet ?', 'Come si compra il biglietto?', '¿Cómo compro un billete?')),
      c('charge', '💴', t('I want to top up my IC card', 'ICカードにチャージしたいです', 'IC카드를 충전하고 싶어요', '我想加值IC卡', '我想给IC卡充值', 'Ich möchte meine IC-Karte aufladen', 'Je veux recharger ma carte IC', 'Voglio ricaricare la carta IC', 'Quiero recargar mi tarjeta IC')),
      c('reserved', '💺', t('Reserved seat / limited express ticket', '指定席・特急券を買いたいです', '지정석 · 특급권을 사고 싶어요', '我想買對號座・特急券', '我想买对号座・特急票', 'Platzreservierung / Expresszuschlag', 'Place réservée / billet express', 'Posto riservato / biglietto espresso', 'Asiento reservado / billete exprés')),
      c('shinkansen', '🚄', t('Shinkansen ticket', '新幹線のきっぷを買いたいです', '신칸센 표를 사고 싶어요', '我想買新幹線車票', '我想买新干线车票', 'Shinkansen-Fahrkarte', 'Billet de Shinkansen', 'Biglietto dello Shinkansen', 'Billete de Shinkansen')),
      c('jr-pass', '🗾', t('I have a JR Pass', 'JRパスを持っています', 'JR 패스를 가지고 있어요', '我有JR Pass', '我有JR Pass', 'Ich habe einen JR Pass', 'J’ai un JR Pass', 'Ho un JR Pass', 'Tengo un JR Pass')),
      c('refund', '↩️', t('I want a refund / to change my ticket', '払い戻し・変更をしたいです', '환불 · 변경하고 싶어요', '我想退票・改票', '我想退票・改签', 'Ich möchte erstatten / umbuchen', 'Je veux un remboursement / un échange', 'Voglio un rimborso / un cambio', 'Quiero un reembolso / un cambio')),
    ],
  },
  {
    id: 'care', single: false,
    title: t('Please note', '注意', '주의 사항', '注意事項', '注意事项', 'Bitte beachten', 'À noter', 'Da sapere', 'A tener en cuenta'),
    cardHeading: 'ご注意ください',
    choices: [
      c('wheelchair', '♿', t('I use a wheelchair (help boarding)', '車いすです（乗り降りを手伝ってください）', '휠체어를 사용해요 (승하차를 도와주세요)', '我坐輪椅（請幫忙上下車）', '我坐轮椅（请帮忙上下车）', 'Ich bin im Rollstuhl (Hilfe beim Einsteigen)', 'Je suis en fauteuil roulant (aide pour monter)', 'Sono in sedia a rotelle (aiuto a salire)', 'Voy en silla de ruedas (ayuda para subir)')),
      c('luggage', '🧳', t('I have large luggage (where is the elevator?)', '大きな荷物があります（エレベーターはどこ？）', '큰 짐이 있어요 (엘리베이터는 어디예요?)', '我有大件行李（電梯在哪裡？）', '我有大件行李（电梯在哪里？）', 'Ich habe großes Gepäck (wo ist der Aufzug?)', 'J’ai de gros bagages (où est l’ascenseur ?)', 'Ho bagagli grandi (dov’è l’ascensore?)', 'Llevo equipaje grande (¿dónde está el ascensor?)')),
      c('sick', '🤢', t('I feel sick', '気分が悪いです', '몸이 안 좋아요', '我不太舒服', '我不太舒服', 'Mir geht es nicht gut', 'Je ne me sens pas bien', 'Non mi sento bene', 'Me encuentro mal')),
    ],
  },
];

export const trainIntro: Localized = t(
  'I don’t speak Japanese.\nPlease help me with the following.',
  '日本語が話せません。\n次のことで困っています。助けてください。',
  '일본어를 못 합니다.\n다음 일로 곤란해요. 도와주세요.',
  '我不會說日語。\n我遇到下面的問題，請幫幫我。',
  '我不会说日语。\n我遇到下面的问题，请帮帮我。',
  'Ich spreche kein Japanisch.\nBitte helfen Sie mir bei Folgendem.',
  'Je ne parle pas japonais.\nPouvez-vous m’aider pour ce qui suit ?',
  'Non parlo giapponese.\nMi aiuti con quanto segue, per favore.',
  'No hablo japonés.\nPor favor, ayúdeme con lo siguiente.',
);

export const trainCardTitle = '駅員さんへ';

export const trainAnswerHeading: Localized = t(
  'Staff: point to answer', '駅員さん：指差しでお答えください', '역무원분: 손가락으로 가리켜 답해 주세요', '站務員：請用手指點選回答', '站务员：请用手指点选回答',
  'Personal: Bitte auf die Antwort zeigen', 'Personnel : montrez la réponse du doigt', 'Personale: indichi la risposta', 'Personal: señale la respuesta',
);

export const trainQuickHeading: Localized = t(
  'Tap to ask', '聞きたいこと', '눌러서 물어보기', '點一下詢問', '点一下询问',
  'Antippen und fragen', 'Touchez pour demander', 'Tocca per chiedere', 'Toque para preguntar',
);

export const trainPickPrompt = t(
  'Pick at least one', '1つ以上選んでください', '하나 이상 고르세요', '請至少選擇一項', '请至少选择一项',
  'Wählen Sie mindestens eins', 'Choisissez au moins un élément', 'Scegli almeno una voce', 'Elige al menos una opción',
);

// ---- 本人が駅員さん・まわりの人に聞く一言 ----
export const trainQuickPhrases: StaffPhrase[] = [
  { id: 'stops-at', ...t('Does this train stop at the station above?', 'この電車は上の駅に止まりますか？', '이 전철은 위의 역에 서나요?', '這班電車有停上面那一站嗎？', '这趟电车停上面那一站吗？', 'Hält dieser Zug an dem oben genannten Bahnhof?', 'Ce train s’arrête-t-il à la gare ci-dessus ?', 'Questo treno ferma alla stazione qui sopra?', '¿Este tren para en la estación de arriba?') },
  { id: 'which-platform', ...t('Which platform do I go to?', '何番線から乗ればいいですか？', '몇 번 승강장에서 타면 되나요?', '要在第幾月台搭車？', '要在几号站台上车？', 'Von welchem Gleis fährt der Zug?', 'Sur quel quai dois-je aller ?', 'Da quale binario parte?', '¿De qué andén sale?') },
  { id: 'transfer', ...t('Where do I change trains?', 'どこで乗り換えればいいですか？', '어디서 갈아타면 되나요?', '要在哪裡轉車？', '要在哪里换乘？', 'Wo muss ich umsteigen?', 'Où dois-je changer de train ?', 'Dove devo cambiare treno?', '¿Dónde tengo que hacer transbordo?') },
  { id: 'fare', ...t('How much is the fare?', '運賃はいくらですか？', '운임은 얼마예요?', '車資多少錢？', '车费多少钱？', 'Wie viel kostet die Fahrt?', 'Combien coûte le trajet ?', 'Quanto costa il biglietto?', '¿Cuánto cuesta el billete?') },
  { id: 'which-exit', ...t('Which exit should I use?', '何口から出ればいいですか？', '몇 번 출구로 나가면 되나요?', '要從哪個出口出去？', '要从哪个出口出去？', 'Welchen Ausgang soll ich nehmen?', 'Quelle sortie dois-je prendre ?', 'Quale uscita devo prendere?', '¿Qué salida debo usar?') },
  { id: 'elevator', ...t('Where is the elevator?', 'エレベーターはどこですか？', '엘리베이터는 어디예요?', '電梯在哪裡？', '电梯在哪里？', 'Wo ist der Aufzug?', 'Où est l’ascenseur ?', 'Dov’è l’ascensore?', '¿Dónde está el ascensor?') },
  { id: 'locker', ...t('Where are the coin lockers?', 'コインロッカーはどこですか？', '코인로커는 어디예요?', '投幣式置物櫃在哪裡？', '投币储物柜在哪里？', 'Wo sind die Schließfächer?', 'Où sont les consignes automatiques ?', 'Dove sono gli armadietti a moneta?', '¿Dónde están las taquillas?') },
  { id: 'toilet', ...t('Where is the toilet?', 'トイレはどこですか？', '화장실은 어디예요?', '廁所在哪裡？', '厕所在哪里？', 'Wo ist die Toilette?', 'Où sont les toilettes ?', 'Dov’è il bagno?', '¿Dónde está el baño?') },
];

// ---- 駅員さんが指差す答え・説明 ----
const yes = c('yes', '⭕', t('Yes', 'はい', '예', '是', '是', 'Ja', 'Oui', 'Sì', 'Sí'));
const no = c('no', '❌', t('No', 'いいえ', '아니요', '不是', '不是', 'Nein', 'Non', 'No', 'No'));

export const trainPhrases: StaffPhrase[] = [
  { id: 'yes', ...yes.label },
  { id: 'no', ...no.label },
  { id: 'wait', ...t('Please wait a moment.', '少々お待ちください。', '잠시만 기다려 주세요.', '請稍等一下。', '请稍等一下。', 'Bitte warten Sie einen Moment.', 'Veuillez patienter un instant.', 'Attenda un momento, per favore.', 'Espere un momento, por favor.') },
  { id: 'platform-point', ...t('Platform number — I’ll point to it / write it.', '乗り場は○番線です（指差し・書いてお伝えします）。', '승강장은 ○번선이에요 (가리키거나 써 드릴게요).', '月台是第○月台（我指給您看或寫給您）。', '站台是○号站台（我指给您看或写给您）。', 'Gleis Nr. … – ich zeige es Ihnen / schreibe es auf.', 'Quai n° … – je vous le montre / je l’écris.', 'Binario n. … – glielo indico / scrivo.', 'Andén n.º … – se lo señalo / se lo escribo.') },
  { id: 'opposite', ...t('It’s the platform on the opposite side.', '反対側のホームです。', '반대편 승강장이에요.', '在對面的月台。', '在对面的站台。', 'Es ist der Bahnsteig gegenüber.', 'C’est le quai d’en face.', 'È il binario dall’altra parte.', 'Es el andén de enfrente.') },
  { id: 'not-stop', ...t('This train does not stop there. Take a local train.', 'この電車は止まりません。各駅停車に乗ってください。', '이 전철은 서지 않아요. 각역정차를 타세요.', '這班車不停那一站，請搭各站停車的車。', '这趟车不停那一站，请坐站站停的车。', 'Dieser Zug hält dort nicht. Nehmen Sie einen Nahverkehrszug.', 'Ce train ne s’y arrête pas. Prenez un train omnibus.', 'Questo treno non ferma lì. Prenda un treno locale.', 'Este tren no para allí. Tome un tren local.') },
  { id: 'change-next', ...t('Change trains at the next station.', '次の駅で乗り換えてください。', '다음 역에서 갈아타세요.', '請在下一站轉車。', '请在下一站换乘。', 'Steigen Sie an der nächsten Station um.', 'Changez de train à la prochaine gare.', 'Cambi treno alla prossima stazione.', 'Haga transbordo en la próxima estación.') },
  { id: 'go-back', ...t('Please take the train going back the other way.', '反対方向の電車で戻ってください。', '반대 방향 전철로 돌아가세요.', '請搭反方向的電車回去。', '请坐反方向的电车回去。', 'Fahren Sie bitte mit dem Zug in Gegenrichtung zurück.', 'Reprenez le train dans l’autre sens.', 'Torni indietro con il treno in direzione opposta.', 'Vuelva en el tren en sentido contrario.') },
  { id: 'fare-adjust', ...t('Please pay the difference at the fare adjustment machine.', '精算機で不足分を精算してください。', '정산기에서 부족한 금액을 정산하세요.', '請在補票機補差額。', '请在补票机补差价。', 'Zahlen Sie die Differenz am Nachzahlautomaten.', 'Payez la différence à la machine d’ajustement.', 'Paghi la differenza alla macchina di adeguamento tariffa.', 'Pague la diferencia en la máquina de ajuste de tarifa.') },
  { id: 'window', ...t('Please go to the ticket office.', 'みどりの窓口・きっぷうりばへどうぞ。', '매표소로 가세요.', '請到售票處。', '请到售票处。', 'Bitte gehen Sie zum Fahrkartenschalter.', 'Allez au guichet, s’il vous plaît.', 'Vada alla biglietteria, per favore.', 'Vaya a la taquilla, por favor.') },
  { id: 'lost-found', ...t('We’ll contact lost and found. Which train, car and time?', '忘れ物を問い合わせます。乗った電車・号車・時間を教えてください。', '분실물을 문의해 볼게요. 탄 전철 · 호차 · 시간을 알려 주세요.', '我們幫您查詢失物。請告訴我搭乘的電車、車廂和時間。', '我们帮您查询失物。请告诉我乘坐的电车、车厢和时间。', 'Wir fragen beim Fundbüro nach. Welcher Zug, Wagen, Uhrzeit?', 'Nous contactons les objets trouvés. Quel train, voiture, heure ?', 'Contattiamo gli oggetti smarriti. Quale treno, carrozza, orario?', 'Consultamos objetos perdidos. ¿Qué tren, vagón y hora?') },
  { id: 'suspended', ...t('Trains are suspended / delayed right now.', 'ただいま運転を見合わせています（遅れています）。', '지금 운행을 중단하고 있어요 (지연되고 있어요).', '目前暫停行駛（誤點中）。', '目前暂停运行（晚点中）。', 'Der Zugverkehr ist derzeit unterbrochen / verspätet.', 'Le trafic est actuellement interrompu / retardé.', 'La circolazione è sospesa / in ritardo.', 'El servicio está suspendido / con retraso.') },
  { id: 'no-more', ...t('There are no more trains today. Please use a taxi.', '今日の電車はもうありません。タクシーをご利用ください。', '오늘 전철은 이제 없어요. 택시를 이용하세요.', '今天已經沒有電車了，請搭計程車。', '今天已经没有电车了，请打车。', 'Heute fahren keine Züge mehr. Bitte nehmen Sie ein Taxi.', 'Il n’y a plus de train aujourd’hui. Prenez un taxi.', 'Oggi non ci sono più treni. Prenda un taxi.', 'Hoy ya no hay más trenes. Tome un taxi.') },
];
