"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";

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
    <header className="relative z-20 bg-[#1F201F] text-paper">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto] items-baseline gap-y-3 px-6 pt-8 pb-6 md:grid-cols-3 md:px-12 md:pt-10">
        <Link
          href={`/${locale}`}
          className="relative z-0 col-start-1 w-fit max-w-full display-serif text-[1.7rem] tracking-tight hover:opacity-70 transition-opacity md:text-[1.8rem] lg:text-[2.3rem]"
          style={{ fontVariationSettings: '"opsz" 48', color: "var(--color-paper)" }}
        >
          Oliver Lyster
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

        <div className="col-start-2 row-start-1 justify-self-end md:col-start-3">
          <LanguageToggle locale={locale} stripped={stripped} />
        </div>
      </div>
    </header>
  );
}
