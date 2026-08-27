import { NextRequest, NextResponse } from "next/server";

const PASSWORD = process.env.CRM_PASSWORD || "pacomont2026";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password === PASSWORD) {
    const token = Buffer.from(`crm:${PASSWORD}`).toString("base64");
    return NextResponse.json({ ok: true, token });
  }
  return NextResponse.json({ ok: false }, { status: 401 });
}
