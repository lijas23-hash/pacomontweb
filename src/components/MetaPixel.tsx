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

// ── Helpers ──────────────────────────────────────────────────────────────────

function getCookieParam(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie.match(new RegExp(`${name}=([^;]+)`))?.[1];
}

function getFbc(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const fbc = getCookieParam("_fbc");
  if (fbc) return fbc;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (fbclid) return `fb.1.${Date.now()}.${fbclid}`;
  return undefined;
}

function hasMarketingConsent(): boolean {
  if (typeof localStorage === "undefined") return false;
  return localStorage.getItem("cookie_consent") === "all";
}

// ── Public tracking helpers (import these in page.tsx) ───────────────────────

export function trackPageView() {
  if (!hasMarketingConsent()) return;
  if (typeof window.fbq === "function") window.fbq("track", "PageView");
}

export function trackWAContact(url: string) {
  const consent = hasMarketingConsent();
  const eventId = crypto.randomUUID();

  if (consent && typeof window.fbq === "function") {
    window.fbq("track", "Contact", {}, { eventID: eventId });
  }

  if (consent) {
    const fbp = getCookieParam("_fbp");
    const fbc = getFbc();
    fetch("/api/meta/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "Contact",
        event_id: eventId,
        action_source: "website",
        event_source_url: window.location.href,
        user_data: {
          ...(fbp && { fbp }),
          ...(fbc && { fbc }),
        },
      }),
    }).catch(() => {});
  }

  window.open(url, "_blank", "noopener,noreferrer");
}

export function trackViewContent(contentName: string) {
  if (!hasMarketingConsent()) return;
  const eventId = crypto.randomUUID();

  if (typeof window.fbq === "function") {
    window.fbq("track", "ViewContent", { content_name: contentName }, { eventID: eventId });
  }

  const fbp = getCookieParam("_fbp");
  const fbc = getFbc();
  fetch("/api/meta/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name: "ViewContent",
      event_id: eventId,
      action_source: "website",
      event_source_url: window.location.href,
      user_data: {
        ...(fbp && { fbp }),
        ...(fbc && { fbc }),
      },
      custom_data: { content_name: contentName },
    }),
  }).catch(() => {});
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function MetaPixel({ consent }: { consent: "all" | "necessary" | null }) {
  const pathname = usePathname();

  // Fire PageView on every client-side route change after first load
  useEffect(() => {
    if (consent !== "all") return;
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
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
