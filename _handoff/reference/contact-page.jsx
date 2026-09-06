// Contact page — v2.1 (consent, adult mode, hours, maps)

function ContactHero() {
  return (
    <section style={{ paddingTop: 56, paddingBottom: 32, background: "linear-gradient(180deg, var(--bg-blue) 0%, var(--bg) 100%)" }}>
      <div className="container">
        <div className="chip" style={{ marginBottom: 24 }}>
          <Icon name="phone" size={14}/> Contacto y citas
        </div>
        <h1 className="h1" style={{ maxWidth: 900 }}>
          Estamos aquí cuando <span style={{ color: "var(--brand)" }}>su familia</span> nos necesite
        </h1>
        <p className="lede" style={{ marginTop: 20, maxWidth: 640 }}>
          Complete el formulario o escriba por WhatsApp. Le contactamos en horario de clínica ({CLINIC_HOURS.replace("Lunes a Viernes · ", "")}).
        </p>
      </div>
    </section>
  );
}

function isPediatricReason(reason) {
  return ["general", "control", "karyotype"].includes(reason);
}

function ContactGrid() {
  const [submitted, setSubmitted] = React.useState(false);
  const [consent, setConsent] = React.useState(false);
  const [form, setForm] = React.useState({
    parent: "", phone: "", email: "", child: "", age: "", reason: "general", notes: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!consent) return;
    setSubmitted(true);
  }

  const showChildFields = isPediatricReason(form.reason);

  return (
    <section style={{ paddingTop: 32, paddingBottom: 80 }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, alignItems: "start" }}>
          <div className="card" style={{ padding: 40 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Solicitar cita</div>
            <h2 className="h3" style={{ marginBottom: 12 }}>Formulario de cita</h2>
            <p className="body" style={{ marginBottom: 28, fontSize: 15 }}>
              Complete el formulario y le contactaremos dentro de las próximas 24 horas hábiles.
              No envíe historiales clínicos completos aquí — solo lo necesario para contactarlo.
            </p>
            {submitted ? (
              <div style={{ background: "var(--bg-mint)", padding: 32, textAlign: "center", borderRadius: "var(--r-md)" }}>
                <div className="icon-circle mint" style={{ margin: "0 auto 12px" }}><Icon name="check"/></div>
                <h3 className="h4" style={{ marginBottom: 8 }}>Solicitud recibida</h3>
                <p className="body" style={{ margin: 0, fontSize: 14 }}>Le contactaremos pronto. Gracias por confiar en nosotros.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <Field label="Tipo de consulta" required>
                  <select value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })}>
                    <option value="general">Consulta pediátrica general</option>
                    <option value="control">Control de niño sano</option>
                    <option value="genetic">Asesoría genética (adulto / pareja)</option>
                    <option value="karyotype">Estudio de cariotipo / tamizaje</option>
                    <option value="second">Segunda opinión</option>
                    <option value="other">Otro motivo</option>
                  </select>
                </Field>
                <Field label={showChildFields ? "Nombre del padre o madre" : "Nombre completo"} required>
                  <input value={form.parent} onChange={e => setForm({ ...form, parent: e.target.value })} placeholder="Nombre completo" required />
                </Field>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <Field label="Teléfono / WhatsApp" required>
                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+505 0000-0000" required />
                  </Field>
                  <Field label="Correo electrónico">
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="su@correo.com" />
                  </Field>
                </div>
                {showChildFields && (
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
                    <Field label="Nombre del paciente (niño/a)">
                      <input value={form.child} onChange={e => setForm({ ...form, child: e.target.value })} placeholder="Nombre del niño/a" />
                    </Field>
                    <Field label="Edad">
                      <input value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} placeholder="6 meses" />
                    </Field>
                  </div>
                )}
                <Field label="Notas adicionales (opcional)">
                  <textarea rows={4} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Cuéntenos brevemente el motivo, sin datos clínicos sensibles..." />
                </Field>
                <label style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                    required
                    style={{ marginTop: 3, width: 18, height: 18, flexShrink: 0 }}
                  />
                  <span>
                    Acepto el tratamiento de mis datos para agendar la cita, conforme al{" "}
                    <a href="legal.html#privacidad" style={{ color: "var(--brand)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 }}>
                      aviso de privacidad
                    </a>
                    . Este formulario no es una historia clínica.
                  </span>
                </label>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
                  <button type="submit" className="btn btn-primary" disabled={!consent}>Enviar solicitud <Arrow/></button>
                </div>
              </form>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="card" style={{ background: "var(--green)", color: "#FFF", borderColor: "transparent" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.026 2.013c-5.509 0-9.96 4.45-9.96 9.96 0 1.748.456 3.45 1.32 4.95l-1.4 5.117 5.235-1.376c1.444.789 3.07 1.205 4.715 1.205h.005c5.51 0 9.96-4.45 9.96-9.96 0-2.66-1.034-5.16-2.913-7.04-1.879-1.879-4.378-2.86-7.039-2.856z"/>
                </svg>
                <h3 className="h4" style={{ color: "#FFF" }}>WhatsApp</h3>
              </div>
              <p style={{ fontSize: 14, opacity: 0.9, marginBottom: 16 }}>
                La forma más rápida de comunicarse. Respondemos en horario de clínica: {CLINIC_HOURS}.
              </p>
              <a href={WHATSAPP_URL} className="btn" style={{ background: "#FFF", color: "var(--green)" }}>{PHONE_WHATSAPP_LABEL} <Arrow/></a>
            </div>
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div className="icon-circle" style={{ width: 44, height: 44, marginBottom: 0 }}><Icon name="pin" size={20}/></div>
                <h3 className="h4">La clínica</h3>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: "var(--ink)", lineHeight: 1.6 }}>
                Clínica Perinatal<br/>De los semáforos del Monte de los Olivos<br/>1c al lago, 1c al este, 20m al sur<br/>Managua, Nicaragua
              </p>
              <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: "16px 0" }}/>
              <div>
                <div className="meta" style={{ fontSize: 12, marginBottom: 4 }}>Horario de atención</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{CLINIC_HOURS}</div>
                <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 8 }}>{PHONE_CLINIC_LABEL}</div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: "10px 14px", fontSize: 13 }}>Google Maps</a>
                <a href={WAZE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: "10px 14px", fontSize: 13 }}>Waze</a>
              </div>
            </div>
            <div className="card" style={{ background: "var(--bg-soft)" }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Primera consulta</div>
              <h3 className="h4" style={{ marginBottom: 12 }}>Qué conviene traer</h3>
              <ul className="check-list" style={{ margin: 0 }}>
                <li>Documento de identidad del acompañante</li>
                <li>Carnet de vacunas (si aplica)</li>
                <li>Estudios o informes previos relevantes</li>
                <li>Lista de medicamentos actuales</li>
              </ul>
            </div>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
              <Placeholder label="mapa · tocar para abrir en Google Maps" height={200}/>
            </a>
            <p className="meta" style={{ margin: 0, fontSize: 12 }}>
              Ante una emergencia médica, no use este formulario: acuda a urgencias o llame a los servicios de emergencia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-2)" }}>
        {label}{required && <span style={{ color: "var(--warn)" }}> *</span>}
      </span>
      {children}
      <style>{`
        label input, label textarea, label select {
          font-family: var(--sans); font-size: 15px; color: var(--ink);
          background: var(--bg); border: 1.5px solid var(--rule);
          padding: 12px 14px; width: 100%; outline: none;
          border-radius: var(--r-sm); transition: border-color 0.15s;
        }
        label input:focus, label textarea:focus, label select:focus { border-color: var(--brand); }
        label textarea { resize: vertical; }
        button.btn-primary:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
      `}</style>
    </label>
  );
}

Object.assign(window, { ContactHero, ContactGrid });
