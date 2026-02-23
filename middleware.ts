import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const normalize = (url: string) => url.replace(/\/+$/, "");

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip next internals & api
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

  let allowedRoutes: string[] = [];

  if (routesCookie) {
    try {
      allowedRoutes = JSON.parse(decodeURIComponent(routesCookie));
    } catch {
      allowedRoutes = [];
    }
  }

  const isLoggedIn =
    authToken === "true" &&
    expiry &&
    Number(expiry) > now;

  // ===============================
  // HANDLE EXPIRED
  // ===============================
  if (authToken && expiry && Number(expiry) <= now) {
    const res = NextResponse.redirect(
      new URL("/signin", request.url)
    );

    res.cookies.delete("auth_token");
    res.cookies.delete("auth_expiry");
    res.cookies.delete("user_routes");

    return res;
  }

  // ===============================
  // HANDLE SIGNIN
  // ===============================
  if (pathname === "/signin") {
    if (isLoggedIn) {
      const firstRoute =
        allowedRoutes.length > 0
          ? allowedRoutes[0]
          : "/dashboard";

      return NextResponse.redirect(
        new URL(firstRoute, request.url)
      );
    }

    return NextResponse.next();
  }

  // ===============================
  // PUBLIC ROUTE
  // ===============================
  if (pathname === "/forbidden") {
    return NextResponse.next();
  }

  // ===============================
  // NOT LOGGED IN
  // ===============================
  if (!isLoggedIn) {
    return NextResponse.redirect(
      new URL("/signin", request.url)
    );
  }

  // ===============================
  // RBAC CHECK
  // ===============================
  const current = normalize(pathname);

  const hasAccess = allowedRoutes.some((route) => {
    const normalizedRoute = normalize(route);
    return (
      current === normalizedRoute ||
      current.startsWith(normalizedRoute + "/")
    );
  });

  if (!hasAccess) {
    return NextResponse.redirect(
      new URL("/forbidden", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};