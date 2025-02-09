import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.ip ||
    req.headers.get("cf-connecting-ip") || // Cloudflare support
    req.headers.get("x-real-ip") || // Nginx support
    "unknown";

  // Clone the request and attach the IP to headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-client-ip", ip);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

// Apply middleware to all API routes
export const config = {
  matcher: "/api/:path*",
};
