import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const hostel = await prisma.hostel.create({
            data: {
                ...body,
            },
        });

        return NextResponse.json(
            { message: "Hostel Created Successfully", hostel },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
