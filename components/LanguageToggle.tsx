import Link from "next/link";
import { type Locale } from "@/lib/i18n";

export function LanguageToggle({
  locale,
  stripped,
}: {
  locale: Locale;
  stripped: string;
}) {
  const suffix = stripped === "/" ? "" : stripped;
  const base =
    "smallcaps text-[0.95rem] tracking-[0.2em] transition-colors md:text-[1.05rem] lg:text-[1.15rem]";
  const active = "text-paper";
  const inactive = "text-paper/55 hover:text-paper";

  return (
    <div
      className="inline-flex items-center gap-0"
      role="group"
      aria-label="Language"
    >
      <Link
        href={`/da${suffix}`}
        className={`${base} ${locale === "da" ? active : inactive}`}
        aria-current={locale === "da" ? "true" : undefined}
      >
        DA
      </Link>
      <span
        aria-hidden="true"
        className="mx-2 h-2 w-px bg-paper/40"
      />
      <Link
        href={`/en${suffix}`}
        className={`${base} ${locale === "en" ? active : inactive}`}
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </Link>
    </div>
  );
}
