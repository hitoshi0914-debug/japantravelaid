// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import serviceWorker from './integrations/service-worker.mjs';

// Japan Travel Aid: 訪日客向けツールを1つのサイト（1つの PWA）にまとめる。
// /en/ がツールの入口、各ツールは /en/medicine/・/en/smoking/ のようにパスで分ける。
export default defineConfig({
  // 公開 URL（canonical・hreflang・sitemap の絶対 URL）。ドメインを Cloudflare に接続するまでは workers.dev で動く。
  site: 'https://japantravelaid.com',
  trailingSlash: 'always',
  // 操作が必要な部分だけ React の島にする（指差しカード・喫煙所の地図）。
  integrations: [react(), serviceWorker()],
  // Tailwind は喫煙所ファインダーのページだけが読み込む（src/styles/smoking.css）。
  vite: { plugins: [tailwindcss()] },
});
