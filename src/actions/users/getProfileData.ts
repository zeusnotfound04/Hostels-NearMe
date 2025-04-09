import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getProfileData = cache(async (userId : string | undefined) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      gender: true,
      city: true,
      state: true,
      role: true,
      createdAt: true,
      pfpUrl: true,
    },
  });

  return user || { error: "User not found" };
});
