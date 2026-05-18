"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

/**
 * Patches <html lang> at runtime to match the current locale, and
 * persists the choice in the NEXT_LOCALE cookie so the root locale
 * switch (formerly proxy.ts middleware) stays sticky across visits.
 * The root layout has to be statically renderable (no headers() call)
 * to keep all pages SSG, so it can't know the URL locale at render
 * time. Crawlers rely on the URL path + hreflang alternates.
 */
export function HtmlLangSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (document.documentElement.lang !== locale) {
      document.documentElement.lang = locale;
    }
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [locale]);
  return null;
}
