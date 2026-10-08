// 喫煙所ファインダー本体（単一コンポーネント）。
// 現在地 → spots.json との直線距離（Haversine）→ 近い順に地図のピンとカードで表示する。
import { useEffect, useMemo, useState } from 'react';
import { CircleMarker, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Clock, Flag, Footprints, Home, Languages, List, LocateFixed, MapPin, Navigation, RefreshCw, WifiOff } from 'lucide-react';
import { localized, reportUrl, routeUrl, type Spot, type SpotLang, type SpotsFile } from '../../lib/smoking';

// ---------- データ型（scripts/smoking/SCHEMA.md・src/lib/smoking.ts） ----------

type LangCode = SpotLang;

type WithDistance = Spot & { distance: number };

// ---------- 多言語 ----------

const LANGS: { code: LangCode; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'zh-Hant', label: '繁中' },
  { code: 'zh-Hans', label: '简中' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
];

const T = {
  en: {
    title: 'Smoking Area Finder',
    subtitle: 'Public smoking areas near you in Japan',
    locate: 'Find near me',
    locating: 'Getting your location…',
    denied: 'Location is off. Showing results around Tokyo Station instead.',
    unsupported: 'This browser cannot share location. Showing results around Tokyo Station.',
    nearest: 'Nearest smoking areas',
    walk: (n: number) => `${n} min walk`,
    route: 'Directions',
    offline: 'Offline: showing saved data',
    loadError: 'Could not load the spot list.',
    retry: 'Retry',
    unnamed: 'Smoking area',
    types: { outdoor: 'Outdoor', booth: 'Booth', indoor: 'Indoor', unknown: 'Smoking area' },
    customersOnly: 'Customers only',
    tip: 'Smoking on the street is banned in most Tokyo wards (fines apply). Please smoke only at designated areas.',
    updated: 'Data updated',
    noSpots: 'No smoking areas found in the data.',
    home: 'Japan Travel Aid home',
    byArea: 'Browse by area',
    tobacco: { any: 'Cigarettes OK', heated_only: 'Heated tobacco only', unknown: 'Tobacco type unknown' },
    cigOnly: 'Cigarettes OK only',
    noCig: 'No spots nearby are confirmed for cigarettes. Turn off the filter to see all.',
    report: 'Report closed / wrong info',
  },
  'zh-Hant': {
    title: '吸菸區搜尋',
    subtitle: '尋找您附近的日本公共吸菸區',
    locate: '搜尋附近',
    locating: '正在取得位置…',
    denied: '未開啟定位，改為顯示東京車站周邊。',
    unsupported: '此瀏覽器無法取得位置，改為顯示東京車站周邊。',
    nearest: '最近的吸菸區',
    walk: (n: number) => `步行 ${n} 分鐘`,
    route: '路線導航',
    offline: '離線中：顯示已儲存的資料',
    loadError: '無法載入吸菸區資料。',
    retry: '重試',
    unnamed: '吸菸區',
    types: { outdoor: '戶外', booth: '吸菸室', indoor: '室內', unknown: '吸菸區' },
    customersOnly: '限顧客使用',
    tip: '東京多數區禁止路上吸菸（違者罰款）。請在指定吸菸區吸菸。',
    updated: '資料更新',
    noSpots: '資料中沒有吸菸區。',
    home: 'Japan Travel Aid 首頁',
    byArea: '依地區瀏覽',
    tobacco: { any: '可吸紙菸', heated_only: '僅限加熱菸', unknown: '菸品類型不明' },
    cigOnly: '只顯示可吸紙菸',
    noCig: '附近沒有確認可吸紙菸的地點。關閉篩選可顯示全部。',
    report: '回報已關閉／資訊有誤',
  },
  'zh-Hans': {
    title: '吸烟区查找',
    subtitle: '查找您附近的日本公共吸烟区',
    locate: '查找附近',
    locating: '正在获取位置…',
    denied: '未开启定位，改为显示东京站周边。',
    unsupported: '此浏览器无法获取位置，改为显示东京站周边。',
    nearest: '最近的吸烟区',
    walk: (n: number) => `步行 ${n} 分钟`,
    route: '路线导航',
    offline: '离线中：显示已保存的数据',
    loadError: '无法加载吸烟区数据。',
    retry: '重试',
    unnamed: '吸烟区',
    types: { outdoor: '户外', booth: '吸烟室', indoor: '室内', unknown: '吸烟区' },
    customersOnly: '仅限顾客',
    tip: '东京大多数区禁止在路上吸烟（违者罚款）。请在指定吸烟区吸烟。',
    updated: '数据更新',
    noSpots: '数据中没有吸烟区。',
    home: 'Japan Travel Aid 首页',
    byArea: '按地区浏览',
    tobacco: { any: '可吸卷烟', heated_only: '仅限加热烟', unknown: '烟草类型不明' },
    cigOnly: '只显示可吸卷烟',
    noCig: '附近没有确认可吸卷烟的地点。关闭筛选可显示全部。',
    report: '报告已关闭／信息有误',
  },
  ko: {
    title: '흡연구역 찾기',
    subtitle: '내 주변 일본 공공 흡연구역',
    locate: '내 주변 찾기',
    locating: '위치를 확인하는 중…',
    denied: '위치 정보가 꺼져 있어 도쿄역 주변을 표시합니다.',
    unsupported: '이 브라우저는 위치를 확인할 수 없어 도쿄역 주변을 표시합니다.',
    nearest: '가까운 흡연구역',
    walk: (n: number) => `도보 ${n}분`,
    route: '길찾기',
    offline: '오프라인: 저장된 데이터를 표시합니다',
    loadError: '흡연구역 데이터를 불러오지 못했습니다.',
    retry: '다시 시도',
    unnamed: '흡연구역',
    types: { outdoor: '실외', booth: '부스', indoor: '실내', unknown: '흡연구역' },
    customersOnly: '이용객 전용',
    tip: '도쿄 대부분의 구에서는 길거리 흡연이 금지되어 있습니다(과태료). 지정된 흡연구역에서만 흡연해 주세요.',
    updated: '데이터 갱신',
    noSpots: '데이터에 흡연구역이 없습니다.',
    home: 'Japan Travel Aid 홈',
    byArea: '지역별 보기',
    tobacco: { any: '일반 담배 가능', heated_only: '가열식 담배 전용', unknown: '담배 종류 불명' },
    cigOnly: '일반 담배 가능만 보기',
    noCig: '근처에 일반 담배가 확인된 곳이 없습니다. 필터를 끄면 모두 표시됩니다.',
    report: '폐쇄·정보 오류 신고',
  },
  ja: {
    title: '喫煙所ファインダー',
    subtitle: '近くの公衆喫煙所を探す',
    locate: '現在地から探す',
    locating: '現在地を取得中…',
    denied: '位置情報がオフのため、東京駅周辺を表示しています。',
    unsupported: 'このブラウザは位置情報を使えないため、東京駅周辺を表示しています。',
    nearest: '近くの喫煙所',
    walk: (n: number) => `徒歩${n}分`,
    route: 'ルート案内',
    offline: 'オフライン：保存済みのデータを表示中',
    loadError: '喫煙所データを読み込めませんでした。',
    retry: '再読み込み',
    unnamed: '喫煙所',
    types: { outdoor: '屋外', booth: 'ブース', indoor: '屋内', unknown: '喫煙所' },
    customersOnly: '利用者限定',
    tip: '東京の多くの区では路上喫煙が禁止されています（過料あり）。指定の喫煙所をご利用ください。',
    updated: 'データ更新',
    noSpots: 'データに喫煙所がありません。',
    home: 'Japan Travel Aid トップ',
    byArea: '地域から探す',
    tobacco: { any: '紙巻きOK', heated_only: '加熱式のみ', unknown: '紙巻き/加熱式 不明' },
    cigOnly: '紙巻きOKだけ表示',
    noCig: '近くに紙巻きOKと確認できた喫煙所がありません。絞り込みを外すとすべて表示します。',
    report: '閉鎖・間違いを報告',
  },
} satisfies Record<LangCode, unknown>;

