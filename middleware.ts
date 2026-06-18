import { NextRequest, NextResponse } from "next/server";

const erpHost = "erp.kesh-amrit.vercel.app";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();
  const { pathname } = request.nextUrl;

  if (
    host === erpHost &&
    !pathname.startsWith("/erp") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    !pathname.includes(".")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/erp";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
