# Pages Spec — Dr. Mejía

> Detalle de cada ruta. Para el copy literal, ver los archivos HTML/JSX de referencia incluidos en el handoff (`reference/`). Esta spec describe **estructura, secciones, comportamiento y data binding con Sanity**.

Convención: cada sección lista su data source en Sanity (campo del schema correspondiente) entre `[…]`.

---

## `/` — Home

**Sanity doc:** `homePage` (singleton) + `siteSettings`

| Sección | Componente | Data |
|---|---|---|
| Hero | `<HomeHero>` | `homePage.hero*`, `siteSettings.phone/whatsapp` |
| Karyotype intro | `<KaryotypeTeaser>` | `homePage.karyotype*` |
| Credentials strip | `<CredentialsStrip>` | `homePage.credentialsItems` |
| Featured services | `<ServicesGrid>` | `homePage.featuredServices[]` (refs a `service`) |
| Process / 3 steps | `<HowItWorks>` | hardcoded en i18n messages (proceso fijo) |
| About teaser | `<AboutTeaser>` | `homePage.aboutBlurb`, link a `/sobre` |
| Blog teaser | `<FeaturedPosts>` | `homePage.featuredPosts[]` |
| Final CTA | `<ContactCTA>` | `homePage.cta*`, `siteSettings.whatsapp` |

**Comportamiento:**
- Hero portrait debe ser `next/image` con `priority` (LCP)
- WhatsApp button mobile-fixed en bottom-right (visible scrollY > 400px)
- Secciones con `<section data-screen-label="01 Hero">` etc.

---

## `/sobre` — About / Bio

**Sanity doc:** `aboutPage` (singleton)

| Sección | Data |
|---|---|
| Hero (retrato + nombre + credencial) | `aboutPage.heroTitle/Lead/portrait` |
| Filosofía clínica | `aboutPage.philosophy` (block content) |
| Línea de tiempo de carrera | `aboutPage.timeline[]` |
| Investigación / publicaciones | `aboutPage.research` |
| Membresías profesionales | `aboutPage.memberships[]` |
| CTA contacto | reutiliza `<ContactCTA>` |

---

## `/tamizaje` — Cariotipo / Tamizaje Neonatal

**Sanity doc:** `karyotypePage` (singleton) + `faq[]` filtrados por `topic="karyotype"`

| Sección | Data |
|---|---|
| Hero explicativo | `karyotypePage.hero*` |
| Qué es / por qué importa | `karyotypePage.whatIs`, `whyMatters` (block content) |
| Cuándo se indica | `karyotypePage.indications[]` |
| Proceso paso a paso | `karyotypePage.processSteps[]` |
| FAQ específica | query `*[_type=="faq" && topic=="karyotype"]` |
| CTA agendar | `<ContactCTA>` |

---

## `/servicios` — Servicios

**Index:** lista todos los `service` ordenados por `order`.
**Detalle (`/servicios/[slug]`):** un `service` document.

Páginas individuales actuales: `consulta-pediatrica`, `asesoria-genetica`. Más se agregan creando documents en Sanity.

| Sección detalle | Data |
|---|---|
| Hero | `service.title`, `shortDescription`, `image` |
| Long description | `service.longDescription` (block content) |
| Qué esperar | `service.whatToExpect[]` |
| Duración / precio | `service.duration`, `price` |
| FAQ relacionada | filtrar `faq` por topic |
| CTA | `<ContactCTA>` |

---

## `/blog` — Blog

**Index:** todos los `post` orden `publishedAt desc`. Filtros por `category` (chips). Paginación o "load more".

**Detalle (`/blog/[slug]`):**

| Sección | Data |
|---|---|
| Header (cover, title, author, date, readtime, categories) | `post.*`, `post.author->`, `post.categories[]->` |
| Body (PortableText) | `post.body` con custom serializers (image, callout, table) |
| Author bio inline | `post.author->` |
| Posts relacionados | query: mismos categories, distinto _id, order recent, limit 3 |
| CTA suscripción / contacto | `<ContactCTA>` |

**Notas técnicas:**
- ISR con `revalidate: 60` para que blog posts nuevos aparezcan rápido
- `generateStaticParams()` con todos los slugs al build
- Schema.org `Article` JSON-LD

---

## `/faq`

Lista TODAS las FAQs agrupadas por `topic`. Acordeón. Sticky table-of-contents lateral en desktop.

---

## `/profesionales`

Para colegas que refieren pacientes. Protocolos, formularios descargables, lineamientos de derivación.

---

## `/contacto`

| Sección | Data |
|---|---|
| Hero | `contactPage.hero*` |
| Formulario | POST a `/api/contact` → Web3Forms o Resend |
| Info clínica (dirección, horarios, mapa) | `siteSettings.address/hours/mapEmbed` |
| WhatsApp directo | `siteSettings.whatsapp` |
| FAQ corta primera consulta | filtrar `faq` por topic="consultation" |

**Form fields:** nombre, email, teléfono, asunto (select: cita/consulta/profesional), mensaje, consentimiento (checkbox legal).
**Validación:** zod + react-hook-form.
**Anti-spam:** honeypot + rate limit en API route.

---

## `/legal`

`legalPage.privacy`, `terms`, `cookies` — todo block content. Ancla `#privacy` `#terminos` `#cookies`.

---

## `/sitemap` (visual, no XML)

Lista navegable de todas las páginas. Útil para usuarios y Google. **Adicional** al `sitemap.xml` real.

---

## 404 / 500

Custom branded. Link de regreso a home + búsqueda básica.

---

## Comportamientos globales

- **Header:** sticky, blur background. Mobile: hamburguesa con drawer.
- **Footer:** dirección, horarios, redes, links a páginas legales, idioma switcher.
- **Skip-to-content** link al inicio del body.
- **Locale switcher:** preserva ruta equivalente (`/sobre` ↔ `/en/about`).
- **Analytics:** GA4 page_view en cada navegación (Next router events).
- **Loading states:** skeletons para listas dinámicas (blog index).
- **Error boundaries:** por route group.
