import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pacomont.es"),
  title: "Planes de Entrenamiento HYROX | Pacomont — Embajador Oficial España",
  description:
    "Soy el embajador oficial HYROX en España, con 1:08 en categoría PRO. Entrena con mis programas desde 12,99€/mes. Sin permanencia. Empieza hoy.",
  keywords: [
    "HYROX España",
    "entrenamiento HYROX",
    "plan entrenamiento HYROX online",
    "cómo preparar HYROX",
    "entrenador HYROX online",
    "Pacomont",
    "embajador HYROX España",
    "HYROX doubles",
    "HYROX individual",
    "app entrenamiento HYROX",
    "planes HYROX Playbook",
    "Velites HYROX descuento",
    "Life Pro Nutrition descuento",
    "HYROX atleta PRO España",
    "carreras híbridas entrenamiento",
  ],
  openGraph: {
    title: "Pacomont | Embajador Oficial HYROX España",
    description:
      "Atleta PRO HYROX con mejor tiempo de 1:08. Planes de entrenamiento desde 12,99€/mes en Playbook. Descuentos exclusivos en equipamiento y suplementación.",
    url: "https://www.pacomont.es",
    siteName: "Pacomont",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "Pacomont - Embajador Oficial HYROX España" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pacomont | Embajador Oficial HYROX España",
    description: "Planes de entrenamiento HYROX PRO desde 12,99€/mes. Atleta PRO con mejor tiempo de 1:08.",
    images: ["/images/hero.jpg"],
  },
  alternates: { canonical: "https://www.pacomont.es" },
  robots: { index: true, follow: true },
  verification: { google: "qkNaCo1RI4cfE5pmPszUNnyHiA0HpR9WoEL3dx8DT94", other: { "msvalidate.01": "B7EA9B07F7645E92B1149A3044D8FC96" } },
};

const GTM_ID = "GTM-PVLHVMGJ";
const META_PIXEL_ID = "2532990157120554";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <head>
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="min-h-screen antialiased" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Analytics />
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
