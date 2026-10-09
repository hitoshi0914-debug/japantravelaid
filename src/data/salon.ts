import type { CardChoice, CardGroup, StaffPhrase } from '../components/card/types';
import type { Localized, Translation } from '../i18n/locales';

// 指差しカード（美容室・床屋で見せる）の文言データ。カードの画面は薬剤師カードと共通（src/components/card/）。
// 店員に見せる日本語（ja）は、美容室・理容室でそのまま通じる言い方にする。

/** 訳を locales.ts と同じ並び（en, ja, ko, zh-tw, zh-cn, de, fr, it, es）で書くための短縮形。 */
const t = (en: string, ja: string, ko: string, zhTw: string, zhCn: string, de: string, fr: string, it: string, es: string): Localized => ({
  en, ja, ko, 'zh-tw': zhTw, 'zh-cn': zhCn, de, fr, it, es,
});

const c = (id: string, pictogram: string, label: Localized): CardChoice => ({ id, pictogram, label });

export const salonGroups: CardGroup[] = [
  {
    id: 'service', single: false,
    title: t('Service', 'メニュー', '시술 메뉴', '服務項目', '服务项目', 'Leistung', 'Prestation', 'Servizio', 'Servicio'),
    cardHeading: 'メニュー',
    choices: [
      c('cut', '✂️', t('Cut', 'カット', '커트', '剪髮', '剪发', 'Haarschnitt', 'Coupe', 'Taglio', 'Corte')),
      c('cut-shampoo', '🧴', t('Cut + shampoo', 'カット＋シャンプー', '커트 + 샴푸', '剪髮＋洗髮', '剪发＋洗发', 'Schnitt + Haarwäsche', 'Coupe + shampooing', 'Taglio + shampoo', 'Corte + lavado')),
      c('color', '🎨', t('Color', 'カラー', '염색', '染髮', '染发', 'Färben', 'Coloration', 'Colore', 'Tinte')),
      c('perm', '🌀', t('Perm', 'パーマ', '파마', '燙髮', '烫发', 'Dauerwelle', 'Permanente', 'Permanente', 'Permanente')),
      c('straightening', '📏', t('Permanent straightening', '縮毛矯正', '매직 스트레이트', '離子燙（縮毛矯正）', '离子烫（拉直）', 'Dauerhaftes Glätten', 'Lissage permanent', 'Stiratura permanente', 'Alisado permanente')),
      c('shave', '🪒', t('Shave', '顔そり（シェービング）', '면도', '修面（刮臉）', '修面（刮脸）', 'Rasur', 'Rasage', 'Rasatura', 'Afeitado')),
      c('kids', '🧒', t('Kids’ cut', '子どものカット', '아이 커트', '兒童剪髮', '儿童剪发', 'Kinderhaarschnitt', 'Coupe enfant', 'Taglio bambino', 'Corte infantil')),
      c('bangs-only', '💇', t('Bangs (fringe) trim only', '前髪カットのみ', '앞머리만 커트', '只剪瀏海', '只剪刘海', 'Nur Pony schneiden', 'Frange uniquement', 'Solo frangia', 'Solo flequillo')),
    ],
  },
  {
    id: 'length', single: true,
    title: t('How much to cut', '切る長さ', '자를 길이', '要剪多少', '要剪多少', 'Wie viel ab?', 'Combien couper', 'Quanto tagliare', 'Cuánto cortar'),
    cardHeading: '長さ',
    choices: [
      c('trim', '✂️', t('Just a trim (~1 cm)', '毛先をそろえる程度（1cmくらい）', '끝만 다듬기 (1cm 정도)', '只修髮尾（約1公分）', '只修发梢（约1厘米）', 'Nur Spitzen (ca. 1 cm)', 'Juste les pointes (~1 cm)', 'Solo le punte (~1 cm)', 'Solo las puntas (~1 cm)')),
      c('3cm', '📏', t('Cut about 3 cm', '3cmくらい切る', '3cm 정도 자르기', '剪掉約3公分', '剪掉约3厘米', 'Ca. 3 cm ab', 'Couper environ 3 cm', 'Tagliare circa 3 cm', 'Cortar unos 3 cm')),
      c('5cm', '📐', t('Cut about 5 cm', '5cmくらい切る', '5cm 정도 자르기', '剪掉約5公分', '剪掉约5厘米', 'Ca. 5 cm ab', 'Couper environ 5 cm', 'Tagliare circa 5 cm', 'Cortar unos 5 cm')),
      c('shoulder', '🙆', t('Shoulder length', '肩くらいの長さに', '어깨 길이로', '剪到肩膀長度', '剪到肩膀长度', 'Schulterlang', 'Aux épaules', 'Alle spalle', 'A la altura de los hombros')),
      c('short', '💁', t('Short / pixie', 'ショート・ベリーショートに', '숏컷 / 픽시컷', '短髮・超短髮', '短发・超短发', 'Kurz / Pixie', 'Court / coupe garçonne', 'Corto / pixie', 'Corto / pixie')),
      c('keep', '⏸️', t('Keep the length', '長さは変えない', '길이는 그대로', '長度不變', '长度不变', 'Länge beibehalten', 'Garder la longueur', 'Mantenere la lunghezza', 'Mantener el largo')),
    ],
  },
  {
    id: 'bangs', single: true,
    title: t('Bangs (fringe)', '前髪', '앞머리', '瀏海', '刘海', 'Pony', 'Frange', 'Frangia', 'Flequillo'),
    cardHeading: '前髪',
    choices: [
      c('keep', '👌', t('Leave as is', '前髪はそのまま', '앞머리는 그대로', '瀏海保持原樣', '刘海保持原样', 'So lassen', 'Ne pas toucher', 'Lasciarla così', 'Dejarlo como está')),
      c('eyebrows', '🤨', t('To the eyebrows', '眉くらいの長さに', '눈썹 길이로', '剪到眉毛', '剪到眉毛', 'Bis zu den Augenbrauen', 'Au niveau des sourcils', 'All’altezza delle sopracciglia', 'A la altura de las cejas')),
      c('eyes', '👀', t('Just over the eyes', '目にかかるくらいの長さに', '눈에 살짝 닿는 길이로', '蓋到眼睛的長度', '盖到眼睛的长度', 'Bis über die Augen', 'Jusqu’aux yeux', 'Fino agli occhi', 'Hasta los ojos')),
      c('side', '↪️', t('Side-swept', '横に流す', '옆으로 넘기기', '斜瀏海（往旁邊撥）', '斜刘海（往旁边拨）', 'Seitlich gekämmt', 'Sur le côté', 'Di lato', 'De lado')),
      c('none', '🚫', t('No bangs', '前髪なし', '앞머리 없음', '不要瀏海', '不要刘海', 'Kein Pony', 'Pas de frange', 'Senza frangia', 'Sin flequillo')),
    ],
  },
  {
    id: 'sides', single: false,
    title: t('Sides & back', 'サイド・えりあし', '옆머리 · 뒷머리', '兩側・後面', '两侧・后面', 'Seiten & Nacken', 'Côtés et nuque', 'Lati e nuca', 'Lados y nuca'),
    cardHeading: 'サイド・えりあし',
    choices: [
      c('clip3', '1️⃣', t('Clippers 3 mm (#1)', 'バリカン 3mm', '바리캉 3mm', '電剪 3mm', '电推子 3mm', 'Maschine 3 mm (#1)', 'Tondeuse 3 mm (n° 1)', 'Macchinetta 3 mm (n. 1)', 'Máquina 3 mm (n.º 1)')),
      c('clip6', '2️⃣', t('Clippers 6 mm (#2)', 'バリカン 6mm', '바리캉 6mm', '電剪 6mm', '电推子 6mm', 'Maschine 6 mm (#2)', 'Tondeuse 6 mm (n° 2)', 'Macchinetta 6 mm (n. 2)', 'Máquina 6 mm (n.º 2)')),
      c('clip9', '3️⃣', t('Clippers 9 mm (#3)', 'バリカン 9mm', '바리캉 9mm', '電剪 9mm', '电推子 9mm', 'Maschine 9 mm (#3)', 'Tondeuse 9 mm (n° 3)', 'Macchinetta 9 mm (n. 3)', 'Máquina 9 mm (n.º 3)')),
      c('clip12', '4️⃣', t('Clippers 12 mm (#4)', 'バリカン 12mm', '바리캉 12mm', '電剪 12mm', '电推子 12mm', 'Maschine 12 mm (#4)', 'Tondeuse 12 mm (n° 4)', 'Macchinetta 12 mm (n. 4)', 'Máquina 12 mm (n.º 4)')),
      c('fade', '🌫️', t('Fade', 'フェード（刈り上げをぼかす）', '페이드', '漸層推剪（Fade）', '渐变推剪（Fade）', 'Fade', 'Dégradé (fade)', 'Sfumatura (fade)', 'Degradado (fade)')),
      c('scissors', '✂️', t('Scissors only, no clippers', 'バリカンを使わずハサミだけで', '바리캉 없이 가위로만', '只用剪刀，不用電剪', '只用剪刀，不用电推子', 'Nur Schere, keine Maschine', 'Ciseaux uniquement, pas de tondeuse', 'Solo forbici, niente macchinetta', 'Solo tijera, sin máquina')),
      c('ears-tidy', '👂', t('Tidy around the ears', '耳まわりをすっきり', '귀 주변을 깔끔하게', '耳朵周圍修乾淨', '耳朵周围修干净', 'Um die Ohren frei', 'Dégager autour des oreilles', 'Pulito intorno alle orecchie', 'Despejado alrededor de las orejas')),
      c('cover-ears', '🦻', t('Keep ears covered', '耳が隠れる長さを残す', '귀를 덮는 길이로', '保留蓋住耳朵的長度', '保留盖住耳朵的长度', 'Ohren bedeckt lassen', 'Garder les oreilles couvertes', 'Lasciare coperte le orecchie', 'Que tape las orejas')),
    ],
  },
  {
    id: 'top', single: false,
    title: t('Top', 'トップ', '윗머리', '頭頂', '头顶', 'Oberkopf', 'Dessus', 'Parte superiore', 'Parte de arriba'),
    cardHeading: 'トップ',
    choices: [
      c('thin', '🍃', t('Thin out / texturize', 'すいて軽くする', '숱을 쳐서 가볍게', '打薄', '打薄', 'Ausdünnen', 'Désépaissir / effiler', 'Sfoltire', 'Entresacar / desfilar')),
      c('volume', '🎈', t('Keep the volume', 'ボリュームを残す', '볼륨은 살리기', '保留蓬鬆感', '保留蓬松感', 'Volumen behalten', 'Garder le volume', 'Mantenere il volume', 'Mantener el volumen')),
      c('top-short', '⬇️', t('A bit shorter on top', 'トップも少し短く', '윗머리도 조금 짧게', '頭頂也剪短一點', '头顶也剪短一点', 'Oben etwas kürzer', 'Un peu plus court sur le dessus', 'Un po’ più corti sopra', 'Un poco más corto arriba')),
      c('top-long', '⬆️', t('Leave the top long', 'トップは長めに残す', '윗머리는 길게 남기기', '頭頂留長', '头顶留长', 'Oben lang lassen', 'Garder le dessus long', 'Lasciare lunghi sopra', 'Dejar largo arriba')),
    ],
  },
  {
    id: 'color', single: false,
    title: t('Color', 'カラー', '염색', '染髮', '染发', 'Farbe', 'Couleur', 'Colore', 'Color'),
    cardHeading: 'カラー',
    choices: [
      c('same', '🔁', t('Same color as now', '今と同じ色', '지금과 같은 색', '和現在同色', '和现在同色', 'Gleiche Farbe wie jetzt', 'Même couleur qu’actuellement', 'Stesso colore di adesso', 'El mismo color que ahora')),
      c('darker', '🌑', t('Darker', '今より暗く', '지금보다 어둡게', '比現在暗一點', '比现在暗一点', 'Dunkler', 'Plus foncé', 'Più scuro', 'Más oscuro')),
      c('lighter', '🌕', t('Lighter', '今より明るく', '지금보다 밝게', '比現在亮一點', '比现在亮一点', 'Heller', 'Plus clair', 'Più chiaro', 'Más claro')),
      c('roots', '🌱', t('Root touch-up only', '根元だけ染める（リタッチ）', '뿌리 염색만', '只補染髮根', '只补染发根', 'Nur Ansatz nachfärben', 'Racines uniquement', 'Solo ricrescita', 'Solo raíces')),
      c('black', '⚫', t('Black', '黒', '검정', '黑色', '黑色', 'Schwarz', 'Noir', 'Nero', 'Negro')),
      c('brown', '🟤', t('Brown', 'ブラウン', '브라운', '棕色', '棕色', 'Braun', 'Châtain', 'Castano', 'Castaño')),
      c('ash', '🩶', t('Ash', 'アッシュ', '애쉬', '灰色系（Ash）', '灰色系（Ash）', 'Asch', 'Cendré', 'Cenere', 'Ceniza')),
    ],
  },
  {
    id: 'finish', single: false,
    title: t('Finishing', '仕上げ', '마무리', '最後造型', '最后造型', 'Finish', 'Finition', 'Finitura', 'Acabado'),
    cardHeading: '仕上げ',
    choices: [
      c('no-products', '🚫', t('No styling products', '整髪料はつけない', '스타일링제는 안 바르기', '不要上造型品', '不要上造型产品', 'Keine Stylingprodukte', 'Pas de produit coiffant', 'Nessun prodotto per lo styling', 'Sin productos de peinado')),
      c('wax', '✨', t('Wax is OK', 'ワックスをつけてOK', '왁스 발라도 OK', '可以上髮蠟', '可以上发蜡', 'Wachs ist okay', 'Cire OK', 'La cera va bene', 'Cera, OK')),
      c('blow-dry', '💨', t('Blow-dry & style', 'ブローして仕上げる', '드라이로 스타일링', '吹整造型', '吹整造型', 'Föhnen & stylen', 'Brushing', 'Piega con il phon', 'Secado con cepillo')),
      c('dry-only', '🌬️', t('Just dry it', '乾かすだけでOK', '말리기만', '吹乾就好', '吹干就好', 'Nur trocknen', 'Juste sécher', 'Solo asciugare', 'Solo secar')),
    ],
  },
  {
    id: 'photo', single: true,
    title: t('Reference photo', '写真', '참고 사진', '參考照片', '参考照片', 'Referenzfoto', 'Photo de référence', 'Foto di riferimento', 'Foto de referencia'),
    cardHeading: '写真',
    choices: [
      c('photo', '📱', t('I’ll show you a photo of the style I want', '希望の髪型の写真をお見せします', '원하는 헤어스타일 사진을 보여 드릴게요', '我會給您看想要的髮型照片', '我会给您看想要的发型照片', 'Ich zeige Ihnen ein Foto der gewünschten Frisur', 'Je vais vous montrer une photo de la coupe voulue', 'Le mostro una foto del taglio che vorrei', 'Le enseño una foto del peinado que quiero')),
    ],
  },
  {
    id: 'care', single: false,
    title: t('Please note', '注意', '주의 사항', '注意事項', '注意事项', 'Bitte beachten', 'À noter', 'Da sapere', 'A tener en cuenta'),
    cardHeading: 'ご注意ください',
    choices: [
      c('sensitive-scalp', '⚠️', t('Sensitive scalp', '頭皮が敏感です', '두피가 민감해요', '頭皮敏感', '头皮敏感', 'Empfindliche Kopfhaut', 'Cuir chevelu sensible', 'Cuoio capelluto sensibile', 'Cuero cabelludo sensible')),
      c('dye-allergy', '🚫', t('Allergic to hair dye', 'ヘアカラー剤のアレルギーがあります', '염색약 알레르기가 있어요', '對染髮劑過敏', '对染发剂过敏', 'Allergie gegen Haarfärbemittel', 'Allergie aux colorations', 'Allergia alle tinture per capelli', 'Alergia a los tintes de pelo')),
      c('pregnant', '🤰', t('Pregnant', '妊娠中です', '임신 중이에요', '懷孕中', '怀孕中', 'Schwanger', 'Enceinte', 'Incinta', 'Embarazada')),
    ],
  },
];

