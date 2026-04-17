import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Rise } from "@/components/Rise";
import { artworks } from "@/lib/artworks";
import { locales, t, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const L = locale as Locale;
  return { title: t(L).works.title };
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

  return (
    <div className="mx-auto max-w-[1400px] px-6 pt-16 md:px-12 md:pt-24">
      <Rise as="header" className="mb-20 grid grid-cols-12 gap-6 border-b border-rule pb-10 md:mb-32 md:gap-8">
        <h1 className="display-serif col-span-12 text-5xl md:col-span-7 md:text-7xl">
          {d.works.title}
        </h1>
        <p className="body-serif col-span-12 text-base text-ink-soft md:col-span-4 md:col-start-9 md:self-end md:text-lg">
          {d.works.intro}
        </p>
      </Rise>

      <ol className="flex flex-col gap-32 md:gap-48">
        {artworks.map((a, i) => {
          const isWide = a.orientation !== "portrait";
          const offsetCols = i % 3;
          return (
            <Rise key={a.slug} as="li" delay={60}>
              <Link href={`/${L}/works/${a.slug}`} className="group block">
                <div className="grid grid-cols-12 gap-4 md:gap-8">
                  <div
                    className={`col-span-12 ${
                      isWide
                        ? offsetCols === 0
                          ? "md:col-span-10 md:col-start-2"
                          : offsetCols === 1
                          ? "md:col-span-9 md:col-start-1"
                          : "md:col-span-8 md:col-start-4"
                        : offsetCols === 0
                        ? "md:col-span-5 md:col-start-3"
                        : offsetCols === 1
                        ? "md:col-span-6 md:col-start-6"
                        : "md:col-span-4 md:col-start-2"
                    }`}
                  >
                    <figure>
                      <div className="relative overflow-hidden">
                        <Image
                          src={a.image}
                          alt={a.title[L]}
                          width={1600}
                          height={
                            a.orientation === "portrait"
                              ? 2000
                              : a.orientation === "square"
                              ? 1600
                              : 1200
                          }
                          sizes={
                            isWide
                              ? "(min-width: 768px) 75vw, 100vw"
                              : "(min-width: 768px) 40vw, 100vw"
                          }
                          className="h-auto w-full transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.6,0.1,1)] group-hover:scale-[1.01]"
                        />
                      </div>
                      <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-4 md:mt-6">
                        <span className="flex items-baseline gap-4">
                          <span className="smallcaps text-[0.7rem] text-graphite">
                            № {String(a.number).padStart(2, "0")}
                          </span>
                          <span className="font-serif italic text-lg md:text-xl">
                            {a.title[L]}
                          </span>
                        </span>
                        <span className="smallcaps text-[0.7rem] text-graphite">
                          {a.medium[L]} · {a.year ?? "—"}
                        </span>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </Link>
            </Rise>
          );
        })}
      </ol>
    </div>
  );
}
