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
    // Get form data from the request
    const formData = await req.formData();

    // Get all files from the form data
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: "No files found" }, { status: 400 });
    }

    // Array to store the URLs of the uploaded files
    const uploadedFileUrls: string[] = [];

    // Loop through each file and upload it to S3
    for (const file of files) {
      // Convert the file to a buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = file.name;

      // Upload the file to S3
      await uploadtoS3(buffer, fileName);

      // Construct the file URL (or whatever details you need)
      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/images/${fileName}`;
      uploadedFileUrls.push(fileUrl);
    }

    // Return the URLs of all uploaded files
    return NextResponse.json({ success: true, fileUrls: uploadedFileUrls });
  } catch (error) {
    let errorMessage = "Error uploading images";

    // If the error is from the S3 service, provide a detailed message
    if (error instanceof Error) {
      errorMessage = error.message || errorMessage;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}