const { chromium } = require('/Users/gerardom/Projects/motion-graphics/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  for (const [dev, vp, m] of [['d', { width: 1440, height: 900 }, false], ['m', { width: 390, height: 844 }, true]]) {
    const ctx = await b.newContext({ viewport: vp, isMobile: m, hasTouch: m, deviceScaleFactor: 2 });
    await ctx.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {} });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (c) => { if (c.type() === 'error') errs.push(c.text()); });
    await p.goto('http://127.0.0.1:8770/adn-fetal/', { waitUntil: 'networkidle' });
    for (const [i, q] of [0.3, 0.42, 0.56, 0.68].entries()) {
      await p.evaluate((qq) => { let box; document.querySelectorAll('main .placeholder-block').forEach((b) => { if (b.querySelector('canvas')) box = b; });
        const top = box.getBoundingClientRect().top + scrollY; window.scrollTo(0, Math.max(0, top - (innerHeight - qq * (innerHeight + box.offsetHeight)))); }, q);
      await p.waitForTimeout(1500);
      const clip = await p.evaluate(() => { let box; document.querySelectorAll('main .placeholder-block').forEach((b) => { if (b.querySelector('canvas')) box = b; }); const r = box.getBoundingClientRect(); return { x: r.left, y: Math.max(0, r.top), width: r.width, height: Math.min(r.height, innerHeight - Math.max(0, r.top)) }; });
      await p.screenshot({ path: `out/adn-${dev}-${i}.png`, clip });
    }
    console.log('adn-fetal', dev, 'errors:', JSON.stringify(errs));
    await ctx.close();
  }
  await b.close();
})();
