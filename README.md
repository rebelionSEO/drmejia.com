# Dr. Mejía — doctorgerardomejia.com

Sitio web del Dr. Gerardo Mejía — pediatra y genetista clínico, Nicaragua.

**Dominio:** `doctorgerardomejia.com`
**Stack:** WordPress · custom theme · Hostinger
**Patrón:** mirrors `geramejia.com` (custom theme, SSH deploy, inline styles for LiteSpeed)

## Estructura

```
doctorgerardomejia.com/
├── theme/drmejia/         # WordPress custom theme (deployable unit)
│   ├── style.css          # Design tokens + base + sections
│   ├── theme.json         # WP block-editor palette
│   ├── functions.php      # Theme setup, enqueues, helpers (icons, WhatsApp)
│   ├── header.php         # Sticky nav + skip-link + WP menu
│   ├── footer.php         # Footer grid + WhatsApp floating button
│   ├── front-page.php     # Homepage — Hero done, rest stubbed for Phase 2
│   ├── page.php           # Generic page fallback
│   ├── index.php          # Blog index fallback
│   ├── 404.php
│   └── assets/
│       ├── css/           # (reserved for split styles if ever needed)
│       ├── js/main.js     # Mobile nav toggle + WhatsApp float reveal
│       └── img/
├── _handoff/              # Original handoff (design tokens, content, reference HTML/JSX)
├── deploy.sh              # (Phase 6 — model on geramejia.com SSH deploy)
└── README.md
```

## Phase 1 status (current)

- [x] Theme skeleton (`style.css`, `functions.php`, `header.php`, `footer.php`)
- [x] Homepage Hero section translated from `_handoff/reference/home-sections.jsx`
- [x] Design tokens inline in `style.css` (LiteSpeed-friendly)
- [x] WhatsApp helper, inline icon set, accessible nav, mobile menu, skip-link
- [x] Live Hostinger WP provisioned; theme `drmejia` active
- [x] Ops stack installed: Wordfence, Rank Math, Contact Form 7, Flamingo; LiteSpeed + Memcached on; `llmstxt` enabled
- [ ] **wp-admin finish** — see [`_handoff/wordpress-launch-checklist.md`](_handoff/wordpress-launch-checklist.md)
- [ ] **Pause for sign-off** before continuing theme sections

## Phase 2+ (pending sign-off)

- Translate remaining home sections (recognition, services, karyotype, process, bio, FAQ, blog teaser, CTA)
- Build page templates: `page-sobre.php`, `page-tamizaje.php`, `page-servicios.php`, `page-contacto.php`, `page-faq.php`, `page-profesionales.php`, `page-legal.php`, `page-sitemap.php`
- Custom post type `service` (or use ACF flexible content on a single page)
- Polylang (ES/EN) wiring in `functions.php` (Phase 2 — not installed yet)
- Rank Math schema.org `Physician` + `MedicalBusiness` config (plugin installed; finish in wp-admin)
- Contact Form 7 → practice email (plugin installed; finish in wp-admin)
- `deploy.sh` modeled on geramejia.com
- LLMs.txt via Hostinger Tools (`llmstxt` already enabled)

## Local development

The theme is plain WP — drop into any WP install:

```bash
# Option A: Local by Flywheel
# 1. Create new site in Local app: doctorgerardomejia
# 2. Symlink theme into the WP install:
ln -s /Users/gerardom/Projects/doctorgerardomejia.com/theme/drmejia \
      "/Users/gerardom/Local Sites/doctorgerardomejia/app/public/wp-content/themes/drmejia"
# 3. Activate "Dr. Mejía" theme in wp-admin

# Option B: Any other WP env — copy or symlink the theme/drmejia folder into wp-content/themes/.
```

## Deploy (Phase 6)

Hostinger WP is live (`doctorgerardomejia.com`). `deploy.sh` will mirror the `geramejia.com` pattern:
auto-backup → SCP file(s) → rollback support, with deny-list, sourced from `~/.doctorgerardomejia-creds.env`.

Launch ops checklist: [`_handoff/wordpress-launch-checklist.md`](_handoff/wordpress-launch-checklist.md).

## Pendientes del cliente (assets / data)

Ver `_handoff/assets-needed.md`. Lo crítico para lanzamiento:
- Foto profesional + clínica
- Dirección y horarios reales
- Número WhatsApp / teléfono de citas (placeholder por ahora — se confirman antes del launch)
- Email de destino para formulario
- ~~Dominio comprado~~ → `doctorgerardomejia.com` (Hostinger)
- Foto profesional (pendiente)
