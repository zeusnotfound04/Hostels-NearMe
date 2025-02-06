/*
  Warnings:

  - You are about to drop the column `location` on the `ListHostelRequest` table. All the data in the column will be lost.
  - Added the required column `address` to the `ListHostelRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `ListHostelRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `ListHostelRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ListHostelRequest" DROP COLUMN "location",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
