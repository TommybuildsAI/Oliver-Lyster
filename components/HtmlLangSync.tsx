"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

/**
 * Patches <html lang> at runtime to match the current locale. The root
 * layout has to be statically renderable (no headers() call) to keep all
 * pages SSG, so it can't know the URL locale at render time. Real
 * browsers fix it on first paint via this effect; SEO crawlers rely on
 * the URL path + hreflang alternates (set in metadata) which is the
 * stronger signal anyway.
 */
export function HtmlLangSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (document.documentElement.lang !== locale) {
      document.documentElement.lang = locale;
    }
  }, [locale]);
  return null;
}
