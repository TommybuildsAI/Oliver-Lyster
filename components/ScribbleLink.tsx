"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Link with a hand-drawn ink underline that scribbles itself in
 * once the element scrolls into view. The path is intentionally
 * slightly irregular to feel pen-on-paper, not CSS-perfect.
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setDrawn(true);
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
    <Link href={href} className={`group relative inline-block ${className}`}>
      <span ref={ref} className="relative inline-block">
        {children}
        <svg
          aria-hidden="true"
          viewBox="0 0 300 24"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -bottom-3 left-0 h-[0.55em] w-full md:-bottom-4"
        >
          {/* Primary scribbled underline */}
          <path
            d="M 4 12 C 30 6, 60 16, 96 10 S 160 18, 196 11 S 258 18, 296 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`scribble-path ${drawn ? "is-drawn" : ""}`}
          />
          {/* Second faint pass — adds pen-on-paper weight */}
          <path
            d="M 8 14 C 36 9, 72 18, 108 12 S 172 19, 208 12 S 264 18, 292 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeOpacity="0.55"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`scribble-path-2 ${drawn ? "is-drawn" : ""}`}
          />
        </svg>
      </span>
    </Link>
  );
}
