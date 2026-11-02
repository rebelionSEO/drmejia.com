// /tamizaje/ prototype: the first illustration box ("¿Qué es?") becomes the heel-prick test, told
// in the homepage's particle style.
//   ?dir=a (default, the doctor's pick 2026-11-01) the process in five steps (buttons, autoplay until touched); on the footprint,
//                    hovering the heel zooms onto the sampling sites.
//   ?dir=b           the footprint plus a "when?" slider: days of life against the doctor's window.
// Facts from the doctor (2026-10-19): sides of the heel; 5-circle card; ideal 48–72 h, fine in the
// first week, one month at most; results in 10–15 business days.
(function () {
    'use strict';

    var box = document.querySelector('main .placeholder-block');
    if (!box) {
        return;
    }
    var timeline = /[?&]dir=b\b/.test(location.search);
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var STEPS = [
        ['La huella', 'El pinchazo se hace <b>a los costados del talón</b>, en las zonas marcadas.'],
        ['La gota', 'Un pinchazo pequeño y rápido; salen <b>unas gotas de sangre</b>.'],
        ['La tarjeta', 'Las gotas llenan <b>los 5 círculos</b> de una tarjeta especial.'],
        ['Laboratorio', 'La tarjeta se seca y <b>viaja al laboratorio</b>, donde se analiza.'],
        ['Resultados', 'Listos en <b>10 a 15 días hábiles</b>. El doctor los revisa y se los explica.']
    ];
    var WHEN = [
        ['Primer día', 'Antes de las 48 horas es pronto: se espera, salvo indicación médica.', 0.35],
        ['2 a 3 días', '<b>El momento ideal:</b> entre las 48 y 72 horas de vida.', 1],
        ['4 a 7 días', 'Todavía es un buen momento: <b>durante la primera semana</b>.', 0.8],
        ['8 a 30 días', 'Aún se puede, <b>lo antes posible</b>: hasta el primer mes.', 0.55],
        ['Más de 1 mes', 'Después del primer mes <b>ya no se recomienda</b>.', 0.2]
    ];

    var tagEl = box.querySelector('.placeholder-tag');
    if (tagEl) {
        tagEl.style.display = 'none';
    }
    box.classList.add('mx-has-scene', 'mx-tz');
    box.style.aspectRatio = 'auto';   // the theme's 4:3 box would widen past a phone screen at this height
    box.style.minHeight = 'clamp(470px, 125vw, 560px)';
    box.setAttribute('role', 'img');
    box.setAttribute('aria-label', 'La prueba del talón: la huella del bebé con las zonas de punción a los costados del talón, una gota que llena los 5 círculos de la tarjeta, el laboratorio y los resultados.');

    var canvas = document.createElement('canvas');
    canvas.className = 'mx-scene mx-scene-canvas';
    canvas.setAttribute('data-scene', 'journey');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.mxStory = 0;
    box.appendChild(canvas);

    var css = document.createElement('style');
    css.textContent = [
        '.mx-tz{border-radius:var(--r-lg,24px)}',
        '.mx-tz-ui{position:absolute;left:14px;right:14px;top:14px;z-index:2;display:flex;flex-wrap:wrap;gap:6px}',
        '@media (max-width:600px){.mx-tz-ui{left:10px;right:10px;top:10px;gap:5px}.mx-tz-btn{padding:7px 9px;font-size:12px}.mx-tz-cap{left:10px;right:10px;bottom:10px;font-size:13.5px}}',
        '.mx-tz-btn{font:600 12.5px/1 "Plus Jakarta Sans",system-ui,sans-serif;color:var(--brand,#0E3A43);background:rgba(255,255,255,.7);border:1px solid rgba(14,58,67,.14);border-radius:999px;padding:8px 12px;cursor:pointer;transition:background .2s,color .2s}',
        '.mx-tz-btn span{opacity:.55;margin-right:5px}',
        '.mx-tz-btn[aria-pressed="true"]{background:var(--brand,#0E3A43);color:#fff;border-color:transparent}',
        '.mx-tz-btn:focus-visible{outline:2px solid var(--accent,#7E9A8F);outline-offset:2px}',
        '.mx-tz-cap{position:absolute;left:14px;right:14px;bottom:14px;z-index:2;margin:0;background:rgba(255,255,255,.88);border-radius:14px;padding:12px 14px;font:500 14px/1.45 "Plus Jakarta Sans",system-ui,sans-serif;color:var(--ink-2,#425A5C);box-shadow:0 8px 24px rgba(8,43,51,.08)}',
        '.mx-tz-cap b{color:var(--brand,#0E3A43)}',
        '.mx-tz-range{width:100%;accent-color:var(--brand,#0E3A43);margin:6px 0 2px}',
        '.mx-tz-ticks{display:flex;justify-content:space-between;font:600 11px/1.2 "Plus Jakarta Sans",system-ui,sans-serif;color:var(--ink-3,#596E6B)}',
        '.mx-tz-ticks span.on{color:var(--brand,#0E3A43)}',
        '.mx-tz canvas{transition:opacity .6s ease,filter .6s ease}'
    ].join('');
    document.head.appendChild(css);

    var cap = document.createElement('p');
    cap.className = 'mx-tz-cap';
    cap.setAttribute('aria-live', 'polite');
    var tag = document.createElement('div');
    tag.className = 'mx-tag';
    tag.textContent = 'Zonas de punción: costados del talón';
    box.appendChild(tag);

    if (!timeline) {
        var ui = document.createElement('div');
        ui.className = 'mx-tz-ui';
        var btns = STEPS.map(function (st, i) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'mx-tz-btn';
            b.innerHTML = '<span>' + (i + 1) + '</span>' + st[0];
            b.addEventListener('click', function () { stopAuto(); go(i); });
            ui.appendChild(b);
            return b;
        });
        box.appendChild(ui);
        box.appendChild(cap);
        var cur = -1, auto = 0;
        var go = function (i) {
            cur = i;
            canvas.mxStory = i;
            btns.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
            cap.innerHTML = '<b>' + (i + 1) + ' · ' + STEPS[i][0] + '.</b> ' + STEPS[i][1];
        };
        var stopAuto = function () { clearInterval(auto); auto = 0; };
        go(0);
        if (!reduce) {
            // Autoplay while on screen, until the visitor takes over.
            var startAuto = function () {
                if (!auto) {
                    auto = setInterval(function () { go((cur + 1) % STEPS.length); }, 5200);
                }
            };
            var touched = false;
            box.addEventListener('pointerdown', function () { touched = true; stopAuto(); });
            new IntersectionObserver(function (en) {
                if (en[0].isIntersecting && !touched) { startAuto(); } else { stopAuto(); }
            }, { threshold: 0.5 }).observe(box);
        }
    } else {
        var wrap = document.createElement('div');
        wrap.className = 'mx-tz-cap';
        wrap.innerHTML = '<label for="mx-tz-days" style="font-weight:700;color:var(--brand,#0E3A43)">¿Cuándo se hace? Días de vida del bebé</label>' +
            '<input id="mx-tz-days" class="mx-tz-range" type="range" min="0" max="4" step="1" value="1">' +
            '<div class="mx-tz-ticks">' + WHEN.map(function (w) { return '<span>' + w[0] + '</span>'; }).join('') + '</div>' +
            '<p style="margin:8px 0 0" aria-live="polite"></p>';
        box.appendChild(wrap);
        var range = wrap.querySelector('input'), out = wrap.querySelector('p'), ticks = wrap.querySelectorAll('.mx-tz-ticks span');
        var set = function () {
            var w = WHEN[+range.value];
            out.innerHTML = w[1];
            range.setAttribute('aria-valuetext', w[0]);
            Array.prototype.forEach.call(ticks, function (t, k) { t.classList.toggle('on', k === +range.value); });
            canvas.style.opacity = String(0.25 + 0.75 * w[2]);
            canvas.style.filter = w[2] < 0.3 ? 'grayscale(1)' : 'none';
        };
        range.addEventListener('input', set);
        set();
    }

    // The heel tag appears while the pointer is over the heel on the footprint.
    var px = 0, py = 0;
    function show() {
        tag.classList.toggle('is-on', canvas.mxHover === 'heel');
        tag.style.left = px + 14 + 'px';
        tag.style.top = py - 34 + 'px';
    }
    box.addEventListener('pointermove', function (e) {
        var r = box.getBoundingClientRect();
        px = Math.min(e.clientX - r.left, r.width - 250);
        py = e.clientY - r.top;
        requestAnimationFrame(function () { setTimeout(show, 100); });
    });
    box.addEventListener('pointerleave', function () { setTimeout(show, 80); });
})();
