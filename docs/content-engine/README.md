# Fundamentos del motor de contenido

Estado: kit de descubrimiento listo para completar; contexto del doctor aún no aprobado. Fecha: 2026-09-07.

Este paquete prepara el contexto necesario para un futuro motor de contenido conectado al sitio del Dr. Mejía. El primer trabajo es entrevistar al doctor, verificar hechos y convertir sus respuestas en una guía que él reconozca y apruebe. No se ha implementado RAG, entrenado un modelo, conectado cuentas ni activado publicación automática.

## Qué compartir con el doctor

1. [Cuaderno de preguntas](01-cuaderno-del-doctor.md), también en [Word editable](entregables/01-cuaderno-del-doctor.docx). Es el punto de partida: 48 preguntas en cuatro sesiones, con una ruta breve de 12 preguntas.
2. [Guía de conversaciones](02-guia-de-conversaciones.md), también en [Word](entregables/02-guia-de-conversaciones.docx). Incluye mensajes listos para entrevistar, sintetizar respuestas y trabajar futuras ideas.
3. [Plantilla North Star](03-north-star.template.md), también en [Word editable](entregables/03-north-star.docx). La completa el equipo después de las entrevistas y la revisa el doctor; no es un segundo cuestionario.

Los documentos están en español por el contexto del sitio y su audiencia propuesta. El cuaderno pregunta por las preferencias reales de idioma y trato. Los Word son copias generadas de los Markdown de esta carpeta; estos últimos son las fuentes editables del kit en Git. Las respuestas completadas deben conservarse aparte, sin sobrescribir estas plantillas.

## Cómo empezar esta semana

1. Gera comparte los documentos 01 y 02 con su papá por el medio que prefieran. Este paquete no se ha enviado a terceros.
2. El doctor responde la ruta breve por escrito o en una conversación. No necesita acceder a GitHub ni aprender herramientas técnicas.
3. Gera conserva el registro de respuestas y separa palabras literales, resúmenes, permisos y pendientes. El doctor confirma que el registro es fiel.
4. El equipo completa progresivamente las cuatro sesiones, solicita documentos de respaldo y prepara el North Star con referencias a las respuestas.
5. El doctor aprueba las decisiones pertinentes y revisa tres piezas de prueba antes de usar la guía en un flujo repetible.

Estimación orientativa: cuatro sesiones de 35 a 50 minutos, más recopilación de materiales y revisión de la síntesis. Puede repartirse en varias semanas. La ruta breve permite descubrir prioridades; no satisface por sí sola los criterios del piloto.

## Para quien construirá el motor

- [Diseño operativo y técnico](04-diseno-del-motor.md): estructura del conocimiento, extracción, revisión, integración con WordPress y criterios para ampliar autonomía.
- [Registro de materiales y decisiones](05-registros.template.md): inventario, contradicciones, permisos y correcciones que el equipo debe mantener.
- [Plantilla de registro estructurado](context-record.template.json): campos propuestos para convertir contexto aprobado en unidades recuperables con procedencia.

El diseño técnico es una propuesta. Sus reglas iniciales de revisión y sus umbrales de prueba no son preferencias ya expresadas por el doctor. El sistema futuro deberá imponer los permisos fuera del prompt.

## Qué sabemos del proyecto

El [README del sitio](../../README.md) describe WordPress con un tema propio en `theme/drmejia`. Los archivos de `_handoff` conservan propuestas de Sanity y el [documento de copy](../../_handoff/content.md) etiqueta textos como aprobados. Esa etiqueta histórica no proporciona constancia actual del doctor ni acredita vigencia médica: aquí se conservan como antecedentes por confirmar.

Pendientes iniciales: confirmar dominio público; nombre y credenciales; alcance de cada servicio; la terminología de tamizaje y cariotipo; datos de contacto; preferencias reales de voz; audiencia prioritaria; fuentes clínicas y permisos. No incorporar placeholders del sitio a contenido nuevo.

## Dónde guardar respuestas y qué sincronizar

El repositorio privado sirve para plantillas, documentación del sistema y versiones revisadas de contexto no sensible cuya inclusión se haya autorizado. No es el archivo de expedientes ni la biblioteca de grabaciones originales. Que sea privado no elimina la necesidad de controlar qué contiene.

Use un almacenamiento privado acordado para respuestas originales, grabaciones y documentos pendientes de clasificación, con acceso limitado al doctor y al coordinador. Registre un identificador interno del material; no publique enlaces de acceso abierto. Los documentos que se entreguen a un modelo deben ser copias revisadas con el mínimo contenido necesario.

Se ha reservado `private-working/`, ignorado por Git, para copias temporales locales. Esa carpeta no se sincroniza ni constituye un respaldo: el equipo debe acordar una copia privada y su retención. Las plantillas no contienen respuestas del doctor, datos de pacientes ni permisos concedidos.

## Entrega del contexto

El contexto estará listo para el piloto cuando haya una guía versionada aprobada, datos profesionales comprobados para las piezas elegidas, una audiencia principal definida, muestras de voz con permisos, fuentes pertinentes revisadas y responsables de revisión identificados. El documento 04 concreta los criterios. Más documentos no sustituyen estos requisitos.
