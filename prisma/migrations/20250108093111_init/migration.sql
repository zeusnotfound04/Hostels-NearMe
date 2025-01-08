/*
  Warnings:

  - You are about to drop the column `bookingCount` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the `Facility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FacilityHostel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FacilityHostel" DROP CONSTRAINT "FacilityHostel_facilityId_fkey";

-- DropForeignKey
ALTER TABLE "FacilityHostel" DROP CONSTRAINT "FacilityHostel_hostelId_fkey";

-- AlterTable
ALTER TABLE "Hostel" DROP COLUMN "bookingCount",
DROP COLUMN "rating",
ADD COLUMN     "Almirah" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "airconditioner" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "allDayElectricity" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "allDayWarden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "allDayWaterSupply" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "attachedWashroom" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "bed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "biweeklycleaning" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cctv" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "chair" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cooler" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "foodIncluded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "generator" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "geyser" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "gym" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "indoorGames" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "inverterBackup" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parking" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pillow" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "securityGuard" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "table" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vegetarienMess" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "waterByRO" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wiFi" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Facility";

-- DropTable
DROP TABLE "FacilityHostel";