// サイトのページ（/en/smoking/・/ja/smoking/）がある言語。それ以外（中国語・韓国語）は /en/ のページの中で切り替える。
type PageLang = 'en' | 'ja';
const PAGE_LANGS: readonly LangCode[] = ['en', 'ja'];

/** 最初に表示する言語。/ja/ のページなら日本語。/en/ のページなら、前回選んだ言語かブラウザの言語（日本語は除く）。 */
function initialLang(pageLang: PageLang): LangCode {
  if (pageLang === 'ja') return 'ja';
  try {
    const saved = localStorage.getItem('lang') as LangCode | null;
    if (saved && saved in T && saved !== 'ja') return saved;
  } catch {}
  const nav = (navigator.language || 'en').toLowerCase();
  if (nav.startsWith('ko')) return 'ko';
  if (nav.startsWith('zh')) return /tw|hk|mo|hant/.test(nav) ? 'zh-Hant' : 'zh-Hans';
  return 'en';
}

/** その言語を表示するページ（日本語は /ja/、それ以外は /en/）。 */
const pageFor = (l: LangCode): PageLang => (l === 'ja' ? 'ja' : 'en');

// ---------- 距離 ----------

const TOKYO_STATION: [number, number] = [35.68123, 139.76712];
const MAX_RESULTS = 20;
const WALK_M_PER_MIN = 80; // 不動産広告の徒歩表示と同じ基準

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6_371_000;
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLng = (lng2 - lng1) * rad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function formatDistance(m: number): string {
  return m < 1000 ? `${Math.round(m / 10) * 10} m` : `${(m / 1000).toFixed(m < 10_000 ? 1 : 0)} km`;
}


