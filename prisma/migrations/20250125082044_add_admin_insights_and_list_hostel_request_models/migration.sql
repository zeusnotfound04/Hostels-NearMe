-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "AdminInsights" (
    "id" TEXT NOT NULL,
    "totalBookings" INTEGER NOT NULL DEFAULT 0,
    "confirmedBookings" INTEGER NOT NULL DEFAULT 0,
    "cancelledBookings" INTEGER NOT NULL DEFAULT 0,
    "totalUsers" INTEGER NOT NULL DEFAULT 0,
    "newUsersThisMonth" INTEGER NOT NULL DEFAULT 0,
    "activeHostelsCount" INTEGER NOT NULL DEFAULT 0,
    "bookingConversionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cancellationRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "avgBookingsPerUser" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "trendingHostelId" TEXT,
    "listHostelRequests" INTEGER NOT NULL DEFAULT 0,
    "pendingRequests" INTEGER NOT NULL DEFAULT 0,
    "cancelledRequests" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminInsights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListHostelRequest" (
    "id" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "hostelName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListHostelRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ListHostelRequest_status_idx" ON "ListHostelRequest"("status");
