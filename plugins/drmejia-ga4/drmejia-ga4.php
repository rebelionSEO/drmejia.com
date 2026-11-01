<?php
/**
 * Plugin Name: Dr. Mejía GTM
 * Description: Loads the dedicated Google Tag Manager container for doctorgerardomejia.com.
 * Version: 3.4.0
 * Author: Dr. Gerardo Mejía
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'DRMEJIA_GTM_CONTAINER_ID', 'GTM-PSK4HJZL' );

/**
 * Add the GTM loader as high in the document head as WordPress allows.
 */
function drmejia_gtm_head() {
	if ( is_admin() ) {
		return;
	}
	?>
	<!-- Google Consent Mode v2 defaults -->
	<script>
	window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
	(function(){
		var saved='';try{saved=localStorage.getItem('drmejia_analytics_consent')||'';}catch(e){}
		gtag('consent','default',{
			analytics_storage:saved==='granted'?'granted':'denied',
			ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',
			functionality_storage:'granted',security_storage:'granted',wait_for_update:500
		});
	})();
	</script>
	<!-- End Google Consent Mode v2 defaults -->
	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','<?php echo esc_js( DRMEJIA_GTM_CONTAINER_ID ); ?>');</script>
	<!-- End Google Tag Manager -->
	<?php
}
add_action( 'wp_head', 'drmejia_gtm_head', 1 );

/**
 * Add the GTM no-script fallback immediately after the opening body tag.
 */
function drmejia_gtm_body() {
	if ( is_admin() ) {
		return;
	}
	?>
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo esc_attr( DRMEJIA_GTM_CONTAINER_ID ); ?>"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
	<?php
}
add_action( 'wp_body_open', 'drmejia_gtm_body', 1 );

/**
 * Provide page-specific SEO metadata while preserving Rank Math schema output.
 */
function drmejia_seo_metadata() {
	return array(
		'home' => array(
			'title' => 'Dr. Gerardo Mejía | Genética Médica en Nicaragua',
			'description' => 'Orientación especializada en genética médica para familias y profesionales de la salud en Nicaragua, con amplia experiencia pediátrica.',
		),
		'sobre' => array(
			'title' => 'Sobre el Dr. Gerardo Mejía | Médico Genetista y Pediatra',
			'description' => 'Conozca la trayectoria del Dr. Gerardo Mejía, médico genetista y pediatra dedicado a las familias y la medicina en Nicaragua.',
		),
		'tamizaje' => array(
			'title' => 'Tamizaje Metabólico Neonatal en Nicaragua | Dr. Mejía',
			'description' => 'Tamizaje metabólico neonatal para detectar tempranamente enfermedades tratables. Orientación médica especializada para recién nacidos y sus familias.',
		),
		'servicios' => array(
			'title' => 'Servicios de Genética Médica y Pediatría | Dr. Mejía',
			'description' => 'Información sobre evaluación genética, tamizaje metabólico neonatal y atención pediátrica con el Dr. Gerardo Mejía en Nicaragua.',
		),
		'blog' => array(
			'title' => 'Recursos de Genética Médica y Pediatría | Dr. Mejía',
			'description' => 'Recursos educativos de genética médica, tamizaje neonatal y temas pediátricos relacionados, revisados antes de su publicación.',
		),
		'contacto' => array(
			'title' => 'Contacto y Citas | Dr. Gerardo Mejía en Managua',
			'description' => 'Consulte la información para solicitar una cita de genética médica o pediatría con el Dr. Gerardo Mejía en Managua, Nicaragua.',
		),
		'faq' => array(
			'title' => 'Preguntas Frecuentes | Genética Médica y Pediatría',
			'description' => 'Información administrativa y educativa sobre genética médica, pediatría, tamizaje neonatal y solicitudes de cita.',
		),
		'profesionales' => array(
			'title' => 'Información para Profesionales | Dr. Gerardo Mejía',
			'description' => 'Información para médicos y profesionales que desean referir pacientes para evaluación pediátrica, genética médica o estudios especializados.',
		),
		'legal' => array(
			'title' => 'Privacidad, Cookies y Términos | Dr. Gerardo Mejía',
			'description' => 'Política de privacidad, tratamiento de datos, uso de cookies y términos del sitio web del Dr. Gerardo Mejía.',
		),
	);
}

