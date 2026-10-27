import type { CardChoice, CardGroup, CardTextField, StaffPhrase } from '../components/card/types';
import type { Localized } from '../i18n/locales';

// 指差しカード（落とし物・盗難で交番に見せる）の文言データ。カードの画面は薬剤師カードと共通（src/components/card/）。
// なくした場所・時間は自由に書ける欄（textField）。駅・タクシーの忘れ物の問い合わせにも使えるようにする。

/** 訳を locales.ts と同じ並び（en, ja, ko, zh-tw, zh-cn, de, fr, it, es）で書くための短縮形。 */
const t = (en: string, ja: string, ko: string, zhTw: string, zhCn: string, de: string, fr: string, it: string, es: string): Localized => ({
  en, ja, ko, 'zh-tw': zhTw, 'zh-cn': zhCn, de, fr, it, es,
});

const c = (id: string, pictogram: string, label: Localized): CardChoice => ({ id, pictogram, label });

export const lostWhereWhen: CardTextField = {
  label: t('Where and when?', 'なくした場所・時間', '잃어버린 장소 · 시간', '遺失的地點・時間', '丢失的地点・时间', 'Wo und wann?', 'Où et quand ?', 'Dove e quando?', '¿Dónde y cuándo?'),
  hint: t(
    'Write the place and time if you know (station or shop names from Google Maps are easiest). You can leave it empty.',
    'わかれば場所と時間を書いてください（Google マップの駅名・店名だと伝わりやすいです）。空のままでも使えます。',
    '알면 장소와 시간을 적어 주세요 (Google 지도의 역 이름 · 가게 이름이 가장 잘 통해요). 비워 둬도 돼요.',
    '知道的話請寫下地點和時間（用 Google 地圖上的站名・店名最容易溝通）。不填也可以使用。',
    '知道的话请写下地点和时间（用 Google 地图上的站名・店名最容易沟通）。不填也可以使用。',
    'Schreiben Sie Ort und Uhrzeit, falls bekannt (Bahnhofs- oder Ladennamen aus Google Maps sind am besten). Sie können es auch leer lassen.',
    'Indiquez le lieu et l’heure si vous les connaissez (les noms de gare ou de magasin de Google Maps sont l’idéal). Vous pouvez aussi laisser vide.',
    'Scrivi luogo e ora se li sai (i nomi di stazioni o negozi di Google Maps sono i migliori). Puoi anche lasciarlo vuoto.',
    'Escriba el lugar y la hora si los sabe (los nombres de estaciones o tiendas de Google Maps son lo mejor). También puede dejarlo vacío.',
  ),
  placeholder: t('e.g. 新宿駅 / around 3 pm today', '例: 新宿駅・今日の15時ごろ', '예: 新宿駅 / 오늘 오후 3시쯤', '例：新宿駅・今天下午3點左右', '例：新宿駅・今天下午3点左右', 'z. B. 新宿駅 / heute gegen 15 Uhr', 'ex. : 新宿駅 / vers 15 h aujourd’hui', 'es. 新宿駅 / oggi verso le 15', 'p. ej., 新宿駅 / hoy hacia las 15 h'),
  cardHeading: '場所・時間',
};

