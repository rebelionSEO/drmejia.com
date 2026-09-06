// Auxiliary pages: Article template, Profesionales, FAQ, Legal, 404

function ArticlePage() {
  return (<>
    <article style={{ paddingTop: 56, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <a href="blog.html" className="btn-link" style={{ marginBottom: 24 }}>← Todas las publicaciones</a>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <span className="chip" style={{ background: "var(--accent-soft)", color: "#0E8576" }}>Genética</span>
          <span className="meta" style={{ fontSize: 13 }}>12 Abr 2026 · 6 min de lectura</span>
        </div>
        <h1 className="h1" style={{ fontSize: "clamp(36px, 4.4vw, 56px)", marginBottom: 24 }}>
          ¿Qué es un cariotipo y cuándo deben hacérselo a un recién nacido?
        </h1>
        <p className="lede" style={{ marginBottom: 32 }}>
          Una guía clara para padres: qué información aporta este estudio, cuándo
          se recomienda, y cómo interpretar los resultados con su pediatra.
        </p>
        <Placeholder label="imagen de cabecera del artículo" height={420} radius="var(--r-lg)" style={{ marginBottom: 40 }}/>
        <div style={{ fontSize: 17, lineHeight: 1.75, color: "var(--ink)" }}>
          <p style={{ marginTop: 0 }}>
            Cuando un padre escucha por primera vez la palabra "cariotipo", suele
            asociarla a algo grave. La realidad es más simple: es un estudio que
            permite ver los cromosomas del bebé como en una fotografía ordenada.
          </p>
          <h2 className="h3" style={{ marginTop: 40, marginBottom: 16 }}>¿Qué es exactamente?</h2>
          <p>
            El cariotipo es una imagen de los 46 cromosomas que cada persona lleva
            en sus células. Permite verificar que estén completos, correctamente
            pareados y sin alteraciones estructurales visibles al microscopio.
          </p>
          <h2 className="h3" style={{ marginTop: 40, marginBottom: 16 }}>¿Cuándo se recomienda?</h2>
          <p>
            En general, cuando hay rasgos físicos en el recién nacido que sugieren
            un síndrome genético, antecedentes familiares relevantes, o como
            estudio preventivo opcional cuando los padres lo desean.
          </p>
          <blockquote style={{ borderLeft: "3px solid var(--brand)", paddingLeft: 20, margin: "32px 0", fontSize: 19, fontStyle: "italic", color: "var(--ink)" }}>
            "Tener un diagnóstico claro lo antes posible es lo que permite a los
            padres planificar y a los niños recibir las mejores intervenciones."
          </blockquote>
          <h2 className="h3" style={{ marginTop: 40, marginBottom: 16 }}>Qué hacer con los resultados</h2>
          <p>
            Si el resultado es normal, da tranquilidad. Si muestra una alteración,
            es el inicio de un proceso de orientación familiar y plan de cuidado
            personalizado. En ningún caso es un veredicto: es información.
          </p>
        </div>
        <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: "48px 0" }}/>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Placeholder label="autor" height={64} style={{ width: 64, borderRadius: "50%", flexShrink: 0 }}/>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Dr. Gerardo Mejía</div>
            <div className="meta">Pediatría · Genética Médica · Managua</div>
          </div>
        </div>
      </div>
    </article>
    <CTABand title="¿Tiene preguntas sobre este tema?" lede="Estamos disponibles para conversar." />
  </>);
}

