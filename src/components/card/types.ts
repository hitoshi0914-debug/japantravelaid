import type { Localized, Translation } from '../../i18n/locales';

// 指差しカード（薬剤師に見せる・美容室で見せる など）の共通の型。
// 各カードは src/data/<card>.ts にデータを置き、島（PharmacistApp・SalonApp）で CardConfig を組み立てて CardApp に渡す。

export interface CardChoice {
  id: string;
  pictogram: string;
  label: Localized;
}

export interface CardGroup {
  id: string;
  /** 1つだけ選ぶか、いくつでも選べるか。 */
  single: boolean;
  title: Localized;
  /** カードに出す日本語の見出し（店員向け）。 */
  cardHeading: string;
  choices: CardChoice[];
}

/** カード下部：店員が指差す質問・説明。replies は本人が答えるための選択肢。 */
export type StaffPhrase = Localized & {
  id: string;
  replies?: CardChoice[];
};

export interface CardConfig {
  groups: CardGroup[];
  /** カードを出すのに1つ以上の選択が必要なグループ。 */
  requiredGroup: string;
  /** requiredGroup が未選択のときのボタンの文言。 */
  pickPrompt: Translation;
  /** 赤い注意枠で出すグループ（持病・アレルギーなど）。 */
  dangerGroups?: string[];
  intro: Localized;
  /** カード上部の帯に出す日本語（例: 薬剤師・登録販売者の方へ）。 */
  cardTitle: string;
  /** スクリーンリーダー用のカード名（英語）。 */
  cardAriaLabel: string;
  /** 回答エリアの見出し（日本語＋本人の言語）。 */
  answerHeading: Localized;
  phrases: StaffPhrase[];
  /** カード下部の小さな免責表示。なければ出さない。 */
  disclaimer?: Localized;
  /** 選択を保存する localStorage のキー（カードごとに別にする）。 */
  storageKey: string;
  /** ?s=a,b で事前選択できるグループ。 */
  urlGroup?: string;
}
