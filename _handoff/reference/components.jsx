// Shared components for Dr. Mejía's site — v2.1 (UX audit fixes)

const CLINIC_HOURS = "Lunes a Viernes · 11:30 AM – 5:00 PM";
/** Phones TBD — replace before launch. WhatsApp CTAs route to contacto until confirmed. */
const PHONE_WHATSAPP_LABEL = "WhatsApp · por confirmar";
const PHONE_CLINIC_LABEL = "Citas · por confirmar";
const WHATSAPP_URL = "contacto.html";
const PHONE_CLINIC_HREF = "contacto.html";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica+Perinatal+Monte+de+los+Olivos+Managua";
const WAZE_URL = "https://waze.com/ul?q=Cl%C3%ADnica%20Perinatal%20Monte%20de%20los%20Olivos%20Managua";

const NAV_ITEMS = [
  { href: "index.html", label: "Inicio", key: "home" },
  { href: "servicios.html", label: "Servicios", key: "services" },
  { href: "tamizaje.html", label: "Tamizaje neonatal", key: "tamizaje" },
  { href: "sobre.html", label: "Sobre el Dr.", key: "about" },
  { href: "contacto.html", label: "Contacto", key: "contact" },
];

const FOOTER_EXTRA = [
  { href: "faq.html", label: "Preguntas frecuentes" },
  { href: "blog.html", label: "Publicaciones" },
  { href: "profesionales.html", label: "Profesionales" },
  { href: "legal.html#privacidad", label: "Privacidad" },
];

function SiteHeader({ active }) {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="site-header">
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <div className="container nav">
        <a href="index.html" className="nav-brand">
          <div className="nav-mark">M</div>
          <div className="nav-name">
            Dr. Gerardo Mejía
            <small>Pediatría · Genética Médica</small>
          </div>
        </a>
        <nav className="nav-links nav-links-desktop" aria-label="Principal">
          {NAV_ITEMS.map(item => (
            <a key={item.key} href={item.href}
               className={"nav-link" + (active === item.key ? " active" : "")}>
              {item.label}
            </a>
          ))}
          <a href="contacto.html" className="btn btn-primary nav-cta-desktop" style={{ padding: "11px 20px", fontSize: 14 }}>
            Agendar cita <Arrow/>
          </a>
        </nav>
        <div className="nav-mobile-actions">
          <a href="contacto.html" className="btn btn-primary nav-cta-mobile">Agendar</a>
          <button className="nav-burger" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} onClick={() => setOpen(o => !o)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {open ? <><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></> : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="13" x2="21" y2="13"/><line x1="3" y1="19" x2="21" y2="19"/></>}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="nav-mobile-panel">
          {NAV_ITEMS.map(item => (
            <a key={item.key} href={item.href} className={"nav-mobile-link" + (active === item.key ? " active" : "")}>
              {item.label}
            </a>
          ))}
          <a href={WHATSAPP_URL} className="btn btn-whatsapp" style={{ marginTop: 8 }}>
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 48, marginBottom: 40 }}>
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
                Pediatría y genética médica en Clínica Perinatal, Managua. {CLINIC_HOURS}.
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
                <span style={{ display: "block", marginTop: 12, color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{CLINIC_HOURS}</span>
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#FFF", textDecoration: "underline", textUnderlineOffset: 3 }}>Google Maps</a>
                <a href={WAZE_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#FFF", textDecoration: "underline", textUnderlineOffset: 3 }}>Waze</a>
              </div>
            </div>
            <div>
              <div className="meta" style={{ color: "rgba(255,255,255,0.5)", marginBottom: 16, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Contacto</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
                <li><a href={WHATSAPP_URL} style={{ color: "rgba(255,255,255,0.85)" }}>{PHONE_WHATSAPP_LABEL}</a></li>
                <li><a href={PHONE_CLINIC_HREF} style={{ color: "rgba(255,255,255,0.85)" }}>{PHONE_CLINIC_LABEL}</a></li>
              </ul>
              <div className="meta" style={{ color: "rgba(255,255,255,0.5)", margin: "20px 0 12px", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Más</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
                {FOOTER_EXTRA.map(item => <li key={item.href}><a href={item.href} style={{ color: "rgba(255,255,255,0.85)" }}>{item.label}</a></li>)}
              </ul>
            </div>
          </div>
          <p style={{ fontSize: 12, lineHeight: 1.55, color: "rgba(255,255,255,0.55)", maxWidth: 920, margin: "0 0 24px" }}>
            Este sitio es informativo y no sustituye una consulta médica. No use este canal ante emergencias: acuda al servicio de urgencias más cercano o llame a los servicios de emergencia locales.
          </p>
          <hr style={{ border: 0, borderTop: "1px solid rgba(255,255,255,0.15)", margin: "0 0 24px" }}/>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <span className="meta" style={{ color: "rgba(255,255,255,0.55)" }}>© 2026 Dr. Gerardo Mejía · Todos los derechos reservados</span>
            <a href="legal.html#privacidad" className="meta" style={{ color: "rgba(255,255,255,0.55)" }}>Aviso de privacidad</a>
          </div>
        </div>
      </footer>
      <WhatsAppFloat />
    </>
  );
}

function WhatsAppFloat() {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href={WHATSAPP_URL}
      className={"wa-float" + (visible ? " is-visible" : "")}
      aria-label="Escribir por WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.026 2.013c-5.509 0-9.96 4.45-9.96 9.96 0 1.748.456 3.45 1.32 4.95l-1.4 5.117 5.235-1.376c1.444.789 3.07 1.205 4.715 1.205h.005c5.51 0 9.96-4.45 9.96-9.96 0-2.66-1.034-5.16-2.913-7.04-1.879-1.879-4.378-2.86-7.039-2.856z"/>
      </svg>
    </a>
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
      return <svg {...common}><circle cx="12" cy="9" r="4"/><path d="M9 9h.01M15 9h.01M9.5 11.5a3 3 0 0 0 5 0"/><path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 0v2"/></svg>;
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

Object.assign(window, {
  NAV_ITEMS, CLINIC_HOURS, WHATSAPP_URL, PHONE_WHATSAPP_LABEL, PHONE_CLINIC_LABEL, PHONE_CLINIC_HREF, MAPS_URL, WAZE_URL,
  SiteHeader, SiteFooter, WhatsAppFloat, Placeholder, Arrow, Icon,
});
