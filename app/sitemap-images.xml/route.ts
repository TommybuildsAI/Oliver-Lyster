import { artworks } from "@/lib/artworks";
import { press } from "@/lib/press";
import { locales } from "@/lib/i18n";
import { SITE_URL, ARTIST_NAME } from "@/lib/seo";

// Image sitemap — Google's image extension to the standard sitemap
// (https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps).
// Helps Google Images discover and rank every painting and press
// photograph with proper title + caption metadata.

export const dynamic = "force-static";

function escape(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push(
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'
  );

  // For each artwork, both locale URLs reference the same image; we list
  // the EN URL to keep the canonical English title for Google.
  for (const a of artworks) {
    for (const locale of locales) {
      const pageUrl = `${SITE_URL}/${locale}/works/${a.slug}`;
      const imageUrl = `${SITE_URL}${a.image}`;
      const yearStr = a.year ? `, ${a.year}` : "";
      const title = `${a.title[locale]} — ${a.medium[locale]}${yearStr}`;
      const caption = `${a.title[locale]}, ${a.category} by ${ARTIST_NAME}${yearStr}.`;

      lines.push("  <url>");
      lines.push(`    <loc>${escape(pageUrl)}</loc>`);
      lines.push("    <image:image>");
      lines.push(`      <image:loc>${escape(imageUrl)}</image:loc>`);
      lines.push(`      <image:title>${escape(title)}</image:title>`);
      lines.push(`      <image:caption>${escape(caption)}</image:caption>`);
      lines.push("    </image:image>");
      lines.push("  </url>");
    }
  }

  // Press photos
  for (const p of press) {
    for (const locale of locales) {
      const pageUrl = `${SITE_URL}/${locale}/press`;
      const imageUrl = `${SITE_URL}${p.image}`;

      lines.push("  <url>");
      lines.push(`    <loc>${escape(pageUrl)}</loc>`);
      lines.push("    <image:image>");
      lines.push(`      <image:loc>${escape(imageUrl)}</image:loc>`);
      lines.push(`      <image:title>${escape(p.imageAlt[locale])}</image:title>`);
      lines.push(
        `      <image:caption>${escape(`${p.title[locale]} — ${p.publication}, ${p.date[locale]}`)}</image:caption>`
      );
      lines.push("    </image:image>");
      lines.push("  </url>");
    }
  }

  lines.push("</urlset>");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
