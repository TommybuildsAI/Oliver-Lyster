import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Rise } from "@/components/Rise";
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

  const hero = artworks.find((a) => a.slug === "storm-coming")!;
  const selected = [
    artworks.find((a) => a.slug === "twisted-willow")!,
    artworks.find((a) => a.slug === "filip")!,
    artworks.find((a) => a.slug === "midnight-with-trees")!,
    artworks.find((a) => a.slug === "memories-of-autumn")!,
  ];

  return (
    <>
      {/* HERO — one painting, the artist's name, no CTA clutter */}
      <section className="relative">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6 px-6 pt-8 md:gap-x-8 md:px-12 md:pt-16">
          <Rise
            as="p"
            className="col-span-12 order-1 smallcaps text-[0.7rem] text-graphite md:col-span-4 md:pt-4"
          >
            b. 1998 · Funen, Denmark
          </Rise>

          <Rise
            as="h1"
            className="display-serif col-span-12 order-3 mt-8 text-5xl leading-[0.95] md:order-2 md:col-span-8 md:mt-0 md:text-[7rem] md:leading-[0.92] lg:text-[9rem]"
            delay={100}
          >
            Oliver
            <br />
            <span className="italic" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>
              Lyster
            </span>
          </Rise>

          <div className="col-span-12 order-2 mt-6 md:order-3 md:col-span-4 md:mt-0 md:col-start-1 md:row-start-2">
            <Rise as="p" delay={300} className="body-serif mt-6 text-base md:mt-8 md:text-lg md:pr-6">
              {d.home.lead}
            </Rise>
            <Rise as="div" delay={500} className="mt-10 flex flex-col gap-3 md:mt-16">
              <Link
                href={`/${L}/works`}
                className="smallcaps text-xs link-underline self-start"
                data-active="true"
              >
                — {d.home.viewWorks}
              </Link>
              <Link
                href={`/${L}/about`}
                className="smallcaps text-xs link-underline self-start text-graphite"
              >
                — {d.home.readAbout}
              </Link>
            </Rise>
          </div>

          <Rise
            as="figure"
            delay={200}
            className="col-span-12 order-4 mt-12 md:col-span-8 md:col-start-5 md:row-start-2 md:mt-8"
          >
            <div className="relative w-full overflow-hidden">
              <Image
                src={hero.image}
                alt={hero.title[L]}
                width={1600}
                height={1200}
                priority
                sizes="(min-width: 768px) 66vw, 100vw"
                className="h-auto w-full"
              />
            </div>
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
          <Rise as="div" className="mb-16 flex items-baseline justify-between border-b border-rule pb-4 md:mb-24">
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
                        <h3 className="display-serif text-3xl italic md:text-4xl">
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
