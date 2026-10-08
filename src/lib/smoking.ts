// 喫煙所データ（public/smoking/spots.json、形式は scripts/smoking/SCHEMA.md）の型と、
// 地図（SmokingFinder.tsx）と地域ページ（Astro）で共通に使う処理。
import { siteConfig } from '../site.config';

export type SpotLang = 'en' | 'zh-Hant' | 'zh-Hans' | 'ko' | 'ja';
export type SpotType = 'outdoor' | 'booth' | 'indoor' | 'unknown';
export type Tobacco = 'any' | 'heated_only' | 'unknown';

export interface Area {
  code: string;      // 全国地方公共団体コード（例: 13106）
  pref: string;      // 東京都
  city: string;      // 台東区
  pref_en: string;   // Tokyo
  city_en: string;   // Taito-ku
  slug: string;      // tokyo-taito（/<lang>/smoking/<slug>/）
}

export interface Spot {
  id: string;
  lat: number;
  lng: number;
  name: Partial<Record<SpotLang, string>>;
  address: Partial<Record<SpotLang, string>>;
  type: SpotType;
  access: 'public' | 'customers' | 'unknown';
  fee: boolean | null;
  hours: string | null;
  note: string | null;
  sources: { source: string; ref: string }[];
  updated: string | null;
  tobacco: Tobacco;
  area: Area | null;
  /** ユーザー投稿で追加した人のニックネーム（承認済みの投稿だけ）。古いデータにはない。 */
  added_by?: string | null;
}

export interface SpotsFile {
  version: number;
  generated_at: string;
  sources: { id: string; name: string; license: string; url: string }[];
  spots: Spot[];
}

/** これ未満の件数の地域ページは検索に出さない（noindex・サイトマップ外）。薄いページ対策。 */
export const MIN_INDEXABLE_SPOTS = 3;

// 名前がその言語にない時の代わり（中国語は繁簡を相互に、どれもなければ英語→日本語）
export function localized(field: Spot['name'], lang: SpotLang): string | undefined {
  const order: SpotLang[] =
    lang === 'zh-Hant' ? ['zh-Hant', 'zh-Hans', 'en', 'ja']
    : lang === 'zh-Hans' ? ['zh-Hans', 'zh-Hant', 'en', 'ja']
    : lang === 'ja' ? ['ja', 'en']
    : [lang, 'en', 'ja'];
  for (const l of order) if (field[l]) return field[l];
  return undefined;
}

/** 「閉鎖・間違いを報告」の URL（フォームが未設定なら null）。 */
export function reportUrl(spotId: string): string | null {
  const url = siteConfig.smokingReportFormUrl;
  return url ? url.replace('SPOT_ID', encodeURIComponent(spotId)) : null;
}

/** 「喫煙所を追加」フォームの URL（未設定なら null）。現在地が分かれば緯度経度を入れておく。 */
export function submitUrl(position: [number, number] | null): string | null {
  const url = siteConfig.smokingSubmitFormUrl;
  if (!url) return null;
  return url
    .replace('LAT', position ? position[0].toFixed(6) : '')
    .replace('LNG', position ? position[1].toFixed(6) : '');
}

// 投稿した喫煙所の数（承認済み）で決まるランク。下から順に、この件数以上で上がる。
export const RANKS = [
  { id: 'bronze', min: 1 },
  { id: 'silver', min: 5 },
  { id: 'gold', min: 15 },
  { id: 'platinum', min: 30 },
  { id: 'diamond', min: 50 },
] as const;
export type RankId = (typeof RANKS)[number]['id'];

/** ニックネームごとの投稿数。 */
export function contributionCounts(spots: Spot[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const s of spots) if (s.added_by) m.set(s.added_by, (m.get(s.added_by) ?? 0) + 1);
  return m;
}

export function rankFor(count: number): RankId | null {
  let r: RankId | null = null;
  for (const x of RANKS) if (count >= x.min) r = x.id;
  return r;
}

export function routeUrl(to: { lat: number; lng: number }, from?: [number, number] | null): string {
  const p = new URLSearchParams({ api: '1', destination: `${to.lat},${to.lng}`, travelmode: 'walking' });
  if (from) p.set('origin', `${from[0]},${from[1]}`);
  return `https://www.google.com/maps/dir/?${p}`;
}

export const areaName = (a: Area, lang: 'en' | 'ja') => (lang === 'ja' ? `${a.city}（${a.pref}）` : `${a.city_en}, ${a.pref_en}`);

/** 地域ごとにまとめる（ビルド時に Astro から使う）。 */
export function groupByArea(spots: Spot[]): { area: Area; spots: Spot[] }[] {
  const map = new Map<string, { area: Area; spots: Spot[] }>();
  for (const s of spots) {
    if (!s.area) continue;
    const g = map.get(s.area.slug) ?? { area: s.area, spots: [] };
    g.spots.push(s);
    map.set(s.area.slug, g);
  }
  return [...map.values()].sort((a, b) => a.area.code.localeCompare(b.area.code));
}
