"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Lang = "es" | "en";

const C = {
  bg:     "#F4F1EA",
  bg2:    "#EDE8DF",
  dark:   "#1A1A1A",
  text:   "#1A1A1A",
  gold:   "#A8873A",
  muted:  "#6B6555",
  border: "#D4C9B5",
};

// ── Bilingual texts ──────────────────────────────────────
const T = {
  es: {
    tag:         "MEDIA KIT · 2026",
    tagline:     "Atleta híbrido · Embajador HYROX en España",
    cta:         "Hablemos",
    s_nums:      "NÚMEROS",
    nums_sub:    "Últimos 12 meses · datos verificados",
    s_who:       "QUIÉN SOY",
    who_sub:     "Tres cosas que explican por qué mi audiencia conecta",
    s_aud:       "AUDIENCIA",
    aud_sub:     "Instagram · datos verificados sobre followers",
    aud_note:    "Audiencia hispanohablante en España y Latinoamérica",
    int_label:   "Intereses",
    gender_l:    "Género",
    age_l:       "Edad",
    countries_l: "Países principales",
    m_label:     "Hombre",
    f_label:     "Mujer",
    s_vid:       "CONTENIDO",
    vid_sub:     "Competición, entreno y lifestyle",
    vid_tap:     "Toca para ver",
    s_case:      "CASO DE ÉXITO",
    case_brand:  "EL CORTE INGLÉS × BOOMERANG SPORT",
    case_sub:    "Contenido de marca alcanzando muy por encima de la propia comunidad",
    case_stat1:  "cuentas alcanzadas",
    case_stat2:  "visualizaciones",
    case_stat3:  "me gusta",
    case_stat4:  "guardados",
    case_note:   "El 76,6% de las interacciones vinieron de cuentas que no me siguen — el contenido de marca no solo llega a mi comunidad fija, capta audiencia nueva de forma consistente.",
    s_brands:    "MARCAS ACTIVAS",
    brands_sub:  "Colaboraciones vigentes ahora mismo",
    s_sub60:     "ROAD TO SUB60",
    sub60_sub:   "Una marca puede ser parte de la historia toda la temporada",
    sub60_body:  "Una serie de YouTube y contenido corto con un objetivo claro: bajar de 60 minutos en HYROX. Cada semana, entrenos reales, datos, fracasos y avances. Una marca puede estar en esa historia desde el principio, con visibilidad en cada entrega.",
    s_collab:    "CÓMO COLABORAR",
    collab_sub:  "Sin precios en esta página — hablamos y adaptamos",
    t1:          "PRUEBA",
    t1_tag:      "Una acción puntual",
    t1_body:     "Un reel + stories para conocernos. Sin compromisos. La forma más rápida de ver si hay encaje antes de ir a más.",
    t2:          "PILOTO",
    t2_tag:      "3 meses de contenido",
    t2_body:     "Contenido mensual con un informe de resultados al final del período. Medimos, aprendemos y decidimos si seguimos.",
    t3:          "ANUAL",
    t3_tag:      "Socio · Socio principal · Patrocinador título",
    t3_body:     "Integraciones en YouTube, derechos de uso del contenido (whitelisting), exclusividad de categoría y tu nombre en la serie Road to SUB60.",
    s_fmt:       "FORMATOS",
    s_cal:       "CALENDARIO DE COMPETICIONES",
    s_contact:   "HABLEMOS",
    contact_sub: "Escríbeme y te respondo en menos de 24h",
    btn_email:   "Escríbeme",
    btn_kit:     "Descargar media kit",
    lang_btn:    "English",
    footer:      "Media kit actualizado · Septiembre 2026",
  },
  en: {
    tag:         "MEDIA KIT · 2026",
    tagline:     "Hybrid athlete · HYROX ambassador in Spain",
    cta:         "Let's talk",
    s_nums:      "NUMBERS",
    nums_sub:    "Last 12 months · verified data",
    s_who:       "WHO I AM",
    who_sub:     "Three things that explain why my audience connects with me",
    s_aud:       "AUDIENCE",
    aud_sub:     "Instagram · verified follower data",
    aud_note:    "Spanish-speaking audience in Spain and Latin America",
    int_label:   "Interests",
    gender_l:    "Gender",
    age_l:       "Age",
    countries_l: "Top countries",
    m_label:     "Male",
    f_label:     "Female",
    s_vid:       "CONTENT",
    vid_sub:     "Competition, training and lifestyle",
    vid_tap:     "Tap to watch",
    s_case:      "CASE STUDY",
    case_brand:  "EL CORTE INGLÉS × BOOMERANG SPORT",
    case_sub:    "Brand content reaching far beyond my own community",
    case_stat1:  "accounts reached",
    case_stat2:  "views",
    case_stat3:  "likes",
    case_stat4:  "saves",
    case_note:   "76.6% of interactions came from accounts that don't follow me — brand content doesn't just reach my existing community, it consistently captures new audiences.",
    s_brands:    "ACTIVE BRANDS",
    brands_sub:  "Current partnerships",
    s_sub60:     "ROAD TO SUB60",
    sub60_sub:   "A brand can be part of the story all season",
    sub60_body:  "A YouTube series and short-form content with one clear goal: break 60 minutes in HYROX. Every week, real training, data, setbacks and progress. A brand can be in that story from the start, with visibility in every episode.",
    s_collab:    "HOW TO COLLABORATE",
    collab_sub:  "No pricing on this page — we talk and adapt",
    t1:          "TRIAL",
    t1_tag:      "One-off action",
    t1_body:     "One reel + stories to see if we click. No commitments. The fastest way to test the fit before going further.",
    t2:          "PILOT",
    t2_tag:      "3 months of content",
    t2_body:     "Monthly content with a results report at the end. We measure, learn and decide whether to continue.",
    t3:          "ANNUAL",
    t3_tag:      "Partner · Lead Partner · Title Sponsor",
    t3_body:     "YouTube integrations, content usage rights (whitelisting), category exclusivity and your name in the Road to SUB60 series.",
    s_fmt:       "FORMATS",
    s_cal:       "COMPETITION CALENDAR",
    s_contact:   "LET'S TALK",
    contact_sub: "Write to me and I'll reply within 24h",
    btn_email:   "Write to me",
    btn_kit:     "Download media kit",
    lang_btn:    "Español",
    footer:      "Media kit updated · September 2026",
  },
};

