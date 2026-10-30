// /adn-fetal/ signature (prototype): cell-free DNA, the thing NIPT actually measures. Told in beats as
// the box scrolls through: short DNA fragments drift in the mother's blood → about 1 in 10 comes from
// the placenta (the fetal fraction) → only the fragments of chromosomes 21, 18 and 13 are counted and
// compared with what's expected → an abnormal result is confirmed with a diagnostic study.
// Canvas 2D, a few hundred fragments; paused off-screen; a still frame under reduced motion.
(function () {
    'use strict';

    var box = null;
    document.querySelectorAll('main .placeholder-block').forEach(function (b) {
        if (/embarazo|ultrasonido/i.test(b.textContent)) {
            box = b;
        }
    });
    if (!box) {
        return;
    }
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var css = getComputedStyle(document.documentElement);
    function hex(name, fb) {
        var v = (css.getPropertyValue(name) || '').trim() || fb, n = parseInt(v.replace('#', ''), 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    var C = { brand: hex('--brand', '#0E3A43'), accent: hex('--accent', '#7E9A8F'), soft: hex('--brand-soft', '#DCE6E1'), ink3: hex('--ink-3', '#596E6B') };
    function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }

    var CAPTIONS = [
        'ADN libre en la sangre de la mamá',
        'Alrededor de 1 de cada 10 fragmentos viene de la placenta',
        'Se cuentan los de los cromosomas 21, 18 y 13 y se comparan con lo esperado',
        'Es un tamizaje: un resultado alterado se confirma con un estudio diagnóstico'
    ];
    var CHROMS = ['21', '18', '13'];

    // ---- layout ---------------------------------------------------------------------------------
    var canvas = document.createElement('canvas');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Animación: fragmentos de ADN libre en la sangre materna; cerca de uno de cada diez viene de la placenta; se cuentan los de los cromosomas 21, 18 y 13 y se comparan con lo esperado.');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    var chip = document.createElement('span');
    chip.className = 'placeholder-tag';
    chip.style.cssText = 'position:absolute;left:12px;bottom:12px;right:12px;margin:0;width:fit-content;max-width:calc(100% - 24px);font-family:var(--sans);font-size:12px;font-weight:600;color:var(--brand);line-height:1.35;white-space:normal';
    Array.prototype.forEach.call(box.querySelectorAll('.placeholder-tag'), function (t) { t.remove(); });
    box.style.background = 'var(--bg-mint)';
    box.appendChild(canvas);
    box.appendChild(chip);
    var ctx = canvas.getContext('2d');

    var W = 1, H = 1, dpr = 1, frags = [], cells = [];
    var rand = (function (seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; })(7);

    function build() {
        var r = box.getBoundingClientRect();
        W = r.width; H = r.height;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        var n = Math.round(Math.min(520, W * H / 260));
        frags = [];
        var counted = 0;
        for (var i = 0; i < n; i++) {
            var fetal = i % 10 === 0;                     // the fetal fraction: about 1 in 10
            // a few percent belong to chromosomes 21, 18, 13 (shown a little generously so bars read),
            // shared out evenly: the explainer shows the expected case, so every bar lands on the line
            var chrom = rand() < 0.16 ? counted++ % 3 : -1;
            frags.push({
                x: rand() * W, y: rand() * (H - 40), vx: 0, vy: 0, a: rand() * Math.PI, va: (rand() - 0.5) * 0.02,
                len: 5 + rand() * 6, fetal: fetal, chrom: chrom, delay: rand() * 0.5, slot: 0
            });
        }
        // count bars: each counted fragment gets a slot along its chromosome's bar
        var counts = [0, 0, 0];
        frags.forEach(function (f) { if (f.chrom >= 0) { f.slot = counts[f.chrom]++; } });
        bars.counts = counts;
        cells = [];
        for (var k = 0; k < 6; k++) {
            cells.push({ x: rand() * W, y: rand() * (H - 40), r: 16 + rand() * 12, vx: (rand() - 0.5) * 0.15, vy: (rand() - 0.5) * 0.1 });
        }
    }
    var bars = { counts: [1, 1, 1] };
    function barTarget(f) {
        var top = H * 0.2, rowH = (H * 0.5) / 3, x0 = W * 0.2, x1 = W * 0.86;
        // each bar is scaled by its own count, so all three end exactly on the expected line (x1)
        var y = top + rowH * (f.chrom + 0.5), step = (x1 - x0) / Math.max(1, bars.counts[f.chrom]);
        return { x: x0 + step * (f.slot + 0.5), y: y + (f.slot % 2 ? -3 : 3), a: Math.PI / 2 };
    }

    // ---- frame ------------------------------------------------------------------------------------
    var shown = -1;
    // Everything happens while the box is fully visible (it is centred at q = 0.5).
    function beatFor(q) { return q < 0.36 ? 0 : q < 0.46 ? 1 : q < 0.62 ? 2 : 3; }

    function frame() {
        var r = box.getBoundingClientRect(), vh = window.innerHeight;
        var q = reduce ? 0.85 : Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
        var beat = beatFor(q);
        if (beat !== shown) {
            shown = beat;
            chip.textContent = CAPTIONS[beat];
        }
        var highlight = Math.max(0, Math.min(1, (q - 0.36) / 0.07));       // fetal fraction lights up
        var sort = Math.max(0, Math.min(1, (q - 0.46) / 0.14));            // fragments fly into the bars

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);

        // red-cell discs, faint context
        cells.forEach(function (c) {
            if (!reduce) { c.x += c.vx; c.y += c.vy; if (c.x < -30) c.x = W + 30; if (c.x > W + 30) c.x = -30; if (c.y < -30) c.y = H; if (c.y > H) c.y = -30; }
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            ctx.fillStyle = rgba(C.soft, 0.55 * (1 - sort * 0.6));
            ctx.fill();
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r * 0.45, 0, Math.PI * 2);
            ctx.fillStyle = rgba([255, 255, 255], 0.35 * (1 - sort * 0.6));
            ctx.fill();
        });

        // bars' scaffolding: chromosome labels and the expected line
        if (sort > 0) {
            ctx.globalAlpha = sort;
            ctx.font = '700 12px ' + (css.getPropertyValue('--sans') || 'sans-serif');
            ctx.textBaseline = 'middle';
            var top = H * 0.2, rowH = (H * 0.5) / 3;
            CHROMS.forEach(function (name, i) {
                ctx.fillStyle = rgba(C.brand, 1);
                ctx.fillText('Cr. ' + name, W * 0.05, top + rowH * (i + 0.5));
            });
            ctx.setLineDash([4, 4]);
            ctx.strokeStyle = rgba(C.ink3, 0.6);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(W * 0.86, top - 6);
            ctx.lineTo(W * 0.86, top + rowH * 3 + 6);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
        }

        frags.forEach(function (f) {
            if (!reduce) {
                // Brownian drift with damping
                f.vx = (f.vx + (rand() - 0.5) * 0.12) * 0.94;
                f.vy = (f.vy + (rand() - 0.5) * 0.12) * 0.94;
                f.x += f.vx; f.y += f.vy; f.a += f.va;
                if (f.x < -10) f.x = W + 10; if (f.x > W + 10) f.x = -10;
                if (f.y < -10) f.y = H - 40; if (f.y > H - 40) f.y = -10;
            }
            var x = f.x, y = f.y, a = f.a, alpha, col, width;
            var t = f.chrom >= 0 ? Math.max(0, Math.min(1, (sort - f.delay * 0.5) / 0.5)) : 0;
            t = t * t * (3 - 2 * t);
            if (t > 0) {
                var g = barTarget(f);
                x += (g.x - x) * t; y += (g.y - y) * t; a += (g.a - a) * t;
            }
            if (f.fetal) {
                col = C.brand; alpha = 0.55 + 0.45 * highlight; width = 2.4 + highlight * 0.6;
            } else {
                col = C.accent; alpha = 0.75 - 0.35 * highlight; width = 2;
            }
            if (f.chrom < 0) {
                alpha *= 1 - sort * 0.75;                     // the rest step back while counting
            } else if (t > 0) {
                alpha = Math.max(alpha, 0.9 * t);
            }
            var dx = Math.cos(a) * f.len / 2, dy = Math.sin(a) * f.len / 2;
            ctx.strokeStyle = rgba(col, alpha);
            ctx.lineWidth = width;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(x - dx, y - dy);
            ctx.lineTo(x + dx, y + dy);
            ctx.stroke();
            if (f.fetal && highlight > 0 && t === 0) {
                ctx.beginPath();
                ctx.arc(x, y, f.len * 0.9, 0, Math.PI * 2);
                ctx.strokeStyle = rgba(C.brand, 0.18 * highlight);
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });
    }

    // ---- loop ---------------------------------------------------------------------------------------
    var raf = 0, visible = false;
    function tick() {
        raf = 0;
        frame();
        if (visible && !reduce) {
            raf = requestAnimationFrame(tick);
        }
    }
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
            visible = entries[0].isIntersecting;
            if (visible && !raf) {
                raf = requestAnimationFrame(tick);
            }
        }).observe(box);
    }
    if (reduce) {
        window.addEventListener('scroll', function () { requestAnimationFrame(frame); }, { passive: true });
    }
    window.addEventListener('resize', function () { build(); frame(); });
    build();
    frame();
})();
