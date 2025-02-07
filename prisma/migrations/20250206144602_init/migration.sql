/*
  Warnings:

  - Added the required column `userId` to the `ListHostelRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ListHostelRequest" ADD COLUMN     "userId" TEXT NOT NULL;
