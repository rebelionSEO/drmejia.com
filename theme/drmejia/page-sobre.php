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
<style id="about-portrait-style">
    .about-portrait { position: relative; min-height: clamp(400px, 38vw, 480px); margin: 0; overflow: hidden; isolation: isolate; border-radius: 30px; background: radial-gradient(circle at 26% 20%, rgba(255, 255, 255, .8), transparent 38%), linear-gradient(145deg, var(--bg-soft), var(--accent-soft)); box-shadow: inset 0 0 0 1px rgba(14, 58, 67, .08), 0 18px 42px rgba(14, 58, 67, .08); }
    .about-portrait::before { content: ""; position: absolute; z-index: 0; left: 13%; bottom: -1px; width: 74%; height: 91%; border-radius: 48% 48% 0 0; background: linear-gradient(155deg, var(--brand-soft), var(--accent)); }
    .about-portrait::after { content: ""; position: absolute; z-index: 1; left: 8%; bottom: -14%; width: 84%; height: 105%; border: 1px solid rgba(14, 58, 67, .2); border-radius: 48% 48% 0 0; }
    .about-portrait__image { position: absolute; z-index: 2; bottom: 0; left: 50%; display: block; width: min(65%, 340px); height: auto; max-width: none; transform: translateX(-50%); filter: drop-shadow(0 14px 16px rgba(44, 53, 50, .18)); }
    @media (max-width: 900px) {
        .about-portrait { min-height: clamp(370px, 110vw, 450px); }
        .about-portrait__image { width: min(78%, 310px); }
    }
