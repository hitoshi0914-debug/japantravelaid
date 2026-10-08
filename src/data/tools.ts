import type { Tile } from './categories';
import { locales, type Lang } from '../i18n/locales';

// サイトのトップ（/en/・/ja/）に並べるツール。新しいツールを足すときはここに1行追加し、
// src/pages/[lang]/<id>/ にページを作る。langs はそのツールのページを生成する言語。
export const tools: (Tile & { langs: readonly Lang[] })[] = [
  {
    id: 'medicine', kind: 'tool', pictogram: '💊', path: 'medicine/', langs: ['en'],
    label: { en: 'Medicine & Emergency', ja: '市販薬・救急（英語）' },
    hint: { en: 'Drugstore card, 119', ja: '薬局の指差しカード・119' },
  },
  {
    id: 'smoking', kind: 'tool', pictogram: '🚬', path: 'smoking/', langs: ['en', 'ja'],
    label: { en: 'Smoking Areas', ja: '喫煙所' },
    hint: { en: 'Nearest smoking spots', ja: '近くの喫煙所' },
  },
];

const allLangs = locales.map((l) => l.code);

/** 言語の後ろのパス（例: "medicine/pharmacist/"）のページが生成される言語。 */
export function langsForPath(path: string): readonly Lang[] {
  return tools.find((t) => path.startsWith(t.path))?.langs ?? allLangs;
}
