import { createUserWithAccount, getUserbyEmail } from "@/utils/user";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";



const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type UserRequestBody = z.infer<typeof userSchema>;

export async function POST(req: NextRequest) {
  try {
    const body: UserRequestBody = await req.json();
    console.log(body)

    // Validate the request body using Zod
    const parsedBody = userSchema.parse(body);

    const { username, email, password } = parsedBody;
    console.log(parsedBody)

    // Check if user already exists
    console.log(email)
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


    // Hash the password
    const hashedPassword = await hash(password, 10);
    console.log("Hashed Password", hashedPassword)

    // Create new user
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
    if (error instanceof z.ZodError) {
      // Handle Zod validation errors
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.errors, 
        },
        { status: 400 }
      );
    }

    console.error("Error creating user:", error);

    return NextResponse.json(
      {
        message: "Error creating user",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

