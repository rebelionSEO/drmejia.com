// /profesionales/ signature (prototype): the referral network. In the "¿Quiere referir un paciente?"
// band, a faint map of Central America (Natural Earth 50m, simplified) sits beside the text; as the band
// scrolls in, arcs draw from each capital to Managua, one after another, each landing with a pulse.
(function () {
    'use strict';

    var band = document.querySelector('main .home-cta-section');
    if (!band) {
        return;
    }
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // The map sits next to this script, wherever the site serves it from.
    var MAP_URL = new URL('ca-map.json', (document.currentScript && document.currentScript.src) || location.href).href;
    var NS = 'http://www.w3.org/2000/svg';
    var ORDER = ['GTM', 'BLZ', 'SLV', 'HND', 'CRI', 'PAN'];   // north to south, then to Managua
    var css = getComputedStyle(document.documentElement);
    var accent = css.getPropertyValue('--accent').trim() || '#7E9A8F';
    var light = css.getPropertyValue('--accent-soft').trim() || '#E8EFEB';

    fetch(MAP_URL).then(function (r) { return r.json(); }).then(function (map) {
        var v = map.view, cap = map.capitals, mga = cap.NIC;
        var svg = document.createElementNS(NS, 'svg');
        svg.setAttribute('viewBox', v.join(' '));
        svg.setAttribute('aria-hidden', 'true');
        svg.style.cssText = 'position:absolute;z-index:0;pointer-events:none;top:50%;transform:translateY(-50%)';
        function el(name, attrs, parent) {
            var n = document.createElementNS(NS, name);
            Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
            (parent || svg).appendChild(n);
            return n;
        }
        Object.keys(map.paths).forEach(function (k) {
            var ca = ORDER.indexOf(k) >= 0 || k === 'NIC';
            el('path', {
                d: map.paths[k],
                fill: k === 'NIC' ? accent : 'rgba(255,255,255,' + (ca ? 0.05 : 0.025) + ')',
                'fill-opacity': k === 'NIC' ? 0.45 : 1,
                stroke: 'rgba(255,255,255,' + (ca ? 0.22 : 0.1) + ')',
                'stroke-width': '1',
                'stroke-linejoin': 'round'
            });
        });
        var arcs = ORDER.map(function (k) {
            var a = cap[k], dx = mga[0] - a[0], dy = mga[1] - a[1], len = Math.hypot(dx, dy);
            // bow each arc to the north-east side, more for longer trips
            var cx = (a[0] + mga[0]) / 2 + dy / len * len * 0.28, cy = (a[1] + mga[1]) / 2 - dx / len * len * 0.28;
            el('circle', { cx: a[0], cy: a[1], r: '3.5', fill: light, 'fill-opacity': '0.75' });
            var path = el('path', { d: 'M ' + a[0] + ' ' + a[1] + ' Q ' + cx + ' ' + cy + ' ' + mga[0] + ' ' + mga[1], fill: 'none', stroke: light, 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-opacity': '0.85' });
            var L = path.getTotalLength();
            path.style.strokeDasharray = L + ' ' + L;
            path.style.strokeDashoffset = String(L);
            var dot = el('circle', { r: '3.2', fill: '#fff', opacity: '0' });
            return { path: path, L: L, dot: dot };
        });
        var pulse = el('circle', { cx: mga[0], cy: mga[1], r: '7', fill: 'none', stroke: '#fff', 'stroke-width': '1.5', opacity: '0' });
        el('circle', { cx: mga[0], cy: mga[1], r: '5.5', fill: '#fff' });
        var label = el('text', { x: mga[0] + 10, y: mga[1] + 4, 'font-size': '15', 'font-weight': '700', fill: '#fff' });
        label.textContent = 'Managua';

        if (getComputedStyle(band).position === 'static') {
            band.style.position = 'relative';
        }
        band.insertBefore(svg, band.firstChild);

        // Wide screens: pinned right, and small enough that its west edge (Guatemala) clears the text.
        // Narrow screens: centred behind the text, faded far back.
        function place() {
            var br = band.getBoundingClientRect(), text = band.querySelector('.container');
            var textRight = 0;
            if (text) {
                Array.prototype.forEach.call(text.children, function (c) { textRight = Math.max(textRight, c.getBoundingClientRect().right - br.left); });
            }
            var room = br.width - textRight - 24, wide = room > 260;
            var h = wide ? Math.min(br.height * 1.05, room * v[3] / v[2]) : br.height * 1.05;
            svg.setAttribute('height', h);
            svg.setAttribute('width', h * v[2] / v[3]);
            svg.style.right = wide ? '0' : '50%';
            svg.style.transform = wide ? 'translateY(-50%)' : 'translate(50%, -50%)';
            svg.style.opacity = wide ? '1' : '0.22';
        }

        function update() {
            var r = band.getBoundingClientRect(), vh = window.innerHeight;
            var p = reduce ? 1 : Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.6)));
            var landed = 0;
            arcs.forEach(function (a, i) {
                // each arc gets its own slice of the progress, overlapping a little
                var t = Math.max(0, Math.min(1, (p - i * 0.12) / 0.3));
                a.path.style.strokeDashoffset = String(a.L * (1 - t));
                var at = a.path.getPointAtLength(a.L * t);
                a.dot.setAttribute('cx', at.x);
                a.dot.setAttribute('cy', at.y);
                a.dot.setAttribute('opacity', t > 0 && t < 1 ? '1' : '0');
                if (t >= 1) {
                    landed++;
                }
            });
            pulse.setAttribute('opacity', landed ? String(0.25 + 0.1 * landed) : '0');
            pulse.setAttribute('r', String(7 + landed * 2.2));
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
        window.addEventListener('resize', function () { place(); update(); });
        place();
        update();
    });
})();
