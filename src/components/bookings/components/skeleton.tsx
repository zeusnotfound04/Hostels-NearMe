import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";





export const BookingDetailsSkeleton = () => {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl sm:rounded-3xl border border-gray-200">
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4 sm:pb-6 lg:pb-8 gap-4 sm:gap-0">
            <Skeleton className="h-12 sm:h-14 lg:h-16 w-64 sm:w-72 lg:w-96" />
            <Skeleton className="h-8 sm:h-10 lg:h-12 w-32 sm:w-36 lg:w-40 rounded-full" />
          </div>
          
          <div className="mt-4 sm:mt-6 lg:mt-8">
            <Skeleton className="h-6 sm:h-7 w-48 mb-2" />
            <Skeleton className="h-8 sm:h-10 lg:h-12 w-64 sm:w-72 lg:w-96" />
          </div>
          <Skeleton className="mt-2 sm:mt-3 lg:mt-4 h-5 sm:h-6 w-72" />
        </div>
  
        <div className="mb-8 sm:mb-10 lg:mb-14">
          <Skeleton className="h-8 sm:h-10 lg:h-12 w-56 mb-4 sm:mb-6 lg:mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl sm:rounded-2xl border border-gray-300">
                <Skeleton className="h-7 sm:h-8 w-48 mb-3 sm:mb-4 lg:mb-6" />
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-5 sm:h-6 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <Skeleton className="h-8 sm:h-10 lg:h-12 w-56 mb-4 sm:mb-6 lg:mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl sm:rounded-2xl border border-gray-300">
                <Skeleton className="h-5 sm:h-6 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };



export  const DataTableSkeleton = ({ columns } : any ) => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-[250px]" /> {/* Search bar skeleton */}
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-[100px]" /> {/* Filter button skeleton */}
            <Skeleton className="h-8 w-[100px]" /> {/* View button skeleton */}
          </div>
        </div>
  
        <div className="rounded-lg border border-zinc-200 bg-white shadow-sm transition-all duration-200">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-zinc-50">
                  {columns.map((column, index) => (
                    <TableHead 
                      key={index}
                      className="text-black font-bold py-4 px-6 whitespace-nowrap"
                    >
                      <Skeleton className="h-4 w-24" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <TableRow 
                    key={rowIndex}
                    className="group transition-colors hover:bg-zinc-50"
                  >
                    {Array.from({ length: columns.length }).map((_, cellIndex) => (
                      <TableCell 
                        key={cellIndex}
                        className="py-3 px-6 font-medium text-zinc-900 whitespace-nowrap"
                      >
                        <div className="flex items-center space-x-2">
                          {cellIndex === 0 && ( // If it's the first column, add a small square skeleton
                            <Skeleton className="h-4 w-4 rounded" />
                          )}
                          <Skeleton className={`h-4 ${cellIndex === 0 ? 'w-24' : 'w-32'}`} />
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
  
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-[200px]" /> {/* Rows per page skeleton */}
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8" /> {/* Previous page button */}
            <Skeleton className="h-8 w-8" /> {/* Page number */}
            <Skeleton className="h-8 w-8" /> {/* Next page button */}
          </div>
        </div>
      </div>
    );
  };