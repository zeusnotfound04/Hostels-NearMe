"use client";

import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { bookingSchema } from "@/components/bookings/schema/schema";
import { useDeleteBookings } from "@/hooks/useDeleteBookings";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const deleteBooking = useDeleteBookings();

  // Parse the booking data safely with error handling
  try {
    const booking = bookingSchema.parse(row.original);
    const bookingId = booking.id;
    
    const handleEdit = () => {
      router.push(`/admin/bookings/edit/${bookingId}`);
    };

    const handleDelete = () => {
      deleteBooking.mutate(bookingId);
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>

          {/* Enhanced Delete Action with Bold Text */}
          <DropdownMenuItem
            onClick={handleDelete}
            className="text-red-500 font-bold"
          >
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } catch (error) {
    console.error("Error parsing booking data:", error);
    // Return a disabled or fallback UI when parsing fails
    return (
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 opacity-50"
        disabled
      >
        <MoreHorizontal />
        <span className="sr-only">Actions unavailable</span>
      </Button>
    );
  }
}
