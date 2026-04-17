import Link from "next/link";
import { type Locale, t } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const d = t(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-rule">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-10 md:flex-row md:items-baseline md:justify-between md:px-12 md:py-12">
        <p className="smallcaps text-[0.7rem] text-graphite">
          {d.footer.rights} · {year}
        </p>

        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
          <a
            href="https://www.instagram.com/oliverlyster/"
            target="_blank"
            rel="noreferrer"
            className="smallcaps text-[0.7rem] link-underline"
          >
            Instagram
          </a>
          <Link
            href={`/${locale}/contact`}
            className="smallcaps text-[0.7rem] link-underline"
          >
            {d.nav.contact}
          </Link>
          <span className="smallcaps text-[0.7rem] text-graphite">
            {d.footer.site}
          </span>
        </div>
      </div>
    </footer>
  );
}
