import { CardApp } from '../card/CardApp';
import type { CardConfig } from '../card/types';
import { busAnswerHeading, busCardTitle, busDestination, busGroups, busIntro, busPhrases, busPickPrompt, busQuickHeading, busQuickPhrases } from '../../data/bus';
import type { AnyLang } from '../../i18n/locales';

// 「バスで見せる」カードの島（client:load）。地方の路線バス（整理券・おつりの出ない運賃箱）向け。画面と状態は共通の CardApp。
const config: CardConfig = {
  groups: busGroups,
  pickPrompt: busPickPrompt,
  dangerGroups: ['care'],
  intro: busIntro,
  cardTitle: busCardTitle,
  cardAriaLabel: 'Card for the bus driver',
  answerHeading: busAnswerHeading,
  phrases: busPhrases,
  quickPhrases: busQuickPhrases,
  quickHeading: busQuickHeading,
  storageKey: 'bus-card-v1',
  textField: busDestination,
};

export default function BusApp({ lang }: { lang: AnyLang }) {
  return <CardApp lang={lang} config={config} />;
}
