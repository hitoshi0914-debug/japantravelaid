import type { Localized } from '../i18n/locales';

// 市販薬カタログ（MVP では主要30品目を予定）のデータの形。
// 【方針】製薬会社の添付文書・公式サイトにある公知情報を客観的に英訳するだけ。
//   「おすすめ」「よく効く」などの評価・比較・推奨は書かない。
//   sourceUrl（添付文書の出典）と checkedAt（確認日）がない品目はページに出さない。
export interface Medicine {
  id: string;                       // 'loxonin-s' など
  category: 'pain' | 'cold' | 'stomach' | 'skin' | 'eye';
  name: { ja: string; en: string }; // 箱の表記 ＋ ローマ字/英語名
  maker: string;
  /** 医薬品の区分。第1類は薬剤師がいる時間しか買えない。 */
  riskClass: '1' | 'designated-2' | '2' | '3' | 'quasi-drug';
  form: 'tablet' | 'capsule' | 'granule' | 'liquid' | 'patch' | 'cream' | 'eye-drop' | 'spray' | 'other';
  /** 有効成分（1回量あたり）。 */
  ingredients: { ja: string; en: string; amount?: string }[];
  /** 添付文書の効能・効果の英訳（原文どおり、言い換えない）。 */
  indications: Localized;
  /** 添付文書の用法・用量の英訳。 */
  dosage: Localized;
  minAge?: number;
  /** 添付文書で「してはいけないこと」に挙がる主な項目（妊娠・喘息など）。 */
  warnings: Localized[];
  /** パッケージ写真（自前撮影またはメーカー許諾済みのものだけ）。 */
  image?: string;
  sourceUrl: string;
  checkedAt: string;                // 'YYYY-MM-DD'
}

export const medicines: Medicine[] = [];
