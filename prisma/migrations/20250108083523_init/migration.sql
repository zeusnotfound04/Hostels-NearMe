/*
  Warnings:

  - You are about to drop the column `bookedSlots` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `totalSlots` on the `Hostel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hostel" DROP COLUMN "bookedSlots",
DROP COLUMN "tags",
DROP COLUMN "totalSlots";
