// 喫煙所ファインダー本体（単一コンポーネント）。
// 現在地 → spots.json との直線距離（Haversine）→ 近い順に地図のピンとカードで表示する。
import { useEffect, useMemo, useState } from 'react';
import { CircleMarker, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Clock, Flag, Gem, Home, Medal, Plus, Languages, List, LocateFixed, MapPin, Navigation, RefreshCw, WifiOff } from 'lucide-react';
import { locales, type Lang } from '../../i18n/locales';
import { contributionCounts, localized, rankFor, reportUrl, routeUrl, spotLang, submitUrl, type RankId, type Spot, type SpotLang, type SpotsFile } from '../../lib/smoking';

// ---------- データ型（scripts/smoking/SCHEMA.md・src/lib/smoking.ts） ----------

type WithDistance = Spot & { distance: number };

// ---------- 多言語 ----------

const T = {
  en: {
    findTitle: "Found a smoking area that's not on the map?",
    findBody: 'Tell us and it goes up with your nickname. The more you add, the higher your badge.',
    findCta: 'Tell us',
    addSpot: 'Add a spot',
    addedBy: (n: string) => `Added by ${n}`,
    ranks: { bronze: 'Bronze', silver: 'Silver', gold: 'Gold', platinum: 'Platinum', diamond: 'Diamond' },
    about: ['Public smoking areas, plus smoking rooms in stations and shopping centers', 'Restaurants and bars are not included', 'Shows “Cigarettes OK” or “Heated tobacco only” where known'],
    start: 'Find smoking areas near me',
    title: 'Smoking Area Finder',
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
  'zh-tw': {
    findTitle: '發現地圖上沒有的吸菸區嗎？',
    findBody: '告訴我們，會附上您的暱稱刊登。投稿越多，等級越高。',
    findCta: '告訴我們',
    addSpot: '新增吸菸區',
    addedBy: (n: string) => `由 ${n} 新增`,
    ranks: { bronze: '銅牌', silver: '銀牌', gold: '金牌', platinum: '白金', diamond: '鑽石' },
    about: ['公共吸菸區，以及車站、商業設施內的吸菸室', '不包含餐廳、酒吧', '已知的地點會標示「可吸紙菸」或「僅限加熱菸」'],
    start: '搜尋附近的吸菸區',
    title: '吸菸區搜尋',
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
  'zh-cn': {
    findTitle: '发现地图上没有的吸烟区吗？',
    findBody: '告诉我们，会附上您的昵称发布。投稿越多，等级越高。',
    findCta: '告诉我们',
    addSpot: '添加吸烟区',
    addedBy: (n: string) => `由 ${n} 添加`,
    ranks: { bronze: '铜牌', silver: '银牌', gold: '金牌', platinum: '白金', diamond: '钻石' },
    about: ['公共吸烟区，以及车站、商业设施内的吸烟室', '不包含餐厅、酒吧', '已知的地点会标注“可吸卷烟”或“仅限加热烟”'],
    start: '查找附近的吸烟区',
    title: '吸烟区查找',
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
    findTitle: '지도에 없는 흡연구역을 찾으셨나요?',
    findBody: '알려 주시면 닉네임과 함께 올려 드려요. 많이 올릴수록 등급이 올라가요.',
    findCta: '알려 주기',
    addSpot: '흡연구역 추가',
    addedBy: (n: string) => `${n} 님이 추가`,
    ranks: { bronze: '브론즈', silver: '실버', gold: '골드', platinum: '플래티넘', diamond: '다이아' },
    about: ['공공 흡연구역과 역·상업시설 안의 흡연실', '음식점·바는 포함하지 않습니다', '알 수 있는 곳은 「일반 담배 가능」「가열식 담배 전용」을 표시합니다'],
    start: '내 주변 흡연구역 찾기',
    title: '흡연구역 찾기',
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
    findTitle: '地図にない喫煙所を見つけたら教えてね',
    findBody: 'ニックネーム付きで地図に載ります。投稿が増えるとランクが上がります。',
    findCta: '教える',
    addSpot: '喫煙所を追加',
    addedBy: (n: string) => `${n} さんが追加`,
    ranks: { bronze: 'ブロンズ', silver: 'シルバー', gold: 'ゴールド', platinum: 'プラチナ', diamond: 'ダイヤ' },
    about: ['公衆喫煙所と、駅・商業施設の喫煙所', '飲食店は載せていません', '紙巻きOK・加熱式のみが分かる場所は表示します'],
    start: '近くの喫煙所を探す',
    title: '喫煙所ファインダー',
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
  de: {
    findTitle: 'Raucherbereich gefunden, der nicht auf der Karte ist?',
    findBody: 'Sag uns Bescheid – er erscheint mit deinem Spitznamen. Je mehr du einträgst, desto höher dein Rang.',
    findCta: 'Melden',
    addSpot: 'Ort hinzufügen',
    addedBy: (n: string) => `Hinzugefügt von ${n}`,
    ranks: { bronze: 'Bronze', silver: 'Silber', gold: 'Gold', platinum: 'Platin', diamond: 'Diamant' },
    about: ['Öffentliche Raucherbereiche sowie Raucherräume in Bahnhöfen und Einkaufszentren', 'Restaurants und Bars sind nicht enthalten', 'Zeigt „Zigaretten erlaubt“ oder „Nur Tabakerhitzer“, wo bekannt'],
    start: 'Raucherbereiche in der Nähe finden',
    title: 'Raucherbereich-Finder',
    locate: 'In der Nähe suchen',
    locating: 'Standort wird ermittelt…',
    denied: 'Standort ist deaktiviert. Stattdessen wird die Umgebung des Bahnhofs Tokio angezeigt.',
    unsupported: 'Dieser Browser kann keinen Standort teilen. Es wird die Umgebung des Bahnhofs Tokio angezeigt.',
    nearest: 'Nächste Raucherbereiche',
    walk: (n: number) => `${n} Min. zu Fuß`,
    route: 'Route',
    offline: 'Offline: gespeicherte Daten werden angezeigt',
    loadError: 'Die Liste konnte nicht geladen werden.',
    retry: 'Erneut versuchen',
    unnamed: 'Raucherbereich',
    types: { outdoor: 'Im Freien', booth: 'Raucherkabine', indoor: 'Innen', unknown: 'Raucherbereich' },
    customersOnly: 'Nur für Kunden',
    tip: 'In den meisten Bezirken Tokios ist Rauchen auf der Straße verboten (Bußgeld). Bitte nur in ausgewiesenen Bereichen rauchen.',
    updated: 'Daten aktualisiert',
    noSpots: 'Keine Raucherbereiche in den Daten gefunden.',
    home: 'Japan Travel Aid Startseite',
    byArea: 'Nach Gebiet suchen',
    tobacco: { any: 'Zigaretten erlaubt', heated_only: 'Nur Tabakerhitzer', unknown: 'Tabakart unbekannt' },
    cigOnly: 'Nur „Zigaretten erlaubt“',
    noCig: 'In der Nähe ist kein Ort für Zigaretten bestätigt. Filter ausschalten, um alle zu sehen.',
    report: 'Geschlossen / falsche Angaben melden',
  },
  fr: {
    findTitle: "Vous avez trouvé un espace fumeurs absent de la carte ?",
    findBody: "Signalez-le et il sera ajouté avec votre pseudo. Plus vous en ajoutez, plus votre badge monte.",
    findCta: 'Signaler',
    addSpot: 'Ajouter un lieu',
    addedBy: (n: string) => `Ajouté par ${n}`,
    ranks: { bronze: 'Bronze', silver: 'Argent', gold: 'Or', platinum: 'Platine', diamond: 'Diamant' },
    about: ['Espaces fumeurs publics et fumoirs des gares et centres commerciaux', 'Restaurants et bars non inclus', "Indique « Cigarettes OK » ou « Tabac chauffé uniquement » lorsque l'info est connue"],
    start: 'Trouver un espace fumeurs proche',
    title: 'Espaces fumeurs',
    locate: 'Autour de moi',
    locating: 'Localisation en cours…',
    denied: 'Localisation désactivée. Affichage autour de la gare de Tokyo.',
    unsupported: 'Ce navigateur ne peut pas partager la position. Affichage autour de la gare de Tokyo.',
    nearest: 'Espaces fumeurs les plus proches',
    walk: (n: number) => `${n} min à pied`,
    route: 'Itinéraire',
    offline: 'Hors ligne : données enregistrées affichées',
    loadError: 'Impossible de charger la liste.',
    retry: 'Réessayer',
    unnamed: 'Espace fumeurs',
    types: { outdoor: 'Extérieur', booth: 'Cabine', indoor: 'Intérieur', unknown: 'Espace fumeurs' },
    customersOnly: 'Réservé aux clients',
    tip: "Fumer dans la rue est interdit dans la plupart des arrondissements de Tokyo (amende). Merci de fumer uniquement dans les espaces prévus.",
    updated: 'Données mises à jour',
    noSpots: 'Aucun espace fumeurs dans les données.',
    home: 'Accueil Japan Travel Aid',
    byArea: 'Parcourir par quartier',
    tobacco: { any: 'Cigarettes OK', heated_only: 'Tabac chauffé uniquement', unknown: 'Type de tabac inconnu' },
    cigOnly: 'Seulement « Cigarettes OK »',
    noCig: "Aucun lieu proche n'est confirmé pour les cigarettes. Désactivez le filtre pour tout voir.",
    report: 'Signaler fermé / info erronée',
  },
  it: {
    findTitle: "Hai trovato un'area fumatori che non è sulla mappa?",
    findBody: 'Segnalacela e la pubblichiamo con il tuo nickname. Più ne aggiungi, più sale il tuo livello.',
    findCta: 'Segnala',
    addSpot: 'Aggiungi un luogo',
    addedBy: (n: string) => `Aggiunto da ${n}`,
    ranks: { bronze: 'Bronzo', silver: 'Argento', gold: 'Oro', platinum: 'Platino', diamond: 'Diamante' },
    about: ['Aree fumatori pubbliche e sale fumatori in stazioni e centri commerciali', 'Ristoranti e bar non sono inclusi', 'Indica «Sigarette OK» o «Solo tabacco riscaldato» quando è noto'],
    start: 'Trova aree fumatori vicine',
    title: 'Cerca aree fumatori',
    locate: 'Vicino a me',
    locating: 'Rilevamento posizione…',
    denied: 'Posizione disattivata. Mostro i risultati intorno alla stazione di Tokyo.',
    unsupported: 'Questo browser non può condividere la posizione. Mostro i risultati intorno alla stazione di Tokyo.',
    nearest: 'Aree fumatori più vicine',
    walk: (n: number) => `${n} min a piedi`,
    route: 'Indicazioni',
    offline: 'Offline: dati salvati',
    loadError: "Impossibile caricare l'elenco.",
    retry: 'Riprova',
    unnamed: 'Area fumatori',
    types: { outdoor: "All'aperto", booth: 'Cabina', indoor: 'Al chiuso', unknown: 'Area fumatori' },
    customersOnly: 'Solo clienti',
    tip: 'Nella maggior parte dei quartieri di Tokyo è vietato fumare per strada (con multa). Fuma solo nelle aree designate.',
    updated: 'Dati aggiornati',
    noSpots: 'Nessuna area fumatori nei dati.',
    home: 'Home di Japan Travel Aid',
    byArea: 'Cerca per zona',
    tobacco: { any: 'Sigarette OK', heated_only: 'Solo tabacco riscaldato', unknown: 'Tipo di tabacco sconosciuto' },
    cigOnly: 'Solo «Sigarette OK»',
    noCig: 'Nessun luogo vicino è confermato per le sigarette. Disattiva il filtro per vederli tutti.',
    report: 'Segnala chiuso / info errate',
  },
  es: {
    findTitle: '¿Encontraste una zona de fumadores que no está en el mapa?',
    findBody: 'Avísanos y la publicamos con tu apodo. Cuantas más añadas, más sube tu insignia.',
    findCta: 'Avisar',
    addSpot: 'Añadir un lugar',
    addedBy: (n: string) => `Añadido por ${n}`,
    ranks: { bronze: 'Bronce', silver: 'Plata', gold: 'Oro', platinum: 'Platino', diamond: 'Diamante' },
    about: ['Zonas públicas para fumar y salas de fumadores en estaciones y centros comerciales', 'No incluye restaurantes ni bares', 'Indica «Cigarrillos OK» o «Solo tabaco calentado» cuando se sabe'],
    start: 'Buscar zonas para fumar cerca',
    title: 'Buscador de zonas para fumar',
    locate: 'Cerca de mí',
    locating: 'Obteniendo tu ubicación…',
    denied: 'La ubicación está desactivada. Mostrando los alrededores de la estación de Tokio.',
    unsupported: 'Este navegador no puede compartir la ubicación. Mostrando los alrededores de la estación de Tokio.',
    nearest: 'Zonas para fumar más cercanas',
    walk: (n: number) => `${n} min a pie`,
    route: 'Cómo llegar',
    offline: 'Sin conexión: mostrando datos guardados',
    loadError: 'No se pudo cargar la lista.',
    retry: 'Reintentar',
    unnamed: 'Zona para fumar',
    types: { outdoor: 'Exterior', booth: 'Cabina', indoor: 'Interior', unknown: 'Zona para fumar' },
    customersOnly: 'Solo clientes',
    tip: 'En la mayoría de los distritos de Tokio está prohibido fumar en la calle (con multa). Fuma solo en las zonas designadas.',
    updated: 'Datos actualizados',
    noSpots: 'No hay zonas para fumar en los datos.',
    home: 'Inicio de Japan Travel Aid',
    byArea: 'Buscar por zona',
    tobacco: { any: 'Cigarrillos OK', heated_only: 'Solo tabaco calentado', unknown: 'Tipo de tabaco desconocido' },
    cigOnly: 'Solo «Cigarrillos OK»',
    noCig: 'No hay lugares cercanos confirmados para cigarrillos. Desactiva el filtro para ver todos.',
    report: 'Avisar de cierre / datos erróneos',
  },
} satisfies Record<Lang, unknown>;

// 画面の言語はページの言語（URL の /en/・/ja/ など、src/i18n/locales.ts の9言語）。
type PageLang = Lang;

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

// 投稿者のランクのマーク（ブロンズ〜ダイヤ）
const RANK_STYLE: Record<RankId, string> = {
  bronze: 'bg-orange-100 text-orange-800',
  silver: 'bg-slate-200 text-slate-700',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-cyan-100 text-cyan-800',
  diamond: 'bg-violet-100 text-violet-800',
};

function RankBadge({ rank, label }: { rank: RankId; label: string }) {
  const Icon = rank === 'diamond' ? Gem : Medal;
  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${RANK_STYLE[rank]}`}>
      <Icon className="h-3 w-3" /> {label}
    </span>
  );
}

// 「地図にない喫煙所を見つけたら教えてね」の案内（開始画面と検索結果の下）
function AddPrompt({ t, onClick, href }: { t: (typeof T)[Lang]; onClick?: () => void; href?: string }) {
  const cls = 'flex shrink-0 items-center gap-1 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-bold text-white active:scale-95';
  return (
    <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-left">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-amber-950">{t.findTitle}</p>
        <p className="mt-0.5 text-xs text-amber-900">{t.findBody}</p>
      </div>
      {href ? (
        <a href={href} target="_blank" rel="noopener" data-ga="smoking_add" className={cls}>
          <Plus className="h-3.5 w-3.5" /> {t.findCta}
        </a>
      ) : (
        <button onClick={onClick} data-ga="smoking_add" className={cls}>
          <Plus className="h-3.5 w-3.5" /> {t.findCta}
        </button>
      )}
    </div>
  );
}

// 背景地図: OpenFreeMap（無料・API キー不要・商用可）のベクター地図。地名をその画面の言語で出せる
// （日本語画面は日本語、ほかは英語のローマ字表記）。CARTO は 2026-10 から API キー必須になった。
// 地図の部品は重いので、開始画面のあとで読み込む。WebGL が使えない端末は国土地理院の淡色地図（日本語のみ）にする。
const OSM_CREDIT = '喫煙所 &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const GSI_PALE = 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png';

/** 地名ラベルの式。name を使うラベルだけ差し替える（道路番号などはそのまま）。 */
function labelExpr(lang: SpotLang): import('maplibre-gl').ExpressionSpecification {
  return lang === 'ja'
    ? ['coalesce', ['get', 'name:ja'], ['get', 'name']]
    : ['coalesce', ['get', 'name:en'], ['get', 'name_en'], ['get', 'name:latin'], ['get', 'name']];
}

function Basemap({ lang }: { lang: SpotLang }) {
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
        attribution: `<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a> | ${OSM_CREDIT}`,
      }).addTo(map);
    };
    Promise.all([import('maplibre-gl'), import('@maplibre/maplibre-gl-leaflet'), import('maplibre-gl/dist/maplibre-gl.css')])
      .then(([, plugin]) => {
        if (cancelled) return;
        try {
          const vector = plugin.maplibreGL({ style: 'https://tiles.openfreemap.org/styles/liberty' });
          // プラグインは出典を Leaflet に渡さないので、レイヤーの出典として自分で付ける
          vector.getAttribution = () => `<a href="https://openfreemap.org">OpenFreeMap</a> &copy; <a href="https://www.openmaptiles.org/">OpenMapTiles</a> | ${OSM_CREDIT}`;
          vector.addTo(map);
          layer = vector;
          const glMap = vector.getMaplibreMap();
          // スタイルが読めない（OpenFreeMap の障害など）ときは国土地理院の地図に切り替える
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
  }, [map]);

  useEffect(() => {
    if (!gl) return;
    const apply = () => {
      for (const l of gl.getStyle()?.layers ?? []) {
        const field = l.type === 'symbol' ? l.layout?.['text-field'] : undefined;
        if (field && JSON.stringify(field).includes('name')) gl.setLayoutProperty(l.id, 'text-field', labelExpr(lang));
      }
    };
    if (gl.isStyleLoaded()) apply();
    else gl.once('load', apply);
  }, [gl, lang]);

  return null;
}

// ---------- 本体 ----------

type GeoState = 'idle' | 'locating' | 'ok' | 'denied' | 'unsupported';

interface Props {
  /** このページの言語（/en/smoking/ なら en）。 */
  pageLang: PageLang;
}

export default function SmokingFinder({ pageLang }: Props) {
  // 喫煙所の名前・住所と地図の地名に使う言語（データにない言語は英語）。
  const lang: SpotLang = spotLang(pageLang);
  const [cigOnly, setCigOnly] = useState(false);
  // 地域ページの「地図で見る」（?spot=ID）から来たら、その喫煙所を中心にして選んでおく。
  const [anchor, setAnchor] = useState<[number, number] | null>(null);
  const [data, setData] = useState<SpotsFile | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [geo, setGeo] = useState<GeoState>('idle');
  const [focusId, setFocusId] = useState<string | null>(null);
  // 最初はトップ（名前・説明・言語・探すボタン）だけ。ボタンを押すか ?spot= で来たら地図を出す。
  const [started, setStarted] = useState(false);
  const [online, setOnline] = useState(true);
  const t = T[pageLang];

  useEffect(() => {
    const spotParam = new URLSearchParams(location.search).get('spot');
    if (spotParam) setFocusId(spotParam);
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    addEventListener('online', on);
    addEventListener('offline', off);
    loadSpots();
    if (spotParam) setStarted(true);
    return () => {
      removeEventListener('online', on);
      removeEventListener('offline', off);
    };
  }, []);

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

  // 言語の切り替え。その言語のページ（URL）へ移動する。
  function switchLang(l: Lang) {
    if (l !== pageLang) location.href = `/${l}/smoking/${location.search}`;
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

  const counts = useMemo(() => contributionCounts(data?.spots ?? []), [data]);
  const addUrl = submitUrl(position);

  const focus = nearest.find((s) => s.id === focusId) ?? null;

  const langSelect = (
    <label className="flex shrink-0 items-center gap-1 rounded-full bg-slate-100 py-1 pr-1 pl-2 text-xs text-slate-700">
      <Languages className="h-3.5 w-3.5" aria-hidden />
      <select
        value={pageLang}
        onChange={(e) => switchLang(e.target.value as Lang)}
        aria-label="Language"
        className="bg-transparent font-medium outline-none"
      >
        {locales.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );

  // 開始画面の「教える」: 現在地を取ってからフォームを開く（非同期のあとの新しいタブはブロックされやすいので同じタブで）
  function addFromStart() {
    const go = (pos: [number, number] | null) => {
      const url = submitUrl(pos);
      if (url) location.href = url;
    };
    if (!('geolocation' in navigator)) return go(null);
    navigator.geolocation.getCurrentPosition(
      (p) => go([p.coords.latitude, p.coords.longitude]),
      () => go(null),
      { enableHighAccuracy: true, timeout: 15_000, maximumAge: 60_000 },
    );
  }

  function start() {
    setStarted(true);
    locate();
  }

  if (!started) {
    return (
      <div className="flex min-h-dvh flex-col bg-white px-5 pt-4 pb-8 text-slate-900">
        <div className="flex items-center justify-between">
          <a href={`/${pageLang}/`} aria-label={t.home} title={t.home} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-700">
            <Home className="h-4 w-4" />
          </a>
          {langSelect}
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-5xl" aria-hidden>🚬</p>
          <h1 className="mt-3 text-3xl leading-tight font-bold">{t.title}</h1>
          <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
            {t.about.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-teal-700">✓</span>
                {line}
              </li>
            ))}
          </ul>
          <button
            onClick={start}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-700 py-4 text-lg font-bold text-white shadow-lg active:scale-[0.98]"
          >
            <LocateFixed className="h-5 w-5" /> {t.start}
          </button>
          <a href={`/${pageLang}/smoking/areas/`} className="mt-4 text-center text-sm font-semibold text-teal-800 underline">
            {t.byArea}
          </a>
          {addUrl && (
            <div className="mt-8">
              <AddPrompt t={t} onClick={addFromStart} />
            </div>
          )}
        </div>
        <p className="text-center text-[11px] text-slate-400">© OpenStreetMap contributors</p>
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col bg-white text-slate-900 md:flex-row">
      {/* 地図 */}
      <div className="relative h-[45dvh] shrink-0 md:order-2 md:h-auto md:flex-1">
        <MapContainer center={origin} zoom={15} className="h-full w-full" zoomControl={false}>
          <Basemap lang={lang} />
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
        {/* 見出しは1行（ホーム・タイトル・言語）＋絞り込み1つだけ。地域一覧への入口はリストの下 */}
        <header className="border-b border-slate-200 px-4 py-2">
          <div className="flex items-center gap-2">
            <a
              href={`/${pageLang}/`}
              aria-label={t.home}
              title={t.home}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-700 active:scale-95"
            >
              <Home className="h-4 w-4" />
            </a>
            <h1 className="min-w-0 flex-1 truncate text-base font-bold">{t.title}</h1>
            {langSelect}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={() => setCigOnly((v) => !v)}
              aria-pressed={cigOnly}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${cigOnly ? 'border-teal-700 bg-teal-700 text-white' : 'border-slate-300 text-slate-700'}`}
            >
              🚬 {t.cigOnly}
            </button>
            {/* 地図にない喫煙所の投稿（承認してから掲載）。現在地の緯度経度を入れてフォームを開く */}
            {addUrl && (
              <a
                href={addUrl}
                target="_blank"
                rel="noopener"
                data-ga="smoking_add"
                className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white active:scale-95"
              >
                <Plus className="h-3.5 w-3.5" /> {t.addSpot}
              </a>
            )}
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

          <h2 className="sr-only">{t.nearest}</h2>
          {data && nearest.length === 0 && <p className="mt-3 text-sm text-slate-500">{cigOnly ? t.noCig : t.noSpots}</p>}

          <ol className="mt-3 space-y-2">
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
                      {/* 距離と徒歩は1行。種類・紙巻き/加熱式は分かっているときだけ出す（「不明」は出さない） */}
                      <p className="mt-1 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">{formatDistance(s.distance)}</span>
                        {' · '}
                        {t.walk(Math.max(1, Math.round(s.distance / WALK_M_PER_MIN)))}
                      </p>
                      {(s.type !== 'unknown' || s.tobacco !== 'unknown' || s.access === 'customers' || s.hours) && (
                        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
                          {s.type !== 'unknown' && <span className="rounded bg-slate-100 px-1.5 py-0.5">{t.types[s.type]}</span>}
                          {s.tobacco !== 'unknown' && (
                            <span className={`rounded px-1.5 py-0.5 ${s.tobacco === 'any' ? 'bg-teal-100 text-teal-900' : 'bg-violet-100 text-violet-900'}`}>
                              {t.tobacco[s.tobacco]}
                            </span>
                          )}
                          {s.access === 'customers' && <span className="rounded bg-amber-200 px-1.5 py-0.5 font-semibold text-amber-950">{t.customersOnly}</span>}
                          {s.hours && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {s.hours}
                            </span>
                          )}
                        </div>
                      )}
                      {s.added_by && (() => {
                        const rank = rankFor(counts.get(s.added_by) ?? 0);
                        return (
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                            {t.addedBy(s.added_by)} {rank && <RankBadge rank={rank} label={t.ranks[rank]} />}
                          </p>
                        );
                      })()}
                      {/* 報告リンクは全カードに小さく出す（選んだときだけだと見つけられなかった） */}
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

          {addUrl && data && (
            <div className="mt-4">
              <AddPrompt t={t} href={addUrl} />
            </div>
          )}
          <a href={`/${pageLang}/smoking/areas/`} className="mt-5 flex items-center gap-1 text-sm font-semibold text-teal-800 underline">
            <List className="h-4 w-4" /> {t.byArea}
          </a>
          <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600">{t.tip}</p>
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
