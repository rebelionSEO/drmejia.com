// Reusable page-section components for service-detail style pages

function PageHero({ chipIcon = "stethoscope", chipText, title, titleHighlight, lede, stats }) {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 64, background: "linear-gradient(180deg, var(--bg-blue) 0%, var(--bg) 100%)" }}>
      <div className="container">
        <div className="chip" style={{ marginBottom: 24 }}>
          <Icon name={chipIcon} size={14}/> {chipText}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 56, alignItems: "end" }}>
          <h1 className="h1">{title} {titleHighlight && <span style={{ color: "var(--brand)" }}>{titleHighlight}</span>}</h1>
          <p className="lede">{lede}</p>
        </div>
        {stats && (
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 16 }}>
            {stats.map((it, i) => (
              <div key={i} className="card" style={{ padding: 24 }}>
                <div className="meta" style={{ marginBottom: 6, fontSize: 12 }}>{it.l}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)" }}>{it.v}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SplitSection({ eyebrow, title, lede, body, imageLabel, mint = false, reverse = false, bg }) {
  const image = <Placeholder label={imageLabel} height={480} mint={mint} radius="var(--r-xl)"/>;
  const text = (
    <div>
      <div className="eyebrow" style={{ marginBottom: 20 }}>{eyebrow}</div>
      <h2 className="h2" style={{ marginBottom: 20 }}>{title}</h2>
      {lede && <p className="lede" style={{ marginBottom: 16 }}>{lede}</p>}
      {body && <p className="body">{body}</p>}
    </div>
  );
  return (
    <section style={{ background: bg || "var(--bg)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64, alignItems: "center" }}>
          {reverse ? <>{text}{image}</> : <>{image}{text}</>}
        </div>
      </div>
    </section>
  );
}

function CardGrid({ eyebrow, title, lede, items, columns = 2, bg }) {
  return (
    <section style={{ background: bg || "var(--bg)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 720, margin: "0 auto 56px" }}>
          <div className="eyebrow" style={{ marginBottom: 16, justifyContent: "center" }}>{eyebrow}</div>
          <h2 className="h2" style={{ marginBottom: 16 }}>{title}</h2>
          {lede && <p className="lede">{lede}</p>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 20 }}>
          {items.map((r, i) => (
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

function StepGrid({ eyebrow, title, lede, steps, bg }) {
  return (
    <section style={{ background: bg || "var(--bg)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 720, margin: "0 auto 56px" }}>
          <div className="eyebrow" style={{ marginBottom: 16, justifyContent: "center" }}>{eyebrow}</div>
          <h2 className="h2" style={{ marginBottom: 16 }}>{title}</h2>
          {lede && <p className="lede">{lede}</p>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 20 }}>
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

function FAQSection({ eyebrow = "Preguntas frecuentes", title, faqs, bg }) {
  return (
    <section style={{ background: bg || "var(--bg-soft)" }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 16, justifyContent: "center" }}>{eyebrow}</div>
          <h2 className="h2">{title}</h2>
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

function CTABand({ title, lede, primaryHref = "contacto.html", primaryLabel = "Agendar consulta", secondaryHref = "https://wa.me/50583976896", secondaryLabel = "Preguntar por WhatsApp" }) {
  return (
    <section style={{ background: "var(--brand)", color: "#FFF" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
        <h2 className="h2" style={{ color: "#FFF", marginBottom: 16 }}>{title}</h2>
        <p className="lede" style={{ color: "rgba(255,255,255,0.9)", marginBottom: 32 }}>{lede}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={primaryHref} className="btn" style={{ background: "#FFF", color: "var(--brand)" }}>{primaryLabel} <Arrow/></a>
          <a href={secondaryHref} className="btn btn-ghost" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#FFF" }}>{secondaryLabel}</a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PageHero, SplitSection, CardGrid, StepGrid, FAQSection, CTABand });