/** カード上部の定型文（店員向けの日本語 ＋ 本人確認用の訳）。 */
export const salonIntro: Localized = t(
  'I don’t speak Japanese.\nPlease do my hair as shown below.',
  '日本語が話せません。\nこの内容でお願いします。',
  '일본어를 못 합니다.\n아래 내용대로 부탁드립니다.',
  '我不會說日語。\n請按照以下內容幫我處理。',
  '我不会说日语。\n请按照以下内容帮我处理。',
  'Ich spreche kein Japanisch.\nBitte machen Sie es so, wie unten beschrieben.',
  'Je ne parle pas japonais.\nMerci de faire comme indiqué ci-dessous.',
  'Non parlo giapponese.\nVorrei fare come indicato qui sotto, per favore.',
  'No hablo japonés.\nPor favor, hágalo como se indica abajo.',
);

export const salonCardTitle = '美容師・理容師の方へ';

export const salonAnswerHeading: Localized = t(
  'Staff: point to answer', 'スタッフの方：指差しでお答えください', '직원분: 손가락으로 가리켜 답해 주세요', '店員：請用手指點選回答', '店员：请用手指点选回答',
  'Personal: Bitte auf die Antwort zeigen', 'Personnel : montrez la réponse du doigt', 'Personale: indichi la risposta', 'Personal: señale la respuesta',
);

