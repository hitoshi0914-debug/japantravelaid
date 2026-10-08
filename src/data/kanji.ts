import type { Translation } from '../i18n/locales';

// 薬の箱によく書いてある言葉の早見表。意味の対訳だけ（効き目の説明・推奨はしない）。
export interface BoxWord {
  ja: string;
  reading: string;
  meaning: Translation;
}

/** どの薬にも出てくる言葉。 */
export const commonWords: BoxWord[] = [
  { ja: '効能・効果', reading: 'kōnō kōka', meaning: { en: 'Indications (what it is approved for)', 'zh-tw': '效能・效果（核准的適應症）', 'zh-cn': '效能・效果（批准的适应症）', ko: '효능・효과(허가된 적응증)', de: 'Anwendungsgebiete (wofür es zugelassen ist)', fr: 'Indications (ce pour quoi il est autorisé)', it: 'Indicazioni (per cosa è approvato)', es: 'Indicaciones (para qué está aprobado)' } },
  { ja: '用法・用量', reading: 'yōhō yōryō', meaning: { en: 'Directions and dosage', 'zh-tw': '用法・用量', 'zh-cn': '用法・用量', ko: '용법・용량', de: 'Anwendung und Dosierung', fr: 'Mode d’emploi et posologie', it: 'Modo d’uso e dosaggio', es: 'Modo de empleo y dosis' } },
  { ja: '成分', reading: 'seibun', meaning: { en: 'Ingredients', 'zh-tw': '成分', 'zh-cn': '成分', ko: '성분', de: 'Inhaltsstoffe', fr: 'Composition', it: 'Ingredienti', es: 'Componentes' } },
  { ja: '使用上の注意', reading: 'shiyōjō no chūi', meaning: { en: 'Precautions', 'zh-tw': '使用注意事項', 'zh-cn': '使用注意事项', ko: '사용상 주의사항', de: 'Vorsichtsmaßnahmen', fr: 'Précautions d’emploi', it: 'Avvertenze', es: 'Precauciones' } },
  { ja: '1日3回', reading: 'ichinichi sankai', meaning: { en: '3 times a day', 'zh-tw': '1天3次', 'zh-cn': '1天3次', ko: '하루 3회', de: '3-mal täglich', fr: '3 fois par jour', it: '3 volte al giorno', es: '3 veces al día' } },
  { ja: '食後', reading: 'shokugo', meaning: { en: 'After meals', 'zh-tw': '飯後', 'zh-cn': '饭后', ko: '식후', de: 'Nach dem Essen', fr: 'Après les repas', it: 'Dopo i pasti', es: 'Después de las comidas' } },
  { ja: '食前', reading: 'shokuzen', meaning: { en: 'Before meals', 'zh-tw': '飯前', 'zh-cn': '饭前', ko: '식전', de: 'Vor dem Essen', fr: 'Avant les repas', it: 'Prima dei pasti', es: 'Antes de las comidas' } },
  { ja: '1回2錠', reading: 'ikkai nijō', meaning: { en: '2 tablets per dose', 'zh-tw': '每次2錠', 'zh-cn': '每次2片', ko: '1회 2정', de: '2 Tabletten pro Einnahme', fr: '2 comprimés par prise', it: '2 compresse per dose', es: '2 comprimidos por toma' } },
  { ja: '15才以上', reading: 'jūgo-sai ijō', meaning: { en: 'Age 15 and over', 'zh-tw': '15歲以上', 'zh-cn': '15岁以上', ko: '15세 이상', de: 'Ab 15 Jahren', fr: 'À partir de 15 ans', it: 'Dai 15 anni in su', es: 'A partir de 15 años' } },
  { ja: '服用しないこと', reading: 'fukuyō shinai koto', meaning: { en: 'Do not take', 'zh-tw': '請勿服用', 'zh-cn': '请勿服用', ko: '복용하지 마세요', de: 'Nicht einnehmen', fr: 'Ne pas prendre', it: 'Non assumere', es: 'No tomar' } },
  { ja: '眠気', reading: 'nemuke', meaning: { en: 'Drowsiness', 'zh-tw': '嗜睡', 'zh-cn': '困倦', ko: '졸음', de: 'Schläfrigkeit', fr: 'Somnolence', it: 'Sonnolenza', es: 'Somnolencia' } },
  { ja: '外用', reading: 'gaiyō', meaning: { en: 'For external use only', 'zh-tw': '外用', 'zh-cn': '外用', ko: '외용', de: 'Nur zur äußerlichen Anwendung', fr: 'Usage externe uniquement', it: 'Solo per uso esterno', es: 'Solo para uso externo' } },
  { ja: '第1類医薬品', reading: 'dai-ichirui iyakuhin', meaning: { en: 'Class 1 OTC — sold only when a pharmacist is present', 'zh-tw': '第1類非處方藥：僅在藥劑師在場時販售', 'zh-cn': '第1类非处方药：仅在药剂师在场时销售', ko: '제1류 일반의약품: 약사가 있을 때만 판매', de: 'Rezeptfrei, Klasse 1 — Verkauf nur, wenn ein Apotheker anwesend ist', fr: 'Sans ordonnance, classe 1 — vendu uniquement en présence d’un pharmacien', it: 'Da banco, classe 1 — venduto solo in presenza di un farmacista', es: 'Sin receta, clase 1 — solo se vende si hay un farmacéutico presente' } },
  { ja: '指定第2類医薬品', reading: 'shitei dai-nirui', meaning: { en: 'Designated Class 2 OTC — ask staff about precautions', 'zh-tw': '指定第2類非處方藥：請向店員詢問注意事項', 'zh-cn': '指定第2类非处方药：请向店员询问注意事项', ko: '지정 제2류 일반의약품: 주의사항은 직원에게 문의', de: 'Rezeptfrei, besonders ausgewiesene Klasse 2 — Personal nach Vorsichtsmaßnahmen fragen', fr: 'Sans ordonnance, classe 2 désignée — demandez les précautions au personnel', it: 'Da banco, classe 2 designata — chiedere le avvertenze al personale', es: 'Sin receta, clase 2 designada — pregunte al personal por las precauciones' } },
  { ja: '第2類医薬品', reading: 'dai-nirui', meaning: { en: 'Class 2 OTC', 'zh-tw': '第2類非處方藥', 'zh-cn': '第2类非处方药', ko: '제2류 일반의약품', de: 'Rezeptfrei, Klasse 2', fr: 'Sans ordonnance, classe 2', it: 'Da banco, classe 2', es: 'Sin receta, clase 2' } },
  { ja: '第3類医薬品', reading: 'dai-sanrui', meaning: { en: 'Class 3 OTC', 'zh-tw': '第3類非處方藥', 'zh-cn': '第3类非处方药', ko: '제3류 일반의약품', de: 'Rezeptfrei, Klasse 3', fr: 'Sans ordonnance, classe 3', it: 'Da banco, classe 3', es: 'Sin receta, clase 3' } },
];

