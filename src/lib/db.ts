import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

const globalForPrisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.envNODE_ENV === "development") globalForPrisma.prisma = prisma;

export const db = prisma;