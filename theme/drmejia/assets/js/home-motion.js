// Front-page motion that needs no WebGL:
//  - Reveals: headings, cards and list items below the fold rise and fade in once, staggered.
//    Only elements that start off-screen are touched, so nothing visible ever flashes.
//  - Process line: a line draws through the three steps as you scroll, lighting each number.
// Transforms and opacity only (no layout shift). Skipped entirely under prefers-reduced-motion.
(function () {
    'use strict';

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    // ---- reveals ---------------------------------------------------------------------------------

    var REVEAL = [
        '.recognition-items > *',
        '.section-header-center > *',
        '.services-grid > *',
        '.split-grid > div:last-child > *',
        '.process-grid > *',
        '.bio-credentials > *',
        '.faq-side > *',
        '.faq-list > *',
        '.posts-header > *',
        '.posts-grid > *',
        '.home-cta-grid > div:first-child > *',
        '.home-cta-info > *'
    ].join(',');

    var fold = window.innerHeight;
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('rv-in');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    Array.prototype.forEach.call(document.querySelectorAll(REVEAL), function (el) {
        if (el.getBoundingClientRect().top < fold) {
            return;
        }
        var index = Array.prototype.indexOf.call(el.parentElement.children, el);
        el.style.transitionDelay = Math.min(index, 5) * 70 + 'ms';
        el.classList.add('rv');
        revealObserver.observe(el);
    });

    // ---- process line ------------------------------------------------------------------------------

    var grid = document.querySelector('.process-grid');
    var circles = grid ? grid.querySelectorAll('.num-circle') : [];
    if (circles.length < 2) {
        return;
    }
    var line = document.createElement('div');
    line.className = 'process-line';
    line.setAttribute('aria-hidden', 'true');
    grid.appendChild(line);
    Array.prototype.forEach.call(circles, function (c) {
        c.classList.add('is-pending');
    });

    var horizontal = false, stops = [], ticking = false;

    function measure() {
        var g = grid.getBoundingClientRect();
        var first = circles[0].getBoundingClientRect();
        var lastC = circles[circles.length - 1].getBoundingClientRect();
        horizontal = Math.abs(first.top - lastC.top) < 4;   // steps side by side (desktop)
        line.style.display = horizontal ? '' : 'none';
        if (horizontal) {
            var x0 = first.left + first.width / 2 - g.left;
            var x1 = lastC.left + lastC.width / 2 - g.left;
            line.style.left = x0 + 'px';
            line.style.width = (x1 - x0) + 'px';
            line.style.top = (first.top + first.height / 2 - g.top - 1) + 'px';
            stops = Array.prototype.map.call(circles, function (c) {
                var r = c.getBoundingClientRect();
                return (r.left + r.width / 2 - g.left - x0) / (x1 - x0);
            });
        }
        update();
    }

    function update() {
        ticking = false;
        var r = grid.getBoundingClientRect();
        var vh = window.innerHeight;
        // Fills while the steps travel from 80% to 35% of the viewport height.
        var progress = Math.max(0, Math.min(1, (vh * 0.8 - r.top) / (vh * 0.45)));
        if (horizontal) {
            line.style.transform = 'scaleX(' + progress + ')';
        }
        Array.prototype.forEach.call(circles, function (c, i) {
            var lit = horizontal ? progress >= stops[i] - 0.01 : progress > 0.05 + i * 0.3;
            c.classList.toggle('is-lit', lit);
        });
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });
    window.addEventListener('resize', measure);
    measure();
})();
