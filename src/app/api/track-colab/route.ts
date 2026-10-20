import { NextRequest, NextResponse } from "next/server";

// Si configuras COLABS_TRACK_URL en Vercel, las visitas se guardan en Google Sheets.
// Si no, las visitas aparecen en Vercel Dashboard → Functions → track-colab → Logs.
const SCRIPT_URL = process.env.COLABS_TRACK_URL || "";

export async function GET(req: NextRequest) {
  const marca = req.nextUrl.searchParams.get("m") || "desconocida";
  const ahora = new Date().toISOString();

  if (SCRIPT_URL) {
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ marca, fecha: ahora }),
      });
    } catch {
      console.error("[track-colab] Error enviando a Google Sheets");
    }
  } else {
    console.log(`[Colabs Visit] marca="${marca}" fecha="${ahora}"`);
  }

  return NextResponse.json({ ok: true });
}
