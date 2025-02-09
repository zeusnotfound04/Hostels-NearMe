import { NextRequest, NextResponse } from "next/server";
import {rateLimiter} from "@/lib/redis";


export async function middleware(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.ip ||
    req.headers.get("cf-connecting-ip") || // Cloudflare support
    req.headers.get("x-real-ip") || // Nginx support
    "unknown";

  // Clone the request and attach the IP to headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-client-ip", ip);

  const loginRouteRegex = /^\/api\/auth\/callback\/credentials$/;

  if (loginRouteRegex.test(req.nextUrl.pathname)) {
    try {
      await rateLimiter.consume(ip);
    } catch (error) {
      return NextResponse.json(
        { error : "Too many login attempts. Please try again later." },
        { status: 429 } 
      )
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

// Apply middleware to all API routes
export const config = {
  matcher: "/api/:path*",
};
