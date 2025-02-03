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

  const booking = bookingSchema.parse(row.original);
  const bookingId = booking.id;

  // ✅ Handle edit navigation
  const handleEdit = () => {
    router.push(`/admin/booking/edit/${bookingId}`);
  };

  // ✅ Handle delete action
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
}
