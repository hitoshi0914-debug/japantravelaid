import { CardApp } from '../card/CardApp';
import type { CardConfig } from '../card/types';
import { salonAnswerHeading, salonCardTitle, salonGroups, salonIntro, salonPhrases, salonPickPrompt } from '../../data/salon';
import type { AnyLang } from '../../i18n/locales';

// 「美容室・床屋で見せる」カードの島（client:load）。画面と状態は薬剤師カードと共通の CardApp。
// 免責表示は薬のカードだけなので、ここでは disclaimer を渡さない。
const config: CardConfig = {
  groups: salonGroups,
  requiredGroup: 'service',
  pickPrompt: salonPickPrompt,
  dangerGroups: ['care'],
  intro: salonIntro,
  cardTitle: salonCardTitle,
  cardAriaLabel: 'Card for the hair salon staff',
  answerHeading: salonAnswerHeading,
  phrases: salonPhrases,
  storageKey: 'salon-card-v1',
  urlGroup: 'service',
};

export default function SalonApp({ lang }: { lang: AnyLang }) {
  return <CardApp lang={lang} config={config} />;
}