// ── Data ─────────────────────────────────────────────────
const STATS = [
  { val: "104,7K", es: "Instagram",              en: "Instagram",            sub_es: "@pacomont24",                       sub_en: "@pacomont24" },
  { val: "17,6K",  es: "TikTok",                 en: "TikTok",               sub_es: "@pacomont24",                       sub_en: "@pacomont24" },
  { val: "9,61%",  es: "Engagement posts",        en: "Post engagement",      sub_es: "últimos 12 meses",                  sub_en: "last 12 months" },
  { val: "8,45%",  es: "Engagement reels",        en: "Reel engagement",      sub_es: "últimos 12 meses",                  sub_en: "last 12 months" },
  { val: "51,5M",  es: "Visualizaciones en reels",en: "Reel views",           sub_es: "872 reels publicados",              sub_en: "872 reels published" },
  { val: "38K",    es: "Alcance medio por reel",  en: "Avg reach per reel",   sub_es: "media últimos 12 meses",            sub_en: "last 12 months avg" },
];

const WHO = [
  {
    val: "−20 KG",
    t_es: "Transformación real, a los 36 años",
    t_en: "Real transformation at 36",
    d_es: "Cambio físico compaginado con trabajo a jornada completa. No partí de cero como deportista de toda la vida, y eso es exactamente lo que ve reflejado mi audiencia.",
    d_en: "Physical change while working full time. I didn't start as a lifelong athlete, and that's exactly what my audience sees reflected.",
  },
  {
    val: "14",
    t_es: "Carreras HYROX disputadas",
    t_en: "HYROX races completed",
    d_es: "Embajador oficial de HYROX en España desde hace 3 años. Contenido de competición real, no simulado.",
    d_en: "Official HYROX ambassador in Spain for 3 years. Real competition content, not staged.",
  },
  {
    val: "2 VIDAS",
    t_es: "Ingeniero informático y creador de contenido",
    t_en: "Software engineer and content creator",
    d_es: "De día en tecnología, el resto del tiempo entrenando y grabando. Una audiencia que también compagina trabajo y deporte se ve reflejada en ese equilibrio.",
    d_en: "Tech by day, training and filming the rest of the time. An audience that also juggles work and sport sees itself in that balance.",
  },
];

