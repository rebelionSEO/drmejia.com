// Cursor layer: a scripted mouse over cards, the band, a button and the footer. RECORD=1 films it; otherwise
// it runs at 4x CPU and reports frame times + long tasks.
const { chromium } = require('/Users/gerardom/Projects/motion-graphics/node_modules/playwright');
const fs = require('fs'); const REC = process.env.RECORD === '1';
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  const vp = { width: 1280, height: 800 };
  const ctx = await b.newContext(REC ? { viewport: vp, recordVideo: { dir: 'out/rec/tmp', size: vp } } : { viewport: vp, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {}
    window.__lt = []; window.__f = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(Math.round(e.duration)))).observe({ type: 'longtask', buffered: true });
    let last = 0; (function k(t) { if (last) window.__f.push(t - last); last = t; requestAnimationFrame(k); })(); });
  const p = await ctx.newPage();
  if (!REC) { const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 }); }
  const glide = (y0, y1, ms) => p.evaluate(([a, c, d]) => new Promise((res) => { const t0 = performance.now(); (function f(t) { const k = Math.min(1, (t - t0) / d), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; scrollTo(0, a + (c - a) * e); k < 1 ? requestAnimationFrame(f) : res(); })(t0); }), [y0, y1, ms]);
  const topOf = (sel, n = 0) => p.evaluate(([s, i]) => { const e = document.querySelectorAll(s)[i], r = e.getBoundingClientRect(); return Math.round(scrollY + r.top - (innerHeight - r.height) / 2); }, [sel, n]);
  const path = async (pts, steps = 30, pause = 120) => { for (const [x, y] of pts) { await p.mouse.move(x, y, { steps }); await p.waitForTimeout(pause); } };
  const results = [];
  for (const pg of ['tamizaje', 'servicios']) {
    await p.goto(`http://127.0.0.1:8770/${pg}/`, { waitUntil: 'networkidle' }); await p.mouse.move(640, 120); await p.waitForTimeout(900);
    await p.evaluate(() => { window.__f = []; window.__lt = []; });
    const cardsY = await topOf(pg === 'servicios' ? '.services-grid' : 'main .card', 0);
    await glide(0, cardsY, 2000); await p.waitForTimeout(1200);
    const cards = await p.evaluate(() => Array.from(document.querySelectorAll('main .card')).map((e) => e.getBoundingClientRect()).filter((r) => r.top > 0 && r.bottom < innerHeight).slice(0, 4).map((r) => [r.left + r.width / 2, r.top + r.height / 2, r.width, r.height]));
    for (const [cx, cy, w, h] of cards) await path([[cx - w * 0.35, cy - h * 0.3], [cx + w * 0.35, cy + h * 0.25], [cx, cy]], 26, 80);
    if (pg === 'tamizaje') {
      const bandY = await topOf('main .home-cta-section'); await glide(await p.evaluate(() => scrollY), bandY, 1800); await p.waitForTimeout(800);
      const bb = await p.locator('main .home-cta-section').boundingBox(), y = bb.y + bb.height * 0.5;
      await path([[80, y - 40], [400, y + 30], [700, y - 60], [1000, y + 20], [1220, y - 30], [900, y + 40], [300, y]], 45, 60);
      const btn = await p.locator('main .home-cta-section .btn').first().boundingBox();
      await path([[btn.x - 60, btn.y + btn.height + 40], [btn.x + btn.width / 2 - 20, btn.y + btn.height + 18], [btn.x + btn.width + 50, btn.y + 10]], 30, 300);
      const fY = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight); await glide(await p.evaluate(() => scrollY), fY, 1800); await p.waitForTimeout(500);
      const fb = await p.locator('.site-footer').boundingBox(), fy = fb.y + fb.height * 0.42;
      await path([[60, fy], [500, fy + 40], [900, fy - 50], [1240, fy]], 50, 60); await p.waitForTimeout(800);
    }
    results.push([pg, await p.evaluate(() => { const f = window.__f.slice().sort((a, b) => a - b); return { frames: f.length, p50: f[f.length >> 1].toFixed(1), p95: f[Math.floor(f.length * 0.95)].toFixed(1), longtasks: window.__lt }; })]);
  }
  if (REC) { const vid = p.video(); await ctx.close(); fs.renameSync(await vid.path(), 'out/rec/cursor-d.webm'); console.log('recorded'); }
  else results.forEach(([pg, r]) => console.log(pg, '4x CPU', JSON.stringify(r)));
  await b.close();
})();
