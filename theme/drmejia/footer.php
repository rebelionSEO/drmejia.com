</main><!-- #main-content -->

<footer class="site-footer" role="contentinfo">
    <div class="container">
        <div class="footer-grid">
            <div>
                <a class="footer-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php echo esc_attr( 'Inicio — ' . DRMEJIA_NAME ); ?>">
                    <img src="<?php echo esc_url( content_url( '/uploads/2026/10/GMB_logo_blanco_transparente_2000.png' ) ); ?>" width="2000" height="1143" alt="<?php echo esc_attr( DRMEJIA_NAME . ' — Genética médica y pediatría' ); ?>" loading="lazy" decoding="async">
                </a>
                <p style="font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.7); max-width: 320px;">
                    <?php esc_html_e( 'Genética médica y pediatría en Clínica Perinatal, Managua.', 'drmejia' ); ?>
                    <?php echo esc_html( DRMEJIA_HOURS ); ?>
                </p>
            </div>

            <div>
                <h4><?php esc_html_e( 'Servicios', 'drmejia' ); ?></h4>
                <ul>
                    <li><a href="<?php echo esc_url( home_url( '/servicios/asesoria-genetica/' ) ); ?>"><?php esc_html_e( 'Consulta genética', 'drmejia' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/tamizaje/' ) ); ?>"><?php esc_html_e( 'Tamizaje neonatal', 'drmejia' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/adn-fetal/' ) ); ?>"><?php esc_html_e( 'ADN fetal (NIPT)', 'drmejia' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/servicios/' ) ); ?>"><?php esc_html_e( 'Todos los servicios', 'drmejia' ); ?></a></li>
                </ul>
            </div>

            <div>
                <h4><?php esc_html_e( 'Información', 'drmejia' ); ?></h4>
                <ul>
                    <li><a href="<?php echo esc_url( home_url( '/sobre/' ) ); ?>"><?php esc_html_e( 'Sobre el Dr. Mejía', 'drmejia' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/medios/' ) ); ?>"><?php esc_html_e( 'Medios', 'drmejia' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/faq/' ) ); ?>"><?php esc_html_e( 'Preguntas frecuentes', 'drmejia' ); ?></a></li>
                    <li><a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>"><?php esc_html_e( 'Blog', 'drmejia' ); ?></a></li>
                </ul>
            </div>

            <div>
                <h4><?php esc_html_e( 'Contacto', 'drmejia' ); ?></h4>
                <ul>
                    <li><a href="<?php echo esc_url( drmejia_whatsapp_url() ); ?>" rel="noopener" target="_blank"><?php echo esc_html( DRMEJIA_PHONE_DISPLAY ); ?></a></li>
                    <li><?php echo esc_html( DRMEJIA_PHONE_CLINIC_DISPLAY ); ?></li>
                    <?php if ( DRMEJIA_EMAIL ) : ?>
                    <li><a href="mailto:<?php echo esc_attr( DRMEJIA_EMAIL ); ?>"><?php echo esc_html( DRMEJIA_EMAIL ); ?></a></li>
                    <?php endif; ?>
                    <li><a href="<?php echo esc_url( home_url( '/contacto/' ) ); ?>"><?php esc_html_e( 'Agendar cita', 'drmejia' ); ?></a></li>
                </ul>
            </div>
        </div>

        <p style="font-size: 12px; line-height: 1.55; color: rgba(255,255,255,0.55); max-width: 920px; margin: 0 0 24px;">
            <?php esc_html_e( 'Esta información es educativa y no sustituye una evaluación médica individual. No use este canal ante emergencias: acuda al servicio de urgencias más cercano.', 'drmejia' ); ?>
        </p>

        <div class="footer-bottom">
            <div>&copy; <?php echo esc_html( date( 'Y' ) ); ?> <?php echo esc_html( DRMEJIA_NAME ); ?>. <?php esc_html_e( 'Todos los derechos reservados.', 'drmejia' ); ?></div>
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
