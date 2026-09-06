// Service-detail pages: Consulta Pediátrica + Asesoría Genética + Servicios overview

function ConsultaPage() {
  return (<>
    <PageHero
      chipIcon="stethoscope" chipText="Consulta pediátrica general"
      title="Pediatría integral, del recién nacido al" titleHighlight="adolescente"
      lede="Atención médica completa para cada etapa del crecimiento, con la mirada de un pediatra con más de 35 años de experiencia."
      stats={[
        { l: "Edad", v: "0 – 18 años" },
        { l: "Duración", v: "30 – 45 min" },
        { l: "Modalidad", v: "Presencial" },
        { l: "Seguimiento", v: "Incluido" },
      ]}
    />
    <SplitSection
      imageLabel="consulta · pediatra con paciente"
      eyebrow="¿Qué incluye?"
      title="Una consulta completa, sin prisa"
      lede="Cada cita está pensada para conversar con los padres, examinar al niño y construir un plan de cuidado personalizado."
      body="No trabajamos con turnos de 10 minutos. Cada familia recibe el tiempo que necesita para que sus dudas queden resueltas y el plan de cuidado sea claro."
    />
    <CardGrid
      eyebrow="Áreas de atención"
      title="Lo que cubrimos en consulta"
      bg="var(--bg-soft)"
      items={[
        { icon: "baby", title: "Recién nacidos", desc: "Primer chequeo, lactancia, sueño, vacunación, hitos del primer año." },
        { icon: "heart", title: "Niño sano", desc: "Controles periódicos de crecimiento, desarrollo y alimentación." },
        { icon: "shield", title: "Vacunación", desc: "Calendario nacional y vacunas opcionales con asesoría individual." },
        { icon: "stethoscope", title: "Enfermedades comunes", desc: "Infecciones respiratorias, gastrointestinales, alergias, fiebre." },
        { icon: "dna", title: "Sospecha de causa genética", desc: "Evaluación inicial cuando el cuadro clínico sugiere una etiología genética." },
        { icon: "doc", title: "Reportes escolares", desc: "Certificados médicos, esquemas de vacunación, informes de salud." },
      ]}
      columns={3}
    />
    <StepGrid
      eyebrow="Cómo funciona"
      title="Tres pasos simples"
      steps={[
        { n: "1", title: "Agende su cita", desc: "Por WhatsApp o formulario. Confirmamos en menos de 24 horas." },
        { n: "2", title: "Consulta presencial", desc: "Examen físico, conversación con padres, plan claro." },
        { n: "3", title: "Seguimiento", desc: "Resultados, controles y comunicación posterior si es necesario." },
      ]}
    />
    <CTABand
      title="¿Listo para agendar la primera cita?"
      lede="Atendemos consultas pediátricas de lunes a viernes en Managua."
    />
  </>);
}

function GeneticaPage() {
  return (<>
    <PageHero
      chipIcon="dna" chipText="Asesoría genética familiar"
      title="Acompañamiento experto ante un" titleHighlight="diagnóstico genético"
      lede="Cuando una familia recibe —o sospecha— un diagnóstico genético, lo más valioso es información clara y un médico que escuche."
      stats={[
        { l: "Modalidad", v: "Presencial / online" },
        { l: "Duración", v: "60 – 90 min" },
        { l: "Para", v: "Familias y parejas" },
        { l: "Idiomas", v: "Español / Inglés" },
      ]}
    />
    <SplitSection
      imageLabel="asesoría · padres conversando con el doctor"
      eyebrow="¿Qué es la asesoría genética?"
      title="Información, no decisiones"
      lede="Es una consulta extendida donde explicamos qué significa un diagnóstico, cuáles son las probabilidades de recurrencia y qué opciones de seguimiento existen."
      body="Nuestro rol no es decidir por la familia, sino entregar información médica precisa y emocionalmente sostenible para que ustedes tomen decisiones informadas."
      mint
    />
    <CardGrid
      eyebrow="¿Cuándo consultarnos?"
      title="Situaciones donde la asesoría aporta claridad"
      bg="var(--bg-soft)"
      items={[
        { icon: "baby", title: "Tras un diagnóstico", desc: "Cuando un hijo recibe un diagnóstico genético y los padres necesitan entender el panorama completo." },
        { icon: "heart", title: "Antecedentes familiares", desc: "Historia de síndromes genéticos en la familia que podrían afectar a futuras generaciones." },
        { icon: "dna", title: "Pérdidas gestacionales", desc: "Pérdidas recurrentes que podrían tener una causa cromosómica o genética identificable." },
        { icon: "shield", title: "Planificación familiar", desc: "Parejas que desean conocer riesgos antes de un embarazo." },
        { icon: "doc", title: "Segunda opinión", desc: "Confirmación o reinterpretación de un diagnóstico previo." },
        { icon: "award", title: "Investigación clínica", desc: "Acceso a estudios y registros internacionales cuando son relevantes." },
      ]}
      columns={3}
    />
    <StepGrid
      eyebrow="El proceso"
      title="Tres etapas, sin presión"
      steps={[
        { n: "1", title: "Recopilación", desc: "Recolectamos historia familiar, estudios previos y antecedentes médicos." },
        { n: "2", title: "Consulta extendida", desc: "Una sesión de 60 a 90 minutos para explicar y resolver dudas." },
        { n: "3", title: "Plan de seguimiento", desc: "Estudios complementarios si aplica, y un canal abierto para preguntas posteriores." },
      ]}
    />
    <CTABand
      title="¿Necesita orientación genética para su familia?"
      lede="Solicite una primera conversación, sin compromiso."
    />
  </>);
}

