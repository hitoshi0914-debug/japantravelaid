import type { Localized } from './locales';

// 画面の決まり文句。ja は「店員に見せる」ときにだけ使う。
export const ui = {
  siteTagline: {
    en: 'Simple, offline-ready tools for getting around Japan. Tap an icon to start.',
    ja: '訪日旅行者向けの、オフラインでも使えるお助けツール集です。', 'zh-tw': '簡單好用、離線也能開的日本旅遊小工具。點選圖示開始。', 'zh-cn': '简单好用、离线也能打开的日本旅行小工具。点击图标开始。', ko: '오프라인에서도 쓸 수 있는 간단한 일본 여행 도우미입니다. 아이콘을 눌러 시작하세요.'
  },
  tagline: {
    en: 'Point, show, and get help at Japanese drugstores and hospitals.',
    ja: '日本のドラッグストアや病院で、指差しで伝えるためのツールです。', 'zh-tw': '在日本的藥妝店和醫院，用手指點選就能溝通的工具。', 'zh-cn': '在日本的药妆店和医院，用手指点选就能沟通的工具。', ko: '일본 드러그스토어와 병원에서 손가락으로 가리켜 소통하는 도구입니다.'
  },
  emergencyAmbulance: { en: 'Ambulance / Fire', ja: '救急車・消防', 'zh-tw': '救護車・消防', 'zh-cn': '救护车・消防', ko: '구급차・소방' },
  emergencyAdvice: { en: 'Should I go to hospital?', ja: '救急安心センター', 'zh-tw': '該去醫院嗎？', 'zh-cn': '该去医院吗？', ko: '병원에 가야 할까요?' },
  disclaimerShort: {
    en: 'Not medical advice. This tool only helps you talk to a pharmacist. Always follow the pharmacist or doctor and the package insert.',
    ja: 'このツールは医療行為・診断・薬の推奨を行うものではありません。購入・服用は必ず薬剤師または医師にご相談ください。', 'zh-tw': '本工具不提供醫療建議，只協助您與藥劑師溝通。請務必遵從藥劑師或醫師的指示及說明書。', 'zh-cn': '本工具不提供医疗建议，只协助您与药剂师沟通。请务必遵从药剂师或医生的指示及说明书。', ko: '의료 조언이 아닙니다. 약사와의 대화를 돕는 도구일 뿐입니다. 반드시 약사·의사의 지시와 첨부 문서를 따르세요.'
  },
  back: { en: 'Back', ja: '戻る', 'zh-tw': '返回', 'zh-cn': '返回', ko: '뒤로' },
  home: { en: 'Home', ja: 'ホーム', 'zh-tw': '首頁', 'zh-cn': '首页', ko: '홈' },
  about: { en: 'About & disclaimer', ja: '運営者情報・免責事項', 'zh-tw': '關於本站・免責聲明', 'zh-cn': '关于本站・免责声明', ko: '사이트 소개・면책 사항' },
  privacy: { en: 'Privacy policy', ja: 'プライバシーポリシー', 'zh-tw': '隱私權政策', 'zh-cn': '隐私政策', ko: '개인정보 처리방침' },
  consentText: {
    en: 'We use cookies to measure how this site is used.',
    ja: 'サイトの利用状況を把握するために Cookie を使用します。', 'zh-tw': '我們使用 Cookie 來了解網站的使用情況。', 'zh-cn': '我们使用 Cookie 来了解网站的使用情况。', ko: '사이트 이용 현황을 파악하기 위해 쿠키를 사용합니다.'
  },
  consentTextAds: {
    en: 'We use cookies to measure how this site is used and to show ads.',
    ja: 'サイトの利用状況の把握と広告の表示のために Cookie を使用します。', 'zh-tw': '我們使用 Cookie 來了解網站的使用情況並顯示廣告。', 'zh-cn': '我们使用 Cookie 来了解网站的使用情况并显示广告。', ko: '사이트 이용 현황 파악과 광고 표시를 위해 쿠키를 사용합니다.'
  },
  consentAccept: { en: 'Accept', ja: '同意する', 'zh-tw': '同意', 'zh-cn': '同意', ko: '동의' },
  consentDecline: { en: 'Decline', ja: '拒否する', 'zh-tw': '拒絕', 'zh-cn': '拒绝', ko: '거부' },
  language: { en: 'Language', ja: '言語', 'zh-tw': '語言', 'zh-cn': '语言', ko: '언어' },
} satisfies Record<string, Localized>;
