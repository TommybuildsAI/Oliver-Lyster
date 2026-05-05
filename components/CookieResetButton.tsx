"use client";

import { useEffect, useState } from "react";
import {
  clearConsent,
  readConsent,
  CONSENT_EVENT,
  type ConsentState,
} from "@/lib/consent";

export function CookieResetButton({
  labelReset,
  labelStateAccepted,
  labelStateDeclined,
  labelStateUnset,
}: {
  labelReset: string;
  labelStateAccepted: string;
  labelStateDeclined: string;
  labelStateUnset: string;
}) {
  const [state, setState] = useState<ConsentState>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setState(readConsent());
    const onChange = (e: Event) =>
      setState((e as CustomEvent).detail as ConsentState);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!mounted) return null;

  const stateLabel =
    state === "accepted"
      ? labelStateAccepted
      : state === "declined"
      ? labelStateDeclined
      : labelStateUnset;

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-6">
      <span className="smallcaps text-xs text-graphite md:text-sm">
        {stateLabel}
      </span>
      <button
        type="button"
        onClick={clearConsent}
        className="smallcaps self-start text-sm link-underline md:text-base"
        data-active="true"
      >
        — {labelReset}
      </button>
    </div>
  );
}
