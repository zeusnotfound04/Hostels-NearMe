import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{
    stateId: string;
  }>;
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getServerSession(authOptions);
    
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }
    
    const { stateId } = await params;
    if (!stateId) {
      return NextResponse.json(
        { error: "State ID is required" },
        { status: 400 }
      );
    }
    
    const state = await prisma.state.findUnique({
      where: { id: stateId },
      include: { cities: true }
    });
    
    if (!state) {
      return NextResponse.json(
        { error: "State not found" },
        { status: 404 }
      );
    }
    
    const cityNames = state.cities.map(city => city.name);
    
    const hostelCount = await prisma.hostel.count({
      where: {
        OR: [
          { city: { in: cityNames } },
          { state: state.name }
        ]
      }
    });
    
    const blogCount = await prisma.blog.count({
      where: {
        city: { in: cityNames }
      }
    });
    
    if (hostelCount > 0 || blogCount > 0) {
      return NextResponse.json(
        { error: "Cannot delete state because it or its cities are being used in hostels or blogs" },
        { status: 400 }
      );
    }
    
    // Delete all cities in this state first
    await prisma.city.deleteMany({
      where: { stateId }
    });
    
    // Then delete the state
    await prisma.state.delete({
      where: { id: stateId }
    });
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting state:", error);
    return NextResponse.json(
      { error: "Failed to delete state" },
      { status: 500 }
    );
  }
}