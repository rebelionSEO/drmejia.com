# Sitio del Dr. Gerardo Mejía

Código del tema de WordPress de [doctorgerardomejia.com](https://doctorgerardomejia.com/) y de sus plugins propios. El repositorio es un respaldo de código; un commit no despliega cambios en Hostinger.

## Estructura actual

- `theme/drmejia/`: tema activo, plantillas, CSS, fuente local y animaciones.
- `plugins/drmejia-ga4/`: plugin propio para GTM, consentimiento y metadatos sociales. Requiere la configuración de WordPress y Rank Math existente.
- `plugins/drmejia-motion/`: plugin de animaciones de páginas interiores incorporado al repositorio el 1 de noviembre de 2026.
- `wordpress-config/css-adicional.css`: copia del CSS adicional configurado en WordPress; no se carga automáticamente desde el tema.
- `source-assets/`: originales de marca y retrato usados en la biblioteca de medios de WordPress. No se cargan automáticamente desde el repositorio.
- `_handoff/` y `docs/content-engine/`: material histórico de referencia del repositorio, sin publicación automática.

El contenido de páginas y entradas, la configuración de WordPress, los medios subidos y los datos de analítica viven fuera de Git. Este repositorio no contiene pacientes, credenciales ni la carpeta privada de planificación del proyecto.

## Estado y despliegue

La versión inicial de código se reconstruyó el 1 de noviembre de 2026 a partir de respaldos locales y se comparó después con los archivos activos del tema y del plugin de analítica. Las plantillas de tamizaje y «Sobre el doctor» se actualizaron posteriormente con las versiones publicadas el 5 de noviembre. Véase [la procedencia y los límites de la copia](SOURCE-SNAPSHOT.md).

Antes de cualquier despliegue, comparar cada archivo con la versión activa del servidor, hacer un respaldo y revisar el contenido de WordPress. No copiar el repositorio completo sobre `wp-content`: `source-assets/` y `wordpress-config/` son referencias, y la configuración del sitio no está versionada aquí.
