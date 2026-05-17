import { NextResponse, type NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("tyrepro_token")?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && process.env.NODE_ENV === "production" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
