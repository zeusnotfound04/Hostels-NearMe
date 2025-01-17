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

export const uploadtoS3 = async (file: Buffer, filename: string, contentType: string) => {
    console.log(filename, "filename");
    const fileBuffer = file;
    console.log(fileBuffer);
  
    const timestampedFilename = `${filename}-${Date.now()}`;
  
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `hostelsImage/${timestampedFilename}`,
      Body: fileBuffer,
      ContentType: contentType, 
    };
  
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
  
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/hostelsImage/${timestampedFilename}`;
  };