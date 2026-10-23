import { chromium } from 'playwright';
import fs from 'node:fs';
fs.mkdirSync('/tmp/pw/probe', { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ geolocation: { latitude: 35.6896, longitude: 139.7006 }, permissions: ['geolocation'], locale: 'ja-JP', viewport: { width: 390, height: 844 } });
const p = await ctx.newPage();
const log = [];
p.on('response', async (r) => {
  const u = r.url(); const ct = r.headers()['content-type'] || '';
  const e = { type: r.request().resourceType(), url: u, status: r.status(), ct, method: r.request().method(), post: r.request().postData()?.slice(0, 800), reqHeaders: r.request().headers() };
  if (/json|text\/plain/.test(ct) || r.request().resourceType() === 'xhr' || r.request().resourceType() === 'fetch') { try { const t = await r.text(); e.size = t.length; e.sample = t.slice(0, 4000); } catch {} }
  log.push(e);
});
await p.goto('https://www.clubjt.jp/map/?date=20261023', { waitUntil: 'load', timeout: 90000 });
await p.waitForTimeout(25000);
await p.screenshot({ path: '/tmp/pw/probe/map.png' });
fs.writeFileSync('/tmp/pw/probe/requests.json', JSON.stringify(log, null, 1));
fs.writeFileSync('/tmp/pw/probe/rendered.txt', await p.evaluate(() => document.body.innerText));
await b.close();
