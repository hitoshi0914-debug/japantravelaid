import type { CardChoice, CardGroup, StaffPhrase } from '../components/card/types';
import type { Localized } from '../i18n/locales';
import { groups as pharmacistGroups } from './pharmacist';

// 指差しカード（病院・クリニックの受付で見せる）の文言データ。カードの画面は薬剤師カードと共通（src/components/card/）。
// 【医師法の注意】ここに書くのは「本人の状態の申告」と「受付・支払いのこと」だけ。診断・治療の推奨にあたる文言は書かない。
// 症状・いつから・持病は薬剤師カードのデータを使い回す（同じ訳を二重に持たない）。

/** 訳を locales.ts と同じ並び（en, ja, ko, zh-tw, zh-cn, de, fr, it, es）で書くための短縮形。 */
const t = (en: string, ja: string, ko: string, zhTw: string, zhCn: string, de: string, fr: string, it: string, es: string): Localized => ({
  en, ja, ko, 'zh-tw': zhTw, 'zh-cn': zhCn, de, fr, it, es,
});

const c = (id: string, pictogram: string, label: Localized): CardChoice => ({ id, pictogram, label });
const pharmacist = (id: string) => pharmacistGroups.find((g) => g.id === id)!;

// 薬局向けの症状のうち、病院の受付では使わないもの（予防・目の疲れなど）を除き、病院で多いものを足す。
const notForHospital = new Set(['motion-sickness', 'tired-eyes', 'hangover', 'constipation', 'heartburn']);
const extraSymptoms: CardChoice[] = [
  c('vomiting', '🤮', t('Vomiting', '嘔吐', '구토', '嘔吐', '呕吐', 'Erbrechen', 'Vomissements', 'Vomito', 'Vómitos')),
  c('dizziness', '💫', t('Dizziness', 'めまい', '어지러움', '頭暈', '头晕', 'Schwindel', 'Vertiges', 'Capogiri', 'Mareo')),
  c('breathing', '😮‍💨', t('Hard to breathe', '息苦しい', '숨쉬기 힘들어요', '呼吸困難', '呼吸困难', 'Atemnot', 'Difficulté à respirer', 'Difficoltà a respirare', 'Dificultad para respirar')),
  c('chest-pain', '💔', t('Chest pain', '胸の痛み', '가슴 통증', '胸痛', '胸痛', 'Brustschmerzen', 'Douleur thoracique', 'Dolore al petto', 'Dolor en el pecho')),
  c('hit-head', '🤕', t('I hit my head', '頭を打った', '머리를 부딪쳤어요', '撞到頭', '撞到头', 'Kopf angeschlagen', 'Je me suis cogné la tête', 'Ho battuto la testa', 'Me di un golpe en la cabeza')),
  c('bone', '🦴', t('Possible broken bone', '骨が折れたかもしれない', '뼈가 부러진 것 같아요', '可能骨折了', '可能骨折了', 'Vielleicht gebrochen', 'Peut-être une fracture', 'Forse una frattura', 'Quizá un hueso roto')),
  c('ear', '👂', t('Ear pain', '耳の痛み', '귀 통증', '耳朵痛', '耳朵痛', 'Ohrenschmerzen', 'Mal d’oreille', 'Mal d’orecchio', 'Dolor de oído')),
];

