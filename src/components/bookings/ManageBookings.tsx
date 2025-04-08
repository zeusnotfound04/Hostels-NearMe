"use client";

import { bookingColumns } from "@/components/bookings/components/columns";
import { DataTable } from "@/components/bookings/components/data-table";
import { useBookings } from "@/hooks/useBookings";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import AdminLoadingScreen from "../loading/AdminLoader";

export default function ManagingBooking() {
  const { data: bookings, isLoading, error } = useBookings();
  if (isLoading) {
    return <AdminLoadingScreen />;
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="border-b border-zinc-200 bg-white">
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold text-zinc-900">Manage Bookings</h1>
        </div>
      </header>

      <main className="flex-1 space-y-8 p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
              Welcome back!
            </h2>
            <p className="text-sm text-zinc-500">
              Here&apos;s a list of your bookings for this month!
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to fetch bookings: {error.message}
            </AlertDescription>
          </Alert>
        )}

        <DataTable 
          data={bookings || []} 
          columns={bookingColumns} 
          isLoading={isLoading}
        />

        {!isLoading && bookings?.length === 0 && (
          <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center">
            <h3 className="text-lg font-medium text-zinc-900 mb-1">
              No bookings found
            </h3>
            <p className="text-sm text-zinc-500">
              When you create bookings, they will appear here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}