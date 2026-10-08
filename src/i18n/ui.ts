import type { Localized } from './locales';

// 画面の決まり文句。ja は「店員に見せる」ときにだけ使う。
export const ui = {
  siteTagline: {
    en: 'Simple, offline-ready tools for getting around Japan. Tap an icon to start.',
    ja: '訪日旅行者向けの、オフラインでも使えるお助けツール集です。', 'zh-tw': '簡單好用、離線也能開的日本旅遊小工具。點選圖示開始。', 'zh-cn': '简单好用、离线也能打开的日本旅行小工具。点击图标开始。', ko: '오프라인에서도 쓸 수 있는 간단한 일본 여행 도우미입니다. 아이콘을 눌러 시작하세요.', de: 'Einfache, offline nutzbare Helfer für Ihre Reise durch Japan. Tippen Sie auf ein Symbol, um zu starten.', fr: 'Des outils simples, utilisables hors ligne, pour voyager au Japon. Touchez une icône pour commencer.', it: 'Strumenti semplici, utilizzabili anche offline, per muoverti in Giappone. Tocca un\'icona per iniziare.', es: 'Herramientas sencillas, que funcionan sin conexión, para moverte por Japón. Toca un icono para empezar.'
  },
  tagline: {
    en: 'Point, show, and get help at Japanese drugstores and hospitals.',
    ja: '日本のドラッグストアや病院で、指差しで伝えるためのツールです。', 'zh-tw': '在日本的藥妝店和醫院，用手指點選就能溝通的工具。', 'zh-cn': '在日本的药妆店和医院，用手指点选就能沟通的工具。', ko: '일본 드러그스토어와 병원에서 손가락으로 가리켜 소통하는 도구입니다.', de: 'Zeigen, vorzeigen und Hilfe bekommen – in japanischen Drogerien und Krankenhäusern.', fr: 'Montrez du doigt, faites voir et obtenez de l\'aide dans les pharmacies et hôpitaux japonais.', it: 'Indica, mostra e fatti aiutare nelle farmacie e negli ospedali giapponesi.', es: 'Señala, muestra y consigue ayuda en farmacias y hospitales de Japón.'
  },
  emergencyAmbulance: { en: 'Ambulance / Fire', ja: '救急車・消防', 'zh-tw': '救護車・消防', 'zh-cn': '救护车・消防', ko: '구급차・소방', de: 'Rettungsdienst / Feuerwehr', fr: 'Ambulance / Pompiers', it: 'Ambulanza / Vigili del fuoco', es: 'Ambulancia / Bomberos' },
  emergencyAdvice: { en: 'Should I go to hospital?', ja: '救急安心センター', 'zh-tw': '該去醫院嗎？', 'zh-cn': '该去医院吗？', ko: '병원에 가야 할까요?', de: 'Muss ich ins Krankenhaus?', fr: 'Dois-je aller à l\'hôpital ?', it: 'Devo andare in ospedale?', es: '¿Debo ir al hospital?' },
  disclaimerShort: {
    en: 'Not medical advice. This tool only helps you talk to a pharmacist. Always follow the pharmacist or doctor and the package insert.',
    ja: 'このツールは医療行為・診断・薬の推奨を行うものではありません。購入・服用は必ず薬剤師または医師にご相談ください。', 'zh-tw': '本工具不提供醫療建議，只協助您與藥劑師溝通。請務必遵從藥劑師或醫師的指示及說明書。', 'zh-cn': '本工具不提供医疗建议，只协助您与药剂师沟通。请务必遵从药剂师或医生的指示及说明书。', ko: '의료 조언이 아닙니다. 약사와의 대화를 돕는 도구일 뿐입니다. 반드시 약사·의사의 지시와 첨부 문서를 따르세요.', de: 'Keine medizinische Beratung. Dieses Tool hilft Ihnen nur, sich mit dem Apotheker zu verständigen. Befolgen Sie immer die Anweisungen von Apotheker oder Arzt und die Packungsbeilage.', fr: 'Ceci n\'est pas un avis médical. Cet outil vous aide seulement à communiquer avec un pharmacien. Suivez toujours les indications du pharmacien ou du médecin et la notice.', it: 'Non è un consiglio medico. Questo strumento ti aiuta solo a comunicare con il farmacista. Segui sempre le indicazioni del farmacista o del medico e il foglietto illustrativo.', es: 'No es consejo médico. Esta herramienta solo te ayuda a hablar con el farmacéutico. Sigue siempre las indicaciones del farmacéutico o del médico y el prospecto.'
  },
  back: { en: 'Back', ja: '戻る', 'zh-tw': '返回', 'zh-cn': '返回', ko: '뒤로', de: 'Zurück', fr: 'Retour', it: 'Indietro', es: 'Volver' },
  home: { en: 'Home', ja: 'ホーム', 'zh-tw': '首頁', 'zh-cn': '首页', ko: '홈', de: 'Start', fr: 'Accueil', it: 'Home', es: 'Inicio' },
  about: { en: 'About & disclaimer', ja: '運営者情報・免責事項', 'zh-tw': '關於本站・免責聲明', 'zh-cn': '关于本站・免责声明', ko: '사이트 소개・면책 사항', de: 'Über uns & Haftungsausschluss', fr: 'À propos et avertissement', it: 'Chi siamo e avvertenze', es: 'Acerca de y aviso legal' },
  privacy: { en: 'Privacy policy', ja: 'プライバシーポリシー', 'zh-tw': '隱私權政策', 'zh-cn': '隐私政策', ko: '개인정보 처리방침', de: 'Datenschutzerklärung', fr: 'Politique de confidentialité', it: 'Informativa sulla privacy', es: 'Política de privacidad' },
  consentText: {
    en: 'We use cookies to measure how this site is used.',
    ja: 'サイトの利用状況を把握するために Cookie を使用します。', 'zh-tw': '我們使用 Cookie 來了解網站的使用情況。', 'zh-cn': '我们使用 Cookie 来了解网站的使用情况。', ko: '사이트 이용 현황을 파악하기 위해 쿠키를 사용합니다.', de: 'Wir verwenden Cookies, um zu messen, wie diese Website genutzt wird.', fr: 'Nous utilisons des cookies pour mesurer l\'utilisation de ce site.', it: 'Usiamo i cookie per misurare come viene utilizzato questo sito.', es: 'Usamos cookies para medir cómo se utiliza este sitio.'
  },
  consentTextAds: {
    en: 'We use cookies to measure how this site is used and to show ads.',
    ja: 'サイトの利用状況の把握と広告の表示のために Cookie を使用します。', 'zh-tw': '我們使用 Cookie 來了解網站的使用情況並顯示廣告。', 'zh-cn': '我们使用 Cookie 来了解网站的使用情况并显示广告。', ko: '사이트 이용 현황 파악과 광고 표시를 위해 쿠키를 사용합니다.', de: 'Wir verwenden Cookies, um zu messen, wie diese Website genutzt wird, und um Werbung anzuzeigen.', fr: 'Nous utilisons des cookies pour mesurer l\'utilisation de ce site et pour afficher des publicités.', it: 'Usiamo i cookie per misurare come viene utilizzato questo sito e per mostrare annunci.', es: 'Usamos cookies para medir cómo se utiliza este sitio y para mostrar anuncios.'
  },
  consentAccept: { en: 'Accept', ja: '同意する', 'zh-tw': '同意', 'zh-cn': '同意', ko: '동의', de: 'Akzeptieren', fr: 'Accepter', it: 'Accetta', es: 'Aceptar' },
  consentDecline: { en: 'Decline', ja: '拒否する', 'zh-tw': '拒絕', 'zh-cn': '拒绝', ko: '거부', de: 'Ablehnen', fr: 'Refuser', it: 'Rifiuta', es: 'Rechazar' },
  // 市販薬ガイドの指差しカード
  pointToAnswer: { en: 'Pharmacist: point to answer', ja: '薬剤師の方：指差しでお答えください', 'zh-tw': '藥劑師：請用手指點選回答', 'zh-cn': '药剂师：请用手指点选回答', ko: '약사: 손가락으로 가리켜 답해 주세요', de: 'Apotheker: Bitte auf die Antwort zeigen', fr: 'Pharmacien : montrez la réponse du doigt', it: 'Farmacista: indichi la risposta', es: 'Farmacéutico: señale la respuesta' },
  allQuestions: { en: 'All questions', ja: '質問一覧', 'zh-tw': '所有問題', 'zh-cn': '所有问题', ko: '질문 목록', de: 'Alle Fragen', fr: 'Toutes les questions', it: 'Tutte le domande', es: 'Todas las preguntas' },
  required: { en: 'required', ja: '必須', 'zh-tw': '必選', 'zh-cn': '必选', ko: '필수', de: 'Pflicht', fr: 'obligatoire', it: 'obbligatorio', es: 'obligatorio' },
  clear: { en: 'Clear', ja: 'クリア', 'zh-tw': '清除', 'zh-cn': '清除', ko: '지우기', de: 'Zurücksetzen', fr: 'Effacer', it: 'Cancella', es: 'Borrar' },
  showCard: { en: 'Show card', ja: 'カードを表示', 'zh-tw': '顯示卡片', 'zh-cn': '显示卡片', ko: '카드 보기', de: 'Karte zeigen', fr: 'Afficher la carte', it: 'Mostra la scheda', es: 'Mostrar tarjeta' },
  pickSymptom: { en: 'Pick at least one symptom', ja: '症状を1つ以上選んでください', 'zh-tw': '請至少選擇一個症狀', 'zh-cn': '请至少选择一个症状', ko: '증상을 하나 이상 고르세요', de: 'Wählen Sie mindestens ein Symptom', fr: 'Choisissez au moins un symptôme', it: 'Scegli almeno un sintomo', es: 'Elige al menos un síntoma' },
  closeCard: { en: 'Close card', ja: 'カードを閉じる', 'zh-tw': '關閉卡片', 'zh-cn': '关闭卡片', ko: '카드 닫기', de: 'Karte schließen', fr: 'Fermer la carte', it: 'Chiudi la scheda', es: 'Cerrar tarjeta' },
  language: { en: 'Language', ja: '言語', 'zh-tw': '語言', 'zh-cn': '语言', ko: '언어', de: 'Sprache', fr: 'Langue', it: 'Lingua', es: 'Idioma' },
} satisfies Record<string, Localized>;
