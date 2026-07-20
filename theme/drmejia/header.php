<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link" href="#main-content"><?php esc_html_e( 'Saltar al contenido', 'drmejia' ); ?></a>

<header class="site-header" role="banner">
    <div class="container">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo" aria-label="<?php esc_attr_e( 'Inicio — Dr. Gerardo Mejía', 'drmejia' ); ?>">
            <span class="monogram" aria-hidden="true">GM</span>
            <span>Dr. Gerardo Mejía</span>
        </a>

        <nav class="site-nav" role="navigation" aria-label="<?php esc_attr_e( 'Navegación principal', 'drmejia' ); ?>">
            <?php
            wp_nav_menu( array(
                'theme_location' => 'primary',
                'container'      => false,
                'menu_class'     => 'nav-links',
                'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                'fallback_cb'    => 'drmejia_default_nav',
                'depth'          => 1,
            ) );
            ?>
        </nav>

        <div class="nav-actions">
            <a href="<?php echo esc_url( home_url( '/contacto/' ) ); ?>" class="btn btn-primary"><?php esc_html_e( 'Agendar cita', 'drmejia' ); ?></a>
            <button class="nav-toggle" type="button" aria-label="<?php esc_attr_e( 'Abrir menú', 'drmejia' ); ?>" aria-expanded="false">
                <?php echo drmejia_icon( 'menu', 22 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
            </button>
        </div>
    </div>
</header>

<main id="main-content">
<?php

/**
 * Fallback nav when no menu is assigned (so the page doesn't render empty before user creates a menu).
 */
function drmejia_default_nav() {
    $items = array(
        '/'              => __( 'Inicio', 'drmejia' ),
        '/sobre/'        => __( 'Sobre', 'drmejia' ),
        '/tamizaje/'     => __( 'Tamizaje', 'drmejia' ),
        '/servicios/'    => __( 'Servicios', 'drmejia' ),
        '/blog/'         => __( 'Blog', 'drmejia' ),
        '/contacto/'     => __( 'Contacto', 'drmejia' ),
    );
    echo '<ul class="nav-links">';
    foreach ( $items as $path => $label ) {
        printf( '<li><a href="%s">%s</a></li>', esc_url( home_url( $path ) ), esc_html( $label ) );
    }
    echo '</ul>';
}
