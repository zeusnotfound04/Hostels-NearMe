"use client";

import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import { GenderIcon, BedIcon, SharingIcon, SortingIcon, NextIcon } from "@/components/ui/icon";
import Image from "next/image";
import { HostelCard } from "./HostelCard";
import { useFetchHostels } from "@/hooks/useFetchHostels";
import FacilityIcon from "../../../public/icons/Facility.png";
import { Hostel } from "@/types/index";
import LoadingScreen from "@/components/LoadingScreen";

const filterOptions = [
  { id: 1, name: "Gender", icon: <GenderIcon className="w-4 h-4" /> },
  { id: 2, name: "Accommodation type", icon: <BedIcon className="w-4 h-4" /> },
  { id: 3, name: "Facility type", icon: <Image src={FacilityIcon} width={16} height={16} alt="Facility" /> },
  { id: 4, name: "Sharing type", icon: <SharingIcon className="w-4 h-4" /> },
  { id: 5, name: "Sort", icon: <SortingIcon className="w-4 h-4" /> },
];

export default function Page() {
  const { data, isLoading, error } = useFetchHostels({ page: 1 }, 7);
  const hostels = data?.hostels || [];

  if (isLoading) {
    return (
      <LoadingScreen/>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">Error loading hostels.</p>
      </div>
    );
  }

  return (
    <div className="px-4 mt-2 md:px-6 max-w-6xl mx-auto">
      <div className="flex gap-2 mb-6 justify-center overflow-x-auto">
        {filterOptions.map((filter) => (
          <Button
            key={filter.id}
            variant="outline"
            className="min-w-[120px] h-10 sm:h-8 bg-[#cecece] rounded-full border border-[#902920] flex items-center gap-1 px-4 sm:px-3 text-sm transition duration-150 ease-in-out hover:bg-[#d3d3d3]"
          >
            <span className="mr-1">{filter.icon}</span>
            <span className="font-normal text-black text-xs md:text-sm">
              {filter.name}
            </span>
            <ChevronDownIcon className="w-3 h-3 ml-1" />
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        {hostels.map((hostel: Hostel) => (
          <HostelCard key={hostel.id} hostel={hostel} />
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-4">
        <Button className="w-[50px] h-[50px] bg-[#902920] text-white rounded-[10px] p-0">
          <span className="font-black text-[25px]">1</span>
        </Button>
        <Button className="w-[50px] h-[50px] bg-[#902920] text-white rounded-[10px] p-0">
          <NextIcon className="w-7 h-[18px]" />
        </Button>
      </div>


      <div className="text-center mt-10 font-bold text-gray-600 text-xl">
        <p>Made in <span className="text-red-900">India</span>. For the <span className="text-red-900">World</span></p>
      </div>
    </div>
  );
}
