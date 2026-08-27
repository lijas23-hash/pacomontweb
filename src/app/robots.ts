import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/crm/", "/crm"],
    },
    sitemap: "https://www.pacomont.es/sitemap.xml",
  };
}
