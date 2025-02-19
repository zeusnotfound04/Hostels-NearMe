import React from 'react';
import { Send } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LocationIcon, HostelIcon, BoysIcon, CalenderIcon } from  '@/components/ui/icon';

const HostelSearchBar = ({ 
  className = '',
  positionStyle = '',
  buttonStyle = '',
}) => {
  return (
    <div >
        <div className={`${positionStyle} `}>
          
          {/* Location input */}
          <div className="flex items-center w-[50%] px-2 sm:px-4">
            <LocationIcon width={24} height={24} className="sm:w-[35px] sm:h-[35px]" />
            <input
              type="text"
              placeholder="Enter your destination"
              className="w-full outline-none text-gray-700 text-base sm:text-lg pl-2" 
            />
          </div>

          {/* Hostel type select */}
          <div className='w-full sm:w-auto sm:border-l border-gray-400 px-2 sm:px-4 flex items-center'>
            <HostelIcon className="w-6 h-6 sm:w-auto sm:h-auto" />
            <div className="w-full">
              <Select defaultValue="SINGLE">
                <SelectTrigger className="w-full border-none shadow-none focus:ring-0 text-sm sm:text-base">
                  <SelectValue placeholder="Select hostel type" />
                </SelectTrigger>
                <SelectContent portal={true}>
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
              <Select defaultValue="boys">
                <SelectTrigger className="w-full border-none shadow-none focus:ring-0 text-sm sm:text-base">
                  <SelectValue placeholder="Select hostel gender" />
                </SelectTrigger>
                <SelectContent portal={true}>
                  <SelectItem value="boys">Boys Hostel</SelectItem>
                  <SelectItem value="girls">Girls Hostel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search button */}
         {/* Search button */}
<button className={`${buttonStyle}`}>
  Let's go
  <Send className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
</button>

        </div>
     
           
 </div>
  );
};

export default HostelSearchBar;