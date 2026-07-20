// Blog index — v2

const POSTS = [
  { cat: "Genética", title: "¿Qué es un cariotipo y cuándo deben hacérselo a un recién nacido?", date: "12 Abr 2026", read: "6 min", excerpt: "Una guía clara para padres: qué información aporta este estudio, cuándo se recomienda, y qué hacer con los resultados." },
  { cat: "Pediatría", title: "Vacunación en el primer año: el calendario que todo padre debe conocer", date: "28 Mar 2026", read: "4 min", excerpt: "Las vacunas obligatorias y opcionales del primer año, con notas sobre el contexto nicaragüense." },
  { cat: "Investigación", title: "Síndrome de Down en Nicaragua: hallazgos de un estudio de 10 años", date: "14 Mar 2026", read: "9 min", excerpt: "Resumen de un estudio observacional con 500 familias en Managua." },
  { cat: "Genética", title: "Asesoría genética: qué esperar de la primera consulta", date: "01 Mar 2026", read: "5 min", excerpt: "Cómo se desarrolla una consulta de asesoría genética y cómo prepararse." },
  { cat: "Pediatría", title: "Hitos del desarrollo en el primer año: una guía mes a mes", date: "20 Feb 2026", read: "7 min", excerpt: "De los reflejos del recién nacido a los primeros pasos." },
  { cat: "Familia", title: "Acompañar a una familia tras un diagnóstico: notas para padres y hermanos", date: "08 Feb 2026", read: "5 min", excerpt: "Reflexiones sobre el primer mes después de recibir un diagnóstico genético." },
];
const CATS = ["Todas", "Genética", "Pediatría", "Investigación", "Familia"];

function BlogHero() {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 32, background: "linear-gradient(180deg, var(--bg-blue) 0%, var(--bg) 100%)" }}>
      <div className="container">
        <div className="chip" style={{ marginBottom: 24 }}>
          <Icon name="doc" size={14}/> Publicaciones
        </div>
        <h1 className="h1" style={{ marginBottom: 24, maxWidth: 1000 }}>
          Lecturas para <span style={{ color: "var(--brand)" }}>padres</span> y <span style={{ color: "var(--brand)" }}>colegas</span>
        </h1>
        <p className="lede" style={{ maxWidth: 620 }}>
          Reflexiones, explicaciones y resúmenes de investigación sobre pediatría
          y genética médica, escritos para acercar la ciencia a las familias.
        </p>
      </div>
    </section>
  );
}

function BlogFeatured() {
  const post = POSTS[0];
  return (
    <section className="tight">
      <div className="container">
        <a href="#" className="card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", padding: 0, overflow: "hidden" }}>
          <Placeholder label="portada destacada · cariotipo" height={380} mint radius="0"/>
          <div style={{ padding: 40 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <span className="chip" style={{ background: "var(--accent-soft)", color: "#0E8576" }}>Destacado</span>
              <span className="chip">{post.cat}</span>
            </div>
            <h2 className="h2" style={{ fontSize: "clamp(24px, 2.4vw, 32px)", marginBottom: 16 }}>{post.title}</h2>
            <p className="body" style={{ marginBottom: 20, fontSize: 16 }}>{post.excerpt}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="meta">{post.date} · {post.read}</span>
              <span className="btn-link">Leer artículo <Arrow/></span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

function BlogGrid() {
  const [filter, setFilter] = React.useState("Todas");
  const filtered = filter === "Todas" ? POSTS.slice(1) : POSTS.filter(p => p.cat === filter);
  return (
    <section style={{ paddingTop: 32 }}>
      <div className="container">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{
                background: filter===c ? "var(--brand)" : "var(--bg)",
                color: filter===c ? "#FFF" : "var(--ink-2)",
                border: "1.5px solid " + (filter===c ? "var(--brand)" : "var(--rule)"),
                padding: "8px 16px", fontSize: 14, fontWeight: 600,
                borderRadius: "var(--r-pill)", transition: "all 0.15s",
              }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {filtered.map((p,i) => (
            <a key={i} href="#" className="card" style={{ padding: 0, overflow: "hidden", display: "block" }}>
              <Placeholder label={`portada · ${p.cat.toLowerCase()}`} height={200} radius="0"/>
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <span className="chip" style={{ fontSize: 12, padding: "4px 10px" }}>{p.cat}</span>
                  <span className="meta" style={{ fontSize: 12 }}>{p.date} · {p.read}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.01em", margin: "0 0 10px", color: "var(--ink)" }}>{p.title}</h3>
                <p className="body" style={{ margin: 0, fontSize: 14 }}>{p.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogNewsletter() {
  return (
    <section style={{ background: "var(--brand)", color: "#FFF" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 680 }}>
        <h2 className="h2" style={{ color: "#FFF", marginBottom: 16 }}>Reciba nuevos artículos en su correo</h2>
        <p className="lede" style={{ color: "rgba(255,255,255,0.9)", marginBottom: 28 }}>Un correo al mes, con las publicaciones más recientes. Sin spam.</p>
        <form onSubmit={e=>e.preventDefault()} style={{ display: "flex", gap: 8, maxWidth: 480, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
          <input type="email" placeholder="su@correo.com"
            style={{ flex: "1 1 240px", padding: "14px 18px", fontFamily: "var(--sans)", fontSize: 15, border: "1.5px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.1)", color: "#FFF", outline: "none", borderRadius: "var(--r-pill)" }}/>
          <button type="submit" className="btn" style={{ background: "#FFF", color: "var(--brand)" }}>Suscribirse</button>
        </form>
      </div>
    </section>
  );
}

Object.assign(window, { BlogHero, BlogFeatured, BlogGrid, BlogNewsletter });
