import { prisma } from "@/lib/prisma";



export async function createUserWithAccount({username , email, password}) {
  try {

    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password,
            
    }})
    
  } catch (error) {
    console.log("Error creating the user ", error)
    throw error
  }
}

export async function getUserbyEmail(email) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return user
    } catch (error) {
        console.log("Error getting user by email ", error)
        throw error
    }
}