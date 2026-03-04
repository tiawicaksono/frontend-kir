import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const normalize = (url: string) => url.split("?")[0].replace(/\/+$/, "");

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const clean = normalize(pathname);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // session check only
  const session = request.cookies.get("laravel-session")?.value;

  // 🚫 Belum login → redirect ke signin
  if (!session && pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // ✅ Sudah login → jangan boleh ke signin lagi
  if (session && pathname === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ⚠️ jangan pernah RBAC check signin & forbidden
  if (clean === "/signin" || clean === "/forbidden") {
    return NextResponse.next();
  }

  // ambil routes
  const routesCookie = request.cookies.get("user_routes")?.value;

  // kalau belum ada cookie routes → skip RBAC
  if (!routesCookie) {
    return NextResponse.next();
  }

  let allowed: string[] = [];

  try {
    allowed = JSON.parse(decodeURIComponent(routesCookie));
  } catch {
    return NextResponse.next();
  }

  if (!allowed.includes(clean)) {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
