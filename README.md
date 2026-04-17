# Oliver Lyster — website

Next.js 16 · Tailwind v4 · Fraunces (next/font)

## Setup

```bash
cd site
npm install
cp .env.example .env.local
npm run dev       # http://localhost:3000 → redirects to /da
```

## Environment variables

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (`G-XXXXXXXXXX`). If unset, GA is skipped. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console meta tag token. Optional. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Artist's email for contact form + Contact page. |

## Structure

- `app/[locale]/` — DA/EN routing. `/` redirects to `/da` or `/en` based on Accept-Language.
- `lib/artworks.ts` — source of truth for artworks (fill in `dimensions` and remaining `year` when received).
- `lib/i18n.ts` — string dictionary and About paragraphs.
- `public/art/` — artwork images, `01-…` through `10-…`.
- `components/` — Header, Footer, LanguageToggle, Rise (scroll-in), ContactForm, Analytics.
- `proxy.ts` — browser language detection + NEXT_LOCALE cookie.

## Adding or updating a work

1. Drop the image in `public/art/` using the `NN-slug.jpg` naming pattern.
2. Add / update its entry in `lib/artworks.ts`.
3. The Works page, detail page, sitemap, and home grid update automatically.

## Deployment

Vercel. Point `oliverlyster.com` at the project; set env vars in the Vercel dashboard.
