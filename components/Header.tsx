import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";

export function Header({
  locale,
  pathname = "",
}: {
  locale: Locale;
  pathname?: string;
}) {
  const stripped = pathname.replace(/^\/(da|en)/, "") || "/";

  const nav = [
    { href: `/${locale}/works`, labelDa: "Værker", labelEn: "Works", match: "/works" },
    { href: `/${locale}/about`, labelDa: "Om", labelEn: "About", match: "/about" },
    { href: `/${locale}/contact`, labelDa: "Kontakt", labelEn: "Contact", match: "/contact" },
  ];

  return (
    <header className="relative z-20 mx-auto grid max-w-[1400px] grid-cols-[1fr_auto] items-baseline gap-y-3 px-6 pt-8 pb-6 md:grid-cols-3 md:px-12 md:pt-10">
      <Link
        href={`/${locale}`}
        className="col-start-1 text-xl tracking-tight hover:opacity-70 transition-opacity md:text-2xl lg:text-[1.6rem]"
        style={{ fontVariationSettings: '"opsz" 48' }}
      >
        Oliver Lyster
      </Link>

      <ul className="col-span-2 row-start-2 flex flex-wrap items-center gap-x-6 gap-y-2 md:col-span-1 md:col-start-2 md:row-start-1 md:justify-center md:gap-10 lg:gap-14">
        {nav.map((item) => {
          const active = stripped.startsWith(item.match);
          const label = locale === "da" ? item.labelDa : item.labelEn;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="smallcaps text-sm link-underline md:text-base lg:text-[1.1rem]"
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
    </header>
  );
}
