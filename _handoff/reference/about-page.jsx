// About page — v2

function AboutHero() {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 64, background: "linear-gradient(180deg, var(--bg-blue) 0%, var(--bg) 100%)" }}>
      <div className="container">
        <div className="chip" style={{ marginBottom: 24 }}>
          <Icon name="award" size={14}/> Sobre el Dr. Mejía
        </div>
        <h1 className="h1" style={{ marginBottom: 32, maxWidth: 1000 }}>
          Una vida dedicada a la <span style={{ color: "var(--brand)" }}>pediatría</span> y a la <span style={{ color: "var(--brand)" }}>genética</span> de Nicaragua
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 56, marginTop: 32, alignItems: "center" }}>
          <Placeholder label="retrato editorial · clínica" height={560} radius="var(--r-xl)"/>
          <div>
            <p className="lede" style={{ marginBottom: 20 }}>
              El Dr. Gerardo Mejía es pediatra y el primer médico genetista en la
              historia de Nicaragua. Durante más de tres décadas ha combinado la
              práctica clínica con la investigación, la docencia y el servicio público.
            </p>
            <p className="body" style={{ marginBottom: 20 }}>
              Su trabajo siempre ha tenido un objetivo: que cada niño nicaragüense
              pueda crecer con un diagnóstico oportuno y una atención digna.
            </p>
            <p className="body">
              Como ex-director del Hospital Infantil Manuel de Jesús Rivera —el
              principal hospital pediátrico público del país— formó a generaciones
              de pediatras y consolidó programas de tamizaje genético.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutTimeline() {
  const events = [
    { year: "1985", title: "Doctor en Medicina y Cirugía", where: "Universidad Nacional Autónoma de Nicaragua (UNAN)" },
    { year: "1991", title: "Especialidad en Pediatría", where: "Hospital Infantil Manuel de Jesús Rivera · UNAN-Managua" },
    { year: "1997", title: "Maestría en Genética", where: "CIBO, Instituto Mexicano del Seguro Social (IMSS)" },
    { year: "—", title: "Fellowship · Manejo Integral de la Espina Bífida", where: "Hospital Niguarda · Inst. Carlos Besta (Milán) · Hospital Gemelli (Roma)" },
    { year: "—", title: "Fellowship · Hipnosis en Pediatría", where: "Sociedad Americana de Conducta y Desarrollo · Pittsburgh, USA" },
    { year: "—", title: "Fellowship · Asesoramiento Genético Oncológico", where: "Instituto Ángel H. Roffo · Universidad de Buenos Aires" },
    { year: "2006–13", title: "Director del Hospital Infantil Manuel de Jesús Rivera", where: "7 años · Hospital pediátrico de referencia nacional" },
    { year: "Hoy", title: "Práctica clínica · Pediatría y genética", where: "Clínica Perinatal · Managua, Nicaragua" },
  ];
  return (
    <section style={{ background: "var(--bg-soft)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 680, margin: "0 auto 56px" }}>
          <div className="eyebrow" style={{ marginBottom: 16, justifyContent: "center" }}>Trayectoria</div>
          <h2 className="h2">Una carrera en hitos</h2>
        </div>
        <div style={{ maxWidth: 880, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          {events.map((e, i) => (
            <div key={i} className="card" style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr", gap: 24, alignItems: "center", padding: "20px 28px" }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: "var(--brand)" }}>{e.year}</span>
              <h3 className="h4" style={{ margin: 0 }}>{e.title}</h3>
              <p className="body" style={{ margin: 0, fontSize: 14 }}>{e.where}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPublications() {
  const pubs = [
    { year: "—", title: "Genética clínica", journal: "Línea de investigación activa" },
    { year: "—", title: "Anomalías congénitas", journal: "Línea de investigación activa" },
    { year: "—", title: "Síndrome de Down y enfermedades raras", journal: "Pacientes sin diagnóstico o con múltiples padecimientos" },
    { year: "—", title: "Asesoramiento genético oncológico", journal: "Cáncer hereditario, riesgos familiares" },
    { year: "—", title: "Tamizaje neonatal y diagnóstico prenatal", journal: "Cariotipo, microarrays, ADN fetal, exomas y genomas" },
  ];
  return (
    <section>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40, gap: 24, flexWrap: "wrap" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Investigación</div>
            <h2 className="h2">Líneas de investigación y consulta</h2>
          </div>
          <span className="meta">Docencia activa · 1997–presente</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pubs.map((p, i) => (
            <div key={i} className="card" style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: 24, alignItems: "center", padding: "20px 28px" }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--brand)" }}>{p.year}</span>
              <h3 className="h4" style={{ margin: 0, fontSize: 16 }}>{p.title}</h3>
              <p className="body" style={{ margin: 0, fontSize: 14, color: "var(--ink-3)" }}>{p.journal}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPhilosophy() {
  return (
    <section style={{ background: "var(--brand)", color: "#FFF" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 920, margin: "0 auto" }}>
        <div style={{ fontSize: 64, color: "rgba(255,255,255,0.4)", lineHeight: 1, marginBottom: 16 }}>"</div>
        <p style={{ fontSize: "clamp(24px, 2.5vw, 34px)", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.015em", margin: "0 0 24px", color: "#FFF" }}>
          Ayudar a las personas y sus familias de manera incondicional, respondiendo a sus preguntas e inquietudes y estando siempre disponible para ellos.
        </p>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>— Dr. Gerardo Mejía</div>
      </div>
    </section>
  );
}

Object.assign(window, { AboutHero, AboutTimeline, AboutPublications, AboutPhilosophy });
