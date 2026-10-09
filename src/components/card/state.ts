import type { CardGroup } from './types';

// 指差しカードの状態。画面は select（タップで選ぶ）→ card（全画面で見せる）の2段。
// card では、店員が質問を指差すと focus に入り、本人の答え（reply）を大きく返せる。

export type Selection = Record<string, string[]>;

export interface CardState {
  view: 'select' | 'card';
  selection: Selection;
  /** 店員が指差した質問（StaffPhrase の id）。null なら一覧表示。 */
  focus: string | null;
  /** 本人がその質問に返した答え（CardChoice の id）。 */
  reply: string | null;
}

export type Action =
  | { type: 'toggle'; group: string; id: string; single: boolean }
  | { type: 'show-card' }
  | { type: 'back-to-select' }
  | { type: 'focus'; phrase: string | null }
  | { type: 'reply'; id: string | null }
  | { type: 'reset'; groups: CardGroup[] }
  | { type: 'hydrate'; selection: Selection };

export const emptySelection = (groups: CardGroup[]): Selection =>
  Object.fromEntries(groups.map((g) => [g.id, [] as string[]]));

export const initialState = (groups: CardGroup[]): CardState => ({
  view: 'select',
  selection: emptySelection(groups),
  focus: null,
  reply: null,
});

export function reducer(state: CardState, action: Action): CardState {
  switch (action.type) {
    case 'toggle': {
      const current = state.selection[action.group] ?? [];
      const selected = current.includes(action.id);
      const next = action.single
        ? (selected ? [] : [action.id])
        : (selected ? current.filter((id) => id !== action.id) : [...current, action.id]);
      return { ...state, selection: { ...state.selection, [action.group]: next } };
    }
    case 'show-card':
      return { ...state, view: 'card', focus: null, reply: null };
    case 'back-to-select':
      return { ...state, view: 'select', focus: null, reply: null };
    case 'focus':
      return { ...state, focus: action.phrase, reply: null };
    case 'reply':
      return { ...state, reply: action.id };
    case 'reset':
      return initialState(action.groups);
    case 'hydrate':
      return { ...state, selection: action.selection };
  }
}

export const hasAnything = (s: Selection) => Object.values(s).some((ids) => ids.length > 0);

/** 保存データや URL の値から、存在する id だけを取り出す（データ更新で消えた id を捨てる）。 */
export function sanitize(groups: CardGroup[], raw: Partial<Record<string, unknown>>): Selection {
  const result = emptySelection(groups);
  for (const group of groups) {
    const value = raw[group.id];
    if (!Array.isArray(value)) continue;
    const known = new Set(group.choices.map((c) => c.id));
    const ids = value.filter((id): id is string => typeof id === 'string' && known.has(id));
    result[group.id] = group.single ? ids.slice(0, 1) : [...new Set(ids)];
  }
  return result;
}

// ---- 保存（オフラインで開き直しても前回のカードが出るように） ----
// localStorage はプライベートモード等で使えないことがあるので、失敗しても動くようにする。
export function loadSelection(key: string, groups: CardGroup[]): Selection | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? sanitize(groups, JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function saveSelection(key: string, selection: Selection) {
  try {
    localStorage.setItem(key, JSON.stringify(selection));
  } catch {
    /* 保存できなくてもカードは使える */
  }
}

/** 他ページからの近道: ?s=headache,fever で urlGroup の選択肢を事前選択する。 */
export function selectionFromUrl(search: string, groups: CardGroup[], urlGroup?: string): Selection | null {
  if (!urlGroup) return null;
  const s = new URLSearchParams(search).get('s');
  if (!s) return null;
  return sanitize(groups, { [urlGroup]: s.split(',') });
}
