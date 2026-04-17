import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oliverlyster.com"),
  title: {
    default: "Oliver Lyster — Painter",
    template: "%s — Oliver Lyster",
  },
  description:
    "Oliver Lyster is a traditionally trained oil painter based in the countryside of Funen, Denmark.",
  openGraph: {
    title: "Oliver Lyster — Painter",
    description:
      "Traditionally trained oil painter. Landscapes, portraits, still lifes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={fraunces.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
