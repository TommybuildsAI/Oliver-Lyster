import type { MetadataRoute } from "next";
import { artworks } from "@/lib/artworks";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://oliverlyster.com";
  const urls: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    urls.push({ url: `${base}/${locale}`, changeFrequency: "monthly" });
    urls.push({ url: `${base}/${locale}/works`, changeFrequency: "monthly" });
    urls.push({ url: `${base}/${locale}/about`, changeFrequency: "yearly" });
    urls.push({ url: `${base}/${locale}/press`, changeFrequency: "monthly" });
    urls.push({ url: `${base}/${locale}/contact`, changeFrequency: "yearly" });
    for (const a of artworks) {
      urls.push({
        url: `${base}/${locale}/works/${a.slug}`,
        changeFrequency: "yearly",
      });
    }
  }
  return urls;
}
