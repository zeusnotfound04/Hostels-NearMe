import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cities = await prisma.city.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    
    return NextResponse.json({ cities }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
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
    
    const { name, stateId } = await req.json();
    
    if (!name || !stateId) {
      return NextResponse.json(
        { error: "City name and state ID are required" },
        { status: 400 }
      );
    }
    
    
    const existingCity = await prisma.city.findFirst({
      where: {
        name: name,
        stateId: stateId
      }
    });
    
    if (existingCity) {
      return NextResponse.json(
        { error: "City already exists for this state" },
        { status: 400 }
      );
    }
    
    const city = await prisma.city.create({
      data: {
        name,
        stateId
      }
    });
    
    return NextResponse.json({ city }, { status: 201 });
  } catch (error) {
    console.error("Error creating city:", error);
    return NextResponse.json(
      { error: "Failed to create city" },
      { status: 500 }
    );
  }
}