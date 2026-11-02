// Shared scroll language for the inner pages (prototype layer, not part of the theme).
//  - Headings rise word by word; cards, rows and list items cascade in; plain years and numbers
//    count up; the dark brand bands get one light sweep.
//  - Only elements that start below the fold, once each. Page titles (h1) never animate.
//  - Skipped entirely under prefers-reduced-motion.
(function () {
    'use strict';

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    var fold = window.innerHeight * 0.92;
    function belowFold(el) {
        return el.getBoundingClientRect().top > fold;
    }

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('mx-in');
                io.unobserve(e.target);
                if (e.target.mxOnIn) {
                    e.target.mxOnIn();
                }
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    // ---- headings: split into words, keeping inline markup such as <span class="accent"> ----
    function splitWords(el) {
        var index = 0;
        (function walk(node) {
            Array.prototype.slice.call(node.childNodes).forEach(function (child) {
                if (child.nodeType === 3) {
                    var frag = document.createDocumentFragment();
                    child.textContent.split(/(\s+)/).forEach(function (part) {
                        if (!part) {
                            return;
                        }
                        if (/^\s+$/.test(part)) {
                            frag.appendChild(document.createTextNode(part));
                            return;
                        }
                        var outer = document.createElement('span'), inner = document.createElement('span');
                        outer.className = 'mx-w';
                        inner.className = 'mx-wi';
                        inner.style.setProperty('--i', index++);
                        inner.textContent = part;
                        outer.appendChild(inner);
                        frag.appendChild(outer);
                    });
                    node.replaceChild(frag, child);
                } else if (child.nodeType === 1 && !/^(BR|SVG)$/i.test(child.tagName)) {
                    walk(child);
                }
            });
        })(el);
    }
    document.querySelectorAll('main h2').forEach(function (h) {
        if (belowFold(h) && !h.closest('.mx-up')) {
            splitWords(h);
            io.observe(h);
        }
    });

    // ---- groups: each item rises, cascading by its position in the group ----
    var GROUPS = [
        '.services-grid > *', '.row-stack > *', '.faq-list > *', '.contact-grid > *', '.contact-info-stack > *',
        '.split-grid > *', '.check-list > li', '.kpi-strip > *', '.posts-grid > *', '.process-grid > *',
        'main .eyebrow', '.section-header-center > p', '.home-cta-section .container > :not(h2)'
    ];
    document.querySelectorAll(GROUPS.join(',')).forEach(function (el) {
        if (!belowFold(el) || el.closest('.mx-up') || el.querySelector('.mx-up')) {
            return;
        }
        var i = Array.prototype.indexOf.call(el.parentElement.children, el);
        el.style.setProperty('--i', Math.min(i, 6));
        el.classList.add('mx-up');
        io.observe(el);
    });

    // ---- numbers: plain years and counts count up when they arrive ----
    function countUp(el, to, from) {
        var start = null, dur = 900;
        function step(t) {
            if (start === null) {
                start = t;
            }
            var k = Math.min(1, (t - start) / dur), e = 1 - Math.pow(1 - k, 3);
            el.textContent = String(Math.round(from + (to - from) * e));
            if (k < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }
    document.querySelectorAll('.row-year, .stat-num').forEach(function (el) {
        var text = el.textContent.trim();
        if (!/^\d{1,4}$/.test(text) || !belowFold(el)) {
            return;
        }
        var to = parseInt(text, 10), from = to > 1900 ? to - 14 : 0;
        var host = el.closest('.mx-up') || el;
        var prev = host.mxOnIn;
        el.setAttribute('aria-label', text);
        host.mxOnIn = function () {
            if (prev) {
                prev();
            }
            countUp(el, to, from);
        };
        if (host === el) {
            io.observe(el);
        }
    });

    // ---- dark brand bands: a single light sweep ----
    document.querySelectorAll('.home-cta-section').forEach(function (band) {
        if (!belowFold(band)) {
            return;
        }
        var sheen = document.createElement('span');
        sheen.className = 'mx-sheen';
        sheen.setAttribute('aria-hidden', 'true');
        band.insertBefore(sheen, band.firstChild);
        band.classList.add('mx-band');
        io.observe(band);
    });
})();
