import { Suspense } from "react";
import HostelListing from "@/components/hostels";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="space-y-8">
          {/* Filters skeleton */}
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-36" />
          </div>
          
          {/* Hostels grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[350px] w-full rounded-xl" />
            ))}
          </div>
          
          {/* Pagination skeleton */}
          <div className="flex justify-center gap-2 mt-8">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    }>
      <HostelListing />
    </Suspense>
  );
}