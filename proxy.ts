import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminSessionCookieName, verifyAdminSession } from "@/lib/admin-session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    const isAuthenticated = await verifyAdminSession(request.cookies.get(adminSessionCookieName)?.value);
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  const isAuthenticated = await verifyAdminSession(request.cookies.get(adminSessionCookieName)?.value);
  if (isAuthenticated) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
