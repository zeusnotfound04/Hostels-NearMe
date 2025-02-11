//  export {default} from "next-auth/middleware"
// import { NextRequest, NextResponse } from "next/server";



// export async function middleware(req: NextRequest) {
//   const ip =
//     req.headers.get("x-forwarded-for")?.split(",")[0] ||
//     req.ip ||
//     req.headers.get("cf-connecting-ip") || // Cloudflare support
//     req.headers.get("x-real-ip") || // Nginx support
//     "unknown";


//   const requestHeaders = new Headers(req.headers);
//   requestHeaders.set("x-client-ip", ip);

//   // const loginRouteRegex = /^\/api\/auth\/callback\/credentials$/;

//   // if (loginRouteRegex.test(req.nextUrl.pathname)) {
//   //   try {
//   //     await rateLimiter.consume(ip);
//   //   } catch (error) {
//   //     return NextResponse.json(
//   //       { error : "Too many login attempts. Please try again later." },
//   //       { status: 429 } 
//   //     )
//   //   }
//   // }
  
//   const adminRouteRegex = /^\/admin(\/.*)?$/;

//   if (adminRouteRegex.test(req.nextUrl.pathname)) {
//     const {getToken} = await import("next-auth/jwt");
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//     if (!token || token.role !== "ADMIN") {
//       return NextResponse.redirect("/");
//   }

//   return NextResponse.next({
//     request: { headers: requestHeaders },
//   });
// }


// export const config = {
//   matcher: ["/admin"],
// };



export {default} from "next-auth/middleware"


export const config = {
  matcher: ["/admin"], // Matches both /admin and any sub-paths
};
