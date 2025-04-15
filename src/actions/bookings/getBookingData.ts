import {prisma} from "@/lib/prisma";
import { Booking } from "@/types";

export async function getBookingData(bookingId: string) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { hostel: true, user: true },
    });
    console.log("Booking data in the Server Compo:", booking);

    if (!booking) {
        throw new Error("Booking not found");
    }

    const transformedBooking : Booking = {
        ...booking,
        createdAt: booking.createdAt.toISOString(), // Convert Date to string
        lastUpdatedAt: booking.updatedAt.toISOString(),
        updatedAt: booking.updatedAt.toISOString(), // Convert updatedAt Date to string as well
    };
    


    return  transformedBooking;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw new Error("Failed to fetch booking details");
  }
}