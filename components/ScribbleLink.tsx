"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Link whose text reveals itself left-to-right with a soft-edged mask,
 * as if a pen were writing each glyph. The edge of the reveal is a
 * gradient (not a hard line) to feel ink-on-paper, not a sliding curtain.
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
    <Link href={href} className={`inline-block ${className}`}>
      <span
        ref={ref}
        className={`scribble-text inline-block ${drawn ? "is-drawn" : ""}`}
      >
        {children}
      </span>
    </Link>
  );
}
