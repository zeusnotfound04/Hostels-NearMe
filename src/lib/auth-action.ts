"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function login(formData: FormData): Promise<void> {
  const supabase = createClient();
  
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: { session }, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Error during login:", error);
    redirect("/error");
  }

  if (!session) {
    console.error("No session created");
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}


export async function signup(formData: FormData): Promise<void> {
  const supabase = createClient();

  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;

  const data: {
    email: string;
    password: string;
    options: { data: { full_name: string; email: string } };
  } = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: `${firstName} ${lastName}`,
        email: formData.get("email") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.error("Error during signup:", error);
    redirect("/error");
  }

  // Automatically create the user in the Prisma database after signup
  try {
    await prisma.user.create({
      data: {
        email: data.email,
        name: `${firstName} ${lastName}`,
        role: "USER",
        password: "supabase_managed", // Dummy password since Supabase manages it
      },
    });
  } catch (dbError) {
    console.error("Error creating user in database:", dbError);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signout(): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error during signout:", error);
    redirect("/error");
  }

  redirect("/logout");
}

export async function signInWithGoogle(): Promise<void> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("Error during Google sign-in:", error);
    redirect("/error");
  }

  // After successful sign-in, fetch the user details and sync with the Prisma database
  try {
    const { data: userResponse, error: userError } = await supabase.auth.getUser();

    if (userError || !userResponse?.user) {
      throw new Error(userError?.message || "User not found");
    }

    const { user } = userResponse;
    const email = user.email || "";
    const userName: string = user.user_metadata?.full_name || "Unknown";

    // Check if the user exists in the Prisma database
    const existingUser: User | null = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // Update user details if necessary
      await prisma.user.update({
        where: { email },
        data: {
          name: userName,
        },
      });
    } else {
      // Create a new user record in the database
      await prisma.user.create({
        data: {
          id: user.id,
          email: email,
          name: userName,
          role: "USER",
          password: "supabase_managed", // Dummy password
        },
      });
    }
  } catch (syncError) {
    console.error("Error syncing user with database:", syncError);
  }

  if (data?.url) {
    redirect(data.url);
  }
}
