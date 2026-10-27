import { CardApp } from '../card/CardApp';
import type { CardConfig } from '../card/types';
import { lostAnswerHeading, lostCardTitle, lostGroups, lostIntro, lostPhrases, lostPickPrompt, lostQuickHeading, lostQuickPhrases, lostWhereWhen } from '../../data/lost';
import type { AnyLang } from '../../i18n/locales';

// 「落とし物・盗難で交番に見せる」カードの島（client:load）。なくした場所・時間を書いてカードの上に出す。画面と状態は共通の CardApp。
const config: CardConfig = {
  groups: lostGroups,
  pickPrompt: lostPickPrompt,
  intro: lostIntro,
  cardTitle: lostCardTitle,
  cardAriaLabel: 'Card for the police box (koban)',
  answerHeading: lostAnswerHeading,
  phrases: lostPhrases,
  quickPhrases: lostQuickPhrases,
  quickHeading: lostQuickHeading,
  storageKey: 'lost-card-v1',
  textField: lostWhereWhen,
};

export default function LostApp({ lang }: { lang: AnyLang }) {
  return <CardApp lang={lang} config={config} />;
}
