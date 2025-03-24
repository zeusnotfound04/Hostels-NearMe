import { NextResponse } from "next/server";
import { uploadtoS3 } from "@/actions";

export async function POST(req: Request): Promise<Response> {
  try {
    const formData = await req.formData();
    console.log("FORM DATA IN THE BACKEND FOR FILE UPLOAD " , formData)
    const files = formData.getAll("files") as File[];
    

    const imageType = formData.get("imageType") as string || "hostel";
    
    console.log("FILE LENGTH" , files )
    if (files.length === 0) {
      return NextResponse.json({ success: true, fileUrls: [] });
    }

    const uploadedFileUrls: string[] = [];
    for (const file of files) {
      try {
        if (!file.type.startsWith("image/")) {
          return NextResponse.json({ error: `File ${file.name} is not a valid image.` }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = file.name;

        const fileUrl = await uploadtoS3(buffer, fileName, file.type, imageType);
        console.log("FILE URL FROM THE BACKEND:::::" , fileUrl)
        uploadedFileUrls.push(fileUrl);
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
      }
    }

    if (uploadedFileUrls.length === 0 && files.length > 0) {
      return NextResponse.json(
        { error: "No files were successfully uploaded." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, fileUrls: uploadedFileUrls });
  } catch (error) {
    console.error("Error in upload route:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}