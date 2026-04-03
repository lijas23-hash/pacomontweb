import { NextRequest, NextResponse } from "next/server";

const PLAYBOOK_DISCOUNT = "https://my.playbookapp.io/pacomont/checkout?promo=KDJVKKA4";

const emailHtml = (email: string) => `<!DOCTYPE html>
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
          <h1 style="margin:0 0 12px;font-size:32px;font-weight:900;line-height:1.1;color:#fff">Aquí tienes tu checklist HYROX.</h1>
          <p style="margin:0;color:#a1a1aa;font-size:16px;line-height:1.6">Los errores que más tiempo cuestan en las 8 estaciones — y cómo evitarlos.</p>
        </td></tr>

        <!-- Checklist -->
        <tr><td style="background:#18181b;border:1px solid #27272a;border-radius:16px;padding:28px;margin-bottom:24px">
          <p style="margin:0 0 20px;font-size:13px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.15em">Las 8 estaciones — técnica clave</p>

          <table width="100%" cellpadding="0" cellspacing="0">
            ${[
              ["1. SkiErg — 1.000m", "Sal conservador. El error más común es explotar aquí y pagarlo el resto de la carrera."],
              ["2. Sled Push — 50m", "Ángulo 45°, pasos cortos y rápidos. La fuerza viene de las piernas, no los brazos."],
              ["3. Sled Pull — 50m", "Cuerpo erguido, jalones firmes con codos pegados. No dobles la espalda."],
              ["4. Burpee Broad Jumps — 80m", "Ritmo constante de inicio a fin. El salto hacia adelante, no hacia arriba."],
              ["5. Rowing — 1.000m", "60% piernas, 20% cadera, 20% brazos. No tires solo con los brazos."],
              ["6. Farmers Carry — 200m", "Hombros atrás, core activado. Si falla el agarre, falla la estación."],
              ["7. Sandbag Lunges — 100m", "Saco bien posicionado en el hombro. No pares — arrancar cuesta más que mantener."],
              ["8. Wall Balls — 100 reps", "Las piernas lanzan el balón, no los brazos. Entra pensando en mantener el movimiento."],
            ].map(([title, tip]) => `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #27272a;vertical-align:top">
                <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#fff">${title}</p>
                <p style="margin:0;font-size:13px;color:#a1a1aa;line-height:1.5">${tip}</p>
              </td>
            </tr>`).join("")}
          </table>

          <p style="margin:20px 0 0;font-size:13px;color:#71717a;font-style:italic">Estrategia global: no gana el más fuerte, gana el que mejor gestiona la energía. Sal conservador la primera mitad.</p>
        </td></tr>

        <!-- Spacer -->
        <tr><td style="height:24px"></td></tr>

        <!-- Discount CTA -->
        <tr><td style="background:linear-gradient(135deg,#1e3a5f,#1e40af);border-radius:16px;padding:28px;text-align:center">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#93c5fd;text-transform:uppercase;letter-spacing:0.15em">Oferta exclusiva para suscriptores</p>
          <h2 style="margin:0 0 12px;font-size:24px;font-weight:900;color:#fff">20% de descuento en mis planes</h2>
          <p style="margin:0 0 24px;font-size:14px;color:#bfdbfe;line-height:1.6">HYROX OPEN, PRO PREP y Atleta Híbrido. Los mismos programas con los que compito a nivel PRO.</p>
          <a href="https://pacomont.es/checklist-hyrox" style="display:inline-block;background:#fff;color:#1e40af;font-weight:700;font-size:15px;text-decoration:none;padding:14px 32px;border-radius:50px;margin-bottom:12px">Ver checklist online →</a>
          <br>
          <a href="${PLAYBOOK_DISCOUNT}" style="display:inline-block;background:#3b82f6;color:#fff;font-weight:700;font-size:15px;text-decoration:none;padding:14px 32px;border-radius:50px">Activar 20% de descuento →</a>
          <p style="margin:16px 0 0;font-size:12px;color:#93c5fd">12,99€/mes · Sin permanencia · Cancela cuando quieras</p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:32px;text-align:center">
          <p style="margin:0 0 8px;font-size:13px;color:#52525b">Pacomont · Embajador Oficial HYROX España</p>
          <p style="margin:0;font-size:12px;color:#3f3f46">
            <a href="https://www.instagram.com/pacomont24/" style="color:#3b82f6;text-decoration:none">Instagram</a> ·
            <a href="https://pacomont.es" style="color:#3b82f6;text-decoration:none">pacomont.es</a>
          </p>
          <p style="margin:12px 0 0;font-size:11px;color:#3f3f46">Recibiste este email porque te suscribiste en pacomont.es con ${email}</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  // 1. Add contact to Brevo
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
      attributes: { FUENTE: "pacomont.es - lead magnet hero" },
    }),
  });

  const isDuplicate = contactRes.status === 400 &&
    (await contactRes.clone().json().catch(() => ({}))).code === "duplicate_parameter";

  if (!contactRes.ok && !isDuplicate) {
    return NextResponse.json({ error: "Error al guardar contacto" }, { status: 500 });
  }

  // 2. Send welcome email
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
      subject: "Tu checklist HYROX + 20% de descuento en mis planes",
      htmlContent: emailHtml(email),
    }),
  });

  return NextResponse.json({ ok: true });
}
