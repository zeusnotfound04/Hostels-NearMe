import { blogRequiredFields } from "@/constants";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/utils/user";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";







export async function POST(req:NextRequest) {
    try {
            const session = await getServerSession(authOptions);
        
            if (!session || !session.user || !session.user.id || !isAdmin(session.user.role)) {
              return NextResponse.json(
                { error: "You must be logged in and must be an admin to create a hostel" },
                { status: 401 }
              );
            }

            const body = await req.json();

            console.log("Blog data in the backend !" , body)

            const missingFields  = blogRequiredFields.filter(field => !body[field]);

            if (missingFields.length > 0) {
                    return NextResponse.json(
                        {error : `Missing required fields ${missingFields.join(",")}`},
                        { status : 400}
                    )
            }


            
        
    } catch (error) {
        
    }
}