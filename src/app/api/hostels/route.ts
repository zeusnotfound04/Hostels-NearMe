import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { HostelType, Gender } from "@prisma/client";
import { requiredFields } from "@/constants/";





export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in to create a hostel" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    if (!Object.values(HostelType).includes(body.hostelType)) {
      return NextResponse.json(
        { error: "Invalid hostel type" },
        { status: 400 }
      );
    }

    if (!Object.values(Gender).includes(body.gender)) {
      return NextResponse.json(
        { error: "Invalid gender value" },
        { status: 400 }
      );
    }

    const hostel = await prisma.hostel.create({
      data: {
        name: body.name,
        about: body.about,
        price: parseFloat(body.price),
        gender: body.gender as Gender,
        state: body.state,
        city: body.city,
        hostelType: body.hostelType as HostelType,
        address: body.address,
        images: body.images,
        // Boolean facilities with proper defaults
        isAvailable: body.isAvailable ?? true,
        isNonVeg: body.isNonVeg ?? false,
        Almirah: body.Almirah ?? false,
        attachedWashroom: body.attachedWashroom ?? false,
        cctv: body.cctv ?? false,
        chair: body.chair ?? false,
        cooler: body.cooler ?? false,
        inverterBackup: body.inverterBackup ?? false,
        parking: body.parking ?? false,
        biweeklycleaning: body.biweeklycleaning ?? false,
        allDayElectricity: body.allDayElectricity ?? false,
        generator: body.generator ?? false,
        geyser: body.geyser ?? false,
        indoorGames: body.indoorGames ?? false,
        pillow: body.pillow ?? false,
        waterByRO: body.waterByRO ?? false,
        securityGuard: body.securityGuard ?? false,
        table: body.table ?? false,
        wiFi: body.wiFi ?? false,
        foodIncluded: body.foodIncluded ?? false,
        bed: body.bed ?? false,
        vegetarienMess: body.vegetarienMess ?? false,
        allDayWaterSupply: body.allDayWaterSupply ?? false,
        gym: body.gym ?? false,
        allDayWarden: body.allDayWarden ?? false,
        airconditioner: body.airconditioner ?? false,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Hostel Created Successfully", hostel },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating hostel:", error);
    return NextResponse.json(
      { 
        error: "Failed to create hostel",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}