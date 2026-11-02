// Films each hero direction (desktop) with scripted pointer moves; one webm per direction.
const { chromium } = require('/Users/gerardom/Projects/motion-graphics/node_modules/playwright');
const sleep = (p, t) => p.waitForTimeout(t);
async function glide(p, from, to, ms) { const n = Math.round(ms / 16); for (let i = 1; i <= n; i++) { const t = i / n, e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; await p.mouse.move(from[0] + (to[0] - from[0]) * e, from[1] + (to[1] - from[1]) * e); await p.waitForTimeout(16); } return to; }
const DIRS = [
  ['1-consulta-A', '/servicios/', '.page-hero', async (p) => {
    const st = await p.evaluate(() => { const r = document.querySelector('.mx-stage').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
    const u = Math.min(st[2] / 12, st[3] / 8.4), cx = st[0] + st[2] / 2, cy = st[1] + st[3] / 2;
    const at = (x, y) => [cx + (x - 0.2) * u, cy - (y - 0.6) * u];
    let m = [cx - 200, cy + 260]; await p.mouse.move(...m); await sleep(p, 4600);
    m = await glide(p, m, at(2.6, -2.2), 900); await sleep(p, 1800);
    m = await glide(p, m, at(-4.4, 0.6), 1100); await sleep(p, 1800);
    m = await glide(p, m, at(1.5, 3.4), 900); await sleep(p, 1600);
  }],
  ['2-consulta-B', '/servicios/?dir=b', '.page-hero', async (p) => {
    const st = await p.evaluate(() => { const r = document.querySelector('.mx-stage').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
    let m = [st[0] + 40, st[1] + st[3] + 30]; await p.mouse.move(...m); await sleep(p, 4800);
    m = await glide(p, m, [st[0] + st[2] * 0.12, st[1] + st[3] * 0.18], 800); await sleep(p, 900);
    m = await glide(p, m, [st[0] + st[2] * 0.9, st[1] + st[3] * 0.45], 2200); await sleep(p, 500);
    m = await glide(p, m, [st[0] + st[2] * 0.5, st[1] + st[3] * 0.86], 1200); await sleep(p, 1600);
  }],
  ['3-tamizaje-A', '/tamizaje/', 'main .placeholder-block', async (p) => {
    const b = await p.locator('main .placeholder-block').boundingBox();
    let m = [b.x + b.width * 0.85, b.y + b.height * 0.5]; await p.mouse.move(...m); await sleep(p, 2600);
    m = await glide(p, m, [b.x + b.width * 0.5, b.y + b.height * 0.8], 900); await sleep(p, 2200);
    m = await glide(p, m, [b.x + b.width * 0.9, b.y + b.height * 0.4], 600);
    for (const k of [1, 2, 3, 4]) { await p.locator('.mx-tz-btn').nth(k).click(); await sleep(p, 2700); }
  }],
  ['4-tamizaje-B', '/tamizaje/?dir=b', 'main .placeholder-block', async (p) => {
    await sleep(p, 3000);
    for (const v of ['0', '1', '2', '3', '4', '1']) { await p.locator('#mx-tz-days').fill(v); await sleep(p, 1500); }
  }],
  ['5-adn-A', '/adn-fetal/', '.page-hero', async (p) => {
    const st = await p.evaluate(() => { const r = document.querySelector('.mx-stage').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
    let m = [st[0] + st[2] * 0.2, st[1] - 60]; await p.mouse.move(...m); await sleep(p, 3000);
    m = await glide(p, m, [st[0] + st[2] * 0.35, st[1] + st[3] * 0.5], 700);
    m = await glide(p, m, [st[0] + st[2] * 0.8, st[1] + st[3] * 0.45], 2600); await sleep(p, 2200);
  }],
  ['6-adn-B', '/adn-fetal/?dir=b', '.page-hero', async (p) => {
    await sleep(p, 3000);
    for (let i = 0; i < 30; i++) { await p.mouse.wheel(0, 14); await sleep(p, 60); }
    await sleep(p, 2200);
    for (let i = 0; i < 30; i++) { await p.mouse.wheel(0, -14); await sleep(p, 50); }
    await sleep(p, 1500);
  }]
];
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  for (const [name, url, sel, script] of DIRS) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, recordVideo: { dir: 'out/rec-heroes/raw-' + name, size: { width: 1440, height: 900 } } });
    await ctx.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {} });
    const p = await ctx.newPage();
    await p.goto('http://127.0.0.1:8770' + url, { waitUntil: 'domcontentloaded' });
    await p.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); scrollTo(0, Math.max(0, scrollY + r.top - (s.startsWith('main') ? 150 : 0))); }, sel);
    const t0 = Date.now();
    await script(p);
    console.log(name, ((Date.now() - t0) / 1000).toFixed(1) + 's');
    await ctx.close();
  }
  await b.close();
})();
