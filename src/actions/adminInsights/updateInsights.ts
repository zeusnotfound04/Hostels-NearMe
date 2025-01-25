import { prisma } from "@/lib/prisma";




export async function updateAdminInsights(updates: Partial<{
    totoalBookings: number,
    confirmedBookings: number,
    cancelledBookings: number,
    totalUsers: number,
    newUsersThisMonth: number,
    activeHostelsCount: number,
    bookingConversionRate: number,
    cancellationRate: number,
    avgBookingsPerUser: number,
    trendingHostelId: string | null,
    listHostelRequests: number,
    pendingRequests: number,
    cancelledRequests: number,
}>) {
    try {
        
        const updatedInsights = await prisma.adminInsights.update({
            where : {
                id : "1", 
            },
            data : updates, 
        });


        return {
            message : "Admin insights updated successfully.",
            data : updatedInsights,

        }
    } catch (error) {
        console.log("Error updating the admin insights :" , error )
        throw new Error("Failed to update admin insights. Please try again later.")
    }
}