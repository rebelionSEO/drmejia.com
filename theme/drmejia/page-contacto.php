<?php
/**
 * Template Name: Contacto
 *
 * Mirrors _handoff/reference/contact-page.jsx
 * Appointment form is handled by Contact Form 7.
 *
 * @package DrMejia
 */

get_header();
?>

<!-- ============================================================
     01 · CONTACT HERO
     ============================================================ -->
<section class="page-hero" style="padding-bottom: 32px;">
    <div class="container">
        <span class="chip" style="margin-bottom: 24px;">
            <?php echo drmejia_icon( 'phone', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
            <?php esc_html_e( 'Contacto y citas', 'drmejia' ); ?>
        </span>
        <h1>
            <?php
            printf(
                /* translators: %s = highlighted phrase */
                esc_html__( 'Estamos aquí cuando %s nos necesite', 'drmejia' ),
                '<span class="accent">' . esc_html__( 'su familia', 'drmejia' ) . '</span>'
            );
            ?>
        </h1>
    </div>
</section>

<!-- ============================================================
     02 · FORM + INFO GRID
     ============================================================ -->
<section class="section" style="padding-top: 32px;">
    <div class="container">
        <div class="contact-grid">

            <div class="card" style="padding: 40px;">
                <span class="eyebrow" style="margin-bottom: 16px; display: inline-flex;"><?php esc_html_e( 'Solicitar cita', 'drmejia' ); ?></span>
                <h2 class="h3" style="margin-bottom: 12px;"><?php esc_html_e( 'Formulario de cita', 'drmejia' ); ?></h2>
                <p class="body" style="margin-bottom: 28px; font-size: 15px;">
                    <?php esc_html_e( 'Complete el formulario y le contactaremos para coordinar su cita.', 'drmejia' ); ?>
                </p>

                <?php
                echo do_shortcode( '[contact-form-7 id="f0e23c7" title="Solicitud de cita web"]' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                ?>
            </div>

            <div class="contact-info-stack">
                <div class="card contact-card-green">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <?php echo drmejia_icon( 'whatsapp', 28 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                        <h3 class="h4">WhatsApp</h3>
                    </div>
                    <p style="font-size: 14px; margin-bottom: 16px;">
                        <?php echo esc_html( sprintf( __( 'La forma más rápida de comunicarse. Horario: %s.', 'drmejia' ), DRMEJIA_HOURS ) ); ?>
                    </p>
                    <a href="<?php echo esc_url( drmejia_whatsapp_url( __( 'Hola, quisiera agendar una consulta.', 'drmejia' ) ) ); ?>"
                       class="btn"
                       rel="noopener"
                       target="_blank">
                        <?php echo esc_html( DRMEJIA_PHONE_DISPLAY ); ?>
                        <?php echo drmejia_icon( 'arrow-right', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                    </a>
                </div>

                <div class="card">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <span class="icon-circle" style="width: 44px; height: 44px; margin-bottom: 0;">
                            <?php echo drmejia_icon( 'pin', 20 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                        </span>
                        <h3 class="h4"><?php esc_html_e( 'La clínica', 'drmejia' ); ?></h3>
                    </div>
                    <p style="margin: 0; font-size: 14px; color: var(--ink); line-height: 1.6;">
                        <?php esc_html_e( 'Clínica Perinatal', 'drmejia' ); ?><br>
                        <?php esc_html_e( 'De los semáforos del Monte de los Olivos', 'drmejia' ); ?><br>
                        <?php esc_html_e( '1c al lago, 1c al este, 20m al sur', 'drmejia' ); ?><br>
                        <?php esc_html_e( 'Managua, Nicaragua', 'drmejia' ); ?>
                    </p>
                    <hr style="border: 0; border-top: 1px solid var(--rule); margin: 16px 0;">
                    <div class="meta" style="font-size: 12px; margin-bottom: 4px;"><?php esc_html_e( 'Horario', 'drmejia' ); ?></div>
                    <div style="font-size: 14px; font-weight: 600;"><?php echo esc_html( DRMEJIA_HOURS ); ?></div>
                    <div style="font-size: 13px; color: var(--ink-3); margin-top: 8px;"><?php echo esc_html( DRMEJIA_PHONE_CLINIC_DISPLAY ); ?></div>
                </div>

                <div class="placeholder-block" style="aspect-ratio: 16 / 9; border-radius: var(--r-lg);">
                    <span class="placeholder-tag"><?php esc_html_e( 'mapa · ubicación de la clínica', 'drmejia' ); ?></span>
                </div>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>
