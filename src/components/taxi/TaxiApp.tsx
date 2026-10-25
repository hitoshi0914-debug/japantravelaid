import { CardApp } from '../card/CardApp';
import type { CardConfig } from '../card/types';
import { taxiAnswerHeading, taxiCardTitle, taxiDestination, taxiGroups, taxiIntro, taxiPhrases, taxiPickPrompt, taxiQuickHeading, taxiQuickPhrases } from '../../data/taxi';
import type { AnyLang } from '../../i18n/locales';

// 「タクシーで見せる」カードの島（client:load）。行き先を書いてカードの一番上に大きく出す。画面と状態は共通の CardApp。
const config: CardConfig = {
  groups: taxiGroups,
  pickPrompt: taxiPickPrompt,
  dangerGroups: ['care'],
  intro: taxiIntro,
  cardTitle: taxiCardTitle,
  cardAriaLabel: 'Card for the taxi driver',
  answerHeading: taxiAnswerHeading,
  phrases: taxiPhrases,
  quickPhrases: taxiQuickPhrases,
  quickHeading: taxiQuickHeading,
  storageKey: 'taxi-card-v1',
  textField: taxiDestination,
};

export default function TaxiApp({ lang }: { lang: AnyLang }) {
  return <CardApp lang={lang} config={config} />;
}
