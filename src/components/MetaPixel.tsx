"use client";
import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

declare global {
  interface Window {
    fbq: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: (...args: unknown[]) => void };
    _fbq?: unknown;
  }
}

function hasMarketingConsent(): boolean {
  if (typeof localStorage === "undefined") return false;
  return localStorage.getItem("cookie_consent") === "all";
}

// ── Parameter Builder (lazy-loaded, browser only) ─────────────────────────────

type ParamBuilder = {
  processAndCollectAllParams: (url?: string) => Promise<unknown>;
  getFbc: () => string | undefined;
  getFbp: () => string | undefined;
};

let _builder: ParamBuilder | null = null;

async function getBuilder(): Promise<ParamBuilder | null> {
  if (_builder) return _builder;
  try {
    const mod = await import("meta-capi-param-builder-clientjs");
    _builder = (mod.default ?? mod) as ParamBuilder;
    return _builder;
  } catch {
    return null;
  }
}

async function initBuilder(): Promise<void> {
  const b = await getBuilder();
  if (!b) return;
  try {
    await b.processAndCollectAllParams(window.location.href);
  } catch { /* silent fail */ }
}

async function getMatchParams(): Promise<{ fbp?: string; fbc?: string }> {
  const b = await getBuilder();
  if (!b) {
    // Fallback to manual cookie read
    const fbp = document.cookie.match(/_fbp=([^;]+)/)?.[1];
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    const fbc = document.cookie.match(/_fbc=([^;]+)/)?.[1]
      ?? (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined);
    return { ...(fbp && { fbp }), ...(fbc && { fbc }) };
  }
  try {
    const fbp = b.getFbp();
    const fbc = b.getFbc();
    return { ...(fbp && { fbp }), ...(fbc && { fbc }) };
  } catch {
    return {};
  }
}

// ── Public tracking helpers ───────────────────────────────────────────────────

export async function trackWAContact(url: string) {
  const consent = hasMarketingConsent();
  const eventId = crypto.randomUUID();

  if (consent && typeof window.fbq === "function") {
    window.fbq("track", "Contact", {}, { eventID: eventId });
  }

  if (consent) {
    const user_data = await getMatchParams();
    fetch("/api/meta/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "Contact",
        event_id: eventId,
        action_source: "website",
        event_source_url: window.location.href,
        user_data,
      }),
    }).catch(() => {});
  }

  window.open(url, "_blank", "noopener,noreferrer");
}

export async function trackViewContent(contentName: string) {
  if (!hasMarketingConsent()) return;
  const eventId = crypto.randomUUID();

  if (typeof window.fbq === "function") {
    window.fbq("track", "ViewContent", { content_name: contentName }, { eventID: eventId });
  }

  const user_data = await getMatchParams();
  fetch("/api/meta/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name: "ViewContent",
      event_id: eventId,
      action_source: "website",
      event_source_url: window.location.href,
      user_data,
      custom_data: { content_name: contentName },
    }),
  }).catch(() => {});
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function MetaPixel({ consent }: { consent: "all" | "necessary" | null }) {
  const pathname = usePathname();

  // Initialize builder + fire PageView on consent or route change
  useEffect(() => {
    if (consent !== "all") return;
    initBuilder().then(() => {
      if (typeof window.fbq === "function") window.fbq("track", "PageView");
    });
  }, [pathname, consent]);

  if (consent !== "all" || !PIXEL_ID) return null;

  return (
    <Script
      id="fb-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
          n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
          s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
          (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${PIXEL_ID}');
          fbq('track','PageView');
        `,
      }}
    />
  );
}
