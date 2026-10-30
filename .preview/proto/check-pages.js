const { chromium } = require('/Users/gerardom/Projects/motion-graphics/node_modules/playwright');
const [,, page, selector, fracsArg] = process.argv;
const fracs = JSON.parse(fracsArg);
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  for (const [dev, vp, m] of [['d', { width: 1440, height: 900 }, false], ['m', { width: 390, height: 844 }, true]]) {
    const ctx = await b.newContext({ viewport: vp, isMobile: m, hasTouch: m, deviceScaleFactor: 2 });
    await ctx.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {} });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (c) => { if (c.type() === 'error') errs.push(c.text()); });
    await p.goto(`http://127.0.0.1:8770/${page}/`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    for (const [i, f] of fracs.entries()) {
      // f = where the target's top sits, as a fraction of the viewport height
      await p.evaluate(([sel, ff]) => { const el = document.querySelector(sel); const top = el.getBoundingClientRect().top + scrollY; window.scrollTo(0, top - innerHeight * ff); }, [selector, f]);
      await p.waitForTimeout(900);
      await p.screenshot({ path: `out/${page}-${dev}-${i}.png` });
    }
    console.log(page, dev, 'errors:', JSON.stringify(errs));
    await ctx.close();
  }
  await b.close();
})();
