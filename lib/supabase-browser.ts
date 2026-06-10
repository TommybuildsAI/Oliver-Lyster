import { createClient } from "@supabase/supabase-js";

// Publishable credentials — safe to ship to the browser; write access is
// enforced by RLS in Postgres (only the allow-listed admin emails).
export const SUPABASE_URL = "https://vqucytltwnxegetgqlhz.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable__LuokHE98-uf_9YH9rnELA_Jl__VaoG";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export const ART_BUCKET = "oliver-art";
export const PUBLISH_FN_URL = `${SUPABASE_URL}/functions/v1/oliver-publish`;
