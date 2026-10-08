import type { Localized } from './locales';

// 画面の決まり文句。ja は「店員に見せる」ときにだけ使う。
export const ui = {
  siteTagline: {
    en: 'Simple, offline-ready tools for getting around Japan. Tap an icon to start.',
    ja: '訪日旅行者向けの、オフラインでも使えるお助けツール集です。',
  },
  tagline: {
    en: 'Point, show, and get help at Japanese drugstores and hospitals.',
    ja: '日本のドラッグストアや病院で、指差しで伝えるためのツールです。',
  },
  emergencyAmbulance: { en: 'Ambulance / Fire', ja: '救急車・消防' },
  emergencyAdvice: { en: 'Should I go to hospital?', ja: '救急安心センター' },
  disclaimerShort: {
    en: 'Not medical advice. This tool only helps you talk to a pharmacist. Always follow the pharmacist or doctor and the package insert.',
    ja: 'このツールは医療行為・診断・薬の推奨を行うものではありません。購入・服用は必ず薬剤師または医師にご相談ください。',
  },
  back: { en: 'Back', ja: '戻る' },
  home: { en: 'Home', ja: 'ホーム' },
  about: { en: 'About & disclaimer', ja: '運営者情報・免責事項' },
  privacy: { en: 'Privacy policy', ja: 'プライバシーポリシー' },
  consentText: {
    en: 'We use cookies to measure how this site is used.',
    ja: 'サイトの利用状況を把握するために Cookie を使用します。',
  },
  consentTextAds: {
    en: 'We use cookies to measure how this site is used and to show ads.',
    ja: 'サイトの利用状況の把握と広告の表示のために Cookie を使用します。',
  },
  consentAccept: { en: 'Accept', ja: '同意する' },
  consentDecline: { en: 'Decline', ja: '拒否する' },
} satisfies Record<string, Localized>;
