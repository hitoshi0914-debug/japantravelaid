import { X } from 'lucide-react';
import type { Dispatch } from 'react';
import { useEffect } from 'react';
import { cardIntro, groups } from '../../data/pharmacist';
import { tr, type AnyLang } from '../../i18n/locales';
import { ui } from '../../i18n/ui';
import { AnswerPanel } from './AnswerPanel';
import type { Action, CardState } from './state';

interface Props {
  lang: AnyLang;
  state: CardState;
  dispatch: Dispatch<Action>;
  onClose: () => void;
}

// 全画面カード: 店員向けの大きな太字の日本語 ＋ 本人確認用の小さな英語。下に薬剤師の回答エリア。
export function CardView({ lang, state, dispatch, onClose }: Props) {
  useScreenWakeLock();

  return (
    <div className="card-screen" role="dialog" aria-modal="true" aria-label="Card for the pharmacist">
      <div className="card-bar">
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Close card">
          <X size={28} />
        </button>
        <span className="card-bar-title" lang="ja">薬剤師・登録販売者の方へ</span>
      </div>

      <div className="card-body">
        <p className="card-intro" lang="ja">{cardIntro.ja}</p>
        <p className="card-intro-en">{tr(cardIntro, lang)}</p>

        {groups.map((group) => {
          const chosen = group.choices.filter((c) => state.selection[group.id].includes(c.id));
          if (chosen.length === 0) return null;
          return (
            <section className={`card-section card-section--${group.id}`} key={group.id}>
              <h2 lang="ja">{group.cardHeading}</h2>
              <ul>
                {chosen.map((c) => (
                  <li key={c.id}>
                    <span className="card-ja" lang="ja">{c.label.ja}</span>
                    <span className="card-en">{tr(c.label, lang)}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <AnswerPanel lang={lang} state={state} dispatch={dispatch} />

        <p className="card-disclaimer">
          <span lang="ja">{ui.disclaimerShort.ja}</span>
          <span>{tr(ui.disclaimerShort, lang)}</span>
        </p>
      </div>
    </div>
  );
}

// カードを見せている間に画面が消えないようにする（対応ブラウザのみ。非対応なら何もしない）。
function useScreenWakeLock() {
  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null;
    let cancelled = false;
    const request = async () => {
      try {
        const wl = (navigator as any).wakeLock;
        if (!wl || document.visibilityState !== 'visible') return;
        const l = await wl.request('screen');
        if (cancelled) l.release();
        else lock = l;
      } catch {
        /* 省電力モードなどで拒否されても続行 */
      }
    };
    request();
    // タブを切り替えると解除されるので、戻ってきたら取り直す。
    document.addEventListener('visibilitychange', request);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', request);
      lock?.release().catch(() => {});
    };
  }, []);
}
