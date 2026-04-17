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
    "smallcaps text-[0.75rem] tracking-[0.2em] transition-colors md:text-[0.85rem] lg:text-[0.9rem]";
  const active = "text-ink";
  const inactive = "text-graphite/60 hover:text-ink";

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
        className="mx-2 h-2 w-px bg-rule"
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
