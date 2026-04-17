import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Rise } from "@/components/Rise";
import { press } from "@/lib/press";
import { locales, t, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: t(locale as Locale).press.title };
}

export default async function Press({
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
            {d.press.title}
          </Rise>
        </h1>
        <p className="body-serif col-span-12 text-base text-ink-soft md:col-span-4 md:col-start-9 md:self-end md:text-lg">
          {d.press.intro}
        </p>
      </Rise>

      <ol className="flex flex-col divide-y divide-rule/70 border-y border-rule/70">
        {press.map((item) => (
          <Rise key={item.slug} as="li" delay={60} className="py-12 md:py-16">
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-12 gap-6 md:gap-8"
            >
              {/* Preview image */}
              <figure className="col-span-12 overflow-hidden md:col-span-5">
                <Image
                  src={item.image}
                  alt={item.imageAlt[L]}
                  width={1200}
                  height={615}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="h-auto w-full transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.6,0.1,1)] group-hover:scale-[1.012]"
                />
              </figure>

              {/* Right side — publication, date, title, excerpt, CTA */}
              <div className="col-span-12 flex flex-col md:col-span-7 md:pl-2">
                <div className="flex items-baseline gap-4">
                  <span className="smallcaps text-[0.8rem] tracking-[0.22em] text-graphite md:text-[0.85rem]">
                    {item.publication}
                  </span>
                  <span aria-hidden="true" className="h-2 w-px bg-rule" />
                  <time
                    dateTime={item.dateIso}
                    className="smallcaps text-[0.7rem] text-graphite"
                  >
                    {item.date[L]}
                  </time>
                </div>

                <h2 className="display-serif mt-5 text-3xl italic leading-[1.05] md:mt-6 md:text-[2.5rem] lg:text-[3rem]">
                  {item.title[L]}
                </h2>

                <p className="body-serif mt-6 text-base text-ink-soft md:mt-8 md:text-lg md:pr-6">
                  “{item.excerpt[L]}”
                </p>

                <span
                  className="smallcaps mt-8 inline-block self-start text-xs link-underline md:text-sm"
                  data-active="true"
                >
                  — {d.press.readArticle} ↗
                </span>
              </div>
            </a>
          </Rise>
        ))}
      </ol>
    </div>
  );
}
