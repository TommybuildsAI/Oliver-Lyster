import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Rise } from "@/components/Rise";
import { locales, t, aboutText, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: t(locale as Locale).about.title };
}

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const L = locale as Locale;
  const d = t(L);
  const paras = aboutText[L];

  return (
    <div className="mx-auto max-w-[1400px] px-6 pt-16 md:px-12 md:pt-24">
      <div className="grid grid-cols-12 gap-8 md:gap-12">
        <Rise
          as="header"
          variant="drawline"
          className="col-span-12 pb-10 md:col-span-10 md:col-start-2 md:pb-16"
        >
          <p className="smallcaps text-[0.7rem] text-graphite">
            — {d.about.title}
          </p>
          <h1 className="display-serif mt-6 text-5xl leading-[0.95] md:mt-10 md:text-7xl lg:text-8xl">
            <Rise as="span" variant="blur-rise" delay={80} className="block">
              Oliver
            </Rise>
            <Rise as="span" variant="blur-rise" delay={260} className="block italic">
              <span style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>
                Lyster
              </span>
            </Rise>
          </h1>
        </Rise>

        <Rise
          as="figure"
          variant="curtain"
          delay={150}
          className="col-span-12 md:col-span-5 md:col-start-2"
        >
          <div className="relative overflow-hidden">
            <Image
              src="/art/02-autoportrait-with-hat.jpg"
              alt="Autoportrait with hat — oil on linen, 2024"
              width={1200}
              height={1500}
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-4 smallcaps text-[0.7rem] text-graphite">
            {L === "da"
              ? "Selvportræt med hat · Olie på lærred · 2024"
              : "Autoportrait with Hat · Oil on linen · 2024"}
          </figcaption>
        </Rise>

        <Rise
          as="section"
          delay={300}
          className="col-span-12 md:col-span-5 md:col-start-8"
        >
          <div className="body-serif flex flex-col gap-6 text-base md:text-lg">
            {paras.map((p, i) => (
              <p key={i} className={i === 0 ? "text-ink" : "text-ink-soft"}>
                {p}
              </p>
            ))}
          </div>

          <div className="mt-12 border-t border-rule pt-6">
            <a
              href="https://www.instagram.com/oliverlyster/"
              target="_blank"
              rel="noreferrer"
              className="smallcaps text-xs link-underline"
              data-active="true"
            >
              — {d.about.instagram} ↗
            </a>
          </div>
        </Rise>
      </div>
    </div>
  );
}
