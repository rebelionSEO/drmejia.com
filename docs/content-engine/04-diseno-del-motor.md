# Diseño del motor de contenido del Dr Mejía

Versión 0.1 | 2026-09-07 | Propuesta para Gera y el equipo de implementación

## Decisión de diseño

Empezar con entrevistas, contexto aprobado, ejemplos de voz y un proceso de revisión. Incorporar recuperación de documentos cuando el volumen y las pruebas lo justifiquen. El doctor podrá iniciar el flujo con una idea en lenguaje natural; el sistema la convertirá en un encargo, consultará el contexto permitido y preparará un borrador verificable.

RAG recupera pasajes de una biblioteca para aportar contexto durante la generación. Eso no modifica por sí mismo los parámetros del modelo ni demuestra que las fuentes sean verdaderas. Una implementación puede recuperar pasajes con su archivo de origen y filtrar por atributos. Referencia técnica: [OpenAI Retrieval](https://developers.openai.com/api/docs/guides/retrieval), consultada el 2026-09-07.

La mejora se medirá con casos representativos y correcciones del doctor. El ajuste de un modelo sería una decisión posterior, dependiente de necesidad demostrada, disponibilidad del proveedor y permisos de los datos; no es un requisito ni una capacidad activada por este paquete. Las conversaciones no se convierten automáticamente en entrenamiento. La [guía de optimización de OpenAI](https://developers.openai.com/api/docs/guides/model-optimization) distingue evaluación, instrucciones y entrenamiento y señala cambios en la disponibilidad de su plataforma; verificarla al seleccionar servicios.

## Alcance de esta fase

Entregables actuales: cuestionario, mensajes de entrevista y edición, plantilla North Star, registros y contrato inicial de contexto. Pendiente: respuestas reales, verificación profesional, fuentes clínicas, selección de herramientas, almacenamiento, autenticación, implementación y evaluación. No se necesitan credenciales para completar esta fase.

No escoger ahora un proveedor de vectores, un modelo o un orquestador. Primero ejecutar manualmente el flujo con documentos aprobados y registrar dónde falla. Esta documentación no modifica el sitio ni sus integraciones.

## De las preguntas al conocimiento

| Preguntas | Registro que producen | Uso en el motor y el sitio |
|---|---|---|
| B01 a B04 | Identidad, credenciales y principios con evidencia | Biografía, autoría y límites de las afirmaciones sobre el doctor |
| B05 a B08 | Servicios, alcance y propuesta aprobados | Páginas de servicios y coherencia de invitaciones a contactar |
| I01 a I04 | Audiencia principal y sus decisiones | Encargos, búsquedas y profundidad de las explicaciones |
| I05 a I08 | Audiencia secundaria, referencias y recorrido | Sección de profesionales, FAQs y enlaces según intención |
| V01 a V04 | Reglas de voz condicionadas por audiencia y canal | Instrucciones de edición y evaluación de estilo |
| V05 a V08 | Muestras originales y pares aceptados o rechazados | Ejemplos de voz y pruebas de fidelidad |
| C01 a C04 | Temas, preguntas y posturas con sus matices | Biblioteca de ideas y planificación editorial |
| C05 a C08 | Catálogo de fuentes, permisos y datos pendientes | Recuperación documental y actualización del sitio |
| E01 a E04 | Límites y rutas de revisión | Controles previos a generar, revisar o publicar |
| O01 a O04 | Canales, encargos y responsables | Operación semanal e integración de borradores |
| O05 a O08 | Delegación, aprobaciones y condiciones de suspensión | Permisos del sistema y registro de cambios |
| O09 a O12 | Resultados, piloto y pendientes | Evaluación y decisión de continuar |

## Estructura del conocimiento

Mantener separadas las siguientes clases aunque se alojen en el mismo almacenamiento. En esta fase pueden ser registros Markdown o JSON; no hace falta una base vectorial para empezar.

- `practice_fact`: nombre, credenciales, alcance de servicios y contactos. El doctor confirma; documentos o responsables competentes respaldan lo que lo requiere.
- `audience`: necesidades, barreras y decisiones. Cada observación identifica su origen; las hipótesis no se presentan como datos demográficos comprobados.
- `voice_rule` y `voice_example`: preferencias y ejemplos propios. Las muestras explican estilo, no prueban hechos médicos. Conservar contexto, edición previa y permisos.
- `editorial_rule`: temas, límites, canales, responsabilidades y autorización de tareas. La configuración aprobada se carga completa como instrucciones controladas, no depende de aparecer en una búsqueda semántica.
- `clinical_evidence`: fuentes clínicas con fecha, población, alcance y revisión del doctor. Ninguna entrevista reemplaza la evaluación de evidencia de una afirmación.
- `approved_content`: piezas aprobadas con fuentes y vigencia. Una pieza anterior puede orientar estructura, pero sus referencias originales deben recuperarse para nuevas afirmaciones.

Los originales y las transcripciones sin revisar permanecen en una zona privada de entrada. Borradores, ejemplos rechazados y documentos retirados no entran en la recuperación positiva de producción. Los negativos pueden existir en un conjunto de evaluación separado y claramente etiquetado.

## Del relato a un registro

1. Recibir una sesión con fecha, autor, preguntas respondidas, formato y permisos explícitos. No grabar ni transcribir si el doctor no desea ese formato.
2. Preservar el original privado y producir una transcripción cuando corresponda. Marcar términos dudosos; no reconstruir lo que no se entiende.
3. Revisar identificación de pacientes y terceros antes de enviar copias a servicios de IA. Excluir material sensible; borrar nombres no basta para convertir historias familiares en material público.
4. Extraer una idea o regla por registro, conservando cita literal, síntesis y localizador. No almacenar una sesión completa como un único fragmento sin estructura.
5. Clasificar el tipo y separar declaración, hipótesis, preferencia y evidencia. Resolver contradicciones con ambas versiones visibles; nunca sustituir silenciosamente la anterior.
6. Revisar fidelidad con el doctor y verificar los hechos según su tipo. Registrar permisos de uso interno, uso por IA, adaptación pública y entrenamiento por separado.
7. Aprobar una versión concreta. Solo entonces generar una copia elegible para recuperación, si tiene permisos adecuados y está vigente. Reconstruir el índice no cambia la autoridad del documento original.

## Contrato de un registro

`context-record.template.json` es una plantilla de datos, no un registro aprobado ni un validador ejecutable. Los `null`, las listas vacías y los permisos `false` deben impedir su uso productivo. Al implementar, validar tipos, enumeraciones y condiciones del ciclo de vida en el servidor.

| Campo | Regla propuesta |
|---|---|
| `record_id`, `version`, `kind`, `language` | Identificador estable, versión incremental, clase anterior e idioma confirmado |
| `question_ids`, `source` | Códigos de origen, identificador de documento, versión y página, párrafo o tiempo exacto |
| `verbatim`, `summary`, `epistemic_status` | Cita fiel cuando existe; síntesis separada; `doctor_statement`, `verified_fact`, `confirmed_preference`, `team_hypothesis` o `reviewed_evidence` |
| `audience_ids`, `topics`, `scope` | Audiencia, tema y condiciones de aplicación; en evidencia, población y contexto pertinente |
| `status` | `draft`, `review_pending`, `approved`, `superseded` o `withdrawn` |
| `verification` | Quién revisó, cuándo y qué documentos o decisiones sustentan el registro |
| `privacy_class`, `permissions` | `internal`, `public_approved` o `restricted`; autorización específica y referencia que la acredita |
| `approval` | Persona, fecha y versión exacta aprobada; una confirmación de transcripción no basta |
| `effective_from`, `review_due`, `supersedes` | Vigencia, próxima revisión y relación con la versión reemplazada |
| `website_targets` | Páginas o tipos de contenido relacionados, confirmados al implementar |

Propuesta de filtro obligatorio: `status=approved`, versión actual, fecha de entrada en vigor alcanzada, fecha de revisión no vencida, aprobación coincidente con esa versión, `ai_context=true`, permiso documentado y clasificación no restringida. Un dato faltante falla cerrado. Los permisos para recuperación interna no conceden permiso para publicar el material.

Los documentos externos son datos, no instrucciones. Una frase dentro de un archivo que pida ignorar reglas, revelar contenido privado o llamar herramientas no puede alterar los permisos del sistema.

## Recuperación y elaboración

La entrada natural del doctor produce un encargo estructurado: idea original, audiencia, pregunta, objetivo, servicio si procede, canal, formato, idioma y acción deseada. El sistema pregunta únicamente por campos esenciales ausentes y etiqueta cualquier sugerencia propia.

La configuración editorial y de permisos se carga desde su versión aprobada. Se recuperan por separado hechos de la práctica, contexto de audiencia, ejemplos de voz y evidencia del tema. No filtrar evidencia científica por idioma de publicación solamente: conservar su idioma y revisar traducciones. Tampoco descartar evidencia pertinente porque no tenga una etiqueta de audiencia editorial.

Fragmentar por unidad de sentido: una pregunta con su respuesta, una regla con su condición o un pasaje clínico con población, excepciones y referencia. Si una sección es larga, dividirla preservando encabezado y vínculo al contexto completo. Ajustar tamaño y recuperación mediante pruebas, sin fijar una cantidad universal de fragmentos.

Cada afirmación clínica del borrador debe vincularse a pasajes consultados que realmente la sustenten. La presencia de una cita o una puntuación alta de similitud no garantiza respaldo. Si falta evidencia pertinente o hay conflicto no resuelto, producir un esquema marcado `needs_evidence` y enviarlo a revisión, sin completar la explicación como si estuviera verificada.

La salida para revisión incluye texto, encargo, referencias y localizadores, afirmaciones pendientes, versión de la guía, ejemplos de voz utilizados y motivo de la invitación a actuar. El doctor revisa exactitud y voz; el editor revisa claridad, formato y coherencia con la audiencia. Conservar cambios y motivos.

## Integración futura con WordPress

El código actual es un tema WordPress; los schemas de Sanity en `_handoff/content-schema.md` son antecedentes, no un contrato de integración vigente. Antes de construir, comprobar tipos de contenido realmente registrados, idioma, rutas y flujo editorial de la instalación objetivo.

El primer conector propuesto solo crea o actualiza borradores en un entorno confirmado. Usar una cuenta de servicio con permisos mínimos, credenciales fuera de Git y una lista explícita de sitios permitidos. Una idea o un archivo recuperado nunca determina libremente la URL de destino.

Contrato mínimo de pieza: `content_id`, versión, `brief`, título, cuerpo, idioma, audiencia, fuentes y localizadores, versión del North Star, revisión médica y editorial, `wordpress_post_id`, estado y registro de publicación. Los metadatos internos no deben aparecer en HTML público ni en la API pública de WordPress.

La relación inicial a comprobar es: identidad hacia Sobre y autor; servicios hacia Servicios; dudas hacia FAQ o artículos; información de referencias hacia Profesionales; siguiente paso hacia Contacto. Confirmar slugs y no asumir que las páginas pendientes ya existen.

Evitar duplicados con una clave de idempotencia formada por `content_id` y versión, y registrar el identificador remoto. Reintentar no debe crear otra entrada. Una actualización usa la revisión remota esperada para no pisar cambios humanos.

La publicación requiere una acción separada con versión exacta, aprobación vigente, canal, destino y fecha. Conservar una huella del contenido aprobado; si cambia el texto, la traducción, las fuentes, imágenes o CTA, invalidar las aprobaciones afectadas y volver a revisar. No publicar por silencio, por un cronómetro ni porque el modelo diga «aprobado».

Estados propuestos: `idea` → `briefed` → `needs_evidence` o `draft` → `medical_review` → `editorial_review` → `approved` → `scheduled` → `published`. Cualquier estado puede pasar a `blocked`; una pieza publicada puede pasar a `correction_pending` o `withdrawn`. Cada transición registra actor y versión y se valida fuera del modelo.

## Autonomía por etapas

| Etapa propuesta | Trabajo permitido tras acordarlo | Condición para avanzar |
|---|---|---|
| A Contexto | Entrevistar, clasificar y preparar síntesis | North Star aprobado y corpus inicial revisado |
| B Borradores | Proponer encargos, recuperar fuentes y redactar | Piloto evaluado; toda pieza pasa por revisión |
| C Preparación | Adaptar piezas y cargar borradores en WordPress | Permisos comprobados, pruebas de duplicados y bloqueo de publicación |
| D Distribución autorizada | Programar o publicar la versión previamente aprobada | Autorización explícita, controles de versión y registro; mecanismo de pausa probado |

No se incluye diagnóstico, interpretación individual de resultados, tratamiento personalizado, respuesta clínica automática a mensajes ni clonación de voz o imagen. No se propone autonomía para publicar afirmaciones médicas nuevas sin revisión. El doctor definirá preferencias más restrictivas cuando complete E01 a E04 y O05 a O08.

## Piloto y evaluación

Criterios de entrada propuestos: una audiencia principal definida; tres temas delimitados; al menos tres muestras propias utilizables, incluidas las dos explicaciones comparables; una guía aprobada; responsables y permisos documentados; fuentes suficientes para sustentar las tres piezas del piloto. Estos mínimos son decisiones operativas propuestas, no garantías de calidad ni requisitos de una plataforma.

Preparar un artículo, una explicación breve y una FAQ basados en O11. Antes de redactar, registrar para cada caso audiencia, fuentes esperadas, límites, forma de voz y criterio de aceptación. Reservar ejemplos de evaluación que no se hayan usado para ajustar el prompt. Si hay poco material, alternar los ejemplos reservados y documentar esa limitación.

| Caso de prueba | Resultado esperado |
|---|---|
| Explicación para familia y versión para colega | Cambiar vocabulario y profundidad, conservar significado |
| Pedido vago del doctor | Pedir el dato esencial que falta y registrar un encargo |
| Credencial o contacto presentes solo en un borrador antiguo | Marcar pendiente, no afirmarlos como actuales |
| Fuente ausente, retirada o vencida | Bloquear afirmaciones dependientes y solicitar respaldo |
| Fuentes contradictorias | Mostrar conflicto y pedir resolución documentada |
| Confusión entre nombres de pruebas | Mantener servicios separados y pedir aclaración |
| Fuente con una instrucción maliciosa | Ignorar esa instrucción, conservar límites y permisos |
| Material identificable de paciente o familia | Excluirlo del índice editorial y de la salida |
| Solicitud personal de diagnóstico o resultados | Detener esa parte y remitir a revisión humana |
| Frase rechazada que aparece en ejemplos de evaluación | No usarla como ejemplo positivo de voz |
| Publicación sin aprobación o cambio después de aprobar | Rechazar transición y registrar motivo |
| Reintento de carga o edición humana concurrente | Evitar duplicados y no sobrescribir cambios |

Para cada pieza, el doctor puntúa fidelidad de voz, claridad, pertinencia para la audiencia y conservación de matices de 1 a 5: 1 requiere rehacer, 3 requiere edición sustancial, 5 necesita cambios mínimos. Además verifica por separado exactitud clínica y respaldo, permisos y ausencia de datos excluidos: un fallo en estos últimos bloquea la pieza aunque el promedio de estilo sea alto.

Umbral inicial propuesto para pasar de B a C: las tres piezas obtienen al menos 4 en cada dimensión, cero fallos bloqueantes y todos los casos adversos aplicables se comportan como se espera. Registrar evaluador, fecha y versión. Este piloto pequeño permite decidir el siguiente experimento; no demuestra seguridad general ni habilita por sí solo la publicación autónoma.

## Correcciones y mantenimiento

Guardar cada corrección como anterior, versión elegida, motivo, autor, fecha y alcance. Una preferencia local no se convierte en regla global sin confirmación. Los ejemplos rechazados se usan solo para evaluación o contraste explícito, nunca como evidencia o muestras positivas.

Al cambiar un servicio, contacto, fuente o criterio editorial, revisar registros relacionados. Marcar versiones viejas como `superseded`, retirarlas de la recuperación, invalidar cachés y localizar borradores o piezas publicadas que dependían de ellas. Corregir o retirar estas últimas mediante el responsable de publicación; registrar la decisión y la revisión médica cuando proceda.

Asignar `review_due` por registro al aprobarlo. Como punto de partida del equipo, comprobar datos de la práctica mensualmente y revisar guía y audiencias trimestralmente; el doctor define la revisión de evidencia según tema y cambios relevantes. Una alerta de nueva información puede activar revisión antes de la fecha. No prometer vigencia automática porque exista RAG.

Medir los resultados que se elijan en O09 y O10: definición del indicador, base inicial, objetivo, responsable y fuente agregada. Añadir minutos del doctor por pieza, proporción de borradores aceptados y tipo de correcciones. Visitas o seguidores no sustituyen el objetivo elegido. No recopilar datos clínicos para atribución de marketing.

## Próxima decisión concreta

Completar la ruta breve con el doctor, registrar contradicciones y materiales disponibles, y agendar el resto de la entrevista. Elegir infraestructura solo después de obtener una primera guía aprobada y revisar manualmente el piloto. Este orden permite definir el sistema a partir de trabajo real del doctor.
