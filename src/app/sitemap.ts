import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.pacomont.es";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/llamada`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/aviso-legal`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/politica-privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/politica-cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terminos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
