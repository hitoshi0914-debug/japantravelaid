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
    title: { en: 'Who is it for?', 'zh-tw': '給誰用？', 'zh-cn': '给谁用？', ko: '누가 쓸 약인가요?', de: 'Für wen ist es?', fr: 'Pour qui ?', it: 'Per chi è?', es: '¿Para quién es?', ja: '誰の薬ですか' },
    cardHeading: '使う人',
    choices: [
      { id: 'me', pictogram: '🙋', label: { en: 'Me (adult)', 'zh-tw': '我自己（成人）', 'zh-cn': '我自己（成人）', ko: '본인(성인)', de: 'Ich (erwachsen)', fr: 'Moi (adulte)', it: 'Io (adulto)', es: 'Yo (adulto)', ja: '本人（大人）' } },
      { id: 'child', pictogram: '🧒', label: { en: 'My child', 'zh-tw': '我的孩子', 'zh-cn': '我的孩子', ko: '내 아이', de: 'Mein Kind', fr: 'Mon enfant', it: 'Mio/a figlio/a', es: 'Mi hijo/a', ja: '子ども' } },
      { id: 'elderly', pictogram: '🧓', label: { en: 'Elderly person (65+)', 'zh-tw': '長者（65歲以上）', 'zh-cn': '老年人（65岁以上）', ko: '고령자(65세 이상)', de: 'Ältere Person (65+)', fr: 'Personne âgée (65 ans et +)', it: 'Persona anziana (65+)', es: 'Persona mayor (65+)', ja: '高齢者（65歳以上）' } },
    ],
  },
  {
    id: 'symptoms', single: false,
    title: { en: 'Symptoms', 'zh-tw': '症狀', 'zh-cn': '症状', ko: '증상', de: 'Beschwerden', fr: 'Symptômes', it: 'Sintomi', es: 'Síntomas', ja: '症状' },
    cardHeading: '症状',
    choices: [
      { id: 'headache', pictogram: '🤕', label: { en: 'Headache', 'zh-tw': '頭痛', 'zh-cn': '头痛', ko: '두통', de: 'Kopfschmerzen', fr: 'Mal de tête', it: 'Mal di testa', es: 'Dolor de cabeza', ja: '頭痛' } },
      { id: 'fever', pictogram: '🌡️', label: { en: 'Fever', 'zh-tw': '發燒', 'zh-cn': '发烧', ko: '발열', de: 'Fieber', fr: 'Fièvre', it: 'Febbre', es: 'Fiebre', ja: '発熱' } },
      { id: 'sore-throat', pictogram: '😣', label: { en: 'Sore throat', 'zh-tw': '喉嚨痛', 'zh-cn': '喉咙痛', ko: '목 아픔', de: 'Halsschmerzen', fr: 'Mal de gorge', it: 'Mal di gola', es: 'Dolor de garganta', ja: 'のどの痛み' } },
      { id: 'cough', pictogram: '😷', label: { en: 'Cough', 'zh-tw': '咳嗽', 'zh-cn': '咳嗽', ko: '기침', de: 'Husten', fr: 'Toux', it: 'Tosse', es: 'Tos', ja: 'せき' } },
      { id: 'runny-nose', pictogram: '🤧', label: { en: 'Runny / stuffy nose', 'zh-tw': '流鼻水・鼻塞', 'zh-cn': '流鼻涕・鼻塞', ko: '콧물・코막힘', de: 'Laufende / verstopfte Nase', fr: 'Nez qui coule / bouché', it: 'Naso che cola / chiuso', es: 'Nariz que gotea / congestionada', ja: '鼻水・鼻づまり' } },
      { id: 'stomach-ache', pictogram: '🫃', label: { en: 'Stomach ache', 'zh-tw': '腹痛・胃痛', 'zh-cn': '腹痛・胃痛', ko: '복통・위통', de: 'Bauch- / Magenschmerzen', fr: 'Mal de ventre / d’estomac', it: 'Mal di pancia / di stomaco', es: 'Dolor de vientre / de estómago', ja: '腹痛・胃痛' } },
      { id: 'heartburn', pictogram: '🔥', label: { en: 'Heartburn / indigestion', 'zh-tw': '胃灼熱・消化不良', 'zh-cn': '烧心・消化不良', ko: '속쓰림・소화불량', de: 'Sodbrennen / Völlegefühl', fr: 'Brûlures d’estomac / indigestion', it: 'Bruciore di stomaco / cattiva digestione', es: 'Acidez / indigestión', ja: '胸やけ・胃もたれ' } },
      { id: 'diarrhea', pictogram: '🚽', label: { en: 'Diarrhea', 'zh-tw': '腹瀉', 'zh-cn': '腹泻', ko: '설사', de: 'Durchfall', fr: 'Diarrhée', it: 'Diarrea', es: 'Diarrea', ja: '下痢' } },
      { id: 'constipation', pictogram: '🧱', label: { en: 'Constipation', 'zh-tw': '便秘', 'zh-cn': '便秘', ko: '변비', de: 'Verstopfung', fr: 'Constipation', it: 'Stitichezza', es: 'Estreñimiento', ja: '便秘' } },
      { id: 'nausea', pictogram: '🤢', label: { en: 'Nausea', 'zh-tw': '想吐', 'zh-cn': '恶心', ko: '메스꺼움', de: 'Übelkeit', fr: 'Nausée', it: 'Nausea', es: 'Náuseas', ja: '吐き気' } },
      { id: 'motion-sickness', pictogram: '🚌', label: { en: 'Motion sickness (prevent)', 'zh-tw': '暈車暈船（預防）', 'zh-cn': '晕车晕船（预防）', ko: '멀미(예방)', de: 'Reisekrankheit (vorbeugen)', fr: 'Mal des transports (prévenir)', it: 'Mal di viaggio (prevenzione)', es: 'Mareo (prevenir)', ja: '乗り物酔い（予防）' } },
      { id: 'period-pain', pictogram: '🩸', label: { en: 'Period pain', 'zh-tw': '生理痛', 'zh-cn': '痛经', ko: '생리통', de: 'Regelschmerzen', fr: 'Douleurs de règles', it: 'Dolori mestruali', es: 'Dolor menstrual', ja: '生理痛' } },
      { id: 'muscle-pain', pictogram: '💪', label: { en: 'Muscle / back pain', 'zh-tw': '肌肉痛・腰痛', 'zh-cn': '肌肉痛・腰痛', ko: '근육통・요통', de: 'Muskel- / Rückenschmerzen', fr: 'Douleurs musculaires / mal de dos', it: 'Dolori muscolari / mal di schiena', es: 'Dolor muscular / de espalda', ja: '筋肉痛・腰痛' } },
      { id: 'sprain', pictogram: '🦶', label: { en: 'Sprain / bruise', 'zh-tw': '扭傷・撞傷', 'zh-cn': '扭伤・撞伤', ko: '삠・타박상', de: 'Verstauchung / Prellung', fr: 'Entorse / contusion', it: 'Distorsione / contusione', es: 'Esguince / golpe', ja: '捻挫・打撲' } },
      { id: 'cut', pictogram: '🩹', label: { en: 'Cut / scrape', 'zh-tw': '割傷・擦傷', 'zh-cn': '割伤・擦伤', ko: '베인 상처・찰과상', de: 'Schnitt- / Schürfwunde', fr: 'Coupure / écorchure', it: 'Taglio / escoriazione', es: 'Corte / raspadura', ja: '切り傷・すり傷' } },
      { id: 'burn', pictogram: '♨️', label: { en: 'Minor burn', 'zh-tw': '輕微燙傷', 'zh-cn': '轻微烫伤', ko: '가벼운 화상', de: 'Leichte Verbrennung', fr: 'Brûlure légère', it: 'Scottatura lieve', es: 'Quemadura leve', ja: '軽いやけど' } },
      { id: 'insect-bite', pictogram: '🦟', label: { en: 'Insect bite / itch', 'zh-tw': '蚊蟲咬傷・發癢', 'zh-cn': '蚊虫叮咬・瘙痒', ko: '벌레 물림・가려움', de: 'Insektenstich / Juckreiz', fr: 'Piqûre d’insecte / démangeaison', it: 'Puntura d’insetto / prurito', es: 'Picadura de insecto / picor', ja: '虫刺され・かゆみ' } },
      { id: 'rash', pictogram: '🔴', label: { en: 'Skin rash', 'zh-tw': '濕疹・皮膚炎', 'zh-cn': '湿疹・皮炎', ko: '습진・피부염', de: 'Hautausschlag', fr: 'Éruption cutanée', it: 'Eruzione cutanea', es: 'Erupción en la piel', ja: '湿疹・かぶれ' } },
      { id: 'sunburn', pictogram: '☀️', label: { en: 'Sunburn', 'zh-tw': '曬傷', 'zh-cn': '晒伤', ko: '햇볕 화상', de: 'Sonnenbrand', fr: 'Coup de soleil', it: 'Scottatura solare', es: 'Quemadura solar', ja: '日焼け' } },
      { id: 'itchy-eyes', pictogram: '👁️', label: { en: 'Itchy / red eyes', 'zh-tw': '眼睛癢・充血', 'zh-cn': '眼睛痒・充血', ko: '눈 가려움・충혈', de: 'Juckende / gerötete Augen', fr: 'Yeux qui grattent / rouges', it: 'Occhi che prudono / arrossati', es: 'Ojos con picor / rojos', ja: '目のかゆみ・充血' } },
      { id: 'tired-eyes', pictogram: '😵', label: { en: 'Tired / dry eyes', 'zh-tw': '眼睛疲勞・乾澀', 'zh-cn': '眼睛疲劳・干涩', ko: '눈 피로・건조', de: 'Müde / trockene Augen', fr: 'Yeux fatigués / secs', it: 'Occhi stanchi / secchi', es: 'Ojos cansados / secos', ja: '目の疲れ・乾き' } },
      { id: 'hay-fever', pictogram: '🌸', label: { en: 'Hay fever / allergy', 'zh-tw': '花粉症・過敏症狀', 'zh-cn': '花粉症・过敏症状', ko: '꽃가루 알레르기・알레르기 증상', de: 'Heuschnupfen / Allergie', fr: 'Rhume des foins / allergie', it: 'Raffreddore da fieno / allergia', es: 'Alergia al polen / alergia', ja: '花粉症・アレルギー症状' } },
      { id: 'toothache', pictogram: '🦷', label: { en: 'Toothache', 'zh-tw': '牙痛', 'zh-cn': '牙痛', ko: '치통', de: 'Zahnschmerzen', fr: 'Mal de dents', it: 'Mal di denti', es: 'Dolor de muelas', ja: '歯の痛み' } },
      { id: 'hangover', pictogram: '🍺', label: { en: 'Hangover', 'zh-tw': '宿醉', 'zh-cn': '宿醉', ko: '숙취', de: 'Kater', fr: 'Gueule de bois', it: 'Postumi della sbornia', es: 'Resaca', ja: '二日酔い' } },
    ],
  },
  {
    id: 'since', single: true,
    title: { en: 'Since when?', 'zh-tw': '從什麼時候開始？', 'zh-cn': '从什么时候开始？', ko: '언제부터?', de: 'Seit wann?', fr: 'Depuis quand ?', it: 'Da quando?', es: '¿Desde cuándo?', ja: 'いつから' },
    cardHeading: 'いつから',
    choices: [
      { id: 'today', pictogram: '🕐', label: { en: 'Since today', 'zh-tw': '今天開始', 'zh-cn': '今天开始', ko: '오늘부터', de: 'Seit heute', fr: 'Depuis aujourd’hui', it: 'Da oggi', es: 'Desde hoy', ja: '今日から' } },
      { id: 'yesterday', pictogram: '📅', label: { en: 'Since yesterday', 'zh-tw': '昨天開始', 'zh-cn': '昨天开始', ko: '어제부터', de: 'Seit gestern', fr: 'Depuis hier', it: 'Da ieri', es: 'Desde ayer', ja: '昨日から' } },
      { id: 'days', pictogram: '🗓️', label: { en: '2–3 days', 'zh-tw': '2～3天前開始', 'zh-cn': '2～3天前开始', ko: '2~3일 전부터', de: '2–3 Tage', fr: '2–3 jours', it: '2–3 giorni', es: '2–3 días', ja: '2〜3日前から' } },
      { id: 'week', pictogram: '📆', label: { en: 'A week or more', 'zh-tw': '1週以上', 'zh-cn': '1周以上', ko: '1주일 이상', de: 'Eine Woche oder länger', fr: 'Une semaine ou plus', it: 'Una settimana o più', es: 'Una semana o más', ja: '1週間以上前から' } },
    ],
  },
  {
    id: 'wishes', single: false,
    title: { en: 'I would like…', 'zh-tw': '我希望…', 'zh-cn': '我希望…', ko: '원하는 것…', de: 'Ich hätte gern…', fr: 'Je voudrais…', it: 'Vorrei…', es: 'Me gustaría…', ja: '希望' },
    cardHeading: '希望',
    choices: [
      { id: 'non-drowsy', pictogram: '😳', label: { en: 'Non-drowsy', 'zh-tw': '不易嗜睡的', 'zh-cn': '不易犯困的', ko: '졸리지 않는 것', de: 'Macht nicht müde', fr: 'Ne rend pas somnolent', it: 'Non dà sonnolenza', es: 'Que no dé sueño', ja: '眠くなりにくいもの' } },
      { id: 'gentle-stomach', pictogram: '🫶', label: { en: 'Gentle on the stomach', 'zh-tw': '不傷胃的', 'zh-cn': '不伤胃的', ko: '위에 부담이 적은 것', de: 'Magenschonend', fr: 'Doux pour l’estomac', it: 'Delicato con lo stomaco', es: 'Suave con el estómago', ja: '胃にやさしいもの' } },
      { id: 'no-water', pictogram: '💧', label: { en: 'Can take without water', 'zh-tw': '不用配水就能吃的', 'zh-cn': '不用喝水就能吃的', ko: '물 없이 먹을 수 있는 것', de: 'Ohne Wasser einnehmbar', fr: 'Se prend sans eau', it: 'Si prende senz’acqua', es: 'Se toma sin agua', ja: '水なしで飲めるもの' } },
      { id: 'small-pack', pictogram: '📦', label: { en: 'Small pack (short trip)', 'zh-tw': '小包裝（短期旅行）', 'zh-cn': '小包装（短期旅行）', ko: '소포장(짧은 여행)', de: 'Kleine Packung (kurze Reise)', fr: 'Petit format (court séjour)', it: 'Confezione piccola (viaggio breve)', es: 'Envase pequeño (viaje corto)', ja: '少量のパッケージ' } },
      { id: 'not-pill', pictogram: '🧴', label: { en: 'Not a pill (patch, spray…)', 'zh-tw': '非口服（貼布、噴劑等）', 'zh-cn': '非口服（贴剂、喷剂等）', ko: '먹는 약 말고(파스・스프레이 등)', de: 'Keine Tablette (Pflaster, Spray…)', fr: 'Pas un comprimé (patch, spray…)', it: 'Non una compressa (cerotto, spray…)', es: 'Que no sea pastilla (parche, spray…)', ja: '飲み薬以外（貼り薬・スプレー等）' } },
      { id: 'cheap', pictogram: '💴', label: { en: 'Inexpensive', 'zh-tw': '便宜的', 'zh-cn': '便宜的', ko: '저렴한 것', de: 'Günstig', fr: 'Pas cher', it: 'Economico', es: 'Económico', ja: '安いもの' } },
    ],
  },
  {
    id: 'conditions', single: false,
    title: { en: 'Allergies & conditions', 'zh-tw': '過敏・身體狀況', 'zh-cn': '过敏・身体状况', ko: '알레르기・몸 상태', de: 'Allergien & Gesundheitszustand', fr: 'Allergies et état de santé', it: 'Allergie e condizioni di salute', es: 'Alergias y estado de salud', ja: 'アレルギー・体の状態' },
    cardHeading: '注意事項',
    choices: [
      { id: 'pregnant', pictogram: '🤰', label: { en: 'Pregnant / may be pregnant', 'zh-tw': '懷孕中・可能懷孕', 'zh-cn': '怀孕中・可能怀孕', ko: '임신 중・임신 가능성 있음', de: 'Schwanger / möglicherweise schwanger', fr: 'Enceinte / peut-être enceinte', it: 'Incinta / forse incinta', es: 'Embarazada / posible embarazo', ja: '妊娠中・妊娠の可能性あり' } },
      { id: 'breastfeeding', pictogram: '🍼', label: { en: 'Breastfeeding', 'zh-tw': '哺乳中', 'zh-cn': '哺乳中', ko: '수유 중', de: 'Stillzeit', fr: 'Allaitement', it: 'Allattamento', es: 'Lactancia', ja: '授乳中' } },
      { id: 'aspirin-asthma', pictogram: '🫁', label: { en: 'Aspirin-induced asthma', 'zh-tw': '阿斯匹靈氣喘', 'zh-cn': '阿司匹林哮喘', ko: '아스피린 천식', de: 'Aspirin-Asthma', fr: 'Asthme induit par l’aspirine', it: 'Asma da aspirina', es: 'Asma inducida por aspirina', ja: 'アスピリン喘息' } },
      { id: 'asthma', pictogram: '😮‍💨', label: { en: 'Asthma', 'zh-tw': '氣喘', 'zh-cn': '哮喘', ko: '천식', de: 'Asthma', fr: 'Asthme', it: 'Asma', es: 'Asma', ja: '喘息' } },
      { id: 'drug-allergy', pictogram: '⚠️', label: { en: 'Allergic to some medicine', 'zh-tw': '對某些藥物過敏', 'zh-cn': '对某些药物过敏', ko: '약 알레르기 있음', de: 'Allergie gegen ein Medikament', fr: 'Allergie à certains médicaments', it: 'Allergia ad alcuni farmaci', es: 'Alergia a algún medicamento', ja: '薬のアレルギーあり' } },
      { id: 'penicillin', pictogram: '🚫', label: { en: 'Penicillin allergy', 'zh-tw': '盤尼西林過敏', 'zh-cn': '青霉素过敏', ko: '페니실린 알레르기', de: 'Penicillin-Allergie', fr: 'Allergie à la pénicilline', it: 'Allergia alla penicillina', es: 'Alergia a la penicilina', ja: 'ペニシリンアレルギー' } },
      { id: 'other-medicine', pictogram: '💊', label: { en: 'Taking other medicine', 'zh-tw': '正在服用其他藥物', 'zh-cn': '正在服用其他药物', ko: '다른 약 복용 중', de: 'Nehme andere Medikamente', fr: 'Prends d’autres médicaments', it: 'Assumo altri farmaci', es: 'Tomo otros medicamentos', ja: '他の薬を服用中' } },
      { id: 'high-bp', pictogram: '❤️', label: { en: 'High blood pressure / heart disease', 'zh-tw': '高血壓・心臟病', 'zh-cn': '高血压・心脏病', ko: '고혈압・심장병', de: 'Bluthochdruck / Herzkrankheit', fr: 'Hypertension / maladie cardiaque', it: 'Pressione alta / malattia cardiaca', es: 'Hipertensión / enfermedad cardíaca', ja: '高血圧・心臓病' } },
      { id: 'diabetes', pictogram: '🩸', label: { en: 'Diabetes', 'zh-tw': '糖尿病', 'zh-cn': '糖尿病', ko: '당뇨병', de: 'Diabetes', fr: 'Diabète', it: 'Diabete', es: 'Diabetes', ja: '糖尿病' } },
      { id: 'kidney-liver', pictogram: '🫘', label: { en: 'Kidney or liver disease', 'zh-tw': '腎臟病・肝臟病', 'zh-cn': '肾脏病・肝脏病', ko: '신장병・간장병', de: 'Nieren- oder Lebererkrankung', fr: 'Maladie rénale ou hépatique', it: 'Malattia renale o epatica', es: 'Enfermedad renal o hepática', ja: '腎臓病・肝臓病' } },
      { id: 'stomach-ulcer', pictogram: '🩺', label: { en: 'Stomach ulcer (now or before)', 'zh-tw': '胃潰瘍（現在或過去）', 'zh-cn': '胃溃疡（现在或过去）', ko: '위궤양(현재 또는 과거)', de: 'Magengeschwür (jetzt oder früher)', fr: 'Ulcère de l’estomac (actuel ou passé)', it: 'Ulcera gastrica (ora o in passato)', es: 'Úlcera de estómago (actual o pasada)', ja: '胃潰瘍（現在または過去）' } },
    ],
  },
];

