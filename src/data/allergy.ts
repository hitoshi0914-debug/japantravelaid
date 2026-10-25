import type { CardChoice, CardGroup, StaffPhrase } from '../components/card/types';
import type { Localized, Translation } from '../i18n/locales';

// 指差しカード（飲食店で見せる・アレルギーと食事制限）の文言データ。カードの画面は薬剤師カードと共通（src/components/card/）。
// 店員に見せる日本語（ja）は、飲食店でそのまま通じる言い方にする。日本の料理で見落としやすいもの
// （しょうゆの小麦、だしの魚、みりん・料理酒のアルコール）は選択肢の中で書いておく。

/** 訳を locales.ts と同じ並び（en, ja, ko, zh-tw, zh-cn, de, fr, it, es）で書くための短縮形。 */
const t = (en: string, ja: string, ko: string, zhTw: string, zhCn: string, de: string, fr: string, it: string, es: string): Localized => ({
  en, ja, ko, 'zh-tw': zhTw, 'zh-cn': zhCn, de, fr, it, es,
});

const c = (id: string, pictogram: string, label: Localized): CardChoice => ({ id, pictogram, label });

export const allergyGroups: CardGroup[] = [
  {
    id: 'allergy', single: false,
    title: t('Food allergies', '食物アレルギー', '음식 알레르기', '食物過敏', '食物过敏', 'Lebensmittelallergien', 'Allergies alimentaires', 'Allergie alimentari', 'Alergias alimentarias'),
    cardHeading: 'アレルギーがあります（食べられません）',
    choices: [
      c('egg', '🥚', t('Egg', '卵', '달걀', '蛋', '蛋', 'Ei', 'Œuf', 'Uova', 'Huevo')),
      c('milk', '🥛', t('Milk & dairy', '乳（牛乳・乳製品）', '우유 · 유제품', '奶（牛奶・乳製品）', '奶（牛奶・乳制品）', 'Milch & Milchprodukte', 'Lait et produits laitiers', 'Latte e latticini', 'Leche y lácteos')),
      c('wheat', '🌾', t('Wheat (also in soy sauce)', '小麦（しょうゆにも入っています）', '밀 (간장에도 들어 있어요)', '小麥（醬油裡也有）', '小麦（酱油里也有）', 'Weizen (auch in Sojasoße)', 'Blé (aussi dans la sauce soja)', 'Grano (anche nella salsa di soia)', 'Trigo (también en la salsa de soja)')),
      c('buckwheat', '🍜', t('Buckwheat (soba)', 'そば', '메밀 (소바)', '蕎麥', '荞麦', 'Buchweizen (Soba)', 'Sarrasin (soba)', 'Grano saraceno (soba)', 'Trigo sarraceno (soba)')),
      c('peanut', '🥜', t('Peanuts', '落花生（ピーナッツ）', '땅콩', '花生', '花生', 'Erdnüsse', 'Arachides (cacahuètes)', 'Arachidi', 'Cacahuetes')),
      c('tree-nuts', '🌰', t('Tree nuts (walnut, almond, cashew…)', 'ナッツ類（くるみ・アーモンド・カシューナッツなど）', '견과류 (호두, 아몬드, 캐슈너트 등)', '堅果類（核桃、杏仁、腰果等）', '坚果类（核桃、杏仁、腰果等）', 'Schalenfrüchte (Walnuss, Mandel, Cashew …)', 'Fruits à coque (noix, amande, cajou…)', 'Frutta a guscio (noci, mandorle, anacardi…)', 'Frutos secos (nuez, almendra, anacardo…)')),
      c('sesame', '⚪', t('Sesame', 'ごま', '참깨', '芝麻', '芝麻', 'Sesam', 'Sésame', 'Sesamo', 'Sésamo')),
      c('soy', '🫘', t('Soy (also in soy sauce, miso, tofu)', '大豆（しょうゆ・みそ・豆腐にも入っています）', '대두 (간장 · 된장 · 두부에도 들어 있어요)', '大豆（醬油、味噌、豆腐裡也有）', '大豆（酱油、味噌、豆腐里也有）', 'Soja (auch in Sojasoße, Miso, Tofu)', 'Soja (aussi dans la sauce soja, le miso, le tofu)', 'Soia (anche in salsa di soia, miso, tofu)', 'Soja (también en salsa de soja, miso, tofu)')),
      c('shrimp', '🦐', t('Shrimp / prawn', 'えび', '새우', '蝦', '虾', 'Garnelen', 'Crevettes', 'Gamberi', 'Gambas / camarones')),
      c('crab', '🦀', t('Crab', 'かに', '게', '螃蟹', '螃蟹', 'Krabben', 'Crabe', 'Granchio', 'Cangrejo')),
      c('shellfish', '🦪', t('Shellfish (clams, oysters, scallops)', '貝類（あさり・かき・ほたてなど）', '조개류 (바지락, 굴, 가리비 등)', '貝類（蛤蜊、牡蠣、扇貝等）', '贝类（蛤蜊、牡蛎、扇贝等）', 'Muscheln (Venus-, Austern, Jakobsmuscheln)', 'Coquillages (palourdes, huîtres, Saint-Jacques)', 'Molluschi (vongole, ostriche, capesante)', 'Moluscos (almejas, ostras, vieiras)')),
      c('squid', '🦑', t('Squid & octopus', 'いか・たこ', '오징어 · 문어', '魷魚・章魚', '鱿鱼・章鱼', 'Tintenfisch & Krake', 'Calmar et poulpe', 'Calamari e polpo', 'Calamar y pulpo')),
      c('fish', '🐟', t('Fish (also fish broth “dashi”)', '魚（かつおだしなど魚のだしにも反応します）', '생선 (가쓰오다시 등 생선 육수에도 반응해요)', '魚（柴魚高湯等魚類高湯也會過敏）', '鱼（鲣鱼高汤等鱼类高汤也会过敏）', 'Fisch (auch Fischbrühe „Dashi“)', 'Poisson (aussi le bouillon de poisson « dashi »)', 'Pesce (anche il brodo di pesce “dashi”)', 'Pescado (también el caldo de pescado “dashi”)')),
      c('fruit', '🥝', t('Some fruits (kiwi, peach, banana…)', '果物（キウイ・もも・バナナなど）', '과일 (키위, 복숭아, 바나나 등)', '水果（奇異果、桃子、香蕉等）', '水果（猕猴桃、桃子、香蕉等）', 'Manche Früchte (Kiwi, Pfirsich, Banane …)', 'Certains fruits (kiwi, pêche, banane…)', 'Alcuni frutti (kiwi, pesca, banana…)', 'Algunas frutas (kiwi, melocotón, plátano…)')),
    ],
  },
  {
    id: 'severity', single: false,
    title: t('How serious', 'どのくらい厳しいか', '얼마나 심한지', '嚴重程度', '严重程度', 'Wie ernst', 'Gravité', 'Quanto è grave', 'Gravedad'),
    cardHeading: 'ご注意ください',
    choices: [
      c('severe', '🚨', t('Even a tiny amount is dangerous (anaphylaxis)', 'ごく少量でも重い症状が出ます（アナフィラキシー）', '아주 조금만 먹어도 위험해요 (아나필락시스)', '即使一點點也會有嚴重反應（過敏性休克）', '即使一点点也会有严重反应（过敏性休克）', 'Schon kleinste Mengen sind gefährlich (Anaphylaxie)', 'Même une infime quantité est dangereuse (anaphylaxie)', 'Anche una minima quantità è pericolosa (anafilassi)', 'Incluso una cantidad mínima es peligrosa (anafilaxia)')),
      c('shared', '🍳', t('No shared oil, pans or utensils, please', '同じ油・鍋・調理器具で作ったものも食べられません', '같은 기름 · 냄비 · 조리도구로 만든 것도 못 먹어요', '用同一鍋油、同一個鍋子或廚具做的也不能吃', '用同一锅油、同一个锅或厨具做的也不能吃', 'Bitte kein gemeinsames Öl, keine gemeinsamen Pfannen oder Utensilien', 'Pas d’huile, de poêle ni d’ustensiles partagés, s’il vous plaît', 'Niente olio, pentole o utensili in comune, per favore', 'Nada de aceite, sartenes ni utensilios compartidos, por favor')),
      c('epipen', '💉', t('I carry an EpiPen (adrenaline auto-injector)', 'エピペン（アドレナリン自己注射薬）を持っています', '에피펜 (아드레날린 자가주사)을 가지고 있어요', '我帶著腎上腺素自動注射筆（EpiPen）', '我带着肾上腺素自动注射笔（EpiPen）', 'Ich habe einen Adrenalin-Autoinjektor (EpiPen) dabei', 'J’ai un stylo d’adrénaline (EpiPen) sur moi', 'Porto con me un autoiniettore di adrenalina (EpiPen)', 'Llevo un autoinyector de adrenalina (EpiPen)')),
      c('mild', '🙂', t('A small amount (e.g. in sauce) is OK', '調味料などに少し入っている程度なら大丈夫です', '조미료 등에 조금 들어간 정도는 괜찮아요', '調味料裡有一點點的話沒關係', '调味料里有一点点的话没关系', 'Kleine Mengen (z. B. in Soßen) sind in Ordnung', 'Une petite quantité (dans une sauce, par ex.) est acceptable', 'Una piccola quantità (ad es. nelle salse) va bene', 'Una pequeña cantidad (p. ej., en salsas) está bien')),
    ],
  },
  {
    id: 'diet', single: false,
    title: t('Diet & religion', '食事の制限（宗教・主義）', '식단 제한 (종교 · 신념)', '飲食限制（宗教・理念）', '饮食限制（宗教・理念）', 'Ernährung & Religion', 'Régime et religion', 'Dieta e religione', 'Dieta y religión'),
    cardHeading: '食べられないもの',
    choices: [
      c('halal', '☪️', t('Halal: no pork, pork products (lard, gelatin) or alcohol', 'ハラール：豚肉・豚由来のもの（ラード・ゼラチンなど）とお酒は食べられません', '할랄: 돼지고기 · 돼지 유래 재료 (라드, 젤라틴 등) · 술은 못 먹어요', '清真：不能吃豬肉、豬來源的食材（豬油、明膠等）和酒', '清真：不能吃猪肉、猪来源的食材（猪油、明胶等）和酒', 'Halal: kein Schwein, keine Schweineprodukte (Schmalz, Gelatine), kein Alkohol', 'Halal : pas de porc, de dérivés du porc (saindoux, gélatine) ni d’alcool', 'Halal: niente maiale, derivati del maiale (strutto, gelatina) né alcol', 'Halal: sin cerdo, derivados del cerdo (manteca, gelatina) ni alcohol')),
      c('vegan', '🌱', t('Vegan: no meat, fish, egg, dairy or honey', 'ヴィーガン：肉・魚・卵・乳製品・はちみつは食べられません', '비건: 고기 · 생선 · 달걀 · 유제품 · 꿀은 못 먹어요', '純素：不吃肉、魚、蛋、乳製品和蜂蜜', '纯素：不吃肉、鱼、蛋、乳制品和蜂蜜', 'Vegan: kein Fleisch, Fisch, Ei, keine Milchprodukte, kein Honig', 'Végan : ni viande, ni poisson, ni œuf, ni produits laitiers, ni miel', 'Vegano: niente carne, pesce, uova, latticini o miele', 'Vegano: sin carne, pescado, huevo, lácteos ni miel')),
      c('vegetarian', '🥗', t('Vegetarian: no meat or fish (egg and dairy OK)', 'ベジタリアン：肉・魚は食べられません（卵・乳製品は大丈夫）', '채식: 고기 · 생선은 못 먹어요 (달걀 · 유제품은 괜찮아요)', '蛋奶素：不吃肉和魚（蛋和乳製品可以）', '蛋奶素：不吃肉和鱼（蛋和乳制品可以）', 'Vegetarisch: kein Fleisch, kein Fisch (Ei und Milch okay)', 'Végétarien : ni viande ni poisson (œuf et produits laitiers OK)', 'Vegetariano: niente carne né pesce (uova e latticini sì)', 'Vegetariano: sin carne ni pescado (huevo y lácteos, sí)')),
      c('no-dashi', '🍲', t('No fish broth (dashi), bonito flakes or meat stock', 'だし（かつおぶし・煮干し）や肉のスープもだめです', '가쓰오부시 · 멸치 육수나 고기 육수도 안 돼요', '柴魚、小魚乾高湯和肉湯也不行', '鲣鱼、小鱼干高汤和肉汤也不行', 'Auch keine Fischbrühe (Dashi), Bonitoflocken oder Fleischbrühe', 'Pas non plus de bouillon de poisson (dashi), de bonite séchée ni de bouillon de viande', 'Niente brodo di pesce (dashi), fiocchi di bonito o brodo di carne', 'Tampoco caldo de pescado (dashi), bonito seco ni caldo de carne')),
      c('pescatarian', '🐠', t('No meat (fish and seafood OK)', '肉は食べられません（魚・魚介類は大丈夫）', '고기는 못 먹어요 (생선 · 해산물은 괜찮아요)', '不吃肉（魚和海鮮可以）', '不吃肉（鱼和海鲜可以）', 'Kein Fleisch (Fisch und Meeresfrüchte okay)', 'Pas de viande (poisson et fruits de mer OK)', 'Niente carne (pesce e frutti di mare sì)', 'Sin carne (pescado y marisco, sí)')),
      c('no-pork', '🐖', t('No pork', '豚肉は食べられません', '돼지고기는 못 먹어요', '不吃豬肉', '不吃猪肉', 'Kein Schweinefleisch', 'Pas de porc', 'Niente maiale', 'Sin cerdo')),
      c('no-beef', '🐄', t('No beef', '牛肉は食べられません', '소고기는 못 먹어요', '不吃牛肉', '不吃牛肉', 'Kein Rindfleisch', 'Pas de bœuf', 'Niente manzo', 'Sin ternera')),
      c('no-alcohol', '🍶', t('No alcohol, even in cooking (mirin, cooking sake)', 'お酒は料理に使うもの（みりん・料理酒）もだめです', '요리에 쓰는 술 (미림, 요리술)도 안 돼요', '連料理用的酒（味醂、料理酒）也不行', '连料理用的酒（味醂、料酒）也不行', 'Kein Alkohol, auch nicht zum Kochen (Mirin, Kochsake)', 'Pas d’alcool, même en cuisine (mirin, saké de cuisine)', 'Niente alcol, neanche in cucina (mirin, sake da cucina)', 'Sin alcohol, ni siquiera para cocinar (mirin, sake de cocina)')),
      c('gluten-free', '🚫', t('Gluten-free: no wheat, barley or rye (incl. soy sauce)', 'グルテンフリー：小麦・大麦・ライ麦はだめです（ふつうのしょうゆもだめ）', '글루텐 프리: 밀 · 보리 · 호밀은 안 돼요 (일반 간장도 안 돼요)', '無麩質：不能吃小麥、大麥、黑麥（一般醬油也不行）', '无麸质：不能吃小麦、大麦、黑麦（普通酱油也不行）', 'Glutenfrei: kein Weizen, keine Gerste, kein Roggen (auch keine normale Sojasoße)', 'Sans gluten : ni blé, ni orge, ni seigle (sauce soja ordinaire comprise)', 'Senza glutine: niente grano, orzo o segale (nemmeno la normale salsa di soia)', 'Sin gluten: ni trigo, ni cebada, ni centeno (tampoco la salsa de soja normal)')),
      c('no-raw', '🍣', t('No raw fish or raw egg', '生の魚（刺身など）や生卵は食べられません', '날생선 (회 등)이나 날달걀은 못 먹어요', '不吃生魚（生魚片等）和生雞蛋', '不吃生鱼（生鱼片等）和生鸡蛋', 'Kein roher Fisch, kein rohes Ei', 'Pas de poisson cru ni d’œuf cru', 'Niente pesce crudo né uova crude', 'Sin pescado crudo ni huevo crudo')),
    ],
  },
];