</style>
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
            <figure class="about-portrait">
                <?php echo wp_get_attachment_image( 92, 'full', false, array( 'class' => 'about-portrait__image', 'alt' => __( 'Dr. Gerardo Mejía Baltodano, pediatra y genetista', 'drmejia' ), 'loading' => 'eager', 'decoding' => 'async' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
            </figure>
            <div>
                <p class="lede" style="margin-bottom: 20px;">
                    <?php esc_html_e( 'El Dr. Gerardo Mejía Baltodano es pediatra y el primer médico genetista en la historia de Nicaragua. 40 años como médico, 34 como pediatra y 29 como genetista.', 'drmejia' ); ?>
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
     03 · DOCUMENTED ACADEMIC ACTIVITY
     ============================================================ -->
<style>
    .gmb-certificates { background: #fff; border-top: 1px solid #dce5e0; border-bottom: 1px solid #dce5e0; }
    .gmb-certificates .gmb-cert-list { display: grid; gap: 14px; }
    .gmb-certificates .gmb-cert-card { display: grid; grid-template-columns: 88px minmax(0, 1fr) 150px; align-items: center; gap: 24px; padding: 20px 28px; border: 1px solid #dce5e0; border-radius: 24px; background: #fff; color: #15343a; text-decoration: none; }
    .gmb-certificates .gmb-cert-card:hover, .gmb-certificates .gmb-cert-card:focus-visible { border-color: #89a99a; box-shadow: 0 12px 27px rgba(15,57,64,.075); outline-offset: 3px; }
    .gmb-certificates .gmb-cert-year { color: #0e3a43; font-size: 18px; font-weight: 800; }
    .gmb-certificates .gmb-cert-copy h3 { margin: 0 0 6px; color: #15343a; font-size: 18px; line-height: 1.35; }
    .gmb-certificates .gmb-cert-copy p { margin: 0; color: #53676b; font-size: 14px; line-height: 1.55; }
    .gmb-certificates .gmb-cert-open { display: inline-block; margin-top: 10px; color: #0e3a43; font-size: 13px; font-weight: 800; text-decoration: underline; text-underline-offset: 2px; }
    .gmb-certificates .gmb-cert-image { display: block; width: 150px; height: 112px; object-fit: contain; border: 1px solid #dce5e0; border-radius: 9px; background: #f7f9f7; }
    @media (max-width: 680px) {
        .gmb-certificates .gmb-cert-card { grid-template-columns: minmax(0, 1fr) 110px; gap: 10px 14px; padding: 17px; }
        .gmb-certificates .gmb-cert-year, .gmb-certificates .gmb-cert-copy { grid-column: 1; }
        .gmb-certificates .gmb-cert-image { grid-column: 2; grid-row: 1 / 3; width: 110px; height: 84px; }
    }
</style>
<section class="section gmb-certificates" id="certificados" aria-labelledby="gmb-certificates-heading">
    <div class="container">
        <div class="section-header-center">
            <span class="eyebrow"><?php esc_html_e( 'Actividad académica e investigación', 'drmejia' ); ?></span>
            <h2 id="gmb-certificates-heading"><?php esc_html_e( 'Docencia, investigación y participación profesional', 'drmejia' ); ?></h2>
        </div>

        <?php
        // Documentos y miniaturas aprobados por el Dr. Mejía; IDs de la biblioteca de WordPress.
        $certificates = array(
            array(
                'year' => '2026',
                'title' => __( 'Expositor en el VIII Simposio de Oncología', 'drmejia' ),
                'detail' => __( '«Cáncer en población joven» · Hospital Vivian Pellas · 24 de octubre de 2026', 'drmejia' ),
                'image_alt' => __( 'Diploma de expositor del VIII Simposio de Oncología', 'drmejia' ),
                'image_id' => 91,
                'document_id' => 90,
            ),
            array(
                'year' => '2021',
                'title' => __( 'Reconocimiento por labor docente', 'drmejia' ),
                'detail' => __( 'Diplomado Gerencia de Hospitales · CIES UNAN-Managua · 15 de diciembre de 2021', 'drmejia' ),
                'image_alt' => __( 'Reconocimiento por docencia en el Diplomado Gerencia de Hospitales', 'drmejia' ),
                'image_id' => 87,
                'document_id' => 86,
            ),
            array(
                'year' => '2021',
                'title' => __( 'Reconocimiento como investigador principal', 'drmejia' ),
                'detail' => __( 'Primera fase de un ensayo clínico · CIES UNAN-Managua · 30 de diciembre de 2021', 'drmejia' ),
                'image_alt' => __( 'Reconocimiento como investigador principal de un ensayo clínico', 'drmejia' ),
                'image_id' => 89,
                'document_id' => 88,
            ),
        );
        ?>
        <div class="gmb-cert-list">
            <?php foreach ( $certificates as $certificate ) :
                $document_url = wp_get_attachment_url( $certificate['document_id'] );
                $image_url = wp_get_attachment_image_url( $certificate['image_id'], 'medium' );
                if ( ! $document_url || ! $image_url ) {
                    continue;
                }
                ?>
                <a class="gmb-cert-card" href="<?php echo esc_url( $document_url ); ?>" target="_blank" rel="noopener noreferrer">
                    <span class="gmb-cert-year"><?php echo esc_html( $certificate['year'] ); ?></span>
                    <div class="gmb-cert-copy">
                        <h3><?php echo esc_html( $certificate['title'] ); ?></h3>
                        <p><?php echo esc_html( $certificate['detail'] ); ?></p>
                        <span class="gmb-cert-open"><?php esc_html_e( 'Ver documento original (PDF) ↗', 'drmejia' ); ?></span>
                    </div>
                    <img class="gmb-cert-image" src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $certificate['image_alt'] ); ?>" loading="lazy" decoding="async">
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ============================================================
     04 · RESEARCH LINES
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
     05 · PHILOSOPHY QUOTE
     ============================================================ -->
<section class="philosophy">
    <div class="container">
        <div class="quote-mark">"</div>
        <p><?php esc_html_e( 'Ayudar a las personas y sus familias de manera incondicional, respondiendo a sus preguntas e inquietudes y estando siempre disponible para ellos.', 'drmejia' ); ?></p>
        <div class="attribution">— <?php echo esc_html( DRMEJIA_NAME ); ?></div>
    </div>
</section>

<?php get_footer(); ?>
