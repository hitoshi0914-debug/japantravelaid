import type { Translation } from '../i18n/locales';

// 薬の箱によく書いてある言葉の早見表。意味の対訳だけ（効き目の説明・推奨はしない）。
export interface BoxWord {
  ja: string;
  reading: string;
  meaning: Translation;
}

/** どの薬にも出てくる言葉。 */
export const commonWords: BoxWord[] = [
  { ja: '効能・効果', reading: 'kōnō kōka', meaning: { en: 'Indications (what it is approved for)' } },
  { ja: '用法・用量', reading: 'yōhō yōryō', meaning: { en: 'Directions and dosage' } },
  { ja: '成分', reading: 'seibun', meaning: { en: 'Ingredients' } },
  { ja: '使用上の注意', reading: 'shiyōjō no chūi', meaning: { en: 'Precautions' } },
  { ja: '1日3回', reading: 'ichinichi sankai', meaning: { en: '3 times a day' } },
  { ja: '食後', reading: 'shokugo', meaning: { en: 'After meals' } },
  { ja: '食前', reading: 'shokuzen', meaning: { en: 'Before meals' } },
  { ja: '1回2錠', reading: 'ikkai nijō', meaning: { en: '2 tablets per dose' } },
  { ja: '15才以上', reading: 'jūgo-sai ijō', meaning: { en: 'Age 15 and over' } },
  { ja: '服用しないこと', reading: 'fukuyō shinai koto', meaning: { en: 'Do not take' } },
  { ja: '眠気', reading: 'nemuke', meaning: { en: 'Drowsiness' } },
  { ja: '外用', reading: 'gaiyō', meaning: { en: 'For external use only' } },
  { ja: '第1類医薬品', reading: 'dai-ichirui iyakuhin', meaning: { en: 'Class 1 OTC — sold only when a pharmacist is present' } },
  { ja: '指定第2類医薬品', reading: 'shitei dai-nirui', meaning: { en: 'Designated Class 2 OTC — ask staff about precautions' } },
  { ja: '第2類医薬品', reading: 'dai-nirui', meaning: { en: 'Class 2 OTC' } },
  { ja: '第3類医薬品', reading: 'dai-sanrui', meaning: { en: 'Class 3 OTC' } },
];

export interface CategoryInfo {
  intro: Translation;
  words: BoxWord[];
  /** 箱に書いてある主な成分名（カタカナ ↔ 英語の一般名）。 */
  ingredients: BoxWord[];
}

