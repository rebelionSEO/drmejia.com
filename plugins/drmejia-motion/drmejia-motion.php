<?php
/**
 * Plugin Name: Dr. Mejía Motion
 * Description: Motion for the inner pages: scroll reveals, mouse effects and each page's own animation. The theme is untouched; deactivate the plugin to return to the static pages.
 * Version: 1.0.1
 * Author: Dr. Gerardo Mejía
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'DRMEJIA_MOTION_VERSION', '1.0.1' );

/**
 * Enqueue the motion layer on the site's pages (not the homepage, which has its own motion in the
 * theme, and not the blog). Every file loads deferred in the footer, so none of it holds up the
 * first paint. Page-specific files are picked by the page slug and only load where they exist:
 * hero-<slug>.js (a particle scene, with scenes.js) and sig-<slug>.js (the page's signature).
 * Some pages share another page's hero: the dedicated Consulta genética page uses the family tree
 * that /servicios/ shows.
 */
function drmejia_motion_enqueue() {
	if ( is_admin() || is_front_page() || ! is_page() ) {
		return;
	}
	$slug  = sanitize_key( get_post_field( 'post_name', get_queried_object_id() ) );
	$heroes = array(
		'asesoria-genetica' => 'servicios',
	);
	$hero  = isset( $heroes[ $slug ] ) ? $heroes[ $slug ] : $slug;
	$url   = plugin_dir_url( __FILE__ ) . 'assets/';
	$path  = plugin_dir_path( __FILE__ ) . 'assets/';
	$v     = DRMEJIA_MOTION_VERSION;
	$defer = array(
		'in_footer' => true,
		'strategy'  => 'defer',
	);

	wp_enqueue_style( 'drmejia-motion', $url . 'motion.css', array(), $v );
	wp_enqueue_script( 'drmejia-motion', $url . 'motion.js', array(), $v, $defer );
	wp_enqueue_script( 'drmejia-motion-cursor', $url . 'cursor.js', array(), $v, $defer );

	if ( $hero && file_exists( $path . 'hero-' . $hero . '.js' ) ) {
		wp_enqueue_style( 'drmejia-motion-hero', $url . 'hero-shared.css', array(), $v );
		wp_enqueue_script( 'drmejia-motion-hero', $url . 'hero-' . $hero . '.js', array(), $v, $defer );
		wp_enqueue_script( 'drmejia-motion-scenes', $url . 'scenes.js', array(), $v, $defer );
	}
	if ( $slug && file_exists( $path . 'sig-' . $slug . '.js' ) ) {
		wp_enqueue_script( 'drmejia-motion-sig', $url . 'sig-' . $slug . '.js', array(), $v, $defer );
	}
}
add_action( 'wp_enqueue_scripts', 'drmejia_motion_enqueue', 20 );
