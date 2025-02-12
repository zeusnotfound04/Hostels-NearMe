import { MapPin, Building2, User2, Send } from 'lucide-react'; 
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LocationIcon , HostelIcon , BoysIcon } from '@/components/ui/icon';
import { CalenderIcon } from "@/components/ui/icon";
import IconsPNG from "../../../public/icons/icons.png";
import Image from "next/image";


export function HostelSearch() {
  return (
    <div>

    
    <div className="relative w-full rounded-[30px] min-[400px] bg-gradient-to-r from-red-800 to-purple-800 p-8 pb-20">

      
      <div className="absolute top-0 right-0 bottom-0 w-1/3 opacity-20 flex flex-wrap justify-end p-4">
       <Image src={IconsPNG}  alt='Icons' className="w-auto h-[160px]"/>
      </div>

      <div className='relative z-10'>
        <h1 className="text-3xl font-bold mb-2 text-white">
          Welcome to Hostels Near Me
        </h1>
        <p className="text-white text-xl italic mb-12">
          Your Ultimate Hostel-Hunting Wingman!
        </p>
      </div>

     
      <div className="absolute left-1/2 top-full -translate-x-1/2  -translate-y-1/2 w-full md:w-[90%] lg:max-w-5xl bg-white rounded-full p-2 flex items-center justify-between shadow-lg border-2 border-[#858484]">
        <div className="flex items-center flex-1 px-4">
          <LocationIcon width={35} height={35} />
          <input
            type="text"
            placeholder="Enter your destination"
            className="w-full outline-none text-gray-700 text-lg" />
        </div>

        <div className='border-l border-gray-400 px-4 flex items-center'>
          <HostelIcon />
          <Select defaultValue="SINGLE">
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

        <div className="border-l border-gray-400 px-6 flex items-center min-w-[200px]">
          <div className="w-6 h-6 ">
            <BoysIcon />
          </div>
          <Select defaultValue="boys">
            <SelectTrigger className="w-full border-none shadow-none focus:ring-0">
              <SelectValue placeholder="Select hostel gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="boys">Boys Hostel</SelectItem>
              <SelectItem value="girls">Girls Hostel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <button className="bg-red-600 text-white px-6 py-3 rounded-full flex items-center hover:bg-red-700 transition-colors">
          Let's go
          <Send className="ml-2" size={16} />
        </button>
      </div>
    </div>
    <div className="items-center mt-12 flex space-x-1 justify-center">
      <CalenderIcon/>   
      <h2 className="text-">Free Cancellation & Flexible Booking available</h2>
      </div>
    </div>
  )
}