function drmejia_current_seo_value( $field, $default ) {
	if ( is_front_page() ) {
		$metadata = drmejia_seo_metadata();
		return $metadata['home'][ $field ];
	}
	foreach ( drmejia_seo_metadata() as $slug => $metadata ) {
		if ( 'home' === $slug ) {
			continue;
		}
		if ( is_page( $slug ) ) {
			return $metadata[ $field ];
		}
	}
	return $default;
}

function drmejia_rank_math_title( $title ) {
	return drmejia_current_seo_value( 'title', $title );
}
add_filter( 'rank_math/frontend/title', 'drmejia_rank_math_title', 20 );
add_filter( 'rank_math/opengraph/facebook/og_title', 'drmejia_rank_math_title', 20 );
add_filter( 'rank_math/opengraph/twitter/twitter_title', 'drmejia_rank_math_title', 20 );

function drmejia_rank_math_description( $description ) {
	return drmejia_current_seo_value( 'description', $description );
}
add_filter( 'rank_math/frontend/description', 'drmejia_rank_math_description', 20 );
add_filter( 'rank_math/opengraph/facebook/og_description', 'drmejia_rank_math_description', 20 );
add_filter( 'rank_math/opengraph/twitter/twitter_description', 'drmejia_rank_math_description', 20 );

function drmejia_social_image( $image ) {
	// El artículo neonatal usa su imagen social de Rank Math.
	if ( is_single( 56 ) ) {
		return $image;
	}
	return plugins_url( 'assets/drmejia-social.png', __FILE__ );
}
add_filter( 'rank_math/opengraph/facebook/og_image', 'drmejia_social_image', 20 );
add_filter( 'rank_math/opengraph/twitter/twitter_image', 'drmejia_social_image', 20 );

function drmejia_social_image_meta() {
	if ( is_admin() || is_single( 56 ) ) {
		return;
	}
	$image = plugins_url( 'assets/drmejia-social.png', __FILE__ );
	?>
	<meta property="og:image" content="<?php echo esc_url( $image ); ?>">
	<meta property="og:image:width" content="1200">
	<meta property="og:image:height" content="630">
	<meta property="og:image:type" content="image/png">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:image" content="<?php echo esc_url( $image ); ?>">
	<?php
}
add_action( 'wp_head', 'drmejia_social_image_meta', 30 );

/**
 * Correct Rank Math's entity model and locale for the physician-owned website.
 * The current consultation location is not represented as a clinic owned by the doctor.
 */
function drmejia_correct_rank_math_schema( $data ) {
	foreach ( $data as $key => $entity ) {
		if ( ! is_array( $entity ) ) {
			continue;
		}

		if ( isset( $entity['@type'] ) && 'Place' === $entity['@type'] ) {
			unset( $data[ $key ] );
			continue;
		}

		if ( isset( $entity['inLanguage'] ) ) {
			$data[ $key ]['inLanguage'] = 'es-NI';
		}

		if ( isset( $entity['@id'] ) && home_url( '/#organization' ) === $entity['@id'] ) {
			$data[ $key ] = array(
				'@type'       => 'Person',
				'@id'         => home_url( '/#organization' ),
				'name'        => 'Dr. Gerardo Mejía',
				'jobTitle'    => 'Médico genetista y pediatra',
				'email'       => 'mailto:consultas@doctorgerardomejia.com',
				'description' => 'Médico genetista y pediatra en Nicaragua.',
				'url'         => home_url( '/' ),
			);
		}
	}

	return $data;
}
add_filter( 'rank_math/json_ld', 'drmejia_correct_rank_math_schema', 99 );

/**
 * Securely process the appointment form included in the custom theme.
 */
