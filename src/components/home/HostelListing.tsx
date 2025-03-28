"use client"
import HostelCard from "@/components/home/HostelCard";
import { useFetchHostels } from "@/hooks/useFetchHostels";
import { Hostel } from "@/types";

export function HostelListing() {
  const { data, isLoading, error } = useFetchHostels({ page: 1 }, 3);
  console.log("Fetching of the Hostel :::::::" , data?.hostels)
  const hostels = data?.hostels || [];

  if (isLoading) return (
    <div className="container mx-auto px-4 py-8 sm:py-12 flex justify-center items-center">
      <p className="text-lg">Loading...</p>
    </div>
  );

  if (!data || !data.hostels || data.hostels.length === 0) return (
    <div className="container mx-auto px-4 py-8 sm:py-12 flex justify-center items-center">
      <p className="text-lg">No hostels available</p>
    </div>
  );

  if (error) {
    console.error(error);
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12 flex justify-center items-center">
        <p className="text-lg text-red-500">Failed to load hostels</p>
      </div>
    );
  }

  return (
    <div className="bg-white max-h-screen">
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="text-left mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-black">
            Discover Our Finest Stays
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-black max-w-2xl">
            Discover hostels designed for comfort and convenience, tailored just for you.
          </p>
        </div>

        <div className="md:hidden overflow-x-auto -mx-4 pb-6">
          <div className="flex px-4 gap-6 snap-x snap-mandatory scrollbar-hide">
            {hostels.map((hostel: Hostel) => (
              <div 
                key={hostel.id} 
                className="snap-center flex-shrink-0 w-[280px]"
              >
                <HostelCard hostel={hostel} />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {hostels.map((hostel) => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </div>
      </div>
    </div>
  );
}