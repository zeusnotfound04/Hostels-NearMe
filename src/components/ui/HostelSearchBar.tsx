import React, { useState } from "react";
import { Send, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LocationIcon, HostelIcon, BoysIcon } from "@/components/ui/icon";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Define types for search parameters
interface SearchParams {
  search: string;
  hostelType: "SINGLE" | "SHARED" | "DORMITORY";
  gender: "BOYS" | "GIRLS";
}

interface HostelSearchBarProps {
  className?: string;
  positionStyle?: string;
  buttonStyle?: string;
}

function HostelSearchBar({ className = "", positionStyle = "", buttonStyle = "" }: HostelSearchBarProps) {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    search: "",
    hostelType: "SINGLE",
    gender: "BOYS",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className={`${positionStyle} max-w-4xl mx-auto hidden md:flex`}>
        <div className="flex items-center w-[50%] px-2 sm:px-4">
          <LocationIcon width={24} height={24} className="sm:w-[35px] sm:h-[35px]" />
          <input
            type="text"
            placeholder="Enter your destination"
            className="w-full outline-none text-gray-700 text-base sm:text-lg pl-2"
            value={searchParams.search}
            onChange={handleInputChange}
          />
        </div>

        {/* Hostel type select */}
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

        {/* Gender select */}
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

        {/* Search button */}
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
                <span className="text-gray-500">
                  {searchParams.search || "Where to?"}
                </span>
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

              <div className="flex items-center border rounded-full px-4 py-2">
                <HostelIcon className="w-6 h-6" />
                <Select value={searchParams.hostelType} onValueChange={handleHostelTypeChange}>
                  <SelectTrigger className="w-full border-none shadow-none focus:ring-0">
                    <SelectValue placeholder="Select hostel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SINGLE">SINGLE</SelectItem>
                    <SelectItem value="SHARED">SHARED</SelectItem>
                    <SelectItem value="DORMITORY">DORMITORY</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center border rounded-full px-4 py-2">
                <BoysIcon className="w-6 h-6" />
                <Select value={searchParams.gender} onValueChange={handleGenderChange}>
                  <SelectTrigger className="w-full border-none shadow-none focus:ring-0">
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
                text-white font-medium px-6 py-3 rounded-full flex items-center justify-center"
                onClick={handleSearch}
              >
                Let's go
                <Send className="ml-2 w-5 h-5" />
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default HostelSearchBar;