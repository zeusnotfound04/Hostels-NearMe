"use client"
import HostelCard from "@/components/home/HostelCard";
import { useFetchHostels } from "@/hooks/useFetchHostels";
import { Hostel } from "@/types";
import { motion } from "framer-motion";
import { BuildingIcon, Loader2, Search, Wifi, WifiOff, HomeIcon } from "lucide-react";

export function HostelListing() {
  const { data, isLoading, error } = useFetchHostels({ page: 1 }, 3);
  console.log("Fetching of the Hostel :::::::" , data?.hostels)
  const hostels = data?.hostels || [];

  if (isLoading) return (
    <div className="container mx-auto px-4 py-12 sm:py-16 flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
        >
          <Loader2 className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">Loading Hostels</h3>
        <p className="text-muted-foreground">Finding the perfect accommodation for you...</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-4xl opacity-30">
        {[1, 2, 3].map(i => (
          <div key={i} className="rounded-lg bg-muted/40 animate-pulse h-[320px]"></div>
        ))}
      </div>
    </div>
  );

  if (error) {
    console.error(error);
    return (
      <div className="container mx-auto px-4 py-12 sm:py-16 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div 
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6"
          >
            <WifiOff className="w-8 h-8 text-red-500" />
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">Connection Error</h3>
          <p className="text-muted-foreground mb-6">We couldn't load hostels at the moment.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!data || !data.hostels || data.hostels.length === 0) return (
    <div className="container mx-auto px-4 py-12 sm:py-16 flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-6"
        >
          <BuildingIcon className="w-8 h-8 text-yellow-600" />
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">No Hostels Found</h3>
        <p className="text-muted-foreground">We couldn't find any hostels matching your criteria.</p>
        <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Search className="w-4 h-4" /> 
          <span>Try adjusting your search or check back soon for new listings.</span>
        </div>
      </motion.div>
    </div>
  );

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