export const salonPickPrompt: Translation = t(
  'Pick at least one service', 'メニューを1つ以上選んでください', '시술 메뉴를 하나 이상 고르세요', '請至少選擇一項服務', '请至少选择一项服务',
  'Wählen Sie mindestens eine Leistung', 'Choisissez au moins une prestation', 'Scegli almeno un servizio', 'Elige al menos un servicio',
);

// ---- 店員が指差す質問と、本人が返す答え ----
const yes = c('yes', '⭕', t('Yes', 'はい', '예', '是', '是', 'Ja', 'Oui', 'Sì', 'Sí'));
const no = c('no', '❌', t('No', 'いいえ', '아니요', '不是', '不是', 'Nein', 'Non', 'No', 'No'));
const yesPlease = c('yes-please', '⭕', t('Yes, please', 'はい、お願いします', '네, 부탁해요', '好，麻煩了', '好的，麻烦了', 'Ja, gern', 'Oui, volontiers', 'Sì, grazie', 'Sí, por favor'));
const noThanks = c('no-thanks', '🙅', t('No, thanks', 'いいえ、結構です', '아니요, 괜찮아요', '不用了，謝謝', '不用了，谢谢', 'Nein, danke', 'Non, merci', 'No, grazie', 'No, gracias'));
const ok = c('ok', '👌', t('Yes, that’s good', 'はい、これで大丈夫です', '네, 좋아요', '可以，這樣很好', '可以，这样很好', 'Ja, so ist es gut', 'Oui, c’est parfait', 'Sì, va bene così', 'Sí, así está bien'));
const shorter = c('shorter', '✂️', t('A bit shorter', 'もう少し短く', '조금 더 짧게', '再短一點', '再短一点', 'Etwas kürzer', 'Un peu plus court', 'Un po’ più corti', 'Un poco más corto'));

