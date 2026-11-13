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

<style>
/* Toma de muestras fuera de Managua — página de tamizaje */
.tamizaje-local-jump {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 28px;
    padding: 12px 16px;
    border: 1px solid var(--brand-soft);
    border-radius: var(--r-pill);
    background: #fff;
    color: var(--brand-deep);
    font-size: 14px;
    font-weight: 700;
    line-height: 1.4;
    text-decoration: none;
    box-shadow: var(--shadow-sm);
}
.tamizaje-local-jump:hover { border-color: var(--accent); background: var(--brand-tint); }
.tamizaje-local-jump svg { flex: none; }
.tamizaje-local-jump svg:last-child { margin-left: 4px; }
.tamizaje-local-jump:focus-visible,
.tamizaje-local-phone:focus-visible { outline: 2px solid var(--brand); outline-offset: 3px; }

.tamizaje-local-section {
    background: radial-gradient(circle at 95% 8%, rgba(126, 154, 143, 0.14), transparent 28%), var(--bg-soft);
    scroll-margin-top: 90px;
}
.tamizaje-local-heading {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: end;
    gap: 48px;
    margin-bottom: 32px;
}
.tamizaje-local-heading .eyebrow { margin-bottom: 16px; }
.tamizaje-local-heading h2 { margin: 0; }
.tamizaje-local-heading .lede { margin: 0; max-width: 650px; }
.tamizaje-local-note {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 18px;
    overflow: hidden;
    padding: 26px 30px;
    border-radius: var(--r-lg);
    background: var(--brand-deep);
    color: #fff;
    margin-bottom: 24px;
}
.tamizaje-local-note::after {
    content: '';
    position: absolute;
    width: 270px;
    height: 270px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 50%;
    top: -140px;
    right: -70px;
    pointer-events: none;
}
.tamizaje-local-note-icon {
    display: grid;
    place-items: center;
    flex: 0 0 48px;
    width: 48px;
    height: 48px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.12);
    color: #e8efeb;
}
.tamizaje-local-note p {
    position: relative;
    z-index: 1;
    margin: 0;
    max-width: 850px;
    font-size: 16px;
    line-height: 1.7;
}
.tamizaje-local-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
}
.tamizaje-local-card {
    min-width: 0;
    padding: 24px;
    border: 1px solid var(--rule);
    border-radius: var(--r-lg);
    background: #fff;
    box-shadow: var(--shadow-sm);
}
.tamizaje-local-card:last-child:nth-child(3n + 1) { grid-column: 2; }
.tamizaje-local-card-head {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--rule-soft);
}
.tamizaje-local-card-icon {
    display: grid;
    place-items: center;
    flex: 0 0 38px;
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: var(--brand-tint);
    color: var(--brand);
}
.tamizaje-local-card h3 { margin: 0; font-size: 19px; line-height: 1.35; }
.tamizaje-local-people { list-style: none; padding: 0; margin: 0; }
.tamizaje-local-people li { padding-top: 17px; }
.tamizaje-local-people li + li { margin-top: 17px; border-top: 1px solid var(--rule-soft); }
.tamizaje-local-name { display: block; font-size: 15px; font-weight: 650; line-height: 1.45; }
.tamizaje-local-clinic { display: block; margin-top: 4px; color: var(--ink-2); font-size: 14px; line-height: 1.5; }
.tamizaje-local-phone {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-top: 7px;
    color: var(--brand);
    font-size: 15px;
    font-weight: 700;
    text-decoration: none;
}
.tamizaje-local-phone:hover { text-decoration: underline; text-underline-offset: 3px; }
.tamizaje-local-phone svg { flex: none; }
.tamizaje-local-footnote { margin: 22px 0 0; color: var(--ink-2); font-size: 14px; }
@media (max-width: 900px) {
    .tamizaje-local-heading { grid-template-columns: 1fr; gap: 14px; }
    .tamizaje-local-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .tamizaje-local-card:last-child:nth-child(3n + 1) { grid-column: auto; }
    .tamizaje-local-card:last-child:nth-child(2n + 1) { grid-column: 1 / -1; width: calc((100% - 18px) / 2); justify-self: center; }
}
@media (max-width: 600px) {
    .tamizaje-local-jump { border-radius: var(--r-md); }
    .tamizaje-local-note { padding: 22px; gap: 14px; }
    .tamizaje-local-note-icon { flex-basis: 40px; width: 40px; height: 40px; }
    .tamizaje-local-grid { grid-template-columns: minmax(0, 1fr); gap: 12px; }
    .tamizaje-local-card { padding: 20px; }
    .tamizaje-local-card:last-child:nth-child(2n + 1) { grid-column: auto; width: auto; justify-self: stretch; }
}
</style>

