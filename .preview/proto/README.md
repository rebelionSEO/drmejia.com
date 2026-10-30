# Inner-page motion prototypes

Motion for the inner pages, tested on top of the **live** site (theme 0.3.5) without changing the theme.
`build.py` mirrors the live pages and theme files into `site/` (tracking stripped) and injects the files
from `src/`. Nothing here is deployed yet. To ship it, the files must be added to the 0.3.5 theme source
(not the older local `theme/drmejia/`, which predates the rebrand).

```
python3 -I .preview/proto/build.py
python3 -m http.server 8770 --bind 127.0.0.1 --directory .preview/proto/site
```

## src/

| File | Where | What |
|---|---|---|
| `motion.css`, `motion.js` | every inner page | Shared scroll language: headings rise word by word, cards cascade in, years count up, a sheen crosses the dark bands. Below the fold only. |
| `cursor.js` | every inner page | Mouse only. Cards lean toward the cursor with a light that follows it, buttons pull gently toward it, and a particle double helix in the dark bands and the footer turns toward the cursor and parts around it. |
| `sig-servicios.js` | /servicios/ | A thread snakes through the cards and ties a loop around each icon. |
| `sig-contacto.js` | /contacto/ | Directions the Managua way (al lago = north), walked as you scroll. Schematic; the Maps link still needs checking. |
| `sig-sobre.js` | /sobre/ | His career as a DNA strand; each milestone locks a base pair. The quote reads in word by word. |
| `sig-profesionales.js` + `ca-map.json` | /profesionales/ | Natural Earth map of Central America with referral arcs into Managua. |
| `sig-adn-fetal.js` | /adn-fetal/ | Interactive microscope: a lens over cell-free DNA, three steps (blood, placental DNA, the 21/18/13 count) and a "21 extra" comparison. Needs the doctor's review. v1 is in `archive/`. |

All of it is transforms, SVG or one small canvas per section; it draws only while on screen and stays still
under reduced motion. Measured at 4x CPU throttle: no long tasks, 60 fps.

## Checks

`check-*.js` take stills, `perf-*.js` measure frames and long tasks at 4x CPU, and `record*.js` film the
MP4s (saved to `.deploys/proto-motion/`). They use Playwright from `~/Projects/motion-graphics/node_modules`.