function drmejia_handle_appointment() {
	if ( ! isset( $_POST['drmejia_appointment_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['drmejia_appointment_nonce'] ) ), 'drmejia_appointment' ) ) {
		wp_send_json_error( array( 'message' => 'La sesión del formulario expiró. Recargue la página e inténtelo nuevamente.' ), 403 );
	}

	if ( ! empty( $_POST['website'] ) ) {
		wp_send_json_error( array( 'message' => 'No se pudo procesar la solicitud.' ), 400 );
	}

	$remote_ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : 'unknown';
	$rate_key  = 'drmejia_form_' . md5( wp_salt( 'nonce' ) . $remote_ip );
	$attempts  = (int) get_transient( $rate_key );
	if ( $attempts >= 3 ) {
		wp_send_json_error( array( 'message' => 'Demasiados intentos. Espere unos minutos antes de volver a enviar.' ), 429 );
	}
	set_transient( $rate_key, $attempts + 1, 10 * MINUTE_IN_SECONDS );

	$parent = isset( $_POST['parent'] ) ? sanitize_text_field( wp_unslash( $_POST['parent'] ) ) : '';
	$phone  = isset( $_POST['phone'] ) ? sanitize_text_field( wp_unslash( $_POST['phone'] ) ) : '';
	$email  = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
	$child  = isset( $_POST['child'] ) ? sanitize_text_field( wp_unslash( $_POST['child'] ) ) : '';
	$age    = isset( $_POST['age'] ) ? sanitize_text_field( wp_unslash( $_POST['age'] ) ) : '';
	$reason = isset( $_POST['reason'] ) ? sanitize_key( wp_unslash( $_POST['reason'] ) ) : '';
	$notes  = isset( $_POST['notes'] ) ? sanitize_textarea_field( wp_unslash( $_POST['notes'] ) ) : '';

	if ( '' === $parent || '' === $phone || '' === $reason ) {
		wp_send_json_error( array( 'message' => 'Complete el nombre, teléfono y tipo de consulta.' ), 422 );
	}

	$reason_labels = array(
		'general'  => 'Consulta pediátrica general',
		'control'  => 'Control de niño sano',
		'genetic'  => 'Asesoría genética',
		'karyotype'=> 'Estudio de cariotipo / tamizaje',
		'second'   => 'Segunda opinión',
		'other'    => 'Otro motivo',
	);
	$reason_text = isset( $reason_labels[ $reason ] ) ? $reason_labels[ $reason ] : $reason;
	$subject = 'Nueva solicitud de cita — ' . $parent;
	$message = "Nueva solicitud recibida desde doctorgerardomejia.com\n\n";
	$message .= "Padre/madre: {$parent}\nTeléfono: {$phone}\nCorreo: {$email}\nPaciente: {$child}\nEdad: {$age}\nTipo: {$reason_text}\n\nNotas:\n{$notes}\n";
	$headers = array( 'Content-Type: text/plain; charset=UTF-8' );
	if ( $email ) {
		$headers[] = 'Reply-To: ' . $parent . ' <' . $email . '>';
	}

	if ( ! wp_mail( get_option( 'admin_email' ), $subject, $message, $headers ) ) {
		wp_send_json_error( array( 'message' => 'No fue posible enviar la solicitud. Inténtelo nuevamente o comuníquese por teléfono.' ), 500 );
	}

	wp_send_json_success( array( 'message' => 'Solicitud enviada correctamente. Le contactaremos dentro de las próximas 24 horas hábiles.' ) );
}
add_action( 'admin_post_nopriv_drmejia_appointment', 'drmejia_handle_appointment' );
add_action( 'admin_post_drmejia_appointment', 'drmejia_handle_appointment' );

/**
 * Create the page records required by the theme's existing static templates.
 */
function drmejia_ensure_static_pages() {
	if ( '3.2.0' === get_option( 'drmejia_static_pages_version' ) ) {
		return;
	}

	$pages = array(
		'faq'           => 'Preguntas frecuentes',
		'profesionales' => 'Para profesionales',
		'legal'         => 'Privacidad y términos',
	);

	foreach ( $pages as $slug => $title ) {
		if ( ! get_page_by_path( $slug, OBJECT, 'page' ) ) {
			wp_insert_post(
				array(
					'post_type'    => 'page',
					'post_status'  => 'publish',
					'post_title'   => $title,
					'post_name'    => $slug,
					'post_content' => '',
				)
			);
		}
	}

	update_option( 'drmejia_static_pages_version', '3.2.0', false );
}
add_action( 'init', 'drmejia_ensure_static_pages', 5 );

/**
 * Keep unfinished service-detail URLs from becoming dead ends.
 */
function drmejia_redirect_service_placeholders() {
	if ( ! is_404() ) {
		return;
	}

	$path = trim( (string) wp_parse_url( isset( $_SERVER['REQUEST_URI'] ) ? wp_unslash( $_SERVER['REQUEST_URI'] ) : '', PHP_URL_PATH ), '/' );
	if ( in_array( $path, array( 'servicios/consulta-pediatrica', 'servicios/asesoria-genetica', 'servicios/cancer-hereditario' ), true ) ) {
		wp_safe_redirect( home_url( '/servicios/' ), 301 );
		exit;
	}
	if ( 'servicios/tamizaje' === $path ) {
		wp_safe_redirect( home_url( '/tamizaje/' ), 301 );
		exit;
	}
}
add_action( 'template_redirect', 'drmejia_redirect_service_placeholders', 1 );

/**
 * Add a compact, accessible analytics-consent banner and form conversion event.
 */
function drmejia_privacy_tools() {
	if ( is_admin() ) {
		return;
	}
	?>
	<style>
	#drmejia-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:760px;margin:auto;padding:18px 20px;border-radius:14px;background:#fff;color:#17324d;box-shadow:0 10px 40px rgba(16,45,73,.22);font:500 14px/1.5 system-ui,sans-serif}
	#drmejia-consent[hidden]{display:none}#drmejia-consent p{margin:0 0 14px}#drmejia-consent-actions{display:flex;gap:10px;flex-wrap:wrap}
	#drmejia-consent button{border:1px solid #1e5ba8;border-radius:999px;padding:9px 16px;font:700 14px system-ui,sans-serif;cursor:pointer}
	#drmejia-consent-accept{background:#1e5ba8;color:#fff}#drmejia-consent-reject{background:#fff;color:#1e5ba8}
	</style>
	<div id="drmejia-consent" role="dialog" aria-label="Preferencias de privacidad" aria-live="polite" hidden>
		<p>Usamos analítica para entender cómo se utiliza este sitio y mejorarlo. No activaremos las cookies de analítica sin su permiso.</p>
		<div id="drmejia-consent-actions">
			<button id="drmejia-consent-accept" type="button">Aceptar analítica</button>
			<button id="drmejia-consent-reject" type="button">Continuar sin analítica</button>
		</div>
	</div>
	<script>
	(function(){
		var key='drmejia_analytics_consent',banner=document.getElementById('drmejia-consent');
		function saved(){try{return localStorage.getItem(key)||'';}catch(e){return '';}}
		function setConsent(value){
			try{localStorage.setItem(key,value);}catch(e){}
			gtag('consent','update',{analytics_storage:value==='granted'?'granted':'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
			banner.hidden=true;
		}
		if(!saved()){banner.hidden=false;}
		document.getElementById('drmejia-consent-accept').addEventListener('click',function(){setConsent('granted');});
		document.getElementById('drmejia-consent-reject').addEventListener('click',function(){setConsent('denied');});
		document.addEventListener('wpcf7mailsent',function(event){
			window.dataLayer=window.dataLayer||[];
			window.dataLayer.push({event:'generate_lead',form_id:String(event.detail&&event.detail.contactFormId||''),form_status:'sent'});
		});

		var appointmentForm=document.querySelector('form.form-stack[action^="mailto:"]');
		if(appointmentForm){
			appointmentForm.addEventListener('submit',function(event){
				event.preventDefault();
				var submit=appointmentForm.querySelector('button[type="submit"]');
				var output=appointmentForm.querySelector('.drmejia-form-response');
				if(!output){output=document.createElement('p');output.className='drmejia-form-response';output.setAttribute('role','status');appointmentForm.appendChild(output);}
				submit.disabled=true;output.textContent='Enviando solicitud…';
				var payload=new FormData(appointmentForm);
				payload.append('action','drmejia_appointment');
				payload.append('drmejia_appointment_nonce','<?php echo esc_js( wp_create_nonce( 'drmejia_appointment' ) ); ?>');
				payload.append('website','');
				fetch('<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>',{method:'POST',body:payload,credentials:'same-origin'})
					.then(function(response){return response.json();})
					.then(function(result){
						if(!result.success){throw new Error(result.data&&result.data.message||'No fue posible enviar la solicitud.');}
						output.textContent=result.data.message;appointmentForm.reset();
						window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'generate_lead',form_id:'appointment',form_status:'sent'});
					})
					.catch(function(error){output.textContent=error.message;})
					.finally(function(){submit.disabled=false;});
			});
		}
	})();
	</script>
	<?php
}
add_action( 'wp_footer', 'drmejia_privacy_tools', 99 );
