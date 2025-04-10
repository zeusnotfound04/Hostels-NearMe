import { prisma } from "@/lib/prisma";


export async function updateActiveHostelsCount() {
    try {
        
        const activeHostelsCount = await prisma.hostel.count({
            where: {
                isAvailable : true
            },
        });

        // Use upsert instead of update to handle the case where the record doesn't exist
        await prisma.adminInsights.upsert({
            where: {
                id: "1"  // Keep the same ID for consistency
            },
            update: {
                activeHostelsCount
            },
            create: {
                id: "1",
                activeHostelsCount,
                totalBookings: 0,
                confirmedBookings: 0,
                cancelledBookings: 0,
                totalUsers: 0,
                newUsersThisMonth: 0,
                bookingConversionRate: 0,
                cancellationRate: 0,
                avgBookingsPerUser: 0,
                listHostelRequests: 0,
                pendingRequests: 0,
                cancelledRequests: 0
            }
        });
    } catch (error) {
        console.error("Error updating active hostels count:", error);

    }
}


