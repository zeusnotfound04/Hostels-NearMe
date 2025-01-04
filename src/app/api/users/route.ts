import { createUserWithAccount } from "@/utils/user";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";  
import { getUserbyEmail } from "@/utils/user"; 

const userSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export default async function handler(req: NextRequest) {
  if (req.method === "POST") {
    try {
      
      const body = await req.json();
      const parsedData = userSchema.safeParse(body);

    
      if (!parsedData.success) {
        return NextResponse.json(
          {
            error: "Validation failed",
            details: parsedData.error.format(), 
          },
          {
            status: 401,
          }
        );
      }

      const { username, email, password } = parsedData.data;

      
      const existingUser = await getUserbyEmail(email);
      if (existingUser) {
        return NextResponse.json(
          {
            error: "User already exists",
          },
          {
            status: 400,
          }
        );
      }

      
      const hashedPassword = await hash(password, 10);

    
      const newUser = await createUserWithAccount({
        username,
        email,
        password: hashedPassword,
      });

      return NextResponse.json(
        {
          message: "User created successfully",
          data: newUser,
        },
        { status: 201 } 
      );
    } catch (error) {
      console.error("Error creating user:", error); // Logging the error for better traceability
      return NextResponse.json(
        {
          message: "Error creating user",
          error: error instanceof Error ? error.message : "Unknown error", // Handling different error types
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Method Not Allowed" },
      { status: 405 }
    );
  }
}
