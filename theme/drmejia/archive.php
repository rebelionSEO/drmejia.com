<?php
/**
 * Archive — blog index, category, tag, date archives
 *
 * @package DrMejia
 */

get_header();
?>

<section class="page-hero">
    <div class="container">
        <span class="chip" style="margin-bottom: 24px;"><?php esc_html_e( 'Blog', 'drmejia' ); ?></span>
        <h1>
            <?php
            if ( is_category() ) {
                printf( esc_html__( 'Categoría: %s', 'drmejia' ), '<span class="accent">' . single_cat_title( '', false ) . '</span>' );
            } elseif ( is_tag() ) {
                printf( esc_html__( 'Etiqueta: %s', 'drmejia' ), '<span class="accent">' . single_tag_title( '', false ) . '</span>' );
            } elseif ( is_author() ) {
                printf( esc_html__( 'Autor: %s', 'drmejia' ), '<span class="accent">' . esc_html( get_the_author() ) . '</span>' );
            } else {
                esc_html_e( 'Lecturas para padres y colegas', 'drmejia' );
            }
            ?>
        </h1>
        <?php if ( category_description() || tag_description() ) : ?>
            <p class="lede"><?php echo wp_kses_post( category_description() . tag_description() ); ?></p>
        <?php endif; ?>
    </div>
</section>

<section class="section">
    <div class="container">
        <?php if ( have_posts() ) : ?>
            <div class="posts-grid">
                <?php while ( have_posts() ) : the_post(); ?>
                    <a href="<?php the_permalink(); ?>" class="post-card">
                        <div class="post-cover">
                            <?php if ( has_post_thumbnail() ) : the_post_thumbnail( 'medium_large', array( 'style' => 'width:100%;height:100%;object-fit:cover;' ) ); endif; ?>
                        </div>
                        <div class="post-body">
                            <div class="post-meta">
                                <?php
                                $cats = get_the_category();
                                if ( ! empty( $cats ) ) :
                                ?>
                                    <span class="chip" style="font-size: 12px; padding: 4px 10px;"><?php echo esc_html( $cats[0]->name ); ?></span>
                                <?php endif; ?>
                                <span class="meta"><?php echo esc_html( get_the_date() ); ?></span>
                            </div>
                            <h3><?php the_title(); ?></h3>
                        </div>
                    </a>
                <?php endwhile; ?>
            </div>

            <div style="margin-top: var(--s-8); display: flex; justify-content: center;">
                <?php the_posts_pagination( array(
                    'prev_text' => __( '← Anteriores', 'drmejia' ),
                    'next_text' => __( 'Siguientes →', 'drmejia' ),
                ) ); ?>
            </div>
        <?php else : ?>
            <p class="body" style="text-align: center;"><?php esc_html_e( 'Aún no hay publicaciones en esta sección.', 'drmejia' ); ?></p>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
