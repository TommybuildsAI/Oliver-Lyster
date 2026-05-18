import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oliverlyster.com"),
  title: {
    default: "Oliver Lyster — Painter · Funen, Denmark",
    template: "%s — Oliver Lyster",
  },
  description:
    "Oliver Lyster is a classically trained oil painter based in Funen, Denmark. Landscapes, portraits, and still lifes in the tradition of the Old Masters.",
  applicationName: "Oliver Lyster",
  authors: [{ name: "Oliver Daniel Lyster" }],
  creator: "Oliver Daniel Lyster",
  publisher: "Oliver Lyster",
  category: "Art",
  icons: {
    icon: "/logo-portrait.png",
    apple: "/logo-portrait.png",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    siteName: "Oliver Lyster",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The html element has to live in the root layout, which has no access
  // to the URL locale without going dynamic. Defaulting to Danish (the
  // primary audience + defaultLocale). The locale-specific layout below
  // patches document.documentElement.lang at runtime via HtmlLangSync.
  return (
    <html
      lang="da"
      className={fraunces.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
