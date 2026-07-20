// Shared components for Dr. Mejía's site — v2 (modern medical)

const NAV_ITEMS = [
  { href: "index.html", label: "Inicio", key: "home" },
  { href: "sobre.html", label: "Sobre el Dr.", key: "about" },
  { href: "tamizaje.html", label: "Tamizaje", key: "karyotype" },
  { href: "blog.html", label: "Publicaciones", key: "blog" },
  { href: "contacto.html", label: "Contacto", key: "contact" },
];

function SiteHeader({ active }) {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="site-header">
      <div className="container nav">
        <a href="index.html" className="nav-brand">
          <div className="nav-mark">M</div>
          <div className="nav-name">
            Dr. Gerardo Mejía
            <small>Pediatría · Genética Médica</small>
          </div>
        </a>
        <nav className="nav-links nav-links-desktop">
          {NAV_ITEMS.map(item => (
            <a key={item.key} href={item.href}
               className={"nav-link" + (active === item.key ? " active" : "") + (item.key === "blog" ? " nav-link-hide-md" : "")}>
              {item.label}
            </a>
          ))}
          <a href="contacto.html" className="btn btn-primary" style={{ padding: "11px 20px", fontSize: 14 }}>
            Agendar cita <Arrow/>
          </a>
        </nav>
        <button className="nav-burger" aria-label="Menú" onClick={() => setOpen(o => !o)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {open ? <><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></> : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="13" x2="21" y2="13"/><line x1="3" y1="19" x2="21" y2="19"/></>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="nav-mobile-panel">
          {NAV_ITEMS.map(item => (
            <a key={item.key} href={item.href} className={"nav-mobile-link" + (active === item.key ? " active" : "")}>
              {item.label}
            </a>
          ))}
          <a href="contacto.html" className="btn btn-primary" style={{ marginTop: 8 }}>
            Agendar cita <Arrow/>
          </a>
        </div>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#FFF", color: "var(--brand-deep)", fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>M</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>
                Dr. Gerardo Mejía
                <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.6)", marginTop: 1 }}>
                  Pediatría · Genética Médica
                </div>
              </div>
            </div>
            <p className="body" style={{ color: "rgba(255,255,255,0.75)", maxWidth: 320, fontSize: 14 }}>
              Pediatría y genética médica en Clínica Perinatal, Managua. Lunes a Viernes, 11:30 AM – 5:00 PM.
            </p>
          </div>
          <div>
            <div className="meta" style={{ color: "rgba(255,255,255,0.5)", marginBottom: 16, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Navegación</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {NAV_ITEMS.map(item => <li key={item.key}><a href={item.href} style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>{item.label}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="meta" style={{ color: "rgba(255,255,255,0.5)", marginBottom: 16, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Clínica</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: 1.7 }}>
              Clínica Perinatal<br/>De los semáforos del Monte de los Olivos<br/>1c al lago, 1c al este, 20m al sur<br/>Managua, Nicaragua<br/>
              <span style={{ display: "block", marginTop: 12, color: "rgba(255,255,255,0.6)", fontSize: 13 }}>L–V · 11:30 AM – 5:00 PM</span>
            </p>
          </div>
          <div>
            <div className="meta" style={{ color: "rgba(255,255,255,0.5)", marginBottom: 16, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Contacto</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
              <li><a href="https://wa.me/50583976896" style={{ color: "rgba(255,255,255,0.85)" }}>WhatsApp · 8397-6896</a></li>
              <li><a href="tel:+50522785301" style={{ color: "rgba(255,255,255,0.85)" }}>Citas · 2278-5301</a></li>
            </ul>
          </div>
        </div>
        <hr style={{ border: 0, borderTop: "1px solid rgba(255,255,255,0.15)", margin: "0 0 24px" }}/>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span className="meta" style={{ color: "rgba(255,255,255,0.55)" }}>© 2026 Dr. Gerardo Mejía · Todos los derechos reservados</span>
          <span className="meta" style={{ color: "rgba(255,255,255,0.55)" }}>Pediatría · Genética Médica · Managua, Nicaragua</span>
        </div>
      </div>
    </footer>
  );
}

function Placeholder({ label, height = 400, mint = false, style = {}, radius }) {
  return (
    <div className={"placeholder" + (mint ? " placeholder-mint" : "")}
         style={{ height, borderRadius: radius || "var(--r-lg)", ...style }}>
      <span className="placeholder-label">{label}</span>
    </div>
  );
}

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Simple line icons
function Icon({ name, size = 28 }) {
  const stroke = "currentColor";
  const sw = 1.7;
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  switch (name) {
    case "stethoscope":
      return <svg {...common}><path d="M5 4v6a4 4 0 0 0 8 0V4"/><circle cx="18" cy="14" r="2"/><path d="M9 14v3a4 4 0 0 0 7 0v-1"/></svg>;
    case "dna":
      return <svg {...common}><path d="M7 4c0 4 10 4 10 8s-10 4-10 8"/><path d="M17 4c0 4-10 4-10 8s10 4 10 8"/><path d="M8 7h8M8 17h8M9 10h6M9 14h6"/></svg>;
    case "baby":
      return <svg {...common}><circle cx="12" cy="9" r="4"/><path d="M9 9h.01M15 9h.01M9.5 11.5a3 3 0 0 0 5 0"/><path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/></svg>;
    case "heart":
      return <svg {...common}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>;
    case "shield":
      return <svg {...common}><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>;
    case "doc":
      return <svg {...common}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>;
    case "phone":
      return <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>;
    case "pin":
      return <svg {...common}><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "check":
      return <svg {...common}><polyline points="5 12 10 17 19 8"/></svg>;
    case "award":
      return <svg {...common}><circle cx="12" cy="9" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg>;
    default: return null;
  }
}

Object.assign(window, { NAV_ITEMS, SiteHeader, SiteFooter, Placeholder, Arrow, Icon });
