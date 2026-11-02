// Cost of the prototype layer per page: with vs without /proto/ files, 4x CPU throttle, mobile viewport.
const { chromium } = require('/Users/gerardom/Projects/motion-graphics/node_modules/playwright');
const pages = ['servicios', 'tamizaje', 'adn-fetal', 'sobre', 'profesionales', 'faq', 'contacto', 'legal', 'politica-de-privacidad'];
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  for (const pg of pages) {
    const row = {};
    for (const mode of ['without', 'with']) {
      const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      const p = await ctx.newPage(); const errs = [];
      if (mode === 'without') await p.route(/\/proto\/|\/drmejia-motion\//, (r) => r.abort());
      p.on('pageerror', (e) => errs.push(e.message));
      await p.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {}
        window.__lt = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: 'longtask', buffered: true }); });
      const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      await p.goto(`http://127.0.0.1:8770/${pg}/`, { waitUntil: 'load' }); await p.waitForTimeout(1500);
      const fcp = await p.evaluate(() => Math.round(performance.getEntriesByName('first-contentful-paint')[0].startTime));
      const scroll = await p.evaluate(() => new Promise((res) => { const gaps = []; let last = 0, y = 0; const end = document.documentElement.scrollHeight - innerHeight;
        function f(t) { if (last) gaps.push(t - last); last = t; y += 14; window.scrollTo(0, y); if (y < end) requestAnimationFrame(f); else { gaps.sort((a, b) => a - b); res({ p95: +gaps[Math.floor(gaps.length * 0.95)].toFixed(1), n: gaps.length }); } }
        requestAnimationFrame(f); }));
      const lt = await p.evaluate(() => window.__lt);
      const tbt = lt.filter(([s]) => s > 0).reduce((a, [, d]) => a + Math.max(0, d - 50), 0);
      row[mode] = { fcp, blockingMs: tbt, longTasks: lt.length, scrollP95: scroll.p95, errors: errs.length };
      await ctx.close();
    }
    console.log(pg.padEnd(24), 'without:', JSON.stringify(row.without), '| with:', JSON.stringify(row.with));
  }
  await b.close();
})();
