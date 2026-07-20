<?php
/**
 * Template Name: Para profesionales
 *
 * Página dirigida a colegas que refieren pacientes.
 *
 * @package DrMejia
 */

get_header();
?>

<section class="page-hero">
    <div class="container">
        <span class="chip" style="margin-bottom: 24px;"><?php esc_html_e( 'Para profesionales', 'drmejia' ); ?></span>
        <h1>
            <?php
            printf(
                /* translators: %s = highlighted phrase */
                esc_html__( 'Trabajamos con %s en toda Centroamérica', 'drmejia' ),
                '<span class="accent">' . esc_html__( 'colegas que refieren pacientes', 'drmejia' ) . '</span>'
            );
            ?>
        </h1>
        <p class="lede"><?php esc_html_e( 'Información práctica para médicos, pediatras y especialistas que quieran derivar pacientes a una evaluación genética o pediátrica especializada.', 'drmejia' ); ?></p>
    </div>
</section>

<section class="section">
    <div class="container">
        <div class="services-grid" style="grid-template-columns: repeat(3, 1fr);">
            <div class="card">
                <span class="icon-circle"><?php echo drmejia_icon( 'phone', 22 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
                <h3 class="h4" style="margin-bottom: 10px;"><?php esc_html_e( 'Línea profesional', 'drmejia' ); ?></h3>
                <p class="body" style="font-size: 14.5px;"><?php esc_html_e( 'Coordinamos derivaciones por WhatsApp directo. Compartimos resúmenes clínicos y recomendaciones de seguimiento.', 'drmejia' ); ?></p>
            </div>
            <div class="card">
                <span class="icon-circle"><?php echo drmejia_icon( 'shield', 22 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
                <h3 class="h4" style="margin-bottom: 10px;"><?php esc_html_e( 'Protocolos de derivación', 'drmejia' ); ?></h3>
                <p class="body" style="font-size: 14.5px;"><?php esc_html_e( 'Lineamientos para qué casos referir, qué estudios previos enviar y cómo dar seguimiento conjunto al paciente.', 'drmejia' ); ?></p>
            </div>
            <div class="card">
                <span class="icon-circle"><?php echo drmejia_icon( 'award', 22 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
                <h3 class="h4" style="margin-bottom: 10px;"><?php esc_html_e( 'Docencia y casos', 'drmejia' ); ?></h3>
                <p class="body" style="font-size: 14.5px;"><?php esc_html_e( 'Sesiones clínicas, charlas en hospitales y discusión de casos para residentes y pediatras en formación.', 'drmejia' ); ?></p>
            </div>
        </div>
    </div>
</section>

<section class="section home-cta-section">
    <div class="container" style="text-align: center; max-width: 720px;">
        <h2><?php esc_html_e( '¿Quiere referir un paciente?', 'drmejia' ); ?></h2>
        <p class="lede" style="margin-bottom: 32px;">
            <?php esc_html_e( 'Escríbanos por WhatsApp con un breve resumen del caso y le confirmamos disponibilidad.', 'drmejia' ); ?>
        </p>
        <a href="<?php echo esc_url( drmejia_whatsapp_url( __( 'Hola, soy colega y quisiera referir un paciente.', 'drmejia' ) ) ); ?>"
           class="btn"
           style="background: #FFF; color: var(--brand);"
           rel="noopener"
           target="_blank">
            <?php esc_html_e( 'Coordinar derivación', 'drmejia' ); ?>
            <?php echo drmejia_icon( 'arrow-right', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
        </a>
    </div>
</section>

<?php get_footer(); ?>
