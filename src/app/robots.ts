import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/crm/", "/crm", "/colabs-x4k9mp"],
    },
    sitemap: "https://www.pacomont.es/sitemap.xml",
  };
}
