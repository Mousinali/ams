import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("session")?.value;

  // 1. If trying to access login and already have a session, redirect to dashboard
  if (pathname === "/login" && session) {
    try {
      await decrypt(session);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch (e) {
      // Invalid session, allow login
    }
  }

  // 2. If trying to access protected routes without a session, redirect to login
  const isProtectedRoute = 
    pathname === "/" || 
    pathname.startsWith("/dashboard") || 
    pathname.startsWith("/assets") || 
    pathname.startsWith("/employees") || 
    pathname.startsWith("/assignments") || 
    pathname.startsWith("/categories") || 
    pathname.startsWith("/departments") || 
    pathname.startsWith("/designations") || 
    pathname.startsWith("/reports") || 
    pathname.startsWith("/settings");

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. If session exists but invalid, redirect to login for protected routes
  if (isProtectedRoute && session) {
    try {
      await decrypt(session);
    } catch (e) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
