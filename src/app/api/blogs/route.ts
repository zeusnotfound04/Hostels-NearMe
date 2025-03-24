import { blogRequiredFields } from "@/constants";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blogData } from "@/types";
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

            const body: blogData = await req.json();

            console.log("Blog data in the backend !" , body)    

            const missingFields  = blogRequiredFields.filter((field  ) => !body[field as keyof blogData]);

            if (missingFields.length > 0) {
                    return NextResponse.json(
                        {error : `Missing required fields ${missingFields.join(",")}`},
                        { status : 400}
                    )
            }

            const blog = await prisma.blog.create({
                data: {
                    title : body.title,
                    content : body.city,
                    city : body.city,
                    image : body.image,

                    createdAt : new Date(),
                    updatedAt : new Date()
                    
                }
            })

             return NextResponse.json(
                  { message: "Hostel Created Successfully", blog },
                  { status: 201 }
                );
            
            
        
    } catch (error) {
        console.error("Error creating hostel:", error);
    return NextResponse.json(
      { 
        error: "Failed to create hostel",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
    }
}


export async function GET(request: NextRequest) {
    try {
  
      const { searchParams } = new URL(request.url);
      const cityQuery = searchParams.get('city') || '';
  
      const blogs = await prisma.blog.findMany({
        where: {
          ...(cityQuery ? { 
            city: { 
              contains: cityQuery, 
              mode: 'insensitive' 
            } 
          } : {})
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
  
      return NextResponse.json(blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blogs' }, 
        { status: 500 }
      );
    }
  }