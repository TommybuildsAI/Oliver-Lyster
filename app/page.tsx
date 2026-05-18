import type { Metadata } from "next";
import { LocaleRedirect } from "@/components/LocaleRedirect";
import { SITE_URL } from "@/lib/seo";

// Root is a client-side language switch. A static export can't run
// middleware or a server-side redirect(), so the browser picks the
// locale and crawlers follow the hreflang alternates / <noscript>
// refresh. /da and /en are each indexed on their own.
export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/da`,
    languages: {
      da: `${SITE_URL}/da`,
      en: `${SITE_URL}/en`,
      "x-default": `${SITE_URL}/da`,
    },
  },
};

export default function Root() {
  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/da" />
      </noscript>
      <LocaleRedirect />
    </>
  );
}
