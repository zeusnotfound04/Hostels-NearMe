/*
  Warnings:

  - You are about to drop the column `houseRules` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Hostel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hostel" DROP COLUMN "houseRules",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "isNonVeg" BOOLEAN NOT NULL DEFAULT false;
