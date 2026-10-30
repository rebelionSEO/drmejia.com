// /sobre/ signature (prototype): his career as a DNA strand. Two strands wind down beside
// "Una carrera en hitos", crossing between milestones; as each milestone reaches the reading line,
// its base pair locks in and the row lights. Phones get a slim line with one node per milestone.
// The quote at the end reads in word by word as you scroll.
(function () {
    'use strict';

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var NS = 'http://www.w3.org/2000/svg';
    var css = getComputedStyle(document.documentElement);
    var C = {
        brand: css.getPropertyValue('--brand').trim() || '#0E3A43',
        accent: css.getPropertyValue('--accent').trim() || '#7E9A8F',
        soft: css.getPropertyValue('--brand-soft').trim() || '#DCE6E1'
    };
    var style = document.createElement('style');
    style.textContent =
        '.row-stack .row-card{transition:border-color .5s ease,box-shadow .5s ease}' +
        '.row-stack .row-card.mx-locked{border-color:var(--brand-soft);box-shadow:var(--shadow-md)}' +
        '.mx-rung{transition:stroke-dashoffset .55s cubic-bezier(.2,0,0,1)}' +
        '.mx-node{transition:transform .5s cubic-bezier(.34,1.56,.64,1),opacity .3s ease;transform-box:fill-box;transform-origin:center}' +
        '.philosophy .mx-qw{transition:opacity .25s linear}';
    document.head.appendChild(style);

    // ---- the strand -------------------------------------------------------------------------------
    var stack = document.querySelector('main .row-stack');
    var rows = stack ? Array.prototype.slice.call(stack.querySelectorAll('.row-card')) : [];
    if (stack && rows.length > 1) {
        if (getComputedStyle(stack).position === 'static') {
            stack.style.position = 'relative';   // positioning box only; layout unchanged
        }
        var svg = document.createElementNS(NS, 'svg');
        svg.setAttribute('aria-hidden', 'true');
        svg.style.cssText = 'position:absolute;top:0;overflow:visible;pointer-events:none';
        stack.appendChild(svg);
        var strands = [], rungs = [], samples = [], ys = [], compact = false;

        var build = function () {
            while (svg.firstChild) {
                svg.removeChild(svg.firstChild);
            }
            var sr = stack.getBoundingClientRect();
            compact = sr.left < 64;
            // Desktop: a 30px helix 26px left of the rows. Phones: a slim line inside the page margin.
            var w = compact ? 10 : 30, gap = compact ? Math.max(2, sr.left - w - 4) : 26;
            svg.style.left = (-gap - w) + 'px';
            svg.setAttribute('width', w);
            svg.setAttribute('height', sr.height);
            ys = rows.map(function (r) { var b = r.getBoundingClientRect(); return b.top + b.height / 2 - sr.top; });
            var xL = 1, xR = w - 1, top = Math.max(0, ys[0] - 40), bottom = ys[ys.length - 1] + 40;
            strands = (compact ? [0] : [0, 1]).map(function (k) {
                var d;
                if (compact) {
                    d = 'M ' + w / 2 + ' ' + top + ' L ' + w / 2 + ' ' + bottom;
                } else {
                    var xAt = function (i) { return (i + k) % 2 ? xR : xL; };
                    d = 'M ' + xAt(0) + ' ' + top + ' L ' + xAt(0) + ' ' + ys[0];
                    for (var i = 0; i < ys.length - 1; i++) {
                        var mid = (ys[i + 1] - ys[i]) / 2;
                        d += ' C ' + xAt(i) + ' ' + (ys[i] + mid) + ' ' + xAt(i + 1) + ' ' + (ys[i + 1] - mid) + ' ' + xAt(i + 1) + ' ' + ys[i + 1];
                    }
                    d += ' L ' + xAt(ys.length - 1) + ' ' + bottom;
                }
                var path = document.createElementNS(NS, 'path');
                path.setAttribute('d', d);
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke', k ? C.accent : C.brand);
                path.setAttribute('stroke-width', compact ? '2' : '2.2');
                path.setAttribute('stroke-linecap', 'round');
                svg.appendChild(path);
                var len = path.getTotalLength();
                path.style.strokeDasharray = len + ' ' + len;
                // length ↔ y lookup, so the strand can be drawn exactly down to the reading line
                var table = [];
                for (var s = 0; s <= 160; s++) {
                    table.push([len * s / 160, path.getPointAtLength(len * s / 160).y]);
                }
                samples[k] = table;
                return { path: path, len: len };
            });
            rungs = ys.map(function (y) {
                var g = { line: null, nodes: [] };
                if (!compact) {
                    var ln = document.createElementNS(NS, 'line');
                    ln.setAttribute('x1', xL);
                    ln.setAttribute('x2', xR);
                    ln.setAttribute('y1', y);
                    ln.setAttribute('y2', y);
                    ln.setAttribute('stroke', C.accent);
                    ln.setAttribute('stroke-width', '3');
                    ln.setAttribute('stroke-linecap', 'round');
                    ln.setAttribute('class', 'mx-rung');
                    ln.style.strokeDasharray = (xR - xL) + ' ' + (xR - xL);
                    ln.style.strokeDashoffset = String(xR - xL);
                    svg.appendChild(ln);
                    g.line = ln;
                }
                (compact ? [w / 2] : [xL, xR]).forEach(function (x) {
                    var c = document.createElementNS(NS, 'circle');
                    c.setAttribute('cx', x);
                    c.setAttribute('cy', y);
                    c.setAttribute('r', compact ? '4' : '4.5');
                    c.setAttribute('fill', C.brand);
                    c.setAttribute('class', 'mx-node');
                    c.style.transform = 'scale(0)';
                    svg.appendChild(c);
                    g.nodes.push(c);
                });
                return g;
            });
            update();
        };

        var lengthAtY = function (k, y) {
            var t = samples[k];
            if (y <= t[0][1]) { return 0; }
            for (var i = 1; i < t.length; i++) {
                if (t[i][1] >= y) {
                    var f = (y - t[i - 1][1]) / Math.max(0.001, t[i][1] - t[i - 1][1]);
                    return t[i - 1][0] + (t[i][0] - t[i - 1][0]) * f;
                }
            }
            return t[t.length - 1][0];
        };

        var update = function () {
            var sr = stack.getBoundingClientRect();
            var line = reduce ? 1e9 : window.innerHeight * 0.62 - sr.top;   // reading line, in stack coordinates
            strands.forEach(function (s, k) {
                s.path.style.strokeDashoffset = String(s.len - lengthAtY(k, line));
            });
            rungs.forEach(function (g, i) {
                var on = line >= ys[i];
                rows[i].classList.toggle('mx-locked', on);
                if (g.line) {
                    g.line.style.strokeDashoffset = on ? '0' : g.line.style.strokeDasharray.split(' ')[0];
                }
                g.nodes.forEach(function (n) { n.style.transform = on ? 'scale(1)' : 'scale(0)'; });
            });
        };

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
        window.addEventListener('resize', build);
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(build);
        }
        build();
    }

    // ---- the quote: reads in word by word ---------------------------------------------------------
    var quote = document.querySelector('main .philosophy');
    var text = quote ? quote.querySelector('blockquote, p, h2, h3') : null;
    if (text && !reduce) {
        var words = [];
        (function walk(node) {
            Array.prototype.slice.call(node.childNodes).forEach(function (child) {
                if (child.nodeType === 3) {
                    var frag = document.createDocumentFragment();
                    child.textContent.split(/(\s+)/).forEach(function (part) {
                        if (!part) { return; }
                        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
                        var s = document.createElement('span');
                        s.className = 'mx-qw';
                        s.textContent = part;
                        s.style.opacity = '0.18';
                        words.push(s);
                        frag.appendChild(s);
                    });
                    node.replaceChild(frag, child);
                } else if (child.nodeType === 1) {
                    walk(child);
                }
            });
        })(text);
        var readQuote = function () {
            var r = text.getBoundingClientRect(), vh = window.innerHeight;
            var p = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (vh * 0.5)));
            var lit = Math.round(p * words.length);
            words.forEach(function (w, i) { w.style.opacity = i < lit ? '1' : '0.18'; });
        };
        window.addEventListener('scroll', function () { requestAnimationFrame(readQuote); }, { passive: true });
        readQuote();
    }
})();