// ---------- 地図の部品 ----------

function numberIcon(n: number, active: boolean) {
  return L.divIcon({
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    html: `<div class="flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-white text-sm font-bold text-white shadow-md ${active ? 'bg-amber-500 scale-125' : 'bg-teal-700'}">${n}</div>`,
  });
}

// 現在地と近い数件が収まるようにズームする。カードを押したらそのピンへ移動する。
function MapController({ center, spots, focus }: { center: [number, number]; spots: WithDistance[]; focus: WithDistance | null }) {
  const map = useMap();
  useEffect(() => {
    if (spots.length === 0) return;
    const pts = [center, ...spots.slice(0, 5).map((s) => [s.lat, s.lng] as [number, number])];
    // アニメーション中の呼び出しは無視されるので、データ読込と現在地取得が続いても確実に効くよう animate: false
    map.fitBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 17, animate: false });
  }, [map, center, spots]);
  useEffect(() => {
    if (focus) map.flyTo([focus.lat, focus.lng], Math.max(map.getZoom(), 17), { duration: 0.6 });
  }, [map, focus]);
  return null;
}

// ---------- 本体 ----------

type GeoState = 'idle' | 'locating' | 'ok' | 'denied' | 'unsupported';

interface Props {
  /** このページの言語（/en/smoking/ なら en）。 */
  pageLang: PageLang;
}

