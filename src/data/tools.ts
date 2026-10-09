import { tiles, type Tile } from './categories';
import { locales, type Lang } from '../i18n/locales';

// サイトのトップ（/en/・/ja/）に並べるツール。新しいツールを足すときはここに1行追加し、
// src/pages/[lang]/<id>/ にページを作る。langs はそのツールのページを生成する言語。
function allLangs(): readonly Lang[] {
  return locales.map((l) => l.code);
}

// 並び = トップでの並び。サイトの中心は「日本人スタッフに見せる指差しカード」（2026-10-09 ユーザー決定）。
// secondary のツール（喫煙所）はカードの下に小さく出す。
const card = (id: string) => tiles.find((t) => t.id === id)!;

export const tools: (Tile & { langs: readonly Lang[]; secondary?: boolean })[] = [
  { ...card('pharmacist'), langs: allLangs() },
  {
    id: 'salon', kind: 'tool', pictogram: '💇', path: 'salon/', langs: allLangs(),
    label: { en: 'Show to Hair Salon', ja: '美容院で見せる', 'zh-tw': '給美髮師看', 'zh-cn': '给理发师看', ko: '미용실에서 보여주기', de: 'Beim Friseur zeigen', fr: 'Montrer au coiffeur', it: 'Mostra al parrucchiere', es: 'Mostrar en la peluquería' },
    hint: { en: 'Length, bangs, color', ja: '長さ・前髪・カラー', 'zh-tw': '長度・瀏海・染髮', 'zh-cn': '长度・刘海・染发', ko: '길이・앞머리・염색', de: 'Länge, Pony, Farbe', fr: 'Longueur, frange, couleur', it: 'Lunghezza, frangia, colore', es: 'Largo, flequillo, color' },
  },
  {
    id: 'medicine', kind: 'tool', pictogram: '💊', path: 'medicine/', langs: allLangs(),
    label: { en: 'Medicine & Emergency', ja: '市販薬・救急', 'zh-tw': '藥品・急救', 'zh-cn': '药品・急救', ko: '의약품・응급', de: 'Medikamente & Notfall', fr: 'Médicaments & urgences', it: 'Farmaci ed emergenze', es: 'Medicinas y urgencias' },
    hint: { en: 'Drugstore card, 119', ja: '薬局の指差しカード・119', 'zh-tw': '藥妝店指示卡・119', 'zh-cn': '药妆店指示卡・119', ko: '약국 손가락 카드・119', de: 'Apotheken-Karte, 119', fr: 'Carte pharmacie, 119', it: 'Scheda farmacia, 119', es: 'Tarjeta de farmacia, 119' },
  },
  { ...card('emergency'), langs: allLangs() },
  {
    id: 'smoking', kind: 'tool', pictogram: '🚬', path: 'smoking/', langs: allLangs(), secondary: true,
    label: { en: 'Smoking Areas', ja: '喫煙所', 'zh-tw': '吸菸區', 'zh-cn': '吸烟区', ko: '흡연구역', de: 'Raucherbereiche', fr: 'Espaces fumeurs', it: 'Aree fumatori', es: 'Zonas de fumadores' },
    hint: { en: 'Nearest smoking spots', ja: '近くの喫煙所', 'zh-tw': '附近的吸菸區', 'zh-cn': '附近的吸烟区', ko: '가까운 흡연구역', de: 'Raucherbereiche in der Nähe', fr: 'Espaces fumeurs proches', it: 'Aree fumatori vicine', es: 'Zonas para fumar cercanas' },
  },
];


/** 言語の後ろのパス（例: "medicine/pharmacist/"）のページが生成される言語。 */
export function langsForPath(path: string): readonly Lang[] {
  return tools.find((t) => path.startsWith(t.path))?.langs ?? allLangs();
}
