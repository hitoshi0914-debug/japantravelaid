// ビルド時に public/smoking/spots.json を読む（Astro のページ・サイトマップ用。ブラウザ側は fetch で読む）。
import raw from '../../public/smoking/spots.json';
import { groupByArea, TOURIST_AREAS, type SpotsFile } from './smoking';

const data = raw as unknown as SpotsFile;

export const loadSpots = (): SpotsFile => data;
/** 地域ページを作る地域（観光地だけ、TOURIST_AREAS）。 */
export const spotAreas = () => groupByArea(data.spots).filter((g) => TOURIST_AREAS.has(g.area.slug));
