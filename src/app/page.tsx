"use client";
import Image from "next/image";
import { useState } from "react";

const WA_LINK = "https://wa.me/34681816004?text=Hola%20Paco%2C%20quiero%20info%20sobre%20el%20entrenamiento";
const WA_LINK_START = "https://wa.me/34681816004?text=Hola%20Paco%2C%20quiero%20empezar";
const IG_LINK = "https://www.instagram.com/pacomont24/";

// ─── Schema SEO ───────────────────────────────────────────────────────────────
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pacomont",
  alternateName: "pacomont24",
  description: "Embajador oficial HYROX en España. Atleta PRO con mejor tiempo de 1:03 en categoría PRO.",
  url: "https://www.pacomont.es",
  sameAs: [
    "https://www.instagram.com/pacomont24/",
    "https://www.tiktok.com/@pacomont24",
    "https://www.youtube.com/@pacomont24",
  ],
  jobTitle: "Embajador Oficial HYROX",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const INCLUDES = [
  "Plan de entrenamiento 100% personalizado",
  "Plan de nutrición adaptado a tu objetivo",
  "Seguimiento cada 15 dias por chat privado.",
  "Acceso a la app Pacomont con tus sesiones",
  "Ajustes y revisiones continuos",
  "Vídeos explicativos de ejercicios",
];

const STATS = [
  { num: "-20kg", label: "Perdi mas de 20kg" },
  { num: "+75", label: "Atletas entrenados" },
  { num: "4", label: "HYROX PRO" },
];

const AUDIENCE = [
  { n: "01", title: "Tu objetivo", desc: "¿Primer HYROX, bajar marca o mejorar físico? El plan se construye desde ahí." },
  { n: "02", title: "Tu disponibilidad", desc: "Diseñamos la semana según los días y horas que tienes de verdad." },
  { n: "03", title: "Tu nivel", desc: "Principiante, intermedio o atleta con base — la carga se adapta siempre." },
  { n: "04", title: "Tu historial", desc: "Lesiones, limitaciones, material disponible: nada se ignora." },
  { n: "05", title: "Tu alimentación", desc: "Una nutrición flexible adaptada a ti, para que puedas comer lo que te gusta sin seguir una dieta imposible de mantener." },
  { n: "06", title: "Tu progreso", desc: "Tendrás toda tu planificación organizada en la app para registrar tus entrenamientos y comprobar cómo mejoras semana tras semana." },
  { n: "07", title: "Tu vida real", desc: "No necesitas vivir para entrenar. Necesitas un método que puedas mantener incluso cuando tienes poco tiempo, viajas o pierdes la motivación." },
];

const WORKOUT = [
  { n: "01", title: "Fuerza principal", desc: "Sentadilla trasera · 4 × 6-8 repeticiones · Descanso 120 s" },
  { n: "02", title: "Fuerza accesoria", desc: "Peso muerto rumano 10 reps · Zancadas 12/12 · 3 rondas · Descanso 90 s" },
  { n: "03", title: "Bloque HYROX", desc: "SkiErg 500 m · Sled Push 20 m · 15 Burpee Broad Jumps · 4 rondas · Descanso 90 s" },
  { n: "04", title: "Core y finisher", desc: "20 Wall Balls · Farmer Carry 40 m · Plancha 45 s · 3 rondas · Descanso 60s" },
];

const PROGRESS = [
  { n: "01", title: "Todo tu progreso en un mismo lugar", desc: "Registra tus entrenamientos, controla tu evolución y comprueba todo lo que estás avanzando desde la app." },
  { n: "02", title: "Un camino claro", desc: "Sabrás qué hacer cada día, sin perder tiempo buscando entrenamientos o improvisando en el gimnasio." },
  { n: "03", title: "Acompañamiento constante", desc: "No estarás solo durante el proceso. Tendrás acceso a la comunidad, soporte y nuevas herramientas para ayudarte a mantener la constancia." },
  { n: "04", title: "Un método que evoluciona contigo", desc: "Avanza progresivamente y adapta el entrenamiento a tu nivel, tus objetivos y tu vida real." },
];

