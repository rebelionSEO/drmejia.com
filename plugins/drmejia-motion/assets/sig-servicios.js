// /servicios/ signature (prototype): one thread, four services. A fine thread draws itself as you
// scroll, runs only through the empty space beside each card's icon, ties a loop around the icon
// and lights it. The route comes from the real card positions, so it follows any layout.
(function () {
    'use strict';

    var grid = document.querySelector('main .services-grid');
    var icons = grid ? grid.querySelectorAll('.icon-circle') : [];
    if (!grid || icons.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;left:0;top:0;overflow:visible;pointer-events:none;z-index:2';
    var thread = document.createElementNS(NS, 'path');
    thread.setAttribute('fill', 'none');
    thread.setAttribute('stroke-linecap', 'round');
    thread.setAttribute('stroke-linejoin', 'round');
    var head = document.createElementNS(NS, 'circle');
    head.setAttribute('r', '3.5');
    svg.appendChild(thread);
    svg.appendChild(head);
    if (getComputedStyle(grid).position === 'static') {
        grid.style.position = 'relative';   // only becomes the positioning box; layout is unchanged
    }
    grid.appendChild(svg);

    var css = getComputedStyle(document.documentElement);
    var accent = css.getPropertyValue('--accent').trim() || '#7E9A8F';
    var brand = css.getPropertyValue('--brand').trim() || '#0E3A43';
    thread.setAttribute('stroke', accent);
    thread.setAttribute('stroke-width', '1.6');
    head.setAttribute('fill', brand);

    var style = document.createElement('style');
    style.textContent =
        '.services-grid .icon-circle{transition:background-color .45s ease,color .45s ease,box-shadow .6s ease,transform .6s cubic-bezier(.34,1.56,.64,1)}' +
        '.services-grid .icon-circle.mx-lit{background:var(--brand);color:#fff;transform:scale(1.08);box-shadow:0 0 0 7px var(--brand-tint)}';
    document.head.appendChild(style);

    var total = 1, stops = [];

    // Route: a serpentine. Along each row the thread runs through the free space to the right of the
    // icons; between rows it drops down the outside margin, so it never crosses an icon or any text.
    // Stacked cards (phones) are rows of one, so the thread alternates margins.
    function route() {
        var g = grid.getBoundingClientRect();
        var pts = Array.prototype.map.call(icons, function (ic, i) {
            var r = ic.getBoundingClientRect();
            return { i: i, x: r.left + r.width / 2 - g.left, y: r.top + r.height / 2 - g.top, r: r.width / 2 + 9 };
        });
        var rows = [];
        pts.slice().sort(function (a, b) { return a.y - b.y || a.x - b.x; }).forEach(function (p) {
            var row = rows[rows.length - 1];
            if (row && Math.abs(row[0].y - p.y) < 6) { row.push(p); } else { rows.push([p]); }
        });
        var margin = 16, left = -margin, right = g.width + margin;
        var probe = document.createElementNS(NS, 'path');
        svg.appendChild(probe);
        var d = '', lens = new Array(pts.length), x = 0, y = 0;
        rows.forEach(function (row, k) {
            var dir = k % 2 ? -1 : 1;
            row.sort(function (a, b) { return dir * (a.x - b.x); });
            var ry = row[0].y;
            if (k === 0) {
                d = 'M ' + (left - 30) + ' ' + ry;
            } else {
                // down the outside margin on the side the last row ended, with rounded corners
                var side = dir === 1 ? left : right, turn = 14 * -dir;
                d += ' L ' + (side + turn) + ' ' + y + ' Q ' + side + ' ' + y + ' ' + side + ' ' + (y + 14);
                d += ' L ' + side + ' ' + (ry - 14) + ' Q ' + side + ' ' + ry + ' ' + (side - turn) + ' ' + ry;
            }
            row.forEach(function (p) {
                var arrive = p.x - dir * p.r, leave = p.x + dir * p.r;
                d += ' L ' + arrive + ' ' + ry;
                probe.setAttribute('d', d);
                lens[p.i] = probe.getTotalLength();   // the icon lights as the thread arrives
                // the knot: one and a half turns around the icon, leaving on the far side
                var arc = ' A ' + p.r + ' ' + p.r + ' 0 0 1 ';
                d += arc + leave + ' ' + ry + arc + arrive + ' ' + ry + arc + leave + ' ' + ry;
                x = leave;
                y = ry;
            });
        });
        d += ' L ' + (rows.length % 2 ? right + 30 : left - 30) + ' ' + y;
        svg.removeChild(probe);
        thread.setAttribute('d', d);
        total = thread.getTotalLength();
        stops = lens;
        thread.style.strokeDasharray = total + ' ' + total;
        update();
    }

    function update() {
        var r = grid.getBoundingClientRect(), vh = window.innerHeight;
        // Draws while the grid travels from 85% to 30% of the viewport height.
        var progress = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height + vh * 0.55 - vh * 0.3)));
        var drawn = total * progress;
        thread.style.strokeDashoffset = String(total - drawn);
        var pt = thread.getPointAtLength(Math.max(0, drawn));
        head.setAttribute('cx', pt.x);
        head.setAttribute('cy', pt.y);
        head.style.opacity = progress > 0.002 && progress < 0.998 ? '1' : '0';
        Array.prototype.forEach.call(icons, function (ic, i) {
            ic.classList.toggle('mx-lit', drawn >= stops[i] - 2);
        });
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
    window.addEventListener('resize', route);
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(route);
    }
    route();
})();
