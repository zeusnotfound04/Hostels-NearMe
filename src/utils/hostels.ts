import { prisma } from "@/lib/prisma";


export async function updateActiveHostelsCout() {
    try {
        
        const activeHostelsCount = await prisma.hostel.count({
            where: {
                isAvailable : true
            },

        })

        await prisma.adminInsights.update({
            where : {
                id : "1"
            },
            data : {
                activeHostelsCount
            }
        })
    } catch (error) {
        console.error("Error updating active hostels count :" , error)
        throw new Error("Error updating active hostels count. Please try again later.")
    }
    
}