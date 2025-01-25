import {prisma} from "@/lib/prisma"



export async function fetchAdminInsights() {

    try {
        
        const insights = await prisma.adminInsights.findFirst();

        if(!insights){
            return {
                message  : "No insights Found",
                data : {
                    totoalBookings : 0,
                    confirmedBookings : 0,
                    cancelledBookings: 0, 
                    totalUsers: 0, 
                    newUsersThisMonth: 0, 
                    activeHostelsCount: 0, 
                    bookingConversionRate: 0, 
                    cancellationRate: 0, 
                    avgBookingsPerUser: 0, 
                    trendingHostelId: null , 
                    listHostelRequests: 0, 
                    pendingRequests: 0, 
                    cancelledRequests: 0, 

                }
            }
        }

        return {
            message: "Insights fetched successfully.",
            data: {
              totalBookings: insights.totalBookings,
              confirmedBookings: insights.confirmedBookings,
              cancelledBookings: insights.cancelledBookings,
              totalUsers: insights.totalUsers,
              newUsersThisMonth: insights.newUsersThisMonth,
              activeHostelsCount: insights.activeHostelsCount,
              bookingConversionRate: insights.bookingConversionRate,
              cancellationRate: insights.cancellationRate,
              avgBookingsPerUser: insights.avgBookingsPerUser,
              trendingHostelId: insights.trendingHostelId,
              listHostelRequests: insights.listHostelRequests,
              pendingRequests: insights.pendingRequests,
              cancelledRequests: insights.cancelledRequests,
            },
          };



    } catch (error) {
        console.error("Error fetching the admin insights :", error)
        throw new Error("Error to fetch admin insights. Please try again later")
    }
    
}