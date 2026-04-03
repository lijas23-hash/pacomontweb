import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
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

  if (res.ok || res.status === 204) {
    return NextResponse.json({ ok: true });
  }

  const data = await res.json();
  // Contact already exists — treat as success
  if (data.code === "duplicate_parameter") {
    return NextResponse.json({ ok: true, existing: true });
  }

  return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
}
