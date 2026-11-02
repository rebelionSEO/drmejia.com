// Plugin mode: every page's motion pieces start (served from /wp-content/plugins/drmejia-motion/),
// no console errors, nothing requested from /proto/.
const { chromium } = require('/Users/gerardom/Projects/motion-graphics/node_modules/playwright');
const PAGES = {
  '': [], servicios: ['canvas.mx-scene.is-ready', '.mx-tag'], tamizaje: ['canvas.mx-scene.is-ready', '.mx-tz-btn'],
  'adn-fetal': ['canvas.mx-scene.is-ready', '.mx-nipt'], sobre: [], profesionales: ['.home-cta-section svg path'],
  faq: [], contacto: [], legal: [], 'politica-de-privacidad': []
};
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  for (const [dev, vp, m] of [['d', { width: 1440, height: 900 }, false], ['m', { width: 390, height: 844 }, true]]) {
    for (const [pg, need] of Object.entries(PAGES)) {
      const ctx = await b.newContext({ viewport: vp, isMobile: m, hasTouch: m });
      await ctx.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {} });
      const p = await ctx.newPage(); const errs = [], proto = [], plug = new Set();
      p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (c) => { if (c.type() === 'error') errs.push(c.text()); });
      p.on('request', (r) => { const u = r.url(); if (u.includes('/proto/')) proto.push(u); if (u.includes('/drmejia-motion/')) plug.add(u.split('/').pop().split('?')[0]); });
      await p.goto('http://127.0.0.1:8770/' + (pg ? pg + '/' : ''), { waitUntil: 'networkidle' });
      const H = await p.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < H; y += 500) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(160); }
      await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(2500);
      const found = await p.evaluate((sels) => sels.map((s) => [s, !!document.querySelector(s)]), need);
      const missing = found.filter((f) => !f[1]).map((f) => f[0]);
      const motionOn = await p.evaluate(() => document.querySelectorAll('[class*="mx-"]').length);
      console.log(dev, (pg || 'home').padEnd(24), 'files', [...plug].join(','), '| mx elements', motionOn, '| missing', JSON.stringify(missing), '| /proto/', proto.length, '| errors', JSON.stringify(errs));
      await ctx.close();
    }
  }
  await b.close();
})();
