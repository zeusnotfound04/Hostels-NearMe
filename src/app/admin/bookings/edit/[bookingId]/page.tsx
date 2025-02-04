import { Suspense } from 'react';
import { notFound } from "next/navigation";
import BookingEditForm from "@/components/bookings/EditBookings";
import { getBookingData } from "@/actions/bookings/getBookingData"; // Using your existing function
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Booking } from "@/types";

// Async Server Component to fetch booking data
async function BookingContent({ bookingId }: { bookingId: string }) {
  const booking  = await getBookingData(bookingId);
  
  if (!booking) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Booking</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage and update booking details for {booking.referenceId}
        </p>
      </div>

      <BookingEditForm booking={booking} />
    </div>
  );
}

// Main page component
export default async function BookingEditPage({ 
  params: { bookingId } 
}: { 
  params: { bookingId: string } 
}) {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <Card>
          <CardHeader>
            <CardTitle>Loading Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      }>
        <BookingContent bookingId={bookingId} />
      </Suspense>
    </div>
  );
}