import { Square, Volume2, X } from 'lucide-react';
import type { Dispatch } from 'react';
import { useEffect, useState } from 'react';
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
  const speech = useSpeakJa();

  return (
    <div className="card-screen" role="dialog" aria-modal="true" aria-label={config.cardAriaLabel}>
      <div className="card-bar">
        <button type="button" className="icon-btn" onClick={onClose} aria-label={tr(ui.closeCard, lang)}>
          <X size={28} />
        </button>
        <span className="card-bar-title" lang="ja">{config.cardTitle}</span>
        {speech.supported && (
          <button type="button" className="speak-btn" aria-pressed={speech.speaking} onClick={() => speech.toggle(spokenText(config, state))} data-ga="read_aloud">
            {speech.speaking ? <Square size={18} aria-hidden="true" /> : <Volume2 size={20} aria-hidden="true" />}
            <span>{tr(speech.speaking ? ui.stopReading : ui.readAloud, lang)}</span>
          </button>
        )}
      </div>

      <div className="card-body">
        <p className="card-intro" lang="ja">{config.intro.ja}</p>
        {lang !== 'ja' && <p className="card-intro-en">{tr(config.intro, lang)}</p>}

        {config.textField && state.text.trim() !== '' && (
          <section className="card-section card-section--text">
            <h2 lang="ja">{config.textField.cardHeading}</h2>
            <p className="card-text">{state.text.trim()}</p>
          </section>
        )}

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

// 読み上げる日本語: 指差し中の一言（とその答え）があればそれだけ、なければカード全体。
function spokenText(config: CardConfig, state: CardState): string {
  const focused = [...(config.quickPhrases ?? []), ...config.phrases].find((p) => p.id === state.focus);
  if (focused) {
    const reply = focused.replies?.find((r) => r.id === state.reply);
    return reply ? reply.label.ja : focused.ja;
  }
  const parts = [config.intro.ja];
  if (config.textField && state.text.trim() !== '') parts.push(`${config.textField.cardHeading}、${state.text.trim()}`);
  for (const g of config.groups) {
    const chosen = g.choices.filter((c) => (state.selection[g.id] ?? []).includes(c.id));
    if (chosen.length) parts.push(`${g.cardHeading}、${chosen.map((c) => c.label.ja).join('、')}`);
  }
  return parts.join('。\n');
}

// 日本語の読み上げ（ブラウザ標準の speechSynthesis。通信・費用なし）。画面を見せにくい相手にも伝えられるように。
function useSpeakJa() {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => {
    setSupported('speechSynthesis' in window);
    return () => { if ('speechSynthesis' in window) speechSynthesis.cancel(); };
  }, []);
  const toggle = (text: string) => {
    speechSynthesis.cancel();
    if (speaking) { setSpeaking(false); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    u.rate = 0.9;
    const voice = speechSynthesis.getVoices().find((v) => v.lang.replace('_', '-').startsWith('ja'));
    if (voice) u.voice = voice;
    u.onend = u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(u);
  };
  return { supported, speaking, toggle };
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
