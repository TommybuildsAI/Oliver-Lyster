import { NextRequest, NextResponse } from "next/server";

const locales = ["da", "en"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "da";
const COOKIE = "NEXT_LOCALE";

function detectLocale(req: NextRequest): Locale {
  const cookie = req.cookies.get(COOKIE)?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) {
    return cookie as Locale;
  }

  const header = req.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return {
        tag: (tag || "").toLowerCase().split("-")[0],
        q: q ? parseFloat(q) : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const r of ranked) {
    if ((locales as readonly string[]).includes(r.tag)) return r.tag as Locale;
  }
  return defaultLocale;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    const locale = detectLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    const redirect = NextResponse.redirect(url);
    redirect.cookies.set(COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return redirect;
  }

  const match = pathname.match(/^\/(da|en)(?:\/|$)/);
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);
  const res = NextResponse.next({ request: { headers: requestHeaders } });
  if (match) {
    res.cookies.set(COOKIE, match[1], {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|favicon|.*\\..*).*)"],
};
