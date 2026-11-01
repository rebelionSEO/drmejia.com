<?php
/**
 * Single blog post template
 *
 * @package DrMejia
 */

get_header();
?>

<section class="page-hero">
    <div class="container" style="max-width: 800px;">
        <?php if ( have_posts() ) : the_post(); ?>
            <?php
            $cats = get_the_category();
            if ( ! empty( $cats ) ) :
            ?>
                <a href="<?php echo esc_url( get_category_link( $cats[0]->term_id ) ); ?>" class="chip" style="margin-bottom: 24px;">
                    <?php echo esc_html( $cats[0]->name ); ?>
                </a>
            <?php endif; ?>

            <h1><?php the_title(); ?></h1>

            <div class="meta" style="display: flex; gap: 12px; margin-top: var(--s-5); flex-wrap: wrap;">
                <span><?php echo esc_html( get_the_date() ); ?></span>
            </div>
    </div>
</section>

<section class="section" style="padding-top: var(--s-7);">
    <div class="container" style="max-width: 760px;">

        <?php if ( has_post_thumbnail() ) : ?>
            <figure style="margin: 0 0 var(--s-7); border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--shadow-md);">
                <?php the_post_thumbnail( 'large', array( 'style' => 'width: 100%; height: auto;' ) ); ?>
            </figure>
        <?php endif; ?>

        <article class="post-content body" style="font-size: 17px;">
            <?php the_content(); ?>
        </article>

        <?php endif; ?>

        <hr style="border: 0; border-top: 1px solid var(--rule); margin: var(--s-8) 0;">

        <?php
        // Related posts: same category, exclude current
        if ( ! empty( $cats ) ) {
            $related = new WP_Query( array(
                'category__in'   => array( $cats[0]->term_id ),
                'post__not_in'   => array( get_the_ID() ),
                'posts_per_page' => 3,
                'orderby'        => 'date',
                'order'          => 'DESC',
                'no_found_rows'  => true,
            ) );

            if ( $related->have_posts() ) :
        ?>
            <h2 class="h3" style="margin-bottom: var(--s-5);"><?php esc_html_e( 'Lecturas relacionadas', 'drmejia' ); ?></h2>
            <div class="posts-grid">
                <?php while ( $related->have_posts() ) : $related->the_post(); ?>
                    <a href="<?php the_permalink(); ?>" class="post-card">
                        <div class="post-cover">
                            <?php if ( has_post_thumbnail() ) : the_post_thumbnail( 'medium', array( 'style' => 'width:100%;height:100%;object-fit:cover;' ) ); endif; ?>
                        </div>
                        <div class="post-body">
                            <h3><?php the_title(); ?></h3>
                        </div>
                    </a>
                <?php endwhile; wp_reset_postdata(); ?>
            </div>
        <?php
            endif;
        }
        ?>
    </div>
</section>

<?php get_footer(); ?>
