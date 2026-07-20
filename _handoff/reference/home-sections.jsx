// Home page sections — v2 (modern medical)

function HomeHero() {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 80, background: "linear-gradient(180deg, var(--bg-blue) 0%, var(--bg) 100%)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div className="chip" style={{ marginBottom: 24 }}>
              <Icon name="award" size={14}/> Primer médico genetista de Nicaragua
            </div>
            <h1 className="h1" style={{ marginBottom: 24 }}>
              Cuidamos la salud de su hijo, desde el <span style={{ color: "var(--brand)" }}>primer día.</span>
            </h1>
            <p className="lede" style={{ marginBottom: 32, maxWidth: 540 }}>
              40 años de experiencia en pediatría y genética médica. Atención
              integral, diagnóstico oportuno y acompañamiento a familias en cada etapa.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <a href="contacto.html" className="btn btn-primary">Agendar cita <Arrow/></a>
              <a href="https://wa.me/50583976896" className="btn btn-ghost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden style={{color:"var(--green)"}}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.026 2.013c-5.509 0-9.96 4.45-9.96 9.96 0 1.748.456 3.45 1.32 4.95l-1.4 5.117 5.235-1.376c1.444.789 3.07 1.205 4.715 1.205h.005c5.51 0 9.96-4.45 9.96-9.96 0-2.66-1.034-5.16-2.913-7.04-1.879-1.879-4.378-2.86-7.039-2.856z"/>
                </svg>
                Escribir por WhatsApp
              </a>
            </div>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", paddingTop: 24, borderTop: "1px solid var(--rule)" }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>40</div>
                <div className="meta">años como médico</div>
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>34</div>
                <div className="meta">años como pediatra</div>
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>28</div>
                <div className="meta">años en genética</div>
              </div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <Placeholder label="retrato del Dr. Mejía · estudio" height={580} radius="var(--r-xl)"/>
            <div style={{ position: "absolute", bottom: -20, left: -20, background: "#FFF", padding: "16px 20px", borderRadius: "var(--r-md)", boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: 14, maxWidth: 280 }}>
              <div className="icon-circle mint" style={{ marginBottom: 0, width: 44, height: 44 }}>
                <Icon name="shield" size={22}/>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>Atención certificada</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)" }}>Colegio Médico de Nicaragua</div>
              </div>
            </div>
            <div style={{ position: "absolute", top: 24, right: -16, background: "#FFF", padding: "12px 16px", borderRadius: "var(--r-md)", boxShadow: "var(--shadow-md)", whiteSpace: "nowrap" }}>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginBottom: 2, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>Atención hoy</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--brand)" }}>11:30 AM – 5:00 PM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeRecognition() {
  const items = [
    "Ex-Director · Hospital Manuel de Jesús Rivera",
    "Academia Nicaragüense de Ciencias Médicas",
    "Sociedad Nicaragüense de Pediatría",
    "Asoc. Latinoamericana de Genética Humana",
    "Colegio Médico de Nicaragua",
  ];
  return (
    <section className="tight" style={{ background: "var(--bg)", paddingTop: 32, paddingBottom: 32 }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <span className="meta" style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-3)" }}>
            Trayectoria reconocida en
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32, rowGap: 12 }}>
          {items.map((it, i) => (
            <div key={i} style={{ fontSize: 14, color: "var(--ink-2)", fontWeight: 500 }}>{it}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeServices() {
  const services = [
    { icon: "stethoscope", title: "Pediatría general", desc: "Enfermedades respiratorias, infecciosas, alérgicas, gastrointestinales, neurológicas. Crecimiento, sueño, alimentación, vacunas." },
    { icon: "dna", title: "Genética clínica", desc: "Anomalías congénitas, síndromes genéticos, Síndrome de Down, enfermedades raras, pacientes sin diagnóstico.", featured: true },
    { icon: "baby", title: "Estudios genéticos", desc: "Cariotipo, microarrays, ADN fetal, exomas, genomas completos y tamizaje metabólico neonatal (prueba del talón)." },
    { icon: "heart", title: "Cáncer hereditario", desc: "Asesoramiento y estudios diagnósticos para familias con historia de cáncer hereditario." },
  ];
  return (
    <section>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 720, margin: "0 auto 56px" }}>
          <div className="eyebrow" style={{ marginBottom: 16, justifyContent: "center" }}>Servicios</div>
          <h2 className="h2" style={{ marginBottom: 16 }}>Atención pediátrica integral, con la mirada de un genetista</h2>
          <p className="lede">Cuatro áreas de práctica que cubren las necesidades médicas y emocionales de cada familia.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {services.map(s => (
            <div key={s.title} className={"card" + (s.featured ? " card-blue" : "")}>
              <div className={"icon-circle" + (s.featured ? "" : "")}>
                <Icon name={s.icon}/>
              </div>
              <h3 className="h4" style={{ marginBottom: 10 }}>{s.title}</h3>
              <p className="body" style={{ fontSize: 14.5, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeKaryotype() {
  return (
    <section style={{ background: "var(--bg-soft)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 64, alignItems: "center" }}>
          <Placeholder label="prueba del talón · recién nacido" height={520} mint radius="var(--r-xl)"/>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Estudio preventivo</div>
            <h2 className="h2" style={{ marginBottom: 20 }}>Tamizaje Metabólico Neonatal</h2>
            <p className="lede" style={{ marginBottom: 24 }}>
              La prueba del talón: una muestra pequeña de sangre que detecta enfermedades
              metabólicas tratables antes de que aparezcan los síntomas.
            </p>
            <ul className="check-list" style={{ marginBottom: 32 }}>
              <li>Detección temprana de Síndrome de Down, Turner, trisomías y más</li>
              <li>Procedimiento simple: una toma de sangre del bebé</li>
              <li>Resultados en 2 a 3 semanas, con consulta de interpretación</li>
              <li>Acompañamiento médico durante todo el proceso</li>
            </ul>
            <a href="tamizaje.html" className="btn btn-primary">Conocer el estudio <Arrow/></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeProcess() {
  const steps = [
    { n: "1", title: "Solicite su cita", desc: "Por WhatsApp, formulario o llamada. Le respondemos en menos de 24 horas." },
    { n: "2", title: "Consulta inicial", desc: "Evaluación completa del paciente y conversación con los padres." },
    { n: "3", title: "Plan de seguimiento", desc: "Diagnóstico claro, tratamiento si es necesario y plan de controles." },
  ];
  return (
    <section>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 680, margin: "0 auto 56px" }}>
          <div className="eyebrow" style={{ marginBottom: 16, justifyContent: "center" }}>Cómo funciona</div>
          <h2 className="h2" style={{ marginBottom: 16 }}>Tres pasos simples para recibir atención</h2>
          <p className="lede">Sin esperas innecesarias. Le acompañamos desde el primer mensaje.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {steps.map(s => (
            <div key={s.n} className="card" style={{ position: "relative" }}>
              <div className="num-circle" style={{ marginBottom: 20 }}>{s.n}</div>
              <h3 className="h4" style={{ marginBottom: 10 }}>{s.title}</h3>
              <p className="body" style={{ fontSize: 14.5, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeBio() {
  return (
    <section style={{ background: "var(--bg-blue)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "center" }}>
          <Placeholder label="retrato editorial · clínica" height={520} radius="var(--r-xl)"/>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Sobre el doctor</div>
            <h2 className="h2" style={{ marginBottom: 24 }}>Una vida dedicada a la niñez nicaragüense</h2>
            <p className="lede" style={{ marginBottom: 20 }}>
              Médico pediatra y genetista. Director del Hospital Infantil Manuel
              de Jesús Rivera entre 2006 y 2013. Sus líneas de investigación son
              genética clínica y anomalías congénitas, con docencia activa en
              el país y la región.
            </p>
            <p className="body" style={{ marginBottom: 32 }}>
              Como ex-director del Hospital Infantil Manuel de Jesús Rivera, ha
              formado a generaciones de pediatras y publicado investigaciones que
              han marcado el campo en Centroamérica.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
              <div style={{ padding: 16, background: "#FFF", borderRadius: "var(--r-md)" }}>
                <div className="meta" style={{ marginBottom: 4, fontSize: 12 }}>Formación</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>UNAN-Managua</div>
              </div>
              <div style={{ padding: 16, background: "#FFF", borderRadius: "var(--r-md)" }}>
                <div className="meta" style={{ marginBottom: 4, fontSize: 12 }}>Pediatría</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>UNAN · Hospital Manuel de Jesús Rivera</div>
              </div>
              <div style={{ padding: 16, background: "#FFF", borderRadius: "var(--r-md)" }}>
                <div className="meta" style={{ marginBottom: 4, fontSize: 12 }}>Maestría en Genética</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>CIBO · IMSS, México</div>
              </div>
            </div>
            <a href="sobre.html" className="btn-link">Ver trayectoria completa <Arrow/></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeBlog() {
  const posts = [
    { cat: "Genética", title: "¿Qué es un cariotipo y cuándo deben hacérselo a un recién nacido?", date: "12 Abr 2026", read: "6 min" },
    { cat: "Pediatría", title: "Vacunación en el primer año: el calendario que todo padre debe conocer", date: "28 Mar 2026", read: "4 min" },
    { cat: "Investigación", title: "Síndrome de Down en Nicaragua: hallazgos de un estudio de 10 años", date: "14 Mar 2026", read: "9 min" },
  ];
  return (
    <section>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40, gap: 24, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 620 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Publicaciones</div>
            <h2 className="h2">Lecturas para padres y colegas</h2>
          </div>
          <a href="blog.html" className="btn-link">Ver todas <Arrow/></a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {posts.map((p, i) => (
            <a key={i} href="blog.html" className="card" style={{ padding: 0, overflow: "hidden", display: "block" }}>
              <Placeholder label={`portada · ${p.cat.toLowerCase()}`} height={200} radius="0"/>
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                  <span className="chip" style={{ fontSize: 12, padding: "4px 10px" }}>{p.cat}</span>
                  <span className="meta" style={{ fontSize: 12 }}>{p.date} · {p.read}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.01em", margin: 0, color: "var(--ink)" }}>{p.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeCTA() {
  return (
    <section style={{ background: "var(--brand)", color: "#FFF" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <h2 className="h2" style={{ color: "#FFF", marginBottom: 20 }}>
              Estamos aquí cuando su familia nos necesite
            </h2>
            <p className="lede" style={{ color: "rgba(255,255,255,0.9)", marginBottom: 32 }}>
              Atendemos consultas de lunes a viernes en Managua. Para citas más rápidas,
              escríbanos directamente por WhatsApp.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="https://wa.me/50583976896" className="btn btn-whatsapp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.026 2.013c-5.509 0-9.96 4.45-9.96 9.96 0 1.748.456 3.45 1.32 4.95l-1.4 5.117 5.235-1.376c1.444.789 3.07 1.205 4.715 1.205h.005c5.51 0 9.96-4.45 9.96-9.96 0-2.66-1.034-5.16-2.913-7.04-1.879-1.879-4.378-2.86-7.039-2.856z"/>
                </svg>
                Escribir por WhatsApp
              </a>
              <a href="contacto.html" className="btn btn-ghost" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#FFF" }}>
                Solicitar cita por formulario
              </a>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", padding: 32, borderRadius: "var(--r-lg)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 24 }}>
              <Icon name="pin" size={22}/>
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>La clínica</div>
                <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.5 }}>
                  Clínica Perinatal · De los semáforos del Monte de los Olivos<br/>1c al lago, 1c al este y 20m al sur · Managua
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 24 }}>
              <Icon name="clock" size={22}/>
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Horario</div>
                <div style={{ fontSize: 15, lineHeight: 1.6 }}>
                  Lunes a Viernes<br/>11:30 AM – 5:00 PM
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <Icon name="phone" size={22}/>
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Teléfono</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>2278-5301 · WhatsApp 8397-6896</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeleBanner() {
  const [closed, setClosed] = React.useState(false);
  if (closed) return null;
  return (
    <div style={{ background: "var(--green, #15843D)", color: "#FFF", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="container tele-banner-row" style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 24px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
          <span aria-hidden style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.18)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2" y="6" width="14" height="12" rx="2"/>
              <path d="M22 8l-6 4 6 4z"/>
            </svg>
          </span>
          <div style={{ fontSize: 14, lineHeight: 1.4 }}>
            <strong style={{ fontWeight: 700 }}>Nuevo · Consultas virtuales disponibles.</strong>
            <span style={{ opacity: 0.9, marginLeft: 6 }}>Atención a pacientes fuera de Managua y de Nicaragua, y seguimiento por videollamada.</span>
          </div>
        </div>
        <div className="tele-banner-actions" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href="contacto.html" style={{ background: "#FFF", color: "var(--green, #15843D)", padding: "8px 16px", borderRadius: "var(--r-pill)", fontSize: 13, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
            Agendar virtual →
          </a>
          <button onClick={() => setClosed(true)} aria-label="Cerrar"
            style={{ background: "transparent", border: 0, color: "#FFF", opacity: 0.7, cursor: "pointer", padding: 6, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 6 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function HomeFAQ() {
  const faqs = [
    { q: "¿Atienden consultas virtuales?", a: "Sí. Ofrecemos teleconsulta para pacientes fuera de Managua y fuera de Nicaragua, segundas opiniones, asesoría genética y seguimiento de casos previamente evaluados. La cita se coordina por WhatsApp y se realiza por videollamada." },
    { q: "¿Cómo agendo una cita?", a: "Por WhatsApp al 8397-6896 o llamando a la clínica al 2278-5301. También puede usar el formulario de contacto y le respondemos en menos de 24 horas hábiles." },
    { q: "¿Cuál es el horario de atención?", a: "Lunes a viernes, 11:30 AM a 5:00 PM, en Clínica Perinatal, Managua. Las consultas virtuales pueden coordinarse en horarios alternativos según disponibilidad." },
    { q: "¿Qué estudios genéticos realizan?", a: "Cariotipo, microarrays, ADN fetal en sangre materna, exomas y genomas completos, tamizaje neonatal (prueba del talón), estudios de cáncer hereditario y compatibilidad genética de pareja." },
    { q: "¿Atienden a pacientes adultos?", a: "Para asesoramiento genético sí — incluye parejas que planifican embarazo, familias con historia de cáncer hereditario, y adultos con sospecha de condición genética. La consulta pediátrica es de 0 a 18 años." },
    { q: "¿Aceptan seguros médicos?", a: "Aceptamos los principales seguros del país. Le confirmamos coberturas y emitimos factura formal para reembolsos al momento de agendar." },
  ];
  return (
    <section style={{ background: "var(--bg-soft)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 56, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 24 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Preguntas frecuentes</div>
            <h2 className="h2" style={{ marginBottom: 16 }}>Lo que nos preguntan a menudo</h2>
            <p className="body" style={{ marginBottom: 24 }}>
              Si su pregunta no aparece aquí, escríbanos por WhatsApp y le respondemos directamente.
            </p>
            <a href="faq.html" className="btn-link">Ver todas las preguntas <Arrow/></a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => (
              <details key={i} className="card" style={{ padding: "20px 28px" }} {...(i === 0 ? { open: true } : {})}>
                <summary style={{ cursor: "pointer", fontSize: 17, fontWeight: 600, color: "var(--ink)", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  {f.q}
                  <span style={{ fontSize: 22, color: "var(--brand)", fontWeight: 400 }}>+</span>
                </summary>
                <p className="body" style={{ marginTop: 14, marginBottom: 0, fontSize: 15 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HomeHero, HomeRecognition, HomeServices, HomeKaryotype, HomeProcess, HomeBio, HomeBlog, HomeCTA, TeleBanner, HomeFAQ });
