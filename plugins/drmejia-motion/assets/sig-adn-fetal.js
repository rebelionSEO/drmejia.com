// /adn-fetal/ signature v2 (prototype): an interactive microscope over the mother's blood.
// Three steps the visitor controls (they autoplay until someone touches them):
//   1 La sangre     cell-free DNA fragments drift in the plasma; a lens shows them up close
//   2 ADN del bebé  about 1 in 10 comes from the placenta (shorter fragments, as in reality) and lights up
//   3 El conteo     fragments of chromosomes 21, 18 and 13 fly into counts that reach the expected line;
//                   "¿Y con un 21 extra?" adds the surplus a trisomy 21 would show (exaggerated so it reads)
// Canvas 2D with pre-rendered depth-of-field sprites; drawn only while on screen; reduced motion = still.
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
    var hover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var root = getComputedStyle(document.documentElement);
    function tok(name, fb) { return (root.getPropertyValue(name) || '').trim() || fb; }
    function rgb(h) { var n = parseInt(h.replace('#', ''), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
    function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
    function rgba(c, a) { return 'rgba(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ',' + a + ')'; }
    function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
    function smooth(t) { return t * t * (3 - 2 * t); }
    var C = {
        deep: rgb(tok('--brand-deep', '#082B33')),
        brand: rgb(tok('--brand', '#0E3A43')),
        brand2: rgb(tok('--brand-2', '#24545C')),
        accent: rgb(tok('--accent', '#7E9A8F')),
        soft: rgb(tok('--accent-soft', '#E8EFEB')),
        white: [255, 255, 255]
    };
    var MAT = mix(C.accent, C.soft, 0.35);          // the mother's fragments: sage
    var FET = mix(C.white, C.soft, 0.25);           // the placenta's: near-white, glowing
    var FONT = tok('--sans', 'sans-serif');

    var STEPS = [
        { short: 'Sangre', long: 'La sangre', cap: 'En la sangre de la mamá flotan pequeños fragmentos de ADN' },
        { short: 'Bebé', long: 'ADN del bebé', cap: 'Cerca de 1 de cada 10 viene de la placenta y suele reflejar el ADN del bebé' },
        { short: 'Conteo', long: 'El conteo', cap: 'Se cuentan los fragmentos de los cromosomas 21, 18 y 13 y se comparan con lo esperado' }
    ];
    var TRI_CAP = 'Con un 21 extra se cuentan más fragmentos del 21 de lo esperado (diferencia exagerada). Se confirma con un estudio diagnóstico.';
    var CHROMS = ['21', '18', '13'];

    // ---- DOM ------------------------------------------------------------------------------------
    var style = document.createElement('style');
    style.textContent =
        '.mx-nipt{position:absolute;inset:0}' +
        '.mx-nipt canvas{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y}' +
        '.mx-nipt-bar{position:absolute;left:16px;right:16px;top:16px;display:flex;gap:6px;align-items:center}' +
        '.mx-nipt-btn{position:relative;overflow:hidden;flex:none;font:600 12px/1 ' + FONT + ';color:rgba(255,255,255,.86);background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:8px 12px;cursor:pointer;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);transition:background .25s ease,color .25s ease,border-color .25s ease,opacity .3s ease,transform .3s ease}' +
        '.mx-nipt-btn:hover{background:rgba(255,255,255,.18)}' +
        '.mx-nipt-btn[aria-pressed="true"]{background:#fff;color:var(--brand);border-color:#fff}' +
        '.mx-nipt-btn b{font-weight:800;margin-right:5px;opacity:.6}' +
        '.mx-nipt-btn i{position:absolute;left:0;bottom:0;height:2px;width:calc(var(--p,0) * 100%);background:var(--accent)}' +
        '.mx-nipt-btn:focus-visible{outline:2px solid #fff;outline-offset:2px}' +
        '.mx-nipt-tri{margin-left:auto;opacity:0;pointer-events:none;transform:translateY(-4px)}' +
        '.mx-nipt-tri.on{opacity:1;pointer-events:auto;transform:none}' +
        '.mx-nipt-cap{position:absolute;left:18px;right:18px;bottom:16px;margin:0;font:600 13px/1.4 ' + FONT + ';color:rgba(255,255,255,.94);text-wrap:balance;transition:opacity .2s ease}' +
        '@media (max-width:480px){.mx-nipt-bar{left:12px;right:12px;top:12px;gap:4px}.mx-nipt-btn{font-size:11px;padding:7px 9px}.mx-nipt-btn b{margin-right:3px}.mx-nipt-cap{font-size:11.5px;left:14px;right:14px;bottom:12px}}' +
        '@media (prefers-reduced-motion:reduce){.mx-nipt *{transition:none!important}}';
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.className = 'mx-nipt';
    var canvas = document.createElement('canvas');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Ilustración interactiva: fragmentos de ADN libre en la sangre materna; cerca de uno de cada diez viene de la placenta; los fragmentos de los cromosomas 21, 18 y 13 se cuentan y se comparan con lo esperado.');
    var bar = document.createElement('div');
    bar.className = 'mx-nipt-bar';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Cómo funciona el ADN fetal');
    function button(cls) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'mx-nipt-btn' + (cls ? ' ' + cls : '');
        b.setAttribute('aria-pressed', 'false');
        b.appendChild(document.createElement('i'));
        var t = document.createElement('span');
        t.style.position = 'relative';
        b.appendChild(t);
        b._label = t;
        bar.appendChild(b);
        return b;
    }
    var btns = STEPS.map(function (s, i) {
        var b = button();
        b.addEventListener('click', function () { takeOver(); go(i, false); });
        return b;
    });
    var tri = button('mx-nipt-tri');
    tri.addEventListener('click', function () { takeOver(); go(2, !triOn); });
    var cap = document.createElement('p');
    cap.className = 'mx-nipt-cap';

    Array.prototype.forEach.call(box.querySelectorAll('.placeholder-tag'), function (t) { t.remove(); });
    box.style.background = 'var(--brand-deep)';
    wrap.appendChild(canvas);
    wrap.appendChild(bar);
    wrap.appendChild(cap);
    box.appendChild(wrap);
    var ctx = canvas.getContext('2d');

    // ---- sprites: a short double helix, pre-blurred per depth -----------------------------------
    var K = 4;                                       // sprite resolution (sharp inside the lens too)
    function helix(len, col, blur, glow) {
        var pad = Math.ceil(blur * 2.5 + (glow ? 9 : 2)), cw = len + pad * 2, ch = 8 + pad * 2;
        var c = document.createElement('canvas');
        c.width = Math.ceil(cw * K);
        c.height = Math.ceil(ch * K);
        var g = c.getContext('2d');
        g.scale(K, K);
        g.translate(pad, ch / 2);
        if (glow) {
            g.save();
            g.translate(len / 2, 0);
            g.scale(len / 2 + 7, 9);
            var rg = g.createRadialGradient(0, 0, 0, 0, 0, 1);
            rg.addColorStop(0, rgba(col, 0.42));
            rg.addColorStop(1, rgba(col, 0));
            g.fillStyle = rg;
            g.fillRect(-1, -1, 2, 2);
            g.restore();
        }
        var OFF = 2000;
        if (blur > 0) {
            // draw only the shadow: a blur that works in every browser (ctx.filter does not)
            g.shadowColor = rgba(col, 1);
            g.shadowBlur = blur * K;
            g.shadowOffsetX = OFF;
            g.translate(-OFF / K, 0);
        }
        var A = 2.6, turns = len / 12;
        g.lineCap = 'round';
        g.strokeStyle = rgba(col, 1);
        // base-pair rungs
        g.lineWidth = 0.8;
        g.globalAlpha = 0.55;
        for (var r = 1; r < 12; r++) {
            var x = len * r / 12, y = A * Math.sin(Math.PI * 2 * turns * r / 12);
            g.beginPath();
            g.moveTo(x, y);
            g.lineTo(x, -y);
            g.stroke();
        }
        [0, Math.PI].forEach(function (ph, k) {
            g.globalAlpha = k ? 0.7 : 1;
            g.lineWidth = 1.35;
            g.beginPath();
            for (var s = 0; s <= 28; s++) {
                var xx = len * s / 28, yy = A * Math.sin(Math.PI * 2 * turns * s / 28 + ph);
                if (s) { g.lineTo(xx, yy); } else { g.moveTo(xx, yy); }
            }
            g.stroke();
        });
        c.cw = cw;
        c.ch = ch;
        return c;
    }
    var LEN = 20, BLUR = [2.4, 0.9, 0], SCALE = [0.55, 0.8, 1.05], ALPHA = [0.34, 0.6, 0.86];
    var SPR = {
        mat: BLUR.map(function (b) { return helix(LEN, MAT, b, false); }),
        matS: BLUR.map(function (b) { return helix(LEN * 0.86, MAT, b, false); }),   // fetal cfDNA is shorter
        fet: BLUR.map(function (b) { return helix(LEN * 0.86, FET, b, true); }),
        bokeh: helix(LEN, MAT, 5, false)
    };
    var cellSprite = (function () {
        var R = 64, c = document.createElement('canvas');
        c.width = c.height = R * 2;
        var g = c.getContext('2d'), rg = g.createRadialGradient(R, R, 0, R, R, R);
        // a red cell seen face-on: a pale ring around a dimmer centre (biconcave), soft-edged
        rg.addColorStop(0, rgba(C.brand2, 0.35));
        rg.addColorStop(0.45, rgba(C.brand2, 0.5));
        rg.addColorStop(0.72, rgba(mix(C.brand2, C.accent, 0.5), 0.75));
        rg.addColorStop(0.86, rgba(C.brand2, 0.45));
        rg.addColorStop(1, rgba(C.brand2, 0));
        g.fillStyle = rg;
        g.fillRect(0, 0, R * 2, R * 2);
        return c;
    })();

    // ---- scene ----------------------------------------------------------------------------------
    var W = 1, H = 1, dpr = 1, frags = [], cells = [], bokeh = [], bg = null, scrim = null, per = 8;
    var G = {};                                      // layout of the count
    var rand = (function (seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; })(11);

    function build() {
        var r = box.getBoundingClientRect();
        if (r.width < 2) {
            return;
        }
        W = r.width;
        H = r.height;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        var small = W < 420;
        btns.forEach(function (b, i) { b._label.innerHTML = '<b>' + (i + 1) + '</b>' + (small ? STEPS[i].short : STEPS[i].long); });
        tri._label.textContent = small ? '¿21 extra?' : '¿Y con un 21 extra?';

        // the count's geometry: between the buttons and the caption
        G.top = small ? 56 : 68;
        G.bottom = H - (small ? 66 : 70);
        G.rowH = (G.bottom - G.top) / 3;
        G.x0 = W * 0.2;
        G.x1 = W * 0.76;
        G.lensR = Math.max(46, Math.min(W, H) * 0.2);

        // background: deep petrol with a soft light, darker under the caption and buttons
        bg = document.createElement('canvas');
        bg.width = canvas.width;
        bg.height = canvas.height;
        var g = bg.getContext('2d');
        g.scale(dpr, dpr);
        var rg = g.createRadialGradient(W * 0.38, H * 0.36, 0, W * 0.38, H * 0.36, Math.max(W, H) * 0.85);
        rg.addColorStop(0, rgba(C.brand2, 1));
        rg.addColorStop(0.55, rgba(C.brand, 1));
        rg.addColorStop(1, rgba(C.deep, 1));
        g.fillStyle = rg;
        g.fillRect(0, 0, W, H);
        // scrims under the caption and the buttons, drawn over the fragments
        scrim = document.createElement('canvas');
        scrim.width = canvas.width;
        scrim.height = canvas.height;
        var sg = scrim.getContext('2d');
        sg.scale(dpr, dpr);
        var cb = H - G.bottom + 24, lg = sg.createLinearGradient(0, H - cb, 0, H);
        lg.addColorStop(0, rgba(C.deep, 0));
        lg.addColorStop(0.45, rgba(C.deep, 0.72));
        lg.addColorStop(1, rgba(C.deep, 0.92));
        sg.fillStyle = lg;
        sg.fillRect(0, H - cb, W, cb);
        lg = sg.createLinearGradient(0, 0, 0, G.top);
        lg.addColorStop(0, rgba(C.deep, 0.6));
        lg.addColorStop(1, rgba(C.deep, 0));
        sg.fillStyle = lg;
        sg.fillRect(0, 0, W, G.top);

        var n = Math.round(Math.min(440, W * H / 480));
        frags = [];
        for (var i = 0; i < n; i++) {
            var rz = rand();
            frags.push({
                x: rand() * W, y: rand() * H, z: rz < 0.38 ? 0 : rz < 0.82 ? 1 : 2,
                a: rand() * Math.PI * 2, va: (rand() - 0.5) * 0.008, vx: 0, vy: 0,
                fetal: i % 10 === 0, chrom: -1, extra: false, slot: 0, delay: rand(), sx: 0, sy: 0, ss: 1, sa: 0, t: 0
            });
        }
        // the counted fragments: an equal share for 21, 18 and 13 (in focus), plus a surplus for the "21 extra"
        per = Math.max(8, Math.round(n * 0.05));
        var extras = Math.round(per * 0.2), pool = frags.filter(function (f) { return f.z > 0; }), k = 0;
        for (var j = 0; j < per * 3 && k < pool.length; j++, k++) {
            pool[k].chrom = j % 3;
            pool[k].slot = Math.floor(j / 3);
        }
        for (var e = 0; e < extras && k < pool.length; e++, k++) {
            pool[k].chrom = 0;
            pool[k].extra = true;
            pool[k].slot = per + e;
        }
        cells = [];
        for (var c = 0; c < 7; c++) {
            cells.push({ x: rand() * W, y: rand() * H, r: H * (0.1 + rand() * 0.07), vx: (rand() - 0.5) * 0.05, vy: (rand() - 0.5) * 0.04 });
        }
        bokeh = [];
        for (var bk = 0; bk < 4; bk++) {
            bokeh.push({ x: rand() * W, y: rand() * H, a: rand() * Math.PI, va: (rand() - 0.5) * 0.002, s: 2 + rand() * 1.2, vx: (rand() - 0.5) * 0.12 });
        }
        lens.x = lens.tx = W * 0.5;
        lens.y = lens.ty = (G.top + G.bottom) / 2;
    }
    function slotOf(f) {
        var step = (G.x1 - G.x0) / per;
        return {
            x: G.x0 + step * (f.slot + 0.5),
            y: G.top + G.rowH * (f.chrom + 0.5) + (f.slot % 2 ? -1 : 1) * G.rowH * 0.1,
            a: Math.PI / 2
        };
    }

    // ---- state ----------------------------------------------------------------------------------
    var step = 0, triOn = false, auto = !reduce, seen = false, visible = false;
    var want = { hl: 0, sort: 0, tri: 0, lens: 1 }, cur = { hl: 0, sort: 0, tri: 0, lens: reduce ? 1 : 0, push: reduce ? 1 : 1.2 };
    var lens = { x: 0, y: 0, tx: 0, ty: 0, held: 0, touched: false };
    var tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    var SEQ = [{ s: 0, tri: false, d: 6500 }, { s: 1, tri: false, d: 6000 }, { s: 2, tri: false, d: 5000 }, { s: 2, tri: true, d: 6500 }];
    var seqI = 0, clock = 0, capText = '', capTimer = 0;

    function setCap(t) {
        if (t === capText) {
            return;
        }
        capText = t;
        if (reduce) {
            cap.textContent = t;
            return;
        }
        cap.style.opacity = '0';
        clearTimeout(capTimer);
        capTimer = setTimeout(function () { cap.textContent = t; cap.style.opacity = '1'; }, 200);
    }
    function go(i, withTri) {
        step = i;
        triOn = i === 2 && withTri;
        want.hl = step >= 1 ? 1 : 0;
        want.sort = step >= 2 ? 1 : 0;
        want.tri = triOn ? 1 : 0;
        want.lens = step < 2 ? 1 : 0;
        btns.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === step)); });
        tri.classList.toggle('on', step === 2);
        tri.setAttribute('aria-pressed', String(triOn));
        tri.tabIndex = step === 2 ? 0 : -1;
        setCap(triOn ? TRI_CAP : STEPS[step].cap);
        kick();
    }
    function takeOver() {
        if (auto) {
            auto = false;
            btns.forEach(function (b) { b.style.setProperty('--p', '0'); });
            cap.setAttribute('aria-live', 'polite');
        }
    }

    // ---- pointer: the lens follows the cursor (or a tap), and the field tilts a little -------------
    function local(e) {
        var r = canvas.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    canvas.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') {
            return;
        }
        var p = local(e);
        lens.tx = p.x;
        lens.ty = p.y;
        lens.held = performance.now() + 1200;
        lens.touched = true;
        tilt.tx = (p.x / W - 0.5) * 2;
        tilt.ty = (p.y / H - 0.5) * 2;
        kick();
    });
    canvas.addEventListener('pointerleave', function () { lens.held = performance.now() + 600; tilt.tx = tilt.ty = 0; });
    canvas.addEventListener('pointerdown', function (e) {
        var p = local(e);
        lens.tx = p.x;
        lens.ty = p.y;
        lens.held = performance.now() + 4000;
        lens.touched = true;
        kick();
    });

    // ---- frame ----------------------------------------------------------------------------------
    function ease(key, target, ms, dt) {
        cur[key] += (target - cur[key]) * (reduce ? 1 : 1 - Math.exp(-dt / ms));
        if (Math.abs(target - cur[key]) < 0.001) {
            cur[key] = target;
        }
    }
    function sprite(s, x, y, a, sc, alpha) {
        if (alpha <= 0.01) {
            return;
        }
        var c = Math.cos(a) * sc * dpr, sn = Math.sin(a) * sc * dpr;
        ctx.setTransform(c, sn, -sn, c, x * dpr, y * dpr);
        ctx.globalAlpha = alpha;
        ctx.drawImage(s, -s.cw / 2, -s.ch / 2, s.cw, s.ch);
    }

    function frame(dt, now) {
        // autoplay: walk the steps while the box is in view and nobody has taken over
        if (auto && seen && visible) {
            clock += dt;
            if (clock >= SEQ[seqI].d) {
                clock = 0;
                seqI = (seqI + 1) % SEQ.length;
                go(SEQ[seqI].s, SEQ[seqI].tri);
            }
            btns.forEach(function (b, k) {
                var p = 0;
                if (k === step) {
                    p = step === 2 ? (seqI === 3 ? SEQ[2].d + clock : clock) / (SEQ[2].d + SEQ[3].d) : clock / SEQ[seqI].d;
                }
                b.style.setProperty('--p', p.toFixed(3));
            });
        }
        ease('hl', want.hl, 300, dt);
        ease('sort', want.sort, 520, dt);
        ease('tri', want.tri, 520, dt);
        ease('lens', want.lens, 260, dt);
        if (seen) {
            ease('push', 1, 650, dt);
        }
        tilt.x += (tilt.tx - tilt.x) * (reduce ? 1 : 0.06);
        tilt.y += (tilt.ty - tilt.y) * (reduce ? 1 : 0.06);

        // lens: follow the pointer, otherwise wander slowly over the field
        if (now > lens.held && !reduce) {
            var s = now / 1000;
            lens.tx = W * (0.5 + 0.27 * Math.sin(s * 0.27));
            lens.ty = (G.top + G.bottom) / 2 + (G.bottom - G.top) * 0.3 * Math.sin(s * 0.37 + 1);
        }
        var lr = G.lensR;
        lens.ty = Math.max(G.top - 8 + lr * 0.6, Math.min(G.bottom - lr * 0.55, lens.ty));
        lens.x += (lens.tx - lens.x) * (reduce ? 1 : 0.12);
        lens.y += (lens.ty - lens.y) * (reduce ? 1 : 0.12);

        var cx = W / 2, cy = H / 2, push = cur.push, still = reduce;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = 1;
        ctx.drawImage(bg, 0, 0);

        // red cells, far back
        cells.forEach(function (c) {
            if (!still) {
                c.x += c.vx * dt / 16;
                c.y += c.vy * dt / 16;
                if (c.x < -c.r) { c.x = W + c.r; } else if (c.x > W + c.r) { c.x = -c.r; }
                if (c.y < -c.r) { c.y = H + c.r; } else if (c.y > H + c.r) { c.y = -c.r; }
            }
            var x = cx + (c.x - cx) * push - tilt.x * 3, y = cy + (c.y - cy) * push - tilt.y * 3, r = c.r * push;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.globalAlpha = 0.55 * (1 - cur.sort * 0.5);
            ctx.drawImage(cellSprite, x - r, y - r, r * 2, r * 2);
        });

        // the count's scaffolding: tracks, labels, the expected line
        if (cur.sort > 0.01) {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.globalAlpha = cur.sort;
            for (var i = 0; i < 3; i++) {
                var ry = G.top + G.rowH * (i + 0.5), th = Math.min(30, G.rowH * 0.62);
                ctx.fillStyle = 'rgba(255,255,255,0.06)';
                roundRect(G.x0 - 8, ry - th / 2, G.x1 - G.x0 + 16, th, th / 2);
                ctx.fillStyle = 'rgba(255,255,255,' + (i === 0 ? 0.85 + 0.15 * cur.tri : 0.85) + ')';
                ctx.font = '700 ' + (W < 420 ? 11 : 12) + 'px ' + FONT;
                ctx.textBaseline = 'middle';
                ctx.fillText('Cr. ' + CHROMS[i], W * 0.05, ry);
            }
            if (cur.tri > 0.01) {
                // the surplus on chromosome 21, past the expected line
                var ext = (G.x1 - G.x0) / per * Math.round(per * 0.2), ry0 = G.top + G.rowH * 0.5, th0 = Math.min(30, G.rowH * 0.62);
                ctx.globalAlpha = cur.tri;
                ctx.fillStyle = 'rgba(255,255,255,0.13)';
                roundRect(G.x1, ry0 - th0 / 2, ext * cur.tri + 8, th0, th0 / 2);
            }
            ctx.globalAlpha = cur.sort;
            ctx.setLineDash([4, 4]);
            ctx.strokeStyle = 'rgba(255,255,255,0.6)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(G.x1, G.top);
            ctx.lineTo(G.x1, G.bottom + 4);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.font = '600 10px ' + FONT;
            ctx.textBaseline = 'alphabetic';
            ctx.fillText('lo esperado', G.x1 + 6, G.top - 3);
        }

        // the fragments
        for (var fi = 0; fi < frags.length; fi++) {
            var f = frags[fi];
            if (!still) {
                f.vx = (f.vx + (rand() - 0.5) * 0.05) * 0.96;
                f.vy = (f.vy + (rand() - 0.5) * 0.05) * 0.96;
                var sp = (0.5 + f.z * 0.35) * dt / 16;
                f.x += f.vx * sp;
                f.y += f.vy * sp;
                f.a += f.va * dt / 16;
                if (f.x < -12) { f.x = W + 12; } else if (f.x > W + 12) { f.x = -12; }
                if (f.y < -12) { f.y = H + 12; } else if (f.y > H + 12) { f.y = -12; }
            }
            var par = [3, 7, 13][f.z];
            var x = cx + (f.x - cx) * push - tilt.x * par, y = cy + (f.y - cy) * push - tilt.y * par, a = f.a;
            var sc = SCALE[f.z] * push, alpha = ALPHA[f.z], t = 0;
            if (f.chrom >= 0) {
                t = smooth(clamp(((f.extra ? cur.tri : cur.sort) - f.delay * 0.35) / 0.65));
            }
            f.t = t;
            if (t > 0) {
                var g = slotOf(f), da = ((g.a - a) % Math.PI + Math.PI * 1.5) % Math.PI - Math.PI / 2;
                x += (g.x - x) * t;
                y += (g.y - y) * t;
                a += da * t;
                sc += (1 - sc) * t;
            }
            // while counting, everything not counted steps back
            if (t === 0) {
                alpha *= 1 - 0.82 * cur.sort;
                if (!f.fetal) {
                    alpha *= 1 - 0.35 * cur.hl;
                }
            } else {
                alpha += (0.95 - alpha) * t;
            }
            f.sx = x;
            f.sy = y;
            f.sa = a;
            f.ss = sc;
            var z = t > 0.5 ? 2 : f.z;
            if (f.fetal) {
                sprite(SPR.matS[z], x, y, a, sc, alpha * (1 - cur.hl));
                sprite(SPR.fet[z], x, y, a, sc, Math.min(1, alpha * 1.25) * cur.hl);
            } else if (f.extra && t > 0) {
                sprite(SPR.mat[z], x, y, a, sc, alpha * (1 - t));
                sprite(SPR.fet[2], x, y, a, sc, t);             // the surplus glows, so it reads
            } else {
                sprite(SPR.mat[z], x, y, a, sc, alpha);
            }
        }

        if (cur.lens > 0.01) {
            drawLens(now);
        }

        // out-of-focus fragments right in front of the lens: depth
        bokeh.forEach(function (b) {
            if (!still) {
                b.x += b.vx * dt / 16;
                b.a += b.va * dt / 16;
                if (b.x < -60) { b.x = W + 60; } else if (b.x > W + 60) { b.x = -60; }
            }
            sprite(SPR.bokeh, cx + (b.x - cx) * push - tilt.x * 22, cy + (b.y - cy) * push - tilt.y * 22, b.a, b.s * push, 0.16 * (1 - cur.sort * 0.7));
        });
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = 1;
        ctx.drawImage(scrim, 0, 0);
    }

    function roundRect(x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.fill();
    }

    var ZOOM = 2.4;
    function drawLens(now) {
        var R = G.lensR, lx = lens.x, ly = lens.y, la = cur.lens;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.save();
        ctx.globalAlpha = la;
        ctx.beginPath();
        ctx.arc(lx, ly, R, 0, Math.PI * 2);
        ctx.clip();
        var rg = ctx.createRadialGradient(lx, ly, 0, lx, ly, R);
        rg.addColorStop(0, rgba(C.brand2, 0.92));
        rg.addColorStop(1, rgba(C.deep, 0.96));
        ctx.fillStyle = rg;
        ctx.fillRect(lx - R, ly - R, R * 2, R * 2);
        // the lens is in focus: every fragment under it is drawn sharp, magnified
        var reach = R / ZOOM + 16, nearest = null, nd = 1e9;
        for (var i = 0; i < frags.length; i++) {
            var f = frags[i];
            if (f.t > 0) {
                continue;
            }
            var dx = f.sx - lx, dy = f.sy - ly;
            if (dx * dx + dy * dy > reach * reach) {
                continue;
            }
            var mx = lx + dx * ZOOM, my = ly + dy * ZOOM, sc = SCALE[f.z] * ZOOM * 0.8, a = la * (0.55 + 0.4 * (f.z / 2));
            if (f.fetal) {
                sprite(SPR.matS[2], mx, my, f.sa, sc, a * (1 - cur.hl));
                sprite(SPR.fet[2], mx, my, f.sa, sc, la * cur.hl);
                var d = dx * dx + dy * dy;
                if (d < nd) { nd = d; nearest = [mx, my]; }
            } else {
                sprite(SPR.mat[2], mx, my, f.sa, sc, a * (1 - 0.3 * cur.hl));
            }
        }
        ctx.restore();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        // rim and reticle
        ctx.globalAlpha = la;
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.arc(lx, ly, R + 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(lx, ly, R, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255,255,255,0.45)';
        for (var q = 0; q < 4; q++) {
            var ang = q * Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(lx + Math.cos(ang) * (R - 7), ly + Math.sin(ang) * (R - 7));
            ctx.lineTo(lx + Math.cos(ang) * (R - 1), ly + Math.sin(ang) * (R - 1));
            ctx.stroke();
        }
        // in step 2, name the placenta fragment closest to the lens centre
        if (nearest && cur.hl > 0.5) {
            var tx = Math.max(lx - R + 6, Math.min(lx + R - 66, nearest[0] + 10)), ty = Math.max(ly - R + 14, nearest[1] - 14);
            ctx.globalAlpha = la * (cur.hl - 0.5) * 2;
            ctx.font = '700 10px ' + FONT;
            var w = ctx.measureText('placenta').width + 12;
            ctx.fillStyle = 'rgba(255,255,255,0.95)';
            roundRect(tx, ty - 9, w, 17, 8.5);
            ctx.fillStyle = rgba(C.brand, 1);
            ctx.textBaseline = 'middle';
            ctx.fillText('placenta', tx + 6, ty);
        }
        // a first-time hint
        if (!lens.touched && step === 0) {
            ctx.globalAlpha = la * 0.75;
            ctx.fillStyle = '#fff';
            ctx.font = '600 11px ' + FONT;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // inside the rim, so it can never collide with the buttons or the caption
            ctx.fillText(hover ? 'Mueva el cursor' : 'Toque para ver', lx, ly + R * 0.72);
            ctx.textAlign = 'start';
        }
        ctx.globalAlpha = 1;
    }

    // ---- loop: only while on screen -----------------------------------------------------------------
    var raf = 0, last = 0;
    function tick(now) {
        raf = 0;
        var dt = last ? Math.min(50, now - last) : 16;
        last = now;
        frame(dt, now);
        if (visible && !reduce) {
            raf = requestAnimationFrame(tick);
        } else {
            last = 0;
        }
    }
    function kick() {
        if (!raf) {
            raf = requestAnimationFrame(tick);
        }
    }
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
            var en = entries[0];
            visible = en.isIntersecting;
            if (en.intersectionRatio >= 0.4) {
                seen = true;
            }
            if (visible) {
                kick();
            }
        }, { threshold: [0, 0.4] }).observe(box);
    } else {
        visible = seen = true;
    }
    var lastW = 0;
    if ('ResizeObserver' in window) {
        new ResizeObserver(function () {
            var w = box.getBoundingClientRect().width;
            if (Math.abs(w - lastW) > 1) {
                lastW = w;
                build();
                kick();
            }
        }).observe(box);
    }
    lastW = box.getBoundingClientRect().width;
    build();
    go(0, false);
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(kick);
    }
})();
