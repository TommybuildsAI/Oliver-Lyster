import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics, SearchConsoleVerification } from "@/components/Analytics";
import { CookieBanner } from "@/components/CookieBanner";
import { ScrollProgress } from "@/components/ScrollProgress";
import { JsonLd } from "@/components/JsonLd";
import { HtmlLangSync } from "@/components/HtmlLangSync";
import { locales, t, type Locale } from "@/lib/i18n";
import { personSchema, websiteSchema } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const L = locale as Locale;
  const d = t(L);

  return (
    <>
      <SearchConsoleVerification />
      <ScrollProgress />
      <HtmlLangSync locale={L} />
      <JsonLd data={[personSchema(), websiteSchema()]} />
      <div className="flex min-h-screen flex-col">
        <Header locale={L} />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer locale={L} />
      </div>
      <Analytics />
      <CookieBanner locale={L} copy={d.cookieBanner} />
    </>
  );
}