const STEPS = [
  { n: "01", title: "Hablamos por WhatsApp", desc: "Me cuentas tu situación, objetivo y disponibilidad. Sin formularios, sin esperas." },
  { n: "02", title: "Diseño tu plan", desc: "Entreno + nutrición personalizados para ti. Lo tienes en la app en 24h." },
  { n: "03", title: "Seguimiento real", desc: "Ajustes cada 15 dias, respondo tus dudas y vamos mejorando juntos." },
];

const TESTIMONIALS = [
  {
    quote: "En solo 3 meses he conseguido sentirme más fuerte, verme mejor y crear una rutina que por fin puedo mantener.",
    name: "Antonia M.",
    role: "Atleta que queria verse mejor.",
  },
  {
    quote: "Me siento fenomenal, nunca había corrido y me he hecho los 10k esta mañana y mejorando el ritmo, voy lento pero cada vez mejor.",
    name: "Rodrigo G.",
    role: "Runner principiante",
  },
  {
    quote: "La combinación entreno + nutri + app es lo más completo que he probado. Y el precio no tiene competencia.",
    name: "David R.",
    role: "Primer HYROX completado",
  },
];

const FAQS = [
  { q: "¿Necesito experiencia previa en HYROX?", a: "No. Trabajo con atletas de todos los niveles, desde quien va a su primer HYROX hasta quienes buscan bajar su marca en categoría PRO." },
  { q: "¿Cuántos días a la semana tengo que entrenar?", a: "Los que puedas. El plan se diseña según tu disponibilidad real, no la ideal. Funciona con 3 días o con 6." },
  { q: "¿Cómo funciona el seguimiento?", a: "Por WhatsApp, directamente conmigo. Reviso tus sesiones cada semana, ajusto el plan y resuelvo tus dudas cuando las tengas." },
  { q: "¿Incluye plan de nutrición?", a: "Sí. Entrenamiento y nutrición van juntos. Sin una buena alimentación no hay progreso real." },
  { q: "¿Cuánto tiempo tarda en llegar mi plan?", a: "En menos de 24h desde nuestra primera conversación tienes tu plan listo en la app." },
];

// ─── Components ───────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="nav-inner" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "20px 32px", display: "flex", alignItems: "center",
      justifyContent: "space-between",
      background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)",
    }}>
      <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff" }}>
        Pacomont
      </span>
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="nav-cta" style={{
        background: "#0d1520", color: "#fff", fontSize: 13, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.08em",
        padding: "11px 22px", borderRadius: 3, textDecoration: "none",
      }}>
        Empezar ahora
      </a>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{
      position: "relative", minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-end",
      padding: "0 24px 80px", textAlign: "center", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/images/HERO_NEW4.png"
          alt="Pacomont — HYROX PRO España"
          fill priority
          style={{ objectFit: "cover", objectPosition: "center center" }}
          sizes="100vw"
        />
      </div>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.78) 100%)",
      }} />
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, maxWidth: 580 }}>
        <p style={{ fontSize: "clamp(17px, 2.2vw, 22px)", fontWeight: 600, lineHeight: 1.55, color: "#e5e7eb", margin: 0 }}>
          Entrenamiento, nutrición y seguimiento personalizados.<br />
          Adaptados a ti y a tu objetivo.
        </p>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-hero" style={{
          display: "inline-block", background: "#25D366", color: "#fff",
          fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
          padding: "17px 44px", borderRadius: 3, textDecoration: "none",
          border: "1px solid #fff",
        }}>
          Quiero empezar
        </a>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section style={{ background: "#ffffff", padding: "88px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{
          width: "100%", aspectRatio: "16/9", background: "#0d1520",
          borderRadius: 16, overflow: "hidden", position: "relative",
          boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Reemplazar por <video> o embed cuando tengas el vídeo */}
          <div style={{
            width: 80, height: 80, background: "rgba(37,99,235,0.9)",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <polygon points="6,3 20,12 6,21" />
            </svg>
          </div>
          <p style={{
            position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center",
            fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)", margin: 0,
          }}>Tu vídeo aquí</p>
        </div>
      </div>
    </section>
  );
}

