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
  // Default to "accepted" pre-mount so the banner doesn't flash on first
  // paint while we still don't know the persisted state.
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
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-paper/20 bg-ink text-paper"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-10 md:px-12 md:py-6">
        <p className="body-serif max-w-[65ch] text-sm md:text-base">
          {copy.message}{" "}
          <Link
            href={`/${locale}/cookies`}
            className="smallcaps text-xs link-underline md:text-sm"
            data-active="true"
          >
            {copy.learnMore}
          </Link>
        </p>
        <div className="flex shrink-0 items-baseline gap-6 md:gap-8">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="smallcaps text-sm link-underline md:text-base"
            data-active="true"
          >
            — {copy.decline}
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="smallcaps text-sm link-underline md:text-base"
            data-active="true"
          >
            — {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
