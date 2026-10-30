// Real-time screen recordings of the prototypes: smooth scripted scroll through each page.
const { chromium } = require('/Users/gerardom/Projects/motion-graphics/node_modules/playwright');
const fs = require('fs');
const jobs = [
  ['servicios', 'd'], ['contacto', 'd'], ['sobre', 'd'], ['profesionales', 'd'], ['adn-fetal', 'd'], ['tamizaje', 'd'],
  ['servicios', 'm'], ['contacto', 'm'], ['adn-fetal', 'm'], ['sobre', 'm'],
];
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  fs.mkdirSync('out/rec', { recursive: true });
  for (const [pg, dev] of jobs) {
    const vp = dev === 'd' ? { width: 1440, height: 900 } : { width: 390, height: 844 };
    const ctx = await b.newContext({ viewport: vp, isMobile: dev === 'm', hasTouch: dev === 'm', recordVideo: { dir: 'out/rec/tmp', size: dev === 'd' ? { width: 1440, height: 900 } : { width: 390, height: 844 } } });
    await ctx.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {} });
    const p = await ctx.newPage();
    await p.goto(`http://127.0.0.1:8770/${pg}/`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(1200);
    // eased scroll from top to bottom; longer pages get proportionally more time
    await p.evaluate(() => new Promise((res) => {
      const end = document.documentElement.scrollHeight - innerHeight, dur = Math.min(16000, Math.max(8000, end * 4.2));
      const t0 = performance.now(), ease = (x) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
      function f(t) { const k = Math.min(1, (t - t0) / dur); window.scrollTo(0, end * ease(k)); if (k < 1) requestAnimationFrame(f); else res(); }
      requestAnimationFrame(f);
    }));
    await p.waitForTimeout(1200);
    const vid = p.video(); await ctx.close();
    fs.renameSync(await vid.path(), `out/rec/${pg}-${dev}.webm`);
    console.log('recorded', pg, dev);
  }
  await b.close();
})();
