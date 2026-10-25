import { CardApp } from '../card/CardApp';
import type { CardConfig } from '../card/types';
import { trainAnswerHeading, trainCardTitle, trainDestination, trainGroups, trainIntro, trainPhrases, trainPickPrompt, trainQuickHeading, trainQuickPhrases } from '../../data/train';
import type { AnyLang } from '../../i18n/locales';

// 「駅で見せる」カードの島（client:load）。行きたい駅・困っていること・聞きたいことを駅員さんに見せる。画面と状態は共通の CardApp。
const config: CardConfig = {
  groups: trainGroups,
  pickPrompt: trainPickPrompt,
  dangerGroups: ['care'],
  intro: trainIntro,
  cardTitle: trainCardTitle,
  cardAriaLabel: 'Card for the station staff',
  answerHeading: trainAnswerHeading,
  phrases: trainPhrases,
  quickPhrases: trainQuickPhrases,
  quickHeading: trainQuickHeading,
  storageKey: 'train-card-v1',
  textField: trainDestination,
};

export default function TrainApp({ lang }: { lang: AnyLang }) {
  return <CardApp lang={lang} config={config} />;
}