export const hospitalGroups: CardGroup[] = [
  pharmacist('who'),
  {
    ...pharmacist('symptoms'),
    choices: [...pharmacist('symptoms').choices.filter((ch) => !notForHospital.has(ch.id)), ...extraSymptoms],
  },
  pharmacist('since'),
  {
    id: 'reception', single: false,
    title: t('Reception & payment', '受付・支払い', '접수 · 결제', '掛號・付款', '挂号・付款', 'Anmeldung & Zahlung', 'Accueil et paiement', 'Accettazione e pagamento', 'Recepción y pago'),
    cardHeading: '受付・お支払い',
    choices: [
      c('no-insurance', '🚫', t('No Japanese health insurance (I’ll pay the full cost)', '日本の健康保険はありません（全額自己負担で払います）', '일본 건강보험이 없어요 (전액 본인 부담으로 낼게요)', '我沒有日本的健康保險（全額自費）', '我没有日本的医疗保险（全额自费）', 'Keine japanische Krankenversicherung (ich zahle alles selbst)', 'Pas d’assurance maladie japonaise (je paie la totalité)', 'Nessuna assicurazione sanitaria giapponese (pago tutto io)', 'Sin seguro médico japonés (pago el total)')),
      c('travel-insurance', '🧾', t('I have travel insurance (please give me documents for a claim)', '海外旅行保険に入っています（請求用の書類をください）', '여행자 보험이 있어요 (청구용 서류를 주세요)', '我有旅遊保險（請給我申請理賠用的文件）', '我有旅游保险（请给我理赔用的文件）', 'Ich habe eine Reiseversicherung (bitte Unterlagen für die Erstattung)', 'J’ai une assurance voyage (merci de me donner les documents pour le remboursement)', 'Ho un’assicurazione di viaggio (mi servono i documenti per il rimborso)', 'Tengo seguro de viaje (necesito los documentos para reclamar)')),
      c('english-doctor', '🗣️', t('I’d like a doctor who speaks English', '英語が話せる医師を希望します', '영어를 할 수 있는 의사를 원해요', '希望能看會說英語的醫師', '希望看会说英语的医生', 'Ich möchte einen Arzt, der Englisch spricht', 'Je voudrais un médecin qui parle anglais', 'Vorrei un medico che parli inglese', 'Quisiera un médico que hable inglés')),
      c('interpreter', '📞', t('Can we use a phone or app interpreter?', '電話通訳・翻訳アプリを使ってもいいですか？', '전화 통역 · 번역 앱을 써도 될까요?', '可以用電話口譯或翻譯App嗎？', '可以用电话口译或翻译App吗？', 'Können wir einen Telefon- oder App-Dolmetscher nutzen?', 'Peut-on utiliser un interprète par téléphone ou une appli ?', 'Possiamo usare un interprete telefonico o un’app?', '¿Podemos usar un intérprete por teléfono o una app?')),
      c('card-pay', '💳', t('I’d like to pay by credit card', 'クレジットカードで払いたいです', '신용카드로 내고 싶어요', '我想刷信用卡', '我想刷信用卡', 'Ich möchte mit Kreditkarte zahlen', 'Je voudrais payer par carte', 'Vorrei pagare con carta di credito', 'Quisiera pagar con tarjeta')),
      c('certificate', '📄', t('I need a medical certificate / receipt (in English if possible)', '診断書・領収書がほしいです（できれば英語で）', '진단서 · 영수증이 필요해요 (가능하면 영어로)', '我需要診斷書・收據（可以的話用英文）', '我需要诊断书・收据（可以的话用英文）', 'Ich brauche ein Attest / eine Quittung (wenn möglich auf Englisch)', 'J’ai besoin d’un certificat médical / reçu (en anglais si possible)', 'Mi serve un certificato medico / ricevuta (in inglese se possibile)', 'Necesito un certificado médico / recibo (en inglés si es posible)')),
    ],
  },
  pharmacist('conditions'),
];

export const hospitalIntro: Localized = t(
  'I don’t speak Japanese.\nI’d like to see a doctor about the following.',
  '日本語が話せません。\n次の症状で診察を受けたいです。',
  '일본어를 못 합니다.\n다음 증상으로 진료를 받고 싶어요.',
  '我不會說日語。\n我想因為下面的症狀看醫生。',
  '我不会说日语。\n我想因为下面的症状看医生。',
  'Ich spreche kein Japanisch.\nIch möchte wegen Folgendem einen Arzt sehen.',
  'Je ne parle pas japonais.\nJe voudrais consulter un médecin pour ce qui suit.',
  'Non parlo giapponese.\nVorrei farmi visitare per quanto segue.',
  'No hablo japonés.\nQuisiera ver a un médico por lo siguiente.',
);

