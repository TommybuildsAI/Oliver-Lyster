import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Rise } from "@/components/Rise";
import { HeroParallax } from "@/components/HeroParallax";
import { ScribbleLink } from "@/components/ScribbleLink";
import { artworks } from "@/lib/artworks";
import { dimsFor } from "@/lib/art-dims";
import { locales, t, type Locale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const L = locale as Locale;
  const d = t(L);

  const hero = artworks.find((a) => a.slug === "contemplation")!;

  const teaserSlugs = [
    "storm-coming",
    "twisted-willow",
    "filip",
    "memories-of-autumn",
  ];
  const teasers = teaserSlugs
    .map((slug) => artworks.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <section className="relative pb-24 md:pb-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6 px-6 pt-8 md:items-center md:gap-x-10 md:px-12 md:pt-16">
        {/* Text column — lead + CTAs (title removed per artist's request) */}
        <div className="col-span-12 order-1 md:col-span-5 lg:col-span-4">
          <Rise
            as="p"
            delay={200}
            className="body-serif text-lg md:pr-2 md:text-xl lg:text-2xl"
          >
            {d.home.lead}
          </Rise>

          <Rise
            as="div"
            delay={400}
            className="mt-10 flex flex-col gap-5 md:mt-12"
          >
            <Link
              href={`/${L}/works`}
              className="smallcaps text-base link-underline self-start md:text-lg lg:text-xl"
              data-active="true"
            >
              — {d.home.viewWorks}
            </Link>
            <Link
              href={`/${L}/about`}
              className="smallcaps text-base link-underline self-start text-graphite md:text-lg lg:text-xl"
            >
              — {d.home.readAbout}
            </Link>
          </Rise>
        </div>

        {/* Hero painting — dominant, breathing, parallax to cursor */}
        <Rise
          as="figure"
          variant="curtain"
          delay={120}
          className="col-span-12 order-2 mt-12 md:col-span-7 md:mt-0 lg:col-span-8"
        >
          <HeroParallax strength={6}>
            <div className="relative mx-auto w-full overflow-hidden md:max-w-[78%]">
              <Image
                src={hero.image}
                alt={hero.title[L]}
                width={dimsFor(hero.image).w}
                height={dimsFor(hero.image).h}
                priority
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 44vw, 100vw"
                className="kenburns h-auto w-full"
              />
            </div>
          </HeroParallax>
        </Rise>
      </div>

      {/* Teaser works — asymmetric like the Works page */}
      <div className="mx-auto mt-28 max-w-[1400px] px-6 md:mt-40 md:px-12">
        <ol className="flex flex-col gap-24 md:gap-36">
          {teasers.map((a, i) => {
            const isWide = a.orientation !== "portrait";
            const offsetCols = i % 3;
            const dims = dimsFor(a.image);
            return (
              <Rise key={a.slug} as="li" variant="curtain" delay={60}>
                <Link
                  href={`/${L}/works/${a.slug}`}
                  className="group paper-flutter block"
                >
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
                          ? "md:col-span-6 md:col-start-3"
                          : offsetCols === 1
                          ? "md:col-span-7 md:col-start-5"
                          : "md:col-span-5 md:col-start-2"
                      }`}
                    >
                      <figure>
                        <div className="relative overflow-hidden">
                          <Image
                            src={a.image}
                            alt={a.title[L]}
                            width={dims.w}
                            height={dims.h}
                            sizes={
                              isWide
                                ? "(min-width: 768px) 75vw, 100vw"
                                : "(min-width: 768px) 45vw, 100vw"
                            }
                            className="h-auto w-full transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.6,0.1,1)] group-hover:scale-[1.01]"
                          />
                        </div>
                        <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-4 md:mt-6">
                          <span className="flex items-baseline gap-4">
                            <span className="smallcaps text-[0.7rem] text-graphite">
                              № {String(a.number).padStart(2, "0")}
                            </span>
                            <span className="font-serif italic soft-morph text-lg md:text-xl">
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

      {/* Alle værker CTA — placed below the teasers */}
      <Rise
        as="div"
        delay={200}
        className="mt-28 flex justify-center px-6 md:mt-40 md:px-12"
      >
        <ScribbleLink
          href={`/${L}/works`}
          className="display-serif text-2xl italic tracking-tight md:text-3xl lg:text-[2.4rem]"
        >
          {d.home.all}
        </ScribbleLink>
      </Rise>
    </section>
  );
}
