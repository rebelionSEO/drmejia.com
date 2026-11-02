// Particle scenes for the inner pages (prototype). Forked from the theme's dna-scenes.js (the 0.3.1
// build with the doctor-reviewed footprint), so the inner pages share the homepage's look: particles
// with depth of field on the light theme, assembling from a cloud, pausing off-screen.
// Every <canvas class="mx-scene" data-scene="..."> becomes one scene. Scenes:
//  - footprint / process: the newborn footprint with the heel-prick sites, and the sample's journey
//                (footprint, drop, 5-circle card, analysis, report). The story can be driven from
//                outside: set canvas.mxStory (0..4) and the particles flow there.
//  - pedigree:   a three-generation family tree in standard pedigree symbols; generations grow in turn.
//  - karyotype:  46 chromosomes, banded, from a metaphase spread into an ordered karyogram.
//  - stream:     cell-free DNA fragments flowing in the mother's blood; about 1 in 10 is placental.
// The pointer pushes nearby particles aside and, on the family tree and the karyotype, brings the
// person or chromosome pair under it into focus. Hosts read canvas.mxHover to show a label.
(function () {
    'use strict';


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
    var FOOT_TILT = -0.12;              // a slight lean back for depth; more would squash the proportions
    var HEEL_SITE = [0.1, -3.4, 0];     // centre of the heel, between the two sampling sites

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var debug = /[?&]dna-debug\b/.test(window.location.search);
    var smallScreen = window.innerWidth < 700;

    // ---- shaders --------------------------------------------------------------------------------
    // Particle kinds: 0/1 backbones, 2 base pairs, 3 dust, 4 sparks, 5 halo around the marked pair,
    // 6 placed particles (footprint, family tree, chromosomes; may morph), 7 soft halos,
    // 8 flowing particles (the blood stream; the fraction of the kind packs the depth).

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
        'uniform vec2 u_pan;',
        'uniform float u_flow;',
        'uniform float u_streamLen;',
        'uniform float u_push;',

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
        '    if (k > 7.5) {',
        // Stream: each fragment drifts along x and wraps around; its particles keep their shape.
        '        float zb = (k - 8.0) * 6.5 - 6.0;',
        '        float L = u_streamLen;',
        '        float x = mod(a_u + u_flow * (0.55 + a_seed * 0.6) + L * 0.5, L) - L * 0.5;',
        '        float y = a_t + 0.22 * sin(x * 0.5 + a_seed * 31.0);',
        '        float ang = a_seed * 40.0 + u_time * (a_seed - 0.5) * 0.5;',
        '        float ca = cos(ang), sa = sin(ang);',
        '        p = vec3(x + ca * a_rand.x - sa * a_rand.y, y + sa * a_rand.x + ca * a_rand.y, zb + a_rand.z);',
        '    } else if (k > 5.5) {',
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
        '    if (k < 2.5 || (k > 3.5 && k < 7.5)) {',
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
        '    if (k > 6.5 && k < 7.5) { v_alpha *= 0.65 + 0.35 * sin(u_time * 2.4 + a_seed * 2.0); }',
        '    v_color = a_color;',

        '    vec4 clip = u_viewProj * vec4(world, 1.0);',
        '    vec2 ndc = clip.xy / clip.w;',
        // Lens zoom around the scene's subject: magnifies without moving the camera.
        '    ndc = u_zoomCenter + (ndc - u_zoomCenter) * u_mag + u_pan;',
        // Pointer: nudge nearby particles aside, in screen space.
        '    vec2 d = (ndc - u_mouse) * vec2(u_aspect, 1.0);',
        '    float push = u_mouseOn * exp(-dot(d, d) * 14.0) * u_push;',
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
        'u_aperture', 'u_sizeRef', 'u_dpr', 'u_mouse', 'u_mouseOn', 'u_aspect', 'u_keepOut', 'u_zoomCenter', 'u_mag', 'u_armMax', 'u_pan', 'u_flow', 'u_streamLen', 'u_push'];
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

    // A newborn's right footprint (sole print), toes up, about 10 units long. Newborn proportions:
    // forefoot ~0.42 of the length, heel ~0.32, and a full midfoot (the arch fat pad leaves no gap).
    // Short, round, closely set toe pads, the big toe largest. The heel-prick sites follow the
    // clinical rule: on the plantar heel, medial to a line drawn back from the middle of the big toe
    // or lateral to a line drawn back from between the 4th and 5th toes; never the back of the heel.
    var FOOT_OUTLINE = [
        [0, -5], [-0.75, -4.85], [-1.3, -4.4], [-1.55, -3.6], [-1.6, -2.6], [-1.62, -1.5], [-1.72, -0.3],
        [-1.95, 0.8], [-2.15, 1.8], [-2.1, 2.6], [-1.78, 3.15], [-1, 3.38], [0, 3.48], [0.9, 3.33], [1.65, 2.98],
        [2.15, 2.35], [2.25, 1.5], [2.1, 0.5], [1.85, -0.6], [1.7, -1.8], [1.6, -3], [1.45, -4.1],
        [1, -4.75], [0.5, -4.97]
    ];
    var TOES = [[-1.22, 4.45, 0.86, 0.98], [0, 4.72, 0.55, 0.58], [0.88, 4.55, 0.5, 0.53], [1.62, 4.1, 0.46, 0.49], [2.18, 3.42, 0.41, 0.44]];
    var MEDIAL_LINE = [[-1.22, 4.45], [-0.55, -4.8]];   // from the middle of the big toe
    var LATERAL_LINE = [[1.9, 3.76], [0.65, -4.8]];     // from between the 4th and 5th toes

    function smoothOutline(points, steps) {
        var out = [], n = points.length;
        for (var i = 0; i < n; i++) {
            var p0 = points[(i - 1 + n) % n], p1 = points[i], p2 = points[(i + 1) % n], p3 = points[(i + 2) % n];
            for (var k = 0; k < steps; k++) {
                var t = k / steps, t2 = t * t, t3 = t2 * t;
                out.push([0, 1].map(function (d) {
                    return 0.5 * (2 * p1[d] + (p2[d] - p0[d]) * t + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * t2 + (3 * p1[d] - p0[d] - 3 * p2[d] + p3[d]) * t3);
                }));
            }
        }
        return out;
    }
    function insidePolygon(x, y, poly) {
        var inside = false;
        for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            if ((poly[i][1] > y) !== (poly[j][1] > y) &&
                x < (poly[j][0] - poly[i][0]) * (y - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0]) {
                inside = !inside;
            }
        }
        return inside;
    }
    // Fast inside test: the polygon is cut once into horizontal rows of [x0, x1] spans, so each test
    // is a lookup instead of a walk around ~240 edges (that walk cost ~200 ms on a slow phone).
    function rowSpans(poly, yMin, yMax, step) {
        var rows = [], n = poly.length;
        for (var y = yMin; y <= yMax; y += step) {
            var xs = [];
            for (var i = 0, j = n - 1; i < n; j = i++) {
                if ((poly[i][1] > y) !== (poly[j][1] > y)) {
                    xs.push((poly[j][0] - poly[i][0]) * (y - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0]);
                }
            }
            rows.push(xs.sort(function (a, b) { return a - b; }));
        }
        return function (x, yy) {
            var r = Math.round((yy - yMin) / step);
            if (r < 0 || r >= rows.length) {
                return false;
            }
            var xs = rows[r], inside = false;
            for (var k = 0; k < xs.length && xs[k] <= x; k++) {
                inside = !inside;
            }
            return inside;
        };
    }

    function lineX(line, y) {
        var t = (y - line[0][1]) / (line[1][1] - line[0][1]);
        return line[0][0] + (line[1][0] - line[0][0]) * t;
    }

    function footprintGeometry() {
        var sole = smoothOutline(FOOT_OUTLINE, 10);
        var inSole = rowSpans(sole, -5.3, 5.3, 0.01);
        function inToe(x, y) {
            for (var i = 0; i < TOES.length; i++) {
                var dx = (x - TOES[i][0]) / TOES[i][2], dy = (y - TOES[i][1]) / TOES[i][3];
                if (dx * dx + dy * dy <= 1) {
                    return TOES[i];
                }
            }
            return null;
        }
        function heelSite(x, y) {
            if (y > -2.3 || y < -4.45 || !inSole(x, y)) {
                return false;   // heel only; the posterior curvature is excluded
            }
            return x < lineX(MEDIAL_LINE, y) || x > lineX(LATERAL_LINE, y);
        }
        return { sole: sole, inSole: inSole, inToe: inToe, heelSite: heelSite };
    }

    // The print itself plus the two guideline lines, as plain point records. Cached per density: the
    // footprint and the process story on the same page share one set.
    var footprintCache = {};
    function footprintPoints(rand, c, density) {
        if (footprintCache[density]) {
            return footprintCache[density].map(function (q) {
                return { x: q.x, y: q.y, z: q.z, site: q.site, col: q.col, size: q.size, alpha: q.alpha };
            });
        }
        var g = footprintGeometry(), pts = [];
        var ink = [c.brand, c.brand, c.deep, c.brand2];
        var target = Math.round(10000 * density), tries = 0;
        while (pts.length < target && tries < target * 10) {
            tries++;
            var x = -2.3 + rand() * 4.6, y = -5.1 + rand() * 10.5;
            var toe = g.inToe(x, y);
            if (!toe && !g.inSole(x, y)) {
                continue;
            }
            // Fine ridges, as in a newborn's footprint: whorls on each toe pad, arcs on the sole.
            var ridge = toe
                ? Math.sin(Math.sqrt((x - toe[0]) * (x - toe[0]) + (y - toe[1]) * (y - toe[1])) * 16)
                : Math.sin(Math.sqrt(x * x * 1.4 + (y - 1.6) * (y - 1.6)) * 9);
            var edge = toe
                ? (function () { var dx = (x - toe[0]) / toe[2], dy = (y - toe[1]) / toe[3]; return dx * dx + dy * dy > 0.72; })()
                : !g.inSole(x + 0.16, y) || !g.inSole(x - 0.16, y) || !g.inSole(x, y + 0.16) || !g.inSole(x, y - 0.16);
            if (!edge && rand() > 0.5 + 0.5 * (0.5 + 0.5 * ridge)) {
                continue;
            }
            var site = g.heelSite(x, y);
            pts.push({
                x: x, y: y, z: (rand() - 0.5) * 0.1, site: site,
                col: site ? c.warn : (edge ? c.deep : ink[Math.floor(rand() * ink.length)]),
                size: site ? 2.4 + rand() : (edge ? 2.1 + rand() : 1.6 + rand() * 1.1),
                alpha: site ? 0.95 : (edge ? 0.9 : 0.5 + rand() * 0.35)
            });
        }
        // The two guideline lines, white dashes over the print, as drawn in heel-prick diagrams.
        [MEDIAL_LINE, LATERAL_LINE].forEach(function (line) {
            for (var i = 0; i < 260; i++) {
                var t = i / 259;
                if ((t * 24) % 1 > 0.55) {
                    continue;
                }
                pts.push({
                    x: line[0][0] + (line[1][0] - line[0][0]) * t, y: line[0][1] + (line[1][1] - line[0][1]) * t,
                    z: 0.08, site: false, col: c.white, size: 2.2, alpha: 0.9
                });
            }
        });
        footprintCache[density] = pts;
        return footprintPoints(rand, c, density);
    }

    function buildFootprint(rand, c, density) {
        var out = [];
        function push(kind, x, y, z, col, size, alpha) {
            out.push(rand(), kind, x, y, z, rand(), rand(), col[0], col[1], col[2], size, alpha);
        }
        var g = footprintGeometry();
        footprintPoints(rand, c, density).forEach(function (q) {
            push(6, q.x, q.y, q.z, q.col, q.size, q.alpha);
        });
        var heelSite = g.heelSite;

        // Soft halos over both sampling sites.
        for (var h = 0, guard = 0; h < 160 && guard < 20000; guard++) {
            var hx = -1.7 + rand() * 3.4, hy = -4.5 + rand() * 2.3;
            if (heelSite(hx, hy)) {
                push(7, hx, hy, (rand() - 0.5) * 0.3, c.warn, 7 + rand() * 5, 0.14);
                h++;
            }
        }
        // Dust around the print.
        for (var i = 0; i < Math.round(500 * density); i++) {
            var dc = rand() < 0.5 ? c.accentSoft : c.soft;
            out.push(0, 3, -6 + rand() * 12, -7 + rand() * 14, -8 + rand() * 13, 0, rand(),
                dc[0], dc[1], dc[2], 1.6 + rand() * 2.2, 0.45);
        }
        return out;
    }

    // The sample's journey, for the process story. Every particle has a place in each beat:
    //   0 footprint · 1 a drop at the lateral heel site · 2 the filter-paper card, its 5 circles filling
    //   one by one · 3 a DNA helix (the analysis) · 4 the results report.
    // Roles keep each particle's job consistent: the orange "fill" particles are the blood sample.
    var CARD = { w: 9.2, h: 5.6, cx: 0, cy: 0.2, circleY: -1.35, circleR: 0.62, circleX: [-3.2, -1.6, 0, 1.6, 3.2] };
    var DROP = { x: 1.6, y: -3.85, r: 0.5 };

    function buildProcess(rand, c, density, beatCount) {
        var foot = footprintPoints(rand, c, density);
        // Sites first (they become the sample), then the rest shuffled.
        var sites = foot.filter(function (q) { return q.site; });
        var rest = foot.filter(function (q) { return !q.site; });
        for (var i = rest.length - 1; i > 0; i--) {
            var j = Math.floor(rand() * (i + 1)), tmp = rest[i];
            rest[i] = rest[j];
            rest[j] = tmp;
        }
        var pts = sites.concat(rest), M = pts.length;
        var K = Math.round(M * 0.12), nOutline = Math.round(M * 0.11), nLines = Math.round(M * 0.06), nCircle = Math.round(M * 0.065);
        function role(i) {
            if (i < K) { return 'fill'; }
            if (i < K + nOutline) { return 'outline'; }
            if (i < K + nOutline + nLines) { return 'lines'; }
            if (i < K + nOutline + nLines + nCircle) { return 'circle'; }
            return 'paper';
        }
        var beats = [], b, delays = new Float32Array(M);
        for (b = 0; b < beatCount; b++) {
            beats.push(new Float32Array(M * 8));
        }
        function put(beat, i, x, y, z, col, size, alpha) {
            var o = i * 8, a = beats[beat];
            a[o] = x; a[o + 1] = y; a[o + 2] = z; a[o + 3] = col[0]; a[o + 4] = col[1]; a[o + 5] = col[2]; a[o + 6] = size; a[o + 7] = alpha;
        }
        function inRect(w, h) {
            return [CARD.cx + (rand() - 0.5) * w, CARD.cy + (rand() - 0.5) * h];
        }
        function onRect(w, h, cx, cy) {
            var per = 2 * (w + h), d = rand() * per, x, y;
            if (d < w) { x = -w / 2 + d; y = h / 2; } else if (d < w + h) { x = w / 2; y = h / 2 - (d - w); } else if (d < 2 * w + h) { x = w / 2 - (d - w - h); y = -h / 2; } else { x = -w / 2; y = -h / 2 + (d - 2 * w - h); }
            return [cx + x + (rand() - 0.5) * 0.05, cy + y + (rand() - 0.5) * 0.05];
        }
        function inDrop() {
            // A teardrop: round bottom, tip pointing up toward the puncture.
            for (;;) {
                var x = (rand() - 0.5) * 2 * DROP.r, y = (rand() - 0.5) * 2 * DROP.r;
                if (x * x + y * y <= DROP.r * DROP.r) { return [DROP.x + x, DROP.y + y]; }
                var t = rand(), w = (1 - t) * DROP.r;
                return [DROP.x + (rand() - 0.5) * 2 * w, DROP.y + t * DROP.r * 2.1];
            }
        }
        var paper = tint(c.white, 0);
        for (i = 0; i < M; i++) {
            var q = pts[i], r = role(i), xy, k;
            delays[i] = rand() * 0.6;
            // 0 · footprint
            put(0, i, q.x, q.y, q.z, q.col, q.size, q.alpha);
            // 1 · a drop forms at the lateral site; the rest of the print stays, a little quieter
            if (beatCount > 1) {
                // Most of the orange sites stay put (the puncture site doesn't vanish); the drop is
                // made of the rest of the sample.
                if (r === 'fill' && !(q.site && i % 3 !== 0)) {
                    xy = inDrop();
                    put(1, i, xy[0], xy[1], 0.12, c.warn, 2.6, 0.95);
                } else {
                    put(1, i, q.x, q.y, q.z, q.col, q.size, q.alpha * 0.7);
                }
            }
            // 2 · the card: paper, outline, form lines, 5 printed circles; the sample fills them in order
            if (beatCount > 2) {
                if (r === 'fill') {
                    k = Math.min(4, Math.floor(i / (K / 5)));
                    delays[i] = k * 0.15 + rand() * 0.08;
                    var ang = rand() * TAU, rad = Math.sqrt(rand()) * CARD.circleR * 0.92;
                    put(2, i, CARD.circleX[k] + Math.cos(ang) * rad, CARD.circleY + Math.sin(ang) * rad, 0.06, c.warn, 2.3, 0.95);
                } else if (r === 'outline') {
                    xy = onRect(CARD.w, CARD.h, CARD.cx, CARD.cy);
                    put(2, i, xy[0], xy[1], 0, c.deep, 1.9, 0.8);
                } else if (r === 'lines') {
                    var row = Math.floor(rand() * 4), lens = [5.6, 4.2, 6.2, 3.4];
                    put(2, i, -3.9 + rand() * lens[row], 2.15 - row * 0.55, 0, c.brand, 1.5, 0.55);
                } else if (r === 'circle') {
                    k = Math.floor(rand() * 5);
                    var a2 = rand() * TAU;
                    if ((a2 * 6) % 1 < 0.35) { a2 += 0.2; }   // dashed, like printed guides
                    put(2, i, CARD.circleX[k] + Math.cos(a2) * CARD.circleR, CARD.circleY + Math.sin(a2) * CARD.circleR, 0.02, c.deep, 1.6, 0.75);
                } else {
                    xy = inRect(CARD.w - 0.2, CARD.h - 0.2);
                    put(2, i, xy[0], xy[1], -0.02, paper, 1.8, 0.32);
                }
            }
            // 3 · the analysis: the sample becomes a DNA helix in the lab
            if (beatCount > 3) {
                var u = rand() * 23, side = rand() < 0.5 ? 0 : 1;
                var bb = backbone(u, side, 0);
                if (r === 'fill') {
                    var pu = Math.round(rand() * 23), pa = backbone(pu, 0, 0), pb = backbone(pu, 1, 0), tt = rand();
                    put(3, i, (pa[0] + (pb[0] - pa[0]) * tt) * 1.15, (pu - 11.5) * RISE * 1.15 + 0.2, (pa[2] + (pb[2] - pa[2]) * tt) * 1.15,
                        tt < 0.5 ? c.warn : c.accent, 2.1, 0.9);
                } else if (r === 'paper' && rand() < 0.6) {
                    put(3, i, (rand() - 0.5) * 12, (rand() - 0.5) * 9, (rand() - 0.5) * 4, c.soft, 1.6, 0.18);
                } else {
                    put(3, i, bb[0] * 1.15 + (rand() - 0.5) * 0.1, (u - 11.5) * RISE * 1.15 + 0.2, bb[2] * 1.15 + (rand() - 0.5) * 0.1,
                        side ? c.brand : c.deep, 2, 0.85);
                }
            }
            // 4 · the report: a document with a header, text lines and the 5 sample dots
            if (beatCount > 4) {
                var dw = 5.4, dh = 7, dcy = 0.1;
                if (r === 'fill') {
                    k = Math.min(4, Math.floor(i / (K / 5)));
                    var a4 = rand() * TAU, r4 = Math.sqrt(rand()) * 0.22;
                    put(4, i, -1.6 + k * 0.8 + Math.cos(a4) * r4, dcy - 2.55 + Math.sin(a4) * r4, 0.05, c.warn, 1.9, 0.95);
                } else if (r === 'outline') {
                    xy = onRect(dw, dh, 0, dcy);
                    put(4, i, xy[0], xy[1], 0, c.deep, 1.9, 0.8);
                } else if (r === 'circle') {
                    put(4, i, (rand() - 0.5) * (dw - 0.6), dcy + dh / 2 - 0.75 + (rand() - 0.5) * 0.5, 0.02, c.brand, 1.9, 0.9);
                } else if (r === 'lines') {
                    var row4 = Math.floor(rand() * 6), lens4 = [3.9, 4.4, 3.1, 4.2, 3.6, 2.4];
                    put(4, i, -2.2 + rand() * lens4[row4], dcy + 1.85 - row4 * 0.62, 0, c.brand2, 1.5, 0.6);
                } else {
                    xy = [(rand() - 0.5) * (dw - 0.2), dcy + (rand() - 0.5) * (dh - 0.2)];
                    put(4, i, xy[0], xy[1], -0.02, paper, 1.8, 0.32);
                }
            }
        }

        var out = [];
        for (i = 0; i < M; i++) {
            var o = i * 8, a0 = beats[0];
            out.push(rand(), 6, a0[o], a0[o + 1], a0[o + 2], rand(), rand(), a0[o + 3], a0[o + 4], a0[o + 5], a0[o + 6], a0[o + 7]);
        }
        for (i = 0; i < Math.round(450 * density); i++) {
            var dc = rand() < 0.5 ? c.accentSoft : c.soft;
            out.push(0, 3, -7 + rand() * 14, -7 + rand() * 14, -8 + rand() * 13, 0, rand(), dc[0], dc[1], dc[2], 1.6 + rand() * 2.2, 0.4);
        }
        return { data: out, morph: { count: M, beats: beats, delays: delays } };
    }

    // Where on screen a story step counts as "current" (fraction of the viewport height): the middle,
    // or on phones, where the sticky animation covers the top, the middle of the area below it.
    // home-motion.js uses the same rule to highlight the step.
    function storyReference(stage) {
        if (!stage || stage.getBoundingClientRect().width < window.innerWidth * 0.8) {
            return 0.5;
        }
        var stuckBottom = (parseFloat(getComputedStyle(stage).top) || 0) + stage.offsetHeight;
        return Math.min(0.85, (stuckBottom + window.innerHeight) / (2 * window.innerHeight));
    }

    // Piecewise-linear lookup: [[progress, value], ...] sorted by progress.
    function keyframes(keys, p) {
        if (p <= keys[0][0]) { return keys[0][1]; }
        for (var i = 1; i < keys.length; i++) {
            if (p <= keys[i][0]) {
                var t = (p - keys[i - 1][0]) / (keys[i][0] - keys[i - 1][0]);
                return keys[i - 1][1] + (keys[i][1] - keys[i - 1][1]) * t;
            }
        }
        return keys[keys.length - 1][1];
    }

    // ---- placed scenes: shared plumbing ---------------------------------------------------------------
    // A placed scene is a list of particles, each with a position per beat (so shapes can flow into
    // one another) and an owner group (for the hover highlight).

    function placedScene(rand, c, M, beatCount, groups, density) {
        var beats = [], delays = new Float32Array(M), owner = new Int32Array(M).fill(-1), b;
        for (b = 0; b < beatCount; b++) {
            beats.push(new Float32Array(M * 8));
        }
        return {
            beats: beats, delays: delays, owner: owner, groups: groups,
            put: function (beat, i, x, y, z, col, size, alpha) {
                var o = i * 8, a = beats[beat];
                a[o] = x; a[o + 1] = y; a[o + 2] = z; a[o + 3] = col[0]; a[o + 4] = col[1]; a[o + 5] = col[2]; a[o + 6] = size; a[o + 7] = alpha;
            },
            finish: function (dustCount, spreadZ) {
                var out = [];
                for (var i = 0; i < M; i++) {
                    var o = i * 8, a0 = beats[0];
                    out.push(rand(), 6, a0[o], a0[o + 1], a0[o + 2], rand(), rand(), a0[o + 3], a0[o + 4], a0[o + 5], a0[o + 6], a0[o + 7]);
                }
                for (i = 0; i < Math.round(dustCount * density); i++) {
                    var dc = rand() < 0.5 ? c.accentSoft : c.soft;
                    out.push(0, 3, -9 + rand() * 18, -7 + rand() * 14, -(spreadZ || 8) + rand() * 13, 0, rand(), dc[0], dc[1], dc[2], 1.6 + rand() * 2.4, 0.42);
                }
                return { data: out, morph: { count: M, beats: beats, delays: delays, owner: owner, groups: groups } };
            }
        };
    }

    // ---- family tree (pedigree) -----------------------------------------------------------------------
    // Standard symbols: square male, circle female, filled = affected, centre dot = carrier, arrow =
    // the patient who brings the family in. The example is an autosomal recessive pattern: two carrier
    // parents, one affected daughter. Generations sit at different depths, so focusing on a person
    // blurs the others.
    var PED_S = 0.52;
    var PED = [
        { id: 'I1', g: 0, x: -1.5, y: 3.4, m: 1 },
        { id: 'I2', g: 0, x: 1.5, y: 3.4, m: 0 },
        { id: 'II1', g: 1, x: -4.4, y: 0.6, m: 1, p: ['I1', 'I2'] },
        { id: 'II2', g: 1, x: -2.2, y: 0.6, m: 0, inLaw: 1 },
        { id: 'II3', g: 1, x: 0.3, y: 0.6, m: 0, p: ['I1', 'I2'] },
        { id: 'II4', g: 1, x: 2.6, y: 0.6, m: 1, p: ['I1', 'I2'], carrier: 1 },
        { id: 'II5', g: 1, x: 4.8, y: 0.6, m: 0, inLaw: 1, carrier: 1 },
        { id: 'III1', g: 2, x: -4.4, y: -2.2, m: 0, p: ['II1', 'II2'] },
        { id: 'III2', g: 2, x: -2.2, y: -2.2, m: 1, p: ['II1', 'II2'] },
        { id: 'III3', g: 2, x: 2.6, y: -2.2, m: 0, p: ['II4', 'II5'], affected: 1, proband: 1 },
        { id: 'III4', g: 2, x: 4.8, y: -2.2, m: 1, p: ['II4', 'II5'] }
    ];
    var PED_COUPLES = [['I1', 'I2'], ['II1', 'II2'], ['II4', 'II5']];
    var PED_SHIFT = [-0.2, -0.6];
    function pedZ(g) { return (g - 1) * 1.7; }

    function pedNode(id) {
        for (var i = 0; i < PED.length; i++) {
            if (PED[i].id === id) { return PED[i]; }
        }
        return null;
    }
    // A person's line: ancestors, descendants and partner(s).
    function pedLineage(id) {
        var set = {}, n;
        function up(k) { set[k] = 1; n = pedNode(k); (n.p || []).forEach(up); }
        function down(k) { set[k] = 1; PED.forEach(function (q) { if (q.p && q.p.indexOf(k) >= 0) { down(q.id); } }); }
        up(id);
        down(id);
        PED_COUPLES.forEach(function (cp) {
            if (cp.indexOf(id) >= 0) { set[cp[0]] = set[cp[1]] = 1; }
        });
        return set;
    }

    function buildPedigree(rand, c, density) {
        // Segments: each lists the people it connects (lit when all of them are) and when it appears.
        var segs = [];
        PED_COUPLES.forEach(function (cp) {
            var a = pedNode(cp[0]), b = pedNode(cp[1]), y = a.y, mx = (a.x + b.x) / 2, kids = PED.filter(function (q) { return q.p && q.p[0] === cp[0]; });
            var g = a.g, z = pedZ(g), sib = y - 1.4, xs = kids.map(function (k) { return k.x; });
            segs.push({ need: cp, g: g, z: [z, z], a: [a.x + PED_S, y], b: [b.x - PED_S, y], from: [mx, y] });
            segs.push({ need: cp, g: g + 1, z: [z, z], a: [mx, y], b: [mx, sib], from: [mx, y] });
            segs.push({ need: cp, g: g + 1, z: [z, z], a: [Math.min.apply(null, xs.concat(mx)), sib], b: [Math.max.apply(null, xs.concat(mx)), sib], from: [mx, sib] });
            kids.forEach(function (k) {
                // the drop to each child runs from the parents' depth to the child's
                segs.push({ need: cp.concat(k.id), g: g + 1, z: [z, pedZ(k.g)], a: [k.x, sib], b: [k.x, k.y + PED_S], from: [mx, sib] });
            });
        });
        var groups = PED.length + segs.length;
        var perSym = Math.round(820 * density), perUnit = Math.round(70 * density);
        var segCount = segs.reduce(function (t, sg) { return t + Math.round(Math.hypot(sg.b[0] - sg.a[0], sg.b[1] - sg.a[1]) * perUnit); }, 0);
        var M = PED.length * perSym + segCount + Math.round(140 * density);
        var sc = placedScene(rand, c, M, 3, groups, density), i = 0;
        var paper = c.soft, sx = PED_SHIFT[0], sy = PED_SHIFT[1];

        // Where a person or line grows from: their parents' couple line, or (in-laws) their own spot.
        function origin(n) {
            if (!n.p) { return [n.x, n.y]; }
            var a = pedNode(n.p[0]), b = pedNode(n.p[1]);
            return [(a.x + b.x) / 2, a.y - 1.4];
        }
        function emit(g, x, y, z, from, col, size, alpha, own, delay) {
            for (var b = 0; b < 3; b++) {
                if (b >= g) {
                    sc.put(b, i, x + sx, y + sy, z, col, size, alpha);
                } else {
                    sc.put(b, i, from[0] + sx + (rand() - 0.5) * 0.2, from[1] + sy + (rand() - 0.5) * 0.2, z, col, size * 0.6, 0);
                }
            }
            sc.owner[i] = own;
            sc.delays[i] = delay;
            i++;
        }
        PED.forEach(function (n, k) {
            var z = pedZ(n.g), from = n.inLaw ? [n.x, n.y] : origin(n), j;
            for (j = 0; j < perSym; j++) {
                var x, y, edge = j < perSym * 0.55, d = 0.08 + rand() * 0.25;
                if (edge) {
                    // the outline, a little ragged like ink
                    var t = rand(), jit = (rand() - 0.5) * 0.06;
                    if (n.m) {
                        var side = Math.floor(t * 4), u = (t * 4) % 1 * 2 - 1;
                        x = side === 0 ? u * PED_S : side === 1 ? PED_S + jit : side === 2 ? -u * PED_S : -PED_S + jit;
                        y = side === 0 ? PED_S + jit : side === 1 ? u * PED_S : side === 2 ? -PED_S + jit : -u * PED_S;
                    } else {
                        x = Math.cos(t * TAU) * (PED_S + jit);
                        y = Math.sin(t * TAU) * (PED_S + jit);
                    }
                    emit(n.g, n.x + x, n.y + y, z + (rand() - 0.5) * 0.06, from, rand() < 0.5 ? c.deep : c.brand, 2.2 + rand() * 0.8, 0.92, k, d);
                } else {
                    do {
                        x = (rand() * 2 - 1) * PED_S * 0.9;
                        y = (rand() * 2 - 1) * PED_S * 0.9;
                    } while (!n.m && x * x + y * y > PED_S * PED_S * 0.8);
                    var dot = n.carrier && x * x + y * y < 0.03;
                    if (n.affected || dot) {
                        emit(n.g, n.x + x, n.y + y, z, from, n.affected ? c.brand2 : c.deep, 2 + rand() * 0.8, 0.88, k, d);
                    } else if (n.carrier && rand() < 0.35) {
                        var a = rand() * TAU, r = Math.sqrt(rand()) * 0.16;
                        emit(n.g, n.x + Math.cos(a) * r, n.y + Math.sin(a) * r, z, from, c.deep, 2.2, 0.9, k, d);
                    } else {
                        emit(n.g, n.x + x, n.y + y, z - 0.03, from, rand() < 0.5 ? paper : c.accentSoft, 1.7 + rand() * 0.8, 0.38, k, d);
                    }
                }
            }
        });
        segs.forEach(function (sg, k) {
            var len = Math.hypot(sg.b[0] - sg.a[0], sg.b[1] - sg.a[1]), m = Math.round(len * perUnit);
            for (var j = 0; j < m; j++) {
                var t = rand();
                emit(sg.g, sg.a[0] + (sg.b[0] - sg.a[0]) * t + (rand() - 0.5) * 0.04, sg.a[1] + (sg.b[1] - sg.a[1]) * t + (rand() - 0.5) * 0.04,
                    sg.z[0] + (sg.z[1] - sg.z[0]) * t, sg.from, c.brand2, 1.8 + rand() * 0.6, 0.75, PED.length + k, 0.1 + t * 0.3);
            }
        });
        // The arrow pointing at the patient: a shaft and two short wings at the tip.
        var pb = pedNode('III3'), tip = [pb.x - 0.62, pb.y - 0.5], tail = [pb.x - 1.4, pb.y - 1.12];
        var dx = tip[0] - tail[0], dy = tip[1] - tail[1], dl = Math.hypot(dx, dy);
        dx /= dl;
        dy /= dl;
        while (i < M) {
            var t2 = rand(), w = rand(), hx, hy;
            if (w < 0.6) {
                hx = tail[0] + (tip[0] - tail[0]) * t2;
                hy = tail[1] + (tip[1] - tail[1]) * t2;
            } else {
                var ang = w < 0.8 ? 0.5 : -0.5, ca = Math.cos(ang), sa = Math.sin(ang), back = t2 * 0.26;
                hx = tip[0] - (ca * dx - sa * dy) * back;
                hy = tip[1] - (sa * dx + ca * dy) * back;
            }
            emit(2, hx, hy, pedZ(2), [pb.x, pb.y], c.deep, 2.1, 0.9, PED.indexOf(pb), 0.5);
        }
        var built = sc.finish(420, 8);
        built.segs = segs;
        return built;
    }

    // ---- karyotype --------------------------------------------------------------------------------------
    // 46,XY. Lengths in Mb (GRCh38) and the short arm's share of each, so each chromosome has its real
    // proportions and centromere position (metacentric 1, 3, 16, 19, 20; acrocentric 13, 14, 15, 21, 22).
    var CHR = [
        [248, 0.49], [242, 0.38], [198, 0.46], [190, 0.26], [181, 0.27], [171, 0.35], [159, 0.38], [145, 0.31],
        [138, 0.31], [134, 0.30], [135, 0.39], [133, 0.27], [114, 0.16], [107, 0.16], [102, 0.18], [90, 0.40],
        [83, 0.30], [80, 0.21], [59, 0.45], [64, 0.44], [47, 0.26], [51, 0.27], [156, 0.39], [57, 0.18]
    ];
    var KARYO_ROWS = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11, 22], [12, 13, 14, 15, 16, 17], [18, 19, 20, 21, 23]];
    var CHR_UNIT = 2.2 / 248;

    function karyoLayout() {
        // Rows stacked from the top; within a row, centromeres share one line, as in a karyogram.
        var slots = [], y = 3.6;
        KARYO_ROWS.forEach(function (row) {
            var maxP = 0, maxQ = 0;
            row.forEach(function (k) { var L = CHR[k][0] * CHR_UNIT; maxP = Math.max(maxP, L * CHR[k][1]); maxQ = Math.max(maxQ, L * (1 - CHR[k][1])); });
            var cy = y - maxP, step = 10.2 / row.length;
            row.forEach(function (k, j) {
                var cx = -5.1 + step * (j + 0.5);
                var copies = k === 22 || k === 23 ? 1 : 2;
                for (var h = 0; h < copies; h++) {
                    slots.push({ chr: k, x: cx + (copies === 2 ? (h ? 0.2 : -0.2) : 0), y: cy });
                }
            });
            y = cy - maxQ - 0.42;
        });
        return slots;
    }

    function buildKaryotype(rand, c, density) {
        var slots = karyoLayout();
        var perUnit = Math.round(430 * density);
        var counts = slots.map(function (sl) { return Math.round(CHR[sl.chr][0] * CHR_UNIT * perUnit); });
        var M = counts.reduce(function (a, b) { return a + b; }, 0);
        var sc = placedScene(rand, c, M, 2, 24, density), i = 0;
        // Metaphase spread: scattered round a loose disc, turned at random, at different depths.
        var spread = slots.map(function (sl, k) {
            var a = k * 2.399 + rand() * 0.6, r = 1.2 + Math.sqrt(k / slots.length) * 3.3;
            return { x: Math.cos(a) * r * 1.15, y: Math.sin(a) * r * 0.85, rot: (rand() - 0.5) * 2.2, z: (rand() - 0.5) * 1.4 };
        });
        slots.forEach(function (sl, k) {
            var L = CHR[sl.chr][0] * CHR_UNIT, pFrac = CHR[sl.chr][1], hw = 0.085;
            // G-bands: alternating dark and light, seeded per chromosome so both copies match.
            var br = makeRandom(100 + sl.chr), bands = [], v = 0;
            while (v < 1) { var w = 0.04 + br() * 0.09; bands.push([v, v + w, bands.length % 2 === 1 && br() < 0.85]); v += w; }
            var sp = spread[k], cr = Math.cos(sp.rot), sr = Math.sin(sp.rot), delay = rand() * 0.5;
            for (var j = 0; j < counts[k]; j++) {
                var f = rand(), along = (pFrac - f) * L;     // + is the short arm (up)
                var fromCen = Math.abs(along), endDist = Math.min(f * L, (1 - f) * L);
                var pinch = 1 - 0.55 * Math.exp(-Math.pow(fromCen / 0.05, 2));
                var round = endDist < hw ? Math.sqrt(Math.max(0, 1 - Math.pow((hw - endDist) / hw, 2))) : 1;
                var side = rand() < 0.5 ? -1 : 1;
                var x = side * hw * 0.55 * pinch + (rand() - 0.5) * hw * 0.95 * pinch * round;
                var dark = false;
                for (var q = 0; q < bands.length; q++) { if (f >= bands[q][0] && f < bands[q][1]) { dark = bands[q][2]; break; } }
                var col = dark ? (rand() < 0.6 ? c.deep : c.brand) : (rand() < 0.5 ? c.accent : c.brand2);
                var size = dark ? 2.6 + rand() * 0.8 : 2.1 + rand() * 0.7, alpha = dark ? 0.95 : 0.55;
                sc.put(1, i, sl.x + x, sl.y + along, (rand() - 0.5) * 0.05, col, size, alpha);
                sc.put(0, i, sp.x + cr * x - sr * along, sp.y + sr * x + cr * along, sp.z, col, size, alpha);
                sc.owner[i] = sl.chr;
                sc.delays[i] = delay;
                i++;
            }
        });
        var built = sc.finish(380, 8);
        built.slots = slots;
        return built;
    }
    var KARYO_SLOTS = null;

    // ---- blood stream ----------------------------------------------------------------------------------
    // Short double-stranded fragments drifting left to right through a band, at many depths, with soft
    // out-of-focus blood cells. About 1 in 10 fragments is placental ("fetal"), drawn in the accent
    // with a faint halo.
    var STREAM_LEN = 30;
    function buildStream(rand, c, density) {
        var out = [], frags = Math.round(440 * density), j;
        function push(baseX, baseY, zn, lx, ly, lz, seed, col, size, alpha) {
            out.push(baseX, 8 + zn * 0.98, lx, ly, lz, baseY, seed, col[0], col[1], col[2], size, alpha);
        }
        for (var f = 0; f < frags; f++) {
            var fetal = f % 10 === 0, zn = rand(), seed = rand();
            var bx = (rand() - 0.5) * STREAM_LEN, by = (rand() + rand() + rand() - 1.5) * 1.1;
            var len = 0.22 + rand() * 0.3, m = Math.round((fetal ? 18 : 12) * (len / 0.35)), ph = rand() * TAU;
            var col = fetal ? c.accent : (rand() < 0.4 ? c.brand2 : rand() < 0.5 ? c.brand : tint(c.brand2, 0.35));
            for (j = 0; j <= m; j++) {
                var u = j / m, x = (u - 0.5) * len, tw = u * len * 22 + ph;
                for (var s = 0; s < 2; s++) {
                    var a = tw + s * 2.4;
                    push(bx, by, zn, x, Math.sin(a) * 0.035, Math.cos(a) * 0.035, seed, col, fetal ? 2.2 : 1.6, fetal ? 1 : 0.7);
                }
            }
            if (fetal) {
                push(bx, by, zn, 0, 0, 0, seed, c.accent, 10, 0.16);
            }
        }
        // Blood cells: big soft discs, mostly far out of focus.
        for (j = 0; j < Math.round(46 * density); j++) {
            var cc = rand() < 0.5 ? c.soft : c.accentSoft;
            push((rand() - 0.5) * STREAM_LEN, (rand() - 0.5) * 3, rand() * 0.6, 0, 0, 0, rand() * 0.4, cc, 22 + rand() * 22, 0.3);
        }
        for (j = 0; j < Math.round(500 * density); j++) {
            var dc = rand() < 0.5 ? c.accentSoft : c.soft;
            out.push(0, 3, -14 + rand() * 28, -4 + rand() * 8, -8 + rand() * 13, 0, rand(), dc[0], dc[1], dc[2], 1.6 + rand() * 2.2, 0.4);
        }
        return out;
    }

    // ---- scene types ----------------------------------------------------------------------------------
    // place(): where the subject sits (tilt, size) from the stage box. frame(): camera and story per frame.

    var PED_SEGS = [];
    var FOCUS = { subj: [0, 0, 0], w: 0 };   // the hover focus, eased per frame

    var TYPES = {
        // /servicios/ (consulta genética): the family tree grows a generation at a time; hovering a
        // person lights their line (ancestors, children, partner) and racks focus onto them.
        pedigree: {
            stage: function (section) { return section.querySelector('.mx-stage'); },
            keepOut: '.mx-keep',
            n: N,
            tapFocus: true,
            build: function (rand, c) {
                var b = buildPedigree(rand, c, smallScreen ? 0.55 : 1);
                PED_SEGS = b.segs;
                return b;
            },
            place: function (sr) {
                return { tilt: 0, unitPx: Math.min(sr.width / 12, sr.height / 8.4) };
            },
            frame: function (s) {
                var beat = s.external ? s.story : keyframes([[0, 0], [1.5, 0], [2.7, 1], [3.9, 2]], s.elapsed);
                var hit = null, best = 0.95;
                if (s.pointerOn && beat > 1.9) {
                    PED.forEach(function (n) {
                        var d = Math.hypot(s.pointer[0] - (n.x + PED_SHIFT[0]), s.pointer[1] - (n.y + PED_SHIFT[1]));
                        if (d < best) { best = d; hit = n; }
                    });
                }
                var lit = null;
                if (hit) {
                    var set = pedLineage(hit.id);
                    lit = [];
                    PED.forEach(function (n, k) { if (set[n.id]) { lit.push(k); } });
                    PED_SEGS.forEach(function (sg, k) {
                        if (sg.need.every(function (id) { return set[id]; })) { lit.push(PED.length + k); }
                    });
                }
                var target = hit ? [hit.x + PED_SHIFT[0], hit.y + PED_SHIFT[1], pedZ(hit.g)] : [0, 0, 0];
                FOCUS.subj = lerp3(FOCUS.subj, target, 0.12);
                FOCUS.w += ((hit ? 1 : 0) - FOCUS.w) * 0.1;
                return {
                    follow: 0, fork: -10, beat: beat, lit: lit, hover: hit ? hit.id : null,
                    subject: FOCUS.subj,
                    focusOnSubject: 0.5 + 0.5 * FOCUS.w,
                    mag: 1 + 0.06 * FOCUS.w,
                    aperture: 0.045 + 0.04 * FOCUS.w,
                    spin: Math.sin(s.elapsed * 0.3) * 0.22,
                    push: 0.05
                };
            }
        },
        // The karyotype: a metaphase spread settles into the ordered karyogram; hovering a chromosome
        // lights its pair.
        karyotype: {
            stage: function (section) { return section.querySelector('.mx-stage'); },
            keepOut: '.mx-keep',
            n: N,
            tapFocus: true,
            build: function (rand, c) {
                var b = buildKaryotype(rand, c, smallScreen ? 0.55 : 1);
                KARYO_SLOTS = b.slots;
                return b;
            },
            place: function (sr) {
                return { tilt: 0, unitPx: Math.min(sr.width / 11.4, sr.height / 8.8) };
            },
            frame: function (s) {
                var beat = s.external ? s.story : keyframes([[0, 0], [1.6, 0], [4, 1]], s.elapsed);
                var hit = null, best = 0.3;
                if (s.pointerOn && beat > 0.9) {
                    KARYO_SLOTS.forEach(function (sl) {
                        var L = CHR[sl.chr][0] * CHR_UNIT, p = CHR[sl.chr][1];
                        var dy = s.pointer[1] - sl.y, dx = Math.abs(s.pointer[0] - sl.x);
                        var out = dy > L * p ? dy - L * p : dy < -L * (1 - p) ? -L * (1 - p) - dy : 0;
                        var d = Math.max(dx - 0.1, 0) + out;
                        if (d < best) { best = d; hit = sl; }
                    });
                }
                var target = hit ? [hit.x, hit.y, 0] : [0, 0, 0];
                FOCUS.subj = lerp3(FOCUS.subj, target, 0.12);
                FOCUS.w += ((hit ? 1 : 0) - FOCUS.w) * 0.1;
                return {
                    follow: 0, fork: -10, beat: beat, lit: hit ? [hit.chr] : null, hover: hit ? hit.chr : null,
                    subject: FOCUS.subj,
                    focusOnSubject: 0.5 + 0.5 * FOCUS.w,
                    mag: 1 + 0.08 * FOCUS.w,
                    aperture: 0.035 + 0.035 * FOCUS.w,
                    spin: Math.sin(s.elapsed * 0.3) * 0.2 * (1 - 0.6 * Math.min(1, beat)),
                    push: 0.05
                };
            }
        },
        // /adn-fetal/: the stream of fragments in the mother's blood. Variant "push": scrolling away
        // pushes the lens into the stream while it slows.
        stream: {
            stage: function (section) { return section.querySelector('.mx-stage'); },
            keepOut: '.mx-keep',
            n: N,
            build: function (rand, c) { return buildStream(rand, c, smallScreen ? 0.5 : 1); },
            place: function (sr) {
                return { tilt: -3 * DEG, unitPx: Math.min(sr.width / 24, sr.height / 4.2) };
            },
            frame: function (s) {
                var p = s.variant === 'push' ? clamp(s.scrolled / (s.H * 0.9), 0, 1) : 0, zoom = easeInOut(p);
                return {
                    follow: 0, fork: -10,
                    subject: [4.5, 0.2, -1], focusOnSubject: 0.3 + 0.7 * zoom,
                    mag: 1 + 1.6 * zoom,
                    aperture: 0.03 + 0.03 * zoom,
                    streamLen: STREAM_LEN,
                    flowSpeed: 0.9 * (1 - 0.8 * zoom),
                    push: 0.18
                };
            }
        },
        // /tamizaje/: the sample's journey, stepped by buttons (canvas.mxStory 0..4). On the footprint,
        // the pointer over the heel zooms onto the sampling sites.
        journey: {
            stage: function (section, canvas) { return canvas; },
            keepOut: null,
            n: N,
            tapFocus: true,
            prepare: function (rand, c) { footprintPoints(rand, c, smallScreen ? 0.6 : 1); },
            build: function (rand, c) { return buildProcess(rand, c, smallScreen ? 0.6 : 1, 5); },
            place: function (sr) {
                return { tilt: -6 * DEG, unitPx: Math.min(sr.height * 0.74 / 10, sr.width * 0.94 / 10), dy: -sr.height * 0.03 };
            },
            frame: function (s) {
                var beat = s.story;
                var onHeel = s.pointerOn && beat < 0.4 && Math.hypot(s.pointer[0] - HEEL_SITE[0], (s.pointer[1] - HEEL_SITE[1]) * 0.8) < 2;
                FOCUS.w += ((onHeel ? 1 : 0) - FOCUS.w) * 0.1;
                var heel = Math.max(FOCUS.w, Math.max(0, 1 - Math.abs(beat - 1) * 1.6));
                return {
                    follow: 0, fork: -10, beat: beat, hover: onHeel ? 'heel' : null,
                    subject: HEEL_SITE,
                    focusOnSubject: 0.4 + 0.6 * heel,
                    mag: 1 + 0.9 * heel,
                    panTo: [0, 0.1],
                    panAmount: heel,
                    aperture: 0.03 + 0.02 * heel,
                    spin: Math.sin(s.elapsed * 0.4) * 0.12
                };
            }
        },
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
                return { tilt: -8 * DEG, unitPx: sr.height * 0.76 / 10, dy: -sr.height * 0.05 };
            },
            // Passing through the section: the lens zooms onto the heel, showing both sampling sites.
            // Less zoom in small boxes so the heel never slides under the caption tag.
            frame: function (s) {
                var q = clamp((s.scrollY + s.vh - s.top) / (s.vh + s.H), 0, 1);
                var zoom = easeInOut((q - 0.4) / 0.24);   // done while the whole box is still on screen
                return {
                    follow: 0,
                    fork: -10,
                    subject: foot(HEEL_SITE, s.turn),
                    focusOnSubject: 0.4 + 0.6 * zoom,
                    mag: 1 + (s.H < 400 ? 0.8 : 1.1) * zoom,
                    panTo: [0, 0.15],          // the heel glides to the middle, clear of the caption
                    panAmount: zoom,
                    aperture: 0.03 + 0.03 * zoom,
                    spin: Math.sin(s.elapsed * 0.4) * 0.18
                };
            }
        },
        // Homepage teaser: the footprint, the zoom onto the heel, then a drop forms at the puncture site.
        teaser: {
            stage: function (section, canvas) { return canvas; },
            keepOut: null,
            n: N,
            build: function (rand, c) { return buildProcess(rand, c, smallScreen ? 0.6 : 1, 2); },
            place: function (sr) {
                return { tilt: -8 * DEG, unitPx: sr.height * 0.76 / 10, dy: -sr.height * 0.05 };
            },
            frame: function (s) {
                var q = clamp((s.scrollY + s.vh - s.top) / (s.vh + s.H), 0, 1);
                var zoom = easeInOut((q - 0.4) / 0.24);
                return {
                    follow: 0,
                    fork: -10,
                    beat: easeInOut((q - 0.5) / 0.14),
                    subject: HEEL_SITE,
                    focusOnSubject: 0.4 + 0.6 * zoom,
                    mag: 1 + (s.H < 400 ? 0.8 : 1.1) * zoom,
                    panTo: [0, 0.15],
                    panAmount: zoom,
                    aperture: 0.03 + 0.03 * zoom,
                    spin: Math.sin(s.elapsed * 0.4) * 0.18
                };
            }
        },
        // /tamizaje/ process story: the sample's journey, driven by the steps scrolling past.
        process: {
            stage: function (section, canvas) { return canvas; },
            keepOut: null,
            n: N,
            progressEl: '.process-story-steps',
            build: function (rand, c) { return buildProcess(rand, c, smallScreen ? 0.6 : 1, 5); },
            place: function (sr) {
                return { tilt: -6 * DEG, unitPx: Math.min(sr.height * 0.74 / 10, sr.width * 0.94 / 10), dy: -sr.height * 0.03 };
            },
            frame: function (s) {
                // Step 1 footprint · step 2 drop then card · step 3 helix · step 4 report (s.story = step + fraction).
                var beat = keyframes([[0, 0], [0.75, 0], [1.2, 1], [1.6, 2], [1.95, 2], [2.4, 3], [2.95, 3], [3.4, 4]], s.story);
                var heel = Math.max(0, 1 - Math.abs(beat - 1) * 1.6);   // zoomed in only around the drop
                return {
                    follow: 0,
                    fork: -10,
                    beat: beat,
                    subject: HEEL_SITE,
                    focusOnSubject: 0.4 + 0.6 * heel,
                    mag: 1 + 0.9 * heel,
                    panTo: [0, 0.1],
                    panAmount: heel,
                    aperture: 0.03 + 0.02 * heel,
                    spin: Math.sin(s.elapsed * 0.4) * 0.12
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
        var progressEl = type.progressEl ? section.querySelector(type.progressEl) : null;
        var gl, loc = {}, count = 0, buffer = null, data = null, morph = null, lastBeat = -1;

        // Compile and link without asking for the result, so the driver can work in the background;
        // the status is read in a later idle slot (setupGL).
        var program = null, shaders = [];
        function compileGL() {
            gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false });
            if (!gl) {
                return false;
            }
            gl.getExtension('KHR_parallel_shader_compile');
            program = gl.createProgram();
            [[gl.VERTEX_SHADER, VERT], [gl.FRAGMENT_SHADER, FRAG]].forEach(function (k) {
                var sh = gl.createShader(k[0]);
                gl.shaderSource(sh, k[1]);
                gl.compileShader(sh);
                gl.attachShader(program, sh);
                shaders.push(sh);
            });
            gl.linkProgram(program);
            return true;
        }

        function setupGL(data) {
            if (!gl) {
                return false;
            }
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                throw new Error(gl.getProgramInfoLog(program) || shaders.map(function (sh) { return gl.getShaderInfoLog(sh); }).join(' '));
            }
            gl.useProgram(program);

            count = data.length / STRIDE;
            buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, morph ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW);
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

        var W = 1, H = 1, dpr = 1, D = 10, unitPx = 100, tilt = 0, stageX = 0, stageY = 0, top = 0, vh = 1, listTop = 0, listH = 1, refY = 0.5, stepTops = [];
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
            if (progressEl) {
                var lr = progressEl.getBoundingClientRect();
                listTop = lr.top + window.scrollY;
                listH = Math.max(1, lr.height);
                refY = storyReference(canvas.closest('.process-story-stage'));
                stepTops = Array.prototype.map.call(progressEl.children, function (el) {
                    return el.getBoundingClientRect().top + window.scrollY;
                });
                stepTops.push(lr.bottom + window.scrollY);
            }
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
        var story = 0, flow = 0, lastFlow = 1, touchTimer = 0;

        function update(dt) {
            elapsed += dt;
            var target = clamp(window.scrollY, 0, 1e7);
            scroll += (target - scroll) * (1 - Math.exp(-dt * 6));
            pointer[0] += (pointerTarget[0] - pointer[0]) * (1 - Math.exp(-dt * 5));
            pointer[1] += (pointerTarget[1] - pointer[1]) * (1 - Math.exp(-dt * 5));
            pointerOn += (pointerOnTarget - pointerOn) * (1 - Math.exp(-dt * 4));
            var settle = 1 + 3 * Math.exp(-elapsed / 1.1);            // spins in fast, settles to idle
            spin += dt * IDLE_SPIN * settle * (lastSpinScale || 1);
            flow += dt * lastFlow;
            // A story driven from outside (step buttons, autoplay) glides to its target.
            if (typeof canvas.mxStory === 'number') {
                story += (canvas.mxStory - story) * (1 - Math.exp(-dt * 2.2));
                if (Math.abs(canvas.mxStory - story) < 0.002) {
                    story = canvas.mxStory;
                }
            }
        }

        var lastSpinScale = 1;

        function render() {
            var intro = reduceMotion.matches ? 1 : easeOut(elapsed / INTRO);
            var turn = spin + pointer[0] * 0.45;
            // The pointer in the subject's own units (tilt undone), for hover hit-tests.
            var px = pointerTarget[0] * W / 2 / unitPx - stageX, py = pointerTarget[1] * H / 2 / unitPx - stageY;
            var ct = Math.cos(-tilt), st = Math.sin(-tilt);
            var s = { scrolled: Math.max(0, scroll - top), scrollY: scroll, top: top, H: H, vh: vh, turn: turn, elapsed: elapsed, n: type.n,
                progress: clamp((scroll + vh * refY - listTop) / listH, 0, 1),
                story: typeof canvas.mxStory === 'number' ? story : storyPosition(scroll + vh * refY),
                pointer: [ct * px - st * py, st * px + ct * py], pointerOn: pointerOnTarget, morph: morph,
                external: typeof canvas.mxStory === 'number', variant: canvas.getAttribute('data-variant') };
            var f = type.frame(s);
            canvas.mxHover = f.hover === undefined ? null : f.hover;
            if (morph) {
                setHighlight(f.lit || null);
                applyMorph(reduceMotion.matches ? Math.round(f.beat) : f.beat);
            }
            lastSpinScale = f.spinScale || 1;
            lastFlow = f.flowSpeed === undefined ? 1 : f.flowSpeed;
            var spinUniform = f.spin !== undefined ? f.spin + pointer[0] * 0.3 : turn;
            if (f.spin !== undefined) {
                f.subject = foot(f.subject === HEEL_SITE || !f.subject ? HEEL_SITE : f.subject, spinUniform);
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
            // Optional pan: glide the subject toward a point on screen while zooming in.
            var pan = f.panTo ? [(f.panTo[0] - zoomCenter[0]) * f.panAmount, (f.panTo[1] - zoomCenter[1]) * f.panAmount] : [0, 0];
            gl.uniform2fv(loc.u_pan, pan);
            gl.uniform1f(loc.u_flow, flow);
            gl.uniform1f(loc.u_streamLen, f.streamLen || 1);
            gl.uniform1f(loc.u_push, f.push === undefined ? 0.08 : f.push);
            gl.drawArrays(gl.POINTS, 0, count);
        }

        // Story position: index of the step at the reference line plus how far through it (0..steps),
        // the same step home-motion.js highlights, so picture and text never drift apart.
        function storyPosition(y) {
            if (stepTops.length < 2 || y < stepTops[0]) {
                return 0;
            }
            for (var i = 0; i < stepTops.length - 1; i++) {
                if (y < stepTops[i + 1]) {
                    return i + (y - stepTops[i]) / (stepTops[i + 1] - stepTops[i]);
                }
            }
            return stepTops.length - 1;
        }

        // Morph scenes: blend each particle between two beats, staggered so shapes flow into each
        // other. Uploads only when the beat changes, so a still page costs nothing.
        // Highlight: particles owned by the lit groups (a person and their line, a chromosome pair)
        // stay bright; the rest dim. Weights ease, so the change is a soft cross-fade.
        var groupW = null, groupTarget = null, litKey = '';
        function setHighlight(lit) {
            if (!morph.owner) {
                return;
            }
            if (!groupW) {
                groupW = new Float32Array(morph.groups).fill(1);
                groupTarget = new Float32Array(morph.groups).fill(1);
            }
            var key = lit ? lit.join(',') : '';
            if (key !== litKey) {
                litKey = key;
                groupTarget.fill(lit ? 0.3 : 1);
                (lit || []).forEach(function (g) { groupTarget[g] = 1.25; });
            }
            var moving = false;
            for (var g = 0; g < groupW.length; g++) {
                var d = groupTarget[g] - groupW[g];
                if (Math.abs(d) > 0.003) {
                    groupW[g] += d * 0.16;
                    moving = true;
                } else {
                    groupW[g] = groupTarget[g];
                }
            }
            if (moving) {
                lastBeat = -1;
            }
        }

        function applyMorph(beat) {
            beat = clamp(beat, 0, morph.beats.length - 1);
            if (Math.abs(beat - lastBeat) < 0.0005) {
                return;
            }
            lastBeat = beat;
            if (morph.beats.length === 1) {
                morph.beats.push(morph.beats[0]);
            }
            var b = Math.min(Math.floor(beat), morph.beats.length - 2), f = beat - b;
            var A = morph.beats[b], B = morph.beats[b + 1], dl = morph.delays, own = morph.owner;
            for (var i = 0; i < morph.count; i++) {
                var gw = own && groupW && own[i] >= 0 ? groupW[own[i]] : (groupW && litKey ? 0.3 : 1);
                var t = clamp((f - dl[i] * 0.4) / 0.6, 0, 1);
                t = t * t * (3 - 2 * t);
                var o = i * 8, r = i * STRIDE;
                data[r + 2] = A[o] + (B[o] - A[o]) * t;
                data[r + 3] = A[o + 1] + (B[o + 1] - A[o + 1]) * t;
                data[r + 4] = A[o + 2] + (B[o + 2] - A[o + 2]) * t;
                data[r + 7] = A[o + 3] + (B[o + 3] - A[o + 3]) * t;
                data[r + 8] = A[o + 4] + (B[o + 4] - A[o + 4]) * t;
                data[r + 9] = A[o + 5] + (B[o + 5] - A[o + 5]) * t;
                data[r + 10] = (A[o + 6] + (B[o + 6] - A[o + 6]) * t) * (gw > 1 ? gw : 1);
                data[r + 11] = Math.min(1, (A[o + 7] + (B[o + 7] - A[o + 7]) * t) * gw);
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, data.subarray(0, morph.count * STRIDE));
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

        // Setup is spread over idle slots, each short enough not to block the page on a slow phone:
        // the scene's own preparation (if any), compiling the shaders, building the particles, then
        // checking the shaders and uploading.
        function start() {
            var colors = themeColors();
            if (type.prepare) {
                type.prepare(makeRandom(7), colors);
            }
            idle(function () {
                try {
                    compileGL();
                } catch (err) {
                    return;
                }
                idle(function () {
                    var built = type.build(makeRandom(20), colors);
                    if (built.morph) {
                        morph = built.morph;
                        built = built.data;
                    }
                    data = new Float32Array(built);
                    idle(function () {
                        begin(data);
                    });
                });
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
            section.addEventListener('pointerdown', function (e) {
                if (e.pointerType === 'mouse' || !type.tapFocus) {
                    return;
                }
                var r = canvas.getBoundingClientRect();
                pointerTarget = [((e.clientX - r.left) / r.width) * 2 - 1, 1 - ((e.clientY - r.top) / r.height) * 2];
                pointerOnTarget = 1;
                clearTimeout(touchTimer);
                touchTimer = setTimeout(function () { pointerOnTarget = 0; }, 3500);
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
            if (morph) {
                // Scroll-driven stories still follow the page under reduced motion: one still frame
                // per scroll position (whole steps, no tweening; see render()).
                var pending = false;
                window.addEventListener('scroll', function () {
                    if (reduceMotion.matches && visible && !pending) {
                        pending = true;
                        requestAnimationFrame(function () {
                            pending = false;
                            still();
                        });
                    }
                }, { passive: true });
            }
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
        Array.prototype.forEach.call(document.querySelectorAll('canvas.mx-scene'), function (canvas) {
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
