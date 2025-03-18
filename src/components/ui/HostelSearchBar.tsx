import React, { useState } from "react";
import { Send } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LocationIcon, HostelIcon, BoysIcon } from "@/components/ui/icon";
import { useRouter } from "next/navigation";

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
  };

  return (
    <div>
      <div className={`${positionStyle}`}>

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
              <SelectContent >
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
              <SelectContent >
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
    </div>
  );
}

export default HostelSearchBar;
