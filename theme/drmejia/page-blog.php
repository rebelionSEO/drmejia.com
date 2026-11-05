<?php
/**
 * Blog landing page — editorial listing of published posts.
 *
 * @package DrMejia
 */

get_header();

$blog_page = max( 1, (int) get_query_var( 'paged' ), (int) get_query_var( 'page' ) );
$blog_posts = new WP_Query( array(
    'post_type'           => 'post',
    'post_status'         => 'publish',
    'posts_per_page'      => 7,
    'paged'               => $blog_page,
    'ignore_sticky_posts' => false,
) );
?>

<style>
.blog-landing { background: radial-gradient(circle at 95% 5%, rgba(126,154,143,.11), transparent 27%), var(--bg-soft); }
.blog-landing .blog-intro { max-width: 790px; margin-bottom: 38px; }
.blog-landing .blog-intro .eyebrow { display: inline-flex; margin-bottom: 15px; }
.blog-landing .blog-intro h1 { margin: 0 0 16px; }
.blog-landing .blog-intro .lede { margin: 0; }
.blog-featured { display: grid; grid-template-columns: minmax(0, .94fr) minmax(0, 1.06fr); overflow: hidden; background: #fff; border: 1px solid var(--brand-soft); border-radius: var(--r-lg); box-shadow: var(--shadow-md); }
.blog-featured__image { position: relative; display: block; min-height: 420px; background: var(--brand-tint); }
.blog-featured__image img { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: cover; }
.blog-featured__body { display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: clamp(27px, 4vw, 56px); }
.blog-featured__meta { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
.blog-featured__meta .chip { font-size: 12px; padding: 7px 12px; }
.blog-featured__date { color: var(--ink-2); font-size: 14px; font-weight: 600; }
.blog-featured h2 { margin: 0 0 17px; font-size: clamp(27px, 2.9vw, 38px); line-height: 1.14; letter-spacing: -.035em; }
.blog-featured h2 a { color: var(--ink); text-decoration: none; }
.blog-featured h2 a:hover { color: var(--brand); }
.blog-featured__summary { margin: 0 0 23px; color: var(--ink-2); font-size: 16px; line-height: 1.7; }
.blog-featured__review { display: inline-flex; align-items: center; gap: 9px; margin-bottom: 25px; padding: 9px 13px; color: var(--brand-deep); background: var(--brand-tint); border: 1px solid var(--brand-soft); border-radius: var(--r-pill); font-size: 12px; font-weight: 700; line-height: 1.4; }
.blog-featured__review svg { flex: none; }
.blog-featured__link { display: inline-flex; align-items: center; gap: 9px; color: var(--brand); font-size: 15px; font-weight: 700; text-decoration: none; }
.blog-featured__link:hover { text-decoration: underline; text-underline-offset: 4px; }
.blog-featured__link:focus-visible, .blog-featured h2 a:focus-visible, .blog-featured__image:focus-visible { outline: 2px solid var(--brand); outline-offset: 3px; }
.blog-more { margin-top: 56px; }
.blog-more h2 { margin: 0 0 22px; font-size: clamp(23px, 2.5vw, 30px); }
.blog-more .posts-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.blog-more .post-card .post-body p { margin: 12px 0 0; color: var(--ink-2); font-size: 14px; line-height: 1.6; }
.blog-pagination { display: flex; justify-content: center; margin-top: 38px; }
.blog-pagination .page-numbers { display: inline-flex; align-items: center; justify-content: center; min-width: 38px; min-height: 38px; padding: 6px 10px; margin: 0 3px; border-radius: 10px; color: var(--brand); text-decoration: none; }
.blog-pagination .page-numbers.current { background: var(--brand); color: #fff; }
@media (max-width: 900px) {
    .blog-featured { grid-template-columns: 1fr; }
    .blog-featured__image { min-height: 0; aspect-ratio: 16 / 9; }
    .blog-more .posts-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 600px) {
    .blog-landing .blog-intro { margin-bottom: 24px; }
    .blog-featured__image { aspect-ratio: 4 / 3; }
    .blog-featured__body { padding: 24px; }
    .blog-featured__review { border-radius: 14px; }
    .blog-more { margin-top: 42px; }
    .blog-more .posts-grid { grid-template-columns: 1fr; }
}
</style>

<section class="section blog-landing" aria-label="<?php esc_attr_e( 'Artículos del blog', 'drmejia' ); ?>">
    <div class="container">
        <header class="blog-intro">
            <span class="eyebrow"><?php esc_html_e( 'Publicaciones', 'drmejia' ); ?></span>
            <h1><?php esc_html_e( 'Blog', 'drmejia' ); ?></h1>
            <p class="lede"><?php esc_html_e( 'Información sobre genética médica y pediatría para ayudar a las familias a comprender cada tema y preparar sus preguntas.', 'drmejia' ); ?></p>
        </header>

        <?php if ( $blog_posts->have_posts() ) : ?>
            <?php $blog_posts->the_post(); ?>
            <?php
            $blog_featured_id = get_the_ID();
            $blog_categories  = get_the_category();
            $blog_description = 56 === $blog_featured_id
                ? __( 'Conozca cómo se realiza el tamizaje metabólico neonatal, qué enfermedades detecta la prueba del talón y las opciones disponibles en Nicaragua.', 'drmejia' )
                : get_the_excerpt();
            ?>
            <article class="blog-featured">
                <a class="blog-featured__image" href="<?php the_permalink(); ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Leer %s', 'drmejia' ), get_the_title() ) ); ?>">
                    <?php if ( has_post_thumbnail() ) : the_post_thumbnail( 'large', array( 'loading' => 'eager', 'decoding' => 'async' ) ); endif; ?>
                </a>
                <div class="blog-featured__body">
                    <div class="blog-featured__meta">
                        <?php if ( ! empty( $blog_categories ) ) : ?><span class="chip"><?php echo esc_html( $blog_categories[0]->name ); ?></span><?php endif; ?>
                        <time class="blog-featured__date" datetime="<?php echo esc_attr( get_the_date( 'Y-m-d' ) ); ?>"><?php echo esc_html( sprintf( __( 'Publicado el %s', 'drmejia' ), get_the_date( 'j \d\e F \d\e Y' ) ) ); ?></time>
                    </div>
                    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                    <?php if ( $blog_description ) : ?><p class="blog-featured__summary"><?php echo esc_html( $blog_description ); ?></p><?php endif; ?>
                    <?php if ( 56 === $blog_featured_id ) : ?>
                        <span class="blog-featured__review">
                            <?php echo drmejia_icon( 'shield', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                            <?php esc_html_e( 'Revisado por el Dr. Gerardo Mejía', 'drmejia' ); ?>
                        </span>
                    <?php endif; ?>
                    <a class="blog-featured__link" href="<?php the_permalink(); ?>">
                        <?php esc_html_e( 'Leer artículo', 'drmejia' ); ?>
                        <?php echo drmejia_icon( 'arrow-right', 17 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                    </a>
                </div>
            </article>

            <?php if ( $blog_posts->have_posts() ) : ?>
                <section class="blog-more" aria-labelledby="blog-more-title">
                    <h2 id="blog-more-title"><?php esc_html_e( 'Más artículos', 'drmejia' ); ?></h2>
                    <div class="posts-grid">
                        <?php while ( $blog_posts->have_posts() ) : $blog_posts->the_post(); ?>
                            <a href="<?php the_permalink(); ?>" class="post-card">
                                <div class="post-cover">
                                    <?php if ( has_post_thumbnail() ) : the_post_thumbnail( 'medium_large', array( 'loading' => 'lazy', 'style' => 'width:100%;height:100%;object-fit:cover;' ) ); endif; ?>
                                </div>
                                <div class="post-body">
                                    <div class="post-meta">
                                        <?php $categories = get_the_category(); if ( ! empty( $categories ) ) : ?><span class="chip"><?php echo esc_html( $categories[0]->name ); ?></span><?php endif; ?>
                                        <span class="meta"><?php echo esc_html( get_the_date( 'j \d\e F \d\e Y' ) ); ?></span>
                                    </div>
                                    <h3><?php the_title(); ?></h3>
                                    <?php if ( has_excerpt() ) : ?><p><?php echo esc_html( get_the_excerpt() ); ?></p><?php endif; ?>
                                </div>
                            </a>
                        <?php endwhile; ?>
                    </div>
                </section>
            <?php endif; ?>

            <?php if ( $blog_posts->max_num_pages > 1 ) : ?>
                <nav class="blog-pagination" aria-label="<?php esc_attr_e( 'Páginas del blog', 'drmejia' ); ?>">
                    <?php echo wp_kses_post( paginate_links( array( 'total' => $blog_posts->max_num_pages, 'current' => $blog_page, 'prev_text' => '←', 'next_text' => '→' ) ) ); ?>
                </nav>
            <?php endif; ?>
        <?php else : ?>
            <p class="body"><?php esc_html_e( 'Aún no hay artículos publicados.', 'drmejia' ); ?></p>
        <?php endif; wp_reset_postdata(); ?>
    </div>
</section>

<?php get_footer(); ?>