function ProfesionalesPage() {
  return (<>
    <PageHero
      chipIcon="award" chipText="Para colegas y profesionales"
      title="Referir un paciente o consultar un" titleHighlight="caso complejo"
      lede="Espacio dedicado para pediatras, médicos generales y otros especialistas que necesitan apoyo en casos con sospecha genética."
    />
    <CardGrid
      eyebrow="Cómo trabajamos con colegas"
      title="Tres formas de colaborar"
      items={[
        { icon: "doc", title: "Referencia formal", desc: "Envíe a su paciente con un resumen clínico. Le devolvemos un informe completo con conclusiones y recomendaciones." },
        { icon: "phone", title: "Consulta de caso", desc: "Para conversar sobre un caso sin necesidad de derivar al paciente. Consulta entre colegas, sin costo." },
        { icon: "stethoscope", title: "Atención conjunta", desc: "Cuando el caso amerita seguimiento compartido entre el médico de cabecera y nuestra consulta." },
      ]}
      columns={3}
    />
    <section style={{ background: "var(--bg-soft)" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>Recursos</div>
        <h2 className="h2" style={{ marginBottom: 32 }}>Materiales descargables</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { title: "Formato de referencia clínica", desc: "PDF · 1 página · Para enviar pacientes con sospecha genética" },
            { title: "Indicaciones de cariotipo en neonatología", desc: "Guía rápida · 4 páginas · Cuándo y cómo solicitarlo" },
            { title: "Manejo inicial del recién nacido con dismorfias", desc: "Protocolo · 8 páginas · Para sala de partos y neonatología" },
          ].map((r, i) => (
            <a key={i} href="#" className="card" style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 28px" }}>
              <div className="icon-circle" style={{ width: 44, height: 44, marginBottom: 0 }}><Icon name="doc" size={20}/></div>
              <div style={{ flex: 1 }}>
                <h3 className="h4" style={{ marginBottom: 4 }}>{r.title}</h3>
                <p className="meta" style={{ margin: 0 }}>{r.desc}</p>
              </div>
              <span className="btn-link">Descargar <Arrow/></span>
            </a>
          ))}
        </div>
      </div>
    </section>
    <CTABand
      title="¿Tiene un caso para consultar?"
      lede="Escríbanos directamente y agendamos una llamada entre colegas."
      primaryLabel="Escribir al doctor"
      secondaryLabel="Llamar a la clínica"
    />
  </>);
}