<!-- ============================================================
     01 · KARYOTYPE HERO
     ============================================================ -->
<section class="page-hero mint">
    <div class="container">
        <span class="chip" style="margin-bottom: 24px; background: var(--accent-soft); color: var(--brand-deep); border-color: transparent;">
            <?php echo drmejia_icon( 'dna', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
            <?php esc_html_e( 'Estudio preventivo · Recién nacidos', 'drmejia' ); ?>
        </span>

        <div class="split-grid" style="align-items: end;">
            <h1 style="margin: 0;"><?php esc_html_e( 'Tamizaje Metabólico Neonatal', 'drmejia' ); ?></h1>
            <p class="lede" style="margin: 0;">
                <?php esc_html_e( 'Una prueba preventiva para recién nacidos que ayuda a detectar enfermedades metabólicas tratables antes de que aparezcan los síntomas.', 'drmejia' ); ?>
            </p>
        </div>

        <?php
        $kpis = array(
            array( 'l' => __( 'Momento recomendado', 'drmejia' ),  'v' => __( 'Primera semana de vida', 'drmejia' ) ),
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
        <a class="tamizaje-local-jump" href="#toma-fuera-managua">
            <?php echo drmejia_icon( 'pin', 18 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
            <span><?php esc_html_e( '¿Vive fuera de Managua? Consulte dónde coordinar la toma de muestra', 'drmejia' ); ?></span>
            <?php echo drmejia_icon( 'arrow-right', 17 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
        </a>
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
                    <?php esc_html_e( 'El tamizaje metabólico neonatal —conocido también como "prueba del talón"— es un análisis de sangre del recién nacido para identificar enfermedades metabólicas, endocrinas y genéticas.', 'drmejia' ); ?>
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
            array( 'n' => '2', 'title' => __( 'Toma de muestra', 'drmejia' ),          'desc' => __( 'Unas gotas de sangre del talón del bebé. Procedimiento rápido y prácticamente exento de complicaciones.', 'drmejia' ) ),
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
     05 · TOMA DE MUESTRAS FUERA DE MANAGUA
     ============================================================ -->
<section class="section tamizaje-local-section" id="toma-fuera-managua" aria-labelledby="tamizaje-local-title">
    <div class="container">
        <div class="tamizaje-local-heading">
            <div>
                <span class="eyebrow"><?php esc_html_e( 'Toma de muestras fuera de Managua', 'drmejia' ); ?></span>
                <h2 id="tamizaje-local-title"><?php esc_html_e( '¿Vive fuera de Managua?', 'drmejia' ); ?></h2>
            </div>
            <p class="lede">
                <?php esc_html_e( 'Si desea realizar el tamizaje neonatal, puede contactar a uno de estos profesionales para consultar la disponibilidad y coordinar la toma de muestra en su localidad.', 'drmejia' ); ?>
            </p>
        </div>

        <div class="tamizaje-local-note">
            <span class="tamizaje-local-note-icon" aria-hidden="true"><?php echo drmejia_icon( 'stethoscope', 22 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
            <p><?php esc_html_e( 'El profesional realiza la toma de muestra. El Dr. Mejía gestiona su envío al laboratorio y los resultados se envían directamente a la familia.', 'drmejia' ); ?></p>
        </div>

        <?php
        $contactos_departamentos = array(
            array( 'departamento' => 'Chinandega', 'medicos' => array(
                array( 'nombre' => 'Dra. María José Barrantes', 'clinica' => 'Clínica de Especialidades Odontomax', 'telefono' => '8353 6681' ),
                array( 'nombre' => 'Dra. Miurel Somarriba', 'clinica' => 'Consultorio Pediátrico', 'telefono' => '8874 6896' ),
            ) ),
            array( 'departamento' => 'Estelí', 'medicos' => array(
                array( 'nombre' => 'Dra. Vivian López', 'clinica' => 'Clínica de Jesús', 'telefono' => '8499 0780' ),
            ) ),
            array( 'departamento' => 'Jinotega', 'medicos' => array(
                array( 'nombre' => 'Dr. Rolando Rivera', 'clinica' => 'Clínica Aesthetic', 'telefono' => '8441 8255' ),
            ) ),
            array( 'departamento' => 'Juigalpa', 'medicos' => array(
                array( 'nombre' => 'Dra. Ivonne García', 'clinica' => 'Consultorio Sacuanjoche', 'telefono' => '8702 7320' ),
            ) ),
            array( 'departamento' => 'León', 'medicos' => array(
                array( 'nombre' => 'Dr. Juan José Zapata', 'clinica' => 'Clínica de Especialidades Médicas', 'telefono' => '8587 4903' ),
            ) ),
            array( 'departamento' => 'Masaya', 'medicos' => array(
                array( 'nombre' => 'Dra. Isalia Soza', 'clinica' => 'Centro Médico San Lucas', 'telefono' => '8391 6460' ),
            ) ),
            array( 'departamento' => 'Ocotal, Nueva Segovia', 'medicos' => array(
                array( 'nombre' => 'Dr. Edward González', 'clinica' => 'Clínica de Especialidades Médicas del Norte', 'telefono' => '8442 7058' ),
            ) ),
        );
        ?>
        <div class="tamizaje-local-grid">
            <?php foreach ( $contactos_departamentos as $localidad ) : ?>
                <article class="tamizaje-local-card">
                    <div class="tamizaje-local-card-head">
                        <span class="tamizaje-local-card-icon" aria-hidden="true"><?php echo drmejia_icon( 'pin', 19 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
                        <h3><?php echo esc_html( $localidad['departamento'] ); ?></h3>
                    </div>
                    <ul class="tamizaje-local-people">
                        <?php foreach ( $localidad['medicos'] as $medico ) : ?>
                            <li>
                                <span class="tamizaje-local-name"><?php echo esc_html( $medico['nombre'] ); ?></span>
                                <span class="tamizaje-local-clinic"><?php echo esc_html( $medico['clinica'] ); ?></span>
                                <a class="tamizaje-local-phone" href="<?php echo esc_url( 'tel:+505' . preg_replace( '/\D+/', '', $medico['telefono'] ) ); ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Llamar a %1$s al %2$s', 'drmejia' ), $medico['nombre'], '+505 ' . $medico['telefono'] ) ); ?>">
                                    <?php echo drmejia_icon( 'phone', 15 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                                    <?php echo esc_html( '+505 ' . $medico['telefono'] ); ?>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </article>
            <?php endforeach; ?>
        </div>
        <p class="tamizaje-local-footnote"><?php esc_html_e( 'Consulte directamente con el profesional el lugar y la disponibilidad para la toma de muestra.', 'drmejia' ); ?></p>
    </div>
</section>

<!-- ============================================================
     06 · KARYOTYPE FAQ
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
            array( 'q' => __( '¿Cuándo debe realizarse?', 'drmejia' ),                 'a' => __( 'Se recomienda tomar la muestra durante la primera semana de vida. Si no fue posible, puede realizarse durante el primer mes. Si el bebé ya cumplió un mes, consulte al Dr. Mejía para recibir orientación.', 'drmejia' ) ),
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
     07 · CTA
     ============================================================ -->
<section class="section home-cta-section">
    <div class="container" style="text-align: center; max-width: 720px;">
        <h2><?php esc_html_e( '¿Listo para hacerle el tamizaje a su bebé?', 'drmejia' ); ?></h2>
        <p class="lede" style="margin-bottom: 32px;">
            <?php esc_html_e( 'Agende una consulta para coordinar la toma de muestra y resolver sus dudas.', 'drmejia' ); ?>
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
