import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Rise } from "@/components/Rise";
import { InstagramIcon } from "@/components/InstagramIcon";
import { locales, t, aboutText, type Locale } from "@/lib/i18n";
import { pageMetadata, SITE_URL } from "@/lib/seo";

const aboutMeta = {
  da: {
    title: "Om kunstneren",
    description:
      "Om Oliver Lyster (f. 1998, Helsingør) — klassisk skolet oliemaler bosat på Fyn. Uddannet ved Swedish Academy of Realist Art og hos den amerikanske maler Charles Weed.",
  },
  en: {
    title: "About the artist",
    description:
      "About Oliver Lyster (b. 1998, Helsingør) — classically trained oil painter based in Funen, Denmark. Studied at the Swedish Academy of Realist Art and under American painter Charles Weed.",
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
    path: "/about",
    title: aboutMeta[L].title,
    description: aboutMeta[L].description,
    ogType: "profile",
    ogImage: `${SITE_URL}/art/02-autoportrait-with-hat.jpg`,
    ogImageAlt:
      L === "da"
        ? "Oliver Lyster — Selvportræt med hat, olie på lærred"
        : "Oliver Lyster — Autoportrait with Hat, oil on linen",
  });
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

          <div className="mt-12 border-t border-rule pt-8">
            <a
              href="https://www.instagram.com/oliverlyster/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-4"
            >
              <InstagramIcon className="h-9 w-9 text-ink transition-opacity group-hover:opacity-70 md:h-11 md:w-11 lg:h-12 lg:w-12" />
              <span
                className="smallcaps text-base link-underline md:text-lg lg:text-xl"
                data-active="true"
              >
                {d.about.instagram}
              </span>
            </a>
          </div>
        </Rise>
      </div>
    </div>
  );
}
