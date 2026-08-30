import { NextRequest, NextResponse } from "next/server";
import { hashData, sendCapiEvent } from "@/lib/meta-capi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      event_name,
      event_id,
      action_source = "website",
      event_source_url,
      user_data = {},
      custom_data,
    } = body;

    if (!event_name || !event_id) {
      return NextResponse.json({ ok: false, error: "event_name and event_id required" }, { status: 400 });
    }

    // Extract IP and UA from headers (added server-side — never trust client)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || "";
    const ua = req.headers.get("user-agent") || "";

    await sendCapiEvent({
      event_name,
      event_id,
      action_source,
      ...(event_source_url && { event_source_url }),
      user_data: {
        ...(ip && { client_ip_address: ip }),
        ...(ua && { client_user_agent: ua }),
        // Hash PII server-side
        ...(user_data.em  && { em:          [hashData(user_data.em)]  }),
        ...(user_data.ph  && { ph:          [hashData(user_data.ph.replace(/\D/g, ""))] }),
        ...(user_data.external_id && { external_id: [hashData(user_data.external_id)] }),
        ...(user_data.fbp && { fbp: user_data.fbp }),
        ...(user_data.fbc && { fbc: user_data.fbc }),
      },
      ...(custom_data && { custom_data }),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/meta/track]", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
