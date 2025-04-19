import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface RouteParams {
  params: {
    coachingId: string;
  };
}

// GET: Fetch a specific coaching center by ID
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { coachingId } = params;

    const coaching = await prisma.coaching.findUnique({
      where: {
        id: coachingId,
      },
    });

    if (!coaching) {
      return NextResponse.json(
        { error: "Coaching center not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(coaching, { status: 200 });
  } catch (error) {
    console.error("Error fetching coaching center:", error);
    return NextResponse.json(
      { error: "Failed to fetch coaching center" },
      { status: 500 }
    );
  }
}

// PUT: Update a specific coaching center
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    // Check authentication and admin status
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { coachingId } = params;
    const body = await request.json();

    // Validate that at least one field is being updated
    if (!body.name && !body.value && body.description === undefined && body.isActive === undefined) {
      return NextResponse.json(
        { error: "No fields to update provided" },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    if (body.name) updateData.name = body.name;
    if (body.value) updateData.value = body.value;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;

    // Update coaching center
    const coaching = await prisma.coaching.update({
      where: {
        id: coachingId,
      },
      data: updateData,
    });

    return NextResponse.json(coaching, { status: 200 });
  } catch (error) {
    console.error("Error updating coaching center:", error);
    
    // Check if coaching center doesn't exist
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Coaching center not found" },
        { status: 404 }
      );
    }
    
    // Check for unique constraint violation
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A coaching center with this name or value already exists" },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update coaching center" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a specific coaching center
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    // Check authentication and admin status
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { coachingId } = params;

    // Delete coaching center
    await prisma.coaching.delete({
      where: {
        id: coachingId,
      },
    });

    return NextResponse.json(
      { message: "Coaching center deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting coaching center:", error);
    
    // Check if coaching center doesn't exist
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Coaching center not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to delete coaching center" },
      { status: 500 }
    );
  }
}