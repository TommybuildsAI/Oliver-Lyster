"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A small hand-lettered signature that scribbles itself in after the
 * hero image finishes its curtain reveal. Uses the same mask-based
 * text reveal as ScribbleLink, plus a secondary SVG flourish underline.
 */
export function HeroSignature({ delay = 1500 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [flourished, setFlourished] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            window.setTimeout(() => setDrawn(true), delay);
            window.setTimeout(() => setFlourished(true), delay + 2400);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="mt-6 flex items-baseline gap-3 md:mt-8">
      <span className="relative inline-block">
        <span
          className={`scribble-text inline-block pr-[0.25em] font-serif italic text-lg md:text-xl lg:text-2xl ${drawn ? "is-drawn" : ""}`}
          style={{ fontVariationSettings: '"opsz" 72, "SOFT" 60' }}
        >
          Oliver Daniel Lyster
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 120 20"
          preserveAspectRatio="none"
          className="pointer-events-none absolute -bottom-1 left-0 h-[0.4em] w-full md:-bottom-2"
        >
          {/* A single, looping flourish — the kind Oliver adds under his monogram on paintings */}
          <path
            d="M 2 14 C 20 4, 48 20, 70 10 C 86 4, 96 16, 118 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeOpacity="0.75"
            strokeLinecap="round"
            className={`scribble-path ${flourished ? "is-drawn" : ""}`}
          />
        </svg>
      </span>
      <span
        aria-hidden="true"
        className={`smallcaps text-[0.7rem] text-graphite transition-opacity duration-700 md:text-xs ${
          flourished ? "opacity-100" : "opacity-0"
        }`}
      >
        · Fyn
      </span>
    </div>
  );
}
