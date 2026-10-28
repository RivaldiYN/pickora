import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/assets/"],
        disallow: [
          "/admin",
          "/admin/*",
          "/login",
          "/api/auth",
          "/api/auth/*",
          "/api/upload",
          "/api/neon-health",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

