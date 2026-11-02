// /adn-fetal/ hero, prototype: under the title, a band of the mother's blood with cell-free DNA
// fragments flowing through it; about 1 in 10 comes from the placenta (in the accent, with a halo).
// The pointer parts the stream, and scrolling away pushes the lens into the stream (the doctor's
// pick, 2026-11-01). ?dir=a shows the stream without the push-in.
(function () {
    'use strict';

    var hero = document.querySelector('.page-hero');
    if (!hero) {
        return;
    }
    var push = !/[?&]dir=a\b/.test(location.search);
    hero.classList.add('mx-has-scene');
    var canvas = document.createElement('canvas');
    canvas.className = 'mx-scene mx-scene-canvas';
    canvas.setAttribute('data-scene', 'stream');
    if (push) {
        canvas.setAttribute('data-variant', 'push');
    }
    canvas.setAttribute('aria-hidden', 'true');
    var stage = document.createElement('div');
    stage.className = 'mx-stage';
    var keep = document.createElement('div');
    keep.className = 'mx-keep';
    var legend = document.createElement('p');
    legend.className = 'mx-caption';
    legend.innerHTML = '<span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--brand,#0E3A43);margin-right:6px;vertical-align:-1px"></span>ADN de la mamá' +
        '<span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--accent,#7E9A8F);margin:0 6px 0 18px;vertical-align:-1px;box-shadow:0 0 0 4px rgba(126,154,143,.25)"></span><b>ADN del bebé</b> (de la placenta): cerca de 1 de cada 10';
    [canvas, stage, keep, legend].forEach(function (el) { hero.appendChild(el); });

    function layout() {
        var hr = hero.getBoundingClientRect(), wide = hr.width >= 900;
        hero.style.paddingBottom = (wide ? 230 : 210) + 'px';
        var right = 0, bottom = 0, left = hr.width, topY = hr.height;
        Array.prototype.forEach.call(hero.querySelectorAll('.container > *'), function (el) {
            var r = el.getBoundingClientRect();
            if (!r.height) { return; }
            right = Math.max(right, r.right - hr.left);
            bottom = Math.max(bottom, r.bottom - hr.top);
            left = Math.min(left, r.left - hr.left);
            topY = Math.min(topY, r.top - hr.top);
        });
        keep.style.cssText = 'left:' + left + 'px;top:' + topY + 'px;width:' + (right - left) + 'px;height:' + (bottom - topY) + 'px';
        stage.style.cssText = 'left:0;right:0;bottom:' + (wide ? 40 : 44) + 'px;height:' + (wide ? 200 : 170) + 'px';
        legend.style.cssText = 'left:' + left + 'px;right:16px;bottom:16px';
    }
    layout();
    window.addEventListener('resize', layout);
    window.addEventListener('load', layout);
})();
