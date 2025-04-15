import { createUserWithAccount, getUserbyEmail } from "@/utils/user";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";



const userSchema = z.object({
  name: z.string().min(3, "Username must be at least 3 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type UserRequestBody = z.infer<typeof userSchema>;

export async function POST(req: NextRequest) {
  try {
    const body: UserRequestBody = await req.json();
    console.log(body)

   
    const parsedBody = userSchema.parse(body);

    const { name, username, email, password } = parsedBody;
    console.log(parsedBody)

   
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


    const hashedPassword = await hash(password, 10);
    console.log("Hashed Password", hashedPassword)

    const newUser = await createUserWithAccount({
      name,
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

