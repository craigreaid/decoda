import { resolveBrand } from "@/lib/brand/resolve";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const brand = resolveBrand({
    queryBrand: request.nextUrl.searchParams.get("brand"),
    host: request.headers.get("host"),
    envBrand: process.env.BRAND,
    cookieBrand: request.cookies.get("decoda-brand")?.value,
  });

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-brand", brand);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("x-brand", brand);
  response.cookies.set("decoda-brand", brand, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2)$).*)",
  ],
};
