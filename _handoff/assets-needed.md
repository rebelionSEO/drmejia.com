# Assets necesarios

Lista de assets que necesitás conseguir antes (o durante) el build. Sin estos, el sitio sale con placeholders.

## 🔴 Críticos para lanzamiento

| Asset | Detalles | Dónde se usa |
|---|---|---|
| **Foto profesional del Dr. Mejía** | Editorial, fondo neutro, vertical 3:4 mínimo 2000×2667px, alta calidad | Home hero, About hero, Footer |
| **Foto del Dr. casual / clínica** | En consultorio o atendiendo, contexto cálido, horizontal 16:9 | About sección "Una vida dedicada" |
| **Fotos de la clínica** (3-4) | Fachada, sala de espera, consultorio, equipo médico | Contacto, About, Tamizaje |
| **Logo o monograma** | Si hay logo formal: SVG vectorial. Si no, mantener "GM" actual | Header, Footer, favicon, OG image |
| **Favicon** | 32×32 + 180×180 (apple-touch) + SVG | Browser tab |
| **OG image default** | 1200×630px, marca + nombre Dr. | Compartir en redes/WhatsApp |
| **Email destino del form** | Correo profesional donde recibir solicitudes | API contact |
| **Número WhatsApp profesional** | Con código país (+505...) — **placeholder por ahora** | Header, footer, CTAs |
| **Teléfono de citas** | Línea de clínica — **placeholder por ahora** | Footer, contacto |
| **Dirección exacta** | Calle, ciudad, referencias | Footer, contacto |
| **Horarios reales** | L-V, Sábado, etc. | Footer, contacto |
| **Google Maps embed** | URL del iframe de la clínica | Contacto |
| **Dominio** | ✅ Comprado: `doctorgerardomejia.com` (Hostinger) | DNS, SSL, env vars |

### Claims verificados (no tocar)

| Claim | Estado |
|---|---|
| **Primer médico genetista de Nicaragua** | Confirmado por el Dr. Mejía (hecho histórico). Mantener en hero/chip. |

## 🟡 Importantes (pueden agregarse post-launch)

| Asset | Detalles |
|---|---|
| **Foto neonatal / cariotipo** | Stock médico ético o foto real con consentimiento — sección Tamizaje |
| **Fotos blog posts** (3-5) | Cover images de los primeros artículos |
| **CV completo / publicaciones** | Lista detallada para sección profesionales |
| **Convenios con aseguradoras** | Lista de aseguradoras aceptadas |
| **Logos aseguradoras** | Si se quieren mostrar (con permiso) |
| **Testimonios pacientes** | Con consentimiento escrito |

## 🟢 Opcionales

| Asset | Detalles |
|---|---|
| **Video corto presentación** | 30-60s, hero del Home |
| **Documentos PDF descargables** | Para sección profesionales (protocolos derivación, etc.) |
| **Iconos custom** | Si se quiere reemplazar Lucide en algún lugar específico |

---

## Especificaciones técnicas

- **Imágenes raster:** PNG/JPG alta resolución → Sanity las optimiza a WebP/AVIF automáticamente
- **Vectores:** SVG limpio, sin clases CSS embebidas
- **Color mode:** sRGB
- **Compresión:** subir originales sin comprimir (Sanity comprime al servir)
- **Alt text:** SIEMPRE escribir alt en español E inglés (campo en Sanity)

## Para conseguir fotos profesionales

Recomendaciones:
- Sesión fotográfica editorial: 1-2h, fondo neutro, luz natural
- Si no hay presupuesto: fotos del celular en buena luz, fondo simple, vestimenta clínica
- Evitar fotos viejas pixeladas o con flash duro
- Pedir derechos de uso por escrito si es trabajo de un fotógrafo

## Stock alternativos (mientras llegan fotos reales)

- Unsplash (gratis, atribución no requerida): buscar "pediatrician", "doctor consultation"
- Pexels: similar
- **NO usar:** imágenes con watermark, IA generadas que parezcan reales (problema ético en contexto médico)
