import {
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";

import { NextResponse } from "next/server";
import s3Client from "@/lib/awsS3";
import { uploadtoS3 } from "@/lib/action";

export async function POST(req: Request): Promise<Response> {
  try {
    const formData = await req.formData();
    console.log(formData)
    
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: "No files found" }, { status: 400 });
    }

    const uploadedFileUrls: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = file.name;
      console.log(fileName)
      await uploadtoS3(buffer, fileName);
      

      
      const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/hostelsImage/${fileName}`;
      uploadedFileUrls.push(fileUrl);
    }

    return NextResponse.json({ success: true, fileUrls: uploadedFileUrls });
  } catch (error) {
    let errorMessage = "Error uploading images";

    if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}