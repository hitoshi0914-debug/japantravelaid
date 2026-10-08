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
    label: { en: 'Nearby Drugstores', ja: '近くのドラッグストア' },
    hint: { en: 'Open the map', ja: '地図を開く' },
  },
  {
    id: 'pharmacist', kind: 'tool', pictogram: '🗣️', path: 'medicine/pharmacist/',
    label: { en: 'Show to Pharmacist', ja: '薬剤師に見せる' },
    hint: { en: 'Point-and-show card', ja: '指差しカード' },
  },
  {
    id: 'pain', kind: 'category', pictogram: '💊', path: 'medicine/category/pain/',
    label: { en: 'Headache & Pain', ja: '頭痛・解熱鎮痛' },
    hint: { en: 'Fever, period pain', ja: '発熱・生理痛' },
    symptoms: ['headache', 'fever'],
  },
  {
    id: 'cold', kind: 'category', pictogram: '🤧', path: 'medicine/category/cold/',
    label: { en: 'Cold & Cough', ja: '風邪・のど・せき' },
    hint: { en: 'Throat, nose', ja: 'のど・鼻' },
    symptoms: ['sore-throat', 'cough'],
  },
  {
    id: 'stomach', kind: 'category', pictogram: '🤢', path: 'medicine/category/stomach/',
    label: { en: 'Stomach & Digestion', ja: '胃腸・吐き気・酔い止め' },
    hint: { en: 'Diarrhea, motion sickness', ja: '下痢・乗り物酔い' },
    symptoms: ['stomach-ache'],
  },
  {
    id: 'skin', kind: 'category', pictogram: '🩹', path: 'medicine/category/skin/',
    label: { en: 'Cuts, Muscle & Skin', ja: '湿布・かゆみ・絆創膏' },
    hint: { en: 'Sprains, bites, rash', ja: '捻挫・虫刺され' },
    symptoms: ['muscle-pain'],
  },
  {
    id: 'eye', kind: 'category', pictogram: '👁️', path: 'medicine/category/eye/',
    label: { en: 'Eye & Allergy', ja: '目薬・アレルギー' },
    hint: { en: 'Itchy eyes, hay fever', ja: '目のかゆみ・花粉症' },
    symptoms: ['itchy-eyes'],
  },
  {
    id: 'emergency', kind: 'emergency', pictogram: '🚨', path: 'medicine/emergency/',
    label: { en: 'Hospital / Emergency', ja: '病院・救急' },
    hint: { en: '119, hotline', ja: '119・相談窓口' },
  },
];
