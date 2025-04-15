import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, name, username, password, providerAccountId } = await request.json();

    // Validate that we have all required fields
    if (!email || !name || !username || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: {
        accounts: {
          where: { provider: 'google' }
        }
      }
    });

    const hashedPassword = await hash(password, 10);

    if (existingUser) {
      await prisma.user.update({
        where: { email },
        data: {
          name,
          username,
          password: hashedPassword,
        },
      });

      if (existingUser.accounts.length === 0 && providerAccountId) {
        await prisma.account.create({
          data: {
            userId: existingUser.id,
            type: 'oauth',
            provider: 'google',
            providerAccountId,
          }
        });
      }

      return NextResponse.json(
        { message: "User information updated successfully" },
        { status: 200 }
      );
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { message: "Username is already taken" },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        username,
        password: hashedPassword,
        role: "USER",
      },
    });

    if (providerAccountId) {
      await prisma.account.create({
        data: {
          userId: newUser.id,
          type: 'oauth',
          provider: 'google',
          providerAccountId,
        }
      });
    }

    return NextResponse.json(
      { message: "User registered successfully", userId: newUser.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { message: "Error registering user" },
      { status: 500 }
    );
  }
}