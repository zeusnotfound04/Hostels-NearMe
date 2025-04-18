import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/utils/user";

interface RouteParams {
  params: Promise<{
    bookingId: string;
  }>;
}


export async function GET(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { bookingId } = await params;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        hostel: true,
        user: {
          select: {
            name: true,
            gender: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.userId !== session.user.id && !isAdmin(session.user.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formattedBooking = {
      terms: booking.terms,
      bookingId: booking.id,
      status: booking.status,
      createdAt: booking.createdAt.toISOString(),
      lastUpdatedAt: booking.updatedAt.toISOString(),
      hostel: {
        name: booking.hostelName,
        address: booking.hostel.address,
      },
      user: {
        name: booking.name,
        gender: booking.userGender,
        phone: booking.phoneNumber,
        address: booking.address,
      },
      referenceId: booking.referenceId,
    };

    return NextResponse.json(formattedBooking, { status: 200 });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !isAdmin(session.user.role)) {
      return NextResponse.json(
        { error: "You must be logged in and must be an admin to update a booking" },
        { status: 401 }
      );
    }

    const { bookingId } = await params;
    const body = await req.json();
    const { status } = body;

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !isAdmin(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { bookingId } = await params;

    const deletedBooking = await prisma.booking.delete({
      where: { id: bookingId },
    });

    return NextResponse.json(deletedBooking, { status: 200 });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
