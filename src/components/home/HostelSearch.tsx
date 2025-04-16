import IconsPNG from "../../../public/icons/icons.png";
import Image from "next/image";
import HostelSearchBar from '@/components/ui/HostelSearchBar';

export function HostelSearch() {
  return (
    <div className="mb-16">
      <div className="relative w-full rounded-[20px] sm:rounded-[30px] 
        bg-gradient-to-r from-red-800 to-purple-800 
        p-2 sm:p-8 pb-16 sm:pb-20
        shadow-[15px_15px_30px_-5px_rgba(220,38,38,0.6),-15px_15px_30px_-5px_rgba(147,51,234,0.6)] 
        before:content-[''] before:absolute before:inset-0 before:rounded-[20px] sm:before:rounded-[30px] 
        before:bg-gradient-to-r before:from-red-800/30 before:to-purple-800/30 before:blur-md before:-z-10">
        
        {/* Background image - hidden on small screens */}
        <div className="absolute top-0 right-0 bottom-0 w-1/3 opacity-100 hidden sm:flex flex-wrap justify-end p-4">
          <Image src={IconsPNG} alt='Icons' className="w-auto h-[160px] animate-pulse" />
        </div>

        <div className="relative z-10 flex flex-col items-center sm:items-start justify-center h-full mt-4 sm:mt-8">
          <h1 className="text-xl sm:text-3xl font-bold mb-0 sm:mb-1 text-white drop-shadow-md text-center sm:text-left">
            Welcome to Hostelsnearme
          </h1>
          <p className="text-white text-base sm:text-xl italic mb-2 sm:mb-12 drop-shadow text-center sm:text-left">
            Your Ultimate Hostel-Hunting Wingman!
          </p>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%-10px)] sm:top-full sm:-translate-y-1/2 w-full">
          <HostelSearchBar positionStyle='
                    w-[90%] max-w-[95%] sm:max-w-[90%] lg:max-w-5xl mx-auto
                    min-h-[70px] h-[80px] max-h-[90px] 
                    bg-white rounded-2xl sm:rounded-full p-4 
                    flex flex-col sm:flex-row items-center 
                    gap-4 sm:gap-0 sm:justify-between 
                    shadow-xl border-2 border-[#858484]
                    shadow-[15px_5px_15px_-3px_rgba(220,38,38,0.4),-15px_5px_15px_-3px_rgba(147,51,234,0.4)]'
                    
                    buttonStyle='w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white px-4 sm:px-6 py-3 sm:py-4
            min-h-[45px] h-[50px] max-h-[60px]
            rounded-full flex items-center justify-center 
            text-sm sm:text-base hover:from-red-700 hover:to-red-800 transition-colors
            shadow-md hover:shadow-lg shadow-red-500/30'

            AnimatePlaceholder={true}      
          />
        </div>
      </div>
    </div>
  )
}