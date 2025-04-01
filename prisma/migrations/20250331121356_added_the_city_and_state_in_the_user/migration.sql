-- DropIndex
DROP INDEX "User_email_idx";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT,
ADD COLUMN     "state" TEXT;

-- CreateIndex
CREATE INDEX "User_email_username_idx" ON "User"("email", "username");
