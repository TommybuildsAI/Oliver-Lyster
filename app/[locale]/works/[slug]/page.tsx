import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Rise } from "@/components/Rise";
import { JsonLd } from "@/components/JsonLd";
import { artworks, getArtwork } from "@/lib/artworks";
import { dimsOf } from "@/lib/art-dims";
import { locales, t, type Locale } from "@/lib/i18n";
import {
  pageMetadata,
  visualArtworkSchema,
  breadcrumbSchema,
  altFor,
  absImageUrl,
  SITE_URL,
  SITE_NAME,
} from "@/lib/seo";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const a of artworks) {
      params.push({ locale, slug: a.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const L = locale as Locale;
  const a = getArtwork(slug);
  if (!a) return { title: "Not found" };
  const yearStr = a.year ? `, ${a.year}` : "";
  const dimStr = a.dimensions ? ` — ${a.dimensions}` : "";
  const description =
    L === "da"
      ? `${a.title[L]} — ${a.medium[L]}${yearStr}${dimStr}. Værk af Oliver Lyster, klassisk realistisk maler fra Fyn.`
      : `${a.title[L]} — ${a.medium[L]}${yearStr}${dimStr}. Work by Oliver Lyster, classical realist painter from Funen, Denmark.`;
  return pageMetadata({
    locale: L,
    path: `/works/${a.slug}`,
    title: a.title[L],
    description,
    ogType: "article",
    ogImage: absImageUrl(a.image),
    ogImageAlt: `${a.title[L]} — ${a.medium[L]}`,
  });
}

export default async function Work({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const L = locale as Locale;
  const d = t(L);
  const a = getArtwork(slug);
  if (!a) notFound();

  const idx = artworks.findIndex((x) => x.slug === slug);
  const prev = artworks[(idx - 1 + artworks.length) % artworks.length];
  const next = artworks[(idx + 1) % artworks.length];

  const inquireSubject = encodeURIComponent(
    `${d.contact.subjectInquiry}: ${a.title.en}`
  );

  const jsonLd = [
    visualArtworkSchema(a, L),
    breadcrumbSchema([
      { name: SITE_NAME, url: `${SITE_URL}/${L}` },
      { name: d.works.title, url: `${SITE_URL}/${L}/works` },
      { name: a.title[L], url: `${SITE_URL}/${L}/works/${a.slug}` },
    ]),
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-6 pt-12 md:px-12 md:pt-16">
      <JsonLd data={jsonLd} />
      <Rise as="div" className="mb-8">
        <Link
          href={`/${L}/works`}
          className="smallcaps text-sm text-graphite link-underline md:text-base lg:text-lg"
        >
          ← {d.works.back}
        </Link>
      </Rise>

      <article className="grid grid-cols-12 gap-8 md:gap-12">
        <Rise
          as="figure"
          variant="curtain"
          className="col-span-12 md:col-span-8"
        >
          <div className="relative overflow-hidden">
            <Image
              src={a.image}
              alt={altFor(a, L)}
              width={dimsOf(a).w}
              height={dimsOf(a).h}
              priority
              sizes="(min-width: 768px) 66vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </Rise>

        <Rise
          as="aside"
          delay={200}
          className="col-span-12 md:col-span-3 md:col-start-10 md:self-center"
        >
          <p className="smallcaps text-sm text-graphite md:text-base">
            № {String(a.number).padStart(2, "0")}
          </p>
          <h1 className="display-serif mt-3 text-4xl italic md:text-5xl">
            <Rise as="span" variant="blur-rise" delay={200} className="block">
              {a.title[L]}
            </Rise>
          </h1>
          <dl className="mt-10 flex flex-col gap-5 text-base md:text-lg">
            <div>
              <dt className="smallcaps text-xs text-graphite md:text-sm">
                {d.works.medium}
              </dt>
              <dd className="mt-1.5 font-serif">{a.medium[L]}</dd>
            </div>
            {a.year && (
              <div>
                <dt className="smallcaps text-xs text-graphite md:text-sm">
                  {d.works.year}
                </dt>
                <dd className="mt-1.5 font-serif">{a.year}</dd>
              </div>
            )}
            {a.dimensions && (
              <div>
                <dt className="smallcaps text-xs text-graphite md:text-sm">
                  {d.works.dimensions}
                </dt>
                <dd className="mt-1.5 font-serif">{a.dimensions}</dd>
              </div>
            )}
            <div>
              <dt className="smallcaps text-xs text-graphite md:text-sm">
                {d.works.availability}
              </dt>
              <dd className="mt-1.5 font-serif">
                {a.available ? d.works.available : d.works.sold}
              </dd>
            </div>
          </dl>

          {a.description && (
            <p className="body-serif mt-10 text-base text-ink-soft md:text-lg">
              {a.description[L]}
            </p>
          )}

          {a.available && (
            <Link
              href={`/${L}/contact?subject=${inquireSubject}`}
              className="smallcaps mt-10 inline-block text-sm link-underline md:text-base lg:text-lg"
              data-active="true"
            >
              — {d.works.inquire}
            </Link>
          )}
        </Rise>
      </article>

      <nav className="mt-32 flex items-baseline justify-between border-t border-rule pt-6 md:mt-48">
        <Link
          href={`/${L}/works/${prev.slug}`}
          className="smallcaps text-sm link-underline md:text-base lg:text-lg"
        >
          ← {prev.title[L]}
        </Link>
        <Link
          href={`/${L}/works/${next.slug}`}
          className="smallcaps text-sm link-underline text-right md:text-base lg:text-lg"
        >
          {next.title[L]} →
        </Link>
      </nav>
    </div>
  );
}
