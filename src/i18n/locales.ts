// 画面の言語（UI 言語）。店員向けの日本語はどの言語のページでも必ず併記する。
// 中国語・韓国語を足すときは、ここに追加して各データの Localized に訳を書くだけでページが増える。
export const locales = [
  { code: 'en', label: 'English', hreflang: 'en' },
  // 日本語: 喫煙所ファインダーは日本人の利用も多いので生成する（2026-10-07 ユーザー決定）。市販薬ガイドは英語だけ（tools.ts の langs）。
  { code: 'ja', label: '日本語', hreflang: 'ja' },
  // 中国語・韓国語: 全ページ多言語化（2026-10-08 ユーザー決定。基本は英語）。市販薬ガイドは英語だけのまま。
  { code: 'zh-tw', label: '繁體中文', hreflang: 'zh-Hant' },
  { code: 'zh-cn', label: '简体中文', hreflang: 'zh-Hans' },
  { code: 'ko', label: '한국어', hreflang: 'ko' },
] as const;

export type Lang = (typeof locales)[number]['code'];
/** 将来の言語も含めた、訳を書ける言語。 */
export type AnyLang = 'en' | 'ja' | 'zh-cn' | 'zh-tw' | 'ko';
export const defaultLang: Lang = 'en';

/** 日本語（店員向け・必須）＋英語（必須）＋将来の言語（任意）。 */
export type Localized = { ja: string; en: string } & Partial<Record<Exclude<AnyLang, 'en' | 'ja'>, string>>;

/** 日本語を併記しない文（説明文など）。 */
export type Translation = Omit<Localized, 'ja'> & { ja?: string };

/** UI 言語の文字列。訳がなければ英語にフォールバックする。 */
export const tr = (text: Translation, lang: AnyLang): string => text[lang] ?? text.en;

export const getLocale = (code: Lang) => locales.find((l) => l.code === code)!;
/** getStaticPaths 用。langs を渡すとその言語だけ生成する（例: 市販薬ガイドは ['en']）。 */
export const langPaths = (langs: readonly Lang[] = locales.map((l) => l.code)) => langs.map((lang) => ({ params: { lang } }));
