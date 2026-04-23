"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Link whose text reveals left-to-right via a soft-edged mask (as if a
 * pen were laying down the glyphs), and once the text finishes writing,
 * a hand-drawn SVG underline scribbles itself in beneath it.
 *
 * Structure: <Link> > <span.wrap> > <span.scribble-text> + <svg>
 * The SVG sits OUTSIDE the masked span so the mask doesn't hide it.
 */
export function ScribbleLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [underlined, setUnderlined] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setDrawn(true);
            // Underline starts just after the mask finishes sweeping.
            window.setTimeout(() => setUnderlined(true), 2900);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Link href={href} className={`inline-block ${className}`}>
      <span ref={ref} className="relative inline-block">
        <span
          className={`scribble-text inline-block pr-[0.25em] ${drawn ? "is-drawn" : ""}`}
        >
          {children}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 300 24"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -bottom-2 left-0 h-[0.45em] w-full md:-bottom-3"
        >
          <path
            d="M 4 12 C 30 6, 60 16, 96 10 S 160 18, 196 11 S 258 18, 296 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`scribble-path ${underlined ? "is-drawn" : ""}`}
          />
          <path
            d="M 8 14 C 36 9, 72 18, 108 12 S 172 19, 208 12 S 264 18, 292 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeOpacity="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`scribble-path-2 ${underlined ? "is-drawn" : ""}`}
          />
        </svg>
      </span>
    </Link>
  );
}
