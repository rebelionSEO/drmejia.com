<?php
/**
 * 404 template
 *
 * @package DrMejia
 */

get_header();
?>

<section class="error-404">
    <div class="container">
        <h1>404</h1>
        <p class="lede" style="max-width: 520px; margin: 0 auto var(--s-6);">
            <?php esc_html_e( 'La página que busca no existe o fue movida.', 'drmejia' ); ?>
        </p>
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary">
            <?php esc_html_e( 'Volver al inicio', 'drmejia' ); ?>
        </a>
    </div>
</section>

<?php get_footer(); ?>
