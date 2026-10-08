import type { Dispatch } from 'react';
import { groups } from '../../data/pharmacist';
import { tr, type AnyLang } from '../../i18n/locales';
import { ui } from '../../i18n/ui';
import { hasAnything, type Action, type CardState } from './state';

interface Props {
  lang: AnyLang;
  state: CardState;
  dispatch: Dispatch<Action>;
}

// 選択画面: グループごとに大きなチップをタップで選ぶ。下に固定の「カードを表示」ボタン。
export function SelectView({ lang, state, dispatch }: Props) {
  const count = Object.values(state.selection).reduce((n, ids) => n + ids.length, 0);
  const ready = state.selection.symptoms.length > 0;

  return (
    <div className="select">
      {groups.map((group) => (
        <fieldset className="group" key={group.id}>
          <legend>
            {tr(group.title, lang)}
            {lang !== 'ja' && <span className="legend-ja" lang="ja">{group.title.ja}</span>}
            {group.id === 'symptoms' && <span className="required">{tr(ui.required, lang)}</span>}
          </legend>
          <div className="chips">
            {group.choices.map((choice) => {
              const selected = state.selection[group.id].includes(choice.id);
              return (
                <button
                  type="button"
                  key={choice.id}
                  className={`chip${selected ? ' is-selected' : ''}`}
                  aria-pressed={selected}
                  onClick={() => dispatch({ type: 'toggle', group: group.id, id: choice.id })}
                >
                  <span className="chip-icon" aria-hidden="true">{choice.pictogram}</span>
                  <span className="chip-text">
                    <span>{tr(choice.label, lang)}</span>
                    {lang !== 'ja' && <span className="chip-ja" lang="ja">{choice.label.ja}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="select-actions">
        {hasAnything(state.selection) && (
          <button type="button" className="btn-ghost" onClick={() => dispatch({ type: 'reset' })}>
            {tr(ui.clear, lang)}
          </button>
        )}
        <button
          type="button"
          className="btn-primary"
          disabled={!ready}
          onClick={() => dispatch({ type: 'show-card' })}
          data-ga="show_card"
        >
          {ready ? `${tr(ui.showCard, lang)} (${count})` : tr(ui.pickSymptom, lang)}
        </button>
      </div>
    </div>
  );
}