/** カード上部の定型文（店員向けの日本語 ＋ 本人確認用の英語）。 */
export const cardIntro: Localized = {
  ja: '日本語が話せません。\nこの内容で使える市販薬について相談させてください。',
  en: "I don't speak Japanese.\nI'd like to ask which over-the-counter medicine is suitable for me.", 'zh-tw': '我不會說日語。\n想請教哪種非處方藥適合我。', 'zh-cn': '我不会说日语。\n想请教哪种非处方药适合我。', ko: '일본어를 못 합니다.\n저에게 맞는 일반의약품을 상담하고 싶습니다.', de: 'Ich spreche kein Japanisch.\nIch möchte fragen, welches rezeptfreie Arzneimittel für mich geeignet ist.', fr: 'Je ne parle pas japonais.\nJe voudrais demander quel médicament sans ordonnance me convient.', it: 'Non parlo giapponese.\nVorrei chiedere quale farmaco da banco è adatto a me.', es: 'No hablo japonés.\nQuisiera consultar qué medicamento sin receta es adecuado para mí.',
};

/** カード下部：薬剤師が指差しで返すエリア。replies は本人が答えるための選択肢。 */
export type PharmacistPhrase = Localized & {
  id: string;
  replies?: Choice[];
};

const yesNo: Choice[] = [
  { id: 'yes', pictogram: '⭕', label: { en: 'Yes', 'zh-tw': '是', 'zh-cn': '是', ko: '예', de: 'Ja', fr: 'Oui', it: 'Sì', es: 'Sí', ja: 'はい' } },
  { id: 'no', pictogram: '❌', label: { en: 'No', 'zh-tw': '不是', 'zh-cn': '不是', ko: '아니요', de: 'Nein', fr: 'Non', it: 'No', es: 'No', ja: 'いいえ' } },
];

