import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { listCategories } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const categories = await listCategories();

  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  for (const category of categories) {
    routes.push({
      url: `${siteUrl}/?category=${encodeURIComponent(category.slug)}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  return routes;
}
