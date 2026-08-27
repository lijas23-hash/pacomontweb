import { NextRequest, NextResponse } from "next/server";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwUFxap8sUmfhT2VmI2lzlm4_as7PzL73qzaesEcYp8dSBYePU_qFrIYLcdwoOcpTEXJQ/exec";

export async function GET() {
  try {
    const res = await fetch(SCRIPT_URL, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
