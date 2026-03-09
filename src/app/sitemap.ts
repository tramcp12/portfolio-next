import type { MetadataRoute } from "next";

const SITE_URL = "https://tramcp12.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["vi", "en"] as const;

  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
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
