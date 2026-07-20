<?php
/**
 * Template Name: Legal — Privacidad y términos
 *
 * Static legal page. Anchors: #privacidad #terminos #cookies
 *
 * @package DrMejia
 */

get_header();
?>

<section class="page-hero">
    <div class="container">
        <span class="chip" style="margin-bottom: 24px;"><?php esc_html_e( 'Legal', 'drmejia' ); ?></span>
        <h1><?php esc_html_e( 'Privacidad, términos y cookies', 'drmejia' ); ?></h1>
        <p class="lede"><?php esc_html_e( 'Cómo tratamos su información médica y los términos de uso de este sitio.', 'drmejia' ); ?></p>
    </div>
</section>

<section class="section">
    <div class="container" style="max-width: 800px;">

        <article id="privacidad" style="margin-bottom: var(--s-8);">
            <h2 style="margin-bottom: var(--s-5);"><?php esc_html_e( 'Política de privacidad', 'drmejia' ); ?></h2>
            <div class="body">
                <p><?php esc_html_e( 'La información clínica compartida durante la consulta y a través del formulario de contacto se trata bajo confidencialidad médica. No compartimos datos identificables con terceros sin consentimiento expreso.', 'drmejia' ); ?></p>
                <p><?php esc_html_e( 'Los datos enviados por el formulario de contacto se usan únicamente para responder a su solicitud y agendar la cita. Puede solicitar la eliminación de sus datos escribiéndonos al correo de contacto.', 'drmejia' ); ?></p>
            </div>
        </article>

        <article id="terminos" style="margin-bottom: var(--s-8);">
            <h2 style="margin-bottom: var(--s-5);"><?php esc_html_e( 'Términos de uso', 'drmejia' ); ?></h2>
            <div class="body">
                <p><?php esc_html_e( 'El contenido del blog y las páginas informativas tiene fines educativos y no sustituye a una consulta médica individualizada. Cada caso debe ser evaluado por un profesional.', 'drmejia' ); ?></p>
                <p><?php esc_html_e( 'El sitio puede contener enlaces externos a publicaciones científicas y recursos de referencia. No nos hacemos responsables del contenido alojado en sitios de terceros.', 'drmejia' ); ?></p>
            </div>
        </article>

        <article id="cookies">
            <h2 style="margin-bottom: var(--s-5);"><?php esc_html_e( 'Cookies', 'drmejia' ); ?></h2>
            <div class="body">
                <p><?php esc_html_e( 'Usamos cookies estrictamente necesarias para el funcionamiento del sitio y, opcionalmente, cookies analíticas (Google Analytics) para entender el uso del sitio de forma agregada y mejorar la experiencia.', 'drmejia' ); ?></p>
                <p><?php esc_html_e( 'Puede deshabilitar las cookies analíticas desde la configuración de su navegador en cualquier momento.', 'drmejia' ); ?></p>
            </div>
        </article>

    </div>
</section>

<?php get_footer(); ?>
