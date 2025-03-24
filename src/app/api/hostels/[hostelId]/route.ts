import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { HostelType, HostelGender } from "@prisma/client";
import { updateActiveHostelsCount } from "@/utils/hostels";
import { isAdmin } from "@/utils/user";

interface RouteParams {
  params: {
    hostelId: string;
  };
}


export async function GET(req: Request, { params  }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const {hostelId} = params

    const hostel = await prisma.hostel.findUnique({
      where: {
        id: hostelId,
      },
    });

    if (!hostel) {
      return NextResponse.json(
        { error: "Hostel not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(hostel);
  } catch (error) {
    console.error("Error fetching hostel:", error);
    return NextResponse.json(
      { error: "Failed to fetch hostel" },
      { status: 500 }
    );
  }
}


export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id || !isAdmin(session.user.role)) {
      return NextResponse.json(
        { error: "You must be logged in and must be an admin to create a hostel" },
        { status: 401 }
      );
    }
    

    if (!params.hostelId) {
      return NextResponse.json(
        { error: "Hostel ID is required" },
        { status: 400 }
      );
    }


    const body = await req.json();

 
    if (body.hostelType && !Object.values(HostelType).includes(body.hostelType)) {
      return NextResponse.json(
        { error: "Invalid hostel type" },
        { status: 400 }
      );
    }

    if (body.gender && !Object.values(HostelGender).includes(body.gender)) {
      return NextResponse.json(
        { error: "Invalid gender value" },
        { status: 400 }
      );
    }


    const updatedHostel = await prisma.hostel.update({
      where: {
        id: params.hostelId
      },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.price !== undefined && { price: parseFloat(body.price) }),
        ...(body.hostelType !== undefined && { hostelType: body.hostelType }),
        ...(body.state !== undefined && { state: body.state }),
        ...(body.city !== undefined && { city: body.city }),
        ...(body.address !== undefined && { address: body.address }),
        ...(body.about !== undefined && { about: body.about }),
        ...(body.images !== undefined && { images: body.images }),
        ...(body.gender !== undefined && { gender: body.gender }),
        ...(body.isAvailable !== undefined && { isAvailable: body.isAvailable }),
        ...(body.isNonVeg !== undefined && { isNonVeg: body.isNonVeg }),
        ...(body.Almirah !== undefined && { Almirah: body.Almirah }),
        ...(body.attachedWashroom !== undefined && { attachedWashroom: body.attachedWashroom }),
        ...(body.cctv !== undefined && { cctv: body.cctv }),
        ...(body.chair !== undefined && { chair: body.chair }),
        ...(body.cooler !== undefined && { cooler: body.cooler }),
        ...(body.inverterBackup !== undefined && { inverterBackup: body.inverterBackup }),
        ...(body.parking !== undefined && { parking: body.parking }),
        ...(body.biweeklycleaning !== undefined && { biweeklycleaning: body.biweeklycleaning }),
        ...(body.allDayElectricity !== undefined && { allDayElectricity: body.allDayElectricity }),
        ...(body.generator !== undefined && { generator: body.generator }),
        ...(body.geyser !== undefined && { geyser: body.geyser }),
        ...(body.indoorGames !== undefined && { indoorGames: body.indoorGames }),
        ...(body.pillow !== undefined && { pillow: body.pillow }),
        ...(body.waterByRO !== undefined && { waterByRO: body.waterByRO }),
        ...(body.securityGuard !== undefined && { securityGuard: body.securityGuard }),
        ...(body.table !== undefined && { table: body.table }),
        ...(body.wiFi !== undefined && { wiFi: body.wiFi }),
        ...(body.foodIncluded !== undefined && { foodIncluded: body.foodIncluded }),
        ...(body.bed !== undefined && { bed: body.bed }),
        ...(body.vegetarienMess !== undefined && { vegetarienMess: body.vegetarienMess }),
        ...(body.allDayWaterSupply !== undefined && { allDayWaterSupply: body.allDayWaterSupply }),
        ...(body.gym !== undefined && { gym: body.gym }),
        ...(body.allDayWarden !== undefined && { allDayWarden: body.allDayWarden }),
        ...(body.airconditioner !== undefined && { airconditioner: body.airconditioner }),
      },
    });

    await updateActiveHostelsCount(); 

    return NextResponse.json({
      message: "Hostel updated successfully",
      hostel: updatedHostel
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating hostel:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to update hostel", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request,  { params }: RouteParams) {
  try {

    const session = await getServerSession(authOptions);

    const {hostelId} = await params;
    

    if (!session || !session.user || !session.user.id || !isAdmin(session.user.role)) {
      return NextResponse.json(
        { error: "You must be logged in and must be an admin to create a hostel" },
        { status: 401 }
      );
    }
    




    if (!hostelId) {
      return NextResponse.json(
        { error: "Hostel ID is required" },
        { status: 400 }
      );
    }


    const deletedHostel = await prisma.hostel.delete({
      where: {
        id: hostelId
      },
    });

    return NextResponse.json({
      message: "Hostel deleted successfully",
      hostel: deletedHostel
    }, { status: 200 });

  } catch (error) {
    console.error("Error deleting hostel:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to delete hostel", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}