// Stills of the hero scene directions (desktop + phone), hover states, console errors.
const { chromium } = require('/Users/gerardom/Projects/motion-graphics/node_modules/playwright');
const ONLY = process.argv[2];
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  const cases = [
    ['servicios', 'a', '/servicios/', 'hero'], ['servicios', 'b', '/servicios/?dir=b', 'hero'],
    ['tamizaje', 'a', '/tamizaje/', 'box'], ['tamizaje', 'b', '/tamizaje/?dir=b', 'box'],
    ['adn', 'a', '/adn-fetal/', 'hero'], ['adn', 'b', '/adn-fetal/?dir=b', 'hero']
  ].filter(c => !ONLY || c[0] === ONLY);
  for (const [dev, vp, m] of [['d', { width: 1440, height: 900 }, false], ['m', { width: 390, height: 844 }, true]]) {
    for (const [page, dir, url, where] of cases) {
      const ctx = await b.newContext({ viewport: vp, isMobile: m, hasTouch: m, deviceScaleFactor: m ? 2 : 1 });
      await ctx.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {} });
      const p = await ctx.newPage(); const errs = [];
      p.on('pageerror', e => errs.push(e.message)); p.on('console', c => { if (c.type() === 'error') errs.push(c.text()); });
      await p.goto('http://127.0.0.1:8770' + url, { waitUntil: 'networkidle' });
      const sel = where === 'hero' ? '.page-hero' : 'main .placeholder-block';
      await p.evaluate(s => { const r = document.querySelector(s).getBoundingClientRect(); scrollTo(0, Math.max(0, scrollY + r.top - 130)); }, sel);
      await p.waitForTimeout(5200);
      const box = await p.locator(sel).boundingBox();
      const clip = { x: 0, y: Math.max(0, box.y), width: vp.width, height: Math.min(box.height, vp.height - Math.max(0, box.y)) };
      const name = `out/heroes/${page}-${dir}-${dev}`;
      await p.screenshot({ path: name + '-0.png', clip });
      const ready = await p.evaluate(() => [...document.querySelectorAll('canvas.mx-scene')].map(c => c.classList.contains('is-ready')));
      if (!m) {
        // hover something meaningful
        const pt = await p.evaluate(([page]) => {
          const c = document.querySelector('canvas.mx-scene'), r = c.getBoundingClientRect();
          const st = document.querySelector('.mx-stage'), sr = st ? st.getBoundingClientRect() : r;
          if (page === 'tamizaje') return [r.left + r.width * 0.5, r.top + r.height * 0.8];
          if (page === 'servicios') return [sr.left + sr.width * 0.6, sr.top + sr.height * 0.72];
          return [r.left + r.width * 0.75, sr.top + sr.height * 0.5];
        }, [page]);
        await p.mouse.move(pt[0] - 60, pt[1] - 40); await p.mouse.move(pt[0], pt[1], { steps: 10 });
        await p.waitForTimeout(1300);
        await p.screenshot({ path: name + '-1hover.png', clip });
      }
      if (page === 'tamizaje' && dir === 'a') {
        for (const k of [1, 2, 4]) { await p.locator('.mx-tz-btn').nth(k).click(); await p.waitForTimeout(2600); await p.screenshot({ path: `${name}-step${k + 1}.png`, clip }); }
      }
      if (page === 'tamizaje' && dir === 'b') { await p.locator('#mx-tz-days').fill('4'); await p.waitForTimeout(900); await p.screenshot({ path: name + '-late.png', clip }); }
      if (page === 'adn' && dir === 'b') { await p.mouse.wheel(0, 380); await p.waitForTimeout(1500); await p.screenshot({ path: name + '-push.png' }); }
      console.log(page, dir, dev, 'ready', JSON.stringify(ready), 'errors', JSON.stringify(errs));
      await ctx.close();
    }
  }
  await b.close();
})();
