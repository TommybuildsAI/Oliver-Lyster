import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Rise } from "@/components/Rise";
import { HeroParallax } from "@/components/HeroParallax";
import { artworks } from "@/lib/artworks";
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
  const selected = [
    artworks.find((a) => a.slug === "storm-coming")!,
    artworks.find((a) => a.slug === "twisted-willow")!,
    artworks.find((a) => a.slug === "filip")!,
    artworks.find((a) => a.slug === "memories-of-autumn")!,
  ];

  return (
    <>
      {/* HERO — work first, artist's name as metadata alongside */}
      <section className="relative">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6 px-6 pt-8 md:items-center md:gap-x-10 md:px-12 md:pt-16">
          {/* Text column — title, metadata, lead, CTAs */}
          <div className="col-span-12 order-1 md:col-span-5 lg:col-span-4">
            <h1 className="display-serif text-5xl leading-[0.95] md:text-[3.75rem] md:leading-[0.95] lg:text-[5rem]">
              <Rise as="span" variant="blur-rise" delay={80} className="block">
                Oliver
              </Rise>
              <Rise as="span" variant="blur-rise" delay={260} className="block italic" >
                <span style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>
                  Lyster
                </span>
              </Rise>
            </h1>

            <Rise
              as="p"
              delay={200}
              className="mt-5 smallcaps text-[0.75rem] text-graphite md:mt-6 md:text-[0.9rem] lg:text-[0.95rem]"
            >
              b. 1998 · Funen, Denmark
            </Rise>

            <Rise
              as="p"
              delay={300}
              className="body-serif mt-8 text-base md:mt-10 md:pr-2 md:text-lg"
            >
              {d.home.lead}
            </Rise>

            <Rise
              as="div"
              delay={500}
              className="mt-10 flex flex-col gap-4 md:mt-12"
            >
              <Link
                href={`/${L}/works`}
                className="smallcaps text-sm link-underline self-start md:text-base lg:text-[1.05rem]"
                data-active="true"
              >
                — {d.home.viewWorks}
              </Link>
              <Link
                href={`/${L}/about`}
                className="smallcaps text-sm link-underline self-start text-graphite md:text-base lg:text-[1.05rem]"
              >
                — {d.home.readAbout}
              </Link>
            </Rise>
          </div>

          {/* Hero painting — dominant, breathing, parallax to cursor */}
          <Rise
            as="figure"
            variant="curtain"
            delay={200}
            className="col-span-12 order-2 mt-12 md:col-span-7 md:mt-0 lg:col-span-8"
          >
            <HeroParallax strength={6}>
              <div
                className="relative mx-auto w-full overflow-hidden md:max-w-[78%]"
              >
                <Image
                  src={hero.image}
                  alt={hero.title[L]}
                  width={1400}
                  height={
                    hero.orientation === "portrait"
                      ? 1800
                      : hero.orientation === "square"
                      ? 1400
                      : 1050
                  }
                  priority
                  sizes="(min-width: 1024px) 50vw, (min-width: 768px) 44vw, 100vw"
                  className="kenburns h-auto w-full"
                />
              </div>
            </HeroParallax>
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
              <span className="font-serif italic text-sm md:text-base">
                {hero.title[L]}
              </span>
              <span className="smallcaps text-[0.7rem] text-graphite">
                {hero.medium[L]} · {hero.year ?? "—"}
              </span>
            </figcaption>
          </Rise>
        </div>
      </section>

      {/* SELECTED WORKS — asymmetric, one-per-viewport feel */}
      <section className="mt-40 md:mt-56">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Rise
            as="div"
            variant="drawline"
            className="mb-16 flex items-baseline justify-between pb-4 md:mb-24"
          >
            <h2 className="smallcaps text-xs">— {d.home.selected}</h2>
            <Link
              href={`/${L}/works`}
              className="smallcaps text-[0.7rem] link-underline text-graphite"
            >
              {d.home.all}
            </Link>
          </Rise>

          <div className="flex flex-col gap-28 md:gap-48">
            {selected.map((a, i) => {
              const alignLeft = i % 2 === 0;
              return (
                <Rise key={a.slug} as="article" delay={80}>
                  <Link
                    href={`/${L}/works/${a.slug}`}
                    className="group block"
                  >
                    <div
                      className={`grid grid-cols-12 gap-6 md:gap-8 ${
                        alignLeft ? "" : "md:[direction:rtl]"
                      }`}
                    >
                      <figure
                        className={`col-span-12 md:col-span-7 ${
                          alignLeft ? "md:col-start-1" : "md:col-start-6"
                        } [direction:ltr]`}
                      >
                        <div className="relative overflow-hidden">
                          <Image
                            src={a.image}
                            alt={a.title[L]}
                            width={1600}
                            height={a.orientation === "portrait" ? 2000 : 1200}
                            sizes="(min-width: 768px) 58vw, 100vw"
                            className="h-auto w-full transition-[transform] duration-[1400ms] ease-[cubic-bezier(0.2,0.6,0.1,1)] group-hover:scale-[1.012]"
                          />
                        </div>
                      </figure>
                      <div
                        className={`col-span-12 flex flex-col justify-end gap-3 md:col-span-4 [direction:ltr] ${
                          alignLeft ? "md:col-start-9" : "md:col-start-2 md:row-start-1"
                        }`}
                      >
                        <span className="smallcaps text-[0.7rem] text-graphite">
                          № {String(a.number).padStart(2, "0")}
                        </span>
                        <h3 className="display-serif soft-morph text-3xl italic md:text-4xl">
                          {a.title[L]}
                        </h3>
                        <p className="smallcaps text-[0.7rem] text-graphite">
                          {a.medium[L]} · {a.year ?? "—"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Rise>
              );
            })}
          </div>

          <div className="mt-24 flex justify-center md:mt-32">
            <Link
              href={`/${L}/works`}
              className="smallcaps text-xs link-underline"
              data-active="true"
            >
              — {d.home.all}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
