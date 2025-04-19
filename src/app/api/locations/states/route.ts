import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


export async function GET() {
  try {
    const states = await prisma.state.findMany({
      orderBy: {
        name: 'asc'
      },
      include: {
        cities: true
      }
    });
    
    return NextResponse.json({ states }, { status: 200 });
  } catch (error) {
    console.error("Error fetching states:", error);
    return NextResponse.json(
      { error: "Failed to fetch states" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }
    
    const { name } = await req.json();
    
    if (!name) {
      return NextResponse.json(
        { error: "State name is required" },
        { status: 400 }
      );
    }
    
    
    const existingState = await prisma.state.findFirst({
      where: { name }
    });
    
    if (existingState) {
      return NextResponse.json(
        { error: "State already exists" },
        { status: 400 }
      );
    }
    
    
    const state = await prisma.state.create({
      data: { name }
    });
    
    return NextResponse.json({ state }, { status: 201 });
  } catch (error) {
    console.error("Error creating state:", error);
    return NextResponse.json(
      { error: "Failed to create state" },
      { status: 500 }
    );
  }
}