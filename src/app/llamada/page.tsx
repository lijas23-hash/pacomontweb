"use client";
import { useState } from "react";

// ── Pacomont brand tokens ──────────────────────────────
const B = {
  carbon: "#1A1A1A",
  beige:  "#EFE3D3",
  brown:  "#6B5346",
  topo:   "#8C7868",
  arena:  "#DCCBBB",
  font:   "'Manrope', system-ui, sans-serif",
};

// ── Options ────────────────────────────────────────────
const OBJETIVOS = [
  "Quiero perder grasa",
  "Ganar masa muscular",
  "Mejorar mi rendimiento deportivo",
  "Mejorar mi salud y bienestar",
  "Otros",
];
const EXPERIENCIA = [
  "No, sería mi primera vez",
  "Sí, de forma presencial",
  "Sí, de forma online",
  "Online y presencial",
];
const INVERSION = [
  "Menos de 85€ al mes",
  "Más de 85€ al mes",
  "Lo que sea necesario",
];
const LETTERS = ["A","B","C","D","E"];

interface FormData {
  Nombre: string; Apellido: string; Email: string; Telefono: string; Edad: string;
  Objetivo: string; PorQueAhora: string; Lesiones: string;
  ExperienciaEntrenador: string; MayorObstaculo: string; Importancia: string; Inversion: string;
}

// ── Logo SVG ───────────────────────────────────────────
function Logo({ size = 40, light = false }: { size?: number; light?: boolean }) {
  const c = light ? B.beige : B.carbon;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="42" fill="none" stroke={c} strokeWidth="5.5" strokeLinecap="round"/>
      <path d="M 8 50 C 28 8, 72 92, 92 50" fill="none" stroke={c} strokeWidth="5.5" strokeLinecap="round"/>
    </svg>
  );
}

// ── Option card ────────────────────────────────────────
function OptionCard({ letter, label, selected, onClick }: { letter: string; label: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 12, width: "100%",
      textAlign: "left", padding: "13px 16px", borderRadius: 8, cursor: "pointer",
      border: selected ? `1.5px solid ${B.carbon}` : `1.5px solid ${B.arena}`,
      background: selected ? B.carbon : "#fff",
      color: selected ? B.beige : B.carbon,
      fontSize: 15, fontFamily: B.font, transition: "all 0.12s",
    }}>
      <span style={{
        width: 26, height: 26, borderRadius: 5, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
        background: selected ? B.beige : B.beige,
        color: selected ? B.carbon : B.topo,
      }}>{letter}</span>
      <span style={{ fontWeight: selected ? 500 : 400 }}>{label}</span>
    </button>
  );
}

// ── Scale ──────────────────────────────────────────────
function ScaleInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {[1,2,3,4,5,6,7,8,9,10].map(n => {
        const sel = value === String(n);
        return (
          <button key={n} type="button" onClick={() => onChange(String(n))} style={{
            width: 46, height: 46, borderRadius: 7, fontFamily: B.font,
            border: sel ? `1.5px solid ${B.carbon}` : `1.5px solid ${B.arena}`,
            background: sel ? B.carbon : "#fff",
            color: sel ? B.beige : B.carbon,
            fontSize: 15, fontWeight: sel ? 600 : 400, cursor: "pointer",
            transition: "all 0.12s",
          }}>{n}</button>
        );
      })}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────
