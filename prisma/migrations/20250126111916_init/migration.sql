-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "HostelGender" AS ENUM ('BOYS', 'GIRLS');

-- CreateEnum
CREATE TYPE "HostelType" AS ENUM ('SINGLE', 'SHARED', 'DORMITORY');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "gender" "Gender",
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hostel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "hostelType" "HostelType" NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "images" TEXT[],
    "gender" "HostelGender" NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "isNonVeg" BOOLEAN NOT NULL DEFAULT false,
    "Almirah" BOOLEAN NOT NULL DEFAULT false,
    "attachedWashroom" BOOLEAN NOT NULL DEFAULT false,
    "cctv" BOOLEAN NOT NULL DEFAULT false,
    "chair" BOOLEAN NOT NULL DEFAULT false,
    "cooler" BOOLEAN NOT NULL DEFAULT false,
    "inverterBackup" BOOLEAN NOT NULL DEFAULT false,
    "parking" BOOLEAN NOT NULL DEFAULT false,
    "biweeklycleaning" BOOLEAN NOT NULL DEFAULT false,
    "allDayElectricity" BOOLEAN NOT NULL DEFAULT false,
    "generator" BOOLEAN NOT NULL DEFAULT false,
    "geyser" BOOLEAN NOT NULL DEFAULT false,
    "indoorGames" BOOLEAN NOT NULL DEFAULT false,
    "pillow" BOOLEAN NOT NULL DEFAULT false,
    "waterByRO" BOOLEAN NOT NULL DEFAULT false,
    "securityGuard" BOOLEAN NOT NULL DEFAULT false,
    "table" BOOLEAN NOT NULL DEFAULT false,
    "wiFi" BOOLEAN NOT NULL DEFAULT false,
    "foodIncluded" BOOLEAN NOT NULL DEFAULT false,
    "bed" BOOLEAN NOT NULL DEFAULT false,
    "vegetarienMess" BOOLEAN NOT NULL DEFAULT false,
    "allDayWaterSupply" BOOLEAN NOT NULL DEFAULT false,
    "gym" BOOLEAN NOT NULL DEFAULT false,
    "allDayWarden" BOOLEAN NOT NULL DEFAULT false,
    "airconditioner" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hostel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminHostel" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "hostelId" TEXT NOT NULL,

    CONSTRAINT "AdminHostel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT,
    "hostelName" TEXT NOT NULL,
    "hostelId" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "referenceId" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "userGender" "Gender" NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Admin_email_idx" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_referenceId_key" ON "Booking"("referenceId");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "ListHostelRequest_status_idx" ON "ListHostelRequest"("status");

-- AddForeignKey
ALTER TABLE "AdminHostel" ADD CONSTRAINT "AdminHostel_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminHostel" ADD CONSTRAINT "AdminHostel_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
