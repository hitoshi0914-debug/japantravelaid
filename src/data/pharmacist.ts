import type { Localized } from '../i18n/locales';

// 指差しカード（Show to Pharmacist）の文言データ。
// 【薬機法・医師法の注意】ここに書くのは「本人の状態・希望の申告」と「薬剤師からの質問」だけ。
// 「この症状にはこの薬」のような診断・推奨の文言は書かない。

export interface Choice {
  id: string;
  pictogram: string;
  label: Localized;
}

export type GroupId = 'symptoms' | 'wishes' | 'conditions' | 'since' | 'who';

export interface ChoiceGroup {
  id: GroupId;
  /** 1つだけ選ぶ（since・who）か、いくつでも選べるか。 */
  single: boolean;
  title: Localized;
  /** カードに出す日本語の見出し（店員向け）。 */
  cardHeading: string;
  choices: Choice[];
}

export const groups: ChoiceGroup[] = [
  {
    id: 'who', single: true,
    title: { en: 'Who is it for?', ja: '誰の薬ですか' },
    cardHeading: '使う人',
    choices: [
      { id: 'me', pictogram: '🙋', label: { en: 'Me (adult)', ja: '本人（大人）' } },
      { id: 'child', pictogram: '🧒', label: { en: 'My child', ja: '子ども' } },
      { id: 'elderly', pictogram: '🧓', label: { en: 'Elderly person (65+)', ja: '高齢者（65歳以上）' } },
    ],
  },
  {
    id: 'symptoms', single: false,
    title: { en: 'Symptoms', ja: '症状' },
    cardHeading: '症状',
    choices: [
      { id: 'headache', pictogram: '🤕', label: { en: 'Headache', ja: '頭痛' } },
      { id: 'fever', pictogram: '🌡️', label: { en: 'Fever', ja: '発熱' } },
      { id: 'sore-throat', pictogram: '😣', label: { en: 'Sore throat', ja: 'のどの痛み' } },
      { id: 'cough', pictogram: '😷', label: { en: 'Cough', ja: 'せき' } },
      { id: 'runny-nose', pictogram: '🤧', label: { en: 'Runny / stuffy nose', ja: '鼻水・鼻づまり' } },
      { id: 'stomach-ache', pictogram: '🫃', label: { en: 'Stomach ache', ja: '腹痛・胃痛' } },
      { id: 'heartburn', pictogram: '🔥', label: { en: 'Heartburn / indigestion', ja: '胸やけ・胃もたれ' } },
      { id: 'diarrhea', pictogram: '🚽', label: { en: 'Diarrhea', ja: '下痢' } },
      { id: 'constipation', pictogram: '🧱', label: { en: 'Constipation', ja: '便秘' } },
      { id: 'nausea', pictogram: '🤢', label: { en: 'Nausea', ja: '吐き気' } },
      { id: 'motion-sickness', pictogram: '🚌', label: { en: 'Motion sickness (prevent)', ja: '乗り物酔い（予防）' } },
      { id: 'period-pain', pictogram: '🩸', label: { en: 'Period pain', ja: '生理痛' } },
      { id: 'muscle-pain', pictogram: '💪', label: { en: 'Muscle / back pain', ja: '筋肉痛・腰痛' } },
      { id: 'sprain', pictogram: '🦶', label: { en: 'Sprain / bruise', ja: '捻挫・打撲' } },
      { id: 'cut', pictogram: '🩹', label: { en: 'Cut / scrape', ja: '切り傷・すり傷' } },
      { id: 'burn', pictogram: '♨️', label: { en: 'Minor burn', ja: '軽いやけど' } },
      { id: 'insect-bite', pictogram: '🦟', label: { en: 'Insect bite / itch', ja: '虫刺され・かゆみ' } },
      { id: 'rash', pictogram: '🔴', label: { en: 'Skin rash', ja: '湿疹・かぶれ' } },
      { id: 'sunburn', pictogram: '☀️', label: { en: 'Sunburn', ja: '日焼け' } },
      { id: 'itchy-eyes', pictogram: '👁️', label: { en: 'Itchy / red eyes', ja: '目のかゆみ・充血' } },
      { id: 'tired-eyes', pictogram: '😵', label: { en: 'Tired / dry eyes', ja: '目の疲れ・乾き' } },
      { id: 'hay-fever', pictogram: '🌸', label: { en: 'Hay fever / allergy', ja: '花粉症・アレルギー症状' } },
      { id: 'toothache', pictogram: '🦷', label: { en: 'Toothache', ja: '歯の痛み' } },
      { id: 'hangover', pictogram: '🍺', label: { en: 'Hangover', ja: '二日酔い' } },
    ],
  },
  {
    id: 'since', single: true,
    title: { en: 'Since when?', ja: 'いつから' },
    cardHeading: 'いつから',
    choices: [
      { id: 'today', pictogram: '🕐', label: { en: 'Since today', ja: '今日から' } },
      { id: 'yesterday', pictogram: '📅', label: { en: 'Since yesterday', ja: '昨日から' } },
      { id: 'days', pictogram: '🗓️', label: { en: '2–3 days', ja: '2〜3日前から' } },
      { id: 'week', pictogram: '📆', label: { en: 'A week or more', ja: '1週間以上前から' } },
    ],
  },
  {
    id: 'wishes', single: false,
    title: { en: 'I would like…', ja: '希望' },
    cardHeading: '希望',
    choices: [
      { id: 'non-drowsy', pictogram: '😳', label: { en: 'Non-drowsy', ja: '眠くなりにくいもの' } },
      { id: 'gentle-stomach', pictogram: '🫶', label: { en: 'Gentle on the stomach', ja: '胃にやさしいもの' } },
      { id: 'no-water', pictogram: '💧', label: { en: 'Can take without water', ja: '水なしで飲めるもの' } },
      { id: 'small-pack', pictogram: '📦', label: { en: 'Small pack (short trip)', ja: '少量のパッケージ' } },
      { id: 'not-pill', pictogram: '🧴', label: { en: 'Not a pill (patch, spray…)', ja: '飲み薬以外（貼り薬・スプレー等）' } },
      { id: 'cheap', pictogram: '💴', label: { en: 'Inexpensive', ja: '安いもの' } },
    ],
  },
  {
    id: 'conditions', single: false,
    title: { en: 'Allergies & conditions', ja: 'アレルギー・体の状態' },
    cardHeading: '注意事項',
    choices: [
      { id: 'pregnant', pictogram: '🤰', label: { en: 'Pregnant / may be pregnant', ja: '妊娠中・妊娠の可能性あり' } },
      { id: 'breastfeeding', pictogram: '🍼', label: { en: 'Breastfeeding', ja: '授乳中' } },
      { id: 'aspirin-asthma', pictogram: '🫁', label: { en: 'Aspirin-induced asthma', ja: 'アスピリン喘息' } },
      { id: 'asthma', pictogram: '😮‍💨', label: { en: 'Asthma', ja: '喘息' } },
      { id: 'drug-allergy', pictogram: '⚠️', label: { en: 'Allergic to some medicine', ja: '薬のアレルギーあり' } },
      { id: 'penicillin', pictogram: '🚫', label: { en: 'Penicillin allergy', ja: 'ペニシリンアレルギー' } },
      { id: 'other-medicine', pictogram: '💊', label: { en: 'Taking other medicine', ja: '他の薬を服用中' } },
      { id: 'high-bp', pictogram: '❤️', label: { en: 'High blood pressure / heart disease', ja: '高血圧・心臓病' } },
      { id: 'diabetes', pictogram: '🩸', label: { en: 'Diabetes', ja: '糖尿病' } },
      { id: 'kidney-liver', pictogram: '🫘', label: { en: 'Kidney or liver disease', ja: '腎臓病・肝臓病' } },
      { id: 'stomach-ulcer', pictogram: '🩺', label: { en: 'Stomach ulcer (now or before)', ja: '胃潰瘍（現在または過去）' } },
    ],
  },
];

