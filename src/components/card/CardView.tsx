import { X } from 'lucide-react';
import type { Dispatch } from 'react';
import { useEffect } from 'react';
import { tr, type AnyLang } from '../../i18n/locales';
import { ui } from '../../i18n/ui';
import { AnswerPanel } from './AnswerPanel';
import type { Action, CardState } from './state';
import type { CardConfig } from './types';

interface Props {
  lang: AnyLang;
  config: CardConfig;
  state: CardState;
  dispatch: Dispatch<Action>;
  onClose: () => void;
}

// 全画面カード: 店員向けの大きな太字の日本語 ＋ 本人確認用の小さな訳。下に店員の回答エリア。
export function CardView({ lang, config, state, dispatch, onClose }: Props) {
  useScreenWakeLock();

  return (
    <div className="card-screen" role="dialog" aria-modal="true" aria-label={config.cardAriaLabel}>
      <div className="card-bar">
        <button type="button" className="icon-btn" onClick={onClose} aria-label={tr(ui.closeCard, lang)}>
          <X size={28} />
        </button>
        <span className="card-bar-title" lang="ja">{config.cardTitle}</span>
      </div>

      <div className="card-body">
        <p className="card-intro" lang="ja">{config.intro.ja}</p>
        {lang !== 'ja' && <p className="card-intro-en">{tr(config.intro, lang)}</p>}

        {config.groups.map((group) => {
          const chosen = group.choices.filter((c) => (state.selection[group.id] ?? []).includes(c.id));
          const danger = config.dangerGroups?.includes(group.id);
          if (chosen.length === 0) return null;
          return (
            <section className={`card-section card-section--${group.id}${danger ? ' card-section--danger' : ''}`} key={group.id}>
              <h2 lang="ja">{group.cardHeading}</h2>
              <ul>
                {chosen.map((c) => (
                  <li key={c.id}>
                    <span className="card-ja" lang="ja">{c.label.ja}</span>
                    {lang !== 'ja' && <span className="card-en">{tr(c.label, lang)}</span>}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <AnswerPanel lang={lang} config={config} state={state} dispatch={dispatch} />

        {config.disclaimer && (
          <p className="card-disclaimer">
            <span lang="ja">{config.disclaimer.ja}</span>
            {lang !== 'ja' && <span>{tr(config.disclaimer, lang)}</span>}
          </p>
        )}
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
