<?php
/**
 * Dr. Mejía Theme Functions
 *
 * @package DrMejia
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Theme constants — single source of truth for clinic info.
 * Phones are placeholders until confirmed. Empty WhatsApp → contact page.
 */
if ( ! defined( 'DRMEJIA_WHATSAPP' ) ) {
    define( 'DRMEJIA_WHATSAPP', '' ); // e.g. '505XXXXXXXX' when confirmed
}
if ( ! defined( 'DRMEJIA_PHONE_DISPLAY' ) ) {
    define( 'DRMEJIA_PHONE_DISPLAY', 'WhatsApp · por confirmar' );
}
if ( ! defined( 'DRMEJIA_PHONE_CLINIC_DISPLAY' ) ) {
    define( 'DRMEJIA_PHONE_CLINIC_DISPLAY', 'Citas · por confirmar' );
}
if ( ! defined( 'DRMEJIA_EMAIL' ) ) {
    define( 'DRMEJIA_EMAIL', '' ); // destination email TBD
}

/**
 * Theme setup
 */
function drmejia_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );
    add_theme_support( 'custom-logo', array(
        'height'      => 40,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ) );
    add_theme_support( 'editor-styles' );

    register_nav_menus( array(
        'primary' => __( 'Menú principal', 'drmejia' ),
        'footer'  => __( 'Menú del pie', 'drmejia' ),
    ) );

    set_post_thumbnail_size( 1200, 675, true );

    load_theme_textdomain( 'drmejia', get_template_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'drmejia_setup' );

/**
 * Enqueue styles and scripts
 */
function drmejia_enqueue_assets() {
    // Plus Jakarta Sans
    wp_enqueue_style(
        'drmejia-google-fonts',
        'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
        array(),
        null
    );

    // Theme stylesheet
    wp_enqueue_style(
        'drmejia-style',
        get_stylesheet_uri(),
        array( 'drmejia-google-fonts' ),
        wp_get_theme()->get( 'Version' )
    );

    // Main JS (mobile nav toggle, smooth-scroll, etc.)
    if ( file_exists( get_template_directory() . '/assets/js/main.js' ) ) {
        wp_enqueue_script(
            'drmejia-main',
            get_template_directory_uri() . '/assets/js/main.js',
            array(),
            wp_get_theme()->get( 'Version' ),
            true
        );
    }
}
add_action( 'wp_enqueue_scripts', 'drmejia_enqueue_assets' );

/**
 * Preconnect to fonts.googleapis.com / fonts.gstatic.com for LCP.
 */
function drmejia_resource_hints( $urls, $relation_type ) {
    if ( 'preconnect' === $relation_type ) {
        $urls[] = array( 'href' => 'https://fonts.googleapis.com', 'crossorigin' );
        $urls[] = array( 'href' => 'https://fonts.gstatic.com', 'crossorigin' );
    }
    return $urls;
}
add_filter( 'wp_resource_hints', 'drmejia_resource_hints', 10, 2 );

/**
 * WhatsApp link helper. Falls back to contact page while number is TBD.
 */
function drmejia_whatsapp_url( $message = '' ) {
    if ( ! DRMEJIA_WHATSAPP ) {
        return home_url( '/contacto/' );
    }
    $url = 'https://wa.me/' . DRMEJIA_WHATSAPP;
    if ( $message ) {
        $url .= '?text=' . rawurlencode( $message );
    }
    return $url;
}

/**
 * Inline SVG icon renderer (Lucide-style minimal set).
 * Avoids extra HTTP requests / icon font dependency.
 */
function drmejia_icon( $name, $size = 16 ) {
    $icons = array(
        'award'       => '<path d="M12 15a6 6 0 100-12 6 6 0 000 12z"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>',
        'shield'      => '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
        'arrow-right' => '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
        'stethoscope' => '<path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 00-2 2v4a6 6 0 0012 0V5a2 2 0 00-2-2h-1"/><path d="M8 15a6 6 0 006 6 6 6 0 006-6v-2"/><circle cx="20" cy="10" r="2"/>',
        'dna'         => '<path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="M17 6h.01"/><path d="M12 5h.01"/><path d="M19 9h.01"/><path d="M5 13h.01"/><path d="M7 17h.01"/><path d="M12 19h.01"/>',
        'baby'        => '<path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 011.8 3.9 2 2 0 010 3.6 9 9 0 01-17.6 0 2 2 0 010-3.6A9 9 0 0112 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/>',
        'heart'       => '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
        'menu'        => '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
        'whatsapp'    => '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.026 2.013c-5.509 0-9.96 4.45-9.96 9.96 0 1.748.456 3.45 1.32 4.95l-1.4 5.117 5.235-1.376c1.444.789 3.07 1.205 4.715 1.205h.005c5.51 0 9.96-4.45 9.96-9.96 0-2.66-1.034-5.16-2.913-7.04-1.879-1.879-4.378-2.86-7.039-2.856z" fill="currentColor"/>',
        'pin'         => '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
        'clock'       => '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        'phone'       => '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>',
        'video'       => '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4z"/>',
        'close'       => '<path d="M18 6L6 18M6 6l12 12"/>',
    );
    $path = isset( $icons[ $name ] ) ? $icons[ $name ] : '';
    if ( ! $path ) {
        return '';
    }
    $stroke_attrs = ( 'whatsapp' === $name ) ? '' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    return sprintf(
        '<svg xmlns="http://www.w3.org/2000/svg" width="%1$d" height="%1$d" viewBox="0 0 24 24" %2$s aria-hidden="true">%3$s</svg>',
        intval( $size ),
        $stroke_attrs,
        $path
    );
}
