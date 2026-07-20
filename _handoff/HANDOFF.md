# HANDOFF — Sitio Web Dr. Gerardo Mejía

> Spec técnica completa para construir el sitio en Next.js + Sanity, deployado en Hostinger.
> **Audiencia:** desarrolladores (humanos o Claude Code) que vayan a construir el proyecto desde cero.
> **Estado:** Diseño aprobado. Listo para construir.

---

## 1. Resumen del proyecto

Sitio web profesional para el Dr. Gerardo Mejía — pediatra y genetista clínico en Nicaragua. El sitio sirve como:

1. **Tarjeta de presentación digital** — credenciales, biografía, filosofía clínica.
2. **Educación médica** — explicar servicios complejos (cariotipo, asesoría genética) en lenguaje accesible para padres.
3. **Captación de pacientes** — formulario de contacto + WhatsApp + agendamiento.
4. **Blog clínico** — artículos sobre genética pediátrica, tamizaje neonatal, etc.

**Tono:** profesional, cálido, técnicamente riguroso pero accesible para padres no-médicos. Pediatra de confianza, no influencer médico.

---

## 2. Stack técnico

| Capa | Tecnología | Notas |
|---|---|---|
| Framework | **Next.js 15** (App Router) | SSG donde sea posible, ISR para blog |
| Lenguaje | **TypeScript** estricto | `"strict": true` en tsconfig |
| Estilos | **Tailwind CSS v4** | Tokens en `tailwind.config` derivados de `design-tokens.json` |
| CMS | **Sanity v3** | Studio embebido en `/studio` o subdominio |
| i18n | **next-intl** | Español (default) + Inglés |
| Forms | **Web3Forms** o **Resend** | Email a destinatario por confirmar |
| Analytics | **Google Analytics 4** | gtag via `next/script` |
| Iconos | **Lucide React** | Ya usado en el diseño actual |
| Fonts | **Plus Jakarta Sans** (Google Fonts) | Pesos: 400, 500, 600, 700, 800 |
| Hosting | **Hostinger Cloud Hosting** | Plan que soporte Node.js 20+ |
| Deploy | **Git + auto-deploy** | Hostinger Git integration o webhook |

---

## 3. Estructura de carpetas

