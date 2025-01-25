
import { prisma } from "@/lib/prisma"
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "@/lib/awsS3";
import { Hostel } from "@/types";


export async function getHostel(hostelId: string): Promise<Hostel | null> {
    try {
      const hostel = await prisma.hostel.findUnique({
        where: {
          id: hostelId,
        },
      
      });
  
      if (!hostel) {
        return null;
      }
  
      return {
        ...hostel,
        
      };
    } catch (error) {
      console.error("Error fetching hostel:", error);
      return null;
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