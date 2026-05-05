import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: [
      "https://oliverlyster.com/sitemap.xml",
      "https://oliverlyster.com/sitemap-images.xml",
    ],
    host: "https://oliverlyster.com",
  };
}
