"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { BookingStatus } from "@/constants/" // Import your booking status enum
import { DataTableFacetedFilter } from "./data-table-faceterd-filter"

// Define the status options based on your BookingStatus enum
const bookingStatuses = Object.entries(BookingStatus).map(([value, label]) => ({
  value,
  label,
}))

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by reference..."
          value={(table.getColumn("referenceId")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("referenceId")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={bookingStatuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}