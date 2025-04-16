/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Send,  Search,  Hand } from "lucide-react";
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
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

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
  const [pulseHighlight, setPulseHighlight] = useState(false);
  const [showClickIcon, setShowClickIcon] = useState(true);

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

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseHighlight((prev) => !prev);
    }, 2000);

    return () => clearInterval(pulseInterval);
  }, []);

  useEffect(() => {
    const clickIconInterval = setInterval(() => {
      setShowClickIcon((prev) => !prev);
    }, 2500);

    return () => clearInterval(clickIconInterval);
  }, []);

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
                <SelectItem value="SHARED" className="hover:bg-red-50">DOUBLE</SelectItem>
                <SelectItem value="DORMITORY" className="hover:bg-red-50">TRIPLE</SelectItem>
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
            <motion.div 
              whileTap={{ scale: 0.95 }}
              initial={{ boxShadow: "0 1px 3px rgba(220, 38, 38, 0.2)" }}
              whileHover={{ 
                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.4)",
                y: -2
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 15 
              }}
              className="w-full bg-white rounded-full px-3 py-2.5 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 border border-red-100"
            >
              <div className="flex items-center space-x-2 relative">
                <motion.div
                  className="relative"
                  animate={{ 
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                >
                  <LocationIcon width={22} height={22} className="text-red-500" />
                  
                  {/* Ripple effect around the location icon */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-red-500/20"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ 
                      scale: [1, 1.8, 1.8], 
                      opacity: [0, 0.6, 0] 
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                </motion.div>
                
                <div className="relative">
                  <motion.span 
                    className={`text-gray-600 font-medium transition-colors duration-300 ${pulseHighlight ? 'text-red-500' : ''}`}
                    animate={{ 
                      y: pulseHighlight ? [-1, 1, -1] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="font-semibold">Tap here</span> to find your <span className="font-semibold">best hostel</span>
                  </motion.span>
                  
                  <AnimatePresence mode="wait">
                    {pulseHighlight && (
                      <motion.div 
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-500 to-red-300"
                        initial={{ width: "0%", left: "50%" }}
                        animate={{ width: "100%", left: "0%" }}
                        exit={{ width: "0%", left: "50%" }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Click/tap icon animation */}
                <AnimatePresence mode="wait">
                  {showClickIcon && (
                    <motion.div
                      className="absolute -right-6 -top-5"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        animate={{ y: [0, -5, 0], rotate: [-5, 5, -5] }}
                        transition={{ 
                          duration: 0.8, 
                          repeat: Infinity, 
                          repeatType: "reverse" 
                        }}
                      >
                        <Hand className="h-5 w-5 text-red-500" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.div
                className="relative"
                animate={{ 
                  rotate: [0, -10, 0, 10, 0],
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              >
                <Search className="text-red-500 w-4 h-4" />
              </motion.div>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-2xl shadow-lg shadow-red-400/30 p-4">
            <DialogTitle className="text-lg">Search Hostels</DialogTitle>
            <div className="space-y-3 px-2 py-3">
              <div className="flex items-center border rounded-full px-3 py-1.5">
                <LocationIcon width={20} height={20} />
                <input
                  type="text"
                  placeholder="Enter your destination"
                  className="w-full outline-none text-gray-700 text-sm pl-2"
                  value={searchParams.search}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-center border rounded-full px-3 py-1.5">
                <HostelIcon className="w-5 h-5" />
                <Select value={searchParams.hostelType} onValueChange={handleHostelTypeChange}>
                  <SelectTrigger className="w-full border-none shadow-none focus:ring-0 text-sm">
                    <SelectValue placeholder="Select hostel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SINGLE">SINGLE</SelectItem>
                    <SelectItem value="SHARED">DOUBLE</SelectItem>
                    <SelectItem value="DORMITORY">TRIPLE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center border rounded-full px-3 py-1.5">
                <BoysIcon className="w-5 h-5" />
                <Select value={searchParams.gender} onValueChange={handleGenderChange}>
                  <SelectTrigger className="w-full border-none shadow-none focus:ring-0 text-sm">
                    <SelectValue placeholder="Select hostel gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BOYS">Boys Hostel</SelectItem>
                    <SelectItem value="GIRLS">Girls Hostel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <button 
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                text-white font-medium px-4 py-2 rounded-full flex items-center justify-center text-sm"
                onClick={handleSearch}
              >
                Let's go
                <Send className="ml-2 w-4 h-4" />
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default HostelSearchBar;
