import type { Dispatch } from 'react';
import { pharmacistPhrases } from '../../data/pharmacist';
import { tr, type AnyLang } from '../../i18n/locales';
import type { Action, CardState } from './state';

interface Props {
  lang: AnyLang;
  state: CardState;
  dispatch: Dispatch<Action>;
}

// 双方向エリア:
// 1. 薬剤師が日本語の質問・説明を指差す（focus）
// 2. 本人向けに英語を大きく表示し、答えの選択肢を出す
// 3. 本人が答えをタップすると、店員向けに日本語の答えを大きく返す（reply）
export function AnswerPanel({ lang, state, dispatch }: Props) {
  const focused = pharmacistPhrases.find((p) => p.id === state.focus);

  if (focused) {
    const reply = focused.replies?.find((r) => r.id === state.reply);
    return (
      <section className="answer answer--focused" aria-live="polite">
        <p className="answer-q-en">{focused.en}</p>
        <p className="answer-q-ja" lang="ja">{focused.ja}</p>

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
          ← <span lang="ja">質問一覧に戻る</span> / All questions
        </button>
      </section>
    );
  }

  return (
    <section className="answer">
      <h2>
        <span lang="ja">薬剤師の方：指差しでお答えください</span>
        <span className="answer-h-en">Pharmacist: point to answer</span>
      </h2>
      <div className="answer-grid">
        {pharmacistPhrases.map((p) => (
          <button type="button" key={p.id} className="answer-btn" onClick={() => dispatch({ type: 'focus', phrase: p.id })}>
            <span lang="ja">{p.ja}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
