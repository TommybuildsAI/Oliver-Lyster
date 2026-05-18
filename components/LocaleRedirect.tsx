"use client";

import { useEffect } from "react";

const LOCALES = ["da", "en"] as const;

function pick(): "da" | "en" {
  const m = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=(da|en)\b/);
  if (m) return m[1] as "da" | "en";
  const langs =
    navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "da"];
  for (const l of langs) {
    const tag = l.toLowerCase().split("-")[0];
    if ((LOCALES as readonly string[]).includes(tag)) {
      return tag as "da" | "en";
    }
  }
  return "da";
}

export function LocaleRedirect() {
  useEffect(() => {
    window.location.replace(`/${pick()}`);
  }, []);
  return null;
}