const VIDEOS = [
  { id: "DbjIB1tNGNG", type: "ig" as const, l_es: "Competición",   l_en: "Competition" },
  { id: "Dbs1niWMvcI", type: "ig" as const, l_es: "Entreno",       l_en: "Training" },
  { id: "DYuvp-as7Rm", type: "ig" as const, l_es: "Lifestyle",     l_en: "Lifestyle" },
  { id: "DFBL0xhMQZi", type: "ig" as const, l_es: "HYROX",         l_en: "HYROX" },
  { id: "XLG38hCaaB8", type: "yt" as const, l_es: "YouTube",       l_en: "YouTube" },
  { id: "DU7wkNuDEbI", type: "ig" as const, l_es: "Road to SUB60", l_en: "Road to SUB60" },
];

const BRANDS = ["LifePRO", "NOCCO", "Amazfit", "Velites", "RUMM", "GGUDSLEP"];

const CALENDAR = [
  { city: "HYROX Barcelona", dates_es: "11–15 nov 2026",        dates_en: "11–15 Nov 2026",        tbd: false },
  { city: "HYROX París",     dates_es: "Diciembre 2026",        dates_en: "December 2026",         tbd: false },
  { city: "HYROX Bilbao",    dates_es: "6–7 feb 2027",          dates_en: "6–7 Feb 2027",          tbd: false },
  { city: "HYROX Madrid",    dates_es: "17–21 mar 2027",        dates_en: "17–21 Mar 2027",        tbd: false },
  { city: "HYROX Málaga",    dates_es: "14–18 abr 2027",        dates_en: "14–18 Apr 2027",        tbd: false },
  { city: "HYROX Berlín",    dates_es: "Por confirmar",         dates_en: "To be confirmed",       tbd: true },
];

const FORMATS = {
  es: [
    "Reel dedicado (+ espejo en TikTok)",
    "Stories dedicadas",
    "Post en feed",
    "Vídeo de YouTube",
    "Vlog de evento (formato corto y largo)",
    "Sesiones de entrenamiento en location",
    "Reto/desafío con seguimiento en stories",
    "Seguimiento de resultados por UTM",
    "Whitelisting · anuncios desde mi perfil",
  ],
  en: [
    "Dedicated reel (+ TikTok mirror)",
    "Dedicated stories",
    "Feed post",
    "YouTube video",
    "Event vlog (short & long format)",
    "On-location training sessions",
    "Challenge with stories follow-up",
    "UTM results tracking",
    "Whitelisting · ads from my profile",
  ],
};

// ── Section header ───────────────────────────────────────
function Hdr({ title, sub, light }: { title: string; sub?: string; light?: boolean }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 40, color: light ? "#fff" : C.text, margin: sub ? "0 0 6px" : "0", letterSpacing: "0.02em", lineHeight: 1 }}>{title}</h2>
      {sub && <p style={{ fontSize: 13, color: light ? "rgba(255,255,255,0.5)" : C.muted, margin: 0 }}>{sub}</p>}
    </div>
  );
}

