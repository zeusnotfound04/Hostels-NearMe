import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/utils/user";

interface RouteParams {
  params: {
    bookingId: string;
  };
}



export async function GET(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { bookingId } = params;

  

    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
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

    console.log("Booking data in the backend:", booking);
    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Ensure the user is authorized to view the booking
    if (booking.userId !== session.user.id && !isAdmin(session.user.role)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // Map the booking data to the desired format
    const formattedBooking = {
      terms : booking.terms,
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
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params  }: RouteParams){

    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !isAdmin(session.user.role)) {
            return NextResponse.json(
                { error: "Unauthorized access" },
                { status: 401 }
            );
        }

        const {bookingId} = params

        const body = await req.json();
        const {status} = body

        const updatedBooking = await prisma.booking.update({
            where : {
                id : bookingId
            },
            data : {
                status
            }
        })

        return NextResponse.json(updatedBooking , { status : 200});
    } catch (error) {
        console.error("Error updating booking:", error);

        return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
    }
}



export async function DELETE(req: Request, { params  }: RouteParams){
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !isAdmin(session.user.role)) {
            return NextResponse.json(
                { error: "Unauthorized access" },
                { status: 401 }
            );
        }

        const {bookingId} = params

        const deletedBooking = await prisma.booking.delete({
            where : {
                id : bookingId
            }
        })

        return NextResponse.json(deletedBooking , { status : 200});

    } catch (error) {
        console.error("Error deleting booking:", error);
        return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
    }
}