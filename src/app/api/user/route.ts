import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import {hash} from "bcrypt";

export async function POST (req : Request) {


    try {
        const body = await req.json()

        const { email , username , password } = body;


        //check if email is already in use
        const existingUserByEmail = await db.user.findUnique({
            where: {
                email : email 
            }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user : null ,error: "User already exists"}, {status : 409});
        }
        //check if username is already in use

        const existingUserByUsername = await db.user.findUnique({
            where : {
                username : username
            }
        });
        if (existingUserByUsername) {
            return NextResponse.json({ user : null , error : "Username already exists"}, {status : 409});
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data : {
                email,
                username,
                password : hashedPassword
            }
        });
        
        return NextResponse.json({ user : newUser , message : "User created successfully"}, {status : 201});
        
    } catch (error) {
        
    }


}