// 指差しカードの「こんなときに使う」説明ページ（/en/guide/<slug>/、英語だけ。2026-11-24）。
// カードのページは操作画面が中心で文章が少なく検索に出ないため、旅行者が実際に検索する言葉を入口にしてカードへつなぐ。
// 書かないこと: 診断・処方・薬の推奨にあたる表現、薬の商品名、「効く」「おすすめ」。病院・薬は「薬剤師に相談」で止める。
// 公開前にオーナーが内容を確認する（医療の推奨にあたる表現がないか）。

export interface GuideSection {
  h: string;
  p?: string[];
  list?: string[];
}

export interface Guide {
  slug: string;
  /** つなぐカード（言語の後ろのパス） */
  card: string;
  cardLabel: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  sections: GuideSection[];
  /** 免責表示を出す（薬・体調のページ） */
  medical?: boolean;
}

export const guides: Guide[] = [
  {
    slug: 'pharmacy-in-japan-english',
    card: 'medicine/pharmacist/',
    cardLabel: 'Open the pharmacist card',
    medical: true,
    title: 'Pharmacist doesn’t speak English? Buying medicine at a drugstore in Japan',
    description: 'Feeling sick in Japan and the drugstore staff don’t speak English? How Japanese drugstores work, who you can ask, and a free card that shows your symptoms in Japanese.',
    h1: 'When the drugstore staff in Japan don’t speak English',
    lead: 'You have a headache, a cold or an upset stomach, you walk into a Japanese drugstore, and nobody speaks English. Here is how the shop works and how to explain your symptoms without Japanese.',
    sections: [
      {
        h: 'How Japanese drugstores work',
        p: [
          'Most medicine you can buy without a prescription is sold at drugstores (ドラッグストア) and pharmacies (薬局). Boxes are labelled with a class: 第1類 (Class 1) is handed over only after a pharmacist explains it, while 第2類 and 第3類 (Class 2 and 3) can also be sold by a registered seller (登録販売者).',
          'A pharmacist is not always on duty, especially late at night. If Class 1 shelves are covered or locked, a pharmacist is probably not there right now.',
        ],
      },
      {
        h: 'What the staff will want to know',
        list: [
          'Who will take the medicine: you, a child, or an older person.',
          'Your symptoms and since when you have had them.',
          'Whether you are pregnant or breastfeeding, have allergies to any medicine, or take other medicine.',
          'What you would prefer, for example something that does not make you drowsy.',
        ],
      },
      {
        h: 'Show a card instead of talking',
        p: [
          'The Japan Travel Aid pharmacist card lets you tap these answers in English. It then shows them in large Japanese text that you hand to the staff. They can point to questions and answers on the same screen, and the Japanese can be read aloud.',
          'The card only passes on what you tap. Which product to buy is for the pharmacist or registered seller to decide with you, and you should always follow the directions on the box.',
        ],
      },
      {
        h: 'When not to use a drugstore',
        p: [
          'If symptoms are severe or getting worse, go to a hospital or clinic. In an emergency call 119 (ambulance). If you are not sure whether to call an ambulance, some areas have the #7119 advice line in Japanese.',
        ],
      },
    ],
  },
  {
    slug: 'food-allergy-japan-card',
    card: 'allergy/',
    cardLabel: 'Open the allergy & diet card',
    title: 'How to explain food allergies in Japanese at restaurants',
    description: 'Food allergy, halal, vegan or gluten-free in Japan? Hidden ingredients to watch for (soy sauce, dashi, mirin) and a free card that tells restaurant staff in Japanese.',
    h1: 'How to tell a restaurant in Japan about your food allergy',
    lead: 'Saying “allergy” is not always enough. Japanese cooking uses ingredients that are easy to miss, and small restaurants may not have an English menu. Here is what to watch for and how to explain it clearly.',
    sections: [
      {
        h: 'Ingredients that are easy to miss in Japanese food',
        list: [
          'Soy sauce contains wheat and soy.',
          'Dashi (soup stock) is usually made from bonito (fish) or kelp, and it is in miso soup, noodle soup and many sauces.',
          'Mirin and cooking sake contain alcohol.',
          'Tempura and other fried food may share oil with shrimp or other seafood.',
          'Soba noodles are buckwheat, and the same water or pans may be used for other noodles.',
        ],
      },
      {
        h: 'Labels on packaged food',
        p: [
          'Packaged food in Japan must show certain allergens, such as egg, milk, wheat, buckwheat, peanuts, shrimp, crab and walnuts, in Japanese. Restaurant dishes do not have to show them, so asking the staff is important.',
        ],
      },
      {
        h: 'Make it clear how serious it is',
        p: [
          'Staff need to know whether a tiny amount is dangerous or whether a little in a sauce is OK, and whether shared oil or utensils are a problem. If you carry an adrenaline auto-injector, tell them.',
        ],
      },
      {
        h: 'Show a card instead of talking',
        p: [
          'The Japan Travel Aid allergy & diet card lets you tap your allergies, how serious they are, and diets such as halal, vegan, vegetarian, pescatarian or gluten-free. It then shows one clear Japanese card. Staff can point to answers such as “this dish contains it” or “we can make it without”.',
          'If the staff are not sure, it is safer to choose another dish. In an emergency call 119.',
        ],
      },
    ],
  },
  {
    slug: 'taxi-in-japan-english',
    card: 'taxi/',
    cardLabel: 'Open the taxi card',
    title: 'Taking a taxi in Japan when the driver doesn’t speak English',
    description: 'Most taxi drivers in Japan speak little English. How to show your destination in Japanese, ask to pay by card or IC card, and say “stop here” with a free card.',
    h1: 'Taking a taxi in Japan without speaking Japanese',
    lead: 'Taxis in Japan are clean and safe, but many drivers speak little English and may not recognise the English name of your hotel. A destination written in Japanese, or a phone number, works best.',
    sections: [
      {
        h: 'Before you get in',
        list: [
          'Have your destination in Japanese: the name and address, or the phone number of the place.',
          'The rear left door usually opens and closes automatically. Let the driver do it.',
          'If you have large luggage, ask for the trunk before you get in.',
        ],
      },
      {
        h: 'Paying',
        p: [
          'Many taxis take credit cards, IC cards such as Suica or PASMO, and phone payments, but not all. Ask before the ride starts if you do not have cash.',
        ],
      },
      {
        h: 'Show a card instead of talking',
        p: [
          'With the Japan Travel Aid taxi card you type or paste where you are going, and it appears in large text at the top of the card. Tap requests such as “I’m in a hurry”, “No toll expressway, please”, “Please open the trunk” or “Receipt, please”, and how you want to pay.',
          'During the ride you can tap “Stop here” or “A little further”, and the driver can point to answers on the same screen.',
        ],
      },
    ],
  },
  {
    slug: 'train-station-trouble-japan',
    card: 'train/',
    cardLabel: 'Open the station card',
    title: 'Missed your stop or IC card won’t work? Asking station staff in Japan',
    description: 'Missed your stop, IC card balance too low, lost ticket or left something on the train in Japan? What to do and a free card to show station staff in Japanese.',
    h1: 'Train trouble in Japan: how to ask station staff',
    lead: 'Japanese trains are easy until something goes wrong: the gate beeps, you ride past your station, or you leave your bag on the train. Station staff can sort out almost all of it if you can explain what happened.',
    sections: [
      {
        h: 'Common problems and what usually happens',
        list: [
          'IC card balance too low to exit: top up at the fare adjustment machine (精算機) near the gate, or go to the staffed window.',
          'Gate won’t open: go to the staffed window next to the gates and show your card or ticket.',
          'Missed your stop: tell the staff at the next station. You usually pay the difference.',
          'Left something on the train: tell the staff as soon as possible, with the train time, car number and what the item looks like.',
          'Missed the last train: ask about taxis or the first train in the morning.',
        ],
      },
      {
        h: 'Show a card instead of talking',
        p: [
          'The Japan Travel Aid station card lets you write the station you want to go to and tap what happened: missed stop, wrong train, low IC balance, gate error, lost ticket, left item or last train. You can also ask about tickets, the Shinkansen, a JR Pass or refunds.',
          'Show the large Japanese card to station staff. Tap a question such as “Does this train stop at …?” and they can point to an answer.',
        ],
      },
    ],
  },
  {
    slug: 'local-bus-japan-how-to',
    card: 'bus/',
    cardLabel: 'Open the bus card',
    title: 'How to ride a local bus in rural Japan (numbered tickets & fares)',
    description: 'Local buses in rural Japan use numbered tickets and exact-fare boxes. How to get on, pay and get off, and a free card that asks the driver to tell you your stop.',
    h1: 'Riding a local bus in rural Japan',
    lead: 'In the countryside the bus is often the only way to reach a temple, an onsen or a trailhead. The system is simple once you know it, but drivers rarely speak English.',
    sections: [
      {
        h: 'How it usually works',
        list: [
          'Many local buses are boarded at the middle or rear door. Take a numbered ticket (整理券) from the machine as you get on, or tap your IC card if the bus accepts it.',
          'A screen at the front shows the fare for each ticket number. It goes up as the bus travels.',
          'Press the stop button before your stop, and pay at the front when you get off: put the ticket and the exact fare in the box.',
          'The fare box usually has a changer for 1,000 yen bills. Large bills may not be accepted, so carry coins and 1,000 yen bills.',
        ],
        p: ['Rules differ between bus companies and cities, so watch what other passengers do.'],
      },
      {
        h: 'Show a card instead of talking',
        p: [
          'With the Japan Travel Aid bus card you enter where you want to get off and show it to the driver. Tap “Please tell me when we get there”, “Which bus goes there?” or “Where do I catch the bus back?”, or explain that you only have a large bill or forgot to take a numbered ticket.',
          'The driver can point to an answer on the same screen.',
        ],
      },
    ],
  },
  {
    slug: 'haircut-in-japan-english',
    card: 'salon/',
    cardLabel: 'Open the hair salon card',
    title: 'Getting a haircut in Japan without speaking Japanese',
    description: 'Want a haircut at a salon or barber in Japan but don’t speak Japanese? What to expect and a free card to show length, bangs, fade or color in Japanese.',
    h1: 'How to get a haircut in Japan without Japanese',
    lead: 'Japanese hairdressers are known for careful work, but explaining “just a trim” or “a fade with scissors on top” is hard without the words. A photo plus a clear list of what you want avoids surprises.',
    sections: [
      {
        h: 'Salon or barber',
        p: [
          'A beauty salon (美容室) usually needs a reservation and includes shampoo and styling. A barber (理容室, 床屋) often does shaves too. Quick cut shops are cheap and fast but usually do not shampoo.',
        ],
      },
      {
        h: 'What to decide before you sit down',
        list: [
          'Service: cut, cut and shampoo, color, perm, straightening or shave.',
          'Length: a small trim, shoulder length, short, or keep the length.',
          'Bangs (fringe), sides and back (fade, scissors only), and the top.',
          'Color and finishing: products or no products.',
          'Anything the stylist should know, such as a sensitive scalp or an allergy to hair dye.',
        ],
      },
      {
        h: 'Show a card instead of talking',
        p: [
          'The Japan Travel Aid hair salon card lets you tap each of these and shows one clear Japanese card to the stylist or barber. They can point to questions, and you tap your answer. Show a photo of the style you want as well.',
        ],
      },
    ],
  },
  {
    slug: 'sick-or-injured-in-japan',
    card: 'medicine/emergency/',
    cardLabel: 'Open the emergency guide',
    medical: true,
    title: 'Sick or injured in Japan: what to do',
    description: 'When to call 119, when a clinic is enough, what to bring to a hospital in Japan, costs for visitors without Japanese insurance, and where to get help in English.',
    h1: 'Sick or injured in Japan: what to do',
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
  {
    slug: 'smoking-rules-in-japan',
    card: 'smoking/',
    cardLabel: 'Open the smoking area map',
    title: 'Smoking rules in Japan: where you can and cannot smoke',
    description: 'Street smoking bans and fines, the indoor smoking rules for restaurants and bars, heated tobacco rooms, the legal age, and how to find a designated smoking area in Japan.',
    h1: 'Where you can and cannot smoke in Japan',
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
];
