// /servicios/ (where "Consulta genética" leads) hero, prototype. A particle scene beside the title:
//   ?dir=a (default, the doctor's pick 2026-11-01) the family tree a consultation starts from; hover a person to light their line.
//   ?dir=b the karyotype: a metaphase spread settling into ordered pairs; hover a pair.
(function () {
    'use strict';

    var hero = document.querySelector('.page-hero');
    var h1 = hero && hero.querySelector('h1');
    if (!hero || !h1) {
        return;
    }
    var karyo = /[?&]dir=b\b/.test(location.search);
    var PEOPLE = {
        I1: 'Abuelo', I2: 'Abuela', II1: 'Tío', II2: 'Esposa del tío', II3: 'Tía',
        II4: 'Papá · portador', II5: 'Mamá · portadora', III1: 'Prima', III2: 'Primo',
        III3: 'Paciente', III4: 'Hermano'
    };

    hero.classList.add('mx-has-scene');
    var canvas = document.createElement('canvas');
    canvas.className = 'mx-scene mx-scene-canvas';
    canvas.setAttribute('data-scene', karyo ? 'karyotype' : 'pedigree');
    canvas.setAttribute('aria-hidden', 'true');
    var stage = document.createElement('div');
    stage.className = 'mx-stage';
    var keep = document.createElement('div');
    keep.className = 'mx-keep';
    var tag = document.createElement('div');
    tag.className = 'mx-tag';
    tag.setAttribute('aria-hidden', 'true');
    var cap = document.createElement('p');
    cap.className = 'mx-caption';
    cap.innerHTML = karyo
        ? '<b>46 cromosomas</b>, ordenados por pares. Pase el cursor por un par.'
        : '<b>La consulta empieza por el árbol familiar.</b> Pase el cursor por una persona.';
    [canvas, stage, keep, tag, cap].forEach(function (el) { hero.appendChild(el); });

    // Where the text actually ends (block elements span the whole container, their text does not).
    function inkBox(el) {
        var rg = document.createRange(), box = null;
        rg.selectNodeContents(el);
        Array.prototype.forEach.call(rg.getClientRects(), function (r) {
            if (!r.width) { return; }
            box = box ? { l: Math.min(box.l, r.left), t: Math.min(box.t, r.top), r: Math.max(box.r, r.right), b: Math.max(box.b, r.bottom) }
                : { l: r.left, t: r.top, r: r.right, b: r.bottom };
        });
        return box;
    }

    // Desktop: the scene fills the space right of the title. Narrow screens: a band under the text.
    function layout() {
        var hr = hero.getBoundingClientRect(), wide = hr.width >= 900;
        var ink = null;
        Array.prototype.forEach.call(hero.querySelectorAll('.container > *'), function (el) {
            var r = inkBox(el);
            if (r) { ink = ink ? { l: Math.min(ink.l, r.l), t: Math.min(ink.t, r.t), r: Math.max(ink.r, r.r), b: Math.max(ink.b, r.b) } : r; }
        });
        if (!ink) { return; }
        var left = ink.l - hr.left, right = ink.r - hr.left, topY = ink.t - hr.top, bottom = ink.b - hr.top;
        keep.style.cssText = 'left:' + left + 'px;top:' + topY + 'px;width:' + (right - left) + 'px;height:' + (bottom - topY) + 'px';
        if (wide) {
            hero.style.paddingBottom = '';
            var x0 = right + 32;
            stage.style.cssText = 'left:' + x0 + 'px;right:-' + Math.round(hr.width * 0.02) + 'px;top:8px;bottom:40px';
            cap.style.cssText = 'left:' + x0 + 'px;right:24px;bottom:16px;text-align:center';
        } else {
            hero.style.paddingBottom = '330px';
            stage.style.cssText = 'left:4px;right:4px;bottom:44px;height:280px';
            cap.style.cssText = 'left:16px;right:16px;bottom:14px;text-align:center';
        }
    }
    layout();
    window.addEventListener('resize', layout);
    window.addEventListener('load', layout);

    // The tag follows the pointer and names what is under it.
    var last = null, px = 0, py = 0;
    function show() {
        var h = canvas.mxHover;
        var text = h === null || h === undefined ? '' : karyo ? (h === 22 ? 'Cromosoma X' : h === 23 ? 'Cromosoma Y' : 'Par ' + (h + 1)) : PEOPLE[h];
        if (text !== last) {
            last = text;
            if (text) { tag.textContent = text; }
            tag.classList.toggle('is-on', !!text);
        }
        tag.style.left = px + 14 + 'px';
        tag.style.top = py - 34 + 'px';
    }
    var ticking = false;
    hero.addEventListener('pointermove', function (e) {
        var hr = hero.getBoundingClientRect();
        px = e.clientX - hr.left;
        py = e.clientY - hr.top;
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(function () { ticking = false; show(); setTimeout(show, 120); });
        }
    });
    hero.addEventListener('pointerleave', function () { setTimeout(show, 60); });
})();
