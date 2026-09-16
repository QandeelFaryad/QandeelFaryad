import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Keeps admin sessions fresh and sends signed-out visitors to the login page.
 * This is only a fast first check — every admin page and action verifies the
 * user again on the server.
 */
export async function proxy(request: NextRequest) {
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
  matcher: ["/admin/:path*"],
};
