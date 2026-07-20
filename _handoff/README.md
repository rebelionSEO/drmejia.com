# Handoff — Sitio Web Dr. Gerardo Mejía

Spec completa para construir el sitio en Next.js 15 + Sanity CMS, deploy en Hostinger.

## Cómo usar este paquete

1. Leé **`PROMPT.md`** primero — explica cómo arrancar con Claude Code.
2. Después leé **`HANDOFF.md`** — la spec técnica completa.
3. Los demás archivos son referencia que Claude Code va a consultar:
   - `design-tokens.json` — colores, tipografía, spacing
   - `content-schema.md` — schemas de Sanity
   - `pages-spec.md` — estructura de cada página
   - `content.md` — guía para poblar Sanity con el copy
   - `assets-needed.md` — checklist de fotos/logos pendientes

## Carpeta `reference/`

Contiene los archivos HTML/JSX/CSS del diseño aprobado en este proyecto. Sirven como **spec visual** — Claude Code los lee para reproducir layouts, colores y tipografía exactos.

## Decisiones tomadas

- Stack: Next.js 15 + TypeScript + Tailwind + Sanity + next-intl
- Idiomas: Español (default) + Inglés
- Blog: activo desde el lanzamiento
- Analytics: GA4
- Hosting: Hostinger Cloud Hosting
- Form: Web3Forms

## Pendientes del cliente

- Dominio
- Email destino del formulario
- Foto profesional alta resolución del Dr. Mejía
- Fotos de la clínica
- Horarios y dirección exactos
- Número WhatsApp profesional
