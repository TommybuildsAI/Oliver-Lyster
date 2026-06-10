// Artwork data — single source of truth is the `oliver_artworks` table in
// Supabase, which Oliver manages himself via /admin. At build time,
// scripts/fetch-artworks.mjs snapshots the table into artworks-data.json
// (committed, so `next dev` works without a fetch). Page code keeps the
// same synchronous imports it had when this file held a hardcoded array.

import data from "./artworks-data.json";

export type Category = "painting" | "drawing";

export type Artwork = {
  slug: string;
  number: number;
  image: string;
  imageW: number | null;
  imageH: number | null;
  title: { en: string; da: string };
  medium: { en: string; da: string };
  year: string | null;
  dimensions: string | null;
  description: { en: string; da: string } | null;
  available: boolean;
  orientation: "portrait" | "landscape" | "square";
  category: Category;
};

export const artworks: Artwork[] = data as Artwork[];

export function getArtwork(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export const paintings = artworks.filter((a) => a.category === "painting");
export const drawings = artworks.filter((a) => a.category === "drawing");
