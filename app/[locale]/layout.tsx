import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics, SearchConsoleVerification } from "@/components/Analytics";
import { ScrollProgress } from "@/components/ScrollProgress";
import { locales, type Locale } from "@/lib/i18n";

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

  return (
    <>
      <SearchConsoleVerification />
      <ScrollProgress />
      <div className="flex min-h-screen flex-col">
        <Header locale={locale as Locale} />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer locale={locale as Locale} />
      </div>
      <Analytics />
    </>
  );
}
