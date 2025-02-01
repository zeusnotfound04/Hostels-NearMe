"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { BookingStatus, Gender } from "@/constants/"
import { DataTableColumnHeader } from "./data-table-column-headers"
import { DataTableRowActions } from "./data-table-row-actions"

interface Booking {
  id: string;
  userId: string;
  username?: string;
  hostelName: string;
  hostelId: string;
  status: BookingStatus;
  referenceId: string;
  phoneNumber: string;
  userGender: Gender;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
{
    accessorKey: "referenceId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reference ID" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
        {row.getValue("referenceId")}
      </div>
    ),
}, 
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => <span>{row.getValue("username")}</span>,
  },
  {
    accessorKey: "hostelName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hostel Name" />
    ),
    cell: ({ row }) => <span>{row.getValue("hostelName")}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const statusKey = row.getValue("status") as keyof typeof BookingStatus;
      const status = BookingStatus[statusKey];
  
      return status ? <Badge variant="outline">{status}</Badge> : null;
    },
  },
  
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => <span>{row.getValue("phoneNumber")}</span>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => <span>{new Date(row.getValue("createdAt")).toLocaleDateString()}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];