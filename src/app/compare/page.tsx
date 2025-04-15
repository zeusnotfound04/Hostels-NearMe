import { Suspense } from "react";
import CompareComponent from "@/components/compare";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 gap-8">
          <Skeleton className="h-16 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
          <Skeleton className="h-12 w-48" />
        </div>
      </div>
    }>
      <CompareComponent />
    </Suspense>
  );
}