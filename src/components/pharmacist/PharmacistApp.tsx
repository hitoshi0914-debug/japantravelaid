import { useEffect, useReducer } from 'react';
import type { AnyLang } from '../../i18n/locales';
import { CardView } from './CardView';
import { SelectView } from './SelectView';
import { initialState, loadSelection, reducer, saveSelection, selectionFromUrl } from './state';

interface Props {
  lang: AnyLang;
}

// 指差しカードの島（client:load）。状態はこのコンポーネントの useReducer に1つだけ持ち、
// 子は state と dispatch を受け取って描画するだけにする（状態ライブラリは使わない）。
export default function PharmacistApp({ lang }: Props) {
  const [state, dispatch] = useReducer(reducer, undefined, () => initialState());

  // 初回だけ: URL の ?s= があればそれを、なければ前回保存した選択を読み込む。
  // SSR の HTML と食い違わないよう、読み込みはマウント後に行う。
  useEffect(() => {
    const fromUrl = selectionFromUrl(location.search);
    const saved = fromUrl ?? loadSelection();
    if (saved) dispatch({ type: 'hydrate', selection: saved });
    // 読み込んだら ?s= は消す（再読み込みで、その後に選んだ内容が URL の値で上書きされないように）。
    if (fromUrl) history.replaceState(history.state, '', location.pathname);
  }, []);

  useEffect(() => {
    saveSelection(state.selection);
  }, [state.selection]);

  // カード表示中はブラウザの「戻る」でカードを閉じる（店頭で誤ってページを離れないように）。
  useEffect(() => {
    if (state.view !== 'card') return;
    history.pushState({ otcCard: true }, '');
    const onPop = () => dispatch({ type: 'back-to-select' });
    addEventListener('popstate', onPop);
    return () => removeEventListener('popstate', onPop);
  }, [state.view]);

  return state.view === 'card'
    ? <CardView lang={lang} state={state} dispatch={dispatch} onClose={() => history.back()} />
    : <SelectView lang={lang} state={state} dispatch={dispatch} />;
}
