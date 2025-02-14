"use client"
import  HostelCard  from "@/components/home/HostelCard";
import { useFetchHostels } from "@/hooks/useFetchHostels";
import { Hostel } from "@/types";

export function HostelListing() {
  const {data , isLoading , error} = useFetchHostels({ page: 1 }, 3);
  console.log( "This this Raw data", data);
  const hostels = data?.hostels || [];
console.log("This is the Hostel Log",hostels);
  if (isLoading) return <p>Loading...</p>;
  if (!data || !data.hostels || data.hostels.length === 0) return <p>No hostels available</p>;

  if (error) {
    console.error(error);
    return <p>Failed to load hostels</p>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-left mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r text-black bg-clip-text ">
            Discover Our Finest Stays
          </h1>
          <p className="text-lg md:text-xl  text-black max-w-2xl mx-auto">
            Discover hostels designed for comfort and convenience, tailored just for you.
          </p>
        </div>

        <div className="md:hidden -mx-4 px-4">
          <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scrollbar-hide">
            {hostels.length > 0 ? (
              hostels.map((hostel : Hostel) => (
                <div key={hostel.id} className="snap-center flex-shrink-0 w-[300px]">
                  <HostelCard hostel={hostel} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 w-full">No hostels available</p>
            )}
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hostels.length > 0 ? (
            hostels.map((hostel ) => <HostelCard key={hostel.id} hostel={hostel} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">No hostels available</p>
          )}
        </div>
      </div>
    </div>
  );
}
