import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (!req.auth) {
    // Respect reverse proxy headers (e.g. Vercel) so redirects stay on the live domain
    const forwardedHost = req.headers.get("x-forwarded-host");
    const forwardedProto = req.headers.get("x-forwarded-proto");
    const host = forwardedHost || req.headers.get("host") || req.nextUrl.host;
    const proto =
      forwardedProto ||
      (host.includes("localhost") || host.includes("127.0.0.1")
        ? "http"
        : "https");

    const origin = `${proto}://${host}`;
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
