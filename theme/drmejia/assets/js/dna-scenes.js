// Particle scenes for the front page, drawn with WebGL over the theme's own backgrounds.
// Every <canvas class="dna-scene" data-scene="..."> becomes one scene; each runs only while on screen.
//  - hero:      B-DNA double helix (~18k particles). On load the cloud assembles while the camera
//               pushes in; scrolling away zooms the lens and racks focus onto one highlighted pair
//               (HBB c.20A>T, the sickle-cell site) while a replication fork unzips the strands into a Y.
//  - footprint: a newborn's footprint as a print, with the sampling sites of the heel-prick test
//               (the medial and lateral sides of the heel) in the accent colour; scrolling zooms in.
//  - bookend:   the helix again, in white on the blue closing section; it zips shut as you arrive.
// Real geometry: right-handed, 10.5 bp per turn, pitch 1.7 × diameter, backbones 135° apart so the
// minor and major grooves differ. Depth of field turns out-of-focus particles into soft disks, which
// reads as cinematic on a light theme where additive glow would vanish. Colours come from the theme's
// CSS custom properties. Scenes start after the page has loaded, pause off-screen, and draw one still
// frame under prefers-reduced-motion.
(function () {
    'use strict';

    var canvases = document.querySelectorAll('canvas.dna-scene');
    if (!canvases.length) {
        return;
    }

    var SEQ = 'ATGGTGCATCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCC';   // HBB coding sequence, first 42 bp
    var COMPLEMENT = { A: 'T', T: 'A', G: 'C', C: 'G' };
    var N = SEQ.length;
    var MARK = 19;                      // c.20A>T: GAG → GTG at codon 6 (Glu6Val)
    var TAU = Math.PI * 2;
    var DEG = Math.PI / 180;
    var BP_PER_TURN = 10.5;
    var RISE = 3.4 / 10.5;              // radius 1 → pitch 3.4 = 1.7 × diameter
    var GROOVE = 135 * DEG;
    var FOV = 30 * DEG;
    var IDLE_SPIN = TAU / 28;           // one turn every 28 s
    var INTRO = 2.8;                    // seconds for a scene to assemble
    var FOOT_TILT = -0.5;               // footprint leans back (radians about x) for depth
    var HEEL_SITE = [1.08, -3.55, 0];   // lateral heel sampling site, footprint units

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var debug = /[?&]dna-debug\b/.test(window.location.search);
    var smallScreen = window.innerWidth < 700;

    // ---- shaders --------------------------------------------------------------------------------
    // Particle kinds: 0/1 backbones, 2 base pairs, 3 dust, 4 sparks, 5 halo around the marked pair,
    // 6 footprint print, 7 halo around the heel sites.

    var VERT = [
        'attribute float a_u;',
        'attribute float a_kind;',
        'attribute vec3 a_rand;',
        'attribute float a_t;',
        'attribute float a_seed;',
        'attribute vec3 a_color;',
        'attribute vec2 a_look;',

        'uniform mat4 u_viewProj;',
        'uniform vec3 u_cam;',
        'uniform vec3 u_origin;',
        'uniform float u_tilt;',
        'uniform float u_spin;',
        'uniform float u_time;',
        'uniform float u_assemble;',
        'uniform float u_fork;',
        'uniform float u_n;',
        'uniform float u_focus;',
        'uniform float u_aperture;',
        'uniform float u_sizeRef;',
        'uniform float u_dpr;',
        'uniform vec2 u_mouse;',
        'uniform float u_mouseOn;',
        'uniform float u_aspect;',
        'uniform vec4 u_keepOut;',
        'uniform vec2 u_zoomCenter;',
        'uniform float u_mag;',
        'uniform float u_armMax;',

        'varying vec3 v_color;',
        'varying float v_alpha;',
        'varying float v_soft;',

        'const float TAU = 6.2831853;',
        'const float BP_PER_TURN = 10.5;',
        'const float RISE = 0.3238095;',
        'const float GROOVE = 2.3561945;',
        'const float FOOT_TILT = ' + FOOT_TILT.toFixed(4) + ';',

        // Right-handed about +y: as u rises, the nearest point (+z) turns toward +x.
        'vec3 backbone(float u, float s) {',
        '    float t = u * TAU / BP_PER_TURN + u_spin + s * GROOVE;',
        '    return vec3(sin(t), (u - (u_n - 1.0) * 0.5) * RISE, cos(t));',
        '}',

        // Footprint: lean back for depth, then sway about the vertical axis.
        'vec3 foot(vec3 q) {',
        '    float c = cos(FOOT_TILT), s = sin(FOOT_TILT);',
        '    q = vec3(q.x, c * q.y - s * q.z, s * q.y + c * q.z);',
        '    c = cos(u_spin); s = sin(u_spin);',
        '    return vec3(c * q.x + s * q.z, q.y, -s * q.x + c * q.z);',
        '}',

        'float ease(float x) { x = clamp(x, 0.0, 1.0); return 1.0 - pow(1.0 - x, 3.0); }',

        'void main() {',
        '    float k = a_kind;',
        '    vec3 p;',
        // Replication fork: behind it (u < fork) the strands straighten into a Y, each one pulling
        // its half of every base pair sideways; the bonds in the middle break loose.
        '    float behind = max(u_fork - a_u, 0.0);',
        '    float sep = 1.0 - smoothstep(u_fork - 3.0, u_fork + 1.0, a_u);',
        '    float arm = min(0.9 + 0.3 * behind, u_armMax);',
        '    if (k > 5.5) {',
        '        p = foot(a_rand);',
        '    } else if (k < 1.5) {',
        '        vec3 b = backbone(a_u, k);',
        '        float side = k < 0.5 ? -1.0 : 1.0;',
        '        p = mix(b, vec3(side * arm, b.y, 0.0), sep) + a_rand * 0.1;',
        '    } else if (k < 2.5 || k > 4.5) {',
        '        vec3 b0 = backbone(a_u, 0.0);',
        '        vec3 b1 = backbone(a_u, 1.0);',
        '        float side = a_t < 0.5 ? -1.0 : 1.0;',
        '        float fromStrand = min(a_t, 1.0 - a_t) * 1.85;',
        '        vec3 open = vec3(side * (arm - fromStrand), b0.y, 0.0);',
        '        float spread = k > 4.5 ? 0.32 : 0.05;',
        '        p = mix(mix(b0, b1, a_t), open, sep) + a_rand * spread;',
        '        p += a_rand * sep * 0.5 * (1.0 - abs(a_t - 0.5) * 2.0);',
        '    } else if (k < 3.5) {',
        '        p = a_rand + 0.35 * vec3(sin(u_time * 0.07 + a_seed * 40.0), sin(u_time * 0.05 + a_seed * 17.0), cos(u_time * 0.06 + a_seed * 29.0));',
        '    } else {',
        '        float u = mod(a_seed * u_n + u_time * 1.4, u_n);',
        '        p = backbone(u, step(0.0, a_rand.x));',
        '    }',

        // Each scene assembles from a scattered cloud; dust is already there.
        '    float e = 1.0;',
        '    if (k < 2.5 || k > 3.5) {',
        '        e = ease(u_assemble * 1.7 - a_seed * 0.7);',
        '        vec3 cloud = k > 5.5',
        '            ? vec3((a_u - 0.5) * 9.0, (a_t - 0.5) * 12.0, (a_seed - 0.5) * 5.0)',
        '            : a_rand * vec3(3.5, 5.0, 3.5) + vec3(0.8, 0.0, 0.0);',
        '        p = mix(cloud, p, e);',
        '    }',

        // Lean in the screen plane (a rotation, so the helix stays right-handed), then place it.
        '    float c = cos(u_tilt), s = sin(u_tilt);',
        '    p.xy = vec2(c * p.x - s * p.y, s * p.x + c * p.y);',
        '    vec3 world = p + u_origin;',

        // Depth of field: out-of-focus particles become larger, softer, fainter disks.
        '    float dist = length(world - u_cam);',
        '    float base = a_look.x * u_sizeRef / dist;',
        '    float blur = min(abs(dist - u_focus) / u_focus * u_aperture, 36.0);',
        '    gl_PointSize = (base + blur) * u_dpr * u_mag;',
        '    v_soft = blur / (base + blur);',
        '    v_alpha = a_look.y * mix(1.0, 0.16, v_soft) * mix(0.35, 1.0, e);',
        '    if (k > 6.5) { v_alpha *= 0.65 + 0.35 * sin(u_time * 2.4 + a_seed * 2.0); }',
        '    v_color = a_color;',

        '    vec4 clip = u_viewProj * vec4(world, 1.0);',
        '    vec2 ndc = clip.xy / clip.w;',
        // Lens zoom around the scene's subject: magnifies without moving the camera.
        '    ndc = u_zoomCenter + (ndc - u_zoomCenter) * u_mag;',
        // Pointer: nudge nearby particles aside, in screen space.
        '    vec2 d = (ndc - u_mouse) * vec2(u_aspect, 1.0);',
        '    float push = u_mouseOn * exp(-dot(d, d) * 14.0) * 0.08;',
        '    ndc += normalize(d + 1e-5) * push / vec2(u_aspect, 1.0);',
        // Keep-out zone: particles over the text column fade almost away, so text stays clean.
        '    vec2 q = max(u_keepOut.xy - ndc, ndc - u_keepOut.zw);',
        '    v_alpha *= mix(0.06, 1.0, smoothstep(-0.01, 0.12, max(q.x, q.y)));',
        '    gl_Position = vec4(ndc * clip.w, clip.zw);',
        '}'
    ].join('\n');

    var FRAG = [
        'precision mediump float;',
        'varying vec3 v_color;',
        'varying float v_alpha;',
        'varying float v_soft;',
        'void main() {',
        '    vec2 c = gl_PointCoord * 2.0 - 1.0;',
        '    float r = dot(c, c);',
        '    if (r > 1.0) discard;',
        '    float edge = mix(0.45, 0.9, v_soft);',
        '    float a = v_alpha * (1.0 - smoothstep(1.0 - edge, 1.0, r));',
        '    gl_FragColor = vec4(v_color * a, a);',
        '}'
    ].join('\n');

    var ATTRS = [['a_u', 1, 0], ['a_kind', 1, 1], ['a_rand', 3, 2], ['a_t', 1, 5], ['a_seed', 1, 6], ['a_color', 3, 7], ['a_look', 2, 10]];
    var UNIFORMS = ['u_viewProj', 'u_cam', 'u_origin', 'u_tilt', 'u_spin', 'u_time', 'u_assemble', 'u_fork', 'u_n', 'u_focus',
        'u_aperture', 'u_sizeRef', 'u_dpr', 'u_mouse', 'u_mouseOn', 'u_aspect', 'u_keepOut', 'u_zoomCenter', 'u_mag', 'u_armMax'];
    var STRIDE = 12;   // u, kind, rand xyz, t, seed, color rgb, size, alpha

    // ---- helpers ----------------------------------------------------------------------------------

    function parseColor(value, fallback) {
        var v = (value || '').trim() || fallback;
        var h = v.charAt(0) === '#' ? v.slice(1) : '';
        if (h.length === 3) {
            h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2);
        }
        if (h.length === 6) {
            var n = parseInt(h, 16);
            return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
        }
        var m = v.match(/[\d.]+/g);
        return m && m.length >= 3 ? [m[0] / 255, m[1] / 255, m[2] / 255] : parseColor(fallback, '#000');
    }
    function tint(c, t) {
        return [c[0] + (1 - c[0]) * t, c[1] + (1 - c[1]) * t, c[2] + (1 - c[2]) * t];
    }
    function clamp(x, lo, hi) {
        return x < lo ? lo : x > hi ? hi : x;
    }
    function easeOut(x) {
        x = clamp(x, 0, 1);
        return 1 - Math.pow(1 - x, 3);
    }
    function easeInOut(x) {
        x = clamp(x, 0, 1);
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }
    function lerp3(a, b, t) {
        return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    }
    function dist3(a, b) {
        return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]) + (a[2] - b[2]) * (a[2] - b[2]));
    }
    // Deterministic random numbers, so each scene looks the same on every visit.
    function makeRandom(seed) {
        return function () {
            seed = (seed + 0x6D2B79F5) | 0;
            var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    // CPU copies of the shader's geometry, used to aim the camera (and by the handedness test).
    function backbone(u, s, spin) {
        var t = u * TAU / BP_PER_TURN + spin + s * GROOVE;
        return [Math.sin(t), (u - (N - 1) / 2) * RISE, Math.cos(t)];
    }
    function foot(q, spin) {
        var c = Math.cos(FOOT_TILT), s = Math.sin(FOOT_TILT);
        q = [q[0], c * q[1] - s * q[2], s * q[1] + c * q[2]];
        c = Math.cos(spin);
        s = Math.sin(spin);
        return [c * q[0] + s * q[2], q[1], -s * q[0] + c * q[2]];
    }

    function themeColors() {
        var root = getComputedStyle(document.documentElement);
        function token(name, fallback) {
            return parseColor(root.getPropertyValue(name), fallback);
        }
        return {
            deep: token('--brand-deep', '#082B33'),
            brand: token('--brand', '#0E3A43'),
            brand2: token('--brand-2', '#24545C'),
            soft: token('--brand-soft', '#DCE6E1'),
            accent: token('--accent', '#7E9A8F'),
            accentSoft: token('--accent-soft', '#E8EFEB'),
            warn: token('--warn', '#59766B'),
            white: [1, 1, 1]
        };
    }

    // ---- particle sets ----------------------------------------------------------------------------

    function buildHelix(rand, c, onBlue, density, n) {
        var gauss = function () {
            return (rand() + rand() + rand() - 1.5) / 1.5;
        };
        // Light page: blue strands, purines (A, G) blue, pyrimidines (T, C) teal.
        // Blue section: the same molecule in white and pale teal.
        var strand = onBlue ? [c.white, c.soft] : [c.deep, c.brand];
        var base = onBlue
            ? { A: c.white, G: tint(c.soft, 0.4), T: c.accentSoft, C: tint(c.accent, 0.5) }
            : { A: c.brand, G: tint(c.brand2, 0.3), T: c.accent, C: tint(c.accent, 0.35) };
        var out = [];
        function push(u, kind, rx, ry, rz, t, sd, col, size, alpha) {
            out.push(u, kind, rx, ry, rz, t, sd, col[0], col[1], col[2], size, alpha);
        }
        var i, j, u;

        // Backbones: half the particles cluster at each nucleotide, half run along the strand.
        for (var s = 0; s < 2; s++) {
            var count = Math.round(6500 * density * n / N);
            for (i = 0; i < count; i++) {
                u = rand() < 0.45 ? Math.round(rand() * (n - 1)) + gauss() * 0.12 : rand() * (n - 1);
                push(u, s, gauss(), gauss(), gauss(), 0, u / (n - 1) * 0.6 + rand() * 0.4,
                    strand[s], 2.2 + rand() * 1.6, 0.7 + rand() * 0.3);
            }
        }

        // Base pairs: particles along the chord between the backbones; sparse where the bonds are.
        var perPair = Math.round(120 * density);
        for (i = 0; i < n; i++) {
            var b1 = SEQ.charAt(i % N);
            var b2 = COMPLEMENT[b1];
            var marked = i === MARK && !onBlue;
            for (j = 0; j < perPair; j++) {
                var t = rand();
                if (Math.abs(t - 0.5) < 0.05 && rand() < 0.7) {
                    continue;
                }
                push(i, 2, gauss(), gauss(), gauss(), t, i / (n - 1) * 0.6 + rand() * 0.4,
                    marked ? c.warn : (t < 0.5 ? base[b1] : base[b2]), marked ? 2.8 : 1.9 + rand() * 1.1, marked ? 0.95 : 0.8);
            }
        }

        if (!onBlue) {
            // A soft halo around the highlighted pair.
            for (i = 0; i < 80; i++) {
                push(MARK, 5, gauss(), gauss(), gauss(), 0.2 + rand() * 0.6, MARK / (N - 1) * 0.6 + rand() * 0.4,
                    c.warn, 6 + rand() * 4, 0.16);
            }
        }

        // Sparks running along the backbones.
        for (i = 0; i < 10; i++) {
            push(0, 4, rand() - 0.5, 0, 0, 0, rand(), onBlue ? c.accentSoft : c.accent, 4, 1);
        }

        // Dust: a loose volume around the molecule, mostly out of focus.
        var dust = Math.round(1400 * density);
        for (i = 0; i < dust; i++) {
            var z = -10 + rand() * 16;
            push(0, 3, (z > 1 ? 0 : -3) + rand() * 9, -9 + rand() * 18, z, 0, rand(),
                onBlue ? c.white : (rand() < 0.5 ? c.brand2 : c.soft), 1.6 + rand() * 2.2, onBlue ? 0.25 : (z > 1 ? 0.55 : 0.4));
        }
        return out;
    }

    // A newborn's right footprint (sole print), toes up, length 10 units. The print carries concentric
    // ridges like a real footprint; the heel-prick sampling sites (medial and lateral sides of the
    // heel, avoiding its centre) are drawn in the accent colour.
    function buildFootprint(rand, c, density) {
        var out = [];
        function push(kind, x, y, z, col, size, alpha) {
            out.push(rand(), kind, x, y, z, rand(), rand(), col[0], col[1], col[2], size, alpha);
        }
        function inEllipse(x, y, cx, cy, rx, ry) {
            var dx = (x - cx) / rx, dy = (y - cy) / ry;
            return dx * dx + dy * dy <= 1;
        }
        var toes = [[-1.25, 4.2, 0.78], [0.15, 4.4, 0.5], [0.95, 4.05, 0.45], [1.62, 3.55, 0.4], [2.08, 2.88, 0.35]];
        function inFoot(x, y) {
            for (var i = 0; i < toes.length; i++) {
                if (inEllipse(x, y, toes[i][0], toes[i][1], toes[i][2], toes[i][2] * 1.15)) {
                    return 'toe';
                }
            }
            var sole = inEllipse(x, y, 0, -3.3, 1.38, 1.75) ||
                inEllipse(x, y, 0.3, -0.6, 1.45, 2.3) ||
                inEllipse(x, y, 0.05, 1.95, 2.02, 1.45);
            if (!sole || inEllipse(x, y, -1.8, -0.5, 0.85, 1.8)) {   // the arch leaves no print
                return '';
            }
            return 'sole';
        }
        function isHeelSite(x, y) {
            return y < -2.6 && y > -4.6 && Math.abs(x) > 0.82 && inEllipse(x, y, 0, -3.3, 1.38, 1.75);
        }

        var ink = [c.brand, c.brand, c.deep, c.brand2];
        var target = Math.round(9000 * density), made = 0, tries = 0;
        while (made < target && tries < target * 12) {
            tries++;
            var x = -2.4 + rand() * 5, y = -5.2 + rand() * 10.3;
            var part = inFoot(x, y);
            if (!part) {
                continue;
            }
            // Ridges: whorls around the ball and the heel, and around each toe pad.
            var ridge;
            if (part === 'toe') {
                ridge = Math.sin(Math.sqrt(x * x + y * y) * 14);
            } else {
                var dBall = Math.sqrt(x * x + (y - 1.95) * (y - 1.95));
                var dHeel = Math.sqrt(x * x + (y + 3.3) * (y + 3.3));
                ridge = Math.sin(Math.min(dBall, dHeel) * 11 + (y > -1 ? 0 : 1.4));
            }
            if (rand() > 0.35 + 0.65 * (0.5 + 0.5 * ridge) * (0.5 + 0.5 * ridge)) {
                continue;
            }
            var site = isHeelSite(x, y);
            push(6, x, y, (rand() - 0.5) * 0.12, site ? c.warn : ink[Math.floor(rand() * ink.length)],
                site ? 2.6 + rand() : 1.8 + rand() * 1.3, site ? 0.95 : 0.55 + rand() * 0.35);
            made++;
        }
        // Soft halos over both sampling sites.
        for (var i = 0; i < 140; i++) {
            var side = i % 2 ? 1 : -1;
            push(7, side * (1.1 + (rand() - 0.5) * 0.35), -3.55 + (rand() - 0.5) * 1.1, (rand() - 0.5) * 0.3,
                c.warn, 7 + rand() * 5, 0.14);
        }
        // Dust around the print.
        for (i = 0; i < Math.round(500 * density); i++) {
            var dc = rand() < 0.5 ? c.accentSoft : c.soft;
            out.push(0, 3, -6 + rand() * 12, -7 + rand() * 14, -8 + rand() * 13, 0, rand(),
                dc[0], dc[1], dc[2], 1.6 + rand() * 2.2, 0.45);
        }
        return out;
    }

    // ---- scene types ----------------------------------------------------------------------------------
    // place(): where the subject sits (tilt, size) from the stage box. frame(): camera and story per frame.

    var TYPES = {
        hero: {
            stage: function (section) { return section.querySelector('.hero-visual'); },
            keepOut: '.hero-grid > div:first-child',
            n: N,
            build: function (rand, c) { return buildHelix(rand, c, false, smallScreen ? 0.55 : 1, N); },
            place: function (sr) {
                var compact = sr.width / sr.height > 1.4;
                return { tilt: (compact ? -78 : 13) * DEG, unitPx: compact ? sr.height * 0.27 : sr.width * 0.25, compact: compact };
            },
            // Scrolling away: the lens zooms onto the marked pair, then the fork unzips the helix.
            frame: function (s) {
                var p = clamp(s.scrolled / (s.H * 0.8), 0, 1);
                var zoom = easeInOut(p / 0.45);
                var a = backbone(MARK, 0, s.turn), b = backbone(MARK, 1, s.turn);
                return {
                    follow: 0.8,
                    fork: -4 + (N + 8) * easeInOut((p - 0.15) / 0.85),
                    subject: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2],
                    focusOnSubject: zoom,
                    mag: 1 + 0.5 * zoom,
                    aperture: 0.035 + 0.02 * zoom,
                    spinScale: 1 - 0.7 * p
                };
            }
        },
        footprint: {
            stage: function (section, canvas) { return canvas; },
            keepOut: null,
            n: N,
            build: function (rand, c) { return buildFootprint(rand, c, smallScreen ? 0.6 : 1); },
            // Lifted a little so the box's caption tag never covers the heel.
            place: function (sr) {
                return { tilt: -12 * DEG, unitPx: sr.height * 0.74 / 10, dy: -sr.height * 0.06 };
            },
            // Passing through the section: the lens zooms onto the heel-prick site.
            frame: function (s) {
                var q = clamp((s.scrollY + s.vh - s.top) / (s.vh + s.H), 0, 1);
                var zoom = easeInOut((q - 0.52) / 0.3);
                return {
                    follow: 0,
                    fork: -10,
                    subject: foot(HEEL_SITE, s.turn),
                    focusOnSubject: 0.4 + 0.6 * zoom,
                    mag: 1 + 1.4 * zoom,
                    aperture: 0.03 + 0.03 * zoom,
                    spin: Math.sin(s.elapsed * 0.4) * 0.18
                };
            }
        },
        bookend: {
            stage: function (section, canvas) { return canvas; },
            keepOut: '.home-cta-grid > div:first-child',
            n: 110,
            build: function (rand, c) { return buildHelix(rand, c, true, smallScreen ? 0.35 : 0.5, 110); },
            // A long ribbon lying in the section's bottom padding, clear of the text and the card.
            place: function (sr) {
                var unitPx = Math.min(36, sr.height * 0.07);
                return { tilt: -90 * DEG, unitPx: unitPx, dy: sr.height / 2 - unitPx * 1.45 };
            },
            // Arriving at the section: the open Y zips shut into the double helix.
            frame: function (s) {
                var e = clamp((s.scrollY + s.vh - s.top - s.H * 0.4) / (s.vh * 0.5), 0, 1);
                return {
                    follow: 0,
                    fork: -4 + (s.n + 8) * (1 - easeInOut(e)),
                    armMax: 1.25,
                    subject: [0, 0, 0],
                    focusOnSubject: 0,
                    mag: 1,
                    aperture: 0.03
                };
            }
        }
    };

    // ---- scene ----------------------------------------------------------------------------------------

    function createScene(canvas) {
        var type = TYPES[canvas.getAttribute('data-scene')];
        var section = canvas.closest('section') || canvas.parentElement;
        if (!type || !section) {
            return null;
        }
        var stage = type.stage(section, canvas);
        var textColumn = type.keepOut ? section.querySelector(type.keepOut) : null;
        var gl, loc = {}, count = 0;

        function compile(kind, src) {
            var sh = gl.createShader(kind);
            gl.shaderSource(sh, src);
            gl.compileShader(sh);
            if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
                throw new Error(gl.getShaderInfoLog(sh));
            }
            return sh;
        }

        function setupGL(data) {
            gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false });
            if (!gl) {
                return false;
            }
            var program = gl.createProgram();
            gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
            gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                throw new Error(gl.getProgramInfoLog(program));
            }
            gl.useProgram(program);

            count = data.length / STRIDE;
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            ATTRS.forEach(function (a) {
                var l = gl.getAttribLocation(program, a[0]);
                gl.enableVertexAttribArray(l);
                gl.vertexAttribPointer(l, a[1], gl.FLOAT, false, STRIDE * 4, a[2] * 4);
            });
            UNIFORMS.forEach(function (name) {
                loc[name] = gl.getUniformLocation(program, name);
            });
            gl.disable(gl.DEPTH_TEST);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);   // premultiplied alpha: works on light and blue
            gl.clearColor(0, 0, 0, 0);
            return true;
        }

        // ---- layout ----

        var W = 1, H = 1, dpr = 1, D = 10, unitPx = 100, tilt = 0, stageX = 0, stageY = 0, top = 0, vh = 1;
        var keepOut = [2, 2, 2, 2];

        function layout() {
            var cr = canvas.getBoundingClientRect();
            var sr = stage.getBoundingClientRect();
            W = cr.width;
            H = cr.height;
            if (!W || !H) {
                return false;
            }
            dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);
            gl.viewport(0, 0, canvas.width, canvas.height);
            var placed = type.place(sr);
            tilt = placed.tilt;
            unitPx = placed.unitPx;
            D = H / (2 * Math.tan(FOV / 2) * unitPx);
            stageX = ((sr.left + sr.width / 2) - (cr.left + W / 2)) / unitPx;
            stageY = -((sr.top + sr.height / 2 + (placed.dy || 0)) - (cr.top + H / 2)) / unitPx;
            top = cr.top + window.scrollY;
            vh = window.innerHeight;
            if (textColumn) {
                // The text column in canvas coordinates (-1..1, y up), padded by 16px.
                var tr = textColumn.getBoundingClientRect();
                keepOut = [
                    ((tr.left - 16 - cr.left) / W) * 2 - 1,
                    1 - ((tr.bottom + 16 - cr.top) / H) * 2,
                    ((tr.right + 16 - cr.left) / W) * 2 - 1,
                    1 - ((tr.top - 16 - cr.top) / H) * 2
                ];
            }
            return true;
        }

        function viewProj(cam) {
            var f = 1 / Math.tan(FOV / 2), near = 0.1, far = 200, aspect = W / H;
            var a = (far + near) / (near - far), b = 2 * far * near / (near - far);
            // Perspective × translation(-cam): the camera looks straight down -z.
            return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, a, -1, -(f / aspect) * cam[0], -f * cam[1], -a * cam[2] + b, cam[2]];
        }

        function rotate(p) {
            var c = Math.cos(tilt), s = Math.sin(tilt);
            return [c * p[0] - s * p[1], s * p[0] + c * p[1], p[2]];
        }

        // ---- state and frame ----

        var elapsed = 0, spin = 0, scroll = 0, pointer = [0, 0], pointerTarget = [0, 0], pointerOn = 0, pointerOnTarget = 0;

        function update(dt) {
            elapsed += dt;
            var target = clamp(window.scrollY, 0, 1e7);
            scroll += (target - scroll) * (1 - Math.exp(-dt * 6));
            pointer[0] += (pointerTarget[0] - pointer[0]) * (1 - Math.exp(-dt * 5));
            pointer[1] += (pointerTarget[1] - pointer[1]) * (1 - Math.exp(-dt * 5));
            pointerOn += (pointerOnTarget - pointerOn) * (1 - Math.exp(-dt * 4));
            var settle = 1 + 3 * Math.exp(-elapsed / 1.1);            // spins in fast, settles to idle
            spin += dt * IDLE_SPIN * settle * (lastSpinScale || 1);
        }

        var lastSpinScale = 1;

        function render() {
            var intro = reduceMotion.matches ? 1 : easeOut(elapsed / INTRO);
            var turn = spin + pointer[0] * 0.45;
            var s = { scrolled: Math.max(0, scroll - top), scrollY: scroll, top: top, H: H, vh: vh, turn: turn, elapsed: elapsed, n: type.n };
            var f = type.frame(s);
            lastSpinScale = f.spinScale || 1;
            var spinUniform = f.spin !== undefined ? f.spin + pointer[0] * 0.3 : turn;
            if (f.spin !== undefined) {
                f.subject = foot(HEEL_SITE, spinUniform);
            }

            // Optionally keep the subject in view while its section scrolls away.
            var origin = [stageX, stageY - s.scrolled * f.follow / unitPx, 0];
            var subject = rotate(f.subject);
            subject = [subject[0] + origin[0], subject[1] + origin[1], subject[2] + origin[2]];

            // The camera stays put; the story happens through lens zoom and focus.
            var cam = [0, 0, D * (1 + 0.3 * (1 - intro))];
            var vp = viewProj(cam);
            var w = vp[3] * subject[0] + vp[7] * subject[1] + vp[11] * subject[2] + vp[15];
            var zoomCenter = [(vp[0] * subject[0] + vp[4] * subject[1] + vp[8] * subject[2] + vp[12]) / w,
                (vp[1] * subject[0] + vp[5] * subject[1] + vp[9] * subject[2] + vp[13]) / w];
            var front = [origin[0], origin[1], origin[2] + 0.9];   // the nearest strand / the print's surface
            var focus = dist3(cam, lerp3(front, subject, f.focusOnSubject));

            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.uniformMatrix4fv(loc.u_viewProj, false, vp);
            gl.uniform3fv(loc.u_cam, cam);
            gl.uniform3fv(loc.u_origin, origin);
            gl.uniform1f(loc.u_tilt, tilt);
            gl.uniform1f(loc.u_spin, spinUniform);
            gl.uniform1f(loc.u_time, elapsed);
            gl.uniform1f(loc.u_assemble, intro);
            gl.uniform1f(loc.u_fork, f.fork);
            gl.uniform1f(loc.u_n, type.n);
            gl.uniform1f(loc.u_focus, focus);
            gl.uniform1f(loc.u_aperture, f.aperture * unitPx * D);
            gl.uniform1f(loc.u_sizeRef, D);
            gl.uniform1f(loc.u_dpr, dpr);
            gl.uniform2fv(loc.u_mouse, pointer);
            gl.uniform1f(loc.u_mouseOn, pointerOn);
            gl.uniform1f(loc.u_aspect, W / H);
            gl.uniform4fv(loc.u_keepOut, keepOut);
            gl.uniform2fv(loc.u_zoomCenter, zoomCenter);
            gl.uniform1f(loc.u_mag, f.mag);
            gl.uniform1f(loc.u_armMax, f.armMax || 7);
            gl.drawArrays(gl.POINTS, 0, count);
        }

        // ---- loop and events ----

        var raf = 0, last = 0, visible = false, running = false;

        function tick(now) {
            raf = 0;
            var dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
            last = now;
            update(dt);
            render();
            schedule();
        }
        function schedule() {
            if (running && !raf && visible && !reduceMotion.matches && !debug) {
                raf = requestAnimationFrame(tick);
            }
        }
        function still() {
            elapsed = INTRO;
            scroll = window.scrollY;
            render();
        }

        // Setup runs in two idle slots: build the particles first, then compile and upload.
        function start() {
            var data = new Float32Array(type.build(makeRandom(20), themeColors()));
            idle(function () {
                begin(data);
            });
        }

        function begin(data) {
            try {
                if (!setupGL(data) || !layout()) {
                    return;
                }
            } catch (err) {
                if (debug) {
                    canvas.dataset.error = String(err && err.message || err);
                }
                return;   // no WebGL or a shader error: the section simply keeps its background
            }
            running = true;
            scroll = window.scrollY;
            canvas.classList.add('is-ready');
            if (canvas.parentElement !== section) {
                canvas.parentElement.classList.add('has-scene');
            }

            section.addEventListener('pointermove', function (e) {
                if (e.pointerType !== 'mouse') {
                    return;
                }
                var r = canvas.getBoundingClientRect();
                pointerTarget = [((e.clientX - r.left) / r.width) * 2 - 1, 1 - ((e.clientY - r.top) / r.height) * 2];
                pointerOnTarget = 1;
            });
            section.addEventListener('pointerleave', function () {
                pointerOnTarget = 0;
                pointerTarget = [0, 0];
            });
            if ('IntersectionObserver' in window) {
                new IntersectionObserver(function (entries) {
                    visible = entries[0].isIntersecting;
                    last = 0;
                    schedule();
                }).observe(canvas);
            } else {
                visible = true;
            }
            if ('ResizeObserver' in window) {
                new ResizeObserver(function () {
                    if (!layout()) {
                        return;
                    }
                    if (reduceMotion.matches) {
                        still();
                    } else if (debug) {
                        render();
                    }
                }).observe(canvas);
            }
            var onMotion = function () {
                last = 0;
                if (reduceMotion.matches) {
                    still();
                } else {
                    schedule();
                }
            };
            if (reduceMotion.addEventListener) {
                reduceMotion.addEventListener('change', onMotion);
            } else if (reduceMotion.addListener) {
                reduceMotion.addListener(onMotion);
            }

            if (debug) {
                // Test hooks: step the same update/render the loop uses, and expose the geometry.
                canvas.dnaStep = function (dt) {
                    update(dt);
                    render();
                };
                canvas.dnaPoint = backbone;
                canvas.style.transition = 'none';
                canvas.dataset.ready = '1';
            }
            if (reduceMotion.matches) {
                still();
            } else {
                schedule();
            }
        }

        return { start: start };
    }

    // Each scene is set up in its own idle slot once it comes within a screen of the viewport, so the
    // page text paints first and no two scenes build their particles in the same task.
    function idle(fn) {
        (window.requestIdleCallback || function (cb) { setTimeout(cb, 1); })(fn, { timeout: 1500 });
    }
    function startAll() {
        Array.prototype.forEach.call(canvases, function (canvas) {
            var scene = createScene(canvas);
            if (!scene) {
                return;
            }
            if (!('IntersectionObserver' in window)) {
                idle(scene.start);
                return;
            }
            var near = new IntersectionObserver(function (entries) {
                if (entries[0].isIntersecting) {
                    near.disconnect();
                    idle(scene.start);
                }
            }, { rootMargin: '100% 0px' });
            near.observe(canvas);
        });
    }
    function later() {
        idle(startAll);
    }
    if (document.readyState === 'complete') {
        later();
    } else {
        window.addEventListener('load', later);
    }
})();