/** カード上部の定型文（店員向けの日本語 ＋ 本人確認用の訳）。 */
export const allergyIntro: Localized = t(
  'I don’t speak Japanese.\nI can’t eat the foods below. Please tell me which dishes are safe for me.',
  '日本語が話せません。\n下のものが食べられません。食べられる料理を教えてください。',
  '일본어를 못 합니다.\n아래 음식을 먹을 수 없어요. 먹을 수 있는 요리를 알려 주세요.',
  '我不會說日語。\n我不能吃下面這些東西。請告訴我哪些料理可以吃。',
  '我不会说日语。\n我不能吃下面这些东西。请告诉我哪些菜可以吃。',
  'Ich spreche kein Japanisch.\nIch kann die unten genannten Lebensmittel nicht essen. Bitte sagen Sie mir, welche Gerichte ich essen kann.',
  'Je ne parle pas japonais.\nJe ne peux pas manger les aliments ci-dessous. Pouvez-vous m’indiquer les plats que je peux manger ?',
  'Non parlo giapponese.\nNon posso mangiare gli alimenti qui sotto. Mi può dire quali piatti posso mangiare?',
  'No hablo japonés.\nNo puedo comer los alimentos de abajo. ¿Me puede decir qué platos puedo comer?',
);

export const allergyCardTitle = 'お店の方へ（アレルギー・食事制限）';

