import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";




const listRequestSchema = z.object({
    ownerName: z.string().min(1, "Owner name is required"),
    contactEmail: z.string().email("Invalid email address"),
    contactPhone: z.string().min(10, "Invalid phone number"),
    hostelName: z.string().min(1, "Hostel name is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
    message: z.string().min(1, "Message is required"), 
  });




export async function POST( req : NextRequest) {
    try {
        
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized access" },
                { status: 401 }
            );
        }

        const body = await req.json();

        const validatedData = listRequestSchema.parse(body);

        const listRequest = await prisma.listHostelRequest.create({
            data: {
                ownerName: validatedData.ownerName,
                contactEmail: validatedData.contactEmail,
                contactPhone: validatedData.contactPhone,
                hostelName: validatedData.hostelName,
                state: validatedData.state,
                city: validatedData.city,
                address: validatedData.address,
                message: validatedData.message,
                userId: session.user.id,
            },

          });
        
          console.log("List request submitted successfully:", listRequest); 
        return NextResponse.json({
            message: "Request submitted successfully",
            data: listRequest,
        })


        
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
              { 
                message: "Invalid request data", 
                errors: error.errors 
              }, 
              { status: 400 }
            );
          }
      
          if (error instanceof Error) {
            console.error("List request error:", error);
            return NextResponse.json(
              { 
                message: "Failed to submit listing request" 
              }, 
              { status: 500 }
            );
          }
      
          return NextResponse.json(
            { 
              message: "An unexpected error occurred" 
            }, 
            { status: 500 }
          );
        }
    }
