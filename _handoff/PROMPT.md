# PROMPT para Claude Code

Copiá y pegá esto en una nueva sesión de Claude Code, en una carpeta vacía donde querés crear el proyecto. **Antes de pegar el prompt**, copiá toda la carpeta `handoff/` (incluyendo `reference/`) a esa carpeta para que Claude tenga acceso a la spec y al diseño aprobado.

---

## PROMPT

```
Vamos a construir un sitio web profesional en Next.js 15 + Sanity CMS para el Dr. Gerardo Mejía,
pediatra y genetista clínico en Nicaragua.

CONTEXTO Y SPEC:
- Leé HANDOFF.md completo antes de empezar — es la spec técnica de referencia obligatoria.
- design-tokens.json contiene los design tokens (colores, tipografía, spacing, shadows) — usalos
  como source-of-truth en tailwind.config.ts.
- content-schema.md define los schemas de Sanity que tenés que crear.
- pages-spec.md describe cada ruta con su data binding.
- content.md describe cómo poblar Sanity con el copy del sitio.
- assets-needed.md lista assets pendientes — usá placeholders por ahora.
- reference/ contiene los archivos HTML/JSX/CSS del diseño APROBADO. Tratalos como spec visual:
  reproducí layouts, espaciados, colores, tipografía exactos, pero NO copies el código tal cual
  (es prototipo, no Next).

STACK CONFIRMADO:
- Next.js 15 App Router + TypeScript estricto
- Tailwind CSS v4
- Sanity v3 (Studio embebido en /studio)
- next-intl (Español default + Inglés)
- Web3Forms para form de contacto (placeholder de API key)
- GA4 (placeholder de tracking ID)
- Lucide React para íconos
- Plus Jakarta Sans (Google Fonts)
- Deploy target: Hostinger Cloud Hosting

EMPEZÁ POR FASES (ver HANDOFF.md sección 5):
1. Setup base: create-next-app, deps, Tailwind config con tokens, layout base, UI primitives
2. Sanity setup: studio, schemas con localización, custom structure
3. Páginas: Home, Sobre, Tamizaje, Servicios, Blog, Contacto, FAQ, Profesionales, Legal
4. Features cross-cutting: form API, SEO, schema.org, sitemap, GA4, WhatsApp button
5. Performance + a11y: Lighthouse 95+, WCAG AA
6. Deploy a Hostinger

REGLAS DURAS:
- Nada de hardcodeo de textos en componentes — todo va a Sanity o a i18n/messages.
- next/image en TODAS las imágenes (nunca <img> raw).
- TypeScript strict — sin `any`.
- 1 h1 por página. Headings sin saltos jerárquicos.
- Sin emojis en UI (no son del brand).
- Sin nuevos colores fuera de design-tokens.json.
- Mobile-first responsive.

ENTREGABLES:
- Repo Git con código fuente
- Sanity Studio funcional
- Sitio levantado en localhost:3000 sin errores
- README con instrucciones (dev, build, deploy a Hostinger, configuración Sanity MCP)
- .env.example con todas las vars necesarias
- Lighthouse 95+ en todas las categorías

PROCESO:
- Confirmá la fase 1 conmigo antes de avanzar a la 2.
- Pedí cualquier credencial/decisión que falte (ej: Sanity project ID, GA tracking ID).
- Si hay ambigüedad entre el diseño y la spec, preguntame.
- Hacé commits frecuentes con mensajes descriptivos.

Empezá por la Fase 1: setup base del proyecto Next.js. Mostrame el package.json y la estructura
de carpetas antes de seguir.
```

---

## Antes de pegar el prompt — checklist

- [ ] Carpeta nueva vacía creada
- [ ] `handoff/` completo copiado dentro
- [ ] Carpeta `reference/` con los HTML/JSX/CSS originales del diseño copiada dentro
- [ ] Node.js 20+ instalado
- [ ] Cuenta Sanity creada (sanity.io) — gratis
- [ ] Cuenta Web3Forms creada (web3forms.com) — gratis, da una access key
- [ ] Cuenta Google Analytics 4 creada — da un tracking ID `G-XXXXXXXXXX`

## Después del setup

Cuando Claude Code termine la fase 1, vas a tener:
- Repo levantando en `localhost:3000`
- Tailwind con todos los tokens
- Layout base con header/footer

Ahí mismo podés:
1. Crear cuenta Sanity y obtener `projectId` + tokens → ponerlos en `.env.local`
2. Avanzar a fase 2 (Sanity setup)

## Tips para trabajar con Claude Code

- Pedile commits con mensajes claros — facilita revertir si algo se rompe
- Si una fase se complica, pedí "vamos paso a paso" y revisá cada commit
- Usá `git diff` antes de aceptar cambios grandes
- Si Claude empieza a inventar variables o tokens fuera del design system, traelo de vuelta:
  "usá solo los tokens definidos en tailwind.config.ts"
- Una vez funcionando, instalá Sanity MCP server (ver HANDOFF.md sección 8) para automatizar
  publicación de blog desde la misma sesión de Claude

¡Suerte!
