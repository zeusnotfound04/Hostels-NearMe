import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
export {default} from "next-auth/middleware"


// TODO : make a 404 page and redirect the user if he is not admin but trynna access the admin routes


export async function middleware(req:NextRequest) {

  try {
    const token = await getToken({req , secret : process.env.NEXTAUTH_SECRET})
    

    const adminRouteRegex = /^\/admin(\/|$)/; 


    if (adminRouteRegex.test(req.nextUrl.pathname)) {
      if (!token || token.role!== "ADMIN") {
        return NextResponse.redirect( new URL("/" , req.url))
      }
    }

    return NextResponse.next();

  } catch (error) {
    console.error("Middleware Error :::: " , error) 
    return NextResponse.redirect(new URL("/" , req.url))   
  }
  
}



export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Exclude Next.js internals
};


