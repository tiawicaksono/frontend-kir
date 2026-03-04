import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
