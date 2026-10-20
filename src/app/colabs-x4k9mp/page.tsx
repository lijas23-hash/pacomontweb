import type { Metadata } from "next";
import { Suspense } from "react";
import ColabsClient from "./ColabsClient";

export const metadata: Metadata = {
  title: "Paco Montero · Colaboraciones de marca",
  description: "Atleta híbrido y embajador HYROX en España. 104K Instagram · 9,61% engagement · 51,5M visualizaciones en reels.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Paco Montero · Colaboraciones",
    description: "104K Instagram · 9,61% engagement · Embajador HYROX en España",
    images: [
      {
        url: "https://www.pacomont.es/images/Velites_Hyrox_Madrid_PacoChristian_127.jpg",
        width: 1200,
        height: 800,
        alt: "Paco Montero en competición HYROX",
      },
    ],
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paco Montero · Colaboraciones",
    description: "104K Instagram · 9,61% engagement · Embajador HYROX en España",
    images: ["https://www.pacomont.es/images/Velites_Hyrox_Madrid_PacoChristian_127.jpg"],
  },
};

export default function ColabsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#F4F1EA" }} />}>
      <ColabsClient />
    </Suspense>
  );
}
