import type { Lang, Localized } from '../i18n/locales';

// 市販薬・救急ガイドのトップ（/en/medicine/）の8つのタイル。順番がそのままグリッドの並び（2列 × 4行）。
// pictogram は MVP では絵文字。オリジナルの SVG ができたら `/icons/<id>.svg` を置いて icon に書けば差し替わる。
export type TileKind = 'tool' | 'category' | 'emergency';

export interface Tile {
  id: string;
  kind: TileKind;
  pictogram: string;
  icon?: string;
  label: Localized;
  /** タイルの小さな補足（英語だけ表示）。 */
  hint: Localized;
  /** 言語の後ろのパス（例: "pharmacist/"）。 */
  path: string;
  /** このタイルの先のページがある言語。ない言語のページからは英語版へ案内する。省略時は全言語。 */
  langs?: readonly Lang[];
  /** 指差しカードの症状を事前選択する（カテゴリ → カードへの近道）。 */
  symptoms?: string[];
}

export const tiles: Tile[] = [
  {
    id: 'drugstores', kind: 'tool', pictogram: '📍', path: 'medicine/drugstores/',
    label: { en: 'Nearby Drugstores', 'zh-tw': '附近的藥妝店', 'zh-cn': '附近的药妆店', ko: '가까운 드러그스토어', de: 'Drogerien in der Nähe', fr: 'Pharmacies proches', it: 'Farmacie vicine', es: 'Farmacias cercanas', ja: '近くのドラッグストア' },
    hint: { en: 'Open the map', 'zh-tw': '開啟地圖', 'zh-cn': '打开地图', ko: '지도 열기', de: 'Karte öffnen', fr: 'Ouvrir la carte', it: 'Apri la mappa', es: 'Abrir el mapa', ja: '地図を開く' },
  },
  {
    id: 'pharmacist', kind: 'tool', pictogram: '🗣️', path: 'medicine/pharmacist/',
    label: { en: 'Show to Pharmacist', 'zh-tw': '給藥劑師看', 'zh-cn': '给药剂师看', ko: '약사에게 보여주기', de: 'Dem Apotheker zeigen', fr: 'Montrer au pharmacien', it: 'Mostra al farmacista', es: 'Mostrar al farmacéutico', ja: '薬剤師に見せる' },
    hint: { en: 'Point-and-show card', 'zh-tw': '指示卡', 'zh-cn': '指示卡', ko: '손가락 카드', de: 'Zeigekarte', fr: 'Carte à montrer du doigt', it: 'Scheda da indicare', es: 'Tarjeta para señalar', ja: '指差しカード' },
  },
  {
    id: 'pain', kind: 'category', pictogram: '💊', path: 'medicine/category/pain/',
    label: { en: 'Headache & Pain', 'zh-tw': '頭痛・止痛', 'zh-cn': '头痛・止痛', ko: '두통・진통', de: 'Kopfweh & Schmerzen', fr: 'Maux de tête & douleur', it: 'Mal di testa e dolore', es: 'Dolor de cabeza y dolores', ja: '頭痛・解熱鎮痛' },
    hint: { en: 'Fever, period pain', 'zh-tw': '發燒・生理痛', 'zh-cn': '发烧・生理痛', ko: '발열・생리통', de: 'Fieber, Regelschmerzen', fr: 'Fièvre, règles douloureuses', it: 'Febbre, dolori mestruali', es: 'Fiebre, dolor menstrual', ja: '発熱・生理痛' },
    symptoms: ['headache', 'fever'],
  },
  {
    id: 'cold', kind: 'category', pictogram: '🤧', path: 'medicine/category/cold/',
    label: { en: 'Cold & Cough', 'zh-tw': '感冒・咳嗽', 'zh-cn': '感冒・咳嗽', ko: '감기・기침', de: 'Erkältung & Husten', fr: 'Rhume & toux', it: 'Raffreddore e tosse', es: 'Resfriado y tos', ja: '風邪・のど・せき' },
    hint: { en: 'Throat, nose', 'zh-tw': '喉嚨・鼻子', 'zh-cn': '喉咙・鼻子', ko: '목・코', de: 'Hals, Nase', fr: 'Gorge, nez', it: 'Gola, naso', es: 'Garganta, nariz', ja: 'のど・鼻' },
    symptoms: ['sore-throat', 'cough'],
  },
  {
    id: 'stomach', kind: 'category', pictogram: '🤢', path: 'medicine/category/stomach/',
    label: { en: 'Stomach & Digestion', 'zh-tw': '腸胃・消化', 'zh-cn': '肠胃・消化', ko: '위장・소화', de: 'Magen & Verdauung', fr: 'Estomac & digestion', it: 'Stomaco e digestione', es: 'Estómago y digestión', ja: '胃腸・吐き気・酔い止め' },
    hint: { en: 'Diarrhea, motion sickness', 'zh-tw': '腹瀉・暈車', 'zh-cn': '腹泻・晕车', ko: '설사・멀미', de: 'Durchfall, Reiseübelkeit', fr: 'Diarrhée, mal des transports', it: 'Diarrea, mal di viaggio', es: 'Diarrea, mareo', ja: '下痢・乗り物酔い' },
    symptoms: ['stomach-ache'],
  },
  {
    id: 'skin', kind: 'category', pictogram: '🩹', path: 'medicine/category/skin/',
    label: { en: 'Cuts, Muscle & Skin', 'zh-tw': '傷口・肌肉・皮膚', 'zh-cn': '伤口・肌肉・皮肤', ko: '상처・근육・피부', de: 'Wunden, Muskeln & Haut', fr: 'Plaies, muscles & peau', it: 'Ferite, muscoli e pelle', es: 'Heridas, músculos y piel', ja: '湿布・かゆみ・絆創膏' },
    hint: { en: 'Sprains, bites, rash', 'zh-tw': '扭傷・蚊蟲咬傷・皮疹', 'zh-cn': '扭伤・蚊虫叮咬・皮疹', ko: '삠・벌레 물림・발진', de: 'Verstauchung, Stiche, Ausschlag', fr: 'Entorses, piqûres, rougeurs', it: 'Distorsioni, punture, eruzioni', es: 'Esguinces, picaduras, sarpullido', ja: '捻挫・虫刺され' },
    symptoms: ['muscle-pain'],
  },
  {
    id: 'eye', kind: 'category', pictogram: '👁️', path: 'medicine/category/eye/',
    label: { en: 'Eye & Allergy', 'zh-tw': '眼藥・過敏', 'zh-cn': '眼药・过敏', ko: '안약・알레르기', de: 'Augen & Allergie', fr: 'Yeux & allergies', it: 'Occhi e allergie', es: 'Ojos y alergias', ja: '目薬・アレルギー' },
    hint: { en: 'Itchy eyes, hay fever', 'zh-tw': '眼睛癢・花粉症', 'zh-cn': '眼睛痒・花粉症', ko: '눈 가려움・꽃가루 알레르기', de: 'Juckende Augen, Heuschnupfen', fr: 'Yeux qui grattent, rhume des foins', it: 'Prurito agli occhi, pollini', es: 'Picor de ojos, alergia al polen', ja: '目のかゆみ・花粉症' },
    symptoms: ['itchy-eyes'],
  },
  {
    id: 'emergency', kind: 'emergency', pictogram: '🚨', path: 'medicine/emergency/',
    label: { en: 'Hospital / Emergency', 'zh-tw': '醫院・急救', 'zh-cn': '医院・急救', ko: '병원・응급', de: 'Klinik / Notfall', fr: 'Hôpital / urgences', it: 'Ospedale / emergenze', es: 'Hospital / urgencias', ja: '病院・救急' },
    hint: { en: '119, hotline', 'zh-tw': '119・諮詢專線', 'zh-cn': '119・咨询专线', ko: '119・상담 전화', de: '119, Hotline', fr: '119, ligne d\'aide', it: '119, numeri utili', es: '119, línea de ayuda', ja: '119・相談窓口' },
  },
];
