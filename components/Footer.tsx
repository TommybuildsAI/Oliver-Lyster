import Link from "next/link";
import { InstagramIcon } from "@/components/InstagramIcon";
import { type Locale, t } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const d = t(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-rule">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
        <p className="smallcaps text-sm text-graphite md:text-base">
          {d.footer.rights} · {year} · CVR 45784533
        </p>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <a
            href="https://www.instagram.com/oliverlyster/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-ink transition-opacity hover:opacity-70"
          >
            <InstagramIcon className="h-7 w-7 md:h-8 md:w-8" />
          </a>
          <Link
            href={`/${locale}/contact`}
            className="smallcaps text-sm link-underline md:text-base"
          >
            {d.nav.contact}
          </Link>
          <Link
            href={`/${locale}/privacy`}
            className="smallcaps text-sm link-underline md:text-base"
          >
            {d.footer.privacy}
          </Link>
          <Link
            href={`/${locale}/cookies`}
            className="smallcaps text-sm link-underline md:text-base"
          >
            {d.footer.cookies}
          </Link>
          <a
            href="https://riverai.dk"
            target="_blank"
            rel="noopener"
            className="smallcaps text-sm link-underline text-graphite md:text-base"
          >
            {d.footer.site}
          </a>
        </div>
      </div>
    </footer>
  );
}
