"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  readConsent,
  writeConsent,
  CONSENT_EVENT,
  type ConsentState,
} from "@/lib/consent";
import { type Locale } from "@/lib/i18n";

type Copy = {
  message: string;
  learnMore: string;
  accept: string;
  decline: string;
};

export function CookieBanner({
  locale,
  copy,
}: {
  locale: Locale;
  copy: Copy;
}) {
  const [state, setState] = useState<ConsentState>("accepted");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setState(readConsent());
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as ConsentState;
      setState(detail);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!mounted || state !== null) return null;

  const decide = (decision: "accepted" | "declined") => {
    writeConsent(decision);
    setState(decision);
  };

  return (
    <div
      role="dialog"
      aria-label={copy.message}
      className="pointer-events-none fixed inset-x-4 bottom-4 z-30 flex justify-center md:bottom-8 md:inset-x-8"
    >
      <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full bg-[#ECE1C6] px-6 py-3 shadow-[0_8px_28px_rgba(26,26,26,0.18)] ring-1 ring-ink/10 md:flex-nowrap md:gap-x-7 md:px-8 md:py-4">
        <p className="body-serif text-sm text-ink md:text-base">
          {copy.message}
        </p>
        <Link
          href={`/${locale}/cookies`}
          className="smallcaps text-xs link-underline md:text-sm"
          data-active="true"
        >
          {copy.learnMore}
        </Link>
        <span aria-hidden="true" className="hidden text-graphite md:inline">
          ·
        </span>
        <button
          type="button"
          onClick={() => decide("declined")}
          className="smallcaps text-sm link-underline md:text-base"
          data-active="true"
        >
          {copy.decline}
        </button>
        <button
          type="button"
          onClick={() => decide("accepted")}
          className="smallcaps text-sm link-underline md:text-base"
          data-active="true"
        >
          {copy.accept}
        </button>
      </div>
    </div>
  );
}
