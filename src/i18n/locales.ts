// 画面の言語（UI 言語）。店員向けの日本語はどの言語のページでも必ず併記する。
// 中国語・韓国語を足すときは、ここに追加して各データの Localized に訳を書くだけでページが増える。
export const locales = [
  { code: 'en', label: 'English', hreflang: 'en' },
  // 日本語: 喫煙所ファインダーは日本人の利用も多いので生成する（2026-10-07 ユーザー決定）。
  { code: 'ja', label: '日本語', hreflang: 'ja' },
  // ほかは japanrockbar と同じ9言語・同じ並び（2026-10-08 ユーザー決定。全ページ多言語、基本は英語）。
  { code: 'ko', label: '한국어', hreflang: 'ko' },
  { code: 'zh-tw', label: '繁體中文', hreflang: 'zh-Hant' },
  { code: 'zh-cn', label: '简体中文', hreflang: 'zh-Hans' },
  { code: 'de', label: 'Deutsch', hreflang: 'de' },
  { code: 'fr', label: 'Français', hreflang: 'fr' },
  { code: 'it', label: 'Italiano', hreflang: 'it' },
  { code: 'es', label: 'Español', hreflang: 'es' },
] as const;

export type Lang = (typeof locales)[number]['code'];
/** 将来の言語も含めた、訳を書ける言語。 */
export type AnyLang = (typeof locales)[number]['code'];
export const defaultLang: Lang = 'en';

/** 日本語（店員向け・必須）＋英語（必須）＋将来の言語（任意）。 */
export type Localized = { ja: string; en: string } & Partial<Record<Exclude<AnyLang, 'en' | 'ja'>, string>>;

/** 日本語を併記しない文（説明文など）。 */
export type Translation = Omit<Localized, 'ja'> & { ja?: string };

/** UI 言語の文字列。訳がなければ英語にフォールバックする。 */
export const tr = (text: Translation, lang: AnyLang): string => text[lang] ?? text.en;

export const getLocale = (code: Lang) => locales.find((l) => l.code === code)!;
/** getStaticPaths 用。langs を渡すとその言語だけ生成する。 */
export const langPaths = (langs: readonly Lang[] = locales.map((l) => l.code)) => langs.map((lang) => ({ params: { lang } }));