export const allergyAnswerHeading: Localized = t(
  'Staff: point to answer', 'スタッフの方：指差しでお答えください', '직원분: 손가락으로 가리켜 답해 주세요', '店員：請用手指點選回答', '店员：请用手指点选回答',
  'Personal: Bitte auf die Antwort zeigen', 'Personnel : montrez la réponse du doigt', 'Personale: indichi la risposta', 'Personal: señale la respuesta',
);

export const allergyPickPrompt: Translation = t(
  'Pick at least one', '1つ以上選んでください', '하나 이상 고르세요', '請至少選擇一項', '请至少选择一项',
  'Wählen Sie mindestens eins', 'Choisissez au moins un élément', 'Scegli almeno una voce', 'Elige al menos una opción',
);

/** カード下部の小さな注意書き。お店の答えを保証するものではないことを伝える。 */
export const allergyDisclaimer: Localized = t(
  'This card only helps you communicate. The restaurant’s answer is not a guarantee; if you have a severe allergy, decide carefully for yourself.',
  'このカードは伝えるための補助です。お店の回答は安全を保証するものではありません。重いアレルギーのある方はご自身で慎重に判断してください。',
  '이 카드는 의사소통을 돕기 위한 것입니다. 가게의 답변이 안전을 보장하지는 않습니다. 심한 알레르기가 있으면 스스로 신중하게 판단하세요.',
  '這張卡片只是溝通的輔助。店家的回答不代表保證安全；有嚴重過敏的人請自行謹慎判斷。',
  '这张卡片只是沟通的辅助。店家的回答不代表保证安全；有严重过敏的人请自行谨慎判断。',
  'Diese Karte hilft nur bei der Verständigung. Die Antwort des Restaurants ist keine Garantie; bei schweren Allergien entscheiden Sie bitte selbst mit Vorsicht.',
  'Cette carte aide seulement à communiquer. La réponse du restaurant n’est pas une garantie ; en cas d’allergie grave, décidez vous-même avec prudence.',
  'Questa scheda serve solo a comunicare. La risposta del ristorante non è una garanzia; in caso di allergia grave, decidi tu con prudenza.',
  'Esta tarjeta solo ayuda a comunicarse. La respuesta del restaurante no es una garantía; si tiene una alergia grave, decida usted con prudencia.',
);

