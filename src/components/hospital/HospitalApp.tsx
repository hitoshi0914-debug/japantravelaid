import { CardApp } from '../card/CardApp';
import type { CardConfig } from '../card/types';
import { hospitalAnswerHeading, hospitalCardTitle, hospitalDisclaimer, hospitalGroups, hospitalIntro, hospitalPhrases, hospitalPickPrompt, hospitalQuickHeading, hospitalQuickPhrases } from '../../data/hospital';
import type { AnyLang } from '../../i18n/locales';

// 「病院の受付で見せる」カードの島（client:load）。画面と状態は共通の CardApp。症状・持病の選択肢は薬剤師カードと共通。
const config: CardConfig = {
  groups: hospitalGroups,
  pickPrompt: hospitalPickPrompt,
  dangerGroups: ['conditions'],
  intro: hospitalIntro,
  cardTitle: hospitalCardTitle,
  cardAriaLabel: 'Card for the hospital reception',
  answerHeading: hospitalAnswerHeading,
  phrases: hospitalPhrases,
  quickPhrases: hospitalQuickPhrases,
  quickHeading: hospitalQuickHeading,
  disclaimer: hospitalDisclaimer,
  storageKey: 'hospital-card-v1',
  urlGroup: 'symptoms',
};

export default function HospitalApp({ lang }: { lang: AnyLang }) {
  return <CardApp lang={lang} config={config} />;
}
