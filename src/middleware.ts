import { NextRequest, NextResponse } from "next/server";
import { LANGUAGES, FALLBACK_LANG, COOKIE_NAME, HEADER_NAME } from "./i18n/constants";

export function proxy(request: NextRequest) {
  const search = request.nextUrl.search;
  const pathname = request.nextUrl.pathname;
  const url = pathname + search;

  const lang = request.cookies.has(COOKIE_NAME)
    ? request.cookies.get(COOKIE_NAME)!.value
    : FALLBACK_LANG;

  const langParam = LANGUAGES.find((language) =>
    pathname.startsWith(`/${language}`)
  );

  if (!langParam) {
    return NextResponse.redirect(new URL(`/${lang}${url}`, request.url));
  }

  const headers = new Headers(request.headers);
  headers.set(HEADER_NAME, langParam);

  return NextResponse.next({ request: { headers } });
}

export function middleware(request: NextRequest) {
  return proxy(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
