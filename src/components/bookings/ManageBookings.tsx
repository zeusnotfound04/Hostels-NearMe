"use client";

import { useQuery } from "@tanstack/react-query";
import { bookingColumns } from "@/components/bookings/components/columns";
import { DataTable } from "@/components/bookings/components/data-table";
import { useBookings } from "@/hooks/useBookings";



export default function ManagingBooking() {
  const { data : bookings, isLoading, error } = useBookings();
 

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Manage Bookings</h1>
      </div>

      <div className="h-full flex-1 flex-col space-y-8 p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your bookings for this month!
            </p>
          </div>
        </div>

        {isLoading && <p>Loading bookings...</p>}
        {error && (
          <p className="text-red-500">Error fetching bookings: {error.message}</p>
        )}

        {/* Only render the table when we have data */}
        {bookings && bookings.length > 0 ? (
          <DataTable data={bookings} columns={bookingColumns} />
        ) : (
          !isLoading && <p>No bookings found.</p>
        )}
      </div>
    </>
  );
} 