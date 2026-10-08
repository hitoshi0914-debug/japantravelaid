import type { Tile } from './categories';
import { locales, type Lang } from '../i18n/locales';

// サイトのトップ（/en/・/ja/）に並べるツール。新しいツールを足すときはここに1行追加し、
// src/pages/[lang]/<id>/ にページを作る。langs はそのツールのページを生成する言語。
export const tools: (Tile & { langs: readonly Lang[] })[] = [
  {
    id: 'medicine', kind: 'tool', pictogram: '💊', path: 'medicine/', langs: ['en'],
    label: { en: 'Medicine & Emergency', ja: '市販薬・救急（英語）', 'zh-tw': '藥品・急救（英文）', 'zh-cn': '药品・急救（英文）', ko: '의약품・응급（영어）' },
    hint: { en: 'Drugstore card, 119', ja: '薬局の指差しカード・119' },
  },
  {
    id: 'smoking', kind: 'tool', pictogram: '🚬', path: 'smoking/', langs: ['en', 'ja', 'zh-tw', 'zh-cn', 'ko'],
    label: { en: 'Smoking Areas', ja: '喫煙所', 'zh-tw': '吸菸區', 'zh-cn': '吸烟区', ko: '흡연구역' },
    hint: { en: 'Nearest smoking spots', ja: '近くの喫煙所', 'zh-tw': '附近的吸菸區', 'zh-cn': '附近的吸烟区', ko: '가까운 흡연구역' },
  },
];

const allLangs = locales.map((l) => l.code);

/** 言語の後ろのパス（例: "medicine/pharmacist/"）のページが生成される言語。 */
export function langsForPath(path: string): readonly Lang[] {
  return tools.find((t) => path.startsWith(t.path))?.langs ?? allLangs;
}
