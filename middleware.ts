import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { shouldServeMarkdown } from "./src/utils/markdownNegotiation";

export function middleware(request: NextRequest) {
  const acceptHeader = request.headers.get("accept");

  if (!shouldServeMarkdown(acceptHeader)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/api/markdown";
  url.search = ""; // Clear query string

  const response = NextResponse.rewrite(url);
  response.headers.set("x-original-path", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: "/blog/:path*",
};
