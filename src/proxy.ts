import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase/config";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from "@/i18n/config";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return admin(request);
  return locale(request);
}

/**
 * The public site lives in app/[lang]. English keeps unprefixed URLs, so those are
 * rewritten to /en/...; /en/... redirects back to the unprefixed address, so each
 * page has exactly one URL per language. A visitor who picked another language in
 * the switcher (a cookie) is sent to that language when they arrive unprefixed.
 */
function locale(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (isLocale(first)) return NextResponse.next();

  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(chosen) && chosen !== DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? `/${chosen}` : `/${chosen}${pathname}`;
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

/**
 * Keeps admin sessions fresh and sends signed-out visitors to the login page.
 * This is only a fast first check — every admin page and action verifies the
 * user again on the server.
 */
async function admin(request: NextRequest) {
  let response = NextResponse.next({ request });
  if (!isSupabaseConfigured()) return response;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers ?? {}).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const isLogin = request.nextUrl.pathname === "/admin/login";
  if (!data?.claims && !isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return response;
}

export const config = {
  // Everything except Next's internals, the API, and files with an extension
  // (sitemap.xml, robots.txt, icons, /assets/...).
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
};
