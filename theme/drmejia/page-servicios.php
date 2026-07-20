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
                esc_html__( 'Atención pediátrica integral con la %s', 'drmejia' ),
                '<span class="accent">' . esc_html__( 'mirada de un genetista', 'drmejia' ) . '</span>'
            );
            ?>
        </h1>
        <p class="lede"><?php esc_html_e( 'Cuatro áreas de práctica que cubren las necesidades médicas y emocionales de cada familia.', 'drmejia' ); ?></p>
    </div>
</section>

<section class="section">
    <div class="container">
        <?php
        $services = array(
            array( 'icon' => 'stethoscope', 'slug' => 'consulta-pediatrica',  'title' => __( 'Consulta pediátrica', 'drmejia' ),     'desc' => __( 'Enfermedades respiratorias, infecciosas, alérgicas, gastrointestinales, neurológicas. Crecimiento, sueño, alimentación, vacunas.', 'drmejia' ) ),
            array( 'icon' => 'dna',         'slug' => 'asesoria-genetica',    'title' => __( 'Asesoría genética', 'drmejia' ),       'desc' => __( 'Anomalías congénitas, síndromes genéticos, Síndrome de Down, enfermedades raras, pacientes sin diagnóstico.', 'drmejia' ) ),
            array( 'icon' => 'baby',        'slug' => 'tamizaje',             'title' => __( 'Estudios genéticos y tamizaje', 'drmejia' ), 'desc' => __( 'Cariotipo, microarrays, ADN fetal, exomas, genomas completos y tamizaje metabólico neonatal (prueba del talón).', 'drmejia' ) ),
            array( 'icon' => 'heart',       'slug' => 'cancer-hereditario',   'title' => __( 'Cáncer hereditario', 'drmejia' ),      'desc' => __( 'Asesoramiento y estudios diagnósticos para familias con historia de cáncer hereditario.', 'drmejia' ) ),
        );
        ?>
        <div class="services-grid" style="grid-template-columns: repeat(2, 1fr);">
            <?php foreach ( $services as $s ) : ?>
                <a href="<?php echo esc_url( home_url( '/servicios/' . $s['slug'] . '/' ) ); ?>" class="card" style="display: block;">
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
