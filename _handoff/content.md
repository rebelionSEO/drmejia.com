# Content — Copy del sitio (ES + EN)

> Todo el copy actual del sitio está en los archivos HTML/JSX de referencia incluidos en `reference/`. Ese es el copy aprobado en español. Para inglés, los textos deben traducirse manualmente — abajo se da una guía de tono y prioridades.

## Cómo poblar Sanity

**Opción A — Manual (recomendado para primera carga):**
Abrir Sanity Studio → cada singleton → copiar/pegar desde los HTML de referencia. Tiempo estimado: 2-3h.

**Opción B — Script de seed:**
Crear `scripts/seed.ts` que lea los HTML/JSX y use `@sanity/client` con write token para crear los documents. Útil si se quiere repetir el setup en múltiples datasets (dev/staging/prod).

**Opción C — Sanity MCP:**
Una vez configurado el MCP, pedirle a Claude que extraiga los textos de los HTML y los suba como documents.

---

## Mapeo HTML → Sanity

| Archivo referencia | Sanity document |
|---|---|
| `index.html` / `home-sections.jsx` | `homePage` |
| `sobre.html` / `about-page.jsx` | `aboutPage` |
| `tamizaje.html` / `tamizaje-page.jsx` | `karyotypePage` |
| `servicios.html` | crear varios `service` documents |
| `consulta-pediatrica.html` | `service` con slug `consulta-pediatrica` |
| `asesoria-genetica.html` | `service` con slug `asesoria-genetica` |
| `blog.html` / `articulo.html` | `post` documents (crear 3-5 iniciales) |
| `faq.html` | varios `faq` documents |
| `contacto.html` / `contact-page.jsx` | `contactPage` |
| `profesionales.html` | `professionalsPage` |
| `legal.html` | `legalPage` |

---

## Guía de tono (ES)

- **Voz:** profesional, cálida, paciente. Como un médico explicando a una madre primeriza.
- **Persona:** "le", "su hijo/a", "su familia" (formal). Evitar tuteo.
- **Términos médicos:** definir siempre en lenguaje simple la primera vez.
- **No usar:** emoticones, exclamaciones múltiples, lenguaje promocional ("¡Lo mejor!"), claims sin evidencia.
- **Sí usar:** datos concretos, años de experiencia, instituciones, evidencia.

## Guía de traducción (EN)

- Mismo tono profesional/cálido. "You", "your child" — no tuteo informal.
- Términos médicos: usar términos en inglés americano (`screening`, `karyotype`, `pediatric`).
- Mantener nombres propios de instituciones tal cual ("Hospital Infantil Manuel de Jesús Rivera"), pero agregar traducción entre paréntesis la primera vez si ayuda a la comprensión.
- Para términos legales/médicos donde haya duda: dejar nota `[REVIEW]` para que un humano revise.

---

## Páginas prioritarias para tener completas en EN al lanzamiento

1. Home (todas las secciones)
2. Sobre / About
3. Tamizaje / Screening
4. Contacto / Contact
5. Servicios / Services (al menos los 2 principales)

Las FAQs y blog posts pueden empezar solo en ES y traducirse con el tiempo. Configurar fallback: si `en.X` está vacío, mostrar `es.X` con un badge "Solo disponible en español" (opcional).

---

## Consideraciones legales (texto a redactar con abogado)

- Aviso de privacidad — redactar con abogado nicaragüense según Ley 787 de Protección de Datos Personales.
- Términos de uso del sitio.
- Cookies notice — GA4 requiere consentimiento; usar banner mínimo (Aceptar / Rechazar).
- Disclaimer médico: el sitio es informativo, NO sustituye consulta presencial.
