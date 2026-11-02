// /contacto/ signature (prototype): "Cómo llegar, a la nicaragüense". The map placeholder becomes a
// schematic of the clinic's directions, walked as you scroll: from the traffic lights of Monte de los
// Olivos, 1 cuadra al lago (north: in Managua "al lago" means toward Lake Xolotlán), 1 cuadra al este,
// 20 m al sur. Each step's phrase shows in sync. Schematic, not to scale; a link opens Google Maps.
(function () {
    'use strict';

    var box = null;
    document.querySelectorAll('main .placeholder-block').forEach(function (b) {
        if (/mapa/i.test(b.textContent)) {
            box = b;
        }
    });
    if (!box) {
        return;
    }
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var NS = 'http://www.w3.org/2000/svg';
    var MAPS = 'https://maps.app.goo.gl/2oXm2GGeiTNKHGD6A';   // the clinic's pin (Clínica Perinatal), from Gera 2026-11-01

    var STEPS = [
        'Desde los semáforos del Monte de los Olivos',
        '1 cuadra al lago (al norte)',
        '1 cuadra al este',
        '20 m al sur',
        'Clínica Perinatal'
    ];
    // Schematic geometry (content centred on x = 175, 260 units tall): blocks of 100 units; 20 m ≈ a
    // fifth of a block. The viewBox widens to the box's proportions; streets run far to each side.
    var S = { x: 125, y: 186 }, N1 = { x: 125, y: 86 }, E1 = { x: 225, y: 86 }, END = { x: 225, y: 106 };

    function el(name, attrs, parent) {
        var n = document.createElementNS(NS, name);
        Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
        (parent || svg).appendChild(n);
        return n;
    }

    var css = getComputedStyle(document.documentElement);
    var C = {
        brand: css.getPropertyValue('--brand').trim() || '#0E3A43',
        accent: css.getPropertyValue('--accent').trim() || '#7E9A8F',
        rule: css.getPropertyValue('--rule').trim() || '#DCE5E0',
        soft: css.getPropertyValue('--brand-soft').trim() || '#DCE6E1',
        ink3: css.getPropertyValue('--ink-3').trim() || '#596E6B'
    };

    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    function fitViewBox() {
        var r = box.getBoundingClientRect(), h = 260, w = Math.max(300, h * r.width / Math.max(1, r.height));
        svg.setAttribute('viewBox', (175 - w / 2) + ' 0 ' + w + ' ' + h);
    }
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Esquema de cómo llegar: desde los semáforos del Monte de los Olivos, una cuadra al lago, una cuadra al este y veinte metros al sur, a la Clínica Perinatal.');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';

    // Lake (north) along the top edge, softly waved.
    var wave = 'M-600 0 H950 V30';
    for (var wx = 950; wx > -600; wx -= 60) { wave += ' C' + (wx - 20) + ' 38 ' + (wx - 40) + ' 22 ' + (wx - 60) + ' 30'; }
    el('path', { d: wave + ' Z', fill: C.soft, opacity: '0.95' });
    el('text', { x: '175', y: '20', 'text-anchor': 'middle', 'font-size': '11', 'font-weight': '700', fill: C.brand, 'letter-spacing': '0.05em' }).textContent = '↑ LAGO XOLOTLÁN · NORTE';
    // Street grid.
    for (var gx = -575; gx <= 925; gx += 100) { el('line', { x1: gx, y1: 40, x2: gx, y2: 260, stroke: C.rule, 'stroke-width': gx === 125 ? 7 : 4, 'stroke-linecap': 'round' }); }
    [86, 186].forEach(function (y) { el('line', { x1: -600, y1: y, x2: 950, y2: y, stroke: C.rule, 'stroke-width': y === 186 ? 7 : 4, 'stroke-linecap': 'round' }); });

    // The route.
    var route = el('path', {
        d: 'M ' + S.x + ' ' + S.y + ' L ' + N1.x + ' ' + N1.y + ' L ' + E1.x + ' ' + E1.y + ' L ' + END.x + ' ' + END.y,
        fill: 'none', stroke: C.brand, 'stroke-width': '4', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    });
    var walker = el('circle', { r: '6', fill: C.brand, stroke: '#fff', 'stroke-width': '2.5' });

    // Start: the traffic lights.
    var lights = el('g', { transform: 'translate(' + (S.x - 30) + ' ' + (S.y - 14) + ')' });
    el('rect', { width: '14', height: '30', rx: '4', fill: C.brand }, lights);
    [7, 15, 23].forEach(function (cy, i) { el('circle', { cx: '7', cy: cy, r: '3.2', fill: i === 2 ? '#8FD3B0' : 'rgba(255,255,255,.55)' }, lights); });
    // End: the clinic pin.
    var pin = el('g', { transform: 'translate(' + END.x + ' ' + END.y + ')', opacity: '0' });
    el('path', { d: 'M0 0 C-9 -12 -13 -18 -13 -25 A13 13 0 1 1 13 -25 C13 -18 9 -12 0 0 Z', fill: C.brand }, pin);
    el('circle', { cx: '0', cy: '-25', r: '5', fill: '#fff' }, pin);

    // Caption chip: the current step, plus the Google Maps link.
    var cap = document.createElement('div');
    cap.style.cssText = 'position:absolute;left:12px;right:12px;bottom:12px;display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;pointer-events:none';
    var chip = document.createElement('span');
    chip.className = 'placeholder-tag';
    chip.style.cssText = 'margin:0;font-family:var(--sans);font-size:12px;font-weight:600;color:var(--brand);transition:opacity .25s ease';
    var link = document.createElement('a');
    link.href = MAPS;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Abrir en Google Maps ↗';
    link.style.cssText = 'pointer-events:auto;font-size:12px;font-weight:600;color:var(--brand);background:rgba(255,255,255,.94);padding:6px 10px;border-radius:999px;text-decoration:none';
    cap.appendChild(chip);
    cap.appendChild(link);

    Array.prototype.forEach.call(box.querySelectorAll('.placeholder-tag'), function (t) { t.remove(); });
    box.style.background = 'var(--bg-mint)';
    box.appendChild(svg);
    box.appendChild(cap);
    fitViewBox();
    window.addEventListener('resize', fitViewBox);

    var total = route.getTotalLength();
    var segs = [S.y - N1.y, E1.x - N1.x, END.y - E1.y];   // lengths of the three legs
    route.style.strokeDasharray = total + ' ' + total;
    var shown = -1;

    function setStep(i) {
        if (i !== shown) {
            shown = i;
            chip.textContent = STEPS[i];
        }
    }

    function update() {
        var r = box.getBoundingClientRect(), vh = window.innerHeight;
        // Walks while the box travels from 90% to 35% of the viewport height.
        var p = reduce ? 1 : Math.max(0, Math.min(1, (vh * 0.9 - r.top) / (vh * 0.55)));
        var drawn = total * p;
        route.style.strokeDashoffset = String(total - drawn);
        var at = route.getPointAtLength(drawn);
        walker.setAttribute('cx', at.x);
        walker.setAttribute('cy', at.y);
        pin.setAttribute('opacity', p > 0.97 ? '1' : '0');
        walker.setAttribute('opacity', p > 0.97 ? '0' : '1');
        var step = p <= 0.01 ? 0 : drawn < segs[0] ? 1 : drawn < segs[0] + segs[1] ? 2 : p < 0.97 ? 3 : 4;
        setStep(step);
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(function () {
                ticking = false;
                update();
            });
        }
    }, { passive: true });
    update();
})();
