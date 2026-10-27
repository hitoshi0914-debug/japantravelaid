import type { Localized, Translation } from '../../i18n/locales';

// 指差しカード（薬剤師に見せる・美容室で見せる など）の共通の型。
// 各カードは src/data/<card>.ts にデータを置き、島（PharmacistApp・SalonApp）で CardConfig を組み立てて CardApp に渡す。

export interface CardChoice {
  id: string;
  /** 絵文字。画面には出さない（2026-10-27 からアイコンなしのチップ）。答えの ⭕・❌ だけ ○・× の記号にして出す。 */
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
  /** カードを出すのに1つ以上の選択が必要なグループ。なければ、どれか1つ選べばカードを出せる。 */
  requiredGroup?: string;
  /** 必要な選択がまだのときのボタンの文言。 */
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
  /** 本人がタップして大きく見せる一言（タクシーの「ここで止めて」など）。ボタンは本人の言語で出す。 */
  quickPhrases?: StaffPhrase[];
  /** quickPhrases の見出し（日本語＋本人の言語）。 */
  quickHeading?: Localized;
  /** カード下部の小さな免責表示。なければ出さない。 */
  disclaimer?: Localized;
  /** 選択を保存する localStorage のキー（カードごとに別にする）。 */
  storageKey: string;
  /** ?s=a,b で事前選択できるグループ。 */
  urlGroup?: string;
  /** 自由に書ける欄（タクシーの行き先・降りたい駅など）。カードの一番上に大きく出す。 */
  textField?: CardTextField;
}

export interface CardTextField {
  label: Localized;
  /** 入力欄の下の説明（日本語で書けると伝わりやすい、など）。 */
  hint: Localized;
  placeholder: Localized;
  /** カードに出す日本語の見出し（例: 行き先）。 */
  cardHeading: string;
}