export const hospitalCardTitle = '受付の方へ';

export const hospitalAnswerHeading: Localized = t(
  'Staff: point to answer', '受付の方：指差しでお答えください', '접수 직원분: 손가락으로 가리켜 답해 주세요', '櫃台人員：請用手指點選回答', '前台人员：请用手指点选回答',
  'Personal: Bitte auf die Antwort zeigen', 'Personnel : montrez la réponse du doigt', 'Personale: indichi la risposta', 'Personal: señale la respuesta',
);

export const hospitalQuickHeading: Localized = t(
  'Tap to ask', '聞きたいこと', '눌러서 물어보기', '點一下詢問', '点一下询问',
  'Antippen und fragen', 'Touchez pour demander', 'Tocca per chiedere', 'Toque para preguntar',
);

export const hospitalPickPrompt: Localized = t(
  'Pick at least one', '1つ以上選んでください', '하나 이상 고르세요', '請至少選擇一項', '请至少选择一项',
  'Wählen Sie mindestens eins', 'Choisissez au moins un élément', 'Scegli almeno una voce', 'Elige al menos una opción',
);

export const hospitalDisclaimer: Localized = t(
  'Not medical advice. This card only helps you talk to hospital staff. In an emergency, call 119.',
  'このカードは医療行為・診断を行うものではなく、病院の方と話すための補助です。緊急のときは119番に電話してください。',
  '의료 조언이 아닙니다. 병원 직원과 대화를 돕는 카드일 뿐입니다. 응급 시에는 119에 전화하세요.',
  '本卡片不提供醫療建議，只協助您與醫院人員溝通。緊急時請撥打119。',
  '本卡片不提供医疗建议，只协助您与医院人员沟通。紧急时请拨打119。',
  'Keine medizinische Beratung. Diese Karte hilft nur bei der Verständigung mit dem Krankenhauspersonal. Im Notfall 119 anrufen.',
  'Ceci n’est pas un avis médical. Cette carte aide seulement à communiquer avec le personnel de l’hôpital. En cas d’urgence, appelez le 119.',
  'Non è un consiglio medico. Questa scheda aiuta solo a comunicare con il personale dell’ospedale. In caso di emergenza, chiama il 119.',
  'No es consejo médico. Esta tarjeta solo ayuda a hablar con el personal del hospital. En una emergencia, llame al 119.',
);

// ---- 本人が受付の方に聞く一言 ----
export const hospitalQuickPhrases: StaffPhrase[] = [
  { id: 'ask-english', ...t('Is there a doctor who speaks English?', '英語が話せる医師はいますか？', '영어를 할 수 있는 의사가 있나요?', '有會說英語的醫師嗎？', '有会说英语的医生吗？', 'Gibt es einen Arzt, der Englisch spricht?', 'Y a-t-il un médecin qui parle anglais ?', 'C’è un medico che parla inglese?', '¿Hay algún médico que hable inglés?') },
  { id: 'ask-wait', ...t('How long is the wait?', 'どのくらい待ちますか？', '얼마나 기다려야 하나요?', '要等多久？', '要等多久？', 'Wie lange muss ich warten?', 'Combien de temps faut-il attendre ?', 'Quanto c’è da aspettare?', '¿Cuánto hay que esperar?') },
  { id: 'ask-cost', ...t('About how much will it cost?', '費用はだいたいいくらですか？', '비용은 대략 얼마인가요?', '費用大概多少？', '费用大概多少？', 'Was kostet es ungefähr?', 'Combien cela coûtera-t-il environ ?', 'Quanto costerà più o meno?', '¿Cuánto costará más o menos?') },
  { id: 'ask-card', ...t('Can I pay by credit card?', 'クレジットカードで払えますか？', '신용카드로 낼 수 있나요?', '可以刷信用卡嗎？', '可以刷信用卡吗？', 'Kann ich mit Kreditkarte zahlen?', 'Puis-je payer par carte ?', 'Posso pagare con carta di credito?', '¿Puedo pagar con tarjeta?') },
  { id: 'ask-worse', ...t('I feel worse. Please hurry.', '具合が悪くなってきました。急いでください。', '상태가 더 나빠졌어요. 서둘러 주세요.', '我變得更不舒服了，請快一點。', '我变得更不舒服了，请快一点。', 'Mir geht es schlechter. Bitte beeilen Sie sich.', 'Je me sens plus mal. Dépêchez-vous, s’il vous plaît.', 'Sto peggio. Faccia presto, per favore.', 'Me encuentro peor. Dense prisa, por favor.') },
  { id: 'ask-toilet', ...t('Where is the toilet?', 'トイレはどこですか？', '화장실은 어디예요?', '廁所在哪裡？', '厕所在哪里？', 'Wo ist die Toilette?', 'Où sont les toilettes ?', 'Dov’è il bagno?', '¿Dónde está el baño?') },
];

