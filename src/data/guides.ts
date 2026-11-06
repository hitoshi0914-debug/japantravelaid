import type { Lang } from '../i18n/locales';

// 旅行の「困ったとき」の読み物（/[lang]/guides/<slug>/）。指差しカードの使いどころを説明する記事。
// 2026-11-06 AdSense「有用性の低いコンテンツ」で不承認 → ユーザー決定で英語・日本語を先に作り、ほかの7言語は合格後に足す。
// 言語を足すときは GUIDE_LANGS に加えて各記事にその言語の本文を書く。
// 診断・処方・薬の推奨にあたる表現は書かない（CLAUDE.md）。金額・制度は変わるので「目安」「〜の場合がある」で書く。

export const GUIDE_LANGS = ['en', 'ja'] as const satisfies readonly Lang[];
export type GuideLang = (typeof GUIDE_LANGS)[number];

export interface GuideSection {
  h: string;
  p?: string[];
  list?: string[];
}

export interface GuideText {
  title: string;
  description: string;
  lead: string;
  sections: GuideSection[];
}

export interface Guide {
  slug: string;
  icon: string;
  /** 記事の最後に出す「このカードを使う」リンク（言語の後ろのパス）。 */
  card: string;
  /** 記事を書いた・見直した日（記事の下に出す）。 */
  updated: string;
  text: Record<GuideLang, GuideText>;
}

export const guideUi = {
  listTitle: { en: 'Travel guides: when things go wrong in Japan', ja: '旅行中に困ったときのガイド' },
  listDescription: {
    en: 'Practical guides for visitors to Japan: buying medicine, getting sick or hurt, food allergies, taxis, trains and local buses, and smoking rules.',
    ja: '訪日旅行者向けの実用ガイド。薬の買い方、病気やけがのとき、食物アレルギー、タクシー、電車と路線バス、喫煙のルール。',
  },
  listLead: {
    en: 'Short, practical guides to the situations visitors to Japan most often get stuck in. Each guide ends with a card you can show to Japanese staff.',
    ja: '訪日旅行者がよく困る場面を、短く実用的にまとめました。各ガイドの最後に、日本人スタッフに見せるカードへのリンクがあります。',
  },
  sectionTitle: { en: 'Travel guides', ja: '旅行ガイド' },
  useCard: { en: 'Open the card for this situation', ja: 'この場面で使うカードを開く' },
  updated: { en: 'Last reviewed', ja: '最終確認' },
  note: {
    en: 'Rules, prices and services change. This guide is general information, not medical or legal advice. Always follow the instructions of staff and official signs.',
    ja: '制度・料金・サービスは変わることがあります。このガイドは一般的な情報で、医療・法律上の助言ではありません。現地のスタッフや公式の表示に従ってください。',
  },
  more: { en: 'More guides', ja: 'ほかのガイド' },
} as const;