export const categoryInfo: Record<string, CategoryInfo> = {
  pain: {
    intro: { en: 'Words you may see on boxes of fever and pain relievers.' },
    words: [
      { ja: '解熱鎮痛薬', reading: 'genetsu chintsūyaku', meaning: { en: 'Fever and pain reliever' } },
      { ja: '頭痛', reading: 'zutsū', meaning: { en: 'Headache' } },
      { ja: '生理痛', reading: 'seiritsū', meaning: { en: 'Period pain' } },
      { ja: '歯痛', reading: 'shitsū', meaning: { en: 'Toothache' } },
      { ja: '発熱', reading: 'hatsunetsu', meaning: { en: 'Fever' } },
    ],
    ingredients: [
      { ja: 'ロキソプロフェン', reading: 'rokisopurofen', meaning: { en: 'Loxoprofen' } },
      { ja: 'イブプロフェン', reading: 'ibupurofen', meaning: { en: 'Ibuprofen' } },
      { ja: 'アセトアミノフェン', reading: 'asetoaminofen', meaning: { en: 'Acetaminophen (paracetamol)' } },
      { ja: 'アセチルサリチル酸', reading: 'asechiru sarichiru-san', meaning: { en: 'Acetylsalicylic acid (aspirin)' } },
    ],
  },
  cold: {
    intro: { en: 'Words you may see on boxes of cold, cough and throat products.' },
    words: [
      { ja: '総合かぜ薬', reading: 'sōgō kazegusuri', meaning: { en: 'Multi-symptom cold medicine' } },
      { ja: 'せき止め', reading: 'sekidome', meaning: { en: 'Cough suppressant' } },
      { ja: 'のど', reading: 'nodo', meaning: { en: 'Throat' } },
      { ja: '鼻炎', reading: 'bien', meaning: { en: 'Nasal (rhinitis)' } },
      { ja: 'たん', reading: 'tan', meaning: { en: 'Phlegm' } },
      { ja: 'トローチ', reading: 'torōchi', meaning: { en: 'Lozenge' } },
    ],
    ingredients: [
      { ja: 'デキストロメトルファン', reading: 'dekisutorometorufan', meaning: { en: 'Dextromethorphan' } },
      { ja: 'クロルフェニラミン', reading: 'kurorufeniramin', meaning: { en: 'Chlorpheniramine' } },
      { ja: 'グアイフェネシン', reading: 'guaifeneshin', meaning: { en: 'Guaifenesin' } },
    ],
  },
  stomach: {
    intro: { en: 'Words you may see on boxes of stomach and digestive products.' },
    words: [
      { ja: '胃腸薬', reading: 'ichōyaku', meaning: { en: 'Stomach / digestive medicine' } },
      { ja: '整腸', reading: 'seichō', meaning: { en: 'Intestinal regulation' } },
      { ja: '下痢止め', reading: 'geridome', meaning: { en: 'Anti-diarrheal' } },
      { ja: '便秘薬', reading: 'benpiyaku', meaning: { en: 'Laxative' } },
      { ja: '酔い止め', reading: 'yoidome', meaning: { en: 'Motion sickness' } },
      { ja: '胸やけ', reading: 'muneyake', meaning: { en: 'Heartburn' } },
    ],
    ingredients: [
      { ja: 'ロペラミド', reading: 'roperamido', meaning: { en: 'Loperamide' } },
      { ja: 'ファモチジン', reading: 'famochijin', meaning: { en: 'Famotidine' } },
      { ja: 'ビフィズス菌', reading: 'bifizusu-kin', meaning: { en: 'Bifidobacteria' } },
    ],
  },
  skin: {
    intro: { en: 'Words you may see on patches, creams and first-aid products.' },
    words: [
      { ja: '湿布', reading: 'shippu', meaning: { en: 'Medicated patch / poultice' } },
      { ja: '塗り薬', reading: 'nurigusuri', meaning: { en: 'Ointment / cream' } },
      { ja: 'かゆみ止め', reading: 'kayumidome', meaning: { en: 'Anti-itch' } },
      { ja: '虫さされ', reading: 'mushisasare', meaning: { en: 'Insect bites' } },
      { ja: '絆創膏', reading: 'bansōkō', meaning: { en: 'Adhesive bandage' } },
      { ja: '消毒', reading: 'shōdoku', meaning: { en: 'Disinfectant' } },
    ],
    ingredients: [
      { ja: 'インドメタシン', reading: 'indometashin', meaning: { en: 'Indomethacin' } },
      { ja: 'フェルビナク', reading: 'ferubinaku', meaning: { en: 'Felbinac' } },
      { ja: 'サリチル酸メチル', reading: 'sarichiru-san mechiru', meaning: { en: 'Methyl salicylate' } },
      { ja: 'ジフェンヒドラミン', reading: 'jifenhidoramin', meaning: { en: 'Diphenhydramine' } },
    ],
  },
  eye: {
    intro: { en: 'Words you may see on eye drops and allergy products.' },
    words: [
      { ja: '目薬', reading: 'megusuri', meaning: { en: 'Eye drops' } },
      { ja: '点眼', reading: 'tengan', meaning: { en: 'Instill into the eye' } },
      { ja: 'コンタクト', reading: 'kontakuto', meaning: { en: 'Contact lenses' } },
      { ja: '花粉', reading: 'kafun', meaning: { en: 'Pollen' } },
      { ja: '抗アレルギー', reading: 'kō-arerugī', meaning: { en: 'Anti-allergy' } },
    ],
    ingredients: [
      { ja: 'フェキソフェナジン', reading: 'fekisofenajin', meaning: { en: 'Fexofenadine' } },
      { ja: 'クロモグリク酸', reading: 'kuromoguriku-san', meaning: { en: 'Cromoglicic acid' } },
      { ja: 'ケトチフェン', reading: 'ketochifen', meaning: { en: 'Ketotifen' } },
    ],
  },
};