export const lostGroups: CardGroup[] = [
  {
    id: 'happened', single: true,
    title: t('What happened', '何があったか', '무슨 일이 있었는지', '發生了什麼事', '发生了什么事', 'Was ist passiert', 'Ce qui s’est passé', 'Cosa è successo', 'Qué pasó'),
    cardHeading: 'できごと',
    choices: [
      c('lost', '❓', t('I lost something', '落とし物をしました（なくしました）', '물건을 잃어버렸어요', '我遺失了東西', '我丢了东西', 'Ich habe etwas verloren', 'J’ai perdu quelque chose', 'Ho perso qualcosa', 'He perdido algo')),
      c('stolen', '🚨', t('Something was stolen', '盗まれました', '도난당했어요', '東西被偷了', '东西被偷了', 'Mir wurde etwas gestohlen', 'On m’a volé quelque chose', 'Mi hanno rubato qualcosa', 'Me han robado algo')),
      c('left-transport', '🚃', t('I left it on a train / bus / taxi', '電車・バス・タクシーに忘れました', '전철 · 버스 · 택시에 두고 내렸어요', '我忘在電車・公車・計程車上了', '我忘在电车・公交・出租车上了', 'Ich habe es im Zug / Bus / Taxi liegen lassen', 'Je l’ai oublié dans le train / bus / taxi', 'L’ho lasciato sul treno / autobus / taxi', 'Me lo dejé en el tren / autobús / taxi')),
      c('found', '🙌', t('I found something (I want to hand it in)', '落とし物を拾いました（届けたいです）', '물건을 주웠어요 (맡기고 싶어요)', '我撿到東西了（想交給警察）', '我捡到东西了（想交给警察）', 'Ich habe etwas gefunden (möchte es abgeben)', 'J’ai trouvé un objet (je veux le déposer)', 'Ho trovato qualcosa (voglio consegnarlo)', 'He encontrado algo (quiero entregarlo)')),
    ],
  },
  {
    id: 'item', single: false,
    title: t('What', 'なくした物', '물건', '物品', '物品', 'Was', 'Quoi', 'Cosa', 'Qué'),
    cardHeading: '物',
    choices: [
      c('wallet', '👛', t('Wallet', '財布', '지갑', '錢包', '钱包', 'Geldbörse', 'Portefeuille', 'Portafoglio', 'Cartera')),
      c('phone', '📱', t('Smartphone', 'スマートフォン', '스마트폰', '手機', '手机', 'Smartphone', 'Smartphone', 'Smartphone', 'Móvil')),
      c('passport', '🛂', t('Passport', 'パスポート', '여권', '護照', '护照', 'Reisepass', 'Passeport', 'Passaporto', 'Pasaporte')),
      c('bag', '👜', t('Bag', 'かばん', '가방', '包包', '包', 'Tasche', 'Sac', 'Borsa', 'Bolso')),
      c('credit-card', '💳', t('Credit card', 'クレジットカード', '신용카드', '信用卡', '信用卡', 'Kreditkarte', 'Carte bancaire', 'Carta di credito', 'Tarjeta de crédito')),
      c('ic-card', '🎫', t('IC card (Suica etc.)', '交通系ICカード（Suicaなど）', '교통 IC카드 (Suica 등)', '交通IC卡（Suica等）', '交通IC卡（Suica等）', 'IC-Karte (Suica usw.)', 'Carte IC (Suica…)', 'Carta IC (Suica ecc.)', 'Tarjeta IC (Suica, etc.)')),
      c('camera', '📷', t('Camera', 'カメラ', '카메라', '相機', '相机', 'Kamera', 'Appareil photo', 'Fotocamera', 'Cámara')),
      c('keys', '🔑', t('Keys (hotel key)', '鍵（ホテルの鍵）', '열쇠 (호텔 키)', '鑰匙（飯店鑰匙）', '钥匙（酒店钥匙）', 'Schlüssel (Hotelschlüssel)', 'Clés (clé d’hôtel)', 'Chiavi (chiave dell’hotel)', 'Llaves (llave del hotel)')),
      c('suitcase', '🧳', t('Suitcase', 'スーツケース', '캐리어', '行李箱', '行李箱', 'Koffer', 'Valise', 'Valigia', 'Maleta')),
    ],
  },
  {
    id: 'need', single: false,
    title: t('What I need', 'してほしいこと', '필요한 것', '需要的協助', '需要的帮助', 'Was ich brauche', 'Ce dont j’ai besoin', 'Cosa mi serve', 'Lo que necesito'),
    cardHeading: 'お願い',
    choices: [
      c('lost-report', '📝', t('I want to file a lost property report', '遺失届を出したいです', '분실 신고를 하고 싶어요', '我想報遺失', '我想报失', 'Ich möchte eine Verlustanzeige machen', 'Je veux déclarer une perte', 'Voglio denunciare uno smarrimento', 'Quiero denunciar una pérdida')),
      c('theft-report', '🚔', t('I want to report a theft', '被害届（盗難届）を出したいです', '도난 신고를 하고 싶어요', '我想報竊盜案', '我想报盗窃案', 'Ich möchte einen Diebstahl anzeigen', 'Je veux porter plainte pour vol', 'Voglio denunciare un furto', 'Quiero denunciar un robo')),
      c('report-number', '🔢', t('I need the report number for insurance', '保険の請求に使う受理番号がほしいです', '보험 청구용 접수 번호가 필요해요', '我需要申請保險用的受理號碼', '我需要申请保险用的受理号码', 'Ich brauche die Aktenzeichen-Nummer für die Versicherung', 'J’ai besoin du numéro de déclaration pour l’assurance', 'Mi serve il numero della denuncia per l’assicurazione', 'Necesito el número de denuncia para el seguro')),
      c('check-found', '🔍', t('Has it been handed in? Please check.', '届いていないか調べてください', '분실물이 들어왔는지 확인해 주세요', '請幫我查有沒有人送來', '请帮我查有没有人送来', 'Wurde es abgegeben? Bitte nachsehen.', 'A-t-il été déposé ? Pouvez-vous vérifier ?', 'È stato consegnato? Può controllare?', '¿Lo han entregado? Compruébelo, por favor.')),
      c('interpreter', '📞', t('Can we use a phone or app interpreter?', '電話通訳・翻訳アプリを使ってもいいですか？', '전화 통역 · 번역 앱을 써도 될까요?', '可以用電話口譯或翻譯App嗎？', '可以用电话口译或翻译App吗？', 'Können wir einen Telefon- oder App-Dolmetscher nutzen?', 'Peut-on utiliser un interprète par téléphone ou une appli ?', 'Possiamo usare un interprete telefonico o un’app?', '¿Podemos usar un intérprete por teléfono o una app?')),
    ],
  },
];

