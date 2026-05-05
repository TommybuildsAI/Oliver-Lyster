"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import { InstagramIcon } from "./InstagramIcon";
import { EmailIcon } from "./EmailIcon";

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "oliverdaniel.info@gmail.com";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "";
  const stripped = pathname.replace(/^\/(da|en)/, "") || "/";

  const nav = [
    { href: `/${locale}/works`, labelDa: "Værker", labelEn: "Works", match: "/works" },
    { href: `/${locale}/about`, labelDa: "Om", labelEn: "About", match: "/about" },
    { href: `/${locale}/exhibitions`, labelDa: "Udstillinger", labelEn: "Exhibitions", match: "/exhibitions" },
    { href: `/${locale}/press`, labelDa: "Presse", labelEn: "Press", match: "/press" },
    { href: `/${locale}/contact`, labelDa: "Kontakt", labelEn: "Contact", match: "/contact" },
  ];

  return (
    <header className="relative z-20 mx-auto grid max-w-[1400px] grid-cols-[1fr_auto] items-center gap-y-3 px-6 pt-8 pb-6 md:grid-cols-3 md:px-12 md:pt-10">
      <Link
        href={`/${locale}`}
        className="relative z-0 col-start-1 flex w-fit max-w-full items-center gap-3 hover:opacity-70 transition-opacity md:gap-4"
      >
        <Image
          src="/logo-portrait.png"
          alt=""
          width={229}
          height={256}
          priority
          sizes="56px"
          className="h-12 w-auto md:h-14 lg:h-16"
        />
        <span
          className="display-serif text-[1.4rem] tracking-tight sm:text-[1.7rem] md:text-[1.8rem] lg:text-[2.3rem]"
          style={{ fontVariationSettings: '"opsz" 48' }}
        >
          Oliver Lyster
        </span>
      </Link>

      <ul className="relative z-10 col-span-2 row-start-2 flex flex-wrap items-center gap-x-5 gap-y-2 md:col-span-1 md:col-start-2 md:row-start-1 md:flex-nowrap md:justify-center md:gap-x-7 lg:gap-x-10">
        {nav.map((item) => {
          const active = stripped.startsWith(item.match);
          const label = locale === "da" ? item.labelDa : item.labelEn;
          return (
            <li key={item.href} className="md:shrink-0">
              <Link
                href={item.href}
                className="smallcaps text-base link-underline md:text-lg lg:text-xl"
                data-active={active || undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="col-start-2 row-start-1 flex items-center gap-4 justify-self-end md:col-start-3 md:gap-5">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          aria-label="Email"
          className="text-ink transition-opacity hover:opacity-70"
        >
          <EmailIcon className="h-5 w-5 md:h-6 md:w-6" />
        </a>
        <a
          href="https://www.instagram.com/oliverlyster/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="text-ink transition-opacity hover:opacity-70"
        >
          <InstagramIcon className="h-5 w-5 md:h-6 md:w-6" />
        </a>
        <LanguageToggle locale={locale} stripped={stripped} />
      </div>
    </header>
  );
}
