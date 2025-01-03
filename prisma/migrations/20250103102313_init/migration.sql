/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `Hostel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hostel" DROP COLUMN "contactNumber",
DROP COLUMN "createdBy",
DROP COLUMN "email",
DROP COLUMN "updatedBy";
