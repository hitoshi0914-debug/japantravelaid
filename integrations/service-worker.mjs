// ビルド後に dist/ の全ファイルを列挙して dist/sw.js を生成する（PWA のオフライン対応）。
// 外部ライブラリを使わず、ページと _astro/ の資産を最初の訪問時にまとめてキャッシュする。
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKIP = new Set(['sw.js', '404.html', 'ads.txt', 'robots.txt', 'sitemap.xml']);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(path)));
    else out.push(path);
  }
  return out;
}

export default function serviceWorker() {
  return {
    name: 'otc-service-worker',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const root = fileURLToPath(dir);
        const files = (await walk(root))
          .map((f) => relative(root, f).split(sep).join('/'))
          // 喫煙所の地域ページは全国で数千になるので先読みしない（開いたページだけキャッシュされる）。
          .filter((f) => !SKIP.has(f) && !f.endsWith('.map') && !/^[a-z-]+\/smoking\/(?!areas\/)[^/]+\/index\.html$/.test(f));
        // index.html はディレクトリの URL（/en/pharmacist/）でキャッシュする。
        const urls = files.map((f) => '/' + f.replace(/(^|\/)index\.html$/, '$1')).sort();
        const hash = createHash('sha256');
        for (const f of files) hash.update(f).update(await readFile(join(root, f)));
        const version = hash.digest('hex').slice(0, 12);
        const template = await readFile(new URL('./sw.template.js', import.meta.url), 'utf8');
        const sw = template.replace('__VERSION__', version).replace('__PRECACHE__', JSON.stringify(urls, null, 2));
        await writeFile(join(root, 'sw.js'), sw);
      },
    },
  };
}
