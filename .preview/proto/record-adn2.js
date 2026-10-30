// Real-time recording of the v2 microscope: autoplay, then a visitor takes over (cursor / taps / buttons).
const { chromium } = require('/Users/gerardom/Projects/motion-graphics/node_modules/playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  fs.mkdirSync('out/rec/tmp', { recursive: true });
  for (const dev of ['d', 'm']) {
    const m = dev === 'm', vp = m ? { width: 390, height: 844 } : { width: 1280, height: 800 };
    const ctx = await b.newContext({ viewport: vp, isMobile: m, hasTouch: m, recordVideo: { dir: 'out/rec/tmp', size: vp } });
    await ctx.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {} });
    const p = await ctx.newPage();
    await p.goto('http://127.0.0.1:8770/adn-fetal/', { waitUntil: 'networkidle' });
    await p.waitForTimeout(800);
    // scroll down to the box like a reader would
    await p.evaluate(() => new Promise((res) => { const r = document.querySelector('.mx-nipt').getBoundingClientRect(); const end = scrollY + r.top - (innerHeight - r.height) / 2, s0 = scrollY, t0 = performance.now();
      (function f(t) { const k = Math.min(1, (t - t0) / 2200), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; scrollTo(0, s0 + (end - s0) * e); k < 1 ? requestAnimationFrame(f) : res(); })(t0); }));
    await p.waitForTimeout(m ? 9000 : 8000);                      // autoplay: steps 1 → 2
    const box = await p.locator('.mx-nipt').boundingBox(), at = (fx, fy) => [box.x + box.width * fx, box.y + box.height * fy];
    const btn = p.locator('.mx-nipt-btn');
    await btn.nth(0).click(); await p.waitForTimeout(600);
    if (!m) {
      for (const [fx, fy] of [[0.25, 0.4], [0.45, 0.6], [0.7, 0.35], [0.55, 0.5]]) { await p.mouse.move(...at(fx, fy), { steps: 40 }); await p.waitForTimeout(300); }
      await btn.nth(1).click(); await p.waitForTimeout(900);
      for (const [fx, fy] of [[0.3, 0.55], [0.6, 0.4], [0.75, 0.6]]) { await p.mouse.move(...at(fx, fy), { steps: 45 }); await p.waitForTimeout(400); }
    } else {
      for (const [fx, fy] of [[0.3, 0.45], [0.7, 0.5]]) { await p.touchscreen.tap(...at(fx, fy)); await p.waitForTimeout(1400); }
      await btn.nth(1).click(); await p.waitForTimeout(1200);
      await p.touchscreen.tap(...at(0.45, 0.5)); await p.waitForTimeout(1800);
    }
    await btn.nth(2).click(); await p.waitForTimeout(2600);
    await p.locator('.mx-nipt-tri').click(); await p.waitForTimeout(3400);
    await p.locator('.mx-nipt-tri').click(); await p.waitForTimeout(1800);
    await btn.nth(0).click(); await p.waitForTimeout(2200);
    const vid = p.video(); await ctx.close();
    fs.renameSync(await vid.path(), `out/rec/adn2-${dev}.webm`);
    console.log('recorded', dev);
  }
  await b.close();
})();
