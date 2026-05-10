import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const normalize = (url: string) => url.split("?")[0].replace(/\/+$/, "") || "/";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const clean = normalize(pathname);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const routesCookie = request.cookies.get("user_routes")?.value;

  const AUTH_PAGES = ["/signin", "/signup", "/reset-password"];
  const isAuthPage = AUTH_PAGES.includes(clean);
  const isForbidden = clean === "/forbidden";

  // 🔴 belum login
  if (!routesCookie) {
    if (isAuthPage) {
      return NextResponse.next();
    }

    const url = new URL("/signin", request.url);

    // hanya pathname asli
    url.searchParams.set("redirect", pathname);

    return NextResponse.redirect(url);
  }

  // 🟢 sudah login → cegah balik ke login
  if (routesCookie && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isForbidden) return NextResponse.next();

  // 🔐 RBAC
  let allowed: string[] = [];

  try {
    allowed = JSON.parse(decodeURIComponent(routesCookie));
  } catch {
    return NextResponse.next();
  }

  const isAllowed = allowed.some((route) => {
    const normalized = normalize(route);
    return clean === normalized || clean.startsWith(normalized + "/");
  });

  if (!isAllowed) {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
