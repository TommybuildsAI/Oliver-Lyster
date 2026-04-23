"use client";

import { useEffect, useState } from "react";

export function BackToTop({
  label = "Top",
  threshold = 600,
}: {
  label?: string;
  threshold?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-10 right-10 z-30 smallcaps text-base md:text-lg lg:text-xl link-underline transition-opacity duration-500 ease-out ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      data-active="true"
    >
      ↑ {label}
    </button>
  );
}
