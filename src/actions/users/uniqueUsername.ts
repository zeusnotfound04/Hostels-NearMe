import { prisma } from "@/lib/prisma";

export default async function isUsernameUnique(username: string): Promise<boolean> {
    try {
      const count = await prisma.user.count({
        where: { username }
      });
  
      return count === 0;
    } catch (error) {
      console.error('Error checking username uniqueness:', error);
      throw new Error('Failed to check username uniqueness');
    }
  }
    