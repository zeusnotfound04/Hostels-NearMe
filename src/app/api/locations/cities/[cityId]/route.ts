import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";



interface RouteParams {
  params: Promise<{
    cityId: string;
  }>;
}

export async function DELETE(
  req: NextRequest,
  { params }:RouteParams
) {
  try {
    const session = await getServerSession(authOptions);
    
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }
    
    const { cityId} = await params;
    
    if (!cityId) {
      return NextResponse.json(
        { error: "City ID is required" },
        { status: 400 }
      );
    }
    
    const city = await prisma.city.findUnique({
      where: { id: cityId }
    });
    
    if (!city) {
      return NextResponse.json(
        { error: "City not found" },
        { status: 404 }
      );
    }
    
    const hostelCount = await prisma.hostel.count({
      where: {
        city: city.name
      }
    });
    
    const blogCount = await prisma.blog.count({
      where: {
        city: city.name
      }
    });
    
    if (hostelCount > 0 || blogCount > 0) {
      return NextResponse.json(
        { error: "Cannot delete city because it is being used in hostels or blogs" },
        { status: 400 }
      );
    }
    
    // Delete the city
    await prisma.city.delete({
      where: { id: cityId }
    });
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting city:", error);
    return NextResponse.json(
      { error: "Failed to delete city" },
      { status: 500 }
    );
  }
}