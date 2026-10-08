// ビルド時に public/smoking/spots.json を読む（Astro のページ・サイトマップ用。ブラウザ側は fetch で読む）。
import raw from '../../public/smoking/spots.json';
import { groupByArea, type SpotsFile } from './smoking';

const data = raw as unknown as SpotsFile;

export const loadSpots = (): SpotsFile => data;
export const spotAreas = () => groupByArea(data.spots);
