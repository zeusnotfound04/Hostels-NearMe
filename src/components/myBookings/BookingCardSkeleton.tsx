import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BookingCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-2 hover:shadow-lg transition-all duration-200">
      <CardHeader className="bg-gradient-to-r from-[#902920]/30 to-[#a33f36]/30 p-5">
        <div className="flex justify-between items-center">
          <div className="space-y-3">
            <Skeleton className="h-6 w-40 bg-white/30" />
            <Skeleton className="h-4 w-24 bg-white/20" />
          </div>
          <Skeleton className="h-7 w-24 rounded-full bg-white/20" />
        </div>
      </CardHeader>
      
      <CardContent className="p-5 space-y-6">
        <div className="flex items-start space-x-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full max-w-[260px]" />
            <Skeleton className="h-4 w-full max-w-[190px]" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 bg-gray-50 flex justify-between items-center">
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </CardFooter>
    </Card>
  );
};

export default BookingCardSkeleton;