export const salonPhrases: StaffPhrase[] = [
  { id: 'yes', ...yes.label },
  { id: 'no', ...no.label },
  { id: 'reservation', ...t('Do you have a reservation?', 'ご予約はされていますか？', '예약하셨나요?', '請問有預約嗎？', '请问有预约吗？', 'Haben Sie einen Termin?', 'Avez-vous un rendez-vous ?', 'Ha una prenotazione?', '¿Tiene cita?'), replies: [yes, no] },
  { id: 'wait', ...t('Please wait a moment.', '少々お待ちください。', '잠시만 기다려 주세요.', '請稍等一下。', '请稍等一下。', 'Bitte warten Sie einen Moment.', 'Veuillez patienter un instant.', 'Attenda un momento, per favore.', 'Espere un momento, por favor.') },
  { id: 'how-much', ...t('How much would you like to cut?', 'どのくらい切りますか？', '얼마나 자를까요?', '要剪多少？', '要剪多少？', 'Wie viel soll ab?', 'Combien voulez-vous couper ?', 'Quanto vuole tagliare?', '¿Cuánto quiere cortar?'), replies: salonGroups.find((g) => g.id === 'length')!.choices },
  { id: 'length-ok', ...t('Is this length OK?', 'この長さでよろしいですか？', '이 길이 괜찮으세요?', '這個長度可以嗎？', '这个长度可以吗？', 'Ist diese Länge in Ordnung?', 'Cette longueur vous convient ?', 'Va bene questa lunghezza?', '¿Está bien este largo?'), replies: [
    ok, shorter,
    c('longer', '📏', t('Leave it a bit longer', 'もう少し長めに', '조금 더 길게', '留長一點', '留长一点', 'Etwas länger lassen', 'Laisser un peu plus long', 'Lasciarli un po’ più lunghi', 'Dejarlo un poco más largo')),
  ] },
  { id: 'clippers', ...t('May I use clippers?', 'バリカンを使ってもよろしいですか？', '바리캉을 사용해도 될까요?', '可以用電剪嗎？', '可以用电推子吗？', 'Darf ich die Haarschneidemaschine benutzen?', 'Puis-je utiliser la tondeuse ?', 'Posso usare la macchinetta?', '¿Puedo usar la máquina?'), replies: [
    yes,
    c('scissors', '✂️', t('Scissors only, please', 'ハサミだけでお願いします', '가위로만 해 주세요', '請只用剪刀', '请只用剪刀', 'Bitte nur mit der Schere', 'Ciseaux uniquement, s’il vous plaît', 'Solo forbici, per favore', 'Solo con tijera, por favor')),
  ] },
  { id: 'shampoo', ...t('Would you like a shampoo?', 'シャンプーはされますか？', '샴푸 하시겠어요?', '需要洗髮嗎？', '需要洗发吗？', 'Möchten Sie eine Haarwäsche?', 'Souhaitez-vous un shampooing ?', 'Desidera lo shampoo?', '¿Quiere que le lave el pelo?'), replies: [yesPlease, noThanks] },
  { id: 'water', ...t('Is the water temperature OK?', 'お湯の温度は大丈夫ですか？', '물 온도 괜찮으세요?', '水溫可以嗎？', '水温可以吗？', 'Ist die Wassertemperatur angenehm?', 'La température de l’eau vous convient ?', 'Va bene la temperatura dell’acqua?', '¿Está bien la temperatura del agua?'), replies: [
    c('ok', '👌', t('It’s fine', 'ちょうどいいです', '딱 좋아요', '剛剛好', '刚刚好', 'Angenehm', 'C’est bien', 'Va bene', 'Está bien')),
    c('hotter', '🔥', t('A bit warmer', 'もう少し熱く', '조금 더 뜨겁게', '再熱一點', '再热一点', 'Etwas wärmer', 'Un peu plus chaud', 'Un po’ più calda', 'Un poco más caliente')),
    c('cooler', '💧', t('A bit cooler', 'もう少しぬるく', '조금 더 미지근하게', '再涼一點', '再凉一点', 'Etwas kühler', 'Un peu moins chaud', 'Un po’ meno calda', 'Un poco más fría')),
  ] },
  { id: 'itchy', ...t('Is there anywhere itchy I should wash more?', 'かゆいところはございませんか？', '가려운 곳은 없으세요?', '有哪裡會癢嗎？', '有哪里痒吗？', 'Juckt es noch irgendwo?', 'Ça vous gratte quelque part ?', 'Le prude da qualche parte?', '¿Le pica en algún sitio?'), replies: [
    c('fine', '👌', t('No, I’m fine', '大丈夫です', '괜찮아요', '沒有，很好', '没有，很好', 'Nein, alles gut', 'Non, ça va', 'No, va bene così', 'No, estoy bien')),
    c('point', '👉', t('Yes, I’ll point to it', 'あります（指で示します）', '있어요 (손으로 가리킬게요)', '有（我用手指給您看）', '有（我用手指给您看）', 'Ja, ich zeige es Ihnen', 'Oui, je vous montre où', 'Sì, le indico dove', 'Sí, le señalo dónde')),
  ] },
  { id: 'towel-massage', ...t('Would you like a hot towel or a shoulder massage?', '蒸しタオルや肩のマッサージはいかがですか？', '스팀 타월이나 어깨 마사지 해 드릴까요?', '需要熱毛巾或肩膀按摩嗎？', '需要热毛巾或肩膀按摩吗？', 'Möchten Sie ein heißes Tuch oder eine Schultermassage?', 'Souhaitez-vous une serviette chaude ou un massage des épaules ?', 'Desidera un asciugamano caldo o un massaggio alle spalle?', '¿Quiere una toalla caliente o un masaje de hombros?'), replies: [yesPlease, noThanks] },
  { id: 'shave', ...t('Would you like a face shave?', '顔そりはされますか？', '얼굴 면도 하시겠어요?', '需要修面嗎？', '需要修面吗？', 'Möchten Sie eine Gesichtsrasur?', 'Souhaitez-vous un rasage du visage ?', 'Desidera la rasatura del viso?', '¿Quiere que le afeite la cara?'), replies: [yesPlease, noThanks] },
  { id: 'products', ...t('May I put in some styling product?', '整髪料をつけてもよろしいですか？', '스타일링제를 발라도 될까요?', '可以上造型品嗎？', '可以上造型产品吗？', 'Darf ich etwas Stylingprodukt verwenden?', 'Puis-je mettre un produit coiffant ?', 'Posso mettere un prodotto per lo styling?', '¿Le pongo producto de peinado?'), replies: [yesPlease, noThanks] },
  { id: 'mirror', ...t('Please check in the mirror.', '鏡でご確認ください。', '거울로 확인해 주세요.', '請看鏡子確認一下。', '请看镜子确认一下。', 'Bitte schauen Sie in den Spiegel.', 'Regardez dans le miroir, s’il vous plaît.', 'Controlli allo specchio, per favore.', 'Mírese en el espejo, por favor.'), replies: [
    ok, shorter,
    c('thinner', '🍃', t('Thin it out a bit more', 'もう少しすいて軽く', '숱을 조금 더 쳐 주세요', '再打薄一點', '再打薄一点', 'Etwas mehr ausdünnen', 'Désépaissir un peu plus', 'Sfoltire ancora un po’', 'Entresacar un poco más')),
  ] },
  { id: 'pay', ...t('Please pay at the counter.', 'お会計はレジでお願いします。', '계산은 카운터에서 해 주세요.', '請到櫃台結帳。', '请到前台结账。', 'Bitte zahlen Sie an der Kasse.', 'Veuillez régler à la caisse.', 'Paghi alla cassa, per favore.', 'Pague en la caja, por favor.'), replies: [
    c('cash', '💴', t('Cash', '現金で', '현금으로', '付現金', '付现金', 'Bar', 'En espèces', 'In contanti', 'En efectivo')),
    c('card', '💳', t('Card', 'カードで', '카드로', '刷卡', '刷卡', 'Mit Karte', 'Par carte', 'Con carta', 'Con tarjeta')),
    c('qr', '📱', t('QR code / e-money', 'QRコード・電子マネーで', 'QR코드 · 전자화폐로', 'QR碼・電子支付', '二维码・电子支付', 'QR-Code / E-Geld', 'QR code / paiement mobile', 'QR code / pagamento elettronico', 'Código QR / pago electrónico')),
  ] },
  { id: 'cash-only', ...t('Sorry, cash only.', '申し訳ありません、お支払いは現金のみです。', '죄송합니다. 현금만 가능합니다.', '不好意思，只收現金。', '不好意思，只收现金。', 'Leider nur Barzahlung.', 'Désolé, espèces uniquement.', 'Mi dispiace, solo contanti.', 'Lo siento, solo efectivo.') },
];
