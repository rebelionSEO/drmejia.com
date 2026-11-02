// Hero scenes at 4x CPU: frame times and long tasks from load through 8 s of animation, with the
// pointer moving (hover highlight + focus) on desktop.
const { chromium } = require('/Users/gerardom/Projects/motion-graphics/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  const pages = [['servicios a', '/servicios/', '.page-hero'], ['servicios b', '/servicios/?dir=b', '.page-hero'],
    ['tamizaje a', '/tamizaje/', 'main .placeholder-block'], ['adn a', '/adn-fetal/', '.page-hero']];
  for (const [dev, vp, m] of [['d', { width: 1440, height: 900 }, false], ['m', { width: 390, height: 844 }, true]]) {
    for (const [name, url, sel] of pages) {
      const ctx = await b.newContext({ viewport: vp, isMobile: m, hasTouch: m, deviceScaleFactor: m ? 3 : 2 });
      await ctx.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {}
        window.__lt = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(Math.round(e.duration)))).observe({ type: 'longtask', buffered: true }); });
      const p = await ctx.newPage();
      const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      await p.goto('http://127.0.0.1:8770' + url, { waitUntil: 'networkidle' });
      await p.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); scrollBy(0, r.top - 120); }, sel);
      await p.waitForTimeout(2500);
      const box = await p.locator(sel).boundingBox();
      const mover = m ? Promise.resolve() : (async () => { for (let i = 0; i < 40; i++) { await p.mouse.move(box.x + box.width * (0.55 + 0.4 * Math.sin(i / 6)), box.y + Math.max(0, box.height * (0.5 + 0.35 * Math.cos(i / 5)))); await p.waitForTimeout(180); } })();
      const res = await p.evaluate(() => new Promise((res) => { const f = []; let last = performance.now(); const t0 = last;
        function k(t) { f.push(t - last); last = t; if (t - t0 < 8000) requestAnimationFrame(k); else { f.sort((a, b) => a - b); res({ frames: f.length, p50: f[f.length >> 1].toFixed(1), p95: f[Math.floor(f.length * 0.95)].toFixed(1), longtasks: window.__lt }); } }
        requestAnimationFrame(k); }));
      await mover;
      console.log(dev, name, JSON.stringify(res));
      await ctx.close();
    }
  }
  await b.close();
})();
