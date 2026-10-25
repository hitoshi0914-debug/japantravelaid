// 背景地図（薬局ファインダー用。喫煙所ファインダーの Basemap と同じ作り）。
// OpenFreeMap（無料・API キー不要・商用可）のベクター地図。日本語画面は日本語、ほかは英語のローマ字表記で地名を出す。
// WebGL が使えない・OpenFreeMap が落ちているときは国土地理院の淡色地図にする。CARTO は API キー必須なので使わない。
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const GSI_PALE = 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png';

function labelExpr(ja: boolean): import('maplibre-gl').ExpressionSpecification {
  return ja
    ? ['coalesce', ['get', 'name:ja'], ['get', 'name']]
    : ['coalesce', ['get', 'name:en'], ['get', 'name_en'], ['get', 'name:latin'], ['get', 'name']];
}

/** credit: 地図に載せるデータの出典（HTML）。 */
export default function Basemap({ ja, credit }: { ja: boolean; credit: string }) {
  const map = useMap();
  const [gl, setGl] = useState<import('maplibre-gl').Map | null>(null);

  useEffect(() => {
    let layer: L.Layer | null = null;
    let cancelled = false;
    const fallback = () => {
      if (cancelled) return;
      layer = L.tileLayer(GSI_PALE, {
        maxNativeZoom: 18,
        maxZoom: 20,
        attribution: `<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a> | ${credit}`,
      }).addTo(map);
    };
    Promise.all([import('maplibre-gl'), import('@maplibre/maplibre-gl-leaflet'), import('maplibre-gl/dist/maplibre-gl.css')])
      .then(([, plugin]) => {
        if (cancelled) return;
        try {
          const vector = plugin.maplibreGL({ style: 'https://tiles.openfreemap.org/styles/liberty' });
          // プラグインは出典を Leaflet に渡さないので、レイヤーの出典として自分で付ける
          vector.getAttribution = () => `<a href="https://openfreemap.org">OpenFreeMap</a> &copy; <a href="https://www.openmaptiles.org/">OpenMapTiles</a> | ${credit}`;
          vector.addTo(map);
          layer = vector;
          const glMap = vector.getMaplibreMap();
          glMap.once('error', () => {
            if (cancelled || glMap.isStyleLoaded()) return;
            map.removeLayer(vector);
            fallback();
          });
          setGl(glMap);
        } catch {
          fallback();
        }
      })
      .catch(fallback);
    return () => {
      cancelled = true;
      if (layer) map.removeLayer(layer);
    };
  }, [map, credit]);

  useEffect(() => {
    if (!gl) return;
    const apply = () => {
      for (const l of gl.getStyle()?.layers ?? []) {
        const field = l.type === 'symbol' ? l.layout?.['text-field'] : undefined;
        if (field && JSON.stringify(field).includes('name')) gl.setLayoutProperty(l.id, 'text-field', labelExpr(ja));
      }
    };
    if (gl.isStyleLoaded()) apply();
    else gl.once('load', apply);
  }, [gl, ja]);

  return null;
}
