<?php
/**
 * Template Name: Contacto
 *
 * Mirrors _handoff/reference/contact-page.jsx
 * Form is a plain mailto: action for v1; swap to Contact Form 7 / WPForms / Web3Forms in Phase 3.
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
                    <?php esc_html_e( 'Complete el formulario y le contactaremos dentro de las próximas 24 horas hábiles.', 'drmejia' ); ?>
                </p>

                <?php
                /**
                 * Phase 3: replace this raw form with [contact-form-7 id=...] or wpforms shortcode.
                 * For now the form posts to mailto: which opens the user's email client. Functional but not ideal.
                 */
                ?>
                <form action="mailto:<?php echo esc_attr( DRMEJIA_EMAIL ); ?>" method="post" enctype="text/plain" class="form-stack">
                    <div class="form-field">
                        <span class="label"><?php esc_html_e( 'Nombre del padre o madre', 'drmejia' ); ?> <span class="required">*</span></span>
                        <input type="text" name="parent" required placeholder="<?php esc_attr_e( 'Nombre completo', 'drmejia' ); ?>">
                    </div>

                    <div class="form-row-2">
                        <div class="form-field">
                            <span class="label"><?php esc_html_e( 'Teléfono / WhatsApp', 'drmejia' ); ?> <span class="required">*</span></span>
                            <input type="tel" name="phone" required placeholder="+505 0000-0000">
                        </div>
                        <div class="form-field">
                            <span class="label"><?php esc_html_e( 'Correo electrónico', 'drmejia' ); ?></span>
                            <input type="email" name="email" placeholder="su@correo.com">
                        </div>
                    </div>

                    <div class="form-row-2-1">
                        <div class="form-field">
                            <span class="label"><?php esc_html_e( 'Nombre del paciente', 'drmejia' ); ?></span>
                            <input type="text" name="child" placeholder="<?php esc_attr_e( 'Nombre del niño/a', 'drmejia' ); ?>">
                        </div>
                        <div class="form-field">
                            <span class="label"><?php esc_html_e( 'Edad', 'drmejia' ); ?></span>
                            <input type="text" name="age" placeholder="<?php esc_attr_e( '6 meses', 'drmejia' ); ?>">
                        </div>
                    </div>

                    <div class="form-field">
                        <span class="label"><?php esc_html_e( 'Tipo de consulta', 'drmejia' ); ?> <span class="required">*</span></span>
                        <select name="reason" required>
                            <option value="general"><?php esc_html_e( 'Consulta pediátrica general', 'drmejia' ); ?></option>
                            <option value="control"><?php esc_html_e( 'Control de niño sano', 'drmejia' ); ?></option>
                            <option value="genetic"><?php esc_html_e( 'Asesoría genética', 'drmejia' ); ?></option>
                            <option value="karyotype"><?php esc_html_e( 'Estudio de cariotipo / tamizaje', 'drmejia' ); ?></option>
                            <option value="second"><?php esc_html_e( 'Segunda opinión', 'drmejia' ); ?></option>
                            <option value="other"><?php esc_html_e( 'Otro motivo', 'drmejia' ); ?></option>
                        </select>
                    </div>

                    <div class="form-field">
                        <span class="label"><?php esc_html_e( 'Notas adicionales (opcional)', 'drmejia' ); ?></span>
                        <textarea name="notes" rows="4" placeholder="<?php esc_attr_e( 'Cuéntenos brevemente el motivo...', 'drmejia' ); ?>"></textarea>
                    </div>

                    <div class="form-bottom">
                        <p class="meta"><?php esc_html_e( 'Al enviar, acepta nuestra política de privacidad médica.', 'drmejia' ); ?></p>
                        <button type="submit" class="btn btn-primary">
                            <?php esc_html_e( 'Enviar solicitud', 'drmejia' ); ?>
                            <?php echo drmejia_icon( 'arrow-right', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                        </button>
                    </div>
                </form>
            </div>

            <div class="contact-info-stack">
                <div class="card contact-card-green">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <?php echo drmejia_icon( 'whatsapp', 28 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                        <h3 class="h4">WhatsApp</h3>
                    </div>
                    <p style="font-size: 14px; margin-bottom: 16px;">
                        <?php esc_html_e( 'La forma más rápida de comunicarse. Atendemos de lunes a viernes en horario de consulta.', 'drmejia' ); ?>
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
                    <div class="meta" style="font-size: 12px; margin-bottom: 4px;"><?php esc_html_e( 'Lunes a Viernes', 'drmejia' ); ?></div>
                    <div style="font-size: 14px; font-weight: 600;">11:30 AM – 5:00 PM</div>
                </div>

                <div class="placeholder-block" style="aspect-ratio: 16 / 9; border-radius: var(--r-lg);">
                    <span class="placeholder-tag"><?php esc_html_e( 'mapa · ubicación de la clínica', 'drmejia' ); ?></span>
                </div>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>
