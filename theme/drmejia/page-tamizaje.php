<?php
/**
 * Template Name: Tamizaje Metabólico Neonatal
 *
 * Mirrors _handoff/reference/tamizaje-page.jsx
 *
 * @package DrMejia
 */

get_header();
?>

<!-- ============================================================
     01 · KARYOTYPE HERO
     ============================================================ -->
<section class="page-hero mint">
    <div class="container">
        <span class="chip" style="margin-bottom: 24px; background: var(--accent-soft); color: #0E8576; border-color: transparent;">
            <?php echo drmejia_icon( 'dna', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
            <?php esc_html_e( 'Estudio preventivo · Recién nacidos', 'drmejia' ); ?>
        </span>

        <div class="split-grid" style="align-items: end;">
            <h1 style="margin: 0;"><?php esc_html_e( 'Tamizaje Metabólico Neonatal', 'drmejia' ); ?></h1>
            <p class="lede" style="margin: 0;">
                <?php esc_html_e( 'Una prueba preventiva que se realiza en los primeros días de vida para detectar enfermedades metabólicas tratables antes de que aparezcan los síntomas.', 'drmejia' ); ?>
            </p>
        </div>

        <?php
        $kpis = array(
            array( 'l' => __( 'Edad indicada', 'drmejia' ),  'v' => __( '2 – 7 días de vida', 'drmejia' ) ),
            array( 'l' => __( 'Procedimiento', 'drmejia' ),  'v' => __( 'Prueba del talón', 'drmejia' ) ),
            array( 'l' => __( 'Resultados', 'drmejia' ),     'v' => __( '10 – 14 días', 'drmejia' ) ),
            array( 'l' => __( 'Incluye', 'drmejia' ),        'v' => __( 'Consulta de interpretación', 'drmejia' ) ),
        );
        ?>
        <div class="kpi-strip">
            <?php foreach ( $kpis as $kpi ) : ?>
                <div class="card">
                    <div class="meta"><?php echo esc_html( $kpi['l'] ); ?></div>
                    <div class="value"><?php echo esc_html( $kpi['v'] ); ?></div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ============================================================
     02 · WHAT IT IS
     ============================================================ -->
<section class="section">
    <div class="container">
        <div class="split-grid">
            <div class="placeholder-block mint">
                <span class="placeholder-tag"><?php esc_html_e( 'ilustración · prueba del talón', 'drmejia' ); ?></span>
            </div>
            <div>
                <span class="eyebrow" style="margin-bottom: 20px; display: inline-flex;"><?php esc_html_e( '¿Qué es?', 'drmejia' ); ?></span>
                <h2 style="margin: 0 0 20px;"><?php esc_html_e( 'Detección temprana de enfermedades tratables', 'drmejia' ); ?></h2>
                <p class="lede" style="margin-bottom: 16px;">
                    <?php esc_html_e( 'El tamizaje metabólico neonatal —conocido también como "prueba del talón"— es un análisis de sangre que se realiza en los primeros días de vida del bebé para identificar enfermedades metabólicas, endocrinas y genéticas.', 'drmejia' ); ?>
                </p>
                <p class="body">
                    <?php esc_html_e( 'Muchas de estas condiciones no presentan síntomas al nacer, pero si se detectan a tiempo pueden tratarse antes de causar daño irreversible. Es una de las intervenciones preventivas más importantes en neonatología.', 'drmejia' ); ?>
                </p>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     03 · WHEN IT'S RECOMMENDED
     ============================================================ -->
<section class="section" style="background: var(--bg-soft);">
    <div class="container">
        <div class="section-header-center">
            <span class="eyebrow"><?php esc_html_e( '¿Cuándo se recomienda?', 'drmejia' ); ?></span>
            <h2><?php esc_html_e( 'Cuatro razones para realizar el tamizaje', 'drmejia' ); ?></h2>
        </div>

        <?php
        $reasons = array(
            array( 'icon' => 'baby',   'title' => __( 'Todo recién nacido', 'drmejia' ),       'desc' => __( 'Es una prueba universal que se recomienda para todos los bebés, sanos o con factores de riesgo.', 'drmejia' ) ),
            array( 'icon' => 'shield', 'title' => __( 'Detección preventiva', 'drmejia' ),     'desc' => __( 'Identifica condiciones tratables antes de que aparezcan síntomas, cuando la intervención es más efectiva.', 'drmejia' ) ),
            array( 'icon' => 'heart',  'title' => __( 'Antecedentes familiares', 'drmejia' ),  'desc' => __( 'Es especialmente importante cuando hay historia familiar de enfermedades metabólicas o consanguinidad.', 'drmejia' ) ),
            array( 'icon' => 'dna',    'title' => __( 'Embarazos de riesgo', 'drmejia' ),      'desc' => __( 'Bebés prematuros, de bajo peso o con complicaciones perinatales se benefician aún más del tamizaje.', 'drmejia' ) ),
        );
        ?>
        <div class="services-grid" style="grid-template-columns: repeat(2, 1fr);">
            <?php foreach ( $reasons as $r ) : ?>
                <div class="card">
                    <span class="icon-circle"><?php echo drmejia_icon( $r['icon'], 22 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
                    <h3 class="h4"><?php echo esc_html( $r['title'] ); ?></h3>
                    <p class="body" style="font-size: 15px;"><?php echo esc_html( $r['desc'] ); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ============================================================
     04 · PROCESS — 4 steps
     ============================================================ -->
<section class="section">
    <div class="container">
        <div class="section-header-center">
            <span class="eyebrow"><?php esc_html_e( 'El proceso', 'drmejia' ); ?></span>
            <h2><?php esc_html_e( 'Cuatro pasos, sencillos y seguros', 'drmejia' ); ?></h2>
        </div>

        <?php
        $steps = array(
            array( 'n' => '1', 'title' => __( 'Consulta inicial', 'drmejia' ),         'desc' => __( 'Conversación con los padres y evaluación del recién nacido.', 'drmejia' ) ),
            array( 'n' => '2', 'title' => __( 'Toma de muestra', 'drmejia' ),          'desc' => __( 'Unas gotas de sangre del talón del bebé. Procedimiento rápido y prácticamente indoloro.', 'drmejia' ) ),
            array( 'n' => '3', 'title' => __( 'Análisis de laboratorio', 'drmejia' ),  'desc' => __( 'Se analizan múltiples marcadores metabólicos, hormonales y genéticos.', 'drmejia' ) ),
            array( 'n' => '4', 'title' => __( 'Entrega e interpretación', 'drmejia' ), 'desc' => __( 'Consulta dedicada para revisar los resultados y, si es necesario, plan de seguimiento.', 'drmejia' ) ),
        );
        ?>
        <div class="services-grid">
            <?php foreach ( $steps as $s ) : ?>
                <div class="card">
                    <div class="num-circle" style="margin-bottom: 20px;"><?php echo esc_html( $s['n'] ); ?></div>
                    <h3 class="h4"><?php echo esc_html( $s['title'] ); ?></h3>
                    <p class="body" style="font-size: 14.5px;"><?php echo esc_html( $s['desc'] ); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ============================================================
     05 · KARYOTYPE FAQ
     ============================================================ -->
<section class="section" style="background: var(--bg-soft);">
    <div class="container" style="max-width: 880px;">
        <div class="section-header-center">
            <span class="eyebrow"><?php esc_html_e( 'Preguntas frecuentes', 'drmejia' ); ?></span>
            <h2><?php esc_html_e( 'Lo que los padres suelen preguntar', 'drmejia' ); ?></h2>
        </div>

        <?php
        $faqs = array(
            array( 'q' => __( '¿Es doloroso para el bebé?', 'drmejia' ),               'a' => __( 'Es una punción muy pequeña en el talón. La molestia es mínima y momentánea.', 'drmejia' ) ),
            array( 'q' => __( '¿Cuándo debe realizarse?', 'drmejia' ),                 'a' => __( 'Idealmente entre las 48 horas y los 7 días de vida. Se puede hacer antes si hay indicación médica.', 'drmejia' ) ),
            array( 'q' => __( '¿Cuánto tiempo toman los resultados?', 'drmejia' ),     'a' => __( 'Entre 10 y 14 días. Si hay un hallazgo que requiere atención inmediata, contactamos a la familia antes.', 'drmejia' ) ),
            array( 'q' => __( '¿Qué enfermedades detecta?', 'drmejia' ),               'a' => __( 'Hipotiroidismo congénito, hiperplasia suprarrenal, fenilcetonuria, galactosemia, fibrosis quística y otras condiciones metabólicas y genéticas según el panel.', 'drmejia' ) ),
            array( 'q' => __( '¿Qué pasa si el resultado es positivo?', 'drmejia' ),   'a' => __( 'Programamos una consulta extendida para confirmar con estudios adicionales y diseñar el plan de tratamiento. Detectarlo a tiempo permite resultados muy favorables.', 'drmejia' ) ),
            array( 'q' => __( '¿Es necesario si mi bebé parece sano?', 'drmejia' ),    'a' => __( 'Sí. La gran mayoría de las enfermedades que detecta no presentan síntomas al nacer. Por eso el tamizaje es preventivo y universal.', 'drmejia' ) ),
        );
        ?>
        <div class="faq-list">
            <?php foreach ( $faqs as $f ) : ?>
                <details class="card">
                    <summary><?php echo esc_html( $f['q'] ); ?></summary>
                    <p class="body"><?php echo esc_html( $f['a'] ); ?></p>
                </details>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ============================================================
     06 · CTA
     ============================================================ -->
<section class="section home-cta-section">
    <div class="container" style="text-align: center; max-width: 720px;">
        <h2><?php esc_html_e( '¿Listo para hacerle el tamizaje a su bebé?', 'drmejia' ); ?></h2>
        <p class="lede" style="margin-bottom: 32px;">
            <?php esc_html_e( 'Agende la consulta con anticipación para coordinar la toma de muestra en los primeros días de vida del bebé.', 'drmejia' ); ?>
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a href="<?php echo esc_url( home_url( '/contacto/' ) ); ?>" class="btn" style="background: #FFF; color: var(--brand);">
                <?php esc_html_e( 'Agendar consulta', 'drmejia' ); ?>
                <?php echo drmejia_icon( 'arrow-right', 16 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
            </a>
            <a href="<?php echo esc_url( drmejia_whatsapp_url( __( 'Hola, quisiera información sobre el tamizaje neonatal.', 'drmejia' ) ) ); ?>"
               class="btn btn-ghost"
               rel="noopener"
               target="_blank">
                <?php esc_html_e( 'Preguntar por WhatsApp', 'drmejia' ); ?>
            </a>
        </div>
    </div>
</section>

<?php get_footer(); ?>
