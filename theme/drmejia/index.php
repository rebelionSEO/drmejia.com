<?php
/**
 * Fallback template — used when no other template matches.
 * Renders blog index when on home, otherwise generic loop.
 *
 * @package DrMejia
 */

get_header();
?>

<section class="section">
    <div class="container">
        <?php if ( have_posts() ) : ?>
            <?php while ( have_posts() ) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                    <div class="meta"><?php echo esc_html( get_the_date() ); ?></div>
                    <div class="body"><?php the_excerpt(); ?></div>
                </article>
            <?php endwhile; ?>

            <div style="margin-top: var(--s-7);">
                <?php the_posts_pagination(); ?>
            </div>
        <?php else : ?>
            <p class="body"><?php esc_html_e( 'Aún no hay contenido publicado.', 'drmejia' ); ?></p>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
