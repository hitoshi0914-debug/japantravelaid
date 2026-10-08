import type { APIRoute } from 'astro';
import { adsensePubId } from '../lib/adsense';

// AdSense の ads.txt。site.config に adsensePublisherId がないあいだは空のファイル。
export const GET: APIRoute = () =>
  new Response(adsensePubId ? `google.com, ${adsensePubId}, DIRECT, f08c47fec0942fa0\n` : '', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
