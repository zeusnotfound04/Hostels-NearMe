import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import s3Client from "@/lib/awsS3";
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,  // Disable Next.js built-in body parser to use formidable
  },
};

export async function POST(req: Request) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    // Parse the incoming form data
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error during file parsing:", err);
        return reject(new NextResponse.json({ message: 'File upload error' }, { status: 500 }));
      }

      // Access the fields and files from the form data
      const { fileName, fileType } = fields;
      const uploadedFile = files.file && files.file[0]; // Assuming 'file' is the form field name for file uploads

      if (!fileName || !fileType) {
        return resolve(new NextResponse.json({ message: 'File name and type are required' }, { status: 400 }));
      }

      if (!uploadedFile) {
        return resolve(new NextResponse.json({ message: 'File is missing in the request' }, { status: 400 }));
      }

      try {
        // Generate a pre-signed URL to upload the file to S3
        const command = new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: `hostels/${fileName}`,  // Adjust the S3 path as needed
          ContentType: fileType as string,  // Content-Type from the form
        });

        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });  // URL valid for 1 hour

        return resolve(new NextResponse.json({ url: signedUrl }, { status: 200 }));
      } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        return resolve(new NextResponse.json({ message: "Failed to generate upload URL" }, { status: 500 }));
      }
    });
  });
}
