import type { Localized } from '../i18n/locales';

// 緊急連絡先。公開前に必ず公式情報で再確認する（README の「公開前チェック」）。
export interface Contact {
  id: string;
  number: string;
  /** tel: リンク用（# は %23 にする）。 */
  tel: string;
  label: Localized;
  note: Localized;
  urgent?: boolean;
}

export const contacts: Contact[] = [
  {
    id: 'ambulance', number: '119', tel: '119', urgent: true,
    label: { en: 'Ambulance / Fire', ja: '救急車・消防', 'zh-tw': '救護車・消防', 'zh-cn': '救护车・消防', ko: '구급차・소방', de: 'Rettungsdienst / Feuerwehr', fr: 'Ambulance / Pompiers', it: 'Ambulanza / Vigili del fuoco', es: 'Ambulancia / Bomberos' },
    note: {
      en: 'Free, 24 hours. Say "Kyukyu desu" (emergency). Interpreters are available in many areas.', 'zh-tw': '免費・24小時。請說「Kyukyu desu」（是急救）。許多地區有口譯服務。', 'zh-cn': '免费・24小时。请说“Kyukyu desu”（是急救）。许多地区有口译服务。', ko: '무료・24시간. "Kyukyu desu"(응급입니다)라고 말하세요. 많은 지역에서 통역을 이용할 수 있습니다.', de: 'Kostenlos, rund um die Uhr. Sagen Sie „Kyukyu desu“ (Notfall). In vielen Regionen gibt es Dolmetscher.', fr: 'Gratuit, 24 h/24. Dites « Kyukyu desu » (urgence). Des interprètes sont disponibles dans de nombreuses régions.', it: 'Gratuito, 24 ore su 24. Dì «Kyukyu desu» (emergenza). In molte zone è disponibile un interprete.', es: 'Gratis, 24 horas. Di «Kyukyu desu» (emergencia). En muchas zonas hay intérpretes.',
      ja: '無料・24時間。「救急です」と伝える。多くの地域で通訳サービスあり。',
    },
  },
  {
    id: '7119', number: '#7119', tel: '%237119',
    label: { en: 'Medical advice line', ja: '救急安心センター', 'zh-tw': '急診諮詢專線', 'zh-cn': '急诊咨询专线', ko: '응급 상담 전화', de: 'Medizinisches Beratungstelefon', fr: 'Ligne de conseil médical', it: 'Linea di consulenza medica', es: 'Línea de consulta médica' },
    note: {
      en: 'Ask whether you should go to hospital or call an ambulance. Only in some regions (e.g. Tokyo, Osaka), mainly in Japanese.', 'zh-tw': '可諮詢是否該去醫院或叫救護車。僅部分地區（如東京、大阪）提供，主要為日語。', 'zh-cn': '可咨询是否该去医院或叫救护车。仅部分地区（如东京、大阪）提供，主要为日语。', ko: '병원에 가야 할지, 구급차를 불러야 할지 상담할 수 있습니다. 일부 지역(도쿄・오사카 등)만, 주로 일본어.', de: 'Fragen Sie, ob Sie ins Krankenhaus gehen oder einen Rettungswagen rufen sollten. Nur in manchen Regionen (z. B. Tokio, Osaka), überwiegend auf Japanisch.', fr: 'Demandez s\'il faut aller à l\'hôpital ou appeler une ambulance. Seulement dans certaines régions (p. ex. Tokyo, Osaka), surtout en japonais.', it: 'Chiedi se devi andare in ospedale o chiamare un\'ambulanza. Solo in alcune regioni (es. Tokyo, Osaka), soprattutto in giapponese.', es: 'Consulta si debes ir al hospital o llamar a una ambulancia. Solo en algunas regiones (p. ej., Tokio, Osaka), sobre todo en japonés.',
      ja: '病院に行くべきか、救急車を呼ぶべきか相談できる。実施は一部の地域のみ（東京・大阪など）。',
    },
  },
  {
    id: 'jnto', number: '050-3816-2787', tel: '05038162787',
    label: { en: 'Japan Visitor Hotline (JNTO)', 'zh-tw': '訪日外國旅客熱線（JNTO）', 'zh-cn': '访日外国游客热线（JNTO）', ko: '방일 외국인 여행자 핫라인(JNTO)', de: 'Hotline für Japan-Reisende (JNTO)', fr: 'Ligne d\'assistance aux visiteurs (JNTO)', it: 'Linea di assistenza per i visitatori (JNTO)', es: 'Línea de atención al visitante (JNTO)', ja: '日本政府観光局 訪日外国人旅行者向けホットライン' },
    note: {
      en: '24 hours, in English, Chinese and Korean. Help with finding a hospital and emergencies.', 'zh-tw': '24小時，提供英語、中文、韓語服務。協助尋找醫院及緊急狀況。', 'zh-cn': '24小时，提供英语、中文、韩语服务。协助寻找医院及紧急情况。', ko: '24시간, 영어・중국어・한국어 대응. 병원 찾기와 긴급 상황을 도와줍니다.', de: 'Rund um die Uhr, auf Englisch, Chinesisch und Koreanisch. Hilfe bei der Suche nach einem Krankenhaus und in Notfällen.', fr: '24 h/24, en anglais, chinois et coréen. Aide pour trouver un hôpital et en cas d\'urgence.', it: '24 ore su 24, in inglese, cinese e coreano. Aiuto per trovare un ospedale e nelle emergenze.', es: '24 horas, en inglés, chino y coreano. Ayuda para encontrar un hospital y en emergencias.',
      ja: '24時間・英中韓対応。病院探しや緊急時の相談。',
    },
  },
  {
    id: 'police', number: '110', tel: '110',
    label: { en: 'Police', ja: '警察', 'zh-tw': '警察', 'zh-cn': '警察', ko: '경찰', de: 'Polizei', fr: 'Police', it: 'Polizia', es: 'Policía' },
    note: { en: 'Free, 24 hours.', 'zh-tw': '免費・24小時。', 'zh-cn': '免费・24小时。', ko: '무료・24시간.', de: 'Kostenlos, rund um die Uhr.', fr: 'Gratuit, 24 h/24.', it: 'Gratuito, 24 ore su 24.', es: 'Gratis, 24 horas.', ja: '無料・24時間。' },
  },
];