/** カード上部の定型文（店員向けの日本語 ＋ 本人確認用の英語）。 */
export const cardIntro: Localized = {
  ja: '日本語が話せません。\nこの内容で使える市販薬について相談させてください。',
  en: "I don't speak Japanese.\nI'd like to ask which over-the-counter medicine is suitable for me.",
};

/** カード下部：薬剤師が指差しで返すエリア。replies は本人が答えるための選択肢。 */
export interface PharmacistPhrase {
  id: string;
  ja: string;
  en: string;
  replies?: Choice[];
}

const yesNo: Choice[] = [
  { id: 'yes', pictogram: '⭕', label: { en: 'Yes', ja: 'はい' } },
  { id: 'no', pictogram: '❌', label: { en: 'No', ja: 'いいえ' } },
];

export const pharmacistPhrases: PharmacistPhrase[] = [
  { id: 'yes', ja: 'はい', en: 'Yes' },
  { id: 'no', ja: 'いいえ', en: 'No' },
  {
    id: 'how-long', ja: '症状はいつからですか？', en: 'Since when have you had these symptoms?',
    replies: groups.find((g) => g.id === 'since')!.choices,
  },
  { id: 'other-medicine', ja: '他に飲んでいる薬はありますか？', en: 'Are you taking any other medicine?', replies: [...yesNo, { id: 'show', pictogram: '📱', label: { en: 'I will show you', ja: 'お見せします' } }] },
  { id: 'allergy', ja: '薬のアレルギーはありますか？', en: 'Do you have any drug allergies?', replies: yesNo },
  { id: 'pregnant', ja: '妊娠中・授乳中ですか？', en: 'Are you pregnant or breastfeeding?', replies: yesNo },
  { id: 'age', ja: '使う方は何歳ですか？', en: 'How old is the person taking it?', replies: [
    { id: 'under7', pictogram: '👶', label: { en: 'Under 7', ja: '7歳未満' } },
    { id: '7to14', pictogram: '🧒', label: { en: '7–14', ja: '7〜14歳' } },
    { id: '15to64', pictogram: '🙋', label: { en: '15–64', ja: '15〜64歳' } },
    { id: '65plus', pictogram: '🧓', label: { en: '65+', ja: '65歳以上' } },
  ] },
  { id: 'dose', ja: 'この薬の飲み方は箱の説明のとおりです。', en: 'Please follow the directions on the box.' },
  { id: 'after-meal', ja: '食後に飲んでください。', en: 'Take it after meals.' },
  { id: 'drowsy', ja: 'この薬は眠くなることがあります。運転しないでください。', en: 'This may make you drowsy. Do not drive.' },
  { id: 'see-doctor', ja: '病院で診てもらってください。', en: 'Please see a doctor.' },
  { id: 'no-pharmacist', ja: '今は薬剤師がいないため、この薬（第1類医薬品）は販売できません。', en: 'No pharmacist is here now, so we cannot sell this (Class 1) medicine.' },
  { id: 'out-of-stock', ja: '在庫がありません。', en: 'It is out of stock.' },
];

/** 「この薬を見せたい」ときなどに使う、本人から店員へのひとこと。 */
export const quickPhrases: Localized[] = [
  { ja: 'もう少しゆっくり話してください。', en: 'Please speak more slowly.' },
  { ja: '紙に書いてもらえますか？', en: 'Could you write it down?' },
  { ja: '英語の説明書はありますか？', en: 'Is there an English leaflet?' },
  { ja: '免税で購入できますか？', en: 'Can I buy this tax-free?' },
];
