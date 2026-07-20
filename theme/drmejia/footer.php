</main><!-- #main-content -->

<footer class="site-footer" role="contentinfo">
    <div class="container">
        <div class="footer-grid">
            <div>
                <div class="site-logo" style="color: #FFF; margin-bottom: 12px;">
                    <span class="monogram" aria-hidden="true">GM</span>
                    <span>Dr. Gerardo Mejía</span>
                </div>
                <p style="font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.7); max-width: 320px;">
                    <?php esc_html_e( 'Pediatría y genética clínica. Atención integral para familias en Nicaragua.', 'drmejia' ); ?>
                </p>
            </div>

            <div>
                <h4><?php esc_html_e( 'Servicios', 'drmejia' ); ?></h4>
                <ul>
                    <li><a href="<?php echo esc_url( home_url( '/servicios/consulta-pediatrica/' ) ); ?>"><?php esc_html_e( 'Consulta pediátrica', 'drmejia' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/servicios/asesoria-genetica/' ) ); ?>"><?php esc_html_e( 'Asesoría genética', 'drmejia' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/tamizaje/' ) ); ?>"><?php esc_html_e( 'Tamizaje neonatal', 'drmejia' ); ?></a></li>
                </ul>
            </div>

            <div>
                <h4><?php esc_html_e( 'Información', 'drmejia' ); ?></h4>
                <ul>
                    <li><a href="<?php echo esc_url( home_url( '/sobre/' ) ); ?>"><?php esc_html_e( 'Sobre el Dr. Mejía', 'drmejia' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/profesionales/' ) ); ?>"><?php esc_html_e( 'Para profesionales', 'drmejia' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/faq/' ) ); ?>"><?php esc_html_e( 'Preguntas frecuentes', 'drmejia' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>"><?php esc_html_e( 'Blog', 'drmejia' ); ?></a></li>
                </ul>
            </div>

            <div>
                <h4><?php esc_html_e( 'Contacto', 'drmejia' ); ?></h4>
                <ul>
                    <li><a href="<?php echo esc_url( drmejia_whatsapp_url() ); ?>" rel="noopener" target="_blank"><?php echo esc_html( DRMEJIA_PHONE_DISPLAY ); ?></a></li>
                    <li><a href="mailto:<?php echo esc_attr( DRMEJIA_EMAIL ); ?>"><?php echo esc_html( DRMEJIA_EMAIL ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/contacto/' ) ); ?>"><?php esc_html_e( 'Agendar cita', 'drmejia' ); ?></a></li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <div>&copy; <?php echo esc_html( date( 'Y' ) ); ?> Dr. Gerardo Mejía. <?php esc_html_e( 'Todos los derechos reservados.', 'drmejia' ); ?></div>
            <div>
                <a href="<?php echo esc_url( home_url( '/legal/' ) ); ?>"><?php esc_html_e( 'Privacidad y términos', 'drmejia' ); ?></a>
            </div>
        </div>
    </div>
</footer>

<a href="<?php echo esc_url( drmejia_whatsapp_url( __( 'Hola, quisiera información sobre una consulta.', 'drmejia' ) ) ); ?>"
   class="whatsapp-float"
   rel="noopener"
   target="_blank"
   aria-label="<?php esc_attr_e( 'Escribir por WhatsApp', 'drmejia' ); ?>">
    <?php echo drmejia_icon( 'whatsapp', 28 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
</a>

<?php wp_footer(); ?>
</body>
</html>
