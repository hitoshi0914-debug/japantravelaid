import { CardApp } from '../card/CardApp';
import type { CardConfig } from '../card/types';
import { allergyAnswerHeading, allergyCardTitle, allergyDisclaimer, allergyGroups, allergyIntro, allergyPhrases, allergyPickPrompt } from '../../data/allergy';
import type { AnyLang } from '../../i18n/locales';

// 「飲食店で見せる（アレルギー・食事制限）」カードの島（client:load）。画面と状態は薬剤師カードと共通の CardApp。
// アレルギーだけ・食事制限だけの人がいるので、必須のグループは置かない（どれか1つ選べばカードを出せる）。
const config: CardConfig = {
  groups: allergyGroups,
  pickPrompt: allergyPickPrompt,
  dangerGroups: ['allergy', 'severity'],
  intro: allergyIntro,
  cardTitle: allergyCardTitle,
  cardAriaLabel: 'Allergy and diet card for restaurant staff',
  answerHeading: allergyAnswerHeading,
  phrases: allergyPhrases,
  disclaimer: allergyDisclaimer,
  storageKey: 'allergy-card-v1',
  urlGroup: 'allergy',
};

export default function AllergyApp({ lang }: { lang: AnyLang }) {
  return <CardApp lang={lang} config={config} />;
}
