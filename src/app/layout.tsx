import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pacomont.es"),
  title: "Pacomont | Entrenador Personal Online — HYROX, Fuerza y Nutrición",
  description:
    "Pacomont — entrenador personal online. Planes de entrenamiento y nutrición personalizados. Embajador Oficial HYROX España. Empieza hoy por WhatsApp.",
  keywords: [
    "entrenador personal online",
    "entrenamiento online personalizado",
    "nutrición y entrenamiento online",
    "HYROX España",
    "entrenador HYROX online",
    "plan entrenamiento online",
    "Pacomont",
    "embajador HYROX España",
    "entrenador online España",
    "preparación HYROX",
    "app entrenamiento personalizado",
    "coaching deportivo online",
  ],
  openGraph: {
    title: "Pacomont | Entrenador Personal Online",
    description:
      "Planes de entrenamiento y nutrición personalizados. Seguimiento real. Embajador Oficial HYROX España.",
    url: "https://www.pacomont.es",
    siteName: "Pacomont",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/images/Hero_New_6.jpg", width: 1200, height: 630, alt: "Pacomont - Entrenador Personal Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pacomont | Entrenador Personal Online",
    description: "Planes de entrenamiento y nutrición personalizados. Embajador Oficial HYROX España.",
    images: ["/images/Hero_New_6.jpg"],
  },
  alternates: { canonical: "https://www.pacomont.es" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
