"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface Booking {
  id: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  referenceId: string;
  status: string;
  hostel: {
    id: string;
    name: string;
  };
  hostelId: string;
  hostelName: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  userId: string;
  username: string;
  userGender: string;
}


export function DataTable<TData, TValue>({ columns, data  }: DataTableProps<TData, TValue>) {

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-lg border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow 
                  key={headerGroup.id}
                  className="bg-zinc-50  transition-colors hover:bg-zinc-100"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id} 
                      colSpan={header.colSpan}
                      className="text-black font-bold py-4 px-6 whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow 
                    key={row.id} 
                    data-state={row.getIsSelected() && "selected"}
                    className="group transition-colors hover:bg-zinc-50 data-[state=selected]:bg-zinc-100"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id}
                        className="py-3 px-6 font-medium text-zinc-900 whitespace-nowrap overflow-hidden text-ellipsis max-w-md transition-colors group-hover:text-[#7E2424]"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="truncate">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </span>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell 
                    colSpan={columns.length} 
                    className="h-24 text-center text-zinc-500 animate-fade-in"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePagination table={table} />
      
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { transform: translateX(-10px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .table-row-slide {
          animation: slide-in 0.2s ease-out;
        }

        [data-state=selected] {
          background-color: rgba(126, 36, 36, 0.05);
          border-left: 2px solid #7E2424;
        }

        .hover\:shadow-md:hover {
          box-shadow: 0 4px 6px -1px rgba(126, 36, 36, 0.1), 
                      0 2px 4px -1px rgba(126, 36, 36, 0.06);
        }

        .overflow-x-auto::-webkit-scrollbar {
          height: 8px;
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}