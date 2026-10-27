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
    id: 'salon', kind: 'tool', icon: 'scissors', tone: 'daily', path: 'salon/', langs: allLangs(),
    label: { en: 'Show to Hair Salon', ja: '美容院で見せる', 'zh-tw': '給美髮師看', 'zh-cn': '给理发师看', ko: '미용실에서 보여주기', de: 'Beim Friseur zeigen', fr: 'Montrer au coiffeur', it: 'Mostra al parrucchiere', es: 'Mostrar en la peluquería' },
    hint: { en: 'Length, bangs, color', ja: '長さ・前髪・カラー', 'zh-tw': '長度・瀏海・染髮', 'zh-cn': '长度・刘海・染发', ko: '길이・앞머리・염색', de: 'Länge, Pony, Farbe', fr: 'Longueur, frange, couleur', it: 'Lunghezza, frangia, colore', es: 'Largo, flequillo, color' },
  },
  {
    id: 'allergy', kind: 'tool', icon: 'utensils', tone: 'daily', path: 'allergy/', langs: allLangs(),
    label: { en: 'Allergy & Diet', ja: '飲食店で見せる', 'zh-tw': '給餐廳看', 'zh-cn': '给餐厅看', ko: '음식점에서 보여주기', de: 'Allergien & Ernährung', fr: 'Allergies & régime', it: 'Allergie e dieta', es: 'Alergias y dieta' },
    hint: { en: 'Allergies, halal, vegan', ja: 'アレルギー・ハラール・ヴィーガン', 'zh-tw': '過敏・清真・純素', 'zh-cn': '过敏・清真・纯素', ko: '알레르기・할랄・비건', de: 'Allergien, halal, vegan', fr: 'Allergies, halal, végan', it: 'Allergie, halal, vegano', es: 'Alergias, halal, vegano' },
  },
  {
    id: 'taxi', kind: 'tool', icon: 'taxi', tone: 'daily', path: 'taxi/', langs: allLangs(),
    label: { en: 'Show to Taxi Driver', ja: 'タクシーで見せる', 'zh-tw': '給計程車司機看', 'zh-cn': '给出租车司机看', ko: '택시에서 보여주기', de: 'Dem Taxifahrer zeigen', fr: 'Montrer au taxi', it: 'Mostra al tassista', es: 'Mostrar al taxista' },
    hint: { en: 'Destination, stop here', ja: '行き先・ここで止めて', 'zh-tw': '目的地・在這裡停', 'zh-cn': '目的地・在这里停', ko: '목적지・여기서 세워 주세요', de: 'Ziel, hier halten', fr: 'Destination, arrêtez-vous ici', it: 'Destinazione, si fermi qui', es: 'Destino, pare aquí' },
  },
  {
    id: 'train', kind: 'tool', icon: 'train', tone: 'daily', path: 'train/', langs: allLangs(),
    label: { en: 'Show at Station', ja: '駅で見せる', 'zh-tw': '給站務員看', 'zh-cn': '给站务员看', ko: '역에서 보여주기', de: 'Am Bahnhof zeigen', fr: 'Montrer à la gare', it: 'Mostra in stazione', es: 'Mostrar en la estación' },
    hint: { en: 'Missed stop, IC card', ja: '乗り過ごし・ICカード', 'zh-tw': '坐過站・IC卡', 'zh-cn': '坐过站・IC卡', ko: '역 지나침・IC카드', de: 'Station verpasst, IC-Karte', fr: 'Arrêt raté, carte IC', it: 'Fermata saltata, carta IC', es: 'Parada perdida, tarjeta IC' },
  },
  {
    id: 'bus', kind: 'tool', icon: 'bus', tone: 'daily', path: 'bus/', langs: allLangs(),
    label: { en: 'Show to Bus Driver', ja: 'バスで見せる', 'zh-tw': '給公車司機看', 'zh-cn': '给公交车司机看', ko: '버스에서 보여주기', de: 'Dem Busfahrer zeigen', fr: 'Montrer au bus', it: 'Mostra all’autista', es: 'Mostrar al conductor' },
    hint: { en: 'Tell me my stop, fares', ja: '着いたら教えて・運賃', 'zh-tw': '到站提醒・車資', 'zh-cn': '到站提醒・车费', ko: '도착 알림・요금', de: 'Haltestelle, Fahrpreis', fr: 'Mon arrêt, tarif', it: 'Fermata, tariffa', es: 'Mi parada, tarifa' },
  },
  {
    id: 'medicine', kind: 'tool', icon: 'pill', path: 'medicine/', langs: allLangs(),
    label: { en: 'Medicine & Emergency', ja: '市販薬・救急', 'zh-tw': '藥品・急救', 'zh-cn': '药品・急救', ko: '의약품・응급', de: 'Medikamente & Notfall', fr: 'Médicaments & urgences', it: 'Farmaci ed emergenze', es: 'Medicinas y urgencias' },
    hint: { en: 'Drugstore card, 119', ja: '薬局の指差しカード・119', 'zh-tw': '藥妝店指示卡・119', 'zh-cn': '药妆店指示卡・119', ko: '약국 손가락 카드・119', de: 'Apotheken-Karte, 119', fr: 'Carte pharmacie, 119', it: 'Scheda farmacia, 119', es: 'Tarjeta de farmacia, 119' },
  },
  { ...card('emergency'), langs: allLangs() },
  {
    id: 'smoking', kind: 'tool', icon: 'cigarette', path: 'smoking/', langs: allLangs(), secondary: true,
    label: { en: 'Smoking Areas', ja: '喫煙所', 'zh-tw': '吸菸區', 'zh-cn': '吸烟区', ko: '흡연구역', de: 'Raucherbereiche', fr: 'Espaces fumeurs', it: 'Aree fumatori', es: 'Zonas de fumadores' },
    hint: { en: 'Nearest smoking spots', ja: '近くの喫煙所', 'zh-tw': '附近的吸菸區', 'zh-cn': '附近的吸烟区', ko: '가까운 흡연구역', de: 'Raucherbereiche in der Nähe', fr: 'Espaces fumeurs proches', it: 'Aree fumatori vicine', es: 'Zonas para fumar cercanas' },
  },
];


/** 言語の後ろのパス（例: "medicine/pharmacist/"）のページが生成される言語。 */
export function langsForPath(path: string): readonly Lang[] {
  return tools.find((t) => path.startsWith(t.path))?.langs ?? allLangs();
}
