import type { MetadataRoute } from "next";
import { business } from "@/config/business";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!business.siteUrl) return [];
  return [
    { url: business.siteUrl, changeFrequency: "monthly", priority: 1 },
    {
      url: `${business.siteUrl}/productos`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
