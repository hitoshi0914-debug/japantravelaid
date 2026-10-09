import { CardApp } from '../card/CardApp';
import type { CardConfig } from '../card/types';
import { cardIntro, groups, pharmacistPhrases } from '../../data/pharmacist';
import type { AnyLang } from '../../i18n/locales';
import { ui } from '../../i18n/ui';

// 「薬剤師に見せる」カードの島（client:load）。画面と状態は共通の CardApp（src/components/card/）。
const config: CardConfig = {
  groups,
  requiredGroup: 'symptoms',
  pickPrompt: ui.pickSymptom,
  dangerGroups: ['conditions'],
  intro: cardIntro,
  cardTitle: '薬剤師・登録販売者の方へ',
  cardAriaLabel: 'Card for the pharmacist',
  answerHeading: ui.pointToAnswer,
  phrases: pharmacistPhrases,
  disclaimer: ui.disclaimerShort,
  storageKey: 'otc-card-v1',
  urlGroup: 'symptoms',
};

export default function PharmacistApp({ lang }: { lang: AnyLang }) {
  return <CardApp lang={lang} config={config} />;
}