function Includes() {
  return (
    <section style={{ background: "#ffffff", padding: "88px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563eb", margin: "0 0 14px" }}>Lo que incluye</p>
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#0d1520", lineHeight: 1.15, letterSpacing: "-0.02em", margin: 0 }}>
          Todo lo que necesitas para mejorar
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 16, marginTop: 48 }}>
          {INCLUDES.map((item) => (
            <div key={item} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              padding: "22px 20px", background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb",
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 3, background: "#0d1520",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2,
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <polyline points="1.5,6 4.5,9 10.5,3" stroke="#fff" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                </svg>
              </div>
              <p style={{ fontSize: 15, color: "#0d1520", fontWeight: 500, lineHeight: 1.5, margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoachIntro() {
  return (
    <section style={{ background: "#f5f7fb", padding: "88px 24px" }}>
      <div className="coach-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div style={{ aspectRatio: "9/16", borderRadius: 20, overflow: "hidden", background: "#0d1520", position: "relative" }}>
            <iframe
              src="https://www.youtube.com/embed/ZmzHbVOQ3Aw?rel=0&modestbranding=1&autoplay=1&mute=1&loop=1&playlist=ZmzHbVOQ3Aw&playsinline=1"
              title="Pacomont — Tu nuevo coach"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
          <div style={{
            position: "absolute", bottom: -16, right: -16,
            background: "#fff", borderRadius: 14, padding: "12px 18px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)", textAlign: "center",
          }}>
            <p style={{ fontSize: 14, fontWeight: 900, color: "#0d1520", letterSpacing: "0.06em", margin: 0 }}>HYROX</p>
            <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9ca3af", margin: "3px 0 0" }}>Ambassador</p>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563eb", margin: "0 0 14px" }}>Tu nuevo coach</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#0d1520", lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 20px" }}>
            Tengo 36 años.<br />
            <span style={{ color: "#2563eb" }}>El mejor momento de mi vida.</span>
          </h2>
          <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.75, margin: "0 0 16px" }}>
            No te lo digo como excusa ni para presumir.<br />
            Te lo digo porque hace años no imaginaba que, a los 36 años, competiría en HYROX PRO, tendría más energía que a los 25 y estaría en la mejor forma de mi vida.
          </p>
          <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.75, margin: 0 }}>
            La edad no es el límite. El verdadero cambio empieza cuando encuentras un método que encaja contigo y eres constante. Yo lo conseguí, y ahora quiero ayudarte a que tú también lo consigas.
          </p>
          <div className="stats-row" style={{ display: "flex", gap: 40, marginTop: 40 }}>
            {STATS.map((s) => (
              <div key={s.num}>
                <p style={{ fontSize: 38, fontWeight: 900, color: "#0d1520", letterSpacing: "-0.03em", lineHeight: 1, margin: 0 }}>{s.num}</p>
                <p style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500, margin: "6px 0 0" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ForWhom() {
  return (
    <section style={{ background: "#ffffff", padding: "88px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563eb", margin: "0 0 14px" }}>Para quién es</p>
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#0d1520", lineHeight: 1.15, letterSpacing: "-0.02em", margin: 0, maxWidth: 520 }}>
          El método se adapta a ti, para ponerte en forma de verdad
        </h2>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 48 }}>
          {AUDIENCE.map((c) => (
            <div key={c.n} style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "24px 0", borderBottom: "1px solid #e5e7eb" }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#2563eb", margin: "4px 0 0", flexShrink: 0, width: 32 }}>{c.n}</p>
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#0d1520", margin: "0 0 6px" }}>{c.title}</p>
                <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.65, margin: 0, maxWidth: 560 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrainingExample() {
  return (
    <section style={{ background: "#f5f7fb", padding: "88px 24px" }}>
      <div className="training-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 0.8fr", gap: 64, alignItems: "start" }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563eb", margin: "0 0 14px" }}>Un día por dentro</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#0d1520", lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 40px" }}>
            Así es un ejemplo de entrenamiento
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {WORKOUT.map((w) => (
              <div key={w.n} style={{ display: "flex", gap: 20 }}>
                <p style={{ fontSize: 32, fontWeight: 900, color: "#2563eb", lineHeight: 1, margin: 0, flexShrink: 0, width: 44 }}>{w.n}</p>
                <div>
                  <p style={{ fontSize: 17, fontWeight: 700, color: "#0d1520", margin: "0 0 6px" }}>— {w.title}</p>
                  <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.6, margin: 0 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Phone mockup */}
        <div className="training-phone" style={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            width: 260, aspectRatio: "402/874", borderRadius: 40, background: "#0d1520",
            padding: 5, boxShadow: "0 40px 80px rgba(0,0,0,0.18)", position: "relative",
          }}>
            <div style={{ width: "100%", height: "100%", borderRadius: 36, overflow: "hidden", background: "#1a2535", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textAlign: "center", padding: 20 }}>App screenshot</p>
            </div>
            <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", width: 76, height: 22, borderRadius: 14, background: "#0d1520" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function AppMockup() {
  return (
    <section style={{ background: "#ffffff", padding: "88px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563eb", margin: "0 0 14px" }}>La app</p>
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#0d1520", lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 48px", maxWidth: 560 }}>
          Tus entrenamientos, siempre a mano
        </h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", alignItems: "flex-end" }}>
          {[
            { src: "/images/app-training.png", alt: "Sesión de entrenamiento en la app Pacomont", offset: 32 },
            { src: "/images/app-perfil.png", alt: "Perfil y progreso en la app Pacomont", offset: 0 },
            { src: "/images/app-nutri.png", alt: "Plan de nutrición en la app Pacomont", offset: 32 },
          ].map((screen) => (
            <div key={screen.src} style={{
              width: 220, aspectRatio: "402/874", borderRadius: 36, background: "#0d1520",
              padding: 4, boxShadow: "0 40px 80px rgba(0,0,0,0.18)", position: "relative",
              flexShrink: 0, marginBottom: screen.offset,
            }}>
              <div style={{ width: "100%", height: "100%", borderRadius: 32, overflow: "hidden", position: "relative" }}>
                <Image src={screen.src} alt={screen.alt} fill style={{ objectFit: "cover", objectPosition: "top center" }} sizes="220px" />
              </div>
              <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 64, height: 18, borderRadius: 12, background: "#0d1520" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Progress() {
  return (
    <section style={{ background: "#f5f7fb", padding: "88px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563eb", margin: "0 0 14px" }}>
          Controla tu progreso. Nosotros te acompañamos.
        </p>
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#0d1520", letterSpacing: "-0.02em", lineHeight: 1.2, maxWidth: 620, margin: "0 0 56px" }}>
          Deja de entrenar sin rumbo.<br />Empieza a avanzar con un método claro.
        </h2>
        <div className="progress-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 1,
          background: "#e5e7eb", border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden",
        }}>
          {PROGRESS.map((p) => (
            <div key={p.n} style={{ background: "#f5f7fb", padding: "36px 32px" }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#2563eb", margin: "0 0 12px" }}>{p.n}</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#0d1520", margin: "0 0 10px" }}>{p.title}</p>
              <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="cta-box" style={{ maxWidth: 680, margin: "56px auto 0", textAlign: "center", padding: "56px 40px", background: "#0d1520", borderRadius: 24 }}>
          <p style={{ fontSize: "clamp(20px, 2.6vw, 26px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.4, margin: "0 0 28px" }}>
            Tú haces el trabajo. Nosotros te damos el plan, las herramientas y el apoyo para conseguirlo.
          </p>
          <a href={WA_LINK_START} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", background: "#2563eb", color: "#fff",
            fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
            padding: "16px 40px", borderRadius: 3, textDecoration: "none",
          }}>
            Quiero empezar
          </a>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section style={{ background: "#ffffff", padding: "88px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563eb", margin: "0 0 14px" }}>Resultados</p>
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#0d1520", lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
          Personas reales. Cambios reales.
        </h2>
        <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.75, margin: 0, maxWidth: 620 }}>
          Ellos también empezaron con dudas, poco tiempo y sin saber qué hacer. Hoy entrenan mejor, se sienten más fuertes y han conseguido un cambio que pueden mantener.
        </p>
        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginTop: 48 }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden" }}>
              {/* Antes/después placeholder */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", aspectRatio: "4/3" }}>
                <div style={{ background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>Antes</p>
                </div>
                <div style={{ background: "#d1d5db", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>Después</p>
                </div>
              </div>
              <div style={{ padding: "28px 24px" }}>
                <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.7, margin: "0 0 20px", fontStyle: "italic" }}>"{t.quote}"</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#0d1520", margin: 0 }}>{t.name}</p>
                <p style={{ fontSize: 12, color: "#9ca3af", margin: "2px 0 0" }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={{ background: "#ffffff", padding: "88px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563eb", margin: "0 0 14px" }}>Cómo funciona</p>
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#0d1520", lineHeight: 1.15, letterSpacing: "-0.02em", margin: 0 }}>
          Simple. Directo. Sin complicaciones.
        </h2>
        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, marginTop: 48 }}>
          {STEPS.map((st) => (
            <div key={st.n}>
              <p style={{ fontSize: 48, fontWeight: 900, color: "#e5e7eb", lineHeight: 1, margin: "0 0 16px", letterSpacing: "-0.04em" }}>{st.n}</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#0d1520", margin: "0 0 10px" }}>{st.title}</p>
              <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.65, margin: 0 }}>{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section id="oferta" style={{ background: "#f5f7fb", padding: "88px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="cta-box" style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", padding: "64px 40px", background: "#0d1520", borderRadius: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563eb", margin: "0 0 14px" }}>Empieza hoy</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
            ¿Listo para ver resultados reales?
          </h2>
          <p style={{ fontSize: 16, color: "#9ca3af", lineHeight: 1.75, margin: "0 0 40px" }}>
            Sin precios escondidos ni compromisos raros. Escríbeme y en menos de 24h tienes tu plan.
          </p>
          <a href={WA_LINK_START} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", background: "#2563eb", color: "#fff",
            fontSize: 15, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
            padding: "18px 48px", borderRadius: 3, textDecoration: "none",
          }}>
            Quiero empezar
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section style={{ background: "#f5f7fb", padding: "88px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#2563eb", margin: "0 0 14px" }}>FAQ</p>
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#0d1520", lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 48px" }}>
          Preguntas frecuentes
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid #e5e7eb", padding: "22px 0" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  gap: 16, fontSize: 16, fontWeight: 600, color: "#0d1520", cursor: "pointer",
                  background: "none", border: "none", padding: 0, textAlign: "left", fontFamily: "inherit",
                }}
              >
                {f.q}
                <span style={{ flexShrink: 0, fontSize: 22, color: "#2563eb", lineHeight: 1, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {open === i && (
                <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.7, margin: "10px 0 0" }}>{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#0d1520", color: "#9ca3af", padding: "48px 24px", textAlign: "center", fontSize: 14 }}>
      <p style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff", margin: "0 0 16px" }}>Pacomont</p>
      <p style={{ margin: 0 }}>
        Embajador Oficial HYROX España ·{" "}
        <a href={IG_LINK} target="_blank" rel="noopener noreferrer" style={{ color: "#9ca3af" }}>@pacomont24</a>
      </p>
      <p style={{ margin: "8px 0 0", fontSize: 12, color: "#4b5563" }}>© 2026 Pacomont. Todos los derechos reservados.</p>
    </footer>
  );
}

// ─── Schema JSON-LD ───────────────────────────────────────────────────────────
function SchemaScript() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <SchemaScript />
      <Navbar />
      <Hero />
      <VideoSection />
      <Includes />
      <CoachIntro />
      <ForWhom />
      <TrainingExample />
      <AppMockup />
      <Progress />
      <Testimonials />
      <HowItWorks />
      <Offer />
      <FAQ />
      <Footer />
    </>
  );
}
