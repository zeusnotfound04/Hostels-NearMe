import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

interface User {
  name: string;
  username: string;
  email: string;
  password: string;
}

/**
 * Creates a new user with account
 * @param userData User data containing name, username, email, and password
 * @returns The created user object
 */
export async function createUserWithAccount({ name, username, email, password }: User) {
  try {
    // Check if user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Create the new user
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password, // Note: Password should be hashed before saving
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

/**
 * Gets a user by email
 * @param email User's email address
 * @returns The user object if found, or null
 */
export async function getUserbyEmail(email: User['email']) {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  }
}

/**
 * Checks if a user has admin role
 * @param role User's role
 * @returns boolean indicating if user is an admin
 */
export const isAdmin = (role: string | undefined): boolean => role === UserRole.ADMIN;