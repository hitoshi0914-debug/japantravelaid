import { groups, type GroupId } from '../../data/pharmacist';

// 指差しカードの状態。画面は select（タップで選ぶ）→ card（全画面で見せる）の2段。
// card では、薬剤師が質問を指差すと focus に入り、本人の答え（reply）を大きく返せる。

export type Selection = Record<GroupId, string[]>;

export interface CardState {
  view: 'select' | 'card';
  selection: Selection;
  /** 薬剤師が指差した質問（pharmacistPhrases の id）。null なら一覧表示。 */
  focus: string | null;
  /** 本人がその質問に返した答え（Choice の id）。 */
  reply: string | null;
}

export type Action =
  | { type: 'toggle'; group: GroupId; id: string }
  | { type: 'show-card' }
  | { type: 'back-to-select' }
  | { type: 'focus'; phrase: string | null }
  | { type: 'reply'; id: string | null }
  | { type: 'reset' }
  | { type: 'hydrate'; selection: Selection };

export const emptySelection = (): Selection => ({ who: [], symptoms: [], since: [], wishes: [], conditions: [] });

export const initialState = (selection: Selection = emptySelection()): CardState => ({
  view: 'select',
  selection,
  focus: null,
  reply: null,
});

const isSingle = (group: GroupId) => groups.find((g) => g.id === group)?.single ?? false;

export function reducer(state: CardState, action: Action): CardState {
  switch (action.type) {
    case 'toggle': {
      const current = state.selection[action.group];
      const selected = current.includes(action.id);
      const next = isSingle(action.group)
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
      return initialState();
    case 'hydrate':
      return { ...state, selection: action.selection };
  }
}

export const hasAnything = (s: Selection) => Object.values(s).some((ids) => ids.length > 0);

// ---- 保存（オフラインで開き直しても前回のカードが出るように） ----
// localStorage はプライベートモード等で使えないことがあるので、失敗しても動くようにする。
const STORAGE_KEY = 'otc-card-v1';

const knownIds = (group: GroupId) => new Set(groups.find((g) => g.id === group)!.choices.map((c) => c.id));

/** 保存データや URL の値から、存在する id だけを取り出す（データ更新で消えた id を捨てる）。 */
export function sanitize(raw: Partial<Record<string, unknown>>): Selection {
  const result = emptySelection();
  for (const group of Object.keys(result) as GroupId[]) {
    const value = raw[group];
    if (!Array.isArray(value)) continue;
    const ids = value.filter((id): id is string => typeof id === 'string' && knownIds(group).has(id));
    result[group] = isSingle(group) ? ids.slice(0, 1) : [...new Set(ids)];
  }
  return result;
}

export function loadSelection(): Selection | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? sanitize(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function saveSelection(selection: Selection) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
  } catch {
    /* 保存できなくてもカードは使える */
  }
}

/** カテゴリページからの近道: /en/pharmacist/?s=headache,fever で症状を事前選択する。 */
export function selectionFromUrl(search: string): Selection | null {
  const s = new URLSearchParams(search).get('s');
  if (!s) return null;
  return sanitize({ symptoms: s.split(',') });
}
