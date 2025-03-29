import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const url = new URL(req.url);
        const hostelId = url.searchParams.get('hostelId');

        if (!hostelId) {
            return NextResponse.json({ error: "Hostel ID is required" }, { status: 400 });
        }

        // Find existing booking
        const existingBooking = await prisma.booking.findFirst({
            where: {
                userId: userId,
                hostelId: hostelId,
                status: {
                    in: ['PENDING', 'CONFIRMED']
                }
            },
            select: {
                id: true,
                referenceId: true,
                status: true
            }
        });

        return NextResponse.json({ 
            canBook: !existingBooking,
            booking: existingBooking,
            message: existingBooking ? "You already have an active booking for this hostel" : "You can book this hostel"
        });

    } catch (error) {
        console.error("GET /api/bookings/check error:", error);
        return NextResponse.json({ error: "Failed to check booking status" }, { status: 500 });
    }
}