```
dr-mejia-site/
├── app/
│   ├── [locale]/              # next-intl: es | en
│   │   ├── layout.tsx          # root layout con header/footer
│   │   ├── page.tsx            # Home
│   │   ├── sobre/page.tsx      # About / Bio
│   │   ├── tamizaje/page.tsx   # Cariotipo neonatal
│   │   ├── servicios/
│   │   │   ├── page.tsx        # Lista
│   │   │   ├── consulta-pediatrica/page.tsx
│   │   │   └── asesoria-genetica/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx        # Index
│   │   │   └── [slug]/page.tsx # Articulo
│   │   ├── faq/page.tsx
│   │   ├── profesionales/page.tsx
│   │   ├── contacto/page.tsx
│   │   ├── legal/page.tsx
│   │   └── sitemap/page.tsx
│   ├── api/
│   │   └── contact/route.ts    # POST handler para form
│   ├── studio/[[...tool]]/     # Sanity Studio embebido
│   ├── sitemap.ts              # next-sitemap dinámico
│   ├── robots.ts
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   ├── sections/               # 1 archivo por sección reutilizable
│   ├── ui/                     # Button, Card, Eyebrow, Badge...
│   └── icons/
├── sanity/
│   ├── schemas/                # ver content-schema.md
│   ├── lib/
│   │   ├── client.ts
│   │   ├── image.ts            # urlFor() helper
│   │   └── queries.ts          # GROQ queries tipadas
│   ├── env.ts
│   └── structure.ts            # Custom desk structure
├── i18n/
│   ├── config.ts
│   └── messages/
│       ├── es.json
│       └── en.json
├── lib/
│   ├── seo.ts                  # generateMetadata helpers
│   └── utils.ts
├── public/
│   ├── fonts/                  # si self-host
│   └── images/                 # solo assets fijos (logo, og:image fallback)
├── tailwind.config.ts
├── next.config.ts
├── sanity.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Páginas y rutas

Ver `pages-spec.md` para detalle de cada página. Resumen:

| Ruta (ES) | Ruta (EN) | Sanity doc |
|---|---|---|
| `/` | `/en` | `homePage` (singleton) |
| `/sobre` | `/en/about` | `aboutPage` (singleton) |
| `/tamizaje` | `/en/screening` | `karyotypePage` (singleton) |
| `/servicios` | `/en/services` | `service[]` |
| `/servicios/[slug]` | `/en/services/[slug]` | `service` |
| `/blog` | `/en/blog` | `post[]` |
| `/blog/[slug]` | `/en/blog/[slug]` | `post` |
| `/faq` | `/en/faq` | `faq[]` + `faqPage` |
| `/profesionales` | `/en/professionals` | `professionalsPage` |
| `/contacto` | `/en/contact` | `contactPage` (singleton) |
| `/legal` | `/en/legal` | `legalPage` (singleton) |
| `/sitemap` | `/en/sitemap` | (estático) |

---

## 5. Fases de construcción (orden recomendado)

### Fase 1 — Base (sesión 1, ~2h)
1. `npx create-next-app@latest` con TS, Tailwind, App Router, ESLint
2. Instalar deps: `@sanity/client`, `@sanity/image-url`, `next-sanity`, `sanity`, `next-intl`, `lucide-react`, `clsx`
3. Configurar Tailwind con `design-tokens.json` → `tailwind.config.ts`
4. Configurar `next-intl` (locales `es` default + `en`)
5. Layout base: `Header` + `Footer` + container responsive
6. UI primitives: `Button`, `Eyebrow`, `Card`, `Badge`, `IconCircle`, `Chip`
7. Verificar `localhost:3000` con homepage placeholder

### Fase 2 — Sanity setup (sesión 2, ~2h)
1. `npm create sanity@latest` o studio embebido (`/app/studio/[[...tool]]/page.tsx`)
2. Schemas de `content-schema.md`: `homePage`, `aboutPage`, `karyotypePage`, `service`, `post`, `author`, `category`, `faq`, `siteSettings`
3. Custom structure (singletons no duplicables)
4. Localization: campos con `localeString`, `localeText`, `localeBlockContent` types
5. `client.ts` con `useCdn: true` en prod, `false` en dev
6. Popular Studio con contenido de `content.md` (manual o vía script)

### Fase 3 — Páginas (sesión 3, ~3h)
1. Home — todas las secciones (hero, karyotype intro, credentials, services, blog teaser, contact CTA)
2. About / Sobre — bio, timeline, philosophy, research
3. Tamizaje / Karyotype — explainer profundo + proceso + FAQ
4. Servicios — index + páginas individuales
5. Blog — index con filtros por categoría + post template con MDX/PortableText
6. Contacto — form + WhatsApp + clinic info
7. FAQ, Profesionales, Legal, Sitemap

### Fase 4 — Features cross-cutting (sesión 4, ~2h)
1. Form de contacto wired (POST `/api/contact` → Web3Forms o Resend → email)
2. SEO: `generateMetadata` en cada page, OG images, Twitter cards
3. Schema.org: `Physician`, `MedicalBusiness`, `Article` (blog), `FAQPage`
4. `sitemap.xml` y `robots.txt` dinámicos
5. GA4 con consent banner básico
6. WhatsApp floating button (mobile)
7. 404 page + 500 page

### Fase 5 — Performance + a11y (~1h)
1. `next/image` en TODAS las imágenes; Sanity image URL builder con auto formato/calidad
2. Lighthouse: target 95+ en todas las categorías
3. Skip-to-content link, focus visible, aria-labels
4. Verificar contraste de color (WCAG AA mínimo)

### Fase 6 — Deploy a Hostinger (~1h)
1. Build local: `npm run build` sin warnings
2. Conectar repo Git en hPanel
3. Variables de entorno (Sanity project ID, dataset, write token, GA ID, Web3Forms key)
4. SSL + dominio
5. Smoke test en producción

---

## 6. Internacionalización (next-intl)

- **Default locale:** `es`
- **Locales:** `['es', 'en']`
- Rutas localizadas: `/sobre` (es) ↔ `/en/about`
- Switcher en el header
- Sanity: cada campo de texto es objeto `{ es: '...', en: '...' }` (custom type `localeString`)
- UI strings (botones, labels) en `i18n/messages/es.json` y `en.json`

**Importante:** el contenido EN puede ser traducción manual del ES. Alguien lo tendrá que escribir/revisar — el handoff incluye copy ES completo y placeholders EN (`[EN] ...`) que un humano debe traducir.

---

## 7. Variables de entorno

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=          # solo para scripts
NEXT_PUBLIC_SITE_URL=https://drmejia.com

# Forms
WEB3FORMS_ACCESS_KEY=            # o RESEND_API_KEY + CONTACT_EMAIL_TO

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 8. Sanity MCP server (automatización con Claude)

Una vez todo levantado, instalar el MCP oficial de Sanity para poder subir/editar contenido desde Claude por lenguaje natural:

```bash
npm install -g @sanity/mcp-server
```

Configuración en `.cursor/mcp.json` o `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "sanity": {
      "command": "npx",
      "args": ["-y", "@sanity/mcp-server"],
      "env": {
        "SANITY_PROJECT_ID": "...",
        "SANITY_DATASET": "production",
        "SANITY_API_TOKEN": "..."
      }
    }
  }
}
```

Casos de uso:
- "Subí este markdown como blog post, generá meta description, etiquetá con [genética, neonatal]"
- "Cambiá el horario de la clínica los sábados a 8-12"
- "Agregá una FAQ sobre cariotipo prenatal"

---

## 9. SEO checklist

- [ ] `generateMetadata()` en cada page (title, description, og:image, canonical)
- [ ] `sitemap.xml` dinámico (incluye blog posts de Sanity)
- [ ] `robots.txt`
- [ ] Schema.org JSON-LD: `Physician`, `MedicalBusiness`, `Article`, `FAQPage`, `BreadcrumbList`
- [ ] OpenGraph + Twitter Cards
- [ ] `hreflang` para ES/EN
- [ ] `lang` attribute por locale
- [ ] Imágenes con `alt` real (desde Sanity, no autogenerado)
- [ ] Headings jerárquicos (1 `h1` por página)
- [ ] URLs limpias, slugs en kebab-case, sin stop words

---

## 10. Accessibility checklist

- [ ] Contraste WCAG AA (text vs bg)
- [ ] Focus visible en todos los interactivos
- [ ] Skip-to-content
- [ ] `aria-label` en botones-icono
- [ ] Form labels asociados
- [ ] Sin keyboard traps
- [ ] Movimiento reducido respetado (`prefers-reduced-motion`)
- [ ] Headings sin saltos jerárquicos

---

## 11. Performance targets

| Métrica | Target |
|---|---|
| Lighthouse Performance | 95+ |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | 95+ |
| LCP | < 2.0s |
| CLS | < 0.05 |
| INP | < 200ms |
| Bundle JS first-load | < 150kb |

---

## 12. Cosas que NO hacer

- No usar `<img>` raw — siempre `next/image` o componente Sanity Image.
- No hardcodear textos en componentes — todo va a Sanity o a `messages/*.json`.
- No usar emojis (no son parte del brand).
- No agregar gradients de colores nuevos sin pasar por design tokens.
- No instalar component libraries pesadas (shadcn ok, pero Material UI/Chakra → no).
- No crear nuevas paletas de color — el sistema actual es completo.

---

## 13. Referencia visual

El proyecto incluye los archivos HTML/JSX originales del diseño aprobado. Tratarlos como **especificación visual** — reproducir layouts, espaciados, colores, tipografía. NO copiar el código tal cual (es prototipo no-Next), pero sí su look & feel exacto.

Archivos clave de referencia:
- `dr-mejia-preview.html` — preview ensamblado (todas las páginas en uno)
- `index.html`, `sobre.html`, `tamizaje.html`, `servicios.html`, `blog.html`, `articulo.html`, `contacto.html`, `faq.html`, `profesionales.html`, `legal.html`, `sitemap.html`
- `styles.css` — sistema de diseño completo (extraer tokens a `design-tokens.json`)
- `*.jsx` — secciones React de referencia

---

## 14. Entregables al final

1. Repo Git con código fuente
2. Sanity Studio funcional con contenido inicial
3. Sitio live en `https://[dominio].com`
4. Sanity MCP configurado y documentado
5. README.md con instrucciones de desarrollo y deploy
6. Lista de credenciales (Sanity tokens, Web3Forms key, GA ID) entregada de forma segura

---

## 15. Open questions (pendientes del cliente)

- [ ] Dominio definitivo
- [ ] Email destino del formulario de contacto
- [ ] Foto profesional del Dr. Mejía (alta resolución)
- [ ] Fotos de la clínica (sala de espera, consultorio, fachada)
- [ ] Logo (si existe) o decisión de mantener el monograma "GM"
- [ ] Horarios de atención exactos
- [ ] Dirección exacta de la clínica
- [ ] Número WhatsApp profesional
- [ ] Convenios con aseguradoras (lista)
- [ ] CV completo / publicaciones para sección de profesionales

Ver `assets-needed.md` para checklist completa.
