import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Rise } from "@/components/Rise";
import { exhibitions } from "@/lib/exhibitions";
import { locales, t, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

const exMeta = {
  da: {
    title: "Udstillinger",
    description:
      "Udvalgte solo- og gruppeudstillinger af Oliver Lyster — bl.a. Frederiksborg Slot (Portrait Now, 2021), SAK Svendborg og Lundeborg Sognehus.",
  },
  en: {
    title: "Exhibitions",
    description:
      "Selected solo and group exhibitions by Oliver Lyster — including Frederiksborg Slot (Portrait Now, 2021), SAK Svendborg, and Lundeborg Sognehus.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const L = locale as Locale;
  return pageMetadata({
    locale: L,
    path: "/exhibitions",
    title: exMeta[L].title,
    description: exMeta[L].description,
  });
}

export default async function Exhibitions({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const L = locale as Locale;
  const d = t(L);

  return (
    <div className="mx-auto max-w-[1400px] px-6 pt-16 md:px-12 md:pt-24">
      <Rise
        as="header"
        variant="drawline"
        className="mb-20 grid grid-cols-12 gap-6 pb-10 md:mb-32 md:gap-8"
      >
        <h1 className="display-serif col-span-12 text-5xl md:col-span-7 md:text-7xl">
          <Rise as="span" variant="blur-rise" delay={80} className="block">
            {d.exhibitions.title}
          </Rise>
        </h1>
        <p className="body-serif col-span-12 text-base text-ink-soft md:col-span-4 md:col-start-9 md:self-end md:text-lg">
          {d.exhibitions.intro}
        </p>
      </Rise>

      <ol className="flex flex-col divide-y divide-rule/70 border-y border-rule/70">
        {exhibitions.map((e, i) => (
          <Rise key={`${e.year}-${e.title.en}`} as="li" delay={60} className="py-10 md:py-12">
            <div className="grid grid-cols-12 items-baseline gap-4 md:gap-8">
              <span className="smallcaps col-span-3 text-[0.8rem] tracking-[0.22em] text-graphite md:col-span-2 md:text-[0.9rem]">
                {e.year}
              </span>
              <h2 className="display-serif col-span-9 text-2xl italic leading-[1.1] md:col-span-7 md:text-[2rem] lg:text-[2.4rem]">
                {e.title[L]}
              </h2>
              {e.venue[L] ? (
                <p className="smallcaps col-span-12 text-[0.75rem] text-graphite md:col-span-3 md:justify-self-end md:text-right">
                  {e.venue[L]}
                </p>
              ) : null}
            </div>
          </Rise>
        ))}
      </ol>
    </div>
  );
}
