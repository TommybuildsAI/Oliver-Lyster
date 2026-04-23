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

  return (
    <section className="relative pb-24 md:pb-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6 px-6 pt-8 md:items-center md:gap-x-10 md:px-12 md:pt-16">
        {/* Text column — lead + CTAs (title removed per artist's request) */}
        <div className="col-span-12 order-1 md:col-span-5 lg:col-span-4">
          <Rise
            as="p"
            delay={200}
            className="body-serif text-base md:pr-2 md:text-lg"
          >
            {d.home.lead}
          </Rise>

          <Rise
            as="div"
            delay={400}
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

      <Rise
        as="div"
        delay={500}
        className="mt-20 flex justify-center px-6 md:mt-28 md:px-12"
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
