<?php
/**
 * Generic page template — used as fallback for any page without a custom template.
 *
 * @package DrMejia
 */

get_header();
?>

<section class="section">
    <div class="container" style="max-width: 800px;">
        <?php while ( have_posts() ) : the_post(); ?>
            <article <?php post_class(); ?>>
                <h1 style="margin-bottom: var(--s-5);"><?php the_title(); ?></h1>
                <div class="body">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</section>

<?php get_footer(); ?>
