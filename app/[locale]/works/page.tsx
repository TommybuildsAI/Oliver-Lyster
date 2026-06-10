import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Rise } from "@/components/Rise";
import { BackToTop } from "@/components/BackToTop";
import { JsonLd } from "@/components/JsonLd";
import {
  paintings,
  drawings,
  artworks,
  type Artwork,
} from "@/lib/artworks";
import { dimsOf } from "@/lib/art-dims";
import { locales, t, type Locale } from "@/lib/i18n";
import { pageMetadata, collectionPageSchema } from "@/lib/seo";

const worksCopy = {
  da: {
    title: "Værker",
    description:
      "Udvalgte malerier og tegninger af Oliver Lyster — olie, blæk og blyant i den klassiske realismes tradition. Landskaber, portrætter og stillebener fra Fyn.",
  },
  en: {
    title: "Works",
    description:
      "Selected paintings and drawings by Oliver Lyster — oil, ink, and pencil in the tradition of classical realism. Landscapes, portraits, and still lifes from Funen, Denmark.",
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
    path: "/works",
    title: worksCopy[L].title,
    description: worksCopy[L].description,
  });
}

function GridCollection({
  items,
  label,
  anchor,
  locale: L,
}: {
  items: Artwork[];
  label: string;
  anchor: string;
  locale: Locale;
}) {
  if (items.length === 0) return null;
  return (
    <section id={anchor} className="mb-32 scroll-mt-24 md:mb-40">
      <Rise
        as="div"
        variant="drawline"
        className="mb-12 flex items-baseline justify-between pb-4 md:mb-16"
      >
        <h2 className="smallcaps text-xl md:text-2xl lg:text-3xl">— {label}</h2>
        <span className="smallcaps text-xs text-graphite md:text-sm">
          {items.length}
        </span>
      </Rise>

      <ol className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
        {items.map((a) => {
          const dims = dimsOf(a);
          return (
            <Rise key={a.slug} as="li" variant="curtain" delay={60}>
              <Link href={`/${L}/works/${a.slug}`} className="group paper-flutter block">
                <figure>
                  <div className="relative overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.title[L]}
                      width={dims.w}
                      height={dims.h}
                      sizes="(min-width: 768px) 30vw, 50vw"
                      className="h-auto w-full transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.6,0.1,1)] group-hover:scale-[1.01]"
                    />
                  </div>
                  <figcaption className="mt-3 flex flex-col gap-1 md:mt-4">
                    <span className="flex items-baseline gap-3">
                      <span className="smallcaps text-[0.65rem] text-graphite">
                        № {String(a.number).padStart(2, "0")}
                      </span>
                      <span className="font-serif italic soft-morph text-base md:text-lg">
                        {a.title[L]}
                      </span>
                    </span>
                    <span className="smallcaps text-[0.65rem] text-graphite md:text-[0.7rem]">
                      {a.medium[L]} · {a.year ?? "—"}
                    </span>
                  </figcaption>
                </figure>
              </Link>
            </Rise>
          );
        })}
      </ol>
    </section>
  );
}

export default async function Works({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const L = locale as Locale;
  const d = t(L);

  const jsonLd = collectionPageSchema({
    locale: L,
    path: "/works",
    name: worksCopy[L].title,
    description: worksCopy[L].description,
    artworks,
  });

  return (
    <div className="mx-auto max-w-[1400px] px-6 pt-16 md:px-12 md:pt-24">
      <JsonLd data={jsonLd} />
      <Rise
        as="header"
        variant="drawline"
        className="mb-16 grid grid-cols-12 gap-6 pb-10 md:mb-24 md:gap-8"
      >
        <h1 className="display-serif col-span-12 text-5xl md:col-span-7 md:text-7xl">
          <Rise as="span" variant="blur-rise" delay={80} className="block">
            {d.works.title}
          </Rise>
        </h1>
        <p className="body-serif col-span-12 text-base text-ink-soft md:col-span-4 md:col-start-9 md:self-end md:text-lg">
          {d.works.intro}
        </p>
      </Rise>

      {/* Jump nav */}
      <Rise
        as="nav"
        className="mb-24 flex flex-wrap items-baseline gap-x-8 gap-y-4 md:mb-32"
        delay={200}
      >
        <div className="flex items-baseline gap-8 md:gap-12">
          <Link
            href={`#paintings`}
            className="smallcaps text-sm link-underline md:text-base"
            data-active="true"
          >
            {d.works.paintings}
            <span className="ml-2 text-graphite">({paintings.length})</span>
          </Link>
          <Link
            href={`#drawings`}
            className="smallcaps text-sm link-underline md:text-base"
            data-active="true"
          >
            {d.works.drawings}
            <span className="ml-2 text-graphite">({drawings.length})</span>
          </Link>
        </div>
      </Rise>

      <GridCollection
        items={paintings}
        label={d.works.paintings}
        anchor="paintings"
        locale={L}
      />
      <GridCollection
        items={drawings}
        label={d.works.drawings}
        anchor="drawings"
        locale={L}
      />

      <BackToTop label={d.works.top} />
    </div>
  );
}
