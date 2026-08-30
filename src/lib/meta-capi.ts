import { createHash } from "crypto";

const PIXEL_ID    = process.env.NEXT_PUBLIC_META_PIXEL_ID!;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN!;
const GRAPH_URL   = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

export function hashData(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export interface CapiUserData {
  client_ip_address?: string;
  client_user_agent?: string;
  em?: string[];
  ph?: string[];
  external_id?: string[];
  fbp?: string;
  fbc?: string;
}

export interface CapiEvent {
  event_name: string;
  event_id: string;
  event_time?: number;
  action_source: string;
  event_source_url?: string;
  user_data: CapiUserData;
  custom_data?: Record<string, unknown>;
}

export async function sendCapiEvent(event: CapiEvent): Promise<void> {
  if (!ACCESS_TOKEN || !PIXEL_ID) {
    console.warn("[CAPI] Missing PIXEL_ID or ACCESS_TOKEN env vars");
    return;
  }
  const payload = {
    data: [{
      ...event,
      event_time: event.event_time ?? Math.floor(Date.now() / 1000),
    }],
    access_token: ACCESS_TOKEN,
  };
  try {
    const res = await fetch(GRAPH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("[CAPI] Graph API error:", err);
    }
  } catch (e) {
    console.error("[CAPI] Fetch error:", e);
  }
}