// ── Main component ───────────────────────────────────────
export default function ColabsClient() {
  const [lang,      setLang]      = useState<Lang>("es");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const params = useSearchParams();
  const t = T[lang];

  useEffect(() => {
    const m = params.get("m");
    if (m) fetch(`/api/track-colab?m=${encodeURIComponent(m)}`).catch(() => {});
  }, [params]);

  const sec: React.CSSProperties = { padding: "56px 24px" };
  const inner: React.CSSProperties = { maxWidth: 600, margin: "0 auto" };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: C.bg, color: C.text, overflowX: "hidden" }}>

      {/* ── Lang toggle ── */}
      <button
        onClick={() => setLang(l => l === "es" ? "en" : "es")}
        style={{ position: "fixed", top: 16, right: 16, zIndex: 200, background: "rgba(26,26,26,0.85)", backdropFilter: "blur(8px)", color: "#fff", border: "none", padding: "7px 15px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: "0.06em" }}
      >{t.lang_btn}</button>

      {/* ── Video modal ── */}
      {playingId && (() => {
        const v = VIDEOS.find(x => x.id === playingId)!;
        return (
          <div
            onClick={() => setPlayingId(null)}
            style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
          >
            <div style={{ width: "100%", maxWidth: 420, position: "relative" }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setPlayingId(null)} style={{ position: "absolute", top: -44, right: 0, background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 8 }}>✕</button>
              {v.type === "yt" ? (
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 10, overflow: "hidden" }}>
                  <iframe src={`https://www.youtube.com/embed/${v.id}?autoplay=1`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }} allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
                </div>
              ) : (
                <div style={{ position: "relative", paddingBottom: "177.78%", height: 0, borderRadius: 10, overflow: "hidden" }}>
                  <iframe src={`https://www.instagram.com/reel/${v.id}/embed/captioned/`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }} scrolling="no" />
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ── 1. HERO ── */}
      <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 52px" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/images/Velites_Hyrox_Madrid_PacoChristian_127.jpg)", backgroundSize: "cover", backgroundPosition: "center 20%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.88) 100%)" }} />
        <div style={{ position: "relative", padding: "0 24px", maxWidth: 600, margin: "0 auto", width: "100%" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase", margin: "0 0 10px", fontWeight: 700 }}>{t.tag}</p>
          <h1 style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(72px, 20vw, 108px)", color: "#fff", margin: "0 0 14px", lineHeight: 0.92, letterSpacing: "0.01em" }}>PACO MONTERO</h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", margin: "0 0 6px", lineHeight: 1.4 }}>{t.tagline}</p>
          <p style={{ fontSize: 14, color: C.gold, margin: "0 0 28px", fontWeight: 600, letterSpacing: "0.03em" }}>@pacomont24</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={`mailto:lijas23@gmail.com?subject=${encodeURIComponent("Colaboración con Paco Montero")}`}
               style={{ display: "inline-block", background: C.gold, color: "#fff", padding: "13px 24px", borderRadius: 30, fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", textDecoration: "none" }}>
              {t.cta} →
            </a>
            <a href="https://www.instagram.com/pacomont24/" target="_blank" rel="noreferrer"
               style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "13px 20px", borderRadius: 30, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>Instagram</a>
            <a href="https://www.tiktok.com/@pacomont24" target="_blank" rel="noreferrer"
               style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "13px 20px", borderRadius: 30, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>TikTok</a>
            <a href="https://www.youtube.com/@pacomont24" target="_blank" rel="noreferrer"
               style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "13px 20px", borderRadius: 30, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>YouTube</a>
          </div>
        </div>
      </section>

      {/* ── 2. NÚMEROS ── */}
      <section style={{ ...sec, background: C.dark }}>
        <div style={inner}>
          <Hdr title={t.s_nums} sub={t.nums_sub} light />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, borderRadius: 12, overflow: "hidden", background: "rgba(255,255,255,0.06)" }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ padding: "22px 18px", background: C.dark }}>
                <p style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 42, color: C.gold, margin: "0 0 4px", lineHeight: 1 }}>{s.val}</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", margin: "0 0 2px" }}>{lang === "es" ? s.es : s.en}</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", margin: 0 }}>{lang === "es" ? s.sub_es : s.sub_en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. QUIÉN SOY ── */}
      <section style={{ ...sec, background: C.bg }}>
        <div style={inner}>
          <Hdr title={t.s_who} sub={t.who_sub} />
          {WHO.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 20, padding: "22px 0", borderBottom: i < WHO.length - 1 ? `1px solid ${C.border}` : "none", alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, minWidth: 76 }}>
                <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 34, color: C.gold, lineHeight: 1, display: "block" }}>{item.val}</span>
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 5px" }}>{lang === "es" ? item.t_es : item.t_en}</p>
                <p style={{ fontSize: 14, color: C.muted, margin: 0, lineHeight: 1.65 }}>{lang === "es" ? item.d_es : item.d_en}</p>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 28, borderRadius: 12, overflow: "hidden", aspectRatio: "3/2", background: "#ccc" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/action.jpg" alt="Paco Montero entrenando" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </section>

      {/* ── 4. AUDIENCIA ── */}
      <section style={{ ...sec, background: C.bg2 }}>
        <div style={inner}>
          <Hdr title={t.s_aud} sub={t.aud_sub} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: C.muted, margin: "0 0 14px" }}>{t.gender_l}</p>
              {([["Hombre","Male","~65%",0.65],["Mujer","Female","~20%",0.20]] as [string,string,string,number][]).map(([es,en,pct,val]) => (
                <div key={es} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 13, color: C.text }}>{lang === "es" ? es : en}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{pct}</span>
                  </div>
                  <div style={{ height: 5, background: C.border, borderRadius: 3 }}>
                    <div style={{ height: "100%", width: `${val * 100}%`, background: C.gold, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: C.muted, margin: "0 0 14px" }}>{t.age_l}</p>
              {([["25–34","37,1%",0.371],["35–44","33,0%",0.330],["18–24","12,4%",0.124]] as [string,string,number][]).map(([label,pct,val]) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 13, color: C.text }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{pct}</span>
                  </div>
                  <div style={{ height: 5, background: C.border, borderRadius: 3 }}>
                    <div style={{ height: "100%", width: `${val * 100}%`, background: C.gold, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: C.muted, margin: "0 0 12px" }}>{t.countries_l}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
            {([["🇪🇸 España","Spain","21,6%"],["🇲🇽 México","Mexico","20,4%"],["🇦🇷 Argentina","Argentina","7,6%"],["🇨🇴 Colombia","Colombia","5,6%"]] as [string,string,string][]).map(([es,en,pct]) => (
              <div key={es} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "#fff", borderRadius: 8, border: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 13 }}>{lang === "es" ? es : en}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.gold }}>{pct}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: C.muted, margin: "0 0 10px" }}>{t.int_label}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(lang === "es" ? ["Viajes","Familia","Fotografía","Deporte","Moda deportiva"] : ["Travel","Family","Photography","Sport","Sportswear"]).map(tag => (
              <span key={tag} style={{ padding: "6px 14px", borderRadius: 20, background: "#fff", border: `1px solid ${C.border}`, fontSize: 13 }}>{tag}</span>
            ))}
          </div>
          <p style={{ fontSize: 12, color: C.muted, marginTop: 16, fontStyle: "italic" as const }}>{t.aud_note}</p>
        </div>
      </section>

      {/* ── 5. VÍDEOS ── */}
      <section style={{ ...sec, background: C.bg }}>
        <div style={inner}>
          <Hdr title={t.s_vid} sub={t.vid_sub} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {VIDEOS.map(v => (
              <button
                key={v.id}
                onClick={() => setPlayingId(v.id)}
                style={{
                  aspectRatio: "9/16",
                  borderRadius: 10,
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  border: "none",
                  background: v.type === "yt"
                    ? `url(https://img.youtube.com/vi/${v.id}/hqdefault.jpg) center/cover`
                    : "linear-gradient(145deg, #1e1e1e 0%, #2a2a2a 100%)",
                  padding: 0,
                  width: "100%",
                  display: "block",
                }}
                aria-label={lang === "es" ? v.l_es : v.l_en}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.8) 100%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "10px 12px" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 7 }}>
                    <span style={{ color: "#fff", fontSize: 14, marginLeft: 3 }}>▶</span>
                  </div>
                  <p style={{ fontSize: 9, color: v.type === "yt" ? C.gold : "rgba(255,255,255,0.55)", fontWeight: 700, letterSpacing: "0.1em", margin: "0 0 3px", textTransform: "uppercase" as const }}>{v.type === "yt" ? "YOUTUBE" : "IG REEL"}</p>
                  <p style={{ fontSize: 12, color: "#fff", fontWeight: 600, margin: 0 }}>{lang === "es" ? v.l_es : v.l_en}</p>
                </div>
                {v.type === "ig" && (
                  <div style={{ position: "absolute", top: 10, right: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </div>
                )}
              </button>
            ))}
          </div>
          <p style={{ fontSize: 12, color: C.muted, marginTop: 12, textAlign: "center" as const }}>{t.vid_tap}</p>
        </div>
      </section>

      {/* ── 6. CASO DE ÉXITO ── */}
      <section style={{ ...sec, background: C.dark }}>
        <div style={inner}>
          <Hdr title={t.s_case} light />
          <p style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 12px" }}>{t.case_brand}</p>
          <p style={{ fontSize: 19, fontWeight: 700, color: "#fff", margin: "0 0 24px", lineHeight: 1.3 }}>{t.case_sub}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {[["295,9K", t.case_stat1], ["317,6K", t.case_stat2], ["2.937", t.case_stat3], ["175", t.case_stat4]].map(([val, label]) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "18px 16px" }}>
                <p style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 38, color: C.gold, margin: "0 0 4px", lineHeight: 1 }}>{val}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
          <div style={{ borderLeft: `3px solid ${C.gold}`, paddingLeft: 16 }}>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", margin: 0, lineHeight: 1.7 }}>{t.case_note}</p>
          </div>
        </div>
      </section>

      {/* ── 7. MARCAS ACTIVAS ── */}
      <section style={{ ...sec, background: C.bg }}>
        <div style={inner}>
          <Hdr title={t.s_brands} sub={t.brands_sub} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {BRANDS.map(b => (
              <span key={b} style={{ padding: "10px 22px", border: `1.5px solid ${C.border}`, borderRadius: 30, fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", color: C.text }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. ROAD TO SUB60 ── */}
      <section style={{ ...sec, background: C.bg2 }}>
        <div style={inner}>
          <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 28, aspectRatio: "16/9", position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/sled-push.jpg" alt="Road to SUB60" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.72), rgba(0,0,0,0.1))" }}>
              <div style={{ padding: "24px 28px" }}>
                <p style={{ fontSize: 11, color: C.gold, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, margin: "0 0 6px" }}>SERIE · YOUTUBE</p>
                <p style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(44px, 12vw, 64px)", color: "#fff", margin: 0, lineHeight: 0.92 }}>ROAD TO<br/>SUB60</p>
              </div>
            </div>
          </div>
          <Hdr title={t.s_sub60} sub={t.sub60_sub} />
          <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, margin: 0 }}>{t.sub60_body}</p>
        </div>
      </section>

      {/* ── 9. CÓMO COLABORAR ── */}
      <section style={{ ...sec, background: C.bg }}>
        <div style={inner}>
          <Hdr title={t.s_collab} sub={t.collab_sub} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { name: t.t1, tag: t.t1_tag, body: t.t1_body, dark: false },
              { name: t.t2, tag: t.t2_tag, body: t.t2_body, dark: false },
              { name: t.t3, tag: t.t3_tag, body: t.t3_body, dark: true },
            ].map(tier => (
              <div key={tier.name} style={{ padding: "22px 20px", borderRadius: 12, border: tier.dark ? `2px solid ${C.gold}` : `1px solid ${C.border}`, background: tier.dark ? C.dark : "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, gap: 10 }}>
                  <span style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: 26, color: tier.dark ? C.gold : C.text, letterSpacing: "0.02em" }}>{tier.name}</span>
                  <span style={{ fontSize: 11, color: tier.dark ? "rgba(255,255,255,0.45)" : C.muted, fontWeight: 600, textAlign: "right" as const, flexShrink: 0 }}>{tier.tag}</span>
                </div>
                <p style={{ fontSize: 14, color: tier.dark ? "rgba(255,255,255,0.75)" : C.muted, margin: 0, lineHeight: 1.65 }}>{tier.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FORMATOS ── */}
      <section style={{ ...sec, background: C.bg2 }}>
        <div style={inner}>
          <Hdr title={t.s_fmt} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {FORMATS[lang].map(f => (
              <span key={f} style={{ padding: "8px 16px", borderRadius: 20, border: `1px solid ${C.border}`, background: "#fff", fontSize: 13, color: C.text }}>{f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. CALENDARIO ── */}
      <section style={{ ...sec, background: C.bg }}>
        <div style={inner}>
          <Hdr title={t.s_cal} />
          <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            {CALENDAR.map((ev, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: i < CALENDAR.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: ev.tbd ? C.border : C.gold, flexShrink: 0 }} />
                  <span style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{ev.city}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: ev.tbd ? C.muted : C.gold }}>{lang === "es" ? ev.dates_es : ev.dates_en}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. CONTACTO ── */}
      <section style={{ ...sec, background: C.dark, padding: "72px 24px" }}>
        <div style={{ ...inner, textAlign: "center" as const }}>
          <p style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(48px, 14vw, 72px)", color: "#fff", margin: "0 0 8px", lineHeight: 1 }}>{t.s_contact}</p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", margin: "0 0 36px" }}>{t.contact_sub}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 340, margin: "0 auto" }}>
            <a href={`mailto:lijas23@gmail.com?subject=${encodeURIComponent("Colaboración con Paco Montero")}`}
               style={{ display: "block", padding: "16px 24px", background: C.gold, color: "#fff", borderRadius: 30, fontSize: 15, fontWeight: 700, textDecoration: "none", letterSpacing: "0.04em" }}>
              ✉ {t.btn_email}
            </a>
            <a href="https://www.instagram.com/pacomont24/" target="_blank" rel="noreferrer"
               style={{ display: "block", padding: "14px 24px", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 30, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Instagram · @pacomont24
            </a>
            <a href="https://www.tiktok.com/@pacomont24" target="_blank" rel="noreferrer"
               style={{ display: "block", padding: "14px 24px", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 30, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              TikTok · @pacomont24
            </a>
            <a href="https://www.youtube.com/@pacomont24" target="_blank" rel="noreferrer"
               style={{ display: "block", padding: "14px 24px", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 30, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              YouTube · @pacomont24
            </a>
            <a href="/media-kit.pdf" download="Paco-Montero-Media-Kit.pdf"
               style={{ display: "block", padding: "14px 24px", border: `1px solid ${C.gold}`, color: C.gold, borderRadius: 30, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
              ↓ {t.btn_kit}
            </a>
          </div>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 52 }}>{t.footer}</p>
        </div>
      </section>

    </div>
  );
}
