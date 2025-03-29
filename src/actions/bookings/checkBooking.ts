import { prisma } from "@/lib/prisma";


export async function hasDuplicateBooking(userId: string, hostelId: string) {
    try {
      
      const existingBooking = await prisma.booking.findFirst({
        where: {
          userId: userId,
          hostelId: hostelId,
          status: {
            in: ['PENDING', 'CONFIRMED']
          }
        }
      });
  
      return existingBooking !== null;
    } catch (error) {
      console.error("Error checking for duplicate booking:", error);
      return false;
    }
  }