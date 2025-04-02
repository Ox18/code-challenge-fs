import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("token")?.value;

  if (path === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/calls", req.url));
    }

    return NextResponse.redirect(new URL("/meet", req.url));
  }

  if (!token && path.startsWith("/calls")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/calls/:path*"],
};