// ---- 受付の方が指差す質問・説明と、本人が返す答え ----
const yes = c('yes', '⭕', t('Yes', 'はい', '예', '是', '是', 'Ja', 'Oui', 'Sì', 'Sí'));
const no = c('no', '❌', t('No', 'いいえ', '아니요', '不是', '不是', 'Nein', 'Non', 'No', 'No'));

export const hospitalPhrases: StaffPhrase[] = [
  { id: 'yes', ...yes.label },
  { id: 'no', ...no.label },
  { id: 'insurance', ...t('Do you have a health insurance card?', '保険証はお持ちですか？', '보험증 있으세요?', '請問有健保卡嗎？', '请问有医保卡吗？', 'Haben Sie eine Versichertenkarte?', 'Avez-vous une carte d’assurance maladie ?', 'Ha la tessera dell’assicurazione sanitaria?', '¿Tiene tarjeta de seguro médico?'), replies: [
    c('travel', '🧾', t('Travel insurance only', '海外旅行保険だけです', '여행자 보험만 있어요', '只有旅遊保險', '只有旅游保险', 'Nur Reiseversicherung', 'Seulement une assurance voyage', 'Solo assicurazione di viaggio', 'Solo seguro de viaje')),
    c('none', '🚫', t('No insurance', '保険はありません', '보험이 없어요', '沒有保險', '没有保险', 'Keine Versicherung', 'Pas d’assurance', 'Nessuna assicurazione', 'Sin seguro')),
  ] },
  { id: 'passport', ...t('Please show your passport.', 'パスポートを見せてください。', '여권을 보여 주세요.', '請出示護照。', '请出示护照。', 'Bitte zeigen Sie Ihren Reisepass.', 'Montrez votre passeport, s’il vous plaît.', 'Mi mostri il passaporto, per favore.', 'Muéstreme su pasaporte, por favor.') },
  { id: 'form', ...t('Please fill in this form. I’ll help by pointing.', 'この用紙に記入してください。指差しでお手伝いします。', '이 용지를 작성해 주세요. 손으로 가리켜 도와드릴게요.', '請填寫這張表格，我會用手指幫您。', '请填写这张表格，我会用手指帮您。', 'Bitte füllen Sie dieses Formular aus. Ich helfe durch Zeigen.', 'Remplissez ce formulaire. Je vous aide en montrant du doigt.', 'Compili questo modulo. La aiuto indicando.', 'Rellene este formulario. Le ayudo señalando.') },
  { id: 'temperature', ...t('Please take your temperature.', '体温を測ってください。', '체온을 재 주세요.', '請量一下體溫。', '请量一下体温。', 'Bitte messen Sie Ihre Temperatur.', 'Prenez votre température, s’il vous plaît.', 'Si misuri la temperatura, per favore.', 'Tómese la temperatura, por favor.') },
  { id: 'where-pain', ...t('Where does it hurt most? Please point to it.', 'どこが一番痛いですか？指で示してください。', '어디가 제일 아프세요? 손으로 가리켜 주세요.', '哪裡最痛？請用手指出來。', '哪里最痛？请用手指出来。', 'Wo tut es am meisten weh? Bitte zeigen Sie darauf.', 'Où avez-vous le plus mal ? Montrez du doigt.', 'Dove le fa più male? Lo indichi, per favore.', '¿Dónde le duele más? Señálelo, por favor.') },
  { id: 'wait-name', ...t('Please have a seat. We’ll call your name.', 'おかけになってお待ちください。お名前をお呼びします。', '앉아서 기다려 주세요. 이름을 불러 드릴게요.', '請坐著稍等，我們會叫您的名字。', '请坐着稍等，我们会叫您的名字。', 'Bitte nehmen Sie Platz. Wir rufen Ihren Namen auf.', 'Asseyez-vous, nous vous appellerons.', 'Si accomodi, la chiameremo per nome.', 'Siéntese, por favor. Le llamaremos por su nombre.') },
  { id: 'no-english', ...t('Sorry, no doctor here speaks English.', '申し訳ありません、英語が話せる医師はいません。', '죄송합니다. 영어를 할 수 있는 의사가 없어요.', '不好意思，這裡沒有會說英語的醫師。', '不好意思，这里没有会说英语的医生。', 'Leider spricht hier kein Arzt Englisch.', 'Désolé, aucun médecin ne parle anglais ici.', 'Mi dispiace, qui nessun medico parla inglese.', 'Lo siento, aquí ningún médico habla inglés.') },
  { id: 'other-hospital', ...t('We can’t see you here. We’ll refer you to another hospital.', 'こちらでは診察できません。別の病院をご案内します。', '여기서는 진료할 수 없어요. 다른 병원을 안내해 드릴게요.', '我們這裡無法看診，會幫您介紹其他醫院。', '我们这里无法看诊，会帮您介绍其他医院。', 'Wir können Sie hier nicht behandeln. Wir verweisen Sie an ein anderes Krankenhaus.', 'Nous ne pouvons pas vous recevoir ici. Nous vous orientons vers un autre hôpital.', 'Qui non possiamo visitarla. La indirizziamo a un altro ospedale.', 'Aquí no podemos atenderle. Le indicamos otro hospital.') },
  { id: 'closed', ...t('Consultations are over for today.', '本日の診察は終了しました。', '오늘 진료는 끝났어요.', '今天的門診已經結束了。', '今天的门诊已经结束了。', 'Die Sprechstunde ist für heute beendet.', 'Les consultations sont terminées pour aujourd’hui.', 'Le visite di oggi sono terminate.', 'Las consultas de hoy han terminado.') },
  { id: 'deposit', ...t('Without insurance you pay the full cost. A deposit may be needed.', '保険がない場合は全額自己負担です。預かり金が必要な場合があります。', '보험이 없으면 전액 본인 부담이에요. 보증금이 필요할 수 있어요.', '沒有保險要全額自費，可能需要先付押金。', '没有保险要全额自费，可能需要先付押金。', 'Ohne Versicherung zahlen Sie alles selbst. Eventuell ist eine Anzahlung nötig.', 'Sans assurance, vous payez la totalité. Un acompte peut être demandé.', 'Senza assicurazione paga tutto lei. Potrebbe servire un deposito.', 'Sin seguro paga el total. Puede que se pida un depósito.') },
  { id: 'cash-only', ...t('Sorry, cash only.', '申し訳ありません、現金のみです。', '죄송합니다. 현금만 가능해요.', '不好意思，只收現金。', '不好意思，只收现金。', 'Leider nur Barzahlung.', 'Désolé, espèces uniquement.', 'Mi dispiace, solo contanti.', 'Lo siento, solo efectivo.') },
];
