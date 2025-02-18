import { MapPin, Building2, User2, Send } from 'lucide-react'; 
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LocationIcon, HostelIcon, BoysIcon } from '@/components/ui/icon';
import { CalenderIcon } from "@/components/ui/icon";
import IconsPNG from "../../../public/icons/icons.png";
import Image from "next/image";

export function HostelSearch() {
  return (
    <div>
      <div className="relative w-full rounded-[20px] sm:rounded-[30px] bg-gradient-to-r from-red-800 to-purple-800 p-4 sm:p-8 pb-32 sm:pb-20">
        
        {/* Background image - hidden on small screens */}
        <div className="absolute top-0 right-0 bottom-0 w-1/3 opacity-20 hidden sm:flex flex-wrap justify-end p-4">
          <Image src={IconsPNG} alt='Icons' className="w-auto h-[160px]"/>
        </div>

        <div className='relative z-10'>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
            Welcome to Hostelsnearme
          </h1>
          <p className="text-white text-lg sm:text-xl italic mb-8 sm:mb-12">
            Your Ultimate Hostel-Hunting Wingman!
          </p>
        </div>

        {/* Search box - changes to vertical layout on mobile */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full -translate-y-1/2 
                      w-[90%] max-w-[95%] sm:max-w-[90%] lg:max-w-5xl 
                      bg-white rounded-2xl sm:rounded-full p-4 
                      flex flex-col sm:flex-row items-center 
                      gap-4 sm:gap-0 sm:justify-between 
                      shadow-lg border-2 border-[#858484]">
          
          {/* Location input */}
          <div className="flex items-center w-full px-2 sm:px-4">
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
          <button className="w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
            Let's go
            <Send className="ml-2" size={16} />
          </button>
        </div>
      </div>
      
      {/* Bottom text */}
      <div className="items-center mt-20 sm:mt-12 flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 justify-center px-4 text-center sm:text-left">
        <CalenderIcon color='black'/>
        <h2 className="text-sm sm:text-base">
          <span className='font-bold'>Free Cancellation</span> & 
          <span className='font-bold'>Flexible Booking</span> available
        </h2>
      </div>
    </div>
  )
}