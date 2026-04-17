"use client";

import { useEffect, useRef } from "react";

type Variant = "rise" | "blur-rise" | "curtain" | "drawline";

export function Rise({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  variant = "rise",
}: {
  children?: React.ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  variant?: Variant;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight && rect.bottom > 0 && rect.height > 0;

    if (alreadyVisible) {
      const id = window.setTimeout(() => el.classList.add("in"), delay);
      return () => window.clearTimeout(id);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            window.setTimeout(() => el.classList.add("in"), delay);
            io.unobserve(el);
          }
        }
      },
      { rootMargin: "-8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref as React.Ref<HTMLElement>}
      className={`${variant} ${className}`}
    >
      {children}
    </Component>
  );
}
