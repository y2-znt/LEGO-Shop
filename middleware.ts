import { Role } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;
  const method = request.method;

  // Auth routes - Redirect to home if already logged in
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protected routes - Require authentication
  if (
    pathname.startsWith("/api/checkout") ||
    pathname.startsWith("/api/orders/me") ||
    pathname.startsWith("/orders")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Admin only routes
  if (pathname.startsWith("/api/users")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token.role !== Role.ADMIN) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Admin only routes for non-GET methods on /api/products
  if (pathname.startsWith("/api/products") && method !== "GET") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token.role !== Role.ADMIN) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/admin/:path*",
    "/api/users/:path*",
    "/api/products/:path*",
    "/api/checkout/:path*",
    "/api/orders/me/:path*",
    "/orders",
  ],
};
