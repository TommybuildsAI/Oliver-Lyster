import type { MetadataRoute } from "next";
import { artworks } from "@/lib/artworks";
import { locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const STATIC_PATHS: Array<{ path: string; freq: ChangeFreq; priority: number }> = [
  { path: "",              freq: "monthly", priority: 1.0 },
  { path: "/works",        freq: "monthly", priority: 0.9 },
  { path: "/about",        freq: "yearly",  priority: 0.8 },
  { path: "/exhibitions",  freq: "monthly", priority: 0.7 },
  { path: "/press",        freq: "monthly", priority: 0.7 },
  { path: "/contact",      freq: "yearly",  priority: 0.6 },
  { path: "/privacy",      freq: "yearly",  priority: 0.2 },
  { path: "/cookies",      freq: "yearly",  priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  // Static pages — one entry per locale, with hreflang alternates pointing
  // to the same path in the other locale.
  for (const locale of locales) {
    for (const p of STATIC_PATHS) {
      urls.push({
        url: `${SITE_URL}/${locale}${p.path}`,
        lastModified: now,
        changeFrequency: p.freq,
        priority: p.priority,
        alternates: {
          languages: {
            da: `${SITE_URL}/da${p.path}`,
            en: `${SITE_URL}/en${p.path}`,
            "x-default": `${SITE_URL}/da${p.path}`,
          },
        },
      });
    }
  }

  // Per-artwork pages — same hreflang treatment.
  for (const locale of locales) {
    for (const a of artworks) {
      const path = `/works/${a.slug}`;
      urls.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.5,
        alternates: {
          languages: {
            da: `${SITE_URL}/da${path}`,
            en: `${SITE_URL}/en${path}`,
            "x-default": `${SITE_URL}/da${path}`,
          },
        },
      });
    }
  }

  return urls;
}
