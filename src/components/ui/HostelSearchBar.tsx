/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
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
  AnimatePlaceholder?: boolean;
}

function HostelSearchBar({
  className = "",
  positionStyle = "",
  buttonStyle = "",
  AnimatePlaceholder = false,
}: HostelSearchBarProps) {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    search: "",
    hostelType: "SINGLE",
    gender: "BOYS",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [nextText, setNextText] = useState(1);
  const [animationStage, setAnimationStage] = useState<"idle" | "exit" | "enter">("idle");

  const placeholderTexts = [
    "Enter your destination",
    "Search Hostel by Nearby Coaching",
    "Search by Hostel Type",
    "Search by Gender",
  ];

  useEffect(() => {
    if (!AnimatePlaceholder) return;

    const interval = setInterval(() => {
      setAnimationStage("exit");

      setTimeout(() => {
        const updatedNextText = (currentText + 1) % placeholderTexts.length;
        setNextText(updatedNextText);
        setAnimationStage("enter");

        setTimeout(() => {
          setCurrentText(updatedNextText);
          setAnimationStage("idle");
        }, 600);
      }, 600);
    }, 3000);

    return () => clearInterval(interval);
  }, [AnimatePlaceholder, currentText]);

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

  const getCurrentTextClass = () => {
    if (animationStage === "idle") return "translate-y-0 opacity-100";
    if (animationStage === "exit") return "-translate-y-[150%] opacity-0";
    return "hidden";
  };

  const getNextTextClass = () => {
    if (animationStage === "enter") return "translate-y-0 opacity-100";
    return "translate-y-[150%] opacity-0";
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop View */}
      <div className={`${positionStyle} max-w-4xl mx-auto hidden md:flex shadow-[0_4px_20px_-2px_rgba(220,38,38,0.4)] backdrop-blur-sm`}>
        <div className="flex items-center w-[50%] px-2 sm:px-4 relative overflow-hidden group">
          <LocationIcon width={24} height={24} className="sm:w-[35px] sm:h-[35px] text-red-500 group-hover:text-red-600 transition-colors" />
          <div className="relative w-full">
            <input
              type="text"
              placeholder={AnimatePlaceholder ? "" : "Enter your destination"}
              className="w-full outline-none text-gray-700 text-base sm:text-lg pl-2 focus:ring-1 focus:ring-red-300"
              value={searchParams.search}
              onChange={handleInputChange}
            />
         {!searchParams.search && AnimatePlaceholder && (
  <div className="absolute left-2 top-0 h-full w-full flex items-center pointer-events-none">
    <div className="h-[1.5em] relative overflow-hidden w-full">
      {animationStage !== "enter" && (
        <span
          className={`absolute text-gray-400 left-0 transition-all duration-500 ease-in-out ${
            animationStage === "idle"
              ? "translate-y-0 opacity-100"
              : "-translate-y-[150%] opacity-0"
          }`}
        >
          {placeholderTexts[currentText]}
        </span>
      )}
      {animationStage !== "idle" && (
        <span
          className={`absolute text-gray-400 left-0 transition-all duration-500 ease-in-out ${
            animationStage === "enter"
              ? "translate-y-0 opacity-100"
              : "translate-y-[150%] opacity-0"
          }`}
        >
          {placeholderTexts[nextText]}
        </span>
      )}
    </div>
  </div>
)}
          </div>
        </div>

        {/* Hostel Type */}
        <div className="w-full sm:w-auto sm:border-l border-gray-400 px-2 sm:px-4 flex items-center group">
          <HostelIcon className="w-6 h-6 sm:w-auto sm:h-auto text-red-500 group-hover:text-red-600 transition-colors" />
          <div className="w-full">
            <Select value={searchParams.hostelType} onValueChange={handleHostelTypeChange}>
              <SelectTrigger className="w-full border-none shadow-none focus:ring-1 focus:ring-red-300 text-sm sm:text-base hover:text-red-700 transition-colors">
                <SelectValue placeholder="Select hostel type" />
              </SelectTrigger>
              <SelectContent className="border border-red-100">
                <SelectItem value="SINGLE" className="hover:bg-red-50">SINGLE</SelectItem>
                <SelectItem value="SHARED" className="hover:bg-red-50">SHARED</SelectItem>
                <SelectItem value="DORMITORY" className="hover:bg-red-50">DORMITORY</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Gender */}
        <div className="w-full sm:w-auto sm:border-l border-gray-400 px-2 sm:px-6 flex items-center sm:min-w-[200px] group">
          <div className="w-6 h-6 text-red-500 group-hover:text-red-600 transition-colors">
            <BoysIcon />
          </div>
          <div className="w-full">
            <Select value={searchParams.gender} onValueChange={handleGenderChange}>
              <SelectTrigger className="w-full border-none shadow-none focus:ring-1 focus:ring-red-300 text-sm sm:text-base hover:text-red-700 transition-colors">
                <SelectValue placeholder="Select hostel gender" />
              </SelectTrigger>
              <SelectContent className="border border-red-100">
                <SelectItem value="BOYS" className="hover:bg-red-50">Boys Hostel</SelectItem>
                <SelectItem value="GIRLS" className="hover:bg-red-50">Girls Hostel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search */}
        <button
          className={`${buttonStyle} relative overflow-hidden group z-10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-500/20 before:to-transparent before:translate-x-full before:hover:translate-x-0 before:transition-transform before:duration-300 before:z-[-1]`}
          onClick={handleSearch}
        >
          Let's go
          <Send className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Mobile View */}
      <div className="md:hidden w-full">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div className="w-full bg-white rounded-full px-4 py-3 flex items-center justify-between shadow-sm shadow-red-300 hover:shadow-md hover:shadow-red-400/30 transition-shadow duration-300">
              <div className="flex items-center space-x-2">
                <LocationIcon width={24} height={24} className="text-red-500" />
                <span className="text-gray-500 relative h-6 overflow-hidden">
                  {searchParams.search || (
                    <div className="h-6 relative overflow-hidden w-full">
                      <span
                        className={`absolute text-gray-400 left-0 transition-all duration-600 ease-in-out ${getCurrentTextClass()}`}
                      >
                        {placeholderTexts[currentText]}
                      </span>
                      <span
                        className={`absolute text-gray-400 left-0 transition-all duration-600 ease-in-out ${getNextTextClass()}`}
                      >
                        {placeholderTexts[nextText]}
                      </span>
                    </div>
                  )}
                </span>
              </div>
              <ChevronDown className="text-red-500" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-2xl shadow-lg shadow-red-400/30">
            <div className="space-y-4 px-2 py-4">
              {/* Continue your mobile dialog content here */}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default HostelSearchBar;