function FAQPage() {
  const groups = [
    { title: "Sobre las consultas", faqs: [
      { q: "¿Cómo agendo una cita?", a: "Por WhatsApp, formulario en línea o llamada. Le respondemos en menos de 24 horas hábiles." },
      { q: "¿Cuánto cuesta una consulta?", a: "Le compartimos las tarifas por mensaje al momento de agendar. Aceptamos varios seguros médicos." },
      { q: "¿Atienden de urgencia?", a: "Para urgencias acuda al servicio de emergencias del hospital más cercano. Para casos no urgentes, agende cita." },
      { q: "¿Atienden en otros idiomas?", a: "Sí, atendemos en español e inglés." },
    ]},
    { title: "Cariotipo y genética", faqs: [
      { q: "¿Es doloroso para el bebé?", a: "Es una toma de sangre como cualquier examen pediátrico de rutina. La molestia es mínima y momentánea." },
      { q: "¿Cuánto tiempo toma recibir resultados?", a: "Entre 2 y 3 semanas. Después se programa una consulta para interpretarlos." },
      { q: "¿Detecta todas las anomalías genéticas?", a: "Detecta alteraciones cromosómicas. No detecta mutaciones puntuales, para las cuales existen otros estudios complementarios." },
    ]},
    { title: "Pagos y seguros", faqs: [
      { q: "¿Aceptan seguro médico?", a: "Aceptamos los principales seguros del país. Le confirmamos al momento de agendar." },
      { q: "¿Puedo pagar a plazos?", a: "Para estudios de mayor costo (como el cariotipo) ofrecemos planes de pago. Conversemos." },
      { q: "¿Emiten factura formal?", a: "Sí, emitimos factura formal para reembolsos de seguros y deducciones." },
    ]},
  ];
  return (<>
    <PageHero
      chipIcon="doc" chipText="Preguntas frecuentes"
      title="Respuestas a las preguntas que más nos" titleHighlight="hacen las familias"
      lede="Si su pregunta no está aquí, escríbanos por WhatsApp y le respondemos directamente."
    />
    <section>
      <div className="container" style={{ maxWidth: 880 }}>
        {groups.map((g, gi) => (
          <div key={gi} style={{ marginBottom: 56 }}>
            <h2 className="h3" style={{ marginBottom: 20 }}>{g.title}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {g.faqs.map((f, i) => (
                <details key={i} className="card" style={{ padding: "20px 28px" }}>
                  <summary style={{ cursor: "pointer", fontSize: 17, fontWeight: 600, color: "var(--ink)", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    {f.q}
                    <span style={{ fontSize: 22, color: "var(--brand)", fontWeight: 400 }}>+</span>
                  </summary>
                  <p className="body" style={{ marginTop: 14, marginBottom: 0, fontSize: 15 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
    <CTABand title="¿No encuentra su pregunta?" lede="Escríbanos directamente, sin compromiso." />
  </>);
}

function LegalPage() {
  return (<>
    <PageHero
      chipIcon="shield" chipText="Aviso legal"
      title="Política de privacidad y" titleHighlight="aviso legal"
      lede="Información sobre cómo tratamos sus datos y los términos de uso de este sitio."
    />
    <section>
      <div className="container" style={{ maxWidth: 760, fontSize: 16, lineHeight: 1.75, color: "var(--ink-2)" }}>
        <h2 id="privacidad" className="h3" style={{ marginBottom: 12, color: "var(--ink)", scrollMarginTop: 96 }}>1. Privacidad y datos personales</h2>
        <p>Los datos que usted comparte mediante el formulario de contacto o WhatsApp se utilizan exclusivamente para responder a su solicitud y coordinar citas. No constituyen una historia clínica electrónica. No se comparten con terceros salvo cuando sea legalmente necesario.</p>
        <h2 className="h3" style={{ marginTop: 32, marginBottom: 12, color: "var(--ink)" }}>2. Confidencialidad médica</h2>
        <p>La información clínica que se discute en consulta está protegida por el secreto profesional médico, conforme a la normativa aplicable en Nicaragua (incl. Ley 787 de Protección de Datos Personales, en lo pertinente).</p>
        <h2 className="h3" style={{ marginTop: 32, marginBottom: 12, color: "var(--ink)" }}>3. Información en el sitio</h2>
        <p>El contenido de este sitio tiene fines informativos. No reemplaza una consulta médica presencial ni constituye diagnóstico o tratamiento. Ante cualquier sospecha clínica, agende una cita o acuda a un servicio médico.</p>
        <h2 className="h3" style={{ marginTop: 32, marginBottom: 12, color: "var(--ink)" }}>4. Emergencias</h2>
        <p>Este sitio y sus formularios no son canales de emergencia. Ante una urgencia médica, acuda al servicio de urgencias más cercano o contacte a los servicios de emergencia locales.</p>
        <h2 className="h3" style={{ marginTop: 32, marginBottom: 12, color: "var(--ink)" }}>5. Cookies y analítica</h2>
        <p>Utilizamos cookies básicas para el funcionamiento del sitio. Si se incorpora analítica (p. ej. GA4), se solicitará consentimiento cuando corresponda.</p>
        <h2 className="h3" style={{ marginTop: 32, marginBottom: 12, color: "var(--ink)" }}>6. Contacto</h2>
        <p>Para ejercer sus derechos sobre sus datos, use el formulario de contacto del sitio o escriba por WhatsApp al número publicado.</p>
        <p className="meta" style={{ marginTop: 48 }}>Última actualización: 20 de julio de 2026 · Borrador pendiente de revisión legal</p>
      </div>
    </section>
  </>);
}

function NotFoundPage() {
  return (
    <section style={{ paddingTop: 80, paddingBottom: 80, minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 560 }}>
        <div style={{ fontSize: 96, fontWeight: 800, color: "var(--brand)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 16 }}>404</div>
        <h1 className="h2" style={{ marginBottom: 16 }}>Página no encontrada</h1>
        <p className="lede" style={{ marginBottom: 32 }}>
          La página que busca no existe o ha sido movida. Vuelva al inicio o
          escríbanos si necesita ayuda para encontrar algo específico.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="index.html" className="btn btn-primary">Volver al inicio <Arrow/></a>
          <a href="contacto.html" className="btn btn-ghost">Escribir al doctor</a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ArticlePage, ProfesionalesPage, FAQPage, LegalPage, NotFoundPage });
