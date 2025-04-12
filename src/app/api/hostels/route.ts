import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { HostelType, HostelGender, Prisma } from "@prisma/client";
import { hostelRequiredFields } from "@/constants";
import { isAdmin } from "@/utils/user";
import { updateActiveHostelsCount } from "@/utils/hostels";
import { OrderByField } from "@/types";

// Type safe way to add boolean fields to the filters object
type FilterWithBooleanFields = Prisma.HostelWhereInput & {
  [key: string]: unknown;
  OR?: Array<{
    name?: { contains: string; mode: 'insensitive' };
    city?: { contains: string; mode: 'insensitive' };
  }>;
  hostelType?: HostelType;
  gender?: HostelGender;
  nearByCoaching?: { has: string };
  city?: { contains: string; mode: 'insensitive' };
  state?: { contains: string; mode: 'insensitive' };
  price?: { gte?: number; lte?: number };
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id || !isAdmin(session.user.role)) {
      return NextResponse.json(
        { error: "You must be logged in and must be an admin to create a hostel" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const missingFields = hostelRequiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    if (!Object.values(HostelType).includes(body.hostelType)) {
      return NextResponse.json(
        { error: "Invalid hostel type" },
        { status: 400 }
      );
    }

    if (!Object.values(HostelGender).includes(body.gender)) {
      return NextResponse.json(
        { error: "Invalid gender value" },
        { status: 400 }
      );
    }
    console.log("Creating hostel with data:::::::🐉🐉", body);

    const hostel = await prisma.hostel.create({
      data: {
        name: body.name,
        about: body.about,
        price: parseFloat(body.price),
        gender: body.gender as HostelGender,
        state: body.state,
        city: body.city,
        hostelType: body.hostelType as HostelType,
        address: body.address,
        images: body.images,
        nearByCoaching: body.nearByCoaching,
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
    console.log("Hostel created:", hostel);

    await updateActiveHostelsCount();
    return NextResponse.json(
      { message: "Hostel Created Successfully", hostel },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating hostel:", error);
    return NextResponse.json(
      {
        error: "Failed to create hostel",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    console.log("Received search params:", Object.fromEntries(searchParams));

    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "10");
    const skip = (page - 1) * limit;

    // Cast filters to our extended type that allows string indexing
    const filters: FilterWithBooleanFields = {
      isAvailable: searchParams.get("isAvailable") === "true",
    };

    const searchTerm = searchParams.get("search") ?? undefined;
    if (searchTerm) {
      filters.OR = [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          city: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ];
    }

    const hostelType = searchParams.get("hostelType") ?? undefined;
    if (hostelType && Object.values(HostelType).includes(hostelType as HostelType)) {
      filters.hostelType = hostelType as HostelType;
    }

    const gender = searchParams.get("gender") ?? undefined;
    if (gender && Object.values(HostelGender).includes(gender as HostelGender)) {
      filters.gender = gender as HostelGender;
    }

    const coachingTerm = searchParams.get("nearByCoaching") ?? undefined;
    if (coachingTerm) {
      filters.nearByCoaching = {
        has: coachingTerm,
      };
    }

    const city = searchParams.get("city") ?? undefined;
    const search = searchParams.get("search") ?? undefined;
    if (city && !search) {
      filters.city = {
        contains: city,
        mode: "insensitive",
      };
    }

    const state = searchParams.get("state") ?? undefined;
    if (state) {
      filters.state = {
        contains: state,
        mode: "insensitive",
      };
    }

    const minPrice = searchParams.get("minPrice") ?? undefined;
    const maxPrice = searchParams.get("maxPrice") ?? undefined;
    
    if (minPrice || maxPrice) {
      filters.price = {};
      
      if (minPrice && !isNaN(parseFloat(minPrice))) {
        filters.price.gte = parseFloat(minPrice);
      }
      
      if (maxPrice && !isNaN(parseFloat(maxPrice))) {
        filters.price.lte = parseFloat(maxPrice);
      }
    }

    // Type-safe boolean fields handling
    const booleanFields = [
      "attachedWashroom",
      "cctv",
      "wiFi",
      "cooler",
      "inverterBackup",
      "parking",
      "biweeklycleaning",
      "allDayElectricity",
      "generator",
      "geyser",
      "indoorGames",
      "waterByRO",
      "securityGuard",
      "foodIncluded",
      "vegetarienMess",
      "allDayWaterSupply",
      "gym",
      "allDayWarden",
      "airconditioner",
    ];

    booleanFields.forEach((field) => {
      const value = searchParams.get(field) ?? undefined;
      if (value === "true" || value === "false") {
        // Now TypeScript knows we can use string indexing on our extended type
        filters[field] = value === "true";
      }
    });

    let orderBy: OrderByField[] = [
      { isAvailable: "desc" },
      { createdAt: "desc" },
    ];

    const sortBy = searchParams.get("sortBy") ?? undefined;
    const sortOrder = searchParams.get("sortOrder") ?? "asc";

    if (sortBy) {
      const validSortOrder: Prisma.SortOrder = 
        (sortOrder.toLowerCase() === 'desc' ? 'desc' : 'asc');
      
      // Type-safe way to create the order object
      const orderObj = { [sortBy]: validSortOrder } as OrderByField;
      
      orderBy = [orderObj];
      orderBy.push({ isAvailable: "desc" });
    }

    console.log("Applied filters:", JSON.stringify(filters, null, 2));
    console.log("Applied sorting:", JSON.stringify(orderBy, null, 2));

    const [hostels, totalItems] = await Promise.all([
      prisma.hostel.findMany({
        where: filters,
        skip,
        take: limit,
        orderBy,
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
          nearByCoaching: true,
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
        },
      }),
      prisma.hostel.count({
        where: filters,
      }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    console.log(`Found ${hostels.length} hostels out of ${totalItems} total`);

    return NextResponse.json({
      hostels,
      pagination: {
        totalPages,
        currentPage: page,
        totalItems,
      },
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