// ---- 店員が指差す質問・説明と、本人が返す答え ----
const yes = c('yes', '⭕', t('Yes', 'はい', '예', '是', '是', 'Ja', 'Oui', 'Sì', 'Sí'));
const no = c('no', '❌', t('No', 'いいえ', '아니요', '不是', '不是', 'Nein', 'Non', 'No', 'No'));
const yesPlease = c('yes-please', '⭕', t('Yes, please', 'はい、お願いします', '네, 부탁해요', '好，麻煩了', '好的，麻烦了', 'Ja, gern', 'Oui, volontiers', 'Sì, grazie', 'Sí, por favor'));
const noThanks = c('no-thanks', '🙅', t('No, thanks', 'いいえ、結構です', '아니요, 괜찮아요', '不用了，謝謝', '不用了，谢谢', 'Nein, danke', 'Non, merci', 'No, grazie', 'No, gracias'));

export const allergyPhrases: StaffPhrase[] = [
  { id: 'yes', ...yes.label },
  { id: 'no', ...no.label },
  { id: 'check', ...t('I’ll check. Please wait a moment.', '確認しますので、少々お待ちください。', '확인해 볼게요. 잠시만 기다려 주세요.', '我確認一下，請稍等。', '我确认一下，请稍等。', 'Ich frage nach. Einen Moment bitte.', 'Je vérifie. Un instant, s’il vous plaît.', 'Controllo. Attenda un momento, per favore.', 'Lo compruebo. Espere un momento, por favor.') },
  { id: 'safe-dish', ...t('This dish does not contain it.', 'この料理には入っていません。', '이 요리에는 들어 있지 않아요.', '這道料理裡沒有。', '这道菜里没有。', 'Dieses Gericht enthält es nicht.', 'Ce plat n’en contient pas.', 'Questo piatto non lo contiene.', 'Este plato no lo lleva.') },
  { id: 'contains', ...t('This dish contains it.', 'この料理には入っています。', '이 요리에는 들어 있어요.', '這道料理裡有。', '这道菜里有。', 'Dieses Gericht enthält es.', 'Ce plat en contient.', 'Questo piatto lo contiene.', 'Este plato lo lleva.') },
  { id: 'can-remove', ...t('We can make it without that. Is that OK?', '抜いてお作りできます。よろしいですか？', '빼고 만들어 드릴 수 있어요. 괜찮으세요?', '可以不加那個來做。這樣可以嗎？', '可以不放那个来做。这样可以吗？', 'Wir können es ohne zubereiten. Ist das in Ordnung?', 'Nous pouvons le préparer sans. Cela vous convient ?', 'Possiamo prepararlo senza. Va bene?', 'Podemos prepararlo sin eso. ¿Le parece bien?'), replies: [yesPlease, noThanks] },
  { id: 'shared-kitchen', ...t('We use the same oil and utensils, so traces may get in.', '同じ油や調理器具を使うので、少し混ざるかもしれません。', '같은 기름과 조리도구를 써서 조금 섞일 수도 있어요.', '因為用同樣的油和廚具，可能會沾到一點。', '因为用同样的油和厨具，可能会沾到一点。', 'Wir verwenden dasselbe Öl und dieselben Utensilien, Spuren sind möglich.', 'Nous utilisons la même huile et les mêmes ustensiles, des traces sont possibles.', 'Usiamo lo stesso olio e gli stessi utensili, potrebbero esserci tracce.', 'Usamos el mismo aceite y utensilios, puede haber trazas.'), replies: [
    c('ok-small', '👌', t('That’s OK', 'それなら大丈夫です', '그 정도는 괜찮아요', '那樣沒關係', '那样没关系', 'Das ist in Ordnung', 'Ça va', 'Va bene', 'Está bien')),
    c('not-ok', '🙅', t('Then I can’t eat it', 'それなら食べられません', '그러면 못 먹어요', '那我不能吃', '那我不能吃', 'Dann kann ich es nicht essen', 'Alors je ne peux pas le manger', 'Allora non posso mangiarlo', 'Entonces no puedo comerlo')),
  ] },
  { id: 'unknown', ...t('Sorry, we don’t know all the ingredients.', '申し訳ありません、原材料がすべてはわかりません。', '죄송합니다. 원재료를 모두 알 수는 없어요.', '不好意思，我們不清楚所有的原料。', '不好意思，我们不清楚所有的原料。', 'Leider kennen wir nicht alle Zutaten.', 'Désolé, nous ne connaissons pas tous les ingrédients.', 'Mi dispiace, non conosciamo tutti gli ingredienti.', 'Lo siento, no conocemos todos los ingredientes.') },
  { id: 'cannot', ...t('Sorry, we can’t serve food that meets your needs.', '申し訳ありません、ご希望に合う料理はご用意できません。', '죄송합니다. 원하시는 요리를 준비해 드릴 수 없어요.', '不好意思，我們無法提供符合您需求的料理。', '不好意思，我们无法提供符合您需求的菜。', 'Leider können wir kein passendes Essen anbieten.', 'Désolé, nous ne pouvons pas proposer de plat adapté.', 'Mi dispiace, non possiamo offrire piatti adatti.', 'Lo siento, no podemos ofrecer platos adecuados.') },
  { id: 'recommend', ...t('How about this dish?', 'こちらの料理はいかがですか？', '이 요리는 어떠세요?', '這道料理您覺得如何？', '这道菜您觉得怎么样？', 'Wie wäre es mit diesem Gericht?', 'Que diriez-vous de ce plat ?', 'Che ne dice di questo piatto?', '¿Qué le parece este plato?'), replies: [yesPlease, noThanks] },
  { id: 'how-strict', ...t('Is a small amount, like in soy sauce or broth, OK?', 'しょうゆやだしに少し入っている程度なら大丈夫ですか？', '간장이나 육수에 조금 들어간 정도는 괜찮으세요?', '醬油或高湯裡有一點點的話可以嗎？', '酱油或高汤里有一点点的话可以吗？', 'Sind kleine Mengen, etwa in Sojasoße oder Brühe, in Ordnung?', 'Une petite quantité, comme dans la sauce soja ou le bouillon, est-elle acceptable ?', 'Va bene una piccola quantità, come nella salsa di soia o nel brodo?', '¿Está bien una pequeña cantidad, como en la salsa de soja o el caldo?'), replies: [
    c('small-ok', '🙂', t('Yes, a little is OK', 'はい、少しなら大丈夫です', '네, 조금은 괜찮아요', '可以，一點點沒關係', '可以，一点点没关系', 'Ja, ein wenig ist okay', 'Oui, un peu, ça va', 'Sì, un po’ va bene', 'Sí, un poco está bien')),
    c('none-at-all', '🚨', t('No, not even a little', 'いいえ、少しでもだめです', '아니요, 조금도 안 돼요', '不行，一點點也不行', '不行，一点点也不行', 'Nein, nicht einmal ein wenig', 'Non, pas même un peu', 'No, nemmeno un po’', 'No, ni siquiera un poco')),
  ] },
  { id: 'english-menu', ...t('We have an allergen chart / English menu.', 'アレルギー表・英語のメニューがあります。', '알레르기 표 · 영어 메뉴가 있어요.', '我們有過敏原表・英文菜單。', '我们有过敏原表・英文菜单。', 'Wir haben eine Allergentabelle / englische Speisekarte.', 'Nous avons un tableau des allergènes / un menu en anglais.', 'Abbiamo una tabella degli allergeni / un menù in inglese.', 'Tenemos una tabla de alérgenos / una carta en inglés.'), replies: [yesPlease, noThanks] },
];
