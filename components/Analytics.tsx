"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { readConsent, CONSENT_EVENT } from "@/lib/consent";

export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(readConsent() === "accepted");
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setConsented(detail === "accepted");
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!id || !consented) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

export function SearchConsoleVerification() {
  const token = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
  if (!token) return null;
  return <meta name="google-site-verification" content={token} />;
}