export const pharmacistPhrases: PharmacistPhrase[] = [
  { id: 'yes', ja: 'はい', en: 'Yes', 'zh-tw': '是', 'zh-cn': '是', ko: '예', de: 'Ja', fr: 'Oui', it: 'Sì', es: 'Sí' },
  { id: 'no', ja: 'いいえ', en: 'No', 'zh-tw': '不是', 'zh-cn': '不是', ko: '아니요', de: 'Nein', fr: 'Non', it: 'No', es: 'No' },
  {
    id: 'how-long', ja: '症状はいつからですか？', en: 'Since when have you had these symptoms?', 'zh-tw': '症狀是從什麼時候開始的？', 'zh-cn': '症状是从什么时候开始的？', ko: '증상은 언제부터인가요?', de: 'Seit wann haben Sie diese Beschwerden?', fr: 'Depuis quand avez-vous ces symptômes ?', it: 'Da quando ha questi sintomi?', es: '¿Desde cuándo tiene estos síntomas?',
    replies: groups.find((g) => g.id === 'since')!.choices,
  },
  { id: 'other-medicine', ja: '他に飲んでいる薬はありますか？', en: 'Are you taking any other medicine?', 'zh-tw': '有在服用其他藥物嗎？', 'zh-cn': '有在服用其他药物吗？', ko: '다른 약을 복용 중인가요?', de: 'Nehmen Sie andere Medikamente?', fr: 'Prenez-vous d’autres médicaments ?', it: 'Sta assumendo altri farmaci?', es: '¿Está tomando otros medicamentos?', replies: [...yesNo, { id: 'show', pictogram: '📱', label: { en: 'I will show you', 'zh-tw': '我拿給您看', 'zh-cn': '我拿给您看', ko: '보여드릴게요', de: 'Ich zeige es Ihnen', fr: 'Je vais vous le montrer', it: 'Glielo mostro', es: 'Se lo enseño', ja: 'お見せします' } }] },
  { id: 'allergy', ja: '薬のアレルギーはありますか？', en: 'Do you have any drug allergies?', 'zh-tw': '有藥物過敏嗎？', 'zh-cn': '有药物过敏吗？', ko: '약 알레르기가 있나요?', de: 'Haben Sie Arzneimittelallergien?', fr: 'Avez-vous des allergies médicamenteuses ?', it: 'Ha allergie a farmaci?', es: '¿Tiene alergia a algún medicamento?', replies: yesNo },
  { id: 'pregnant', ja: '妊娠中・授乳中ですか？', en: 'Are you pregnant or breastfeeding?', 'zh-tw': '是否懷孕或哺乳中？', 'zh-cn': '是否怀孕或哺乳中？', ko: '임신 중이거나 수유 중인가요?', de: 'Sind Sie schwanger oder stillen Sie?', fr: 'Êtes-vous enceinte ou allaitez-vous ?', it: 'È incinta o sta allattando?', es: '¿Está embarazada o dando el pecho?', replies: yesNo },
  { id: 'age', ja: '使う方は何歳ですか？', en: 'How old is the person taking it?', 'zh-tw': '使用者幾歲？', 'zh-cn': '使用者几岁？', ko: '복용하실 분은 몇 살인가요?', de: 'Wie alt ist die Person, die es einnimmt?', fr: 'Quel âge a la personne qui va le prendre ?', it: 'Quanti anni ha la persona che lo prenderà?', es: '¿Qué edad tiene la persona que lo va a tomar?', replies: [
    { id: 'under7', pictogram: '👶', label: { en: 'Under 7', 'zh-tw': '未滿7歲', 'zh-cn': '不满7岁', ko: '7세 미만', de: 'Unter 7', fr: 'Moins de 7 ans', it: 'Meno di 7 anni', es: 'Menos de 7 años', ja: '7歳未満' } },
    { id: '7to14', pictogram: '🧒', label: { en: '7–14', 'zh-tw': '7～14歲', 'zh-cn': '7～14岁', ko: '7~14세', de: '7–14 Jahre', fr: '7–14 ans', it: '7–14 anni', es: '7–14 años', ja: '7〜14歳' } },
    { id: '15to64', pictogram: '🙋', label: { en: '15–64', 'zh-tw': '15～64歲', 'zh-cn': '15～64岁', ko: '15~64세', de: '15–64 Jahre', fr: '15–64 ans', it: '15–64 anni', es: '15–64 años', ja: '15〜64歳' } },
    { id: '65plus', pictogram: '🧓', label: { en: '65+', 'zh-tw': '65歲以上', 'zh-cn': '65岁以上', ko: '65세 이상', de: '65+ Jahre', fr: '65 ans et +', it: '65+ anni', es: '65+ años', ja: '65歳以上' } },
  ] },
  { id: 'dose', ja: 'この薬の飲み方は箱の説明のとおりです。', en: 'Please follow the directions on the box.', 'zh-tw': '請依照包裝上的說明使用。', 'zh-cn': '请按照包装上的说明使用。', ko: '상자에 적힌 방법대로 드세요.', de: 'Bitte befolgen Sie die Anweisungen auf der Packung.', fr: 'Veuillez suivre les indications de la boîte.', it: 'Segua le istruzioni sulla confezione.', es: 'Siga las instrucciones de la caja.' },
  { id: 'after-meal', ja: '食後に飲んでください。', en: 'Take it after meals.', 'zh-tw': '請在飯後服用。', 'zh-cn': '请在饭后服用。', ko: '식후에 드세요.', de: 'Nach dem Essen einnehmen.', fr: 'À prendre après les repas.', it: 'Lo prenda dopo i pasti.', es: 'Tómelo después de las comidas.' },
  { id: 'drowsy', ja: 'この薬は眠くなることがあります。運転しないでください。', en: 'This may make you drowsy. Do not drive.', 'zh-tw': '本藥可能引起嗜睡，請勿開車。', 'zh-cn': '本药可能引起困倦，请勿开车。', ko: '졸릴 수 있습니다. 운전하지 마세요.', de: 'Kann müde machen. Bitte nicht Auto fahren.', fr: 'Peut provoquer une somnolence. Ne conduisez pas.', it: 'Può causare sonnolenza. Non guidi.', es: 'Puede causar somnolencia. No conduzca.' },
  { id: 'see-doctor', ja: '病院で診てもらってください。', en: 'Please see a doctor.', 'zh-tw': '請到醫院就診。', 'zh-cn': '请去医院就诊。', ko: '병원에서 진찰을 받으세요.', de: 'Bitte gehen Sie zum Arzt.', fr: 'Veuillez consulter un médecin.', it: 'Si faccia visitare da un medico.', es: 'Por favor, acuda a un médico.' },
  { id: 'no-pharmacist', ja: '今は薬剤師がいないため、この薬（第1類医薬品）は販売できません。', en: 'No pharmacist is here now, so we cannot sell this (Class 1) medicine.', 'zh-tw': '目前藥劑師不在，因此無法販售這種（第1類）藥品。', 'zh-cn': '目前药剂师不在，因此无法销售这种（第1类）药品。', ko: '지금은 약사가 없어서 이 (제1류) 의약품은 판매할 수 없습니다.', de: 'Zurzeit ist kein Apotheker da, daher können wir dieses Arzneimittel (Klasse 1) nicht verkaufen.', fr: 'Aucun pharmacien n’est présent en ce moment, nous ne pouvons donc pas vendre ce médicament (classe 1).', it: 'Al momento non c’è un farmacista, quindi non possiamo vendere questo farmaco (classe 1).', es: 'Ahora no hay farmacéutico, así que no podemos vender este medicamento (clase 1).' },
  { id: 'out-of-stock', ja: '在庫がありません。', en: 'It is out of stock.', 'zh-tw': '目前缺貨。', 'zh-cn': '目前缺货。', ko: '재고가 없습니다.', de: 'Das ist leider nicht vorrätig.', fr: 'Il est en rupture de stock.', it: 'È esaurito.', es: 'Está agotado.' },
];

