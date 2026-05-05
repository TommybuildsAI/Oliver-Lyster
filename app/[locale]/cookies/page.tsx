import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Rise } from "@/components/Rise";
import { CookieResetButton } from "@/components/CookieResetButton";
import { cookiesText } from "@/lib/legal-text";
import { locales, t, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const L = locale as Locale;
  return { title: cookiesText[L].title };
}

export default async function Cookies({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const L = locale as Locale;
  const doc = cookiesText[L];
  const d = t(L);

  return (
    <article className="mx-auto max-w-[900px] px-6 pt-16 pb-32 md:px-12 md:pt-24">
      <Rise as="header" variant="drawline" className="mb-16 pb-8 md:mb-20">
        <p className="smallcaps text-xs text-graphite md:text-sm">
          {L === "da" ? "Senest opdateret" : "Last updated"} · {doc.updated}
        </p>
        <h1 className="display-serif mt-4 text-4xl leading-[1.05] md:mt-6 md:text-6xl">
          <Rise as="span" variant="blur-rise" delay={80} className="block">
            {doc.title}
          </Rise>
        </h1>
        <p className="body-serif mt-8 max-w-[55ch] text-base text-ink-soft md:mt-10 md:text-lg">
          {doc.intro}
        </p>
      </Rise>

      <div className="flex flex-col gap-14 md:gap-20">
        {doc.sections.map((s, i) => (
          <Rise as="section" key={i} delay={60}>
            <h2 className="smallcaps text-base text-ink md:text-lg">
              {s.heading}
            </h2>
            <div className="body-serif mt-5 flex flex-col gap-4 text-base text-ink-soft md:mt-6 md:text-lg">
              {s.body.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </Rise>
        ))}

        <Rise as="section" delay={60} className="border-t border-rule pt-10 md:pt-14">
          <h2 className="smallcaps text-base text-ink md:text-lg">
            {L === "da" ? "Dit valg" : "Your choice"}
          </h2>
          <div className="mt-5 md:mt-6">
            <CookieResetButton
              labelReset={d.cookieReset.reset}
              labelStateAccepted={d.cookieReset.stateAccepted}
              labelStateDeclined={d.cookieReset.stateDeclined}
              labelStateUnset={d.cookieReset.stateUnset}
            />
          </div>
        </Rise>
      </div>
    </article>
  );
}
