import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { HostelType, Gender } from "@prisma/client";
import { requiredFields } from "@/constants";





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



export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    console.log('Received search params:', Object.fromEntries(searchParams));

    // Basic pagination setup
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "10");
    const skip = (page - 1) * limit;

    // Initialize base filters
    const filters: any = {
      isAvailable: searchParams.get("isAvailable") === "true",
    };

    // Handle search (combined name and city search)
    if (searchParams.get("search")) {
      const searchTerm = searchParams.get("search");
      filters.OR = [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          }
        },
        {
          city: {
            contains: searchTerm,
            mode: "insensitive",
          }
        }
      ];
    }

    // Hostel type filter
    if (searchParams.get("hostelType")) {
      filters.hostelType = searchParams.get("hostelType") as HostelType;
    }

    // Gender filter
    if (searchParams.get("gender")) {
      filters.gender = searchParams.get("gender") as Gender;
    }

    // City filter (exact match)
    if (searchParams.get("city") && !searchParams.get("search")) {
      filters.city = {
        contains: searchParams.get("city"),
        mode: "insensitive",
      };
    }

    // State filter
    if (searchParams.get("state")) {
      filters.state = {
        contains: searchParams.get("state"),
        mode: "insensitive",
      };
    }

    // Price range filter
    if (searchParams.get("minPrice") || searchParams.get("maxPrice")) {
      filters.price = {};
      
      if (searchParams.get("minPrice")) {
        filters.price.gte = parseFloat(searchParams.get("minPrice")!);
      }
      
      if (searchParams.get("maxPrice")) {
        filters.price.lte = parseFloat(searchParams.get("maxPrice")!);
      }
    }

    // Boolean amenities filters
    const booleanFields = [
      "isNonVeg", "Almirah", "attachedWashroom", "cctv", "chair",
      "cooler", "inverterBackup", "parking", "biweeklycleaning",
      "allDayElectricity", "generator", "geyser", "indoorGames",
      "pillow", "waterByRO", "securityGuard", "table", "wiFi",
      "foodIncluded", "bed", "vegetarienMess", "allDayWaterSupply",
      "gym", "allDayWarden", "airconditioner"
    ];

    booleanFields.forEach(field => {
      const value = searchParams.get(field);
      if (value === "true" || value === "false") {
        filters[field] = value === "true";
      }
    });

    console.log('Applied filters:', JSON.stringify(filters, null, 2));

    // Get total count for pagination
    const total = await prisma.hostel.count({
      where: filters,
    });

    // Fetch hostels with filters and pagination
    const hostels = await prisma.hostel.findMany({
      where: filters,
      skip,
      take: limit,
      orderBy: [
        {
          isAvailable: 'desc' // Show available hostels first
        },
        {
          createdAt: 'desc' // Then sort by creation date
        }
      ],
      select: {
        id: true,
        name: true,
        price: true,
        hostelType: true,
        gender: true,
        state: true,
        city: true,
        address: true,
        about: true,
        images: true,
        isAvailable: true,
        isNonVeg: true,
        Almirah: true,
        attachedWashroom: true,
        cctv: true,
        chair: true,
        cooler: true,
        inverterBackup: true,
        parking: true,
        biweeklycleaning: true,
        allDayElectricity: true,
        generator: true,
        geyser: true,
        indoorGames: true,
        pillow: true,
        waterByRO: true,
        securityGuard: true,
        table: true,
        wiFi: true,
        foodIncluded: true,
        bed: true,
        vegetarienMess: true,
        allDayWaterSupply: true,
        gym: true,
        allDayWarden: true,
        airconditioner: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    console.log(`Found ${hostels.length} hostels out of ${total} total`);

    // Return response with pagination metadata
    return NextResponse.json({
      hostels,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      filters: Object.fromEntries(searchParams), // Include applied filters in response
    });

  } catch (error) {
    console.error("Error fetching hostels:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch hostels",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}