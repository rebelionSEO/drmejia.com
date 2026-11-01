<?php
/**
 * Template Name: Servicios (index)
 *
 * @package DrMejia
 */

get_header();
?>

<section class="page-hero">
    <div class="container">
        <span class="chip" style="margin-bottom: 24px;">
            <?php echo drmejia_icon( 'stethoscope', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
            <?php esc_html_e( 'Servicios', 'drmejia' ); ?>
        </span>
        <h1>
            <?php
            printf(
                /* translators: %s = highlighted phrase */
                esc_html__( 'Genética y pediatría, con %s', 'drmejia' ),
                '<span class="accent">' . esc_html__( 'explicación clara', 'drmejia' ) . '</span>'
            );
            ?>
        </h1>
        <p class="lede"><?php esc_html_e( 'Prioridad: consulta genética, tamizaje neonatal y ADN fetal.', 'drmejia' ); ?></p>
    </div>
</section>

<section class="section">
    <div class="container">
        <?php
        $services = array(
            array( 'icon' => 'dna',         'href' => home_url( '/servicios/asesoria-genetica/' ), 'title' => __( 'Consulta de genética', 'drmejia' ),     'desc' => __( 'Asesoramiento para niños, adultos, embarazadas y parejas. Primera consulta de 1 hora.', 'drmejia' ) ),
            array( 'icon' => 'baby',        'href' => home_url( '/tamizaje/' ),                    'title' => __( 'Tamizaje neonatal', 'drmejia' ),        'desc' => __( 'Prueba del talón. Ideal entre las 48 y 72 horas de vida.', 'drmejia' ) ),
            array( 'icon' => 'heart',       'href' => home_url( '/adn-fetal/' ),                   'title' => __( 'ADN fetal (NIPT)', 'drmejia' ),         'desc' => __( 'Tamizaje prenatal no invasivo de cromosomopatías en sangre materna.', 'drmejia' ) ),
            array( 'icon' => 'stethoscope', 'href' => home_url( '/servicios/consulta-pediatrica/' ), 'title' => __( 'Pediatría y vacunas', 'drmejia' ),     'desc' => __( 'Consultas pediátricas, crecimiento, desarrollo y vacunas.', 'drmejia' ) ),
        );
        ?>
        <div class="services-grid" style="grid-template-columns: repeat(2, 1fr);">
            <?php foreach ( $services as $s ) : ?>
                <a href="<?php echo esc_url( $s['href'] ); ?>" class="card" style="display: block;">
                    <span class="icon-circle"><?php echo drmejia_icon( $s['icon'], 22 ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
                    <h3 class="h4" style="margin-bottom: 10px;"><?php echo esc_html( $s['title'] ); ?></h3>
                    <p class="body" style="font-size: 14.5px; margin-bottom: 16px;"><?php echo esc_html( $s['desc'] ); ?></p>
                    <span class="btn-link">
                        <?php esc_html_e( 'Conocer más', 'drmejia' ); ?>
                        <?php echo drmejia_icon( 'arrow-right', 14 ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
                    </span>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
