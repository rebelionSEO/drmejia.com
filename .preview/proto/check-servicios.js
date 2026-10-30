const { chromium } = require('/Users/gerardom/Projects/motion-graphics/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  // 1. Fidelity: preview vs live, top of /legal/ (motion layer leaves the first screen untouched)
  for (const [name, url] of [['live', 'https://doctorgerardomejia.com/legal/'], ['proto', 'http://127.0.0.1:8770/legal/']]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.route(/googletagmanager|google-analytics|hostinger-reach/, (r) => r.abort());
    await ctx.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {} });
    const p = await ctx.newPage(); await p.goto(url, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
    await p.screenshot({ path: `out/fid-${name}.png` }); await ctx.close();
  }
  // 2. /servicios/ while the thread draws
  for (const [dev, vp, m] of [['d', { width: 1440, height: 900 }, false], ['m', { width: 390, height: 844 }, true]]) {
    const ctx = await b.newContext({ viewport: vp, isMobile: m, hasTouch: m, deviceScaleFactor: 2 });
    await ctx.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {} });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (c) => { if (c.type() === 'error') errs.push(c.text()); });
    await p.goto('http://127.0.0.1:8770/servicios/', { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    for (const [label, f] of [['a', 0.2], ['b', 0.5], ['c', 1.0]]) {
      await p.evaluate((ff) => { const g = document.querySelector('main .services-grid'); const r = g.getBoundingClientRect(); const vh = innerHeight;
        const top = r.top + scrollY; const span = r.height + vh * 0.25; window.scrollTo(0, top - vh * 0.85 + ff * span); }, f);
      await p.waitForTimeout(700);
      await p.screenshot({ path: `out/serv-${dev}-${label}.png` });
    }
    console.log(dev, 'errors:', JSON.stringify(errs), 'lit:', await p.evaluate(() => document.querySelectorAll('.icon-circle.mx-lit').length));
    await ctx.close();
  }
  await b.close();
})();
