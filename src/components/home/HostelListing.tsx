/* eslint-disable react/no-unescaped-entities */

"use client"
import HostelCard from "@/components/home/HostelCard";
import { useFetchHostels } from "@/hooks/useFetchHostels";
import { Hostel } from "@/types";
import { motion } from "framer-motion";
import { BuildingIcon, Loader2, Search, WifiOff, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HostelListing() {
  const { data, isLoading, error } = useFetchHostels({ page: 1 }, 3);
  // Remove console.log that was showing in build output
  const hostels = data?.hostels || [];

  if (isLoading) return (
    <div className="container mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 mb-4 sm:mb-6"
        >
          <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
        </motion.div>
        <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Loading Hostels</h3>
        <p className="text-sm sm:text-base text-muted-foreground">Finding the perfect accommodation for you...</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 w-full max-w-4xl opacity-30">
        {[1, 2, 3].map(i => (
          <div key={i} className="rounded-lg bg-muted/40 animate-pulse h-[260px] sm:h-[320px]"></div>
        ))}
      </div>
    </div>
  );

  if (error) {
    console.error(error);
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center items-center">
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
            className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-100 mb-4 sm:mb-6"
          >
            <WifiOff className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
          </motion.div>
          <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Connection Error</h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">We couldn't load hostels at the moment.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm sm:text-base"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  if (!data || !data.hostels || data.hostels.length === 0) return (
    <div className="container mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center items-center">
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
          className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-yellow-100 mb-4 sm:mb-6"
        >
          <BuildingIcon className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
        </motion.div>
        <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">No Hostels Found</h3>
        <p className="text-sm sm:text-base text-muted-foreground">We couldn't find any hostels matching your criteria.</p>
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <Search className="w-4 h-4" /> 
          <span>Try adjusting your search or check back soon for new listings.</span>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-10">
        <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-10">
          <div className="text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-black">
              Discover Our Finest Stays
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl">
              Discover hostels designed for comfort and convenience, tailored just for you.
            </p>
          </div>
          
          <Link href="/hostels" className="hidden sm:block">
            <Button variant="outline" className="flex items-center gap-1 border-[#902920] text-[#902920] hover:bg-[#902920]/10">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="md:hidden -mx-4 px-2 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex gap-3 snap-x snap-mandatory scrollbar-hide">
            {hostels.map((hostel: Hostel) => (
              <div 
                key={hostel.id} 
                className="snap-center flex-shrink-0 min-w-[280px] w-[calc(100vw-64px)]"
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
        
        <div className="mt-4 sm:mt-6 text-center sm:hidden">
          <Link href="/hostels">
            <Button variant="outline" className="w-full py-2 flex items-center justify-center gap-1 border-[#902920] text-[#902920] hover:bg-[#902920]/10">
              <span>View All Hostels</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}