export const guides: Guide[] = [
  {
    slug: 'buying-medicine-in-japan',
    icon: 'pill',
    card: 'medicine/pharmacist/',
    updated: '2026-11-06',
    text: {
      en: {
        title: 'How to buy over-the-counter medicine in Japan',
        description: 'Drugstore or pharmacy? How OTC medicine is sold in Japan, when you must talk to a pharmacist, tax-free shopping, and how to explain your symptoms without speaking Japanese.',
        lead: 'Japanese drugstores are everywhere, open late and well stocked, but almost every package is written only in Japanese. This guide explains how medicine is sold in Japan and how to get help at the counter even if you cannot read a word.',
        sections: [
          {
            h: 'Drugstore (ドラッグストア) or pharmacy (薬局)?',
            p: [
              'A drugstore (doraggu sutoa) is a large shop that sells cosmetics, snacks, daily goods and over-the-counter medicine. Big chains are found near most stations and shopping streets, and many stay open until 21:00 or later.',
              'A pharmacy (yakkyoku / 調剤薬局) mainly fills doctors\' prescriptions and is usually next to a clinic or hospital. Some also sell a small range of OTC medicine. If you only need something for a cold, a headache or an upset stomach, a drugstore is usually the easier place to start.',
            ],
          },
          {
            h: 'Three classes of OTC medicine',
            p: ['Japanese law sorts OTC medicine by risk. You will see the class printed on the box:'],
            list: [
              'Class 1 (第1類医薬品): can only be sold by a pharmacist, who must explain it to you. These are often kept behind the counter or shown only as an empty box. If no pharmacist is on duty (common in the evening), you cannot buy them.',
              'Class 2 and designated Class 2 (第2類・指定第2類): sold by a pharmacist or a registered seller (登録販売者). Staff may ask you a few questions first.',
              'Class 3 (第3類): lower-risk products such as many vitamins and some ointments, sold on the open shelf.',
            ],
          },
          {
            h: 'Ask the staff, even without Japanese',
            p: [
              'Staff wearing a name badge that says 薬剤師 (pharmacist) or 登録販売者 (registered seller) can help you choose. They will usually want to know your main symptom, how long you have had it, your age, whether you are pregnant or breastfeeding, any allergies, and any medicine you already take.',
              'You do not need to speak Japanese. Our pharmacist card lets you tap your symptom and these details in your language and shows them in Japanese on your screen. Staff can answer by pointing at "yes" or "no".',
              'Dosage, active ingredients and strength can differ from the products you know at home. Read the dosage table on the package together with the staff, and do not combine products with the same ingredient.',
            ],
          },
          {
            h: 'Tax-free shopping and payment',
            p: [
              'Many drugstores offer tax-free shopping for short-term visitors when you spend over a set amount in one shop on the same day. Bring your passport, because staff must check it. Medicine and cosmetics bought tax-free are "consumables" and may be sealed in a bag that you should not open in Japan.',
              'Credit cards, IC transport cards and QR payments are widely accepted in chain drugstores, but small local shops may be cash only.',
            ],
          },
          {
            h: 'Bringing your own medicine to Japan',
            p: [
              'Visitors can usually bring a limited personal supply of their own medicine without paperwork, but larger amounts need an import certificate, and some medicines that are legal elsewhere are banned in Japan, including products that contain stimulants. Check the Ministry of Health, Labour and Welfare (MHLW) website before you travel and carry your prescription or a doctor\'s note in English.',
            ],
          },
          {
            h: 'When not to rely on a drugstore',
            p: [
              'A drugstore cannot diagnose you. If symptoms are severe, sudden or getting worse, or if you are unsure, see a doctor. In an emergency, call 119 for an ambulance. Our emergency guide explains what to say.',
            ],
          },
        ],
      },
      ja: {
        title: '日本で市販薬を買うには（訪日旅行者向け）',
        description: 'ドラッグストアと薬局の違い、市販薬の分類、薬剤師に相談が必要な薬、免税、日本語が話せなくても症状を伝える方法を、訪日旅行者向けにまとめました。',
        lead: '日本のドラッグストアはどこにでもあり、夜遅くまで開いていて品ぞろえも豊富です。ただ、箱の説明はほとんど日本語だけ。このガイドでは、日本での薬の売られ方と、日本語が読めなくても店頭で助けてもらう方法を説明します。',
        sections: [
          {
            h: 'ドラッグストアと薬局の違い',
            p: [
              'ドラッグストアは、化粧品・お菓子・日用品と一緒に市販薬を売る大きなお店です。駅前や商店街に多く、夜21時以降まで開いている店も少なくありません。',
              '薬局（調剤薬局）は、主に医師の処方せんの薬を出すところで、クリニックや病院の近くにあります。市販薬を少し置いている店もあります。かぜ・頭痛・胃の不調などで市販薬を探すなら、まずドラッグストアが入りやすいでしょう。',
            ],
          },
          {
            h: '市販薬の3つの分類',
            p: ['日本の市販薬はリスクに応じて分類され、箱に表示されています。'],
            list: [
              '第1類医薬品: 薬剤師だけが販売でき、説明を受けてから買います。カウンターの奥に置かれていたり、空箱だけが並んでいたりします。薬剤師がいない時間（夜など）は買えません。',
              '第2類・指定第2類医薬品: 薬剤師か登録販売者が販売します。購入前にいくつか質問されることがあります。',
              '第3類医薬品: ビタミン剤や一部の塗り薬など、比較的リスクの低い薬で、棚から自由に選べます。',
            ],
          },
          {
            h: '日本語ができなくても店員に相談する',
            p: [
              '「薬剤師」「登録販売者」の名札をつけた店員が相談にのってくれます。主な症状、いつからか、年齢、妊娠・授乳中かどうか、アレルギー、飲んでいる薬などを聞かれるのが一般的です。',
              '日本語は話せなくても大丈夫です。このサイトの薬剤師カードでは、症状やこれらの情報を自分の言語でタップすると、画面に日本語で表示されます。店員は「はい」「いいえ」を指差して答えられます。',
              '成分・量・強さは母国の薬と違うことがあります。箱の用法・用量を店員と一緒に確認し、同じ成分の薬を重ねて飲まないようにしましょう。',
            ],
          },
          {
            h: '免税と支払い',
            p: [
              '多くのドラッグストアでは、短期滞在の旅行者が同じ日に一定額以上買うと免税になります。店員がパスポートを確認するので持って行きましょう。免税で買った薬や化粧品は「消耗品」として袋に封をされることがあり、日本国内では開けないよう求められます。',
              'チェーンのドラッグストアではクレジットカード・交通系 IC カード・QR 決済が広く使えますが、小さな個人店は現金だけのこともあります。',
            ],
          },
          {
            h: '自分の薬を日本に持ち込むとき',
            p: [
              '自分用の薬は一定の量までなら手続きなしで持ち込めることが多い一方、それを超えると手続き（輸入確認）が必要です。また、覚醒剤成分を含むものなど、海外では合法でも日本では持ち込めない薬があります。出発前に厚生労働省のサイトで確認し、処方せんや英文の診断書を持って行くと安心です。',
            ],
          },
          {
            h: 'ドラッグストアに頼らないほうがよいとき',
            p: [
              'ドラッグストアでは診断はできません。症状が強い・急に出た・悪くなっている、判断に迷うときは医師に相談してください。緊急時は 119 に電話して救急車を呼びます。何を伝えればよいかは救急ガイドにまとめています。',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'sick-or-injured-in-japan',
    icon: 'ambulance',
    card: 'medicine/emergency/',
    updated: '2026-11-06',
    text: {
      en: {
        title: 'Sick or injured in Japan: what to do',
        description: 'When to call 119, when a clinic is enough, what to bring to a hospital in Japan, costs for visitors without Japanese insurance, and where to get help in English.',
        lead: 'Falling ill abroad is stressful, and Japanese hospitals work differently from many other countries. Here is how to decide where to go, what to bring and how to communicate.',
        sections: [
          {
            h: 'Emergencies: call 119',
            p: [
              '119 is the number for both ambulances and the fire service. It is free from any phone, including mobiles and public phones. Say "kyūkyū desu" (救急です, "it is a medical emergency"), then give your location. If you do not speak Japanese, many fire departments can connect an interpreter, so stay on the line.',
              'Ambulances in Japan are free of charge, but the hospital treatment afterwards is not. Our emergency card shows the key phrases and lets you show your address and symptoms in Japanese.',
            ],
          },
          {
            h: 'Not sure if it is an emergency? #7119',
            p: [
              'In Tokyo, Osaka and some other prefectures, #7119 is a medical advice line that helps you decide whether to call an ambulance or which hospital to go to. It is mostly in Japanese and not available everywhere. If you cannot get through and you are worried, call 119.',
              'The Japan National Tourism Organization (JNTO) runs a 24-hour Japan Visitor Hotline for travellers, which can help in English and other languages with medical and other problems. Look up the current number on the JNTO website before you travel.',
            ],
          },
          {
            h: 'Clinic (クリニック) or hospital (病院)?',
            p: [
              'For minor illness or injury, start at a local clinic (kurinikku or 医院). Clinics specialise: 内科 (internal medicine) for colds and fever, 外科 or 整形外科 for injuries, 皮膚科 for skin, 眼科 for eyes, 耳鼻咽喉科 for ear, nose and throat, 歯科 for teeth.',
              'Large hospitals often charge an extra fee (several thousand yen) if you come without a referral letter from a clinic, and waiting times can be long. Many clinics close on Sundays, public holidays and one weekday afternoon. Local "on-duty" clinics (休日当番医) cover holidays; ask your hotel front desk.',
            ],
          },
          {
            h: 'What to bring',
            list: [
              'Your passport',
              'Travel insurance details (policy number and the insurer\'s emergency phone number)',
              'Cash and a credit card: some clinics are cash only',
              'A list of your medicines, allergies and medical conditions',
              'Your hotel name and address in Japanese',
            ],
          },
          {
            h: 'Costs for visitors',
            p: [
              'Visitors without Japanese health insurance pay the full cost, and some hospitals charge foreign visitors more than the standard price. A simple clinic visit may cost a few thousand to over ten thousand yen; emergency care and hospital stays can be very expensive. Travel insurance that covers medical treatment is strongly recommended. Keep every receipt and ask for a medical certificate (診断書) if your insurer needs one.',
            ],
          },
          {
            h: 'At reception',
            p: [
              'You will usually fill in a questionnaire (問診票) about your symptoms, allergies and history. Ask for an English version: many clinics in tourist areas have one. Writing your symptoms, allergies and medicines in advance, or showing them on your phone, saves time for you and the staff.',
            ],
          },
        ],
      },
      ja: {
        title: '日本で病気・けがをしたときにすること（訪日旅行者向け）',
        description: '119 に電話するべきとき、クリニックで足りるとき、病院に持って行くもの、日本の保険がない旅行者の費用の目安、外国語で相談できる窓口をまとめました。',
        lead: '旅行先で体調を崩すと不安になります。日本の病院のしくみは国によって大きく違います。どこへ行くか、何を持って行くか、どう伝えるかをまとめました。',
        sections: [
          {
            h: '緊急時は 119',
            p: [
              '119 は救急車と消防の番号で、携帯電話・公衆電話を含め無料でかけられます。「救急です」と言ってから、場所を伝えます。日本語が話せない場合も、通訳につないでくれる消防本部が多いので、電話を切らずに待ちましょう。',
              '日本の救急車は無料ですが、病院での治療費はかかります。このサイトの救急カードには、伝えるべき言葉と、住所・症状を日本語で見せる画面があります。',
            ],
          },
          {
            h: '救急かどうか迷ったら #7119',
            p: [
              '東京・大阪など一部の都道府県では、#7119 で救急車を呼ぶべきか、どの病院に行けばよいかを相談できます。主に日本語で、全国どこでも使えるわけではありません。つながらず不安なときは 119 に電話してください。',
              '日本政府観光局（JNTO）は、旅行者向けに 24 時間対応の電話窓口（Japan Visitor Hotline）を設けていて、病気などの相談に英語などで対応しています。最新の番号は出発前に JNTO のサイトで確認してください。',
            ],
          },
          {
            h: 'クリニックか病院か',
            p: [
              '軽い病気やけがなら、まず近くのクリニック（医院）へ。診療科が分かれていて、かぜや熱は内科、けがは外科・整形外科、皮膚は皮膚科、目は眼科、耳・鼻・のどは耳鼻咽喉科、歯は歯科です。',
              '大きな病院は、紹介状なしで受診すると数千円の追加料金がかかることが多く、待ち時間も長くなりがちです。クリニックは日曜・祝日と平日の午後1日を休むところが多く、休日は「休日当番医」が診てくれます。ホテルのフロントで聞いてみましょう。',
            ],
          },
          {
            h: '持って行くもの',
            list: [
              'パスポート',
              '旅行保険の情報（証券番号、保険会社の緊急連絡先）',
              '現金とクレジットカード（現金だけのクリニックもあります）',
              '飲んでいる薬・アレルギー・持病のメモ',
              'ホテルの名前と住所（日本語）',
            ],
          },
          {
            h: '旅行者の費用',
            p: [
              '日本の健康保険がない旅行者は全額自己負担で、病院によっては外国人旅行者に標準より高い料金を設定しています。クリニックの受診で数千円から1万円以上、救急や入院はかなり高額になることがあります。治療費を補償する旅行保険に入っておくことを強くおすすめします。領収書はすべて保管し、保険会社が必要とする場合は診断書を頼みましょう。',
            ],
          },
          {
            h: '受付で',
            p: [
              '受付では、症状・アレルギー・既往歴を書く問診票を渡されるのが一般的です。観光地のクリニックには英語版を用意しているところも多いので、聞いてみましょう。症状・アレルギー・飲んでいる薬を前もってメモしておくか、スマホで見せられるようにしておくと、本人にも受付の方にも手間が減ります。',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'food-allergies-in-japan',
    icon: 'utensils',
    card: 'allergy/',
    updated: '2026-11-06',
    text: {
      en: {
        title: 'Eating out in Japan with food allergies or a special diet',
        description: 'Hidden ingredients in Japanese food (dashi, soy sauce, mirin), what allergen labels in Japan cover, and how to explain allergies, halal, vegetarian or vegan needs to restaurant staff.',
        lead: 'Japanese food is famous for its variety, but many dishes share a few base ingredients that are easy to miss. If you have an allergy or follow a vegetarian, vegan or halal diet, knowing these will help you ask the right questions.',
        sections: [
          {
            h: 'Hidden ingredients to know',
            list: [
              'Dashi (だし): soup stock in miso soup, noodle broth, simmered dishes and many sauces. It is usually made from bonito (fish) flakes, sometimes with kelp. "Vegetable" dishes are often cooked in fish dashi.',
              'Soy sauce (醤油): contains soy and usually wheat. It is in teriyaki, ramen and many dressings.',
              'Mirin and cooking sake: sweet rice wine used in sauces; they contain alcohol.',
              'Pork, chicken or beef extract in ramen broth, curry roux and gyoza.',
              'Egg in tempura batter, some noodles and many desserts.',
              'Buckwheat (そば): soba noodles may be cooked in the same water as udon.',
            ],
          },
          {
            h: 'What allergen labels cover',
            p: [
              'Packaged food in Japan must list eight main allergens: shrimp, crab, walnut, wheat, buckwheat, egg, milk and peanut. Around twenty more, such as soy, sesame, cashew and salmon, are recommended but optional, so their absence on a label does not prove they are not there.',
              'Restaurants and food stalls are not required to show allergens. Chain restaurants often have an allergen chart (アレルギー表) on request, but small restaurants usually do not. Cross-contact in shared fryers and kitchens is common.',
            ],
          },
          {
            h: 'Vegetarian, vegan and halal',
            p: [
              'Vegetarianism is less common in Japan, and "no meat" is often understood as "no visible meat". Ask specifically about fish dashi, meat extract and egg. Dedicated vegan and halal restaurants exist in large cities and tourist areas; some show certification at the entrance.',
              'For halal needs, mention pork, lard, gelatin and alcohol (including mirin), which appear in many sauces and sweets.',
            ],
          },
          {
            h: 'How to ask',
            p: [
              'Ask before you order, ideally when the restaurant is not busy. Our allergy and diet card lets you choose what you cannot eat and shows a clear Japanese message to staff, with "yes / no" answers they can point to. Restaurants may say they cannot guarantee safety; for a severe allergy, it is better to choose another restaurant than to take a risk.',
              'If you carry an adrenaline auto-injector, keep it with you, and know that 119 is the emergency number.',
            ],
          },
        ],
      },
      ja: {
        title: '食物アレルギー・食事制限がある人の日本での外食',
        description: '和食に隠れている材料（だし・醤油・みりん）、日本のアレルギー表示の範囲、アレルギー・ハラール・ベジタリアン・ヴィーガンを店員に伝える方法をまとめました。',
        lead: '和食は種類が豊富ですが、多くの料理が同じ基本の材料を使っていて、見落としやすいものがあります。アレルギーがある人や、ベジタリアン・ヴィーガン・ハラールの人は、これを知っておくと聞くべきことがわかります。',
        sections: [
          {
            h: '知っておきたい隠れた材料',
            list: [
              'だし: みそ汁・めんつゆ・煮物・多くのたれに使われ、たいていかつお節（魚）、昆布も使います。「野菜の料理」でも魚のだしで煮ていることがよくあります。',
              '醤油: 大豆と、ふつうは小麦を含みます。照り焼き・ラーメン・ドレッシングなどにも入っています。',
              'みりん・料理酒: たれに使う甘い酒で、アルコールを含みます。',
              'ラーメンのスープ、カレールー、ギョーザの豚・鶏・牛のエキス。',
              '天ぷらの衣、一部の麺、多くのデザートの卵。',
              'そば: うどんと同じゆで湯でそばをゆでる店があります。',
            ],
          },
          {
            h: 'アレルギー表示の範囲',
            p: [
              '日本の包装食品には、えび・かに・くるみ・小麦・そば・卵・乳・落花生の8品目の表示が義務づけられています。大豆・ごま・カシューナッツ・さけなど約20品目は表示が推奨されているだけなので、表示がなくても入っていないとは限りません。',
              '飲食店や屋台にはアレルギー表示の義務がありません。チェーン店では頼めばアレルギー表を見せてくれることが多いものの、小さなお店にはないのがふつうです。揚げ油や調理器具の共用による混入もよくあります。',
            ],
          },
          {
            h: 'ベジタリアン・ヴィーガン・ハラール',
            p: [
              '日本ではベジタリアンはまだ少なく、「肉なし」は「見える肉がない」と受け取られがちです。魚のだし・肉のエキス・卵について具体的に聞きましょう。大都市や観光地にはヴィーガンやハラールの専門店があり、入口に認証を掲げている店もあります。',
              'ハラールの場合は、たれやお菓子に多く使われる豚肉・ラード・ゼラチン・アルコール（みりんを含む）を伝えましょう。',
            ],
          },
          {
            h: '伝え方',
            p: [
              '注文の前に、できれば混んでいない時間に聞くのがおすすめです。このサイトのアレルギー・食事制限カードでは、食べられないものを選ぶと日本語のメッセージが表示され、店員は「はい・いいえ」を指差して答えられます。「安全は保証できない」と言われることもあります。重いアレルギーがあるなら、無理をせず別のお店を選びましょう。',
              'アドレナリン自己注射薬を持っている人は常に携帯し、緊急時の番号は 119 だと覚えておきましょう。',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'taking-a-taxi-in-japan',
    icon: 'taxi',
    card: 'taxi/',
    updated: '2026-11-06',
    text: {
      en: {
        title: 'Taking a taxi in Japan: a visitor\'s guide',
        description: 'How to hail a taxi in Japan, automatic doors, fares and late-night surcharges, payment, ride-hailing apps, and how to show your destination to a driver who does not speak English.',
        lead: 'Japanese taxis are clean, safe and honest, and drivers do not expect tips. The main challenge for visitors is explaining where to go. These tips make the ride easy.',
        sections: [
          {
            h: 'Finding a taxi',
            p: [
              'Use taxi ranks (タクシー乗り場) at stations, hotels and large shops, or wave at a passing taxi. The sign in the windscreen shows its status: 空車 (red, in many cities) means available, 賃走 means occupied, 迎車 means it is on the way to a booked customer.',
              'Ride-hailing apps such as GO, S.RIDE and Uber work in major cities and call regular licensed taxis. In the countryside, taxis may need to be booked by phone; ask a station, hotel or tourist office.',
            ],
          },
          {
            h: 'Doors and seat belts',
            p: [
              'The rear left door opens and closes automatically, controlled by the driver. Wait for it to open and do not slam it. Everyone must wear a seat belt, including passengers in the back.',
            ],
          },
          {
            h: 'Fares and payment',
            p: [
              'Fares are metered and start at a fixed flag-down fare that differs by region. A late-night surcharge (often about 20%) usually applies roughly from 22:00 to 5:00, and highway tolls are added if you use an expressway. Some airports have fixed-fare taxis.',
              'Most city taxis accept credit cards, IC transport cards and QR payments, shown by stickers on the window, but some small companies are cash only. Ask before you get in if you have no cash. Tipping is not expected.',
            ],
          },
          {
            h: 'Showing your destination',
            p: [
              'Many drivers speak little English and may not recognise foreign spellings of hotels or sights. Show the destination written in Japanese, a phone number they can put into the navigation system, or a map pin.',
              'Our taxi card lets you type or paste the destination and shows it in large Japanese text, together with phrases such as "please stop here", "please use the meter" and "I will pay by card".',
            ],
          },
          {
            h: 'Lost something in a taxi?',
            p: [
              'Keep your receipt: it shows the taxi company and the car number, which makes it much easier to get lost items back. Call the company, or ask at a police box (交番), as soon as you notice.',
            ],
          },
        ],
      },
      ja: {
        title: '日本でタクシーに乗るには（訪日旅行者向け）',
        description: '日本でのタクシーのひろい方、自動ドア、運賃と深夜割増、支払い方法、配車アプリ、英語が通じない運転手に行き先を見せる方法をまとめました。',
        lead: '日本のタクシーは清潔で安全、料金もごまかされず、チップもいりません。旅行者がいちばん困るのは行き先の伝え方です。ここでは乗るときのコツをまとめました。',
        sections: [
          {
            h: 'タクシーを見つける',
            p: [
              '駅・ホテル・大きな店のタクシー乗り場を使うか、走っているタクシーに手をあげます。フロントガラスの表示で状態がわかり、「空車」は乗れる、「賃走」は客が乗っている、「迎車」は予約客を迎えに行く途中です。',
              '大都市では GO・S.RIDE・Uber などの配車アプリで、ふつうのタクシーを呼べます。地方では電話予約が必要なこともあるので、駅・ホテル・観光案内所で聞いてみましょう。',
            ],
          },
          {
            h: 'ドアとシートベルト',
            p: [
              '後ろの左のドアは運転手が操作する自動ドアです。開くのを待ち、自分で強く閉めないようにしましょう。後部座席を含め全員シートベルトが必要です。',
            ],
          },
          {
            h: '運賃と支払い',
            p: [
              '運賃はメーター制で、地域ごとに決まった初乗り運賃から始まります。おおむね22時から翌5時ごろは深夜割増（2割程度が多い）があり、高速道路を使うと料金が加算されます。空港によっては定額タクシーもあります。',
              '都市部のタクシーはクレジットカード・交通系 IC カード・QR 決済が使えることが多く、窓のステッカーで確認できますが、現金だけの小さな会社もあります。現金がないときは乗る前に聞きましょう。チップは不要です。',
            ],
          },
          {
            h: '行き先を見せる',
            p: [
              '英語があまり話せない運転手も多く、ホテルや観光地の外国語表記がわからないこともあります。日本語で書いた行き先、カーナビに入れられる電話番号、地図のピンを見せるのが確実です。',
              'このサイトのタクシーカードでは、行き先を入力・貼り付けると大きな日本語で表示され、「ここで止めてください」「メーターを使ってください」「カードで払います」などの一言も見せられます。',
            ],
          },
          {
            h: 'タクシーに忘れ物をしたら',
            p: [
              '領収書を取っておきましょう。タクシー会社と車の番号が書いてあり、忘れ物が見つかりやすくなります。気づいたらすぐタクシー会社に電話するか、交番で相談しましょう。',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'trains-and-local-buses-in-japan',
    icon: 'train',
    card: 'train/',
    updated: '2026-11-06',
    text: {
      en: {
        title: 'Trains and local buses in Japan: common problems and fixes',
        description: 'What to do if you miss your stop, your IC card does not work or you lose something on a Japanese train, and how to ride a local bus in rural Japan with numbered tickets.',
        lead: 'Japanese public transport is punctual and easy once you know a few rules. Most problems, such as a missed stop or a gate that will not open, are quickly fixed by station staff. Rural buses work differently from city buses, which surprises many visitors.',
        sections: [
          {
            h: 'At the station',
            p: [
              'IC cards (rechargeable transport cards) work on trains, subways and most city buses across much of Japan. If the gate closes on you, it is usually because the balance is too low or the card was not tapped properly when you entered. Go to the staffed window (有人改札) next to the gates.',
              'If you went past your stop, took the wrong train or bought the wrong ticket, do not worry: station staff adjust the fare at the gate or the fare-adjustment machine (精算機). Our station card shows these situations in Japanese so you can explain without speaking.',
            ],
          },
          {
            h: 'Last trains and delays',
            p: [
              'Most city lines stop running around midnight. Check the last train before you go out at night. When a train is delayed, staff can give you a delay certificate (遅延証明書), and many companies post it online.',
            ],
          },
          {
            h: 'Riding a local bus in the countryside',
            p: ['In many regions, especially outside the big cities, buses work like this:'],
            list: [
              'Board through the rear or middle door.',
              'Tap your IC card on the reader, or take a numbered ticket (整理券) from the machine if you pay cash or the bus does not accept your card.',
              'Watch the fare display at the front: find your ticket number to see your current fare.',
              'Press the stop button before your stop.',
              'Pay at the front when you get off: drop the exact fare and your numbered ticket into the box. Use the change machine on the fare box to break bills before your stop, not while paying.',
            ],
          },
          {
            h: 'Asking the driver for help',
            p: [
              'Rural buses can run only a few times a day, and stop names are often shown only in Japanese. Our bus card lets you ask the driver "please tell me when we reach this stop", show the stop name in Japanese and ask about fares and IC cards.',
            ],
          },
          {
            h: 'Lost items',
            p: [
              'Report lost items as soon as possible to the station or bus company, and note the time, line, direction and car number if you know them. Items handed to the police can be searched through the lost property centre of the prefecture.',
            ],
          },
        ],
      },
      ja: {
        title: '日本の電車と路線バスでよくある困りごとと対処法',
        description: '乗り過ごした、IC カードで改札が通れない、忘れ物をしたときの対処と、地方の路線バスの乗り方（整理券・後ろ乗り・前払い）を訪日旅行者向けにまとめました。',
        lead: '日本の公共交通は時間に正確で、いくつかのルールを知れば使いやすくなります。乗り過ごしや改札が開かないといった困りごとは、駅員に伝えればすぐ解決します。地方の路線バスは都市のバスと乗り方が違い、戸惑う旅行者が多いところです。',
        sections: [
          {
            h: '駅で',
            p: [
              '交通系 IC カードは日本の多くの地域の電車・地下鉄・都市部のバスで使えます。改札が閉まるのは、残高不足か、入るときにうまくタッチできていないことがほとんど。改札横の有人改札に行きましょう。',
              '乗り過ごした、違う電車に乗った、切符を間違えた、というときも心配いりません。改札や精算機で運賃を調整できます。このサイトの駅カードでは、こうした状況を日本語で見せて、話さずに伝えられます。',
            ],
          },
          {
            h: '終電と遅れ',
            p: [
              '都市部の多くの路線は深夜0時ごろに終わります。夜出かける前に終電を確認しておきましょう。電車が遅れたときは駅で遅延証明書をもらえ、ネットで出している会社も多くあります。',
            ],
          },
          {
            h: '地方の路線バスの乗り方',
            p: ['大都市以外の多くの地域では、バスは次のように乗ります。'],
            list: [
              '後ろか中央のドアから乗ります。',
              'IC カードを読み取り機にタッチします。現金で払う場合や、カードが使えないバスでは、機械から整理券を取ります。',
              '前の運賃表示を見て、整理券の番号のところで今の運賃を確認します。',
              '降りるバス停の手前で降車ボタンを押します。',
              '降りるときに前で払います。運賃ちょうどのお金と整理券を運賃箱に入れます。お札のくずしは、払うときではなく停車前に運賃箱の両替機で。',
            ],
          },
          {
            h: '運転手に助けてもらう',
            p: [
              '地方のバスは1日数本のこともあり、バス停の名前は日本語だけの表示が多くあります。このサイトのバスカードでは、「このバス停に着いたら教えてください」とお願いしたり、バス停名を日本語で見せたり、運賃や IC カードについて聞いたりできます。',
            ],
          },
          {
            h: '忘れ物',
            p: [
              '忘れ物はできるだけ早く駅やバス会社に伝えましょう。時間・路線・方向・号車がわかればあわせて伝えます。警察に届けられた物は、都道府県の遺失物の窓口で探せます。',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'smoking-rules-in-japan',
    icon: 'cigarette',
    card: 'smoking/',
    updated: '2026-11-06',
    text: {
      en: {
        title: 'Smoking rules in Japan: where you can and cannot smoke',
        description: 'Street smoking bans and fines, the indoor smoking rules for restaurants and bars, heated tobacco rooms, the legal age, and how to find a designated smoking area in Japan.',
        lead: 'Japan has strict rules on where you may smoke, but they are different from many countries: smoking on the street is often banned, while designated smoking areas outdoors are common. Knowing the rules avoids fines and awkward moments.',
        sections: [
          {
            h: 'No smoking on the street in many cities',
            p: [
              'Many cities and wards, including large parts of central Tokyo, Osaka and Kyoto, ban smoking while walking or on the street, and some areas fine people on the spot. Look for 路上喫煙禁止 (no smoking on the street) signs on the pavement and poles. Even where it is not banned, smoking while walking is considered rude.',
              'Instead, use a designated smoking area (喫煙所, kitsuen-jo). These are often near station exits, in parks or next to convenience stores, sometimes as an enclosed booth.',
            ],
          },
          {
            h: 'Indoors: restaurants, bars and hotels',
            p: [
              'Since 2020, smoking indoors is banned in principle in restaurants, offices, shops and other public buildings. Smoking is only allowed in designated smoking rooms, and you may not eat there. Some rooms are for heated tobacco only (加熱式たばこ専用喫煙室), where eating and drinking may be allowed.',
              'Some small bars and cafés that existed before the law can allow smoking if they display a sign at the entrance; minors are not allowed in. Hotels decide for themselves, and many have only non-smoking rooms.',
            ],
          },
          {
            h: 'Age, buying and heated tobacco',
            p: [
              'The legal age for smoking and buying tobacco in Japan is 20. Convenience stores sell cigarettes and heated tobacco sticks over the counter; tell staff the number shown on the shelf behind the counter, and they may ask you to confirm your age on a touch screen.',
              'Heated tobacco is very popular in Japan and is treated much like cigarettes under street smoking bans. Liquid e-cigarettes are not sold with nicotine in Japan.',
            ],
          },
          {
            h: 'Manners',
            list: [
              'Smoke only in designated areas and put your butts in the ashtray provided.',
              'Carry a portable ashtray (携帯灰皿) if you smoke outdoors.',
              'Keep away from children and building entrances.',
              'Follow local signs: rules differ from city to city and change over time.',
            ],
          },
          {
            h: 'Finding a smoking area',
            p: [
              'Our smoking area map shows public smoking areas near you, with data from OpenStreetMap and other sources. Spots can close or move, so please follow the signs on site, and use the report button if something is wrong.',
            ],
          },
        ],
      },
      ja: {
        title: '日本の喫煙ルール: 吸える場所・吸えない場所',
        description: '路上喫煙の禁止と過料、飲食店・バーの屋内喫煙のルール、加熱式たばこ専用喫煙室、年齢制限、喫煙所の探し方をまとめました。',
        lead: '日本には喫煙場所のルールがありますが、海外とは考え方が違います。路上での喫煙は禁止されていることが多い一方、屋外の喫煙所はあちこちにあります。ルールを知っておけば、過料や気まずい思いを避けられます。',
        sections: [
          {
            h: '多くの街で路上喫煙は禁止',
            p: [
              '東京・大阪・京都の中心部をはじめ、多くの市区町村が歩きたばこや路上での喫煙を禁止していて、その場で過料を取る地域もあります。歩道や電柱の「路上喫煙禁止」の表示に注意しましょう。禁止されていない場所でも、歩きたばこはマナー違反とされます。',
              'たばこは喫煙所で吸います。駅の出口付近、公園、コンビニの横などにあり、囲まれたブースになっていることもあります。',
            ],
          },
          {
            h: '屋内: 飲食店・バー・ホテル',
            p: [
              '2020年から、飲食店・職場・店舗など多くの人が使う建物の屋内は原則禁煙です。吸えるのは喫煙専用室だけで、そこでは飲食できません。加熱式たばこ専用喫煙室では、飲食できる場合があります。',
              '法律の施行前からある小さなバーや喫茶店などは、入口に表示をすれば喫煙可にでき、20歳未満は入れません。ホテルは施設ごとに決めていて、禁煙室だけのところも多くあります。',
            ],
          },
          {
            h: '年齢・買い方・加熱式たばこ',
            p: [
              '日本では喫煙・たばこの購入は20歳からです。コンビニではたばこや加熱式たばこをレジで買います。レジ後ろの棚の番号を伝えると、タッチパネルで年齢確認を求められることがあります。',
              '加熱式たばこは日本でとても普及しており、路上喫煙の禁止では紙巻きたばこと同じように扱われることが多いです。ニコチン入りのリキッド式電子たばこは日本では売られていません。',
            ],
          },
          {
            h: 'マナー',
            list: [
              '決められた場所で吸い、吸い殻は備え付けの灰皿へ。',
              '屋外で吸うなら携帯灰皿を持ち歩く。',
              '子どもや建物の入口から離れる。',
              '現地の表示に従う（ルールは街ごとに違い、変わることもあります）。',
            ],
          },
          {
            h: '喫煙所を探す',
            p: [
              'このサイトの喫煙所マップでは、OpenStreetMap などのデータから近くの公衆喫煙所を探せます。喫煙所は閉鎖・移転することがあるので現地の表示に従い、間違いを見つけたら報告ボタンで知らせてください。',
            ],
          },
        ],
      },
    },
  },
];

export const isGuideLang = (lang: string): lang is GuideLang => (GUIDE_LANGS as readonly string[]).includes(lang);
