import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Manrope } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pacomont.es"),
  title: "Entrenador online personalizado · Paco Montero — Pacomont",
  description:
    "Entrenador online para perder peso, ganar músculo o preparar tu HYROX. Bajé 19 kg en 4 meses — ahora te entreno con el mismo método. +75 atletas activos.",
  keywords: [
    "entrenador personal online",
    "entrenador online España",
    "entrenamiento online personalizado",
    "plan perder peso online",
    "plan ganar músculo online",
    "plan hipertrofia online",
    "preparación HYROX",
    "entrenador HYROX online",
    "nutrición personalizada online",
    "Pacomont",
    "Paco Montero entrenador",
    "HYROX Ambassador España",
    "coaching deportivo online",
    "entrenar en casa sin material",
  ],
  openGraph: {
    title: "Entrenador online personalizado · Paco Montero",
    description:
      "Bajé 19 kg en 4 meses. Ahora te entreno online — perder peso, ganar músculo, preparar un HYROX o todo a la vez. +75 atletas activos.",
    url: "https://www.pacomont.es",
    siteName: "Pacomont",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/images/Hero_New_6.jpg", width: 1200, height: 630, alt: "Paco Montero - Entrenador Personal Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Entrenador online · Paco Montero",
    description: "Bajé 19 kg en 4 meses. Ahora te entreno online. +75 atletas activos.",
    images: ["/images/Hero_New_6.jpg"],
  },
  alternates: {
    canonical: "https://www.pacomont.es",
    languages: { "es-ES": "https://www.pacomont.es" },
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${dmSans.variable} ${manrope.variable}`}>
      <body className="min-h-screen antialiased" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
