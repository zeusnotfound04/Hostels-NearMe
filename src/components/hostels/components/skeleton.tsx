import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const HostelSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-64">
          <div className="grid grid-cols-2 gap-0.5">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-6 w-20" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 bg-gray-50">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

export const SkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <HostelSkeleton key={i} />
      ))}
    </div>
  )
}

export default SkeletonGrid;