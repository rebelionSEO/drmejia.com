const { chromium } = require('/Users/gerardom/Projects/motion-graphics/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await ctx.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {} });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (c) => { if (c.type() === 'error') errs.push(c.text()); });
  const center = async (sel, n = 0) => { await p.evaluate(([s, i]) => { const e = document.querySelectorAll(s)[i]; const r = e.getBoundingClientRect(); scrollBy(0, r.top - (innerHeight - r.height) / 2); }, [sel, n]); await p.waitForTimeout(1600); return p.locator(sel).nth(n).boundingBox(); };
  // 1. a card under the cursor (servicios)
  await p.goto('http://127.0.0.1:8770/servicios/', { waitUntil: 'networkidle' });
  let bx = await center('.services-grid .card', 1);
  await p.mouse.move(bx.x + bx.width * 0.85, bx.y + bx.height * 0.2, { steps: 12 }); await p.waitForTimeout(700);
  await p.screenshot({ path: 'out/cur-card.png', clip: { x: bx.x - 340, y: bx.y - 30, width: bx.width + 680, height: bx.height + 60 } });
  console.log('card transform:', await p.locator('.services-grid .card').nth(1).evaluate((e) => e.style.transform));
  // 2. the band (tamizaje): no cursor vs cursor in the middle
  await p.goto('http://127.0.0.1:8770/tamizaje/', { waitUntil: 'networkidle' });
  bx = await center('main .home-cta-section');
  await p.mouse.move(5, 5); await p.waitForTimeout(400);
  await p.screenshot({ path: 'out/cur-band-0.png', clip: bx });
  await p.mouse.move(bx.x + bx.width * 0.22, bx.y + bx.height * 0.5, { steps: 20 }); await p.waitForTimeout(900);
  await p.screenshot({ path: 'out/cur-band-1.png', clip: bx });
  // 3. a magnetic button: cursor just beside it
  const btn = p.locator('main .home-cta-section .btn').first(); const bb = await btn.boundingBox();
  await p.mouse.move(bb.x + bb.width + 30, bb.y + bb.height / 2 + 14, { steps: 10 }); await p.waitForTimeout(700);
  console.log('button translate:', await btn.evaluate((e) => e.style.translate));
  // 4. the footer
  bx = await center('.site-footer');
  await p.mouse.move(bx.x + bx.width * 0.55, bx.y + bx.height * 0.42, { steps: 20 }); await p.waitForTimeout(900);
  await p.screenshot({ path: 'out/cur-footer.png', clip: { x: 0, y: Math.max(0, bx.y), width: 1440, height: Math.min(bx.height, 900 - Math.max(0, bx.y)) } });
  // errors on every page
  for (const pg of ['servicios', 'tamizaje', 'adn-fetal', 'sobre', 'profesionales', 'faq', 'contacto', 'legal', 'politica-de-privacidad']) {
    await p.goto(`http://127.0.0.1:8770/${pg}/`, { waitUntil: 'networkidle' });
    await p.mouse.move(700, 500, { steps: 5 }); await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(600);
    console.log(pg, 'fields:', await p.locator('.mx-field').count());
  }
  console.log('errors:', JSON.stringify(errs));
  await b.close();
})();
