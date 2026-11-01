<?php
/**
 * Front Page — Homepage for Dr. Mejía
 *
 * Sections (mirrors _handoff/reference/home-sections.jsx):
 *  01 Hero
 *  02 Recognition strip
 *  03 Services grid
 *  04 Karyotype teaser
 *  05 How-it-works (3 steps)
 *  06 Bio teaser
 *  07 FAQ
 *  08 Featured posts
 *  09 Final CTA
 *
 * @package DrMejia
 */

get_header();
?>

<!-- ============================================================
     01 · HERO
     ============================================================ -->
<section class="hero" data-screen-label="01 Hero">
    <!-- Particle DNA, drawn by assets/js/dna-scenes.js -->
    <canvas class="hero-dna dna-scene" data-scene="hero" aria-hidden="true"></canvas>
    <div class="container">
        <div class="hero-grid">
            <div>
                <span class="chip" style="margin-bottom: 24px;">
                    <?php echo drmejia_icon( 'award', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                    <?php esc_html_e( 'Primer médico genetista de Nicaragua', 'drmejia' ); ?>
                </span>

                <h1>
                    <?php
                    printf(
                        /* translators: %s = highlighted phrase */
                        esc_html__( 'Comprender lo genético, con %s', 'drmejia' ),
                        '<span class="accent">' . esc_html__( 'claridad y experiencia.', 'drmejia' ) . '</span>'
                    );
                    ?>
                </h1>

                <p class="lede">
                    <?php esc_html_e( 'El Dr. Gerardo Mejía Baltodano —primer médico genetista de Nicaragua— explica con calma y acompaña a familias, adultos, embarazadas y parejas en consultas de genética y estudios.', 'drmejia' ); ?>
                </p>

                <div class="hero-ctas">
                    <a href="<?php echo esc_url( home_url( '/contacto/' ) ); ?>" class="btn btn-primary">
                        <?php esc_html_e( 'Agendar cita', 'drmejia' ); ?>
                        <?php echo drmejia_icon( 'arrow-right', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                    </a>
                    <a href="<?php echo esc_url( drmejia_whatsapp_url( __( 'Hola, quisiera información sobre una consulta.', 'drmejia' ) ) ); ?>"
                       class="btn btn-ghost"
                       rel="noopener"
                       target="_blank">
                        <span style="color: var(--green); display: inline-flex;"><?php echo drmejia_icon( 'whatsapp', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
                        <?php esc_html_e( 'Escribir por WhatsApp', 'drmejia' ); ?>
                    </a>
                </div>

                <div class="hero-stats">
                    <div>
                        <div class="stat-num">40</div>
                        <div class="stat-label"><?php esc_html_e( 'años como médico', 'drmejia' ); ?></div>
                    </div>
                    <div>
                        <div class="stat-num">34</div>
                        <div class="stat-label"><?php esc_html_e( 'años como pediatra', 'drmejia' ); ?></div>
                    </div>
                    <div>
                        <div class="stat-num">29</div>
                        <div class="stat-label"><?php esc_html_e( 'años en genética', 'drmejia' ); ?></div>
                    </div>
                </div>
            </div>

            <div class="hero-portrait-wrap">
                <!-- Where the DNA sits; the particles themselves are drawn on .hero-dna -->
                <div class="hero-visual" aria-hidden="true"></div>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     02 · RECOGNITION STRIP
     ============================================================ -->
<section class="recognition-strip" data-screen-label="02 Recognition">
    <div class="container">
        <div class="label"><?php esc_html_e( 'Trayectoria reconocida en', 'drmejia' ); ?></div>
        <div class="recognition-items">
            <div><?php esc_html_e( 'Ex-Director · Hospital Manuel de Jesús Rivera', 'drmejia' ); ?></div>
            <div><?php esc_html_e( 'Academia Nicaragüense de Ciencias Médicas', 'drmejia' ); ?></div>
            <div><?php esc_html_e( 'Sociedad Nicaragüense de Pediatría', 'drmejia' ); ?></div>
            <div><?php esc_html_e( 'Red Latinoamericana de Genética Humana (RELAGH)', 'drmejia' ); ?></div>
            <div><?php esc_html_e( 'Colegio Médico de Nicaragua', 'drmejia' ); ?></div>
        </div>
    </div>
</section>

<!-- ============================================================
     03 · SERVICES GRID
     ============================================================ -->
<section class="section" data-screen-label="03 Services">
    <div class="container">
        <div class="section-header-center">
            <span class="eyebrow"><?php esc_html_e( 'Servicios', 'drmejia' ); ?></span>
            <h2><?php esc_html_e( 'Genética primero, con pediatría cuando su hijo lo necesita', 'drmejia' ); ?></h2>
            <p class="lede"><?php esc_html_e( 'Tres servicios prioritarios, más la consulta pediátrica.', 'drmejia' ); ?></p>
        </div>

        <?php
        $services = array(
            array(
                'icon'     => 'dna',
                'title'    => __( 'Consulta de genética', 'drmejia' ),
                'desc'     => __( 'Historia clínica, examen físico y árbol familiar. Primera consulta: 1 hora. Niños, adultos, embarazadas y parejas.', 'drmejia' ),
                'href'     => home_url( '/servicios/asesoria-genetica/' ),
                'featured' => true,
            ),
            array(
                'icon'     => 'baby',
                'title'    => __( 'Tamizaje neonatal', 'drmejia' ),
                'desc'     => __( 'Prueba del talón para detectar riesgo de enfermedades metabólicas. Ideal entre las 48 y 72 horas de vida.', 'drmejia' ),
                'href'     => home_url( '/tamizaje/' ),
                'featured' => false,
            ),
            array(
                'icon'     => 'heart',
                'title'    => __( 'ADN fetal (NIPT)', 'drmejia' ),
                'desc'     => __( 'Tamizaje prenatal no invasivo de cromosomopatías en sangre materna, según indicación clínica.', 'drmejia' ),
                'href'     => home_url( '/adn-fetal/' ),
                'featured' => false,
            ),
            array(
                'icon'     => 'stethoscope',
                'title'    => __( 'Pediatría y vacunas', 'drmejia' ),
                'desc'     => __( 'Consultas pediátricas, seguimiento del crecimiento y desarrollo, y aplicación de vacunas.', 'drmejia' ),
                'href'     => home_url( '/servicios/consulta-pediatrica/' ),
                'featured' => false,
            ),
        );
        ?>
        <div class="services-grid">
            <?php foreach ( $services as $s ) : ?>
                <a href="<?php echo esc_url( $s['href'] ); ?>" class="card<?php echo $s['featured'] ? ' card-blue' : ''; ?>" style="display:block;">
                    <span class="icon-circle"><?php echo drmejia_icon( $s['icon'], 22 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
                    <h3 class="h4"><?php echo esc_html( $s['title'] ); ?></h3>
                    <p class="body"><?php echo esc_html( $s['desc'] ); ?></p>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ============================================================
     04 · KARYOTYPE TEASER
     ============================================================ -->
<section class="section" style="background: var(--bg-soft);" data-screen-label="04 Karyotype">
    <div class="container">
        <div class="split-grid">
            <div class="placeholder-block mint" role="img" aria-label="<?php esc_attr_e( 'Huella de un recién nacido con los costados del talón marcados: ahí se toma la muestra de la prueba del talón.', 'drmejia' ); ?>">
                <!-- Newborn footprint with the heel-prick sites, drawn by assets/js/dna-scenes.js -->
                <canvas class="dna-scene" data-scene="footprint" aria-hidden="true"></canvas>
                <span class="placeholder-tag"><?php esc_html_e( 'prueba del talón · recién nacido', 'drmejia' ); ?></span>
            </div>
            <div>
                <span class="eyebrow" style="margin-bottom: 20px; display: inline-flex;"><?php esc_html_e( 'Estudio preventivo', 'drmejia' ); ?></span>
                <h2 style="margin-top: 0; margin-bottom: 20px;"><?php esc_html_e( 'Tamizaje Metabólico Neonatal', 'drmejia' ); ?></h2>
                <p class="lede" style="margin-bottom: 24px;">
                    <?php esc_html_e( 'La prueba del talón: una muestra pequeña de sangre que detecta enfermedades metabólicas tratables antes de que aparezcan los síntomas.', 'drmejia' ); ?>
                </p>
                <ul class="check-list" style="margin-bottom: 32px;">
                    <li><?php esc_html_e( 'Detecta riesgo de enfermedades metabólicas y endocrinas tratables', 'drmejia' ); ?></li>
                    <li><?php esc_html_e( 'Procedimiento simple: una toma de sangre del talón del bebé', 'drmejia' ); ?></li>
                    <li><?php esc_html_e( 'Ideal entre las 48 y 72 horas de vida; resultados en 10 a 14 días', 'drmejia' ); ?></li>
                    <li><?php esc_html_e( 'Acompañamiento médico durante todo el proceso', 'drmejia' ); ?></li>
                </ul>
                <a href="<?php echo esc_url( home_url( '/tamizaje/' ) ); ?>" class="btn btn-primary">
                    <?php esc_html_e( 'Conocer el estudio', 'drmejia' ); ?>
                    <?php echo drmejia_icon( 'arrow-right', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     05 · HOW IT WORKS (3 steps)
     ============================================================ -->
<section class="section" data-screen-label="05 Process">
    <div class="container">
        <div class="section-header-center">
            <span class="eyebrow"><?php esc_html_e( 'Cómo funciona', 'drmejia' ); ?></span>
            <h2><?php esc_html_e( 'Tres pasos simples para recibir atención', 'drmejia' ); ?></h2>
            <p class="lede"><?php esc_html_e( 'Sin esperas innecesarias. Le acompañamos desde el primer mensaje.', 'drmejia' ); ?></p>
        </div>

        <?php
        $steps = array(
            array( 'n' => '1', 'title' => __( 'Solicite su cita', 'drmejia' ),    'desc' => __( 'Por WhatsApp, formulario o llamada.', 'drmejia' ) ),
            array( 'n' => '2', 'title' => __( 'Consulta inicial', 'drmejia' ),    'desc' => __( 'Evaluación completa del paciente y conversación con los padres.', 'drmejia' ) ),
            array( 'n' => '3', 'title' => __( 'Siguientes pasos', 'drmejia' ), 'desc' => __( 'Explicamos lo que sí y no sabemos, y si aplica, estudios o seguimiento. No prometemos un diagnóstico en una sola consulta.', 'drmejia' ) ),
        );
        ?>
        <div class="process-grid">
            <?php foreach ( $steps as $step ) : ?>
                <div class="card">
                    <div class="num-circle"><?php echo esc_html( $step['n'] ); ?></div>
                    <h3 class="h4"><?php echo esc_html( $step['title'] ); ?></h3>
                    <p class="body"><?php echo esc_html( $step['desc'] ); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ============================================================
     06 · BIO TEASER
     ============================================================ -->
<style id="home-bio-portrait-style">
    .home-bio-section { background: radial-gradient(ellipse 38% 68% at 26% 58%, rgba(181, 211, 188, .27), transparent 76%), var(--bg-blue); }
    .home-bio-portrait { position: relative; min-height: clamp(360px, 40vw, 540px); margin: 0; overflow: hidden; isolation: isolate; }
    .home-bio-portrait::before { content: ""; position: absolute; z-index: 0; left: 4%; bottom: -5%; width: 92%; height: 94%; border-radius: 50%; background: radial-gradient(circle at 44% 31%, rgba(255, 255, 255, .8), transparent 48%), linear-gradient(150deg, #e0ede3, #c5decb); box-shadow: inset 0 0 0 1px rgba(31, 83, 58, .06), 0 18px 50px rgba(31, 83, 58, .09); }
    .home-bio-portrait::after { content: ""; position: absolute; z-index: 1; left: -2%; bottom: -12%; width: 104%; height: 103%; border: 1px solid rgba(48, 104, 75, .18); border-radius: 50%; }
    .home-bio-portrait__image { position: absolute; z-index: 2; bottom: 0; left: 50%; display: block; width: min(82%, 455px); height: auto; max-width: none; transform: translateX(-50%); filter: drop-shadow(0 15px 16px rgba(24, 64, 53, .17)); }
    @media (max-width: 900px) {
        .home-bio-portrait { min-height: clamp(330px, 100vw, 500px); }
        .home-bio-portrait__image { width: min(82%, 365px); }
    }
</style>
<section class="section home-bio-section" data-screen-label="06 Bio">
    <div class="container">
        <div class="split-grid">
            <figure class="home-bio-portrait">
                <?php echo wp_get_attachment_image( 92, 'full', false, array( 'class' => 'home-bio-portrait__image', 'alt' => __( 'Dr. Gerardo Mejía Baltodano, pediatra y genetista', 'drmejia' ), 'loading' => 'lazy', 'decoding' => 'async' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
            </figure>
            <div>
                <span class="eyebrow" style="margin-bottom: 20px; display: inline-flex;"><?php esc_html_e( 'Sobre el doctor', 'drmejia' ); ?></span>
                <h2 style="margin-top: 0; margin-bottom: 24px;"><?php esc_html_e( 'Una vida dedicada a la niñez nicaragüense', 'drmejia' ); ?></h2>
                <p class="lede" style="margin-bottom: 20px;">
                    <?php esc_html_e( 'Médico pediatra y genetista. Director del Hospital Infantil Manuel de Jesús Rivera entre 2006 y 2013. Sus líneas de investigación son genética clínica y anomalías congénitas, con docencia activa en el país y la región.', 'drmejia' ); ?>
                </p>
                <p class="body" style="margin-bottom: 32px;">
                    <?php esc_html_e( 'Como ex-director del Hospital Infantil Manuel de Jesús Rivera, ha formado a generaciones de pediatras y publicado investigaciones que han marcado el campo en Centroamérica.', 'drmejia' ); ?>
                </p>

                <div class="bio-credentials">
                    <div>
                        <div class="meta"><?php esc_html_e( 'Formación', 'drmejia' ); ?></div>
                        <div class="value">UNAN-Managua</div>
                    </div>
                    <div>
                        <div class="meta"><?php esc_html_e( 'Pediatría', 'drmejia' ); ?></div>
                        <div class="value"><?php esc_html_e( 'UNAN · Hospital Manuel de Jesús Rivera', 'drmejia' ); ?></div>
                    </div>
                    <div>
                        <div class="meta"><?php esc_html_e( 'Maestría en Genética', 'drmejia' ); ?></div>
                        <div class="value">CIBO · IMSS, México</div>
                    </div>
                </div>

                <a href="<?php echo esc_url( home_url( '/sobre/' ) ); ?>" class="btn-link">
                    <?php esc_html_e( 'Ver trayectoria completa', 'drmejia' ); ?>
                    <?php echo drmejia_icon( 'arrow-right', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     07 · FAQ
     ============================================================ -->
<section class="section" style="background: var(--bg-soft);" data-screen-label="07 FAQ">
    <div class="container">
        <?php
        $faqs = array(
            array(
                'q' => __( '¿Atienden consultas virtuales?', 'drmejia' ),
                'a' => __( 'Sí. Ofrecemos teleconsulta para pacientes fuera de Managua y fuera de Nicaragua, segundas opiniones, asesoría genética y seguimiento de casos previamente evaluados. La cita se coordina por WhatsApp y se realiza por videollamada.', 'drmejia' ),
            ),
            array(
                'q' => __( '¿Cómo agendo una cita?', 'drmejia' ),
                'a' => __( 'Por WhatsApp al 8884-2159, llamando a la clínica o con el formulario de contacto. Las citas se confirman llamando a la clínica.', 'drmejia' ),
            ),
            array(
                'q' => __( '¿Cuál es el horario de atención?', 'drmejia' ),
                'a' => __( 'Lunes a viernes, 12:00 a 1:00 PM y 3:00 a 6:00 PM; sábados de 8:00 AM a 12:00 PM, en Clínica Perinatal, Managua.', 'drmejia' ),
            ),
            array(
                'q' => __( '¿Qué estudios genéticos realizan?', 'drmejia' ),
                'a' => __( 'Tamizaje metabólico neonatal, ADN fetal (NIPT), paneles (incluido cáncer hereditario), exoma, genoma y otros según la evaluación. Un estudio no siempre llega a un diagnóstico específico.', 'drmejia' ),
            ),
            array(
                'q' => __( '¿Atienden a pacientes adultos?', 'drmejia' ),
                'a' => __( 'Sí. En genética se atiende a cualquier edad: recién nacidos, niños, adolescentes, adultos, embarazadas y parejas. La consulta pediátrica general es para 0 a 18 años.', 'drmejia' ),
            ),
        );
        ?>
        <div class="faq-grid">
            <div class="faq-side">
                <span class="eyebrow" style="margin-bottom: 16px; display: inline-flex;"><?php esc_html_e( 'Preguntas frecuentes', 'drmejia' ); ?></span>
                <h2 style="margin-top: 0; margin-bottom: 16px;"><?php esc_html_e( 'Lo que nos preguntan a menudo', 'drmejia' ); ?></h2>
                <p class="body" style="margin-bottom: 24px;">
                    <?php esc_html_e( 'Si su pregunta no aparece aquí, escríbanos por WhatsApp y le respondemos directamente.', 'drmejia' ); ?>
                </p>
                <a href="<?php echo esc_url( home_url( '/faq/' ) ); ?>" class="btn-link">
                    <?php esc_html_e( 'Ver todas las preguntas', 'drmejia' ); ?>
                    <?php echo drmejia_icon( 'arrow-right', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                </a>
            </div>

            <div class="faq-list">
                <?php foreach ( $faqs as $i => $faq ) : ?>
                    <details class="card"<?php echo $i === 0 ? ' open' : ''; ?>>
                        <summary><?php echo esc_html( $faq['q'] ); ?></summary>
                        <p class="body"><?php echo esc_html( $faq['a'] ); ?></p>
                    </details>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     08 · FEATURED POSTS
     ============================================================ -->
<section class="section" data-screen-label="08 Blog">
    <div class="container">
        <div class="posts-header">
            <div>
                <span class="eyebrow" style="margin-bottom: 16px; display: inline-flex;"><?php esc_html_e( 'Publicaciones', 'drmejia' ); ?></span>
                <h2 style="margin: 0;"><?php esc_html_e( 'Lecturas para padres y colegas', 'drmejia' ); ?></h2>
            </div>
            <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="btn-link">
                <?php esc_html_e( 'Ver todas', 'drmejia' ); ?>
                <?php echo drmejia_icon( 'arrow-right', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
            </a>
        </div>

        <?php
        $featured_posts = new WP_Query( array(
            'post_type'      => 'post',
            'posts_per_page' => 3,
            'post_status'    => 'publish',
            'no_found_rows'  => true,
        ) );
        ?>

        <div class="posts-grid">
            <?php if ( $featured_posts->have_posts() ) : ?>
                <?php while ( $featured_posts->have_posts() ) : $featured_posts->the_post(); ?>
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
                <?php endwhile; wp_reset_postdata(); ?>
            <?php else : ?>
                <?php
                // Placeholder cards while no real posts exist yet.
                $placeholder_posts = array(
                    array( 'cat' => __( 'Genética', 'drmejia' ),     'title' => __( '¿Qué es un cariotipo y cuándo deben hacérselo a un recién nacido?', 'drmejia' ), 'date' => '12 Abr 2026', 'read' => __( '6 min', 'drmejia' ) ),
                    array( 'cat' => __( 'Pediatría', 'drmejia' ),    'title' => __( 'Vacunación en el primer año: el calendario que todo padre debe conocer', 'drmejia' ), 'date' => '28 Mar 2026', 'read' => __( '4 min', 'drmejia' ) ),
                    array( 'cat' => __( 'Investigación', 'drmejia' ),'title' => __( 'Síndrome de Down en Nicaragua: hallazgos de un estudio de 10 años', 'drmejia' ),  'date' => '14 Mar 2026', 'read' => __( '9 min', 'drmejia' ) ),
                );
                foreach ( $placeholder_posts as $p ) : ?>
                    <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="post-card">
                        <div class="post-cover"></div>
                        <div class="post-body">
                            <div class="post-meta">
                                <span class="chip" style="font-size: 12px; padding: 4px 10px;"><?php echo esc_html( $p['cat'] ); ?></span>
                                <span class="meta"><?php echo esc_html( $p['date'] . ' · ' . $p['read'] ); ?></span>
                            </div>
                            <h3><?php echo esc_html( $p['title'] ); ?></h3>
                        </div>
                    </a>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- ============================================================
     09 · FINAL CTA (brand-blue panel)
     ============================================================ -->
<section class="section home-cta-section" data-screen-label="09 CTA">
    <!-- The helix zips shut again, drawn by assets/js/dna-scenes.js -->
    <canvas class="dna-scene" data-scene="bookend" aria-hidden="true"></canvas>
    <div class="container">
        <div class="home-cta-grid">
            <div>
                <h2><?php esc_html_e( 'Estamos aquí cuando su familia nos necesite', 'drmejia' ); ?></h2>
                <p class="lede">
                    <?php echo esc_html( sprintf( __( 'Horario: %s. Para citas más rápidas, escríbanos por WhatsApp.', 'drmejia' ), DRMEJIA_HOURS ) ); ?>
                </p>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <a href="<?php echo esc_url( drmejia_whatsapp_url( __( 'Hola, quisiera agendar una consulta.', 'drmejia' ) ) ); ?>"
                       class="btn btn-whatsapp"
                       rel="noopener"
                       target="_blank">
                        <?php echo drmejia_icon( 'whatsapp', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                        <?php esc_html_e( 'Escribir por WhatsApp', 'drmejia' ); ?>
                    </a>
                    <a href="<?php echo esc_url( home_url( '/contacto/' ) ); ?>" class="btn btn-ghost">
                        <?php esc_html_e( 'Solicitar cita por formulario', 'drmejia' ); ?>
                    </a>
                </div>
            </div>

            <div class="home-cta-info">
                <div class="home-cta-row">
                    <?php echo drmejia_icon( 'pin', 22 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                    <div>
                        <div class="row-label"><?php esc_html_e( 'La clínica', 'drmejia' ); ?></div>
                        <div class="row-value">
                            <?php esc_html_e( 'Clínica Perinatal · De los semáforos del Monte de los Olivos', 'drmejia' ); ?><br>
                            <?php esc_html_e( '1c al lago, 1c al este y 20m al sur · Managua', 'drmejia' ); ?>
                        </div>
                    </div>
                </div>
                <div class="home-cta-row">
                    <?php echo drmejia_icon( 'clock', 22 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                    <div>
                        <div class="row-label"><?php esc_html_e( 'Horario', 'drmejia' ); ?></div>
                        <div class="row-value"><?php echo esc_html( DRMEJIA_HOURS ); ?></div>
                    </div>
                </div>
                <div class="home-cta-row">
                    <?php echo drmejia_icon( 'phone', 22 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                    <div>
                        <div class="row-label"><?php esc_html_e( 'Teléfono · WhatsApp', 'drmejia' ); ?></div>
                        <div class="row-value"><?php echo esc_html( DRMEJIA_PHONE_DISPLAY ); ?></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>
