// Fetches all artworks from Supabase and writes lib/artworks-data.json.
// Runs as the first step of `npm run build` so the static export always
// ships the latest works Oliver has uploaded via /admin.
//
// The URL and key are the project's *publishable* (anon) credentials —
// they ship to every browser anyway; row security lives in Postgres RLS.
// Fails loudly on any error: a failed build keeps the previous deploy
// live, which beats silently publishing a stale or empty gallery.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SUPABASE_URL = "https://vqucytltwnxegetgqlhz.supabase.co";
const SUPABASE_KEY = "sb_publishable__LuokHE98-uf_9YH9rnELA_Jl__VaoG";

const res = await fetch(
  `${SUPABASE_URL}/rest/v1/oliver_artworks?select=*&order=number.asc`,
  { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
);

if (!res.ok) {
  console.error(`fetch-artworks: Supabase responded ${res.status} ${res.statusText}`);
  process.exit(1);
}

const rows = await res.json();

if (!Array.isArray(rows) || rows.length === 0) {
  console.error("fetch-artworks: got 0 artworks — refusing to build an empty gallery.");
  process.exit(1);
}

const artworks = rows.map((r) => ({
  slug: r.slug,
  number: r.number,
  image: r.image,
  imageW: r.image_w,
  imageH: r.image_h,
  title: { en: r.title_en, da: r.title_da },
  medium: { en: r.medium_en, da: r.medium_da },
  year: r.year,
  dimensions: r.dimensions,
  description:
    r.description_en || r.description_da
      ? {
          en: r.description_en || r.description_da,
          da: r.description_da || r.description_en,
        }
      : null,
  available: r.available,
  orientation: r.orientation,
  category: r.category,
}));

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "lib", "artworks-data.json");
writeFileSync(out, JSON.stringify(artworks, null, 2) + "\n", "utf8");
console.log(`fetch-artworks: wrote ${artworks.length} artworks to lib/artworks-data.json`);
