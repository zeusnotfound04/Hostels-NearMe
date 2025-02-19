import { MapPin, Building2, User2, Send } from 'lucide-react'; 
import { CalenderIcon } from "@/components/ui/icon";
import IconsPNG from "../../../public/icons/icons.png";
import Image from "next/image";
import HostelSearchBar from '@/components/ui/HostelSearchBar';

export function HostelSearch() {
  return (
    <div>
      <div className="relative w-full rounded-[20px] sm:rounded-[30px] bg-gradient-to-r from-red-800 to-purple-800  p-4 sm:p-8 pb-32 sm:pb-20">
        
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

          <HostelSearchBar positionStyle='absolute left-1/2 -translate-x-1/2 top-full -translate-y-1/2 
                      w-[90%] max-w-[95%] sm:max-w-[90%] lg:max-w-5xl 
                       min-h-[70px] h-[80px] max-h-[90px] 
                      bg-white rounded-2xl sm:rounded-full p-4 
                      flex flex-col sm:flex-row items-center 
                      gap-4 sm:gap-0 sm:justify-between 
                      shadow-lg border-2 border-[#858484] '
                      
                      buttonStyle='w-full sm:w-auto bg-red-600 text-white px-4 sm:px-6 py-3 sm:py-4
              min-h-[45px] h-[50px] max-h-[60px]
              rounded-full flex items-center justify-center 
              text-sm sm:text-base hover:bg-red-700 transition-colors'

                      />
        


        
      </div>
    </div>
  )
}