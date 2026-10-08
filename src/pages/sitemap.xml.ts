import type { APIRoute } from 'astro';
import { tiles } from '../data/categories';
import { langsForPath, tools } from '../data/tools';
import { locales } from '../i18n/locales';
import { MIN_INDEXABLE_SPOTS } from '../lib/smoking';
import { spotAreas } from '../lib/smokingData';

// 検索エンジン向けのサイトマップ（hreflang 付き）。そのページがある言語だけ載せる。
// 喫煙所の地域ページは件数が MIN_INDEXABLE_SPOTS 以上のものだけ。
export const GET: APIRoute = ({ site }) => {
  const paths = [
    '',
    ...tools.map((t) => t.path),
    ...tiles.map((t) => t.path),
    'smoking/areas/',
    ...spotAreas().filter((g) => g.spots.length >= MIN_INDEXABLE_SPOTS).map((g) => `smoking/${g.area.slug}/`),
    'about/',
    'privacy/',
  ];
  const url = (code: string, path: string) => new URL(`/${code}/${path}`, site).href;
  const entries = paths.flatMap((path) => {
    const langs = locales.filter((l) => langsForPath(path).includes(l.code));
    return langs.map((l) => {
      const alternates = langs
        .map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${url(alt.code, path)}"/>`)
        .join('\n');
      return `  <url>\n    <loc>${url(l.code, path)}</loc>\n${alternates}\n  </url>`;
    });
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