/** 「この薬を見せたい」ときなどに使う、本人から店員へのひとこと。 */
export const quickPhrases: Localized[] = [
  { ja: 'もう少しゆっくり話してください。', en: 'Please speak more slowly.', 'zh-tw': '請說慢一點。', 'zh-cn': '请说慢一点。', ko: '조금 더 천천히 말씀해 주세요.', de: 'Bitte sprechen Sie etwas langsamer.', fr: 'Pouvez-vous parler plus lentement, s’il vous plaît ?', it: 'Può parlare più lentamente, per favore?', es: 'Hable más despacio, por favor.' },
  { ja: '紙に書いてもらえますか？', en: 'Could you write it down?', 'zh-tw': '可以寫在紙上嗎？', 'zh-cn': '可以写在纸上吗？', ko: '종이에 써 주시겠어요?', de: 'Könnten Sie es aufschreiben?', fr: 'Pourriez-vous l’écrire ?', it: 'Può scriverlo?', es: '¿Podría escribirlo?' },
  { ja: '英語の説明書はありますか？', en: 'Is there an English leaflet?', 'zh-tw': '有英文說明書嗎？', 'zh-cn': '有英文说明书吗？', ko: '영어 설명서가 있나요?', de: 'Gibt es einen Beipackzettel auf Englisch?', fr: 'Y a-t-il une notice en anglais ?', it: 'C’è un foglietto illustrativo in inglese?', es: '¿Hay un prospecto en inglés?' },
  { ja: '免税で購入できますか？', en: 'Can I buy this tax-free?', 'zh-tw': '可以免稅購買嗎？', 'zh-cn': '可以免税购买吗？', ko: '면세로 살 수 있나요?', de: 'Kann ich das steuerfrei kaufen?', fr: 'Puis-je l’acheter en détaxe ?', it: 'Posso acquistarlo tax-free?', es: '¿Puedo comprarlo libre de impuestos?' },
];
