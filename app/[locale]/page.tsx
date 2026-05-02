import Image from "next/image";
import { notFound } from "next/navigation";
import { Rise } from "@/components/Rise";
import { HeroParallax } from "@/components/HeroParallax";
import { HeroSignature } from "@/components/HeroSignature";
import { artworks } from "@/lib/artworks";
import { dimsFor } from "@/lib/art-dims";
import { locales, type Locale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const L = locale as Locale;

  const hero = artworks.find((a) => a.slug === "contemplation")!;

  return (
    <section className="relative pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-6 pt-8 md:px-12 md:pt-16">
        {/* Hero painting — standalone, breathing, parallax to cursor */}
        <Rise as="figure" variant="curtain" delay={120}>
          <HeroParallax strength={6}>
            <div className="relative mx-auto w-full overflow-hidden md:max-w-[52%]">
              <Image
                src={hero.image}
                alt={hero.title[L]}
                width={dimsFor(hero.image).w}
                height={dimsFor(hero.image).h}
                priority
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 60vw, 100vw"
                className="kenburns h-auto w-full"
              />
            </div>
          </HeroParallax>
          <div className="mx-auto md:max-w-[52%]">
            <HeroSignature delay={1600} />
          </div>
        </Rise>
      </div>
    </section>
  );
}