export const lostIntro: Localized = t(
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

export const lostCardTitle = 'お巡りさん・係の方へ';

export const lostAnswerHeading: Localized = t(
  'Officer: point to answer', 'お巡りさん：指差しでお答えください', '경찰관님: 손가락으로 가리켜 답해 주세요', '警察：請用手指點選回答', '警察：请用手指点选回答',
  'Polizei: Bitte auf die Antwort zeigen', 'Agent : montrez la réponse du doigt', 'Agente: indichi la risposta', 'Agente: señale la respuesta',
);

export const lostQuickHeading: Localized = t(
  'Tap to ask', '聞きたいこと', '눌러서 물어보기', '點一下詢問', '点一下询问',
  'Antippen und fragen', 'Touchez pour demander', 'Tocca per chiedere', 'Toque para preguntar',
);

export const lostPickPrompt: Localized = t(
  'Pick at least one', '1つ以上選んでください', '하나 이상 고르세요', '請至少選擇一項', '请至少选择一项',
  'Wählen Sie mindestens eins', 'Choisissez au moins un élément', 'Scegli almeno una voce', 'Elige al menos una opción',
);

// ---- 本人が聞く一言 ----
export const lostQuickPhrases: StaffPhrase[] = [
  { id: 'ask-english', ...t('Is there someone who speaks English?', '英語が話せる方はいますか？', '영어를 할 수 있는 분이 있나요?', '有會說英語的人嗎？', '有会说英语的人吗？', 'Spricht hier jemand Englisch?', 'Quelqu’un parle-t-il anglais ?', 'C’è qualcuno che parla inglese?', '¿Hay alguien que hable inglés?') },
  { id: 'ask-number', ...t('Please write down the report number.', '受理番号を書いてください。', '접수 번호를 적어 주세요.', '請寫下受理號碼。', '请写下受理号码。', 'Bitte schreiben Sie mir die Aktenzeichen-Nummer auf.', 'Pouvez-vous écrire le numéro de déclaration ?', 'Mi scriva il numero della denuncia, per favore.', 'Escríbame el número de denuncia, por favor.') },
  { id: 'ask-contact', ...t('Where should I ask about it later?', 'あとでどこに問い合わせればいいですか？', '나중에 어디에 문의하면 되나요?', '之後要去哪裡詢問？', '之后要去哪里询问？', 'Wo kann ich später nachfragen?', 'Où dois-je me renseigner plus tard ?', 'Dove posso chiedere più tardi?', '¿Dónde pregunto más tarde?') },
  { id: 'ask-embassy', ...t('Please tell me how to contact my embassy.', '大使館・領事館の連絡先を教えてください。', '대사관 · 영사관 연락처를 알려 주세요.', '請告訴我大使館・領事館的聯絡方式。', '请告诉我大使馆・领事馆的联系方式。', 'Wie erreiche ich meine Botschaft?', 'Comment contacter mon ambassade ?', 'Come posso contattare la mia ambasciata?', '¿Cómo contacto con mi embajada?') },
  { id: 'ask-phone', ...t('May I borrow a phone?', '電話を貸してもらえますか？', '전화를 빌릴 수 있을까요?', '可以借我電話嗎？', '可以借我电话吗？', 'Darf ich ein Telefon benutzen?', 'Puis-je emprunter un téléphone ?', 'Posso usare un telefono?', '¿Me puede prestar un teléfono?') },
];

// ---- お巡りさん・係の方が指差す質問・説明と、本人が返す答え ----
const yes = c('yes', '⭕', t('Yes', 'はい', '예', '是', '是', 'Ja', 'Oui', 'Sì', 'Sí'));
const no = c('no', '❌', t('No', 'いいえ', '아니요', '不是', '不是', 'Nein', 'Non', 'No', 'No'));
const dunno = c('dunno', '🤷', t('I don’t know', 'わかりません', '모르겠어요', '不知道', '不知道', 'Weiß ich nicht', 'Je ne sais pas', 'Non lo so', 'No lo sé'));

export const lostPhrases: StaffPhrase[] = [
  { id: 'yes', ...yes.label },
  { id: 'no', ...no.label },
  { id: 'wait', ...t('Please wait a moment.', '少々お待ちください。', '잠시만 기다려 주세요.', '請稍等一下。', '请稍等一下。', 'Bitte warten Sie einen Moment.', 'Veuillez patienter un instant.', 'Attenda un momento, per favore.', 'Espere un momento, por favor.') },
  { id: 'looks', ...t('What does it look like? (color, brand, size)', 'どんな物ですか？（色・メーカー・大きさ）', '어떤 물건인가요? (색 · 브랜드 · 크기)', '是什麼樣的東西？（顏色、品牌、大小）', '是什么样的东西？（颜色、品牌、大小）', 'Wie sieht es aus? (Farbe, Marke, Größe)', 'À quoi ressemble-t-il ? (couleur, marque, taille)', 'Com’è? (colore, marca, dimensioni)', '¿Cómo es? (color, marca, tamaño)'), replies: [
    c('photo', '🖼️', t('I’ll show you a photo', '写真を見せます', '사진을 보여 드릴게요', '我給您看照片', '我给您看照片', 'Ich zeige ein Foto', 'Je vous montre une photo', 'Le mostro una foto', 'Le enseño una foto')),
    c('write', '✍️', t('I’ll write it down', '紙に書きます', '종이에 적을게요', '我寫在紙上', '我写在纸上', 'Ich schreibe es auf', 'Je l’écris', 'Lo scrivo', 'Lo escribo')),
  ] },
  { id: 'contents', ...t('What was inside? (cash, cards)', '中に何が入っていましたか？（現金・カードなど）', '안에 무엇이 들어 있었나요? (현금 · 카드 등)', '裡面有什麼？（現金、卡片等）', '里面有什么？（现金、卡等）', 'Was war darin? (Bargeld, Karten)', 'Qu’y avait-il dedans ? (argent, cartes)', 'Cosa c’era dentro? (contanti, carte)', '¿Qué había dentro? (dinero, tarjetas)'), replies: [
    c('write', '✍️', t('I’ll write it down', '紙に書きます', '종이에 적을게요', '我寫在紙上', '我写在纸上', 'Ich schreibe es auf', 'Je l’écris', 'Lo scrivo', 'Lo escribo')),
    dunno,
  ] },
  { id: 'when-where', ...t('When and where did you last have it?', '最後に持っていたのはいつ・どこですか？', '마지막으로 가지고 있던 게 언제 · 어디였나요?', '最後一次拿著是什麼時候、在哪裡？', '最后一次拿着是什么时候、在哪里？', 'Wann und wo hatten Sie es zuletzt?', 'Quand et où l’aviez-vous pour la dernière fois ?', 'Quando e dove l’aveva l’ultima volta?', '¿Cuándo y dónde lo tuvo por última vez?'), replies: [
    c('write', '✍️', t('I’ll write it down', '紙に書きます', '종이에 적을게요', '我寫在紙上', '我写在纸上', 'Ich schreibe es auf', 'Je l’écris', 'Lo scrivo', 'Lo escribo')),
    dunno,
  ] },
  { id: 'form', ...t('Please fill in this form. I’ll help by pointing.', 'この用紙に記入してください。指差しでお手伝いします。', '이 용지를 작성해 주세요. 손으로 가리켜 도와드릴게요.', '請填寫這張表格，我會用手指幫您。', '请填写这张表格，我会用手指帮您。', 'Bitte füllen Sie dieses Formular aus. Ich helfe durch Zeigen.', 'Remplissez ce formulaire. Je vous aide en montrant du doigt.', 'Compili questo modulo. La aiuto indicando.', 'Rellene este formulario. Le ayudo señalando.') },
  { id: 'contact', ...t('Please give us your contact (hotel name, phone, email).', '連絡先（ホテル名・電話番号・メール）を教えてください。', '연락처 (호텔 이름 · 전화번호 · 이메일)를 알려 주세요.', '請告訴我您的聯絡方式（飯店名稱、電話、Email）。', '请告诉我您的联系方式（酒店名称、电话、邮箱）。', 'Bitte geben Sie uns Ihre Kontaktdaten (Hotel, Telefon, E-Mail).', 'Donnez-nous vos coordonnées (hôtel, téléphone, e-mail).', 'Ci lasci i suoi contatti (hotel, telefono, e-mail).', 'Denos sus datos de contacto (hotel, teléfono, correo).') },
  { id: 'will-contact', ...t('If it is found, we will contact you.', '見つかったらご連絡します。', '찾으면 연락드릴게요.', '如果找到了會跟您聯絡。', '如果找到了会跟您联系。', 'Wenn es gefunden wird, melden wir uns.', 'S’il est retrouvé, nous vous contacterons.', 'Se viene ritrovato, la contatteremo.', 'Si aparece, le avisaremos.') },
  { id: 'not-here', ...t('It has not been handed in here.', 'こちらには届いていません。', '여기에는 들어오지 않았어요.', '這裡沒有人送來。', '这里没有人送来。', 'Es wurde hier nicht abgegeben.', 'Il n’a pas été déposé ici.', 'Qui non è stato consegnato.', 'Aquí no lo han entregado.') },
  { id: 'transport-office', ...t('Please ask the lost and found of the railway / bus / taxi company.', '鉄道・バス・タクシー会社の忘れ物窓口に問い合わせてください。', '철도 · 버스 · 택시 회사의 분실물 창구에 문의하세요.', '請向鐵路・公車・計程車公司的失物招領處詢問。', '请向铁路・公交・出租车公司的失物招领处询问。', 'Fragen Sie beim Fundbüro der Bahn-, Bus- oder Taxigesellschaft nach.', 'Renseignez-vous aux objets trouvés de la compagnie de train / bus / taxi.', 'Chieda all’ufficio oggetti smarriti della compagnia ferroviaria / bus / taxi.', 'Pregunte en objetos perdidos de la compañía de tren / autobús / taxi.') },
  { id: 'stop-card', ...t('Please call your card company to stop the card.', 'カード会社に電話してカードを止めてください。', '카드사에 전화해서 카드를 정지하세요.', '請打電話給信用卡公司停卡。', '请打电话给银行卡公司停卡。', 'Rufen Sie Ihre Kartenfirma an und lassen Sie die Karte sperren.', 'Appelez votre banque pour faire opposition sur la carte.', 'Chiami la società della carta per bloccarla.', 'Llame a la compañía de la tarjeta para bloquearla.') },
  { id: 'embassy', ...t('For a lost passport, contact your embassy or consulate.', 'パスポートは大使館・領事館で再発行の手続きをしてください。', '여권은 대사관 · 영사관에서 재발급 절차를 밟으세요.', '護照請到大使館・領事館辦理補發。', '护照请到大使馆・领事馆办理补发。', 'Für einen verlorenen Pass wenden Sie sich an Ihre Botschaft oder Ihr Konsulat.', 'Pour un passeport perdu, contactez votre ambassade ou consulat.', 'Per il passaporto perso, contatti la sua ambasciata o il consolato.', 'Por un pasaporte perdido, contacte con su embajada o consulado.') },
  { id: 'report-number', ...t('This is your report number. Keep it for insurance.', 'こちらが受理番号です。保険の請求に使うので控えてください。', '이게 접수 번호예요. 보험 청구에 쓰니 적어 두세요.', '這是受理號碼，申請保險會用到，請記下來。', '这是受理号码，申请保险会用到，请记下来。', 'Das ist Ihr Aktenzeichen. Bewahren Sie es für die Versicherung auf.', 'Voici votre numéro de déclaration. Gardez-le pour l’assurance.', 'Questo è il numero della denuncia. Lo conservi per l’assicurazione.', 'Este es su número de denuncia. Guárdelo para el seguro.') },
];
