"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { ARTIST_INSTAGRAM } from "@/lib/seo";

// Latest-from-Instagram strip, fed by a Behold.so JSON feed. We render
// plain <img> tags from Behold's CDN and link out to the posts — no Meta
// embed script, no cookies, so it stays outside the consent banner's
// scope. Renders nothing until BEHOLD_FEED_URL is filled in (create the
// feed at behold.so with Oliver's account, paste the JSON feed URL).
const BEHOLD_FEED_URL = "";

const POST_COUNT = 4;

const copy = {
  da: { heading: "Følg arbejdet", link: "@oliverlyster på Instagram" },
  en: { heading: "Follow the work", link: "@oliverlyster on Instagram" },
} as const;

type BeholdPost = {
  id?: string;
  permalink?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  mediaType?: string;
  caption?: string;
  sizes?: { medium?: { mediaUrl?: string }; small?: { mediaUrl?: string } };
};

export function InstagramStrip({ locale }: { locale: Locale }) {
  const [posts, setPosts] = useState<BeholdPost[]>([]);

  useEffect(() => {
    if (!BEHOLD_FEED_URL) return;
    let cancelled = false;
    fetch(BEHOLD_FEED_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => {
        if (cancelled) return;
        const list: BeholdPost[] = Array.isArray(json) ? json : (json.posts ?? []);
        setPosts(list.slice(0, POST_COUNT));
      })
      .catch(() => {
        // Feed unreachable — the strip simply doesn't render.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (posts.length === 0) return null;

  const c = copy[locale];

  return (
    <section className="mt-24 md:mt-32">
      <div className="mb-8 flex items-baseline justify-between border-t border-rule pt-6 md:mb-10">
        <h2 className="smallcaps text-sm md:text-base">— {c.heading}</h2>
        <a
          href={ARTIST_INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="smallcaps text-xs text-graphite link-underline md:text-sm"
        >
          {c.link}
        </a>
      </div>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {posts.map((p, i) => {
          const src =
            p.sizes?.medium?.mediaUrl ??
            (p.mediaType === "VIDEO" ? p.thumbnailUrl : p.mediaUrl) ??
            p.mediaUrl;
          if (!src) return null;
          return (
            <li key={p.id ?? i}>
              <a
                href={p.permalink ?? ARTIST_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="paper-flutter block overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={p.caption ?? "Instagram"}
                  loading="lazy"
                  className="aspect-square h-auto w-full object-cover"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
