import { Key } from "lucide-react";
import { prisma } from "./prisma"
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./awsS3";



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

export const uploadtoS3 =  async ({ file  , filename }) => {
    const fileBuffer = file
    console.log(fileBuffer)

    const paramas = {
        Bucket : process.env.AWS_S3_BUCKET_NAME,
        Key : `hostelsImage/${filename}-${Date.now()}`,
        Body : fileBuffer,
        ContentType : "image/*"
    }
    const command = new PutObjectCommand(paramas)
    await s3Client.send(command)
    return filename
    
}