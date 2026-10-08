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
    label: { en: 'Ambulance / Fire', ja: '救急車・消防', 'zh-tw': '救護車・消防', 'zh-cn': '救护车・消防', ko: '구급차・소방' },
    note: {
      en: 'Free, 24 hours. Say "Kyukyu desu" (emergency). Interpreters are available in many areas.',
      ja: '無料・24時間。「救急です」と伝える。多くの地域で通訳サービスあり。',
    },
  },
  {
    id: '7119', number: '#7119', tel: '%237119',
    label: { en: 'Medical advice line', ja: '救急安心センター', 'zh-tw': '急診諮詢專線', 'zh-cn': '急诊咨询专线', ko: '응급 상담 전화' },
    note: {
      en: 'Ask whether you should go to hospital or call an ambulance. Only in some regions (e.g. Tokyo, Osaka), mainly in Japanese.',
      ja: '病院に行くべきか、救急車を呼ぶべきか相談できる。実施は一部の地域のみ（東京・大阪など）。',
    },
  },
  {
    id: 'jnto', number: '050-3816-2787', tel: '05038162787',
    label: { en: 'Japan Visitor Hotline (JNTO)', ja: '日本政府観光局 訪日外国人旅行者向けホットライン' },
    note: {
      en: '24 hours, in English, Chinese and Korean. Help with finding a hospital and emergencies.',
      ja: '24時間・英中韓対応。病院探しや緊急時の相談。',
    },
  },
  {
    id: 'police', number: '110', tel: '110',
    label: { en: 'Police', ja: '警察', 'zh-tw': '警察', 'zh-cn': '警察', ko: '경찰' },
    note: { en: 'Free, 24 hours.', ja: '無料・24時間。' },
  },
];
