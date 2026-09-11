import type { MetadataRoute } from "next";
import { business } from "@/config/business";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return business.siteUrl
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${business.siteUrl}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
