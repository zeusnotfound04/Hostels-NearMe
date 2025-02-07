import { prisma } from "@/lib/prisma";



export async function updateAdminInsights(){
    try {
        
        const totalBookings = await prisma.booking.count();
        const confirmedBookings = await prisma.booking.count({ 
            where : {
                status : "CONFIRMED"
            }
        });
        const cancelledBookings = await prisma.booking.count({ 
            where : {
                status : "CANCELLED"
            }
        });
        const totalUsers = await prisma.user.count();
        const newUsersThisMonth = await prisma.user.count({
            where : {
                createdAt : {
                    gte : new Date(new Date().getFullYear() , new Date().getMonth() - 1)
                }
            }
        })

        const activeHostelsCount = await prisma.hostel.count({
            where : {
                isAvailable : true
            }
        })
        const bookingConversionRate = totalBookings > 0 ? (confirmedBookings / totalBookings) * 100 : 0;
        const cancellationRate = totalBookings > 0 ? (cancelledBookings / totalBookings) * 100 : 0;
        const avgBookingsPerUser = totalUsers > 0 ? totalBookings / totalUsers : 0;
        

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const trendingHostels = await prisma.hostel.findFirst({
            where : {
                bookings : {
                    some :{
                        createdAt : {
                            gte : thirtyDaysAgo
                        }
                    }
                }
            },
            orderBy : {
                bookings : {
                    _count : "desc"
                }
            },
            select :{
                id : true,
            }
        });

        const listHostelRequests = await prisma.listHostelRequest.count();

        const pendingRequests = await prisma.listHostelRequest.count({
            where : {
                status : "PENDING"
            }
        });

        const cancelledRequests = await prisma.listHostelRequest.count({
            where : {
                status : "REJECTED"
            }
        });


        await prisma.adminInsights.upsert({
            where: { id: "1" },
            update: {
              totalBookings,
              confirmedBookings,
              cancelledBookings,
              totalUsers,
              newUsersThisMonth,
              activeHostelsCount,
              bookingConversionRate,
              cancellationRate,
              avgBookingsPerUser,
              trendingHostelId: trendingHostels?.id || null,
              listHostelRequests,
              pendingRequests,
              cancelledRequests,
            },
            create: {
              id: "1",
              totalBookings,
              confirmedBookings,
              cancelledBookings,
              totalUsers,
              newUsersThisMonth,
              activeHostelsCount,
              bookingConversionRate,
              cancellationRate,
              avgBookingsPerUser,
              trendingHostelId: trendingHostels?.id || null,
              listHostelRequests,
              pendingRequests,
              cancelledRequests,
            },
          });
          
          console.log("Admin Insights Updated");

    } catch (error) {   
            console.error("Error updating admin insights:", error);
    }
}