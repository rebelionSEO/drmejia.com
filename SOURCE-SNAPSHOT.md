# Procedencia del código · 1–5 de noviembre de 2026

La reconstrucción inicial reunió el código del tema activo a partir del respaldo completo `tema-antes.zip` del 29 de octubre y de las copias locales finales de cada cambio posterior. El 1 de noviembre se descargaron copias de solo lectura de las carpetas activas `drmejia` y `drmejia-ga4` desde el administrador específico del sitio y se compararon archivo por archivo con este repositorio. En ese cotejo, los 24 archivos del tema estaban presentes: 23 coincidían byte por byte y `functions.php` tenía únicamente la variación de privacidad indicada abajo. Los dos archivos del plugin coincidían byte por byte.

| Archivo en el repositorio | Última copia local aplicada |
| --- | --- |
| `theme/drmejia/front-page.php` | Retiro de las dos tarjetas flotantes del inicio, 1 de noviembre |
| `theme/drmejia/page-sobre.php` | Retrato y diez certificados visibles, última copia publicada el 5 de noviembre; ver precisión del cotejo posterior abajo |
| `theme/drmejia/footer.php` | Enlace «Medios», 1 de noviembre |
| `theme/drmejia/functions.php`, `single.php` | Ajustes de privacidad del correo, 29 de octubre. En `functions.php`, la identificación de administradores se generalizó para no guardar un correo personal ni su slug en el repositorio público; esta última modificación aún no se ha desplegado. |
| `theme/drmejia/header.php` | Logo principal, 29 de octubre |
| `theme/drmejia/page-contacto.php` | Formulario de contacto vigente, 29 de octubre |
| `theme/drmejia/page-faq.php` | Ajustes de seguros, 29 de octubre |
| `theme/drmejia/page-tamizaje.php` | Sección de toma de muestras fuera de Managua, 5 de noviembre |
| `theme/drmejia/style.css`, `theme.json`, `assets/js/dna-scenes.js` | Paleta final, 29 de octubre |
| Resto de `theme/drmejia/` | Respaldo completo `tema-antes.zip`, 29 de octubre |
| `plugins/drmejia-ga4/drmejia-ga4.php` | Corrección de imagen social del artículo neonatal, 1 de noviembre |
| `plugins/drmejia-ga4/assets/drmejia-social.png` | Archivo original del plugin activo en Hostinger, 1 de noviembre |
| `wordpress-config/css-adicional.css` | CSS adicional guardado en WordPress, 30 de octubre |

Los PNG de `source-assets/` son los originales locales de logo, favicon y retrato usados para las cargas a WordPress. Los medios de la biblioteca, los certificados, las páginas y los artículos no se exportaron a Git.

## Cambios posteriores al cotejo del 1 de noviembre

- El plugin `drmejia-motion` llegó a `main` mediante el merge `cc7858f6cce3a2416d2e73203682ef97c43aee89` del 1 de noviembre. Se conservó sin modificaciones en las sincronizaciones posteriores.
- `theme/drmejia/page-tamizaje.php` se actualizó el 5 de noviembre en `969bbfe8b93731e6790d584cec5a1db74a01410f` con la sección de toma de muestras fuera de Managua. Coincide byte por byte con la copia final publicada y verificada sin sesión (SHA-256 `6afe7e79a0b477e94eeb32c8e7b70dbe621c11c165cb5d97fbeb4bcc0a60397f`).
- `theme/drmejia/page-sobre.php` se actualizó desde la copia usada para publicar los siete certificados adicionales el 5 de noviembre (SHA-256 `5b607502f164dc20a18f992d7c3f98fb913966dbdf815f058ea4c403f78346ce`). La página pública mostró las diez tarjetas previstas y sus enlaces a documentos. El administrador de archivos rechazó una nueva lectura del archivo activo; por ello no se afirma una comparación de bytes posterior al despliegue.

El cotejo de 23/24 archivos del tema y dos del plugin de analítica descrito arriba corresponde al **1 de noviembre**, antes de los cambios posteriores. El sitio no se despliega automáticamente desde este repositorio. La variante de privacidad de `functions.php` existe solo en Git y debe revisarse antes de cualquier despliegue. Los contenidos de WordPress pueden cambiar independientemente de este código.
