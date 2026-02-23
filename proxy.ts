import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const normalize = (url: string) => url.replace(/\/+$/, "");

const parseRoutes = (cookie?: string): string[] => {
  if (!cookie) return [];
  try {
    return JSON.parse(decodeURIComponent(cookie));
  } catch {
    return [];
  }
};

const parseExpiry = (value?: string): number | null => {
  if (!value) return null;
  const n = Number(value);
  return isNaN(n) ? null : n;
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internals & static
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico)$/)
  ) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get("auth_token")?.value;
  const expiry = request.cookies.get("auth_expiry")?.value;
  const routesCookie = request.cookies.get("user_routes")?.value;

  const now = Date.now();
  const expiryNumber = parseExpiry(expiry);

  // Login status
  const isLoggedIn = !!authToken && !!expiryNumber && expiryNumber > now;

  // Handle expired session
  if (expiryNumber && expiryNumber <= now) {
    const res = NextResponse.redirect(new URL("/signin", request.url));
    res.cookies.delete("auth_token");
    res.cookies.delete("auth_expiry");
    res.cookies.delete("user_routes");
    return res;
  }

  const normalizedPath = normalize(pathname);

  // Signin page behavior
  if (normalizedPath === "/signin") {
    if (isLoggedIn) {
      const allowedRoutes = parseRoutes(routesCookie);
      const firstRoute = allowedRoutes.length > 0 ? allowedRoutes[0] : "/dashboard";

      return NextResponse.redirect(new URL(firstRoute, request.url));
    }

    return NextResponse.next();
  }

  // Public route
  if (normalizedPath === "/forbidden") {
    return NextResponse.next();
  }

  // Not logged in → redirect
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If routes cookie not ready → allow (prevent flick)
  if (!routesCookie) {
    return NextResponse.next();
  }

  // RBAC check
  const allowedRoutes = parseRoutes(routesCookie);
  const hasAccess = allowedRoutes.some((route) => {
    const normalizedRoute = normalize(route);
    return (
      normalizedPath === normalizedRoute ||
      normalizedPath.startsWith(normalizedRoute + "/")
    );
  });

  if (!hasAccess) {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  return NextResponse.next();
}