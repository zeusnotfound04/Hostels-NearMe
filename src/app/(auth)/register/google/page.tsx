import { Suspense } from "react";
import GoogleRegister from "@/components/auth/GoogleRegister";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="max-w-md w-full mx-4 md:mx-auto p-6 md:p-8 rounded-md shadow-lg bg-white dark:bg-black">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-8" />
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-10 w-full mb-6" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    }>
      <GoogleRegister />
    </Suspense>
  );
}