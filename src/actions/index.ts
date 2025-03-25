
import { prisma } from "@/lib/prisma"
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "@/lib/awsS3";
import { Blog, Hostel } from "@/types";
import axios from "axios";


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

  export async function getBlog(blogId: string): Promise<Blog | null > {
    try {
      const blog = await prisma.blog.findUnique({
        where: {
          id: blogId,
        },
      
      });
  
      if (!blog) {
        return null;
      }
  
      return {
        ...blog,
        
      };
    } catch (error) {
      console.error("Error fetching hostel:", error);
      return null;
    }
  }


  export const deleteBlog = async (id: string): Promise<void> => {
    try {
        await axios.delete(`/api/blogs/${id}`);
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
};



  export const uploadtoS3 = async (file: Buffer, filename: string, contentType: string, fileType: string = 'hostel') => {
    console.log(`Uploading ${filename} as ${fileType} image`);
    const fileBuffer = file;
    
    
    const timestampedFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    const folderMap: Record<string, string> = {
      hostel: 'hostels',
      blog: 'blogs',
      user: 'users',
      default: 'misc'
    };
    
    const folder = folderMap[fileType] || folderMap.default;
    
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `images/${folder}/${timestampedFilename}`,
      Body: fileBuffer,
      ContentType: contentType, 
    };
  
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
  
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/images/${folder}/${timestampedFilename}`;
  };