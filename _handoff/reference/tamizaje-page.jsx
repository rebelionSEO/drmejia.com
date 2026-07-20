// Tamizaje metabólico neonatal — service page

function KaryoHero() {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 64, background: "linear-gradient(180deg, var(--bg-mint) 0%, var(--bg) 100%)" }}>
      <div className="container">
        <div className="chip" style={{ marginBottom: 24, background: "var(--accent-soft)", color: "#0E8576" }}>
          <Icon name="dna" size={14}/> Estudio preventivo · Recién nacidos
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 56, alignItems: "end" }}>
          <h1 className="h1">Tamizaje Metabólico Neonatal</h1>
          <p className="lede">
            Una prueba preventiva que se realiza en los primeros días de vida para
            detectar enfermedades metabólicas tratables antes de que aparezcan los síntomas.
          </p>
        </div>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { l: "Edad indicada", v: "2 – 7 días de vida" },
            { l: "Procedimiento", v: "Prueba del talón" },
            { l: "Resultados", v: "10 – 14 días" },
            { l: "Incluye", v: "Consulta de interpretación" },
          ].map((it,i) => (
            <div key={i} className="card" style={{ padding: 24 }}>
              <div className="meta" style={{ marginBottom: 6, fontSize: 12 }}>{it.l}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)" }}>{it.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KaryoExplain() {
  return (
    <section>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64, alignItems: "center" }}>
          <Placeholder label="ilustración · prueba del talón" height={480} mint radius="var(--r-xl)"/>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>¿Qué es?</div>
            <h2 className="h2" style={{ marginBottom: 20 }}>Detección temprana de enfermedades tratables</h2>
            <p className="lede" style={{ marginBottom: 16 }}>
              El tamizaje metabólico neonatal —conocido también como "prueba del talón"— es
              un análisis de sangre que se realiza en los primeros días de vida del bebé
              para identificar enfermedades metabólicas, endocrinas y genéticas.
            </p>
            <p className="body">
              Muchas de estas condiciones no presentan síntomas al nacer, pero si se detectan
              a tiempo pueden tratarse antes de causar daño irreversible. Es una de las
              intervenciones preventivas más importantes en neonatología.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function KaryoWhen() {
  const reasons = [
    { icon: "baby", title: "Todo recién nacido", desc: "Es una prueba universal que se recomienda para todos los bebés, sanos o con factores de riesgo." },
    { icon: "shield", title: "Detección preventiva", desc: "Identifica condiciones tratables antes de que aparezcan síntomas, cuando la intervención es más efectiva." },
    { icon: "heart", title: "Antecedentes familiares", desc: "Es especialmente importante cuando hay historia familiar de enfermedades metabólicas o consanguinidad." },
    { icon: "dna", title: "Embarazos de riesgo", desc: "Bebés prematuros, de bajo peso o con complicaciones perinatales se benefician aún más del tamizaje." },
  ];
  return (
    <section style={{ background: "var(--bg-soft)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 720, margin: "0 auto 56px" }}>
          <div className="eyebrow" style={{ marginBottom: 16, justifyContent: "center" }}>¿Cuándo se recomienda?</div>
          <h2 className="h2">Cuatro razones para realizar el tamizaje</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {reasons.map((r,i) => (
            <div key={i} className="card">
              <div className="icon-circle"><Icon name={r.icon}/></div>
              <h3 className="h4" style={{ marginBottom: 10 }}>{r.title}</h3>
              <p className="body" style={{ margin: 0, fontSize: 15 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KaryoProcess() {
  const steps = [
    { n: "1", title: "Consulta inicial", desc: "Conversación con los padres y evaluación del recién nacido." },
    { n: "2", title: "Toma de muestra", desc: "Unas gotas de sangre del talón del bebé. Procedimiento rápido y prácticamente indoloro." },
    { n: "3", title: "Análisis de laboratorio", desc: "Se analizan múltiples marcadores metabólicos, hormonales y genéticos." },
    { n: "4", title: "Entrega e interpretación", desc: "Consulta dedicada para revisar los resultados y, si es necesario, plan de seguimiento." },
  ];
  return (
    <section>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 720, margin: "0 auto 56px" }}>
          <div className="eyebrow" style={{ marginBottom: 16, justifyContent: "center" }}>El proceso</div>
          <h2 className="h2">Cuatro pasos, sencillos y seguros</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {steps.map(s => (
            <div key={s.n} className="card">
              <div className="num-circle" style={{ marginBottom: 20 }}>{s.n}</div>
              <h3 className="h4" style={{ marginBottom: 10 }}>{s.title}</h3>
              <p className="body" style={{ margin: 0, fontSize: 14.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KaryoFAQ() {
  const faqs = [
    { q: "¿Es doloroso para el bebé?", a: "Es una punción muy pequeña en el talón. La molestia es mínima y momentánea." },
    { q: "¿Cuándo debe realizarse?", a: "Idealmente entre las 48 horas y los 7 días de vida. Se puede hacer antes si hay indicación médica." },
    { q: "¿Cuánto tiempo toman los resultados?", a: "Entre 10 y 14 días. Si hay un hallazgo que requiere atención inmediata, contactamos a la familia antes." },
    { q: "¿Qué enfermedades detecta?", a: "Hipotiroidismo congénito, hiperplasia suprarrenal, fenilcetonuria, galactosemia, fibrosis quística y otras condiciones metabólicas y genéticas según el panel." },
    { q: "¿Qué pasa si el resultado es positivo?", a: "Programamos una consulta extendida para confirmar con estudios adicionales y diseñar el plan de tratamiento. Detectarlo a tiempo permite resultados muy favorables." },
    { q: "¿Es necesario si mi bebé parece sano?", a: "Sí. La gran mayoría de las enfermedades que detecta no presentan síntomas al nacer. Por eso el tamizaje es preventivo y universal." },
  ];
  return (
    <section style={{ background: "var(--bg-soft)" }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 16, justifyContent: "center" }}>Preguntas frecuentes</div>
          <h2 className="h2">Lo que los padres suelen preguntar</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f, i) => (
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
    </section>
  );
}

function KaryoCTA() {
  return (
    <section style={{ background: "var(--brand)", color: "#FFF" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
        <h2 className="h2" style={{ color: "#FFF", marginBottom: 16 }}>¿Listo para hacerle el tamizaje a su bebé?</h2>
        <p className="lede" style={{ color: "rgba(255,255,255,0.9)", marginBottom: 32 }}>
          Agende la consulta con anticipación para coordinar la toma de muestra
          en los primeros días de vida del bebé.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="contacto.html" className="btn" style={{ background: "#FFF", color: "var(--brand)" }}>Agendar consulta <Arrow/></a>
          <a href="https://wa.me/50583976896" className="btn btn-ghost" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#FFF" }}>Preguntar por WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { KaryoHero, KaryoExplain, KaryoWhen, KaryoProcess, KaryoFAQ, KaryoCTA });
