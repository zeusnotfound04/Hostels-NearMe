import { prisma } from "@/lib/prisma";


interface User {
    username: string;
    email: string;
    password: string;
}


export async function createUserWithAccount({ username, email, password }: User) {
  console.log({
    username,
    email,
    password
  });
  try {
  
    const newUser = await prisma.user.create({
        data:{
          username : username,
          email: email,
          password : password
        }
    });
    console.log("New user created: ", newUser);
    
    return newUser; 
  } catch (error) {
    console.log("Error creating the user: ", error);
    throw error; 
  }
}


export async function getUserbyEmail(email: User['email']) {
  try {
    console.log("Fetching user by email...");
    const user = await prisma.user.findUnique({
        where: {
            email
        },
    });
    console.log(user)
 

    return user; 
  } catch (error) {
    console.log("Error getting user by email: ", error);
    throw error
   
  }
}


export const isAdmin = (role: string | undefined) => role === "ADMIN";