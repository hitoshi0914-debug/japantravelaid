// 近くの薬局・ドラッグストア（/[lang]/medicine/drugstores/ の島）。
// 現在地 → public/pharmacy/t/ のタイル（OSM から scripts/pharmacy/build_pharmacies.py で生成）→ 近い順に地図とリストで出し、
// 店に着いたら薬剤師カードへ進めるようにする。薬の商品名・推奨は出さない。
import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Basemap from '../map/Basemap';
import type { Lang } from '../../i18n/locales';

type Kind = 'd' | 'p';
interface Shop { lat: number; lng: number; n: string; e?: string; k: Kind; h?: string }
interface Index { tile: number; tiles: string[]; count: number }
type WithDistance = Shop & { distance: number };

const T = {
  en: {
    locate: 'Find the nearest pharmacy', locating: 'Getting your location…', retry: 'Try again',
    denied: 'Location is off. Turn it on and try again, or use Google Maps below.',
    nearest: 'Nearest pharmacies & drugstores', kinds: { d: 'Drugstore · OTC medicine', p: 'Pharmacy · mainly prescriptions' },
    drugOnly: 'Drugstores only (OTC medicine)', walk: (n: number) => `${n} min walk`, route: 'Directions', hours: 'Hours',
    none: 'None found near you in our data. Try Google Maps below.', loadError: 'Could not load the pharmacy list.',
    cardH: 'At the counter', cardBody: 'Show the pharmacist card to explain your symptoms in Japanese.', cardCta: 'Open the pharmacist card',
    note: 'Hours may be out of date. Check before you go.',
  },
  ja: {
    locate: '一番近い薬局を探す', locating: '現在地を取得中…', retry: 'もう一度',
    denied: '位置情報がオフです。オンにしてもう一度押すか、下の Google マップで探してください。',
    nearest: '近くの薬局・ドラッグストア', kinds: { d: 'ドラッグストア・市販薬あり', p: '調剤薬局・主に処方せん' },
    drugOnly: 'ドラッグストアだけ（市販薬）', walk: (n: number) => `徒歩${n}分`, route: '経路', hours: '営業時間',
    none: '近くに登録された店がありません。下の Google マップで探してください。', loadError: '薬局の一覧を読み込めませんでした。',
    cardH: '店に着いたら', cardBody: '薬剤師カードを見せると、症状を日本語で伝えられます。', cardCta: '薬剤師カードを開く',
    note: '営業時間は古いことがあります。行く前に確かめてください。',
  },
  ko: {
    locate: '가장 가까운 약국 찾기', locating: '위치를 가져오는 중…', retry: '다시 시도',
    denied: '위치 정보가 꺼져 있습니다. 켜고 다시 누르거나 아래 Google 지도를 이용하세요.',
    nearest: '가까운 약국·드러그스토어', kinds: { d: '드러그스토어 · 일반의약품', p: '조제 약국 · 주로 처방전' },
    drugOnly: '드러그스토어만 (일반의약품)', walk: (n: number) => `도보 ${n}분`, route: '길찾기', hours: '영업시간',
    none: '주변에 등록된 곳이 없습니다. 아래 Google 지도를 이용하세요.', loadError: '약국 목록을 불러오지 못했습니다.',
    cardH: '가게에 도착하면', cardBody: '약사 카드를 보여 주면 증상을 일본어로 전할 수 있어요.', cardCta: '약사 카드 열기',
    note: '영업시간은 바뀌었을 수 있습니다. 가기 전에 확인하세요.',
  },
  'zh-tw': {
    locate: '尋找最近的藥局', locating: '正在取得位置…', retry: '重試',
    denied: '未開啟定位。請開啟後再試一次，或使用下方的 Google 地圖。',
    nearest: '附近的藥局・藥妝店', kinds: { d: '藥妝店・有非處方藥', p: '處方藥局・主要調劑處方' },
    drugOnly: '只顯示藥妝店（非處方藥）', walk: (n: number) => `步行 ${n} 分鐘`, route: '路線', hours: '營業時間',
    none: '資料中附近沒有店家。請使用下方的 Google 地圖。', loadError: '無法載入藥局清單。',
    cardH: '到了店裡', cardBody: '出示藥劑師卡，就能用日文說明症狀。', cardCta: '開啟藥劑師卡',
    note: '營業時間可能已變更，出發前請確認。',
  },
  'zh-cn': {
    locate: '查找最近的药店', locating: '正在获取位置…', retry: '重试',
    denied: '未开启定位。请开启后再试一次，或使用下方的 Google 地图。',
    nearest: '附近的药店・药妆店', kinds: { d: '药妆店・有非处方药', p: '处方药局・主要配处方药' },
    drugOnly: '只显示药妆店（非处方药）', walk: (n: number) => `步行 ${n} 分钟`, route: '路线', hours: '营业时间',
    none: '数据中附近没有店铺。请使用下方的 Google 地图。', loadError: '无法加载药店列表。',
    cardH: '到了店里', cardBody: '出示药剂师卡，就能用日语说明症状。', cardCta: '打开药剂师卡',
    note: '营业时间可能已变更，出发前请确认。',
  },
  de: {
    locate: 'Nächste Apotheke finden', locating: 'Standort wird ermittelt…', retry: 'Erneut versuchen',
    denied: 'Standort ist aus. Bitte einschalten und erneut tippen oder unten Google Maps nutzen.',
    nearest: 'Apotheken & Drogerien in der Nähe', kinds: { d: 'Drogerie · rezeptfreie Medikamente', p: 'Apotheke · vor allem Rezepte' },
    drugOnly: 'Nur Drogerien (rezeptfrei)', walk: (n: number) => `${n} Min. zu Fuß`, route: 'Route', hours: 'Öffnungszeiten',
    none: 'In unseren Daten ist nichts in der Nähe. Bitte unten Google Maps nutzen.', loadError: 'Die Liste konnte nicht geladen werden.',
    cardH: 'An der Theke', cardBody: 'Zeige die Apotheker-Karte, um deine Beschwerden auf Japanisch zu erklären.', cardCta: 'Apotheker-Karte öffnen',
    note: 'Öffnungszeiten können veraltet sein. Bitte vorher prüfen.',
  },
  fr: {
    locate: 'Trouver la pharmacie la plus proche', locating: 'Localisation en cours…', retry: 'Réessayer',
    denied: 'La localisation est désactivée. Activez-la et réessayez, ou utilisez Google Maps ci-dessous.',
    nearest: 'Pharmacies et drogueries proches', kinds: { d: 'Droguerie · médicaments sans ordonnance', p: 'Pharmacie · surtout ordonnances' },
    drugOnly: 'Drogueries seulement (sans ordonnance)', walk: (n: number) => `${n} min à pied`, route: 'Itinéraire', hours: 'Horaires',
    none: 'Rien trouvé près de vous dans nos données. Essayez Google Maps ci-dessous.', loadError: 'Impossible de charger la liste.',
    cardH: 'Au comptoir', cardBody: 'Montrez la carte pour le pharmacien afin d’expliquer vos symptômes en japonais.', cardCta: 'Ouvrir la carte pharmacien',
    note: 'Les horaires peuvent avoir changé. Vérifiez avant d’y aller.',
  },
  it: {
    locate: 'Trova la farmacia più vicina', locating: 'Rilevamento posizione…', retry: 'Riprova',
    denied: 'La posizione è disattivata. Attivala e riprova, oppure usa Google Maps qui sotto.',
    nearest: 'Farmacie e drugstore vicini', kinds: { d: 'Drugstore · farmaci da banco', p: 'Farmacia · soprattutto ricette' },
    drugOnly: 'Solo drugstore (farmaci da banco)', walk: (n: number) => `${n} min a piedi`, route: 'Indicazioni', hours: 'Orari',
    none: 'Nessun risultato vicino nei nostri dati. Prova Google Maps qui sotto.', loadError: 'Impossibile caricare l’elenco.',
    cardH: 'Al banco', cardBody: 'Mostra la scheda per il farmacista per spiegare i sintomi in giapponese.', cardCta: 'Apri la scheda farmacista',
    note: 'Gli orari potrebbero non essere aggiornati. Controlla prima di andare.',
  },
  es: {
    locate: 'Buscar la farmacia más cercana', locating: 'Obteniendo tu ubicación…', retry: 'Reintentar',
    denied: 'La ubicación está desactivada. Actívala y vuelve a intentarlo, o usa Google Maps abajo.',
    nearest: 'Farmacias y droguerías cercanas', kinds: { d: 'Droguería · medicamentos sin receta', p: 'Farmacia · sobre todo recetas' },
    drugOnly: 'Solo droguerías (sin receta)', walk: (n: number) => `${n} min a pie`, route: 'Cómo llegar', hours: 'Horario',
    none: 'No encontramos nada cerca en nuestros datos. Prueba Google Maps abajo.', loadError: 'No se pudo cargar la lista.',
    cardH: 'En el mostrador', cardBody: 'Muestra la tarjeta para el farmacéutico y explica tus síntomas en japonés.', cardCta: 'Abrir la tarjeta del farmacéutico',
    note: 'El horario puede estar desactualizado. Compruébalo antes de ir.',
  },
} satisfies Record<Lang, unknown>;

