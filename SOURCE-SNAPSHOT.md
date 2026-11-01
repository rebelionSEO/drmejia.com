# Procedencia del código · 1 de noviembre de 2026

Esta actualización reúne el código del tema activo a partir del respaldo completo `tema-antes.zip` del 29 de octubre y de las copias locales finales de cada cambio posterior. El 1 de noviembre se descargaron copias de solo lectura de las carpetas activas `drmejia` y `drmejia-ga4` desde el administrador específico del sitio y se compararon archivo por archivo con este repositorio. Los 24 archivos del tema están presentes: 23 coinciden byte por byte y `functions.php` tiene únicamente la variación de privacidad indicada abajo. Los dos archivos del plugin coinciden byte por byte.

| Archivo en el repositorio | Última copia local aplicada |
| --- | --- |
| `theme/drmejia/front-page.php` | Retiro de las dos tarjetas flotantes del inicio, 1 de noviembre |
| `theme/drmejia/page-sobre.php` | Retrato provisional con paleta verde y salvia, 1 de noviembre |
| `theme/drmejia/footer.php` | Enlace «Medios», 1 de noviembre |
| `theme/drmejia/functions.php`, `single.php` | Ajustes de privacidad del correo, 29 de octubre. En `functions.php`, la identificación de administradores se generalizó para no guardar un correo personal ni su slug en el repositorio público; esta última modificación aún no se ha desplegado. |
| `theme/drmejia/header.php` | Logo principal, 29 de octubre |
| `theme/drmejia/page-contacto.php` | Formulario de contacto vigente, 29 de octubre |
| `theme/drmejia/page-faq.php` | Ajustes de seguros, 29 de octubre |
| `theme/drmejia/page-tamizaje.php`, `style.css`, `theme.json`, `assets/js/dna-scenes.js` | Paleta final, 29 de octubre |
| Resto de `theme/drmejia/` | Respaldo completo `tema-antes.zip`, 29 de octubre |
| `plugins/drmejia-ga4/drmejia-ga4.php` | Corrección de imagen social del artículo neonatal, 1 de noviembre |
| `plugins/drmejia-ga4/assets/drmejia-social.png` | Archivo original del plugin activo en Hostinger, 1 de noviembre |
| `wordpress-config/css-adicional.css` | CSS adicional guardado en WordPress, 30 de octubre |

Los PNG de `source-assets/` son los originales locales de logo, favicon y retrato usados para las cargas a WordPress. Los medios de la biblioteca, los certificados, las páginas y los artículos no se exportaron a Git.

El sitio no se despliega automáticamente desde este repositorio. La variante de privacidad de `functions.php` existe solo en Git y debe revisarse antes de cualquier despliegue. Los contenidos de WordPress pueden cambiar independientemente de este código.
