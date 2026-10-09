// 「使い方」ページ用の画面写真を作る（薬剤師カードの実際の画面。押す場所を赤い枠で囲む）。
// 使い方: npm run build → npx astro preview --port 4329 を起動したまま
//   node scripts/howto/make_shots.mjs [playwright の index.mjs のパス]
// 出力: public/howto/<言語>-<1〜6>.jpg
const pw = process.argv[2] ?? 'playwright';
const { chromium } = await import(pw);
const LANGS = ['en', 'ja', 'ko', 'zh-tw', 'zh-cn', 'de', 'fr', 'it', 'es'];
const BASE = 'http://localhost:4329';
const MARK = '.howto-mark{outline:4px solid #e11d48!important;outline-offset:3px!important;border-radius:12px}';
const browser = await chromium.launch();
for (const lang of LANGS) {
  const page = await browser.newPage({ viewport: { width: 390, height: 760 }, deviceScaleFactor: 1.5 });
  await page.addInitScript(() => localStorage.clear());
  await page.goto(`${BASE}/${lang}/medicine/pharmacist/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => !document.querySelector('astro-island[ssr]'));
  await page.addStyleTag({ content: `.consent{display:none!important}${MARK}` });
  const mark = (loc) => loc.evaluateAll((els) => els.forEach((el) => el.classList.add('howto-mark')));
  const unmark = () => page.evaluate(() => document.querySelectorAll('.howto-mark').forEach((el) => el.classList.remove('howto-mark')));
  const shot = (n) => page.screenshot({ path: `public/howto/${lang}-${n}.jpg`, type: 'jpeg', quality: 72 });
  const groups = page.locator('fieldset.group');

  // 1. 当てはまるものをタップ（だれ → 本人、症状 → 頭痛・発熱）
  await groups.nth(0).locator('.chip').nth(0).click();
  const sym = groups.nth(1).locator('.chip');
  await sym.nth(0).click();
  await sym.nth(1).click();
  await groups.nth(0).evaluate((el) => el.scrollIntoView({ block: 'start' }));
  await page.evaluate(() => window.scrollBy(0, -130));
  await mark(page.locator('.chip.is-selected'));
  await shot(1);
  await unmark();

  // 2. 「カードを見せる」を押す
  await mark(page.locator('.select-actions .btn-primary'));
  await shot(2);
  await unmark();
  await page.locator('.select-actions .btn-primary').click();
  await page.waitForSelector('.card-screen');

  // 3. 大きな日本語のカードを店員に見せる
  await shot(3);

  // 4. 店員が質問を指差してタップ（例: 薬のアレルギー）
  const q = page.locator('.answer-btn', { hasText: '薬のアレルギー' });
  await q.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await mark(q);
  await shot(4);
  await unmark();
  await q.click();

  // 5. 質問があなたの言葉でも出る → 答えをタップ
  const focused = page.locator('.answer--focused');
  await focused.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await mark(page.locator('.reply-btn'));
  await shot(5);
  await unmark();

  // 6. 答えが日本語で大きく出る → 店員が読む
  await page.locator('.reply-btn').nth(1).click();
  await focused.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await mark(page.locator('.answer-reply'));
  await shot(6);
  await page.close();
}
await browser.close();
