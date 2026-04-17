import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Rise } from "@/components/Rise";
import { ContactForm } from "@/components/ContactForm";
import { locales, t, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: t(locale as Locale).contact.title };
}

export default async function Contact({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ subject?: string }>;
}) {
  const { locale } = await params;
  const { subject } = await searchParams;
  if (!locales.includes(locale as Locale)) notFound();
  const L = locale as Locale;
  const d = t(L);

  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@oliverlyster.com";

  return (
    <div className="mx-auto max-w-[1400px] px-6 pt-16 md:px-12 md:pt-24">
      <div className="grid grid-cols-12 gap-8 md:gap-12">
        <Rise
          as="header"
          className="col-span-12 border-b border-rule pb-10 md:col-span-10 md:col-start-2 md:pb-16"
        >
          <p className="smallcaps text-[0.7rem] text-graphite">— {d.contact.title}</p>
          <h1 className="display-serif mt-6 text-5xl leading-[0.95] md:mt-10 md:text-7xl">
            {d.contact.title}
          </h1>
        </Rise>

        <Rise
          as="section"
          className="col-span-12 md:col-span-4 md:col-start-2"
        >
          <p className="body-serif text-base text-ink-soft md:text-lg">
            {d.contact.intro}
          </p>

          <div className="mt-12 flex flex-col gap-5 border-t border-rule pt-6">
            <div>
              <p className="smallcaps text-[0.65rem] text-graphite">
                {d.contact.preferEmail}
              </p>
              <a
                href={`mailto:${email}`}
                className="mt-2 font-serif italic text-lg link-underline"
                data-active="true"
              >
                {email}
              </a>
            </div>
            <div>
              <p className="smallcaps text-[0.65rem] text-graphite">Instagram</p>
              <a
                href="https://www.instagram.com/oliverlyster/"
                target="_blank"
                rel="noreferrer"
                className="mt-2 font-serif italic text-lg link-underline"
                data-active="true"
              >
                @oliverlyster
              </a>
            </div>
          </div>
        </Rise>

        <Rise
          as="section"
          delay={150}
          className="col-span-12 md:col-span-6 md:col-start-7"
        >
          <ContactForm locale={L} initialSubject={subject ?? ""} />
        </Rise>
      </div>
    </div>
  );
}
