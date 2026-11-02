// Cursor layer (prototype), shared by every inner page. Mouse and trackpad only; phones keep the scroll
// motion. Three pieces, all transforms or one canvas per dark surface, all idle until the cursor moves:
//   1. Cards lean toward the cursor (a few degrees, in perspective) with a soft light that follows it.
//   2. Primary buttons pull gently toward a nearby cursor (magnetic).
//   3. The dark bands and the footer carry a faint particle double helix, the homepage hero's language:
//      it turns toward the cursor and its particles step aside around it, then settle back.
(function () {
    'use strict';

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var root = getComputedStyle(document.documentElement);
    function tok(name, fb) { return (root.getPropertyValue(name) || '').trim() || fb; }
    function rgb(h) { var n = parseInt(h.replace('#', ''), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
    var ACCENT = rgb(tok('--accent', '#7E9A8F')), SOFT = rgb(tok('--accent-soft', '#E8EFEB'));

    // ---- 1. cards ---------------------------------------------------------------------------------
    // A card that holds a form, or is very tall, only gets the light (tilting a form while typing is bad).
    function setupCards() {
        var cards = document.querySelectorAll('main .card, main .row-card, main .post-card');
        Array.prototype.forEach.call(cards, function (el) {
            var flat = el.matches('details') || !!el.querySelector('form, input, textarea, select, iframe') || el.offsetHeight > 460;
            var s = { rx: 0, ry: 0, o: 0, trx: 0, try_: 0, to: 0, x: 0, y: 0, raf: 0, on: false };
            function paint() {
                s.raf = 0;
                var k = 0.16;
                s.rx += (s.trx - s.rx) * k;
                s.ry += (s.try_ - s.ry) * k;
                s.o += (s.to - s.o) * k;
                var settled = Math.abs(s.trx - s.rx) < 0.01 && Math.abs(s.try_ - s.ry) < 0.01 && Math.abs(s.to - s.o) < 0.005;
                if (!s.on && settled) {
                    el.style.transform = '';
                    el.style.backgroundImage = '';
                    el.style.transition = '';
                    return;
                }
                if (!flat) {
                    el.style.transform = 'perspective(900px) rotateX(' + s.rx.toFixed(2) + 'deg) rotateY(' + s.ry.toFixed(2) + 'deg)';
                }
                el.style.backgroundImage = 'radial-gradient(340px circle at ' + s.x.toFixed(0) + 'px ' + s.y.toFixed(0) + 'px, rgba(' + ACCENT.join(',') + ',' + (0.16 * s.o).toFixed(3) + '), transparent 70%)';
                s.raf = requestAnimationFrame(paint);
            }
            function kick() {
                if (!s.raf) {
                    s.raf = requestAnimationFrame(paint);
                }
            }
            el.addEventListener('pointermove', function (e) {
                if (e.pointerType !== 'mouse' || el.closest('.mx-up:not(.mx-in)')) {
                    return;                        // still revealing: leave its entrance alone
                }
                var r = el.getBoundingClientRect(), u = (e.clientX - r.left) / r.width, v = (e.clientY - r.top) / r.height;
                var max = 5 * Math.min(1, 340 / Math.max(r.width, r.height * 1.4));   // big cards lean less
                s.x = e.clientX - r.left;
                s.y = e.clientY - r.top;
                s.trx = (0.5 - v) * 2 * max;
                s.try_ = (u - 0.5) * 2 * max;
                s.to = 1;
                if (!s.on) {
                    s.on = true;
                    el.style.transition = 'box-shadow .3s ease, border-color .3s ease';   // transform is driven here
                }
                kick();
            });
            el.addEventListener('pointerleave', function () {
                s.on = false;
                s.trx = s.try_ = s.to = 0;
                kick();
            });
        });
    }

    // ---- 2. magnetic buttons ----------------------------------------------------------------------
    function setupButtons() {
        var btns = Array.prototype.slice.call(document.querySelectorAll('main .btn, .site-header .btn'));
        if (!btns.length) {
            return;
        }
        var st = btns.map(function () { return { x: 0, y: 0, tx: 0, ty: 0 }; }), mx = -1e4, my = -1e4, raf = 0;
        function paint() {
            raf = 0;
            var moving = false;
            btns.forEach(function (b, i) {
                var r = b.getBoundingClientRect(), s = st[i];
                if (r.bottom < 0 || r.top > window.innerHeight) {
                    s.tx = s.ty = 0;
                } else {
                    var cx = r.left + r.width / 2, cy = r.top + r.height / 2, dx = mx - cx, dy = my - cy;
                    var reach = Math.max(r.width, r.height) / 2 + 70, d = Math.hypot(dx, dy);
                    var f = d < reach ? 1 - d / reach : 0;
                    s.tx = dx * 0.22 * f;
                    s.ty = dy * 0.3 * f;
                }
                s.x += (s.tx - s.x) * 0.2;
                s.y += (s.ty - s.y) * 0.2;
                if (Math.abs(s.tx - s.x) > 0.02 || Math.abs(s.ty - s.y) > 0.02) {
                    moving = true;
                }
                // the `translate` property composes with the theme's own hover transform
                b.style.translate = Math.abs(s.x) + Math.abs(s.y) < 0.05 ? '' : s.x.toFixed(2) + 'px ' + s.y.toFixed(2) + 'px';
            });
            if (moving) {
                raf = requestAnimationFrame(paint);
            }
        }
        window.addEventListener('pointermove', function (e) {
            if (e.pointerType !== 'mouse') {
                return;
            }
            mx = e.clientX;
            my = e.clientY;
            if (!raf) {
                raf = requestAnimationFrame(paint);
            }
        }, { passive: true });
        document.documentElement.addEventListener('mouseleave', function () { mx = my = -1e4; if (!raf) { raf = requestAnimationFrame(paint); } });
    }

    // ---- 3. particle helix on the dark surfaces ----------------------------------------------------
    var dot = (function () {
        var c = document.createElement('canvas'), R = 16;
        c.width = c.height = R * 2;
        var g = c.getContext('2d'), rg = g.createRadialGradient(R, R, 0, R, R, R);
        rg.addColorStop(0, 'rgba(255,255,255,1)');
        rg.addColorStop(0.35, 'rgba(255,255,255,0.55)');
        rg.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = rg;
        g.fillRect(0, 0, R * 2, R * 2);
        return c;
    })();
    function tint(col) {
        // the white dot, recoloured once per colour
        var c = document.createElement('canvas');
        c.width = dot.width;
        c.height = dot.height;
        var g = c.getContext('2d');
        g.drawImage(dot, 0, 0);
        g.globalCompositeOperation = 'source-in';
        g.fillStyle = 'rgb(' + col.join(',') + ')';
        g.fillRect(0, 0, c.width, c.height);
        return c;
    }
    var DOT_FRONT = tint(SOFT), DOT_BACK = tint(ACCENT);

    function field(host, opts) {
        var canvas = document.createElement('canvas');
        canvas.className = 'mx-field';
        canvas.setAttribute('aria-hidden', 'true');
        canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0';
        if (getComputedStyle(host).position === 'static') {
            host.style.position = 'relative';
        }
        host.style.overflow = 'hidden';
        host.insertBefore(canvas, host.firstChild);
        var ctx = canvas.getContext('2d'), W = 1, H = 1, dpr = 1, pts = [], dust = [];
        var rand = (function (seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; })(opts.seed);
        var ptr = { x: -1e4, y: -1e4, on: 0, ton: 0, nx: 0, tnx: 0 };

        function build() {
            var r = host.getBoundingClientRect();
            W = r.width;
            H = r.height;
            dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);
            pts = [];
            // two strands of particle clouds along the width, plus base-pair rungs between them
            var n = Math.round(Math.min(260, W / 5.5)), turns = Math.max(2, W / 420);
            for (var i = 0; i < n; i++) {
                var u = i / (n - 1);
                for (var k = 0; k < 2; k++) {
                    for (var c = 0; c < 2; c++) {
                        pts.push({ u: u, ph: u * turns * Math.PI * 2 + k * Math.PI, j: (rand() - 0.5) * 7, jy: (rand() - 0.5) * 7, s: 0.6 + rand() * 0.8, ox: 0, oy: 0, rung: -1 });
                    }
                }
                if (i % 4 === 0) {
                    for (var q = 1; q < 6; q++) {
                        pts.push({ u: u, ph: u * turns * Math.PI * 2, j: (rand() - 0.5) * 3, jy: 0, s: 0.45 + rand() * 0.3, ox: 0, oy: 0, rung: q / 6 });
                    }
                }
            }
            dust = [];
            for (var d = 0; d < Math.round(W / 24); d++) {
                dust.push({ x: rand() * W, y: rand() * H, s: 0.4 + rand() * 0.9, vx: (rand() - 0.5) * 0.12, vy: (rand() - 0.5) * 0.08, ox: 0, oy: 0 });
            }
        }

        var spin = 0, last = 0, raf = 0, visible = false;
        function frame(now) {
            raf = 0;
            var dt = last ? Math.min(50, now - last) : 16;
            last = now;
            if (!reduce) {
                spin += dt * 0.00018;
            }
            ptr.on += (ptr.ton - ptr.on) * 0.06;
            ptr.nx += (ptr.tnx - ptr.nx) * 0.05;
            var cy = H * opts.y, A = Math.min(H * 0.26, 70), turn = spin + ptr.nx * 0.9;   // turns toward the cursor
            var RAD = 130, PUSH = 38;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            function draw(spr, x, y, size, alpha) {
                ctx.globalAlpha = alpha;
                ctx.drawImage(spr, (x - size) * dpr, (y - size) * dpr, size * 2 * dpr, size * 2 * dpr);
            }
            function repel(p, x, y) {
                var tx = 0, ty = 0;
                if (ptr.on > 0.01) {
                    var dx = x - ptr.x, dy = y - ptr.y, d = Math.sqrt(dx * dx + dy * dy);
                    if (d < RAD && d > 0.1) {
                        var f = (1 - d / RAD);
                        f = f * f * PUSH * ptr.on;
                        tx = dx / d * f;
                        ty = dy / d * f;
                    }
                }
                p.ox += (tx - p.ox) * 0.12;
                p.oy += (ty - p.oy) * 0.12;
            }
            for (var i = 0; i < pts.length; i++) {
                var p = pts[i], ph = p.ph + turn, x = -0.04 * W + p.u * 1.08 * W + p.j, y, z;
                if (p.rung >= 0) {
                    var y1 = cy + A * Math.sin(ph), y2 = cy + A * Math.sin(ph + Math.PI);
                    y = y1 + (y2 - y1) * p.rung;
                    z = 0;
                } else {
                    y = cy + A * Math.sin(ph) + p.jy;
                    z = Math.cos(ph);              // depth: +1 in front, -1 behind
                }
                repel(p, x, y);
                x += p.ox;
                y += p.oy;
                var front = z > 0, size = (1.3 + z * 0.9) * p.s * 2.2;
                var alpha = p.rung >= 0 ? 0.18 : (0.22 + 0.4 * (z + 1) / 2);
                draw(front ? DOT_FRONT : DOT_BACK, x, y, size, alpha * opts.alpha);
            }
            for (var d = 0; d < dust.length; d++) {
                var q = dust[d];
                if (!reduce) {
                    q.x += q.vx * dt / 16;
                    q.y += q.vy * dt / 16;
                    if (q.x < -5) { q.x = W + 5; } else if (q.x > W + 5) { q.x = -5; }
                    if (q.y < -5) { q.y = H + 5; } else if (q.y > H + 5) { q.y = -5; }
                }
                repel(q, q.x, q.y);
                draw(DOT_FRONT, q.x + q.ox, q.y + q.oy, q.s * 2.4, 0.22 * opts.alpha);
            }
            ctx.globalAlpha = 1;
            if (visible && !reduce) {
                raf = requestAnimationFrame(frame);
            } else {
                last = 0;
            }
        }
        function kick() {
            if (!raf) {
                raf = requestAnimationFrame(frame);
            }
        }
        if (fine) {
            host.addEventListener('pointermove', function (e) {
                if (e.pointerType !== 'mouse') {
                    return;
                }
                var r = host.getBoundingClientRect();
                ptr.x = e.clientX - r.left;
                ptr.y = e.clientY - r.top;
                ptr.ton = 1;
                ptr.tnx = (ptr.x / r.width - 0.5) * 2;
                kick();
            });
            host.addEventListener('pointerleave', function () { ptr.ton = 0; ptr.tnx = 0; });
        }
        new IntersectionObserver(function (en) {
            visible = en[0].isIntersecting;
            if (visible) {
                kick();
            }
        }).observe(host);
        var lastW = 0;
        new ResizeObserver(function () {
            var w = host.getBoundingClientRect().width;
            if (Math.abs(w - lastW) > 1) {
                lastW = w;
                build();
                kick();
            }
        }).observe(host);
    }

    function setupFields() {
        if (!('IntersectionObserver' in window) || !('ResizeObserver' in window)) {
            return;
        }
        var style = document.createElement('style');
        style.textContent = '.site-footer>*:not(.mx-field){position:relative;z-index:1}';
        document.head.appendChild(style);
        // the /profesionales/ band already carries its own map
        var bandHasOwn = !!document.querySelector('script[src*="sig-profesionales"]');
        Array.prototype.forEach.call(document.querySelectorAll('main .home-cta-section'), function (band, i) {
            if (!bandHasOwn) {
                field(band, { y: 0.5, alpha: 0.75, seed: 3 + i });
            }
        });
        var foot = document.querySelector('.site-footer');
        if (foot) {
            field(foot, { y: 0.42, alpha: 0.5, seed: 9 });
        }
    }

    setupFields();                                   // the helix also drifts on phones; it just can't be pushed
    if (fine && !reduce) {
        setupCards();
        setupButtons();
    }
})();
