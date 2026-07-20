<?php
/**
 * Template Name: Sobre el Dr. Mejía
 *
 * Mirrors _handoff/reference/about-page.jsx (AboutHero, AboutTimeline, AboutPublications, AboutPhilosophy)
 *
 * @package DrMejia
 */

get_header();
?>

<!-- ============================================================
     01 · ABOUT HERO
     ============================================================ -->
<section class="page-hero">
    <div class="container">
        <span class="chip" style="margin-bottom: 24px;">
            <?php echo drmejia_icon( 'award', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
            <?php esc_html_e( 'Sobre el Dr. Mejía', 'drmejia' ); ?>
        </span>
        <h1>
            <?php
            printf(
                /* translators: %1$s, %2$s = highlighted brand-colored words */
                esc_html__( 'Una vida dedicada a la %1$s y a la %2$s de Nicaragua', 'drmejia' ),
                '<span class="accent">' . esc_html__( 'pediatría', 'drmejia' ) . '</span>',
                '<span class="accent">' . esc_html__( 'genética', 'drmejia' ) . '</span>'
            );
            ?>
        </h1>

        <div class="split-grid" style="margin-top: 32px;">
            <div class="placeholder-block">
                <span class="placeholder-tag"><?php esc_html_e( 'retrato editorial · clínica', 'drmejia' ); ?></span>
            </div>
            <div>
                <p class="lede" style="margin-bottom: 20px;">
                    <?php esc_html_e( 'El Dr. Gerardo Mejía es pediatra y el primer médico genetista en la historia de Nicaragua. Durante más de tres décadas ha combinado la práctica clínica con la investigación, la docencia y el servicio público.', 'drmejia' ); ?>
                </p>
                <p class="body" style="margin-bottom: 20px;">
                    <?php esc_html_e( 'Su trabajo siempre ha tenido un objetivo: que cada niño nicaragüense pueda crecer con un diagnóstico oportuno y una atención digna.', 'drmejia' ); ?>
                </p>
                <p class="body">
                    <?php esc_html_e( 'Como ex-director del Hospital Infantil Manuel de Jesús Rivera —el principal hospital pediátrico público del país— formó a generaciones de pediatras y consolidó programas de tamizaje genético.', 'drmejia' ); ?>
                </p>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     02 · TIMELINE
     ============================================================ -->
<section class="section" style="background: var(--bg-soft);">
    <div class="container">
        <div class="section-header-center">
            <span class="eyebrow"><?php esc_html_e( 'Trayectoria', 'drmejia' ); ?></span>
            <h2><?php esc_html_e( 'Una carrera en hitos', 'drmejia' ); ?></h2>
        </div>

        <?php
        $events = array(
            array( 'year' => '1985',     'title' => __( 'Doctor en Medicina y Cirugía', 'drmejia' ),                         'where' => __( 'Universidad Nacional Autónoma de Nicaragua (UNAN)', 'drmejia' ) ),
            array( 'year' => '1991',     'title' => __( 'Especialidad en Pediatría', 'drmejia' ),                            'where' => __( 'Hospital Infantil Manuel de Jesús Rivera · UNAN-Managua', 'drmejia' ) ),
            array( 'year' => '1997',     'title' => __( 'Maestría en Genética', 'drmejia' ),                                 'where' => __( 'CIBO, Instituto Mexicano del Seguro Social (IMSS)', 'drmejia' ) ),
            array( 'year' => '—',        'title' => __( 'Fellowship · Manejo Integral de la Espina Bífida', 'drmejia' ),     'where' => __( 'Hospital Niguarda · Inst. Carlos Besta (Milán) · Hospital Gemelli (Roma)', 'drmejia' ) ),
            array( 'year' => '—',        'title' => __( 'Fellowship · Hipnosis en Pediatría', 'drmejia' ),                   'where' => __( 'Sociedad Americana de Conducta y Desarrollo · Pittsburgh, USA', 'drmejia' ) ),
            array( 'year' => '—',        'title' => __( 'Fellowship · Asesoramiento Genético Oncológico', 'drmejia' ),       'where' => __( 'Instituto Ángel H. Roffo · Universidad de Buenos Aires', 'drmejia' ) ),
            array( 'year' => '2006–13',  'title' => __( 'Director del Hospital Infantil Manuel de Jesús Rivera', 'drmejia' ),'where' => __( '7 años · Hospital pediátrico de referencia nacional', 'drmejia' ) ),
            array( 'year' => __( 'Hoy', 'drmejia' ), 'title' => __( 'Práctica clínica · Pediatría y genética', 'drmejia' ), 'where' => __( 'Clínica Perinatal · Managua, Nicaragua', 'drmejia' ) ),
        );
        ?>
        <div class="row-stack">
            <?php foreach ( $events as $e ) : ?>
                <div class="row-card">
                    <span class="row-year"><?php echo esc_html( $e['year'] ); ?></span>
                    <h3 class="h4"><?php echo esc_html( $e['title'] ); ?></h3>
                    <p><?php echo esc_html( $e['where'] ); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ============================================================
     03 · RESEARCH LINES
     ============================================================ -->
<section class="section">
    <div class="container">
        <div class="posts-header">
            <div>
                <span class="eyebrow" style="margin-bottom: 16px; display: inline-flex;"><?php esc_html_e( 'Investigación', 'drmejia' ); ?></span>
                <h2 style="margin: 0;"><?php esc_html_e( 'Líneas de investigación y consulta', 'drmejia' ); ?></h2>
            </div>
            <span class="meta"><?php esc_html_e( 'Docencia activa · 1997–presente', 'drmejia' ); ?></span>
        </div>

        <?php
        $lines = array(
            array( 'title' => __( 'Genética clínica', 'drmejia' ),                        'desc' => __( 'Línea de investigación activa', 'drmejia' ) ),
            array( 'title' => __( 'Anomalías congénitas', 'drmejia' ),                    'desc' => __( 'Línea de investigación activa', 'drmejia' ) ),
            array( 'title' => __( 'Síndrome de Down y enfermedades raras', 'drmejia' ),   'desc' => __( 'Pacientes sin diagnóstico o con múltiples padecimientos', 'drmejia' ) ),
            array( 'title' => __( 'Asesoramiento genético oncológico', 'drmejia' ),       'desc' => __( 'Cáncer hereditario, riesgos familiares', 'drmejia' ) ),
            array( 'title' => __( 'Tamizaje neonatal y diagnóstico prenatal', 'drmejia' ),'desc' => __( 'Cariotipo, microarrays, ADN fetal, exomas y genomas', 'drmejia' ) ),
        );
        ?>
        <div class="row-stack">
            <?php foreach ( $lines as $l ) : ?>
                <div class="row-card" style="grid-template-columns: 1fr 1fr;">
                    <h3 class="h4"><?php echo esc_html( $l['title'] ); ?></h3>
                    <p><?php echo esc_html( $l['desc'] ); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ============================================================
     04 · PHILOSOPHY QUOTE
     ============================================================ -->
<section class="philosophy">
    <div class="container">
        <div class="quote-mark">"</div>
        <p><?php esc_html_e( 'Ayudar a las personas y sus familias de manera incondicional, respondiendo a sus preguntas e inquietudes y estando siempre disponible para ellos.', 'drmejia' ); ?></p>
        <div class="attribution">— Dr. Gerardo Mejía</div>
    </div>
</section>

<?php get_footer(); ?>
