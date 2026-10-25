import type { Dispatch } from 'react';
import { tr, type AnyLang } from '../../i18n/locales';
import { ui } from '../../i18n/ui';
import type { Action, CardState } from './state';
import type { CardConfig } from './types';

interface Props {
  lang: AnyLang;
  config: CardConfig;
  state: CardState;
  dispatch: Dispatch<Action>;
}

// 双方向エリア:
// 1. 店員が日本語の質問・説明を指差す（focus）
// 2. 本人向けに本人の言語を大きく表示し、答えの選択肢を出す
// 3. 本人が答えをタップすると、店員向けに日本語の答えを大きく返す（reply）
export function AnswerPanel({ lang, config, state, dispatch }: Props) {
  const focused = [...(config.quickPhrases ?? []), ...config.phrases].find((p) => p.id === state.focus);

  if (focused) {
    const reply = focused.replies?.find((r) => r.id === state.reply);
    // 本人の一言（quickPhrases）は相手に見せるので日本語を大きく、店員の質問は本人が読むので本人の言語を大きく。
    const quick = config.quickPhrases?.includes(focused);
    return (
      <section className="answer answer--focused" aria-live="polite">
        {quick ? (
          <>
            <p className="answer-q-en" lang="ja">{focused.ja}</p>
            {lang !== 'ja' && <p className="answer-q-ja">{tr(focused, lang)}</p>}
          </>
        ) : (
          <>
            {lang !== 'ja' && <p className="answer-q-en">{tr(focused, lang)}</p>}
            <p className="answer-q-ja" lang="ja">{focused.ja}</p>
          </>
        )}

        {focused.replies && !reply && (
          <div className="answer-replies">
            {focused.replies.map((r) => (
              <button type="button" key={r.id} className="reply-btn" onClick={() => dispatch({ type: 'reply', id: r.id })}>
                <span aria-hidden="true">{r.pictogram}</span>
                <span>{tr(r.label, lang)}</span>
              </button>
            ))}
          </div>
        )}

        {reply && (
          <p className="answer-reply" lang="ja">
            <span className="answer-reply-label">お答え</span>
            {reply.pictogram} {reply.label.ja}
          </p>
        )}

        <button type="button" className="btn-ghost" onClick={() => dispatch({ type: 'focus', phrase: null })}>
          ← <span lang="ja">質問一覧に戻る</span>{lang !== 'ja' && <> / {tr(ui.allQuestions, lang)}</>}
        </button>
      </section>
    );
  }

  return (
    <>
    {config.quickPhrases && config.quickHeading && (
      <section className="answer answer--quick">
        <h2>
          <span>{tr(config.quickHeading, lang)}</span>
          {lang !== 'ja' && <span className="answer-h-en" lang="ja">{config.quickHeading.ja}</span>}
        </h2>
        <div className="answer-grid">
          {config.quickPhrases.map((p) => (
            <button type="button" key={p.id} className="answer-btn answer-btn--quick" onClick={() => dispatch({ type: 'focus', phrase: p.id })}>
              <span>{tr(p, lang)}</span>
              {lang !== 'ja' && <small lang="ja">{p.ja}</small>}
            </button>
          ))}
        </div>
      </section>
    )}
    <section className="answer">
      <h2>
        <span lang="ja">{config.answerHeading.ja}</span>
        {lang !== 'ja' && <span className="answer-h-en">{tr(config.answerHeading, lang)}</span>}
      </h2>
      <div className="answer-grid">
        {config.phrases.map((p) => (
          <button type="button" key={p.id} className="answer-btn" onClick={() => dispatch({ type: 'focus', phrase: p.id })}>
            <span lang="ja">{p.ja}</span>
          </button>
        ))}
      </div>
    </section>
    </>
  );
}
