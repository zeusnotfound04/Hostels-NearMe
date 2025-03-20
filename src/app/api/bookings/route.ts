import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";


const bookingSchema = z.object({
    hostelId : z.string().uuid(),
    hostelName : z.string(),
    name: z.string(),
    terms : z.boolean(),
    phoneNumber: z.string().max(15, "String must contain at most 15 characters").regex(/^\+?[0-9]*$/, "Invalid phone number"),
    userGender : z.enum(["MALE" , "FEMALE"]),
    address : z.string()

})



export async function POST(req:Request) {

    try {
        const session = await getServerSession(authOptions);
        if (!session?.user){
            return NextResponse.json({ error : "Unauthorized"} , { status : 401})
        }

        const userId = session.user.id;
        console.log("USER ID" , userId)
        const body = await req.json();

        console.log(body)
        const validateData = bookingSchema.parse(body)
        console.log(validateData)

            
        const referenceId = `BOOK-${Date.now()}-${Math.random().toString(36).substring(2 , 8).toUpperCase()}`
        

        const booking = await prisma.booking.create({
            data : {
                ...validateData,
                userId,
                referenceId,
                status : "PENDING",
            }
        })

        return NextResponse.json({ message : "Booking created successfully" , booking} , { status : 201})

    } catch (error) {
        console.error("POST /api/booking error: " , error);
        return NextResponse.json({ message : "Failed to Create the Booking" } , { status : 401})
    }
    
}



export async function GET(req:Request) {

    try {
        const session = await getServerSession(authOptions);

        if (!session?.user){
            return NextResponse.json({ error : "Unauthorized"} , { status : 401})
        }



        const user = session.user;
        console.log("USER" , user)
        const role = user.role; 
        console.log("ROLE" , role)
        if ( role !== "ADMIN") {
            return NextResponse.json({ error : "Forbidden : Access is restricted to admins"})
        }


        const booking = await prisma.booking.findMany({
            include : {
                user : {
                    select : { id : true , email : true , username : true}
                }, 
                hostel : {
                    select : { id : true , name : true },
                }
            }
        })
        console.log(booking)

        return NextResponse.json({booking} , {status : 200 })
    } catch (error) {
      console.error("GET /api/booking error" , error)
      return NextResponse.json({ message : "Failed to fetch the bookings"} , { status : 400 })  
    }
    
}