function ServiciosPage() {
  const services = [
    { icon: "stethoscope", title: "Pediatría general", desc: "Enfermedades respiratorias, infecciosas, alérgicas, gastrointestinales, neurológicas. Sueño, alimentación, vacunas.", href: "consulta-pediatrica.html" },
    { icon: "dna", title: "Genética clínica", desc: "Anomalías congénitas, síndromes genéticos, Síndrome de Down, enfermedades raras, pacientes sin diagnóstico.", href: "asesoria-genetica.html", featured: true },
    { icon: "shield", title: "Tamizaje metabólico neonatal", desc: "Prueba del talón: detección preventiva de enfermedades metabólicas tratables antes de los síntomas.", href: "tamizaje.html", featured: true },
    { icon: "baby", title: "Cariotipo", desc: "Niños con anomalías congénitas, parejas con problemas de fertilidad, pérdidas recurrentes, leucemias.", href: "contacto.html" },
    { icon: "doc", title: "ADN fetal en sangre materna", desc: "Estudio no invasivo desde las 10 semanas. Detecta Síndrome de Down y otras alteraciones cromosómicas.", href: "contacto.html" },
    { icon: "heart", title: "Cáncer hereditario", desc: "Detección de genes relacionados a cáncer en familias con historia, para tratamientos tempranos.", href: "contacto.html" },
    { icon: "dna", title: "Microarrays", desc: "Indicación prenatal (líquido amniótico) o postnatal según el cuadro clínico.", href: "contacto.html" },
    { icon: "award", title: "Exomas y genomas completos", desc: "Los estudios genéticos más amplios. Para casos sin orientación clara o condiciones extremadamente raras.", href: "contacto.html" },
    { icon: "baby", title: "Compatibilidad genética de pareja", desc: "Evaluar riesgos de que la pareja comparta genes que puedan afectar a sus hijos.", href: "contacto.html" },
  ];
  return (<>
    <section style={{ paddingTop: 56, paddingBottom: 56, background: "linear-gradient(180deg, var(--bg-blue) 0%, var(--bg) 100%)" }}>
      <div className="container">
        <div className="chip" style={{ marginBottom: 24 }}>
          <Icon name="stethoscope" size={14}/> Servicios médicos
        </div>
        <h1 className="h1" style={{ marginBottom: 24, maxWidth: 1000 }}>
          Atención <span style={{ color: "var(--brand)" }}>pediátrica</span> y <span style={{ color: "var(--brand)" }}>genética</span> bajo un mismo techo
        </h1>
        <p className="lede" style={{ maxWidth: 640 }}>
          Seis áreas de práctica que cubren el espectro completo: desde un control de niño sano hasta un estudio genético complejo.
        </p>
      </div>
    </section>
    <section>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {services.map(s => (
            <a key={s.title} href={s.href} className={"card" + (s.featured ? " card-blue" : "")} style={{ display: "block" }}>
              <div className="icon-circle"><Icon name={s.icon}/></div>
              <h3 className="h4" style={{ marginBottom: 10 }}>{s.title}</h3>
              <p className="body" style={{ fontSize: 14.5, marginBottom: 20 }}>{s.desc}</p>
              <span className="btn-link">Ver más <Arrow/></span>
            </a>
          ))}
        </div>
      </div>
    </section>
    <CTABand
      title="¿No está seguro qué consulta necesita?"
      lede="Escríbanos y le orientamos sobre el servicio más adecuado para su caso."
    />
  </>);
}

Object.assign(window, { ConsultaPage, GeneticaPage, ServiciosPage });
