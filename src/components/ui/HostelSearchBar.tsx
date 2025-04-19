/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Send, Search, Hand, MapPin, Check } from "lucide-react";
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
import { useCitySuggestions, CitySuggestion } from "@/hooks/useCitySuggestions";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { createPortal } from "react-dom";

// Define more specific types for the search parameters
interface SearchParams {
  search: string;
  hostelType: "SINGLE" | "SHARED" | "DORMITORY";
  gender: "BOYS" | "GIRLS";
  city?: string;
  state?: string;
}

interface HostelSearchBarProps {
  className?: string;
  positionStyle?: string;
  buttonStyle?: string;
  AnimatePlaceholder?: boolean;
}

// Add type for animation stages
type AnimationStage = "idle" | "exit" | "enter";

// Constants with appropriate types
const PLACEHOLDER_ROTATION_INTERVAL = 3000;
const PULSE_HIGHLIGHT_INTERVAL = 2000;
const CLICK_ICON_INTERVAL = 2500;

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

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<number>(0);
  const [nextText, setNextText] = useState<number>(1);
  const [animationStage, setAnimationStage] = useState<AnimationStage>("idle");
  const [pulseHighlight, setPulseHighlight] = useState<boolean>(false);
  const [showClickIcon, setShowClickIcon] = useState<boolean>(true);
  
  const [citySearchQuery, setCitySearchQuery] = useState<string>("");
  const [cityInputFocused, setCityInputFocused] = useState<boolean>(false);
  const [selectedCitySuggestion, setSelectedCitySuggestion] = useState<CitySuggestion | null>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  
  const [inputRect, setInputRect] = useState<DOMRect | null>(null);
  
  // Memoize placeholder texts to avoid recreating the array on each render
  const placeholderTexts = useMemo<string[]>(() => [
    "Enter your destination",
    "Search Hostel by Nearby Coaching",
    "Search by Hostel Type",
    "Search by Gender",
  ], []);
  
  const { 
    suggestions: citySuggestions, 
    isLoading: isCitySuggestionsLoading,
  } = useCitySuggestions({ 
    enabled: Boolean(cityInputFocused && citySearchQuery && citySearchQuery.length > 1),
    searchQuery: citySearchQuery,
    debounceMs: 300
  });
  
  // Handle placeholder text rotation with cleanup
  useEffect(() => {
    if (!AnimatePlaceholder) return;

    const handleTextRotation = () => {
      setAnimationStage("exit");

      const exitTimer = setTimeout(() => {
        const updatedNextText = (currentText + 1) % placeholderTexts.length;
        setNextText(updatedNextText);
        setAnimationStage("enter");

        const enterTimer = setTimeout(() => {
          setCurrentText(updatedNextText);
          setAnimationStage("idle");
        }, 600);
        
        return () => clearTimeout(enterTimer);
      }, 600);
      
      return () => clearTimeout(exitTimer);
    };

    const intervalId = setInterval(handleTextRotation, PLACEHOLDER_ROTATION_INTERVAL);
    return () => clearInterval(intervalId);
  }, [AnimatePlaceholder, currentText, placeholderTexts]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPulseHighlight((prev) => !prev);
    }, PULSE_HIGHLIGHT_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowClickIcon((prev) => !prev);
    }, CLICK_ICON_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);
  
  const updateInputPosition = useCallback(() => {
    if (cityInputRef.current) {
      setInputRect(cityInputRef.current.getBoundingClientRect());
    }
  }, []);
  
  useEffect(() => {
    if (!cityInputFocused) return;
    
    updateInputPosition();
    
    window.addEventListener('resize', updateInputPosition);
    window.addEventListener('scroll', updateInputPosition);
    
    return () => {
      window.removeEventListener('resize', updateInputPosition);
      window.removeEventListener('scroll', updateInputPosition);
    };
  }, [cityInputFocused, updateInputPosition]);
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams((prev) => ({ ...prev, search: value }));
    setCitySearchQuery(value);
    
    if (selectedCitySuggestion && value !== selectedCitySuggestion.formattedName) {
      setSelectedCitySuggestion(null);
    }
  }, [selectedCitySuggestion]);
  
  const handleHostelTypeChange = useCallback((value: SearchParams["hostelType"]) => {
    setSearchParams((prev) => ({ ...prev, hostelType: value }));
  }, []);
  
  const handleGenderChange = useCallback((value: SearchParams["gender"]) => {
    setSearchParams((prev) => ({ ...prev, gender: value }));
  }, []);
  
  const handleCitySuggestionSelect = useCallback((suggestion: CitySuggestion) => {
    setSearchParams(prev => ({
      ...prev,
      search: suggestion.formattedName,
      city: suggestion.name,
      state: suggestion.state
    }));
    
    setSelectedCitySuggestion(suggestion);
    setCitySearchQuery(suggestion.formattedName);
    setCityInputFocused(false);
    
    if (cityInputRef.current) {
      cityInputRef.current.blur();
    }
  }, []);
  
  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    
    if (searchParams.search) {
      params.append("search", searchParams.search);
    }
    
    if (searchParams.city) {
      params.append("city", searchParams.city);
    }
    
    if (searchParams.state) {
      params.append("state", searchParams.state);
    }
    
    params.append("hostelType", searchParams.hostelType);
    params.append("gender", searchParams.gender);
    
    router.push(`/hostels?${params.toString()}`);
    setIsDialogOpen(false);
  }, [router, searchParams]);
  
  // Define type for dropdown style object
  interface SuggestionDropdownStyle {
    top?: string;
    left?: string;
    width?: string;
    maxHeight?: string;
  }
  
  const suggestionDropdownStyle = useMemo<SuggestionDropdownStyle>(() => {
    if (!inputRect) return {};
    
    return {
      top: `${inputRect.bottom + window.scrollY + 5}px`,
      left: `${inputRect.left + window.scrollX}px`,
      width: `${inputRect.width}px`,
      maxHeight: '300px'
    };
  }, [inputRect]);
  
  const suggestionsItems = useMemo(() => {
    return citySuggestions.slice(0, 5).map((suggestion: CitySuggestion) => (
      <CommandItem
        key={suggestion.id}
        onSelect={() => handleCitySuggestionSelect(suggestion)}
        className="flex items-center gap-2 cursor-pointer hover:bg-red-50 py-1.5 rounded-md"
      >
        <MapPin className="h-3 w-3 text-red-500 flex-shrink-0" />
        <span className="truncate text-sm">{suggestion.formattedName}</span>
        {selectedCitySuggestion?.id === suggestion.id && (
          <Check className="h-3 w-3 text-green-500 ml-auto flex-shrink-0" />
        )}
      </CommandItem>
    ));
  }, [citySuggestions, handleCitySuggestionSelect, selectedCitySuggestion]);
  
  // Only render dropdown if we have data to show and input is focused
  const showSuggestions = cityInputFocused && searchParams.search && citySuggestions.length > 0;
  
  return (
    <div className={`w-full ${className}`}>
      {/* Desktop View */}
      <div className={`${positionStyle} max-w-4xl mx-auto hidden md:flex shadow-[0_4px_20px_-2px_rgba(220,38,38,0.4)] backdrop-blur-sm`}>
        <div className="flex items-center w-[50%] px-2 sm:px-4 relative overflow-hidden group">
          <LocationIcon width={24} height={24} className="sm:w-[35px] sm:h-[35px] text-red-500 group-hover:text-red-600 transition-colors" />
          <div className="relative w-full">
            <input
              ref={cityInputRef}
              type="text"
              placeholder={AnimatePlaceholder ? "" : "Enter your destination"}
              className="w-full outline-none text-gray-700 text-base sm:text-lg pl-2 focus:ring-1 focus:ring-red-300"
              value={searchParams.search}
              onChange={handleInputChange}
              onFocus={() => setCityInputFocused(true)}
              onBlur={() => {
                // Short delay to allow click to register before hiding suggestions
                setTimeout(() => setCityInputFocused(false), 150);
              }}
            />
            
            {/* Show city suggestions when input is focused and we have suggestions */}
            {showSuggestions && (
              createPortal(
                <div 
                  className="fixed rounded-lg border border-red-200 shadow-lg z-[9999] bg-white overflow-hidden" 
                  style={suggestionDropdownStyle}
                >
                  <Command>
                    <CommandList className="p-1 overflow-y-auto max-h-[300px]">
                      <CommandEmpty>No cities found</CommandEmpty>
                      <CommandGroup>
                        {suggestionsItems}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>,
                document.body
              )
            )}
            
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
                <SelectItem value="SINGLE" className="hover:bg-red-50">Single</SelectItem>
                <SelectItem value="SHARED" className="hover:bg-red-50">Double</SelectItem>
                <SelectItem value="DORMITORY" className="hover:bg-red-50">Triple</SelectItem>
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
                <div className="w-full relative">
                  <input
                    type="text"
                    placeholder="Enter your destination"
                    className="w-full outline-none text-gray-700 text-sm pl-2"
                    value={searchParams.search}
                    onChange={handleInputChange}
                    onFocus={() => setCityInputFocused(true)}
                    onBlur={() => {
                      // Short delay to allow click to register before hiding suggestions
                      setTimeout(() => setCityInputFocused(false), 150);
                    }}
                  />
                  
                  {/* City suggestions dropdown for mobile */}
                  {showSuggestions && (
                    <div className="absolute top-full left-0 w-full mt-1 z-50">
                      <Command className="rounded-lg border shadow-md">
                        <CommandList className="max-h-[200px] overflow-y-auto">
                          <CommandEmpty>No cities found</CommandEmpty>
                          <CommandGroup>
                            {suggestionsItems}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center border rounded-full px-3 py-1.5">
                <HostelIcon className="w-5 h-5" />
                <Select value={searchParams.hostelType} onValueChange={handleHostelTypeChange}>
                  <SelectTrigger className="w-full border-none shadow-none focus:ring-0 text-sm">
                    <SelectValue placeholder="Select hostel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SINGLE">Single</SelectItem>
                    <SelectItem value="SHARED">Double</SelectItem>
                    <SelectItem value="DORMITORY">Triple</SelectItem>
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

export default React.memo(HostelSearchBar);