const CREDIT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const LIST_SIZE = 8;

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6_371_000;
  const rad = Math.PI / 180;
  const a = Math.sin(((lat2 - lat1) * rad) / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(((lng2 - lng1) * rad) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

const formatDistance = (m: number) => (m < 1000 ? `${Math.round(m / 10) * 10} m` : `${(m / 1000).toFixed(m < 10_000 ? 1 : 0)} km`);

function routeUrl(to: Shop, from: [number, number]): string {
  const p = new URLSearchParams({ api: '1', origin: `${from[0]},${from[1]}`, destination: `${to.lat},${to.lng}`, travelmode: 'walking' });
  return `https://www.google.com/maps/dir/?${p}`;
}

/** 現在地のまわり (2r+1)×(2r+1) 枚のタイル名。 */
function tilesAround(lat: number, lng: number, size: number, r: number): string[] {
  const y = Math.floor(lat / size);
  const x = Math.floor(lng / size);
  const out: string[] = [];
  for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) out.push(`${y + dy}_${x + dx}`);
  return out;
}

async function loadNearby(lat: number, lng: number): Promise<Shop[]> {
  const index: Index = await fetch('/pharmacy/index.json').then((r) => (r.ok ? r.json() : Promise.reject(r.status)));
  const have = new Set(index.tiles);
  const load = (keys: string[]) =>
    Promise.all(keys.filter((k) => have.has(k)).map((k) => fetch(`/pharmacy/t/${k}.json`).then((r) => (r.ok ? (r.json() as Promise<Shop[]>) : []))));
  let shops = (await load(tilesAround(lat, lng, index.tile, 1))).flat();
  // 郊外で近くに少ないときは範囲を広げる（約 25km 四方）
  if (shops.length < 3) shops = (await load(tilesAround(lat, lng, index.tile, 2))).flat();
  return shops;
}

function pin(n: number, kind: Kind, active: boolean) {
  return L.divIcon({ className: '', iconSize: [32, 32], iconAnchor: [16, 16], html: `<div class="pf-pin pf-pin--${kind}${active ? ' is-active' : ''}">${n}</div>` });
}
const youIcon = L.divIcon({ className: '', iconSize: [18, 18], iconAnchor: [9, 9], html: '<div class="pf-you"></div>' });

function FitView({ center, shops, focus }: { center: [number, number]; shops: WithDistance[]; focus: WithDistance | null }) {
  const map = useMap();
  useEffect(() => {
    const pts = [center, ...shops.slice(0, 4).map((s) => [s.lat, s.lng] as [number, number])];
    map.fitBounds(L.latLngBounds(pts), { padding: [32, 32], maxZoom: 17, animate: false });
  }, [map, center, shops]);
  useEffect(() => {
    if (focus) map.flyTo([focus.lat, focus.lng], Math.max(map.getZoom(), 17), { duration: 0.5 });
  }, [map, focus]);
  return null;
}

export default function PharmacyFinder({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [status, setStatus] = useState<'idle' | 'locating' | 'denied' | 'error' | 'ready'>('idle');
  const [here, setHere] = useState<[number, number] | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [drugOnly, setDrugOnly] = useState(false);
  const [focus, setFocus] = useState<WithDistance | null>(null);

  const locate = () => {
    if (!navigator.geolocation) return setStatus('denied');
    setStatus('locating');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const p: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        try {
          setShops(await loadNearby(p[0], p[1]));
          setHere(p);
          setFocus(null);
          setStatus('ready');
          window.gtag?.('event', 'pharmacy_locate');
        } catch {
          setStatus('error');
        }
      },
      () => setStatus('denied'),
      { enableHighAccuracy: true, timeout: 15_000, maximumAge: 60_000 },
    );
  };

  const nearest = useMemo<WithDistance[]>(() => {
    if (!here) return [];
    return shops
      .filter((s) => !drugOnly || s.k === 'd')
      .map((s) => ({ ...s, distance: haversine(here[0], here[1], s.lat, s.lng) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, LIST_SIZE);
  }, [here, shops, drugOnly]);

  const nameOf = (s: Shop) => (lang !== 'ja' && s.e) || s.n || t.kinds[s.k];

  return (
    <div className="pf">
      <button type="button" className="pf-locate" onClick={locate} disabled={status === 'locating'}>
        {status === 'locating' ? t.locating : status === 'ready' ? `↻ ${t.locate}` : `📍 ${t.locate}`}
      </button>
      {status === 'denied' && <p className="pf-msg">{t.denied}</p>}
      {status === 'error' && <p className="pf-msg">{t.loadError}</p>}

      {status === 'ready' && here && (
        <>
          <label className="pf-filter">
            <input type="checkbox" checked={drugOnly} onChange={(e) => setDrugOnly(e.target.checked)} /> {t.drugOnly}
          </label>
          <div className="pf-map">
            <MapContainer center={here} zoom={16} style={{ height: '100%', width: '100%' }} attributionControl>
              <Basemap ja={lang === 'ja'} credit={CREDIT} />
              <FitView center={here} shops={nearest} focus={focus} />
              <Marker position={here} icon={youIcon} interactive={false} />
              {nearest.map((s, i) => (
                <Marker key={`${s.lat},${s.lng}`} position={[s.lat, s.lng]} icon={pin(i + 1, s.k, focus === s)} eventHandlers={{ click: () => setFocus(s) }} />
              ))}
            </MapContainer>
          </div>

          <h2 className="pf-h">{t.nearest}</h2>
          {nearest.length === 0 && <p className="pf-msg">{t.none}</p>}
          <ol className="pf-list">
            {nearest.map((s, i) => (
              <li key={`${s.lat},${s.lng}`} className={`pf-item${focus === s ? ' is-active' : ''}`}>
                <button type="button" className="pf-item-main" onClick={() => setFocus(s)}>
                  <span className={`pf-num pf-num--${s.k}`}>{i + 1}</span>
                  <span className="pf-body">
                    <strong>{nameOf(s)}</strong>
                    {lang !== 'ja' && s.e && s.n && <span className="pf-ja" lang="ja">{s.n}</span>}
                    <span className="pf-meta">{t.kinds[s.k]} · {formatDistance(s.distance)} · {t.walk(Math.max(1, Math.round(s.distance / 80)))}</span>
                    {s.h && <span className="pf-meta">{t.hours}: {s.h}</span>}
                  </span>
                </button>
                <a className="pf-route" href={routeUrl(s, here)} target="_blank" rel="noopener">{t.route}</a>
              </li>
            ))}
          </ol>
          <p className="pf-note">{t.note}</p>
        </>
      )}

      <a className="pf-card" href={`/${lang}/medicine/pharmacist/`} data-ga="pharmacist_from_finder">
        <span className="pf-card-h">🗣️ {t.cardH}</span>
        <span>{t.cardBody}</span>
        <span className="pf-card-cta">{t.cardCta} →</span>
      </a>
    </div>
  );
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}