export interface CategoryInfo {
  intro: Translation;
  words: BoxWord[];
  /** 箱に書いてある主な成分名（カタカナ ↔ 英語の一般名）。 */
  ingredients: BoxWord[];
}

export const categoryInfo: Record<string, CategoryInfo> = {
  pain: {
    intro: { en: 'Words you may see on boxes of fever and pain relievers.', 'zh-tw': '退燒止痛藥包裝上常見的字詞。', 'zh-cn': '退烧止痛药包装上常见的词语。', ko: '해열진통제 상자에서 볼 수 있는 말.', de: 'Wörter, die Sie auf Packungen von Fieber- und Schmerzmitteln sehen können.', fr: 'Mots que vous pouvez voir sur les boîtes d’antipyrétiques et d’antidouleurs.', it: 'Parole che puoi trovare sulle confezioni di antipiretici e antidolorifici.', es: 'Palabras que puede ver en las cajas de antipiréticos y analgésicos.', ja: '解熱鎮痛薬の箱によく書いてある言葉と英語の対訳。' },
    words: [
      { ja: '解熱鎮痛薬', reading: 'genetsu chintsūyaku', meaning: { en: 'Fever and pain reliever', 'zh-tw': '退燒止痛藥', 'zh-cn': '退烧止痛药', ko: '해열진통제', de: 'Fieber- und Schmerzmittel', fr: 'Antipyrétique et antidouleur', it: 'Antipiretico e antidolorifico', es: 'Antipirético y analgésico' } },
      { ja: '頭痛', reading: 'zutsū', meaning: { en: 'Headache', 'zh-tw': '頭痛', 'zh-cn': '头痛', ko: '두통', de: 'Kopfschmerzen', fr: 'Mal de tête', it: 'Mal di testa', es: 'Dolor de cabeza' } },
      { ja: '生理痛', reading: 'seiritsū', meaning: { en: 'Period pain', 'zh-tw': '生理痛', 'zh-cn': '痛经', ko: '생리통', de: 'Regelschmerzen', fr: 'Douleurs de règles', it: 'Dolori mestruali', es: 'Dolor menstrual' } },
      { ja: '歯痛', reading: 'shitsū', meaning: { en: 'Toothache', 'zh-tw': '牙痛', 'zh-cn': '牙痛', ko: '치통', de: 'Zahnschmerzen', fr: 'Mal de dents', it: 'Mal di denti', es: 'Dolor de muelas' } },
      { ja: '発熱', reading: 'hatsunetsu', meaning: { en: 'Fever', 'zh-tw': '發燒', 'zh-cn': '发烧', ko: '발열', de: 'Fieber', fr: 'Fièvre', it: 'Febbre', es: 'Fiebre' } },
    ],
    ingredients: [
      { ja: 'ロキソプロフェン', reading: 'rokisopurofen', meaning: { en: 'Loxoprofen', 'zh-tw': '洛索洛芬 (Loxoprofen)', 'zh-cn': '洛索洛芬 (Loxoprofen)', ko: '록소프로펜 (Loxoprofen)', de: 'Loxoprofen', fr: 'Loxoprofène (Loxoprofen)', it: 'Loxoprofene (Loxoprofen)', es: 'Loxoprofeno (Loxoprofen)' } },
      { ja: 'イブプロフェン', reading: 'ibupurofen', meaning: { en: 'Ibuprofen', 'zh-tw': '布洛芬 (Ibuprofen)', 'zh-cn': '布洛芬 (Ibuprofen)', ko: '이부프로펜 (Ibuprofen)', de: 'Ibuprofen', fr: 'Ibuprofène (Ibuprofen)', it: 'Ibuprofene (Ibuprofen)', es: 'Ibuprofeno (Ibuprofen)' } },
      { ja: 'アセトアミノフェン', reading: 'asetoaminofen', meaning: { en: 'Acetaminophen (paracetamol)', 'zh-tw': '乙醯胺酚 (Acetaminophen)', 'zh-cn': '对乙酰氨基酚 (Paracetamol)', ko: '아세트아미노펜 (Acetaminophen)', de: 'Paracetamol (Acetaminophen)', fr: 'Paracétamol (Acetaminophen)', it: 'Paracetamolo (Acetaminophen)', es: 'Paracetamol (Acetaminophen)' } },
      { ja: 'アセチルサリチル酸', reading: 'asechiru sarichiru-san', meaning: { en: 'Acetylsalicylic acid (aspirin)', 'zh-tw': '乙醯水楊酸・阿斯匹靈 (Aspirin)', 'zh-cn': '乙酰水杨酸・阿司匹林 (Aspirin)', ko: '아세틸살리실산・아스피린 (Aspirin)', de: 'Acetylsalicylsäure (Aspirin)', fr: 'Acide acétylsalicylique (Aspirin)', it: 'Acido acetilsalicilico (Aspirin)', es: 'Ácido acetilsalicílico (Aspirin)' } },
    ],
  },
  cold: {
    intro: { en: 'Words you may see on boxes of cold, cough and throat products.', 'zh-tw': '感冒、咳嗽、喉嚨用藥包裝上常見的字詞。', 'zh-cn': '感冒、咳嗽、喉咙用药包装上常见的词语。', ko: '감기・기침・목 관련 제품 상자에서 볼 수 있는 말.', de: 'Wörter, die Sie auf Packungen von Erkältungs-, Husten- und Halsprodukten sehen können.', fr: 'Mots que vous pouvez voir sur les boîtes de produits pour le rhume, la toux et la gorge.', it: 'Parole che puoi trovare sulle confezioni di prodotti per raffreddore, tosse e gola.', es: 'Palabras que puede ver en las cajas de productos para el resfriado, la tos y la garganta.', ja: 'かぜ薬・せき止め・のどの薬の箱によく書いてある言葉と英語の対訳。' },
    words: [
      { ja: '総合かぜ薬', reading: 'sōgō kazegusuri', meaning: { en: 'Multi-symptom cold medicine', 'zh-tw': '綜合感冒藥', 'zh-cn': '综合感冒药', ko: '종합감기약', de: 'Kombinations-Erkältungsmittel', fr: 'Médicament contre le rhume multisymptôme', it: 'Farmaco multisintomo per il raffreddore', es: 'Medicamento multisíntoma para el resfriado' } },
      { ja: 'せき止め', reading: 'sekidome', meaning: { en: 'Cough suppressant', 'zh-tw': '止咳藥', 'zh-cn': '止咳药', ko: '기침약', de: 'Hustenstiller', fr: 'Antitussif', it: 'Sedativo della tosse', es: 'Antitusivo' } },
      { ja: 'のど', reading: 'nodo', meaning: { en: 'Throat', 'zh-tw': '喉嚨', 'zh-cn': '喉咙', ko: '목', de: 'Hals', fr: 'Gorge', it: 'Gola', es: 'Garganta' } },
      { ja: '鼻炎', reading: 'bien', meaning: { en: 'Nasal (rhinitis)', 'zh-tw': '鼻炎', 'zh-cn': '鼻炎', ko: '비염', de: 'Nase (Rhinitis)', fr: 'Nez (rhinite)', it: 'Naso (rinite)', es: 'Nariz (rinitis)' } },
      { ja: 'たん', reading: 'tan', meaning: { en: 'Phlegm', 'zh-tw': '痰', 'zh-cn': '痰', ko: '가래', de: 'Schleim', fr: 'Mucosités', it: 'Catarro', es: 'Flema' } },
      { ja: 'トローチ', reading: 'torōchi', meaning: { en: 'Lozenge', 'zh-tw': '喉糖錠', 'zh-cn': '含片', ko: '트로키', de: 'Lutschtablette', fr: 'Pastille', it: 'Pastiglia', es: 'Pastilla para chupar' } },
    ],
    ingredients: [
      { ja: 'デキストロメトルファン', reading: 'dekisutorometorufan', meaning: { en: 'Dextromethorphan', 'zh-tw': '右美沙芬 (Dextromethorphan)', 'zh-cn': '右美沙芬 (Dextromethorphan)', ko: '덱스트로메토르판 (Dextromethorphan)', de: 'Dextromethorphan', fr: 'Dextrométhorphane (Dextromethorphan)', it: 'Destrometorfano (Dextromethorphan)', es: 'Dextrometorfano (Dextromethorphan)' } },
      { ja: 'クロルフェニラミン', reading: 'kurorufeniramin', meaning: { en: 'Chlorpheniramine', 'zh-tw': '氯苯那敏 (Chlorpheniramine)', 'zh-cn': '氯苯那敏 (Chlorpheniramine)', ko: '클로르페니라민 (Chlorpheniramine)', de: 'Chlorphenamin (Chlorpheniramine)', fr: 'Chlorphénamine (Chlorpheniramine)', it: 'Clorfenamina (Chlorpheniramine)', es: 'Clorfenamina (Chlorpheniramine)' } },
      { ja: 'グアイフェネシン', reading: 'guaifeneshin', meaning: { en: 'Guaifenesin', 'zh-tw': '愈創木酚甘油醚 (Guaifenesin)', 'zh-cn': '愈创甘油醚 (Guaifenesin)', ko: '구아이페네신 (Guaifenesin)', de: 'Guaifenesin', fr: 'Guaïfénésine (Guaifenesin)', it: 'Guaifenesina (Guaifenesin)', es: 'Guaifenesina (Guaifenesin)' } },
    ],
  },
  stomach: {
    intro: { en: 'Words you may see on boxes of stomach and digestive products.', 'zh-tw': '腸胃藥包裝上常見的字詞。', 'zh-cn': '肠胃药包装上常见的词语。', ko: '위장약 상자에서 볼 수 있는 말.', de: 'Wörter, die Sie auf Packungen von Magen- und Verdauungsprodukten sehen können.', fr: 'Mots que vous pouvez voir sur les boîtes de produits pour l’estomac et la digestion.', it: 'Parole che puoi trovare sulle confezioni di prodotti per stomaco e digestione.', es: 'Palabras que puede ver en las cajas de productos para el estómago y la digestión.', ja: '胃腸薬の箱によく書いてある言葉と英語の対訳。' },
    words: [
      { ja: '胃腸薬', reading: 'ichōyaku', meaning: { en: 'Stomach / digestive medicine', 'zh-tw': '腸胃藥', 'zh-cn': '肠胃药', ko: '위장약', de: 'Magen-Darm-Mittel', fr: 'Médicament pour l’estomac / la digestion', it: 'Farmaco per stomaco / digestione', es: 'Medicamento para el estómago / digestivo' } },
      { ja: '整腸', reading: 'seichō', meaning: { en: 'Intestinal regulation', 'zh-tw': '整腸', 'zh-cn': '整肠', ko: '정장(장 조절)', de: 'Darmregulierung', fr: 'Régulation intestinale', it: 'Regolazione intestinale', es: 'Regulación intestinal' } },
      { ja: '下痢止め', reading: 'geridome', meaning: { en: 'Anti-diarrheal', 'zh-tw': '止瀉藥', 'zh-cn': '止泻药', ko: '지사제', de: 'Mittel gegen Durchfall', fr: 'Antidiarrhéique', it: 'Antidiarroico', es: 'Antidiarreico' } },
      { ja: '便秘薬', reading: 'benpiyaku', meaning: { en: 'Laxative', 'zh-tw': '便秘藥', 'zh-cn': '通便药', ko: '변비약', de: 'Abführmittel', fr: 'Laxatif', it: 'Lassativo', es: 'Laxante' } },
      { ja: '酔い止め', reading: 'yoidome', meaning: { en: 'Motion sickness', 'zh-tw': '暈車藥', 'zh-cn': '晕车药', ko: '멀미약', de: 'Reisekrankheit', fr: 'Mal des transports', it: 'Mal di viaggio', es: 'Mareo' } },
      { ja: '胸やけ', reading: 'muneyake', meaning: { en: 'Heartburn', 'zh-tw': '胃灼熱', 'zh-cn': '烧心', ko: '속쓰림', de: 'Sodbrennen', fr: 'Brûlures d’estomac', it: 'Bruciore di stomaco', es: 'Acidez' } },
    ],
    ingredients: [
      { ja: 'ロペラミド', reading: 'roperamido', meaning: { en: 'Loperamide', 'zh-tw': '洛哌丁胺 (Loperamide)', 'zh-cn': '洛哌丁胺 (Loperamide)', ko: '로페라미드 (Loperamide)', de: 'Loperamid (Loperamide)', fr: 'Lopéramide (Loperamide)', it: 'Loperamide', es: 'Loperamida (Loperamide)' } },
      { ja: 'ファモチジン', reading: 'famochijin', meaning: { en: 'Famotidine', 'zh-tw': '法莫替丁 (Famotidine)', 'zh-cn': '法莫替丁 (Famotidine)', ko: '파모티딘 (Famotidine)', de: 'Famotidin (Famotidine)', fr: 'Famotidine', it: 'Famotidina (Famotidine)', es: 'Famotidina (Famotidine)' } },
      { ja: 'ビフィズス菌', reading: 'bifizusu-kin', meaning: { en: 'Bifidobacteria', 'zh-tw': '比菲德氏菌 (Bifidobacteria)', 'zh-cn': '双歧杆菌 (Bifidobacteria)', ko: '비피더스균 (Bifidobacteria)', de: 'Bifidobakterien (Bifidobacteria)', fr: 'Bifidobactéries (Bifidobacteria)', it: 'Bifidobatteri (Bifidobacteria)', es: 'Bifidobacterias (Bifidobacteria)' } },
    ],
  },
  skin: {
    intro: { en: 'Words you may see on patches, creams and first-aid products.', 'zh-tw': '貼布、乳膏及急救用品上常見的字詞。', 'zh-cn': '贴剂、乳膏及急救用品上常见的词语。', ko: '파스・연고・구급용품에서 볼 수 있는 말.', de: 'Wörter, die Sie auf Pflastern, Cremes und Erste-Hilfe-Produkten sehen können.', fr: 'Mots que vous pouvez voir sur les patchs, les crèmes et les produits de premiers secours.', it: 'Parole che puoi trovare su cerotti, creme e prodotti di primo soccorso.', es: 'Palabras que puede ver en parches, cremas y productos de primeros auxilios.', ja: '湿布・塗り薬・救急用品によく書いてある言葉と英語の対訳。' },
    words: [
      { ja: '湿布', reading: 'shippu', meaning: { en: 'Medicated patch / poultice', 'zh-tw': '藥用貼布', 'zh-cn': '药用贴剂', ko: '파스(습포제)', de: 'Wirkstoffpflaster / Umschlag', fr: 'Patch médicamenteux / cataplasme', it: 'Cerotto medicato / impacco', es: 'Parche medicado / cataplasma' } },
      { ja: '塗り薬', reading: 'nurigusuri', meaning: { en: 'Ointment / cream', 'zh-tw': '外用藥膏', 'zh-cn': '外用药膏', ko: '연고・크림', de: 'Salbe / Creme', fr: 'Pommade / crème', it: 'Pomata / crema', es: 'Pomada / crema' } },
      { ja: 'かゆみ止め', reading: 'kayumidome', meaning: { en: 'Anti-itch', 'zh-tw': '止癢', 'zh-cn': '止痒', ko: '가려움 완화', de: 'Gegen Juckreiz', fr: 'Antidémangeaisons', it: 'Antiprurito', es: 'Antipicor' } },
      { ja: '虫さされ', reading: 'mushisasare', meaning: { en: 'Insect bites', 'zh-tw': '蚊蟲咬傷', 'zh-cn': '蚊虫叮咬', ko: '벌레 물림', de: 'Insektenstiche', fr: 'Piqûres d’insectes', it: 'Punture d’insetto', es: 'Picaduras de insectos' } },
      { ja: '絆創膏', reading: 'bansōkō', meaning: { en: 'Adhesive bandage', 'zh-tw': 'OK繃', 'zh-cn': '创可贴', ko: '반창고', de: 'Pflaster', fr: 'Pansement adhésif', it: 'Cerotto', es: 'Tirita' } },
      { ja: '消毒', reading: 'shōdoku', meaning: { en: 'Disinfectant', 'zh-tw': '消毒', 'zh-cn': '消毒', ko: '소독', de: 'Desinfektionsmittel', fr: 'Désinfectant', it: 'Disinfettante', es: 'Desinfectante' } },
    ],
    ingredients: [
      { ja: 'インドメタシン', reading: 'indometashin', meaning: { en: 'Indomethacin', 'zh-tw': '吲哚美辛 (Indomethacin)', 'zh-cn': '吲哚美辛 (Indomethacin)', ko: '인도메타신 (Indomethacin)', de: 'Indometacin (Indomethacin)', fr: 'Indométacine (Indomethacin)', it: 'Indometacina (Indomethacin)', es: 'Indometacina (Indomethacin)' } },
      { ja: 'フェルビナク', reading: 'ferubinaku', meaning: { en: 'Felbinac', 'zh-tw': '聯苯乙酸 (Felbinac)', 'zh-cn': '联苯乙酸 (Felbinac)', ko: '펠비낙 (Felbinac)', de: 'Felbinac', fr: 'Felbinac', it: 'Felbinac', es: 'Felbinaco (Felbinac)' } },
      { ja: 'サリチル酸メチル', reading: 'sarichiru-san mechiru', meaning: { en: 'Methyl salicylate', 'zh-tw': '水楊酸甲酯 (Methyl salicylate)', 'zh-cn': '水杨酸甲酯 (Methyl salicylate)', ko: '살리실산메틸 (Methyl salicylate)', de: 'Methylsalicylat (Methyl salicylate)', fr: 'Salicylate de méthyle (Methyl salicylate)', it: 'Salicilato di metile (Methyl salicylate)', es: 'Salicilato de metilo (Methyl salicylate)' } },
      { ja: 'ジフェンヒドラミン', reading: 'jifenhidoramin', meaning: { en: 'Diphenhydramine', 'zh-tw': '苯海拉明 (Diphenhydramine)', 'zh-cn': '苯海拉明 (Diphenhydramine)', ko: '디펜히드라민 (Diphenhydramine)', de: 'Diphenhydramin (Diphenhydramine)', fr: 'Diphénhydramine (Diphenhydramine)', it: 'Difenidramina (Diphenhydramine)', es: 'Difenhidramina (Diphenhydramine)' } },
    ],
  },
  eye: {
    intro: { en: 'Words you may see on eye drops and allergy products.', 'zh-tw': '眼藥水及過敏用藥上常見的字詞。', 'zh-cn': '眼药水及过敏用药上常见的词语。', ko: '안약・알레르기 제품에서 볼 수 있는 말.', de: 'Wörter, die Sie auf Augentropfen und Allergieprodukten sehen können.', fr: 'Mots que vous pouvez voir sur les collyres et les produits contre les allergies.', it: 'Parole che puoi trovare su colliri e prodotti per le allergie.', es: 'Palabras que puede ver en colirios y productos para la alergia.', ja: '目薬・アレルギーの薬によく書いてある言葉と英語の対訳。' },
    words: [
      { ja: '目薬', reading: 'megusuri', meaning: { en: 'Eye drops', 'zh-tw': '眼藥水', 'zh-cn': '眼药水', ko: '안약', de: 'Augentropfen', fr: 'Collyre', it: 'Collirio', es: 'Colirio' } },
      { ja: '点眼', reading: 'tengan', meaning: { en: 'Instill into the eye', 'zh-tw': '點眼', 'zh-cn': '滴眼', ko: '점안', de: 'Ins Auge eintropfen', fr: 'Instiller dans l’œil', it: 'Instillare nell’occhio', es: 'Aplicar en el ojo' } },
      { ja: 'コンタクト', reading: 'kontakuto', meaning: { en: 'Contact lenses', 'zh-tw': '隱形眼鏡', 'zh-cn': '隐形眼镜', ko: '콘택트렌즈', de: 'Kontaktlinsen', fr: 'Lentilles de contact', it: 'Lenti a contatto', es: 'Lentes de contacto' } },
      { ja: '花粉', reading: 'kafun', meaning: { en: 'Pollen', 'zh-tw': '花粉', 'zh-cn': '花粉', ko: '꽃가루', de: 'Pollen', fr: 'Pollen', it: 'Polline', es: 'Polen' } },
      { ja: '抗アレルギー', reading: 'kō-arerugī', meaning: { en: 'Anti-allergy', 'zh-tw': '抗過敏', 'zh-cn': '抗过敏', ko: '항알레르기', de: 'Antiallergisch', fr: 'Antiallergique', it: 'Antiallergico', es: 'Antialérgico' } },
    ],
    ingredients: [
      { ja: 'フェキソフェナジン', reading: 'fekisofenajin', meaning: { en: 'Fexofenadine', 'zh-tw': '非索非那定 (Fexofenadine)', 'zh-cn': '非索非那定 (Fexofenadine)', ko: '펙소페나딘 (Fexofenadine)', de: 'Fexofenadin (Fexofenadine)', fr: 'Fexofénadine (Fexofenadine)', it: 'Fexofenadina (Fexofenadine)', es: 'Fexofenadina (Fexofenadine)' } },
      { ja: 'クロモグリク酸', reading: 'kuromoguriku-san', meaning: { en: 'Cromoglicic acid', 'zh-tw': '色甘酸 (Cromoglicic acid)', 'zh-cn': '色甘酸 (Cromoglicic acid)', ko: '크로모글리크산 (Cromoglicic acid)', de: 'Cromoglicinsäure (Cromoglicic acid)', fr: 'Acide cromoglicique (Cromoglicic acid)', it: 'Acido cromoglicico (Cromoglicic acid)', es: 'Ácido cromoglícico (Cromoglicic acid)' } },
      { ja: 'ケトチフェン', reading: 'ketochifen', meaning: { en: 'Ketotifen', 'zh-tw': '酮替芬 (Ketotifen)', 'zh-cn': '酮替芬 (Ketotifen)', ko: '케토티펜 (Ketotifen)', de: 'Ketotifen', fr: 'Kétotifène (Ketotifen)', it: 'Ketotifene (Ketotifen)', es: 'Ketotifeno (Ketotifen)' } },
    ],
  },
};
