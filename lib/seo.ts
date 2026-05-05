import type { Metadata } from "next";
import type { Artwork } from "./artworks";
import type { PressItem } from "./press";
import type { Locale } from "./i18n";
import { visualAltFor } from "./visual-alts";

// Site-wide constants — single source of truth so descriptions, schema,
// canonical URLs, and OG tags all stay in sync.

export const SITE_URL = "https://oliverlyster.com";
export const SITE_NAME = "Oliver Lyster";
export const ARTIST_NAME = "Oliver Daniel Lyster";
export const ARTIST_BIRTH_YEAR = "1998";
export const ARTIST_BIRTH_PLACE = "Helsingør, Denmark";
export const ARTIST_REGION = "Funen";
export const ARTIST_COUNTRY = "DK";
export const ARTIST_INSTAGRAM = "https://www.instagram.com/oliverlyster/";

// Default OG image — Oliver's signed self-portrait in oil
export const DEFAULT_OG_IMAGE = `${SITE_URL}/art/02-autoportrait-with-hat.jpg`;

export function ogLocale(locale: Locale): string {
  return locale === "da" ? "da_DK" : "en_US";
}

export function alternateOgLocale(locale: Locale): string {
  return locale === "da" ? "en_US" : "da_DK";
}

export function inLanguage(locale: Locale): string {
  return locale === "da" ? "da-DK" : "en";
}

export function alternates(locale: Locale, path: string) {
  // path: "" for the locale root, otherwise e.g. "/works" or "/works/some-slug"
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      da: `${SITE_URL}/da${path}`,
      en: `${SITE_URL}/en${path}`,
      "x-default": `${SITE_URL}/da${path}`,
    },
  };
}

// Build a descriptive alt string from an artwork. Replaces bare title
// alts with title + medium + (year) + author + visual description —
// better for image SEO, AI engines, and screen readers. Visual
// descriptions live in lib/visual-alts.ts.
export function altFor(
  a: {
    slug: string;
    title: { en: string; da: string };
    medium: { en: string; da: string };
    year: string | null;
    category: "painting" | "drawing";
  },
  locale: Locale
): string {
  const yearStr = a.year ? `, ${a.year}` : "";
  const visual = visualAltFor(a.slug, locale);
  if (locale === "da") {
    const cat = a.category === "painting" ? "maleri" : "tegning";
    const head = `${a.title.da} — ${a.medium.da}${yearStr}. ${cat} af Oliver Lyster.`;
    return visual ? `${head} ${visual}` : head;
  }
  const head = `${a.title.en} — ${a.medium.en}${yearStr}. ${a.category === "painting" ? "Painting" : "Drawing"} by Oliver Lyster.`;
  return visual ? `${head} ${visual}` : head;
}

// Reusable per-page metadata builder. Wraps the bilingual + OG +
// canonical concerns so each page can stay terse.
export function pageMetadata({
  locale,
  path,
  title,
  description,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  ogImageAlt?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: alternates(locale, path),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      siteName: SITE_NAME,
      locale: ogLocale(locale),
      alternateLocale: [alternateOgLocale(locale)],
      type: ogType,
      images: [{ url: ogImage, alt: ogImageAlt ?? title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// ────────────────────────────────────────────────────────────────────
// JSON-LD schema builders
// ────────────────────────────────────────────────────────────────────

export function personSchema(press: PressItem[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: ARTIST_NAME,
    alternateName: SITE_NAME,
    givenName: "Oliver",
    additionalName: "Daniel",
    familyName: "Lyster",
    birthDate: ARTIST_BIRTH_YEAR,
    birthPlace: {
      "@type": "Place",
      name: ARTIST_BIRTH_PLACE,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Helsingør",
        addressCountry: "DK",
      },
    },
    nationality: { "@type": "Country", name: "Denmark" },
    jobTitle: "Painter",
    description:
      "Classical realist oil painter based in Funen, Denmark. Trained at the Swedish Academy of Realist Art in Skåne and apprenticed for three years under American painter Charles Weed in Svendborg. Works exclusively from direct observation in natural light; refuses to use photography or AI as reference. Combines studio practice with part-time work as a gravedigger.",
    knowsAbout: [
      "Classical realism",
      "Oil painting",
      "Portraiture",
      "Landscape painting",
      "Still life",
      "Drawing",
      "Old Masters technique",
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Swedish Academy of Realist Art",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: ARTIST_REGION,
      addressCountry: ARTIST_COUNTRY,
    },
    image: DEFAULT_OG_IMAGE,
    url: SITE_URL,
    sameAs: [ARTIST_INSTAGRAM],
    ...(press.length > 0 && {
      subjectOf: press.map((p) => ({
        "@type": "NewsArticle",
        headline: p.title.en,
        url: p.url,
        datePublished: p.dateIso,
        publisher: { "@type": "Organization", name: p.publication },
        about: { "@id": `${SITE_URL}/#person` },
      })),
    }),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "Portfolio of Oliver Lyster — classical realist painter from Funen, Denmark. Landscapes, portraits, still lifes in oil and ink.",
    inLanguage: ["da-DK", "en"],
    publisher: { "@id": `${SITE_URL}/#person` },
  };
}

export function visualArtworkSchema(a: Artwork, locale: Locale) {
  const isPainting = a.category === "painting";
  return {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: a.title[locale],
    creator: { "@id": `${SITE_URL}/#person` },
    artform: isPainting ? "Painting" : "Drawing",
    artMedium: a.medium.en,
    image: `${SITE_URL}${a.image}`,
    url: `${SITE_URL}/${locale}/works/${a.slug}`,
    inLanguage: inLanguage(locale),
    ...(a.year ? { dateCreated: a.year } : {}),
    ...(a.dimensions ? { size: a.dimensions } : {}),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function collectionPageSchema({
  locale,
  path,
  name,
  description,
  artworks,
}: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  artworks: Artwork[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/${locale}${path}#collection`,
    url: `${SITE_URL}/${locale}${path}`,
    name,
    description,
    inLanguage: inLanguage(locale),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    hasPart: artworks.map((a) => ({
      "@type": "VisualArtwork",
      name: a.title[locale],
      url: `${SITE_URL}/${locale}/works/${a.slug}`,
      image: `${SITE_URL}${a.image}`,
      creator: { "@id": `${SITE_URL}/#person` },
    })),
  };
}
