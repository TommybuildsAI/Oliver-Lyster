import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Rise } from "@/components/Rise";
import { artworks, getArtwork } from "@/lib/artworks";
import { locales, t, type Locale } from "@/lib/i18n";

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
  return {
    title: `${a.title[L]}`,
    description: `${a.title[L]} — ${a.medium[L]}${a.year ? `, ${a.year}` : ""}`,
    openGraph: {
      images: [{ url: a.image, alt: a.title[L] }],
    },
  };
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

  return (
    <div className="mx-auto max-w-[1400px] px-6 pt-12 md:px-12 md:pt-16">
      <Rise as="div" className="mb-8">
        <Link
          href={`/${L}/works`}
          className="smallcaps text-[0.7rem] text-graphite link-underline"
        >
          ← {d.works.back}
        </Link>
      </Rise>

      <article className="grid grid-cols-12 gap-8 md:gap-12">
        <Rise
          as="figure"
          className="col-span-12 md:col-span-8"
        >
          <div className="relative overflow-hidden">
            <Image
              src={a.image}
              alt={a.title[L]}
              width={2000}
              height={a.orientation === "portrait" ? 2500 : 1500}
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
          <p className="smallcaps text-[0.7rem] text-graphite">
            № {String(a.number).padStart(2, "0")}
          </p>
          <h1 className="display-serif mt-3 text-4xl italic md:text-5xl">
            {a.title[L]}
          </h1>
          <dl className="mt-10 flex flex-col gap-4 text-sm">
            <div>
              <dt className="smallcaps text-[0.65rem] text-graphite">
                {d.works.medium}
              </dt>
              <dd className="mt-1 font-serif">{a.medium[L]}</dd>
            </div>
            {a.year && (
              <div>
                <dt className="smallcaps text-[0.65rem] text-graphite">
                  {d.works.year}
                </dt>
                <dd className="mt-1 font-serif">{a.year}</dd>
              </div>
            )}
            {a.dimensions && (
              <div>
                <dt className="smallcaps text-[0.65rem] text-graphite">
                  {d.works.dimensions}
                </dt>
                <dd className="mt-1 font-serif">{a.dimensions}</dd>
              </div>
            )}
            <div>
              <dt className="smallcaps text-[0.65rem] text-graphite">
                {d.works.availability}
              </dt>
              <dd className="mt-1 font-serif">
                {a.available ? d.works.available : d.works.sold}
              </dd>
            </div>
          </dl>

          {a.available && (
            <Link
              href={`/${L}/contact?subject=${inquireSubject}`}
              className="smallcaps mt-10 inline-block text-xs link-underline"
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
          className="smallcaps text-[0.7rem] link-underline"
        >
          ← {prev.title[L]}
        </Link>
        <Link
          href={`/${L}/works/${next.slug}`}
          className="smallcaps text-[0.7rem] link-underline text-right"
        >
          {next.title[L]} →
        </Link>
      </nav>
    </div>
  );
}
