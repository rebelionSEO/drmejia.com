// The Consulta genética family tree on both places it appears: /servicios/ and the dedicated page
// (local stand-in). Stills before and while hovering the patient, plus errors, desktop and phone.
const { chromium } = require('/Users/gerardom/Projects/motion-graphics/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
  for (const [dev, vp, m] of [['d', { width: 1710, height: 1000 }, false], ['d14', { width: 1440, height: 900 }, false], ['m', { width: 390, height: 844 }, true]]) {
    for (const [name, url] of [['cg', '/servicios/asesoria-genetica/'], ['serv', '/servicios/']]) {
      const ctx = await b.newContext({ viewport: vp, isMobile: m, hasTouch: m });
      await ctx.addInitScript(() => { try { localStorage.setItem('drmejia_analytics_consent', 'denied'); } catch (e) {} });
      const p = await ctx.newPage(); const errs = [];
      p.on('pageerror', e => errs.push(e.message)); p.on('console', c => { if (c.type() === 'error') errs.push(c.text().slice(0, 120)); });
      await p.goto('http://127.0.0.1:8770' + url, { waitUntil: 'networkidle' });
      await p.waitForTimeout(5500);
      const shot = `out/heroes/${name}-${dev}`;
      await p.screenshot({ path: shot + '-0.png', clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, m ? 844 : 640) } });
      const info = await p.evaluate(() => { const c = document.querySelector('canvas.mx-scene'); const s = document.querySelector('.mx-stage'); const r = s && s.getBoundingClientRect(); return { ready: !!(c && c.classList.contains('is-ready')), stage: r ? [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)] : null }; });
      let hover = null;
      if (!m && info.stage) {
        const [sx, sy, sw, sh] = info.stage, u = Math.min(sw / 12, sh / 8.4), cx = sx + sw / 2, cy = sy + sh / 2;
        await p.mouse.move(cx - 300, cy + 200); await p.mouse.move(cx + (2.6 - 0.2) * u, cy - (-2.2 - 0.6) * u, { steps: 12 });
        await p.waitForTimeout(1400);
        hover = await p.evaluate(() => [document.querySelector('canvas.mx-scene').mxHover, (document.querySelector('.mx-tag.is-on') || {}).textContent || null]);
        await p.screenshot({ path: shot + '-1hover.png', clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 640) } });
      }
      console.log(name, dev, JSON.stringify(info), 'hover', JSON.stringify(hover), 'errors', JSON.stringify(errs));
      await ctx.close();
    }
  }
  await b.close();
})();
