<?php
/**
 * Template Name: ADN fetal (NIPT)
 *
 * @package DrMejia
 */

get_header();
?>

<section class="page-hero">
    <div class="container">
        <span class="chip" style="margin-bottom: 24px;">
            <?php echo drmejia_icon( 'heart', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
            <?php esc_html_e( 'Tamizaje prenatal · NIPT', 'drmejia' ); ?>
        </span>
        <h1>
            <?php
            printf(
                esc_html__( 'ADN fetal en sangre %s', 'drmejia' ),
                '<span class="accent">' . esc_html__( 'materna', 'drmejia' ) . '</span>'
            );
            ?>
        </h1>
        <p class="lede">
            <?php esc_html_e( 'Estudio no invasivo que busca cromosomopatías en una muestra de sangre de la embarazada. Es un tamizaje: no sustituye el diagnóstico confirmatorio.', 'drmejia' ); ?>
        </p>
    </div>
</section>

<section class="section">
    <div class="container">
        <div class="split-grid">
            <div class="placeholder-block mint">
                <span class="placeholder-tag"><?php esc_html_e( 'embarazo · ultrasonido y consulta', 'drmejia' ); ?></span>
            </div>
            <div>
                <span class="eyebrow" style="margin-bottom: 20px; display: inline-flex;"><?php esc_html_e( '¿Cuándo se recomienda?', 'drmejia' ); ?></span>
                <h2 style="margin-top: 0;"><?php esc_html_e( 'Indicaciones frecuentes', 'drmejia' ); ?></h2>
                <p class="lede">
                    <?php esc_html_e( 'Se recomienda en un grupo de embarazadas con uno o más de estos factores, no de forma automática a todas.', 'drmejia' ); ?>
                </p>
                <p class="body">
                    <?php esc_html_e( 'Edad mayor de 35 años; pérdidas de embarazo sin causa explicada; o marcadores en ultrasonido (sonoluscencia nucal aumentada, intestino hiperecogénico, ductus venoso con onda reversa, alteración cardíaca fetal, onfalocele, entre otros).', 'drmejia' ); ?>
                </p>
            </div>
        </div>
    </div>
</section>

<section class="section" style="background: var(--bg-soft);">
    <div class="container">
        <div class="section-header-center">
            <span class="eyebrow"><?php esc_html_e( 'Qué debe saber', 'drmejia' ); ?></span>
            <h2><?php esc_html_e( 'Límites del estudio', 'drmejia' ); ?></h2>
        </div>
        <?php
        $items = array(
            array( 'icon' => 'shield', 'title' => __( 'Es un tamizaje', 'drmejia' ), 'desc' => __( 'Orienta el riesgo. Un resultado de alto riesgo requiere confirmación con estudios diagnósticos.', 'drmejia' ) ),
            array( 'icon' => 'phone', 'title' => __( 'Puede pedirlo su ginecólogo', 'drmejia' ), 'desc' => __( 'Los especialistas en gineco-obstetricia pueden solicitar el ADN fetal sin consulta genética previa.', 'drmejia' ) ),
            array( 'icon' => 'dna', 'title' => __( 'No promete un diagnóstico', 'drmejia' ), 'desc' => __( 'Ningún estudio genético garantiza, por sí solo, un diagnóstico definitivo.', 'drmejia' ) ),
        );
        ?>
        <div class="services-grid" style="grid-template-columns: repeat(3, 1fr);">
            <?php foreach ( $items as $item ) : ?>
                <div class="card">
                    <span class="icon-circle"><?php echo drmejia_icon( $item['icon'], 22 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
                    <h3 class="h4"><?php echo esc_html( $item['title'] ); ?></h3>
                    <p class="body"><?php echo esc_html( $item['desc'] ); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<section class="section home-cta-section">
    <div class="container" style="text-align: center; max-width: 720px;">
        <h2><?php esc_html_e( '¿Le indicaron un ADN fetal?', 'drmejia' ); ?></h2>
        <p class="lede">
            <?php esc_html_e( 'Escríbanos por WhatsApp para coordinar la toma de muestra o una consulta si hay dudas.', 'drmejia' ); ?>
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <a href="<?php echo esc_url( home_url( '/contacto/' ) ); ?>" class="btn btn-primary"><?php esc_html_e( 'Agendar consulta', 'drmejia' ); ?></a>
            <a href="<?php echo esc_url( drmejia_whatsapp_url( __( 'Hola, quisiera información sobre el ADN fetal (NIPT).', 'drmejia' ) ) ); ?>" class="btn btn-ghost" rel="noopener" target="_blank"><?php esc_html_e( 'Preguntar por WhatsApp', 'drmejia' ); ?></a>
        </div>
    </div>
</section>

<?php get_footer(); ?>
