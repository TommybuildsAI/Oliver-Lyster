import Image from "next/image";
import { notFound } from "next/navigation";
import { Rise } from "@/components/Rise";
import { HeroParallax } from "@/components/HeroParallax";
import { artworks } from "@/lib/artworks";
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
    <section className="relative">
      <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-[1400px] items-center justify-center px-6 py-12 md:px-12 md:py-16">
        <Rise
          as="figure"
          variant="curtain"
          delay={120}
          className="w-full"
        >
          <HeroParallax strength={6}>
            <div className="relative mx-auto w-full max-w-[720px] overflow-hidden md:max-w-[640px]">
              <Image
                src={hero.image}
                alt={hero.title[L]}
                width={1400}
                height={1800}
                priority
                sizes="(min-width: 1024px) 640px, (min-width: 768px) 70vw, 90vw"
                className="kenburns h-auto w-full"
              />
            </div>
          </HeroParallax>
        </Rise>
      </div>
    </section>
  );
}
