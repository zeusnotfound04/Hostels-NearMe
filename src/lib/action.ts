import { prisma } from "./prisma"

export const getHostelById = async(hostelId : string) =>{

    try {
        const hostel = await prisma.hostel.findUnique({
            where : {
                id : hostelId,
            }
        })

        if (!hostel) return null;

        return hostel;

    } catch (error : any) {
        console.log(error)
        throw new Error(error)
        
        
    }

}