export default function SmokingFinder({ pageLang }: Props) {
  const [lang, setLang] = useState<LangCode>(pageLang);
  const [cigOnly, setCigOnly] = useState(false);
  // 地域ページの「地図で見る」（?spot=ID）から来たら、その喫煙所を中心にして選んでおく。
  const [anchor, setAnchor] = useState<[number, number] | null>(null);
  const [data, setData] = useState<SpotsFile | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [geo, setGeo] = useState<GeoState>('idle');
  const [focusId, setFocusId] = useState<string | null>(null);
  const [online, setOnline] = useState(true);
  const t = T[lang];

  useEffect(() => {
    setLang(initialLang(pageLang));
    const spotParam = new URLSearchParams(location.search).get('spot');
    if (spotParam) setFocusId(spotParam);
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    addEventListener('online', on);
    addEventListener('offline', off);
    loadSpots();
    locate();
    return () => {
      removeEventListener('online', on);
      removeEventListener('offline', off);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {}
  }, [lang]);

  function loadSpots() {
    setLoadError(false);
    // オフライン時は Service Worker がキャッシュから返す
    fetch(`/smoking/spots.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: SpotsFile) => {
        setData(d);
        const spotParam = new URLSearchParams(location.search).get('spot');
        const s = spotParam ? d.spots.find((x) => x.id === spotParam) : undefined;
        if (s) setAnchor([s.lat, s.lng]);
      })
      .catch(() => setLoadError(true));
  }

  // 言語の切り替え。日本語と他言語の間はページ（URL）ごと移動する。
  function switchLang(l: LangCode) {
    try {
      localStorage.setItem('lang', l);
    } catch {}
    if (pageFor(l) !== pageLang) {
      location.href = `/${pageFor(l)}/smoking/${location.search}`;
      return;
    }
    setLang(l);
  }

  function locate() {
    if (!('geolocation' in navigator)) {
      setGeo('unsupported');
      return;
    }
    setGeo('locating');
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPosition([p.coords.latitude, p.coords.longitude]);
        setGeo('ok');
      },
      () => setGeo('denied'),
      { enableHighAccuracy: true, timeout: 15_000, maximumAge: 60_000 },
    );
  }

  // 現在地が取れたら現在地、なければ ?spot= の喫煙所、それもなければ東京駅。
  const origin = position ?? anchor ?? TOKYO_STATION;

  const nearest: WithDistance[] = useMemo(() => {
    if (!data) return [];
    return data.spots
      .filter((s) => !cigOnly || s.tobacco === 'any')
      .map((s) => ({ ...s, distance: haversine(origin[0], origin[1], s.lat, s.lng) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, MAX_RESULTS);
  }, [data, origin[0], origin[1], cigOnly]);

  const focus = nearest.find((s) => s.id === focusId) ?? null;

  return (
    <div className="flex h-dvh flex-col bg-white text-slate-900 md:flex-row">
      {/* 地図 */}
      <div className="relative h-[45dvh] shrink-0 md:order-2 md:h-auto md:flex-1">
        <MapContainer center={origin} zoom={15} className="h-full w-full" zoomControl={false}>
          {/* 国土地理院の淡色地図（API キー不要・出典表示で商用利用可）。CARTO は 2026-10 から API キー必須になった */}
          <TileLayer
            url="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
            attribution='<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a> | 喫煙所 &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxNativeZoom={18}
            maxZoom={20}
          />
          <MapController center={origin} spots={nearest} focus={focus} />
          {position && (
            <CircleMarker center={position} radius={8} pathOptions={{ color: '#fff', weight: 3, fillColor: '#2563eb', fillOpacity: 1 }} />
          )}
          {nearest.map((s, i) => (
            <Marker
              key={s.id}
              position={[s.lat, s.lng]}
              icon={numberIcon(i + 1, s.id === focusId)}
              zIndexOffset={s.id === focusId ? 1000 : -i}
              eventHandlers={{ click: () => {
                setFocusId(s.id);
                document.getElementById(`spot-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              } }}
            />
          ))}
        </MapContainer>
        <button
          onClick={locate}
          className="absolute right-3 bottom-3 z-[1000] flex items-center gap-2 rounded-full bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg active:scale-95"
        >
          <LocateFixed className={`h-4 w-4 ${geo === 'locating' ? 'animate-spin' : ''}`} />
          {geo === 'locating' ? t.locating : t.locate}
        </button>
      </div>

      {/* ヘッダーとリスト */}
      <div className="flex min-h-0 flex-1 flex-col md:order-1 md:w-[420px] md:flex-none md:border-r md:border-slate-200">
        <header className="border-b border-slate-200 px-4 pt-3 pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <a
                href={`/${pageLang}/`}
                aria-label={t.home}
                title={t.home}
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-700 active:scale-95"
              >
                <Home className="h-4 w-4" />
              </a>
              <div>
                <h1 className="text-lg leading-tight font-bold">{t.title}</h1>
                <p className="text-xs text-slate-500">{t.subtitle}</p>
              </div>
            </div>
            <Languages className="mt-1 h-5 w-5 shrink-0 text-slate-400" aria-hidden />
          </div>
          <div className="mt-2 flex gap-1 overflow-x-auto" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => switchLang(l.code)}
                aria-pressed={lang === l.code}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${lang === l.code ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={() => setCigOnly((v) => !v)}
              aria-pressed={cigOnly}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${cigOnly ? 'border-teal-700 bg-teal-700 text-white' : 'border-slate-300 text-slate-700'}`}
            >
              🚬 {t.cigOnly}
            </button>
            <a href={`/${pageFor(lang)}/smoking/areas/`} className="ml-auto flex items-center gap-1 text-xs font-semibold text-teal-800 underline">
              <List className="h-3.5 w-3.5" /> {t.byArea}
            </a>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
          {!online && (
            <p className="mt-3 flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-700">
              <WifiOff className="h-4 w-4 shrink-0" /> {t.offline}
            </p>
          )}
          {(geo === 'denied' || geo === 'unsupported') && (
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">{geo === 'denied' ? t.denied : t.unsupported}</p>
          )}
          {loadError && (
            <div className="mt-3 flex items-center justify-between rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
              {t.loadError}
              <button onClick={loadSpots} className="flex items-center gap-1 font-semibold">
                <RefreshCw className="h-4 w-4" /> {t.retry}
              </button>
            </div>
          )}

          <h2 className="mt-4 mb-2 text-sm font-semibold text-slate-500">{t.nearest}</h2>
          {data && nearest.length === 0 && <p className="text-sm text-slate-500">{cigOnly ? t.noCig : t.noSpots}</p>}

          <ol className="space-y-2">
            {nearest.map((s, i) => {
              const name = localized(s.name, lang) ?? t.unnamed;
              const address = localized(s.address, lang);
              const active = s.id === focusId;
              return (
                <li key={s.id} id={`spot-${s.id}`}>
                  <div
                    onClick={() => setFocusId(s.id)}
                    className={`flex cursor-pointer gap-3 rounded-xl border p-3 transition ${active ? 'border-amber-400 bg-amber-50' : 'border-slate-200 hover:bg-slate-50'}`}
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${active ? 'bg-amber-500' : 'bg-teal-700'}`}>
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="leading-snug font-semibold">{name}</p>
                      {address && (
                        <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-slate-500">
                          <MapPin className="h-3 w-3 shrink-0" /> {address}
                        </p>
                      )}
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                        <span className="font-semibold text-slate-900">{formatDistance(s.distance)}</span>
                        <span className="flex items-center gap-1">
                          <Footprints className="h-3 w-3" /> {t.walk(Math.max(1, Math.round(s.distance / WALK_M_PER_MIN)))}
                        </span>
                        <span className="rounded bg-slate-100 px-1.5 py-0.5">{t.types[s.type]}</span>
                        <span className={`rounded px-1.5 py-0.5 ${s.tobacco === 'any' ? 'bg-teal-100 text-teal-900' : s.tobacco === 'heated_only' ? 'bg-violet-100 text-violet-900' : 'bg-slate-100 text-slate-500'}`}>
                          {t.tobacco[s.tobacco]}
                        </span>
                        {s.access === 'customers' && <span className="rounded bg-amber-200 px-1.5 py-0.5 font-semibold text-amber-950">{t.customersOnly}</span>}
                        {s.hours && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {s.hours}
                          </span>
                        )}
                      </div>
                      {reportUrl(s.id) && (
                        <a
                          href={reportUrl(s.id)!}
                          target="_blank"
                          rel="noopener"
                          onClick={(e) => e.stopPropagation()}
                          data-ga="smoking_report"
                          className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-slate-500 underline"
                        >
                          <Flag className="h-3 w-3" /> {t.report}
                        </a>
                      )}
                    </div>
                    <a
                      href={routeUrl(s, position)}
                      target="_blank"
                      rel="noopener"
                      onClick={(e) => e.stopPropagation()}
                      className="flex shrink-0 flex-col items-center justify-center gap-0.5 self-center rounded-lg bg-blue-600 px-2.5 py-2 text-[11px] font-semibold text-white active:scale-95"
                    >
                      <Navigation className="h-4 w-4" />
                      {t.route}
                    </a>
                  </div>
                </li>
              );
            })}
          </ol>

          <p className="mt-5 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600">{t.tip}</p>
          {data && (
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              {t.updated}: {data.generated_at.slice(0, 10)} ·{' '}
              {data.sources.map((src, i) => (
                <span key={src.id}>
                  {i > 0 && ' · '}
                  <a href={src.url} target="_blank" rel="noopener" className="underline">
                    {src.name}
                  </a>{' '}
                  ({src.license})
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
