// 喫煙所の地域ページ（/[lang]/smoking/<slug>/）の上に出す「この地域について」の数行（en・ja だけ。ほかの言語のページには出さない）。
// データから自動で作る文章ではなく、地域ごとに市区の公式ページなどで確かめた内容だけを書く（2026-11-24）。
// 他サイトの喫煙所データは写さない。条例・過料は変わるので、確かめた日（checked）と出典（sources）を必ず残す。
// 確かめられなかったこと（金額・区域の細部）は書かずに「現地の表示に従って」とする。

export interface AreaGuide {
  checked: string;
  en: { sights: string; rules: string[] };
  ja: { sights: string; rules: string[] };
  sources: { label: string; url: string }[];
}

export const areaGuides: Record<string, AreaGuide> = {
  'nara-nara': {
    checked: '2026-11-24',
    en: {
      sights: 'Main sights: Nara Park (the deer), Todai-ji, Kasuga Taisha, Kofuku-ji and the old Naramachi streets. Most visitors walk to the park from JR Nara or Kintetsu Nara Station.',
      rules: [
        'Nara City bans smoking on the street in a large designated zone, including the areas in front of JR Nara Station and Kintetsu Nara Station and along Omiya-dori (Route 369).',
        'Smoking is also not allowed at the Heijo Palace Site. In Nara Park, please do not smoke while walking or drop butts: the deer eat things off the ground.',
        'Follow the signs on site and use a designated smoking area.',
      ],
    },
    ja: {
      sights: '主な観光スポット: 奈良公園（鹿）・東大寺・春日大社・興福寺・ならまち。JR奈良駅・近鉄奈良駅から歩いて公園へ向かう人が多い地域です。',
      rules: [
        '奈良市は広い範囲を路上喫煙禁止区域にしています。JR奈良駅前・近鉄奈良駅前、大宮通り（国道369号）も区域に入ります。',
        '平城宮跡も禁煙です。奈良公園では鹿が地面の物を食べるので、歩きたばこ・吸い殻のポイ捨ては絶対にしないでください。',
        '現地の表示に従い、指定の喫煙所を使ってください。',
      ],
    },
    sources: [
      { label: '奈良市 路上喫煙防止に関する条例', url: 'https://www.city.nara.lg.jp/site/ordinance/9021.html' },
    ],
  },
  'hyogo-himeji': {
    checked: '2026-11-24',
    en: {
      sights: 'Main sights: Himeji Castle (a World Heritage Site) and Koko-en Garden. The castle is about a 15–20 minute walk straight up Otemae-dori from JR / Sanyo Himeji Station.',
      rules: [
        'Smoking on the street is banned around Himeji Station, along Otemae-dori and on the road along the south side of Himeji Castle. Heated tobacco is included.',
        'From July 1, 2026, the fine is 20,000 yen if you ignore an order from city staff (it was 1,000 yen before). Staff patrol Otemae-dori and the station area.',
        'There is a public smoking area in front of Himeji Station (opened April 2026, open 6:00–22:00). Smoke there before walking to the castle.',
      ],
    },
    ja: {
      sights: '主な観光スポット: 姫路城（世界遺産）・好古園。姫路城は JR・山陽姫路駅から大手前通りをまっすぐ歩いて15〜20分ほどです。',
      rules: [
        '姫路駅周辺・大手前通り・城南線の姫路城南側の区間は路上喫煙禁止区域です。加熱式たばこも対象です。',
        '2026年7月1日から、市の職員の命令に従わない場合の過料は2万円です（以前は1,000円）。大手前通りや駅周辺では指導員が巡回しています。',
        '姫路駅前に公衆喫煙所があります（2026年4月開設、6時〜22時）。お城へ歩く前にここを使ってください。',
      ],
    },
    sources: [
      { label: '姫路市 路上喫煙対策について', url: 'https://www.city.himeji.lg.jp/kurashi/0000033143.html' },
      { label: '姫路観光なび 姫路駅周辺路上喫煙禁止区域および公衆喫煙所について', url: 'https://www.himeji-kanko.jp/oyakudachi/29/' },
    ],
  },
  'tokyo-koto': {
    checked: '2026-11-24',
    en: {
      sights: 'Main sights: Toyosu (Toyosu Market, teamLab Planets), Ariake and Odaiba waterfront, Kiyosumi Garden in Kiyosumi-Shirakawa, Fukagawa Fudo-do in Monzen-Nakacho and Kameido Tenjin Shrine.',
      rules: [
        'Smoking while walking or cycling is banned everywhere in Koto City, not just in some districts.',
        'Smoking while standing still is also banned all day around 10 stations: Kameido, Sumiyoshi, Morishita, Kiyosumi-Shirakawa, Minamisunamachi, Toyocho, Kiba, Monzen-Nakacho, Shin-Kiba and Toyosu.',
        'The city lists public smoking areas in front of Shiomi, Tatsumi and Shin-Kiba stations. Around Toyosu and Monzen-Nakacho, use the smoking areas on the list below or inside buildings.',
      ],
    },
    ja: {
      sights: '主な観光スポット: 豊洲（豊洲市場・チームラボプラネッツ）、有明・お台場の湾岸、清澄白河の清澄庭園、門前仲町の深川不動堂、亀戸天神。',
      rules: [
        '江東区では区内全域で歩きたばこ（自転車に乗りながらの喫煙も）が禁止です。',
        '亀戸・住吉・森下・清澄白河・南砂町・東陽町・木場・門前仲町・新木場・豊洲の10駅の周辺（禁煙重点地区）は、立ち止まっての喫煙も終日禁止です。',
        '区の公衆喫煙所は潮見駅前・辰巳駅前・新木場駅前にあります。豊洲や門前仲町では、下の一覧の喫煙所や建物内の喫煙所を使ってください。',
      ],
    },
    sources: [
      { label: '江東区 歩行喫煙等の防止について', url: 'https://www.city.koto.lg.jp/380301/machizukuri/sekatsu/undo/45122.html' },
    ],
  },
  'fukuoka-dazaifu': {
    checked: '2026-11-24',
    en: {
      sights: 'Main sights: Dazaifu Tenmangu Shrine, reached by the shopping street (sando) from Nishitetsu Dazaifu Station in about 5 minutes, and the Kyushu National Museum next to the shrine.',
      rules: [
        'There is no smoking area right by Nishitetsu Dazaifu Station. Please do not smoke while walking on the busy approach to the shrine.',
        'Use the smoking areas on the list below and follow the signs at the shrine and shops.',
      ],
    },
    ja: {
      sights: '主な観光スポット: 太宰府天満宮（西鉄太宰府駅から参道を歩いて5分ほど）と、となりの九州国立博物館。',
      rules: [
        '西鉄太宰府駅のすぐ近くには喫煙所がありません。人の多い参道では歩きたばこをしないでください。',
        '下の一覧の喫煙所を使い、天満宮やお店の表示に従ってください。',
      ],
    },
    sources: [],
  },
  'fukuoka-fukuoka-hakata': {
    checked: '2026-11-24',
    en: {
      sights: 'Main sights: JR Hakata Station (shopping and the Shinkansen), Canal City Hakata, Kushida Shrine, and the yatai food stalls of Nakasu.',
      rules: [
        'The area around Hakata Station is one of Fukuoka City’s no-street-smoking districts (the other is Tenjin–Daimyo). Smoking while walking or cycling on the road there is banned.',
        'Fukuoka City amended the rule in June 2026: in these districts, all smoking on roads, in parks and squares will be banned, including heated tobacco. The start date has not been set yet, so check the signs on site.',
        'Outside these districts the city still asks you not to smoke while walking.',
      ],
    },
    ja: {
      sights: '主な観光スポット: JR博多駅（買い物・新幹線）、キャナルシティ博多、櫛田神社、中洲の屋台。',
      rules: [
        '博多駅周辺は福岡市の路上禁煙地区です（もう一つは天神・大名地区）。地区内の道路での歩きたばこ・自転車に乗りながらの喫煙は禁止です。',
        '福岡市は2026年6月に条例を改正し、この地区では道路・公園・広場での喫煙がすべて禁止になります（加熱式たばこも対象）。始まる日はまだ決まっていないので、現地の表示を確かめてください。',
        '地区の外でも、歩きたばこはしないよう求められています。',
      ],
    },
    sources: [
      { label: '福岡市 路上禁煙地区', url: 'https://www.city.fukuoka.lg.jp/shimin/jigyochosei/shisei/rojoukinnenntiku_2.html' },
      { label: '福岡市 条例の改正について', url: 'https://www.city.fukuoka.lg.jp/shimin/jigyochosei/shisei/fkcnss.html' },
    ],
  },
  'chiba-narita': {
    checked: '2026-11-24',
    en: {
      sights: 'Main sights: Naritasan Shinsho-ji Temple and its Omotesando street (eel restaurants and old shops), a walk from JR Narita and Keisei Narita stations. Narita Airport is also in this city, so many people visit on a layover.',
      rules: [
        'Narita City bans dropping cigarette butts everywhere in the city, and the area around Narita Station is a priority clean-up district.',
        'Omotesando is a narrow, busy street. Please do not smoke while walking there; use the smoking areas on the list below.',
        'At Narita Airport, smoke only in the smoking rooms inside the terminals.',
      ],
    },
    ja: {
      sights: '主な観光スポット: 成田山新勝寺と表参道（うなぎ屋・古いお店）、JR成田駅・京成成田駅から歩いて行けます。成田空港も市内にあり、乗り継ぎの合間に来る人も多い地域です。',
      rules: [
        '成田市は市内全域で吸い殻のポイ捨てを禁止しています。成田駅周辺は美化推進重点地区です。',
        '表参道は道が狭く人が多いので、歩きたばこはしないでください。下の一覧の喫煙所を使ってください。',
        '成田空港では、ターミナル内の喫煙室だけで吸えます。',
      ],
    },
    sources: [
      { label: '成田市 ポイ捨て禁止条例', url: 'https://www.city.narita.chiba.jp/environment/page116300.html' },
    ],
  },
};
