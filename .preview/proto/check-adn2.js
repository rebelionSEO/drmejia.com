// v2 adn-fetal: stills per step (desktop + phone), cursor-driven lens, errors.
const { chromium } = require('/Users/gerardom/Projects/motion-graphics/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  for (const [dev, vp, m] of [['d', { width: 1440, height: 900 }, false], ['m', { width: 390, height: 844 }, true]]) {
    const ctx = await b.newContext({ viewport: vp, isMobile: m, hasTouch: m, deviceScaleFactor: 2 });
    await ctx.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {} });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (c) => { if (c.type() === 'error') errs.push(c.text()); });
    await p.goto('http://127.0.0.1:8770/adn-fetal/', { waitUntil: 'networkidle' });
    const sel = '.mx-nipt';
    await p.locator(sel).scrollIntoViewIfNeeded();
    await p.evaluate(() => { const r = document.querySelector('.mx-nipt').getBoundingClientRect(); scrollBy(0, r.top - (innerHeight - r.height) / 2); });
    await p.waitForTimeout(1800);
    const box = await p.locator(sel).boundingBox();
    const shot = (n) => p.screenshot({ path: `out/adn2-${dev}-${n}.png`, clip: box });
    await shot('0-auto');
    if (!m) { await p.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.45, { steps: 8 }); await p.waitForTimeout(700); await shot('1-hover'); }
    else { await p.touchscreen.tap(box.x + box.width * 0.3, box.y + box.height * 0.5); await p.waitForTimeout(700); await shot('1-tap'); }
    const btn = p.locator('.mx-nipt-btn');
    await btn.nth(1).click(); await p.waitForTimeout(1200); await shot('2-bebe');
    await btn.nth(2).click(); await p.waitForTimeout(1800); await shot('3-conteo');
    await p.locator('.mx-nipt-tri').click(); await p.waitForTimeout(1800); await shot('4-tri');
    console.log(dev, 'errors:', JSON.stringify(errs), 'box', Math.round(box.width) + 'x' + Math.round(box.height));
    await ctx.close();
  }
  await b.close();
})();
