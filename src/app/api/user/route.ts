import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import {hash} from "bcrypt";
import * as z from "zod";

//Define a schema for input validation


const userSchema = z.object({
    username : z.string().min(1, "username is required").max(100),
    email : z.string().email("Invalid email").min(1, "email is required").max(100),
    password: z.string().min(1, "Password is required").min(8, "password must be at least 8 characters long").max(100)

});


export async function POST (req : Request) {


    try {
        const body = await req.json()

        const { email , username , password } = userSchema.parse(body);


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

        const {password: newUserPassword , ...rest} = newUser;
        
        return NextResponse.json({ user : rest , message : "User created successfully"}, {status : 201});
        
    } catch (error) {
        return NextResponse.json({ user : rest , message : "something went wrong"}, {status : 501});
    }


}