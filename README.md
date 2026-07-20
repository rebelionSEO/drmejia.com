# Dr. Mejía — drmejia.com

Sitio web del Dr. Gerardo Mejía — pediatra y genetista clínico, Nicaragua.

**Stack:** WordPress · custom theme · Hostinger
**Patrón:** mirrors `geramejia.com` (custom theme, SSH deploy, inline styles for LiteSpeed)

## Estructura

```
drmejia.com/
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
- [ ] **Pause for sign-off** before continuing

## Phase 2+ (pending sign-off)

- Translate remaining home sections (recognition, services, karyotype, process, bio, FAQ, blog teaser, CTA)
- Build page templates: `page-sobre.php`, `page-tamizaje.php`, `page-servicios.php`, `page-contacto.php`, `page-faq.php`, `page-profesionales.php`, `page-legal.php`, `page-sitemap.php`
- Custom post type `service` (or use ACF flexible content on a single page)
- Polylang (ES/EN) wiring in `functions.php`
- Yoast / RankMath schema.org `Physician` + `MedicalBusiness` config
- Contact form (Contact Form 7 or WPForms) → email or Web3Forms
- `deploy.sh` modeled on geramejia.com once host is provisioned
- LLMs.txt + AI-friendly robots (matches geramejia.com pattern)

## Local development

The theme is plain WP — drop into any WP install:

```bash
# Option A: Local by Flywheel
# 1. Create new site in Local app: drmejia
# 2. Symlink theme into the WP install:
ln -s /Users/gmejia/projects/drmejia.com/theme/drmejia \
      "/Users/gmejia/Local Sites/drmejia/app/public/wp-content/themes/drmejia"
# 3. Activate "Dr. Mejía" theme in wp-admin

# Option B: Any other WP env — copy or symlink the theme/drmejia folder into wp-content/themes/.
```

## Deploy (Phase 6)

Once Hostinger is provisioned, `deploy.sh` will mirror the `geramejia.com` pattern:
auto-backup → SCP file(s) → rollback support, with deny-list, sourced from `~/.drmejia-creds.env`.

## Pendientes del cliente (assets / data)

Ver `_handoff/assets-needed.md`. Lo crítico para lanzamiento:
- Foto profesional + clínica
- Dirección y horarios reales
- Número WhatsApp confirmado (placeholder actual: `+505 8397 6896`)
- Email de destino para formulario
- Dominio comprado
