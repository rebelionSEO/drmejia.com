<?php
/**
 * Template Name: Preguntas frecuentes (FAQ)
 *
 * @package DrMejia
 */

get_header();
?>

<section class="page-hero">
    <div class="container">
        <span class="chip" style="margin-bottom: 24px;"><?php esc_html_e( 'Preguntas frecuentes', 'drmejia' ); ?></span>
        <h1><?php esc_html_e( 'Respuestas a las dudas más comunes', 'drmejia' ); ?></h1>
        <p class="lede"><?php esc_html_e( 'Si su pregunta no aparece aquí, escríbanos por WhatsApp y le respondemos directamente.', 'drmejia' ); ?></p>
    </div>
</section>

<?php
$faq_groups = array(
    'consulta' => array(
        'label' => __( 'La consulta', 'drmejia' ),
        'items' => array(
            array( 'q' => __( '¿Cómo agendo una cita?', 'drmejia' ),                'a' => __( 'Por WhatsApp al 8884-2159, llamando a la clínica o usando el formulario de contacto. Las citas se confirman llamando a la clínica.', 'drmejia' ) ),
            array( 'q' => __( '¿Cuál es el horario de atención?', 'drmejia' ),     'a' => __( 'Lunes a viernes, 12:00 a 1:00 PM y 3:00 a 6:00 PM; sábados de 8:00 AM a 12:00 PM, en Clínica Perinatal, Managua.', 'drmejia' ) ),
            array( 'q' => __( '¿Atienden consultas virtuales?', 'drmejia' ),       'a' => __( 'Sí. Ofrecemos teleconsulta para pacientes fuera de Managua y fuera de Nicaragua, segundas opiniones, asesoría genética y seguimiento de casos previamente evaluados.', 'drmejia' ) ),
            
        ),
    ),
    'pediatria' => array(
        'label' => __( 'Pediatría', 'drmejia' ),
        'items' => array(
            array( 'q' => __( '¿Atienden a pacientes adultos?', 'drmejia' ),       'a' => __( 'Sí. En genética se atiende a cualquier edad. La consulta pediátrica general es de 0 a 18 años.', 'drmejia' ) ),
            array( 'q' => __( '¿Hacen control de niño sano?', 'drmejia' ),         'a' => __( 'Sí. Es parte central de la práctica pediátrica: crecimiento, desarrollo, alimentación, sueño, vacunas y prevención.', 'drmejia' ) ),
        ),
    ),
    'genetica' => array(
        'label' => __( 'Genética y estudios', 'drmejia' ),
        'items' => array(
            array( 'q' => __( '¿Qué estudios genéticos realizan?', 'drmejia' ),    'a' => __( 'Cariotipo, microarrays, ADN fetal en sangre materna, exomas y genomas completos, tamizaje neonatal (prueba del talón), estudios de cáncer hereditario y compatibilidad genética de pareja.', 'drmejia' ) ),
            array( 'q' => __( '¿Cuándo es necesario un cariotipo?', 'drmejia' ),   'a' => __( 'Ante anomalías congénitas, retraso del desarrollo, abortos recurrentes, antecedentes familiares de condiciones genéticas, o como parte de un diagnóstico de síndromes específicos.', 'drmejia' ) ),
            array( 'q' => __( '¿El tamizaje neonatal es obligatorio?', 'drmejia' ),'a' => __( 'No es obligatorio por ley en todos los casos, pero es altamente recomendado: detecta enfermedades tratables antes de que aparezcan síntomas.', 'drmejia' ) ),
        ),
    ),
);
?>

<section class="section">
    <div class="container" style="max-width: 880px;">
        <?php foreach ( $faq_groups as $group_id => $group ) : ?>
            <div id="<?php echo esc_attr( $group_id ); ?>" style="margin-bottom: var(--s-8);">
                <h2 style="margin-bottom: var(--s-5);"><?php echo esc_html( $group['label'] ); ?></h2>
                <div class="faq-list">
                    <?php foreach ( $group['items'] as $f ) : ?>
                        <details class="card">
                            <summary><?php echo esc_html( $f['q'] ); ?></summary>
                            <p class="body"><?php echo esc_html( $f['a'] ); ?></p>
                        </details>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</section>

<?php get_footer(); ?>
