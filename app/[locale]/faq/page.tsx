import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Rise } from "@/components/Rise";
import { JsonLd } from "@/components/JsonLd";
import { faqText } from "@/lib/faq";
import { locales, type Locale } from "@/lib/i18n";
import { pageMetadata, faqPageSchema } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const L = locale as Locale;
  const doc = faqText[L];
  return pageMetadata({
    locale: L,
    path: "/faq",
    title: doc.title,
    description: doc.intro,
  });
}

export default async function Faq({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const L = locale as Locale;
  const doc = faqText[L];

  return (
    <article className="mx-auto max-w-[900px] px-6 pt-16 pb-32 md:px-12 md:pt-24">
      <JsonLd data={faqPageSchema(doc.entries, L)} />

      <Rise as="header" variant="drawline" className="mb-16 pb-8 md:mb-20">
        <p className="smallcaps text-xs text-graphite md:text-sm">
          — {L === "da" ? "Spørgsmål" : "Questions"}
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

      <dl className="flex flex-col divide-y divide-rule/70 border-y border-rule/70">
        {doc.entries.map((e, i) => (
          <Rise as="div" key={i} delay={60} className="py-10 md:py-12">
            <dt className="display-serif text-2xl italic leading-[1.15] md:text-3xl">
              {e.question}
            </dt>
            <dd className="body-serif mt-4 max-w-[60ch] text-base text-ink-soft md:mt-5 md:text-lg">
              {e.answer}
            </dd>
          </Rise>
        ))}
      </dl>
    </article>
  );
}
