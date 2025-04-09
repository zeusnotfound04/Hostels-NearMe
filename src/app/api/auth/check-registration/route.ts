import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.email) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { password: true }
    });

    if (!user || !user.password || user.password === "") {
      return NextResponse.redirect(
        new URL(`/register/google?email=${encodeURIComponent(session.user.email)}&name=${encodeURIComponent(session.user.name || "")}`, request.url)
      );
    }

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Error checking registration status:", error);
    return NextResponse.redirect(new URL("/login?error=Something went wrong", request.url));
  }
}