export default function LlamadaPage() {
  const [form, setForm] = useState<FormData>({
    Nombre: "", Apellido: "", Email: "", Telefono: "", Edad: "",
    Objetivo: "", PorQueAhora: "", Lesiones: "",
    ExperienciaEntrenador: "", MayorObstaculo: "", Importancia: "", Inversion: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.Nombre || !form.Email || !form.Telefono || !form.Objetivo) {
      setError("Rellena nombre, email, teléfono y objetivo antes de continuar.");
      return;
    }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) setDone(true);
      else setError("Ha ocurrido un error. Inténtalo de nuevo.");
    } catch { setError("Error de conexión. Inténtalo de nuevo."); }
    finally { setLoading(false); }
  };

  const input: React.CSSProperties = {
    width: "100%", padding: "12px 14px", borderRadius: 8, boxSizing: "border-box",
    border: `1.5px solid ${B.arena}`, background: "#fff", color: B.carbon,
    fontSize: 15, fontFamily: B.font, outline: "none",
  };
  const label: React.CSSProperties = {
    display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em",
    textTransform: "uppercase", color: B.topo, marginBottom: 7,
  };
  const section: React.CSSProperties = {
    background: "#fff", border: `1px solid ${B.arena}`, borderRadius: 12,
    padding: "26px 24px", marginBottom: 14,
  };
  const qNum: React.CSSProperties = {
    display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
    textTransform: "uppercase", color: "#fff", background: B.brown,
    borderRadius: 4, padding: "3px 8px", marginBottom: 10,
  };
  const qTitle: React.CSSProperties = {
    fontSize: 16, fontWeight: 600, color: B.carbon, margin: "0 0 16px", lineHeight: 1.3,
  };

  if (done) return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: B.font }}>
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        <Logo size={56} />
        <h1 style={{ fontSize: 28, fontWeight: 700, color: B.carbon, margin: "24px 0 12px" }}>¡Formulario enviado!</h1>
        <p style={{ color: B.topo, fontSize: 16, lineHeight: 1.6, margin: "0 0 28px" }}>
          Paco revisará tus respuestas antes de la llamada. Si tienes alguna duda, escríbele por WhatsApp.
        </p>
        <a href="https://wa.me/34681816004"
          onClick={(e)=>{e.preventDefault();import("@/components/MetaPixel").then(m=>m.trackWAContact("https://wa.me/34681816004"));}}
          style={{
            display: "inline-block", background: "#25D366", color: "#fff",
            padding: "13px 24px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none",
          }}>
          Escribir por WhatsApp
        </a>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: B.font }}>

      {/* ── Header con foto ───────────────────────────── */}
      <div style={{
        height: 260,
        backgroundImage: "linear-gradient(to bottom, rgba(26,26,26,0.25) 0%, rgba(26,26,26,0.65) 100%), url(/images/rope-pull.jpg)",
        backgroundSize: "cover", backgroundPosition: "center 40%",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "0 32px 28px",
      }}>
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none", marginBottom: 12 }}>
          <Logo size={36} light />
        </a>
        <p style={{ color: B.beige, fontSize: 28, fontWeight: 700, margin: "0 0 2px", letterSpacing: "-0.01em" }}>
          PACOMONT
        </p>
        <p style={{ color: B.arena, fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", margin: 0 }}>
          ONLINE COACHING
        </p>
      </div>

      {/* ── Intro ─────────────────────────────────────── */}
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "36px 24px 0" }}>
        <p style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 700, color: B.carbon, margin: "0 0 10px", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
          Cuéntame un poco sobre ti
        </p>
        <p style={{ color: B.topo, fontSize: 15, lineHeight: 1.6, margin: "0 0 32px" }}>
          5 minutos que harán que la llamada sea mucho más útil para los dos.
        </p>
      </div>

      {/* ── Form ──────────────────────────────────────── */}
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "0 24px 80px" }}>
        <form onSubmit={handleSubmit} noValidate>

          {/* Contacto */}
          <div style={section}>
            <p style={{ fontSize: 13, fontWeight: 700, color: B.carbon, margin: "0 0 18px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Datos de contacto
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div><label style={label}>Nombre *</label><input style={input} value={form.Nombre} onChange={e => set("Nombre", e.target.value)} placeholder="Tu nombre" /></div>
              <div><label style={label}>Apellido</label><input style={input} value={form.Apellido} onChange={e => set("Apellido", e.target.value)} placeholder="Tu apellido" /></div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={label}>Email *</label>
              <input style={input} type="email" value={form.Email} onChange={e => set("Email", e.target.value)} placeholder="tu@email.com" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><label style={label}>Teléfono *</label><input style={input} type="tel" value={form.Telefono} onChange={e => set("Telefono", e.target.value)} placeholder="+34 600 000 000" /></div>
              <div><label style={label}>Edad</label><input style={input} type="number" value={form.Edad} onChange={e => set("Edad", e.target.value)} placeholder="Tu edad" /></div>
            </div>
          </div>

          {/* P1 */}
          <div style={section}>
            <span style={qNum}>1 / 7</span>
            <p style={qTitle}>¿En qué te puedo ayudar? *</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {OBJETIVOS.map((op, i) => <OptionCard key={op} letter={LETTERS[i]} label={op} selected={form.Objetivo === op} onClick={() => set("Objetivo", op)} />)}
            </div>
          </div>

          {/* P2 */}
          <div style={section}>
            <span style={qNum}>2 / 7</span>
            <p style={qTitle}>¿Por qué ahora? ¿Qué te ha llevado a dar este paso?</p>
            <textarea style={{ ...input, minHeight: 96, resize: "vertical" }} value={form.PorQueAhora} onChange={e => set("PorQueAhora", e.target.value)} placeholder="Cuéntame lo que sea. Cuanto más sincero/a seas, mejor puedo preparar la llamada." />
          </div>

          {/* P3 */}
          <div style={section}>
            <span style={qNum}>3 / 7</span>
            <p style={qTitle}>¿Tienes alguna lesión o limitación física?</p>
            <textarea style={{ ...input, minHeight: 80, resize: "vertical" }} value={form.Lesiones} onChange={e => set("Lesiones", e.target.value)} placeholder="Rodilla, espalda, hombro… o escribe 'Ninguna' si estás bien." />
          </div>

          {/* P4 */}
          <div style={section}>
            <span style={qNum}>4 / 7</span>
            <p style={qTitle}>¿Has trabajado antes con un entrenador?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {EXPERIENCIA.map((op, i) => <OptionCard key={op} letter={LETTERS[i]} label={op} selected={form.ExperienciaEntrenador === op} onClick={() => set("ExperienciaEntrenador", op)} />)}
            </div>
          </div>

          {/* P5 */}
          <div style={section}>
            <span style={qNum}>5 / 7</span>
            <p style={qTitle}>¿Cuál es tu mayor obstáculo para conseguir tu objetivo?</p>
            <textarea style={{ ...input, minHeight: 80, resize: "vertical" }} value={form.MayorObstaculo} onChange={e => set("MayorObstaculo", e.target.value)} placeholder="Tiempo, motivación, no saber qué hacer, lesiones previas…" />
          </div>

          {/* P6 */}
          <div style={section}>
            <span style={qNum}>6 / 7</span>
            <p style={qTitle}>Del 1 al 10, ¿cómo de importante es para ti conseguir esto ahora?</p>
            <p style={{ color: B.topo, fontSize: 13, margin: "0 0 16px" }}>1 = no es urgente · 10 = es lo más importante ahora mismo</p>
            <ScaleInput value={form.Importancia} onChange={v => set("Importancia", v)} />
          </div>

          {/* P7 */}
          <div style={section}>
            <span style={qNum}>7 / 7</span>
            <p style={qTitle}>¿Cuánto estás dispuesto/a a invertir en ti cada mes?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {INVERSION.map((op, i) => <OptionCard key={op} letter={LETTERS[i]} label={op} selected={form.Inversion === op} onClick={() => set("Inversion", op)} />)}
            </div>
          </div>

          {error && (
            <p style={{ color: "#b91c1c", fontSize: 14, padding: "11px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, marginBottom: 16 }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "15px", borderRadius: 10, border: "none",
            background: loading ? B.topo : B.carbon, color: B.beige,
            fontSize: 15, fontWeight: 600, fontFamily: B.font,
            cursor: loading ? "not-allowed" : "pointer", letterSpacing: "0.03em",
            transition: "background 0.15s",
          }}>
            {loading ? "Enviando…" : "Enviar respuestas →"}
          </button>

          <p style={{ textAlign: "center", color: B.topo, fontSize: 12, marginTop: 14 }}>
            Tus datos se usan exclusivamente para la llamada.
          </p>
        </form>
      </div>
    </div>
  );
}
