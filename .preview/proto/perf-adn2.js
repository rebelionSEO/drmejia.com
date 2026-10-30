const { chromium } = require('/Users/gerardom/Projects/motion-graphics/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  for (const [dev, vp, m] of [['d', { width: 1440, height: 900 }, false], ['m', { width: 390, height: 844 }, true]]) {
    const ctx = await b.newContext({ viewport: vp, isMobile: m, hasTouch: m, deviceScaleFactor: m ? 3 : 2 });
    await ctx.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {}
      window.__lt = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(Math.round(e.duration)))).observe({ type: 'longtask', buffered: true }); });
    const p = await ctx.newPage();
    const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await p.goto('http://127.0.0.1:8770/adn-fetal/', { waitUntil: 'networkidle' });
    await p.evaluate(() => { const r = document.querySelector('.mx-nipt').getBoundingClientRect(); scrollBy(0, r.top - (innerHeight - r.height) / 2); });
    const res = await p.evaluate(() => new Promise((res) => { const f = []; let last = performance.now(); const t0 = last;
      function k(t) { f.push(t - last); last = t; if (t - t0 < 8000) requestAnimationFrame(k); else { f.sort((a, b) => a - b); res({ frames: f.length, p50: f[f.length >> 1].toFixed(1), p95: f[Math.floor(f.length * 0.95)].toFixed(1), longtasks: window.__lt }); } }
      requestAnimationFrame(k); }));
    // and the script's own cost per frame, measured directly
    console.log(dev, '4x CPU', JSON.stringify(res));
    await ctx.close();
  }
  await b.close();
})();
