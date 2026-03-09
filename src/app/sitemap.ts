import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["vi", "en"] as const;

  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date("2025-01-01"),
    changeFrequency: "monthly",
    priority: locale === "vi" ? 1.0 : 0.9,
    alternates: {
      languages: {
        vi: `${SITE_URL}/vi`,
        en: `${SITE_URL}/en`,
      },
    },
  }));
}

