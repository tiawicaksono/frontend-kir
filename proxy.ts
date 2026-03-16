import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const normalize = (url: string) => url.split("?")[0].replace(/\/+$/, "");

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const clean = normalize(pathname);

  // skip assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  const routesCookie = request.cookies.get("user_routes")?.value;

  const isAuthPage = clean === "/signin";
  const isForbidden = clean === "/forbidden";

  // 🔴 Belum login
  if (!routesCookie) {
    if (!isAuthPage) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.next();
  }

  // 🟢 Sudah login
  if (routesCookie && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isForbidden) {
    return NextResponse.next();
  }

  // RBAC check
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
