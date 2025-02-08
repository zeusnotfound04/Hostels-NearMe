import { updateAdminInsights } from "@/actions/adminInsights/insight";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/utils/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    try {

        await updateAdminInsights();
        const session = await getServerSession(authOptions);

        if(!session?.user?.id || !isAdmin(session.user.role)){
            return NextResponse.json(
                { error : "Unauthorized access" ,status : 401} ,
)
        }

        const insights = await prisma.adminInsights.findUnique({
            where : {
                id : "1"
            }
        });

        if (!insights){
            return NextResponse.json(
                
                { error : "Insights not found" , timestamp : new Date().toISOString() , status : 404},
                
            )
        }
        console.log("Insights in the backend :", insights)


        return NextResponse.json({...insights , timestamp : new Date().toISOString() , status : 200});
    } catch (error) {
        console.error("GET /api/insights error:", error);
        return NextResponse.json(
          { 
            error: "Failed to fetch insights",
            message: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
            timestamp: new Date().toISOString()
          },
          { status: 500 }
        );
    }
}