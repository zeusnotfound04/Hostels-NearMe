/*
  Warnings:

  - You are about to drop the column `location` on the `Hostel` table. All the data in the column will be lost.
  - Added the required column `city` to the `Hostel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Hostel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Hostel_location_idx";

-- AlterTable
ALTER TABLE "Hostel" DROP COLUMN "location",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
