import MyBookingPage from "@/components/myBookings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bookings | Hostels-NearMe",
  description: "View and manage your hostel bookings in one place",
};

export default async function MyBookings() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/my-bookings");
  }

  return <MyBookingPage />;
}