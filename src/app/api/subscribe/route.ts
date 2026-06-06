import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://www.pacomont.es";
const APP_URL = "https://app.pacomont.es";

const PLAN_INFO: Record<string, { label: string; file: string; tagline: string; emoji: string }> = {
  hyrox:       { label: "HYROX",       file: "hyrox.pdf",       tagline: "Tu semana de preparación para competición HYROX.",         emoji: "🏁" },
  hyrox_pro:   { label: "HYROX PRO",   file: "hyrox_pro.pdf",   tagline: "Tu semana de entrenamiento PRO de alto rendimiento.",       emoji: "⚡" },
  hibrido:     { label: "Híbrido",     file: "hibrido.pdf",     tagline: "Tu semana de entrenamiento híbrido: fuerza + cardio.",      emoji: "💪" },
  pierde_peso: { label: "Pierde Peso", file: "pierde_peso.pdf", tagline: "Tu semana de entrenamiento para perder grasa sin perder músculo.", emoji: "🔥" },
  solo_gym:    { label: "GYM",         file: "solo_gym.pdf",    tagline: "Tu semana de entrenamiento de fuerza en sala.",             emoji: "🏋️" },
};

function emailHtml(email: string, planId: string) {
  const plan = PLAN_INFO[planId] ?? PLAN_INFO["hyrox"];
  const downloadUrl = `${BASE_URL}/lead-magnets/${plan.file}`;

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0d1117;font-family:system-ui,sans-serif;color:#e4e4e7">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1117;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- Header -->
        <tr><td style="padding-bottom:32px">
          <p style="margin:0;color:#3b82f6;font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase">PACOMONT · Embajador Oficial HYROX España</p>
        </td></tr>

        <!-- Hero -->
        <tr><td style="padding-bottom:32px">
          <p style="margin:0 0 8px;font-size:32px">${plan.emoji}</p>
          <h1 style="margin:0 0 12px;font-size:30px;font-weight:900;line-height:1.1;color:#fff">Tu semana de ${plan.label} está lista.</h1>
          <p style="margin:0;color:#a1a1aa;font-size:16px;line-height:1.6">${plan.tagline}</p>
        </td></tr>

        <!-- Download CTA -->
        <tr><td style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:32px;text-align:center;margin-bottom:24px">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.15em">Plan ${plan.label} — Semana gratis</p>
          <h2 style="margin:0 0 16px;font-size:22px;font-weight:900;color:#fff">Descarga tu entrenamiento</h2>
          <p style="margin:0 0 24px;font-size:14px;color:#a1a1aa;line-height:1.6">Una semana completa de mi metodología. Sesiones reales, con carga y progresión. Lo mismo que entreno yo.</p>
          <a href="${downloadUrl}" style="display:inline-block;background:#3b82f6;color:#fff;font-weight:700;font-size:16px;text-decoration:none;padding:16px 36px;border-radius:50px">
            Descargar PDF →
          </a>
          <p style="margin:16px 0 0;font-size:12px;color:#52525b">Archivo PDF · Descarga directa</p>
        </td></tr>

        <!-- Spacer -->
        <tr><td style="height:24px"></td></tr>

        <!-- Upsell CTA -->
        <tr><td style="background:linear-gradient(135deg,#1e3a5f,#1e40af);border-radius:16px;padding:28px;text-align:center">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#93c5fd;text-transform:uppercase;letter-spacing:0.15em">¿Te ha gustado?</p>
          <h2 style="margin:0 0 12px;font-size:22px;font-weight:900;color:#fff">Empieza el plan completo</h2>
          <p style="margin:0 0 24px;font-size:14px;color:#bfdbfe;line-height:1.6">Entrenamiento + nutrición desde <strong>9,99€/mes</strong>. Sin permanencia. Cancela cuando quieras.</p>
          <a href="${APP_URL}" style="display:inline-block;background:#fff;color:#1e40af;font-weight:700;font-size:15px;text-decoration:none;padding:14px 32px;border-radius:50px">
            Empezar en app.pacomont.es →
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:32px;text-align:center">
          <p style="margin:0 0 8px;font-size:13px;color:#52525b">Pacomont · Embajador Oficial HYROX España</p>
          <p style="margin:0;font-size:12px;color:#3f3f46">
            <a href="https://www.instagram.com/pacomont24/" style="color:#3b82f6;text-decoration:none">Instagram</a> ·
            <a href="https://www.pacomont.es" style="color:#3b82f6;text-decoration:none">pacomont.es</a>
          </p>
          <p style="margin:12px 0 0;font-size:11px;color:#3f3f46">Recibiste este email porque te suscribiste en pacomont.es con ${email}</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const { email, plan = "hyrox" } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const planLabel = PLAN_INFO[plan]?.label ?? "HYROX";

  // 1. Add contact to Brevo with plan tag
  const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      email,
      updateEnabled: true,
      attributes: {
        FUENTE: "pacomont.es - lead magnet",
        PLAN_ELEGIDO: planLabel,
      },
    }),
  });

  const isDuplicate = contactRes.status === 400 &&
    (await contactRes.clone().json().catch(() => ({}))).code === "duplicate_parameter";

  if (!contactRes.ok && !isDuplicate) {
    return NextResponse.json({ error: "Error al guardar contacto" }, { status: 500 });
  }

  // 2. Send personalised email with PDF link
  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      sender: { name: "Pacomont", email: "pacomont@pacomont.es" },
      to: [{ email }],
      subject: `Tu semana de ${planLabel} gratis — descárgala ahora`,
      htmlContent: emailHtml(email, plan),
    }),
  });

  return NextResponse.json({ ok: true });
}
