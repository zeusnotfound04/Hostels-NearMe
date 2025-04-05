"use client";

import React, { useEffect, useState, useRef } from "react";
import { Send, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LocationIcon,
  HostelIcon,
  BoysIcon,
} from "@/components/ui/icon";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SearchParams {
  search: string;
  hostelType: "SINGLE" | "SHARED" | "DORMITORY";
  gender: "BOYS" | "GIRLS";
}

interface HostelSearchBarProps {
  className?: string;
  positionStyle?: string;
  buttonStyle?: string;
  animatePlaceholder?: boolean;
}

const HostelSearchBar = ({
  className = "",
  positionStyle = "",
  buttonStyle = "",
  animatePlaceholder = false,
}: HostelSearchBarProps) => {
  const router = useRouter();

  const [searchParams, setSearchParams] = useState<SearchParams>({
    search: "",
    hostelType: "SINGLE",
    gender: "BOYS",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const placeholderTexts = [
    "Search Hostel by Nearby Coaching",
    "Search by Hostel Type",
    "Search by Gender",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const ANIMATION_DURATION = 800;
  const DISPLAY_DURATION = 3000;

  useEffect(() => {
    if (!animatePlaceholder) return;

    // Clear any existing interval
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % placeholderTexts.length);
        setIsAnimating(false);
      }, ANIMATION_DURATION);
    }, DISPLAY_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [animatePlaceholder]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleHostelTypeChange = (value: SearchParams["hostelType"]) => {
    setSearchParams((prev) => ({ ...prev, hostelType: value }));
  };

  const handleGenderChange = (value: SearchParams["gender"]) => {
    setSearchParams((prev) => ({ ...prev, gender: value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchParams.search) {
      params.append("search", searchParams.search);
    }

    params.append("hostelType", searchParams.hostelType);
    params.append("gender", searchParams.gender);

    router.push(`/hostels?${params.toString()}`);
    setIsDialogOpen(false);
  };

  const renderAnimatedPlaceholder = () => {
    const nextIndex = (currentIndex + 1) % placeholderTexts.length;

    return (
      <div className="relative overflow-hidden h-6 sm:h-8 ml-2 w-full">
        <div
          style={{
            transition: `transform ${ANIMATION_DURATION}ms ease-out, opacity ${ANIMATION_DURATION}ms ease-out`,
            transform: isAnimating ? "translateY(-100%)" : "translateY(0)",
            opacity: isAnimating ? 0 : 1,
          }}
          className="absolute w-full"
        >
          <div className="h-6 sm:h-8 text-gray-400 text-base sm:text-lg">
            {placeholderTexts[currentIndex]}
          </div>
        </div>
        <div
          style={{
            transition: `transform ${ANIMATION_DURATION}ms ease-out, opacity ${ANIMATION_DURATION}ms ease-out`,
            transform: isAnimating ? "translateY(0)" : "translateY(100%)",
            opacity: isAnimating ? 1 : 0,
          }}
          className="absolute w-full"
        >
          <div className="h-6 sm:h-8 text-gray-400 text-base sm:text-lg">
            {placeholderTexts[nextIndex]}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Desktop */}
      <div className={`${positionStyle} max-w-4xl mx-auto hidden md:flex`}>
        <div className="flex items-center w-[50%] px-2 sm:px-4">
          <LocationIcon width={24} height={24} className="sm:w-[35px] sm:h-[35px]" />

          {searchParams.search ? (
            <input
              type="text"
              placeholder="Enter your destination"
              className="w-full outline-none text-gray-700 text-base sm:text-lg pl-2"
              value={searchParams.search}
              onChange={handleInputChange}
            />
          ) : animatePlaceholder ? (
            renderAnimatedPlaceholder()
          ) : (
            <span className="ml-2 text-gray-400 text-base sm:text-lg">
              Enter your destination
            </span>
          )}
        </div>

        {/* Hostel Type */}
        <div className="w-full sm:w-auto sm:border-l border-gray-400 px-2 sm:px-4 flex items-center">
          <HostelIcon className="w-6 h-6 sm:w-auto sm:h-auto" />
          <div className="w-full">
            <Select value={searchParams.hostelType} onValueChange={handleHostelTypeChange}>
              <SelectTrigger className="w-full border-none shadow-none focus:ring-0 text-sm sm:text-base">
                <SelectValue placeholder="Select hostel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SINGLE">SINGLE</SelectItem>
                <SelectItem value="SHARED">SHARED</SelectItem>
                <SelectItem value="DORMITORY">DORMITORY</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Gender */}
        <div className="w-full sm:w-auto sm:border-l border-gray-400 px-2 sm:px-6 flex items-center sm:min-w-[200px]">
          <div className="w-6 h-6">
            <BoysIcon />
          </div>
          <div className="w-full">
            <Select value={searchParams.gender} onValueChange={handleGenderChange}>
              <SelectTrigger className="w-full border-none shadow-none focus:ring-0 text-sm sm:text-base">
                <SelectValue placeholder="Select hostel gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BOYS">Boys Hostel</SelectItem>
                <SelectItem value="GIRLS">Girls Hostel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Button */}
        <button className={`${buttonStyle}`} onClick={handleSearch}>
          Let's go
          <Send className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Mobile View */}
      <div className="md:hidden w-full">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div className="w-full bg-white rounded-full px-4 py-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-2">
                <LocationIcon width={24} height={24} />
                {searchParams.search ? (
                  <span className="text-gray-500">{searchParams.search}</span>
                ) : animatePlaceholder ? (
                  <div className="relative overflow-hidden h-5 w-[160px]">
                    <div
                      style={{
                        transition: `transform ${ANIMATION_DURATION}ms ease-out, opacity ${ANIMATION_DURATION}ms ease-out`,
                        transform: isAnimating ? "translateY(-100%)" : "translateY(0)",
                        opacity: isAnimating ? 0 : 1,
                      }}
                      className="absolute w-full"
                    >
                      <div className="h-5 text-sm text-gray-400">
                        {placeholderTexts[currentIndex]}
                      </div>
                    </div>
                    <div
                      style={{
                        transition: `transform ${ANIMATION_DURATION}ms ease-out, opacity ${ANIMATION_DURATION}ms ease-out`,
                        transform: isAnimating ? "translateY(0)" : "translateY(100%)",
                        opacity: isAnimating ? 1 : 0,
                      }}
                      className="absolute w-full"
                    >
                      <div className="h-5 text-sm text-gray-400">
                        {placeholderTexts[(currentIndex + 1) % placeholderTexts.length]}
                      </div>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Enter your destination</span>
                )}
              </div>
              <ChevronDown className="text-gray-500" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-2xl">
            <div className="space-y-4 px-2 py-4">
              <div className="flex items-center border rounded-full px-4 py-2">
                <LocationIcon width={24} height={24} />
                <input
                  type="text"
                  placeholder="Enter your destination"
                  className="w-full outline-none text-gray-700 text-base pl-2"
                  value={searchParams.search}
                  onChange={handleInputChange}
                />
              </div>

              {/* Additional form fields here... */}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HostelSearchBar;
