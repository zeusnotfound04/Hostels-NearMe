import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET: Fetch all coaching centers
export async function GET() {
  try {
    // Fetch all coaching centers
    const coachings = await prisma.coaching.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(coachings, { status: 200 });
  } catch (error) {
    console.error("Error fetching coaching centers:", error);
    return NextResponse.json(
      { error: "Failed to fetch coaching centers" },
      { status: 500 }
    );
  }
}

// POST: Create new coaching center
export async function POST(request: Request) {
  try {
    // Check authentication and admin status
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.value) {
      return NextResponse.json(
        { error: "Name and value are required" },
        { status: 400 }
      );
    }

    // Create new coaching center
    const coaching = await prisma.coaching.create({
      data: {
        name: body.name,
        value: body.value,
        description: body.description || null,
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json(coaching, { status: 201 });
  } catch (error : any) {
    console.error("Error creating coaching center:", error);
    
    // Check for unique constraint violation
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A coaching center with this name or value already exists" },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create coaching center" },
      { status: 500 }
    );
  }
}