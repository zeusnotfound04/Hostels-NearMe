import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { LocationIcon, AirConditionerIcon, VegetarianMessIcon, WashroomIcon, WifiIcon, CCTVIcon, ElectricityIcon, GymIcon, IndoorGamesIcon, SecurityGuardIcon, ParkingIcon, FoodIcon, ROWaterIcon } from "@/components/ui/icon";
import { Hostel } from "@/types";

const springConfig = {
  damping: 30,
  stiffness: 200,
  mass: 1.8,
};

export default function HostelCard({ hostel }: { hostel: Hostel }) {
  const [currentImage, setCurrentImage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const springScale = useSpring(1, springConfig);

  const amenities = useMemo(() => [
    { label: 'AC & Non AC', show: hostel?.airconditioner || hostel?.cooler, icon: <AirConditionerIcon width={20} height={20} color="black" /> },
    { label: 'Veg Only', show: !hostel?.isNonVeg, icon: <VegetarianMessIcon width={20} height={20} color="black" /> },
    { label: 'Attached Washroom', show: hostel?.attachedWashroom, icon: <WashroomIcon width={20} height={20} color="black"/> },
    { label: 'WiFi', show: hostel?.wiFi, icon: <WifiIcon width={20} height={20} color="black" /> },
    { label: 'CCTV', show: hostel?.cctv, icon: <CCTVIcon width={20} height={20} color="black" /> },
    { label: 'Power Backup', show: hostel?.inverterBackup || hostel?.generator, icon: <ElectricityIcon width={20} height={20} color="black" /> },
    { label: 'Gym', show: hostel?.gym, icon: <GymIcon width={20} height={20} color="black" /> },
    { label: 'Indoor Games', show: hostel?.indoorGames, icon: <IndoorGamesIcon width={20} height={20} color="black"/> },
    { label: 'Security Guard', show: hostel?.securityGuard, icon: <SecurityGuardIcon width={20} height={20} color="black" /> },
    { label: 'Parking', show: hostel?.parking, icon: <ParkingIcon width={20} height={20} color="black" /> },
    { label: 'Food Included', show: hostel?.foodIncluded, icon: <FoodIcon width={20} height={20} /> },
    { label: 'RO Water', show: hostel?.waterByRO, icon: <ROWaterIcon width={20} height={20} color="black" /> }
  ].filter(amenity => amenity.show), [hostel]);

  if (!hostel) return null;
  
  const images = hostel.images || [];

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rotateXVal = ((mouseY - height / 2) / height) * -10;
    const rotateYVal = ((mouseX - width / 2) / width) * 10;
    
    rotateX.set(rotateXVal);
    rotateY.set(rotateYVal);
  };

  const handleMouseEnter = () => springScale.set(1.03);
  const handleMouseLeave = () => {
    springScale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  };

  const cycleImage = (increment: number) => {
    setCurrentImage(prev => (prev + increment + images.length) % images.length);
  };

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-full bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl [perspective:1200px]"
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        scale: springScale,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d"
      }}
    >
      <div className="relative h-48 sm:h-60 w-full">
        {images.length > 0 ? (
          <Image
            src={images[currentImage]}
            alt={`${hostel.name} - Image ${currentImage + 1}`}
            fill
            sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 100%"
            priority={currentImage === 0}
            className="object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <p className="text-gray-500 font-medium">No Image Available</p>
          </div>
        )}
        {images.length > 1 && (
          <>
            <button 
              onClick={() => cycleImage(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button 
              onClick={() => cycleImage(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? 'bg-white scale-125' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-1 text-gray-800 line-clamp-1">{hostel.name}</h3>
      
        <div className="flex items-start text-gray-700 mb-3 sm:mb-4">
          <LocationIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-red-500 flex-shrink-0 mt-0.5" />
          <span className="text-xs sm:text-sm line-clamp-2">{`${hostel.address}, ${hostel.city}, ${hostel.state}`}</span>
        </div> 
        
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {amenities.map((amenity, index) => (
              <div 
                key={index}
                className="flex items-center bg-gray-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium text-gray-700 border border-[#902920] transition-colors"
              >
                <span className="text-blue-500 mr-1 sm:mr-1.5">{amenity.icon}</span>
                {amenity.label}
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
          <div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">₹{hostel.price.toLocaleString()}</span>
            <span className="text-gray-600 text-xs sm:text-sm ml-1">/month</span>
            <br />
            <span className="text-gray-600 text-xs sm:text-sm">Starting from</span>
          </div>
          <a
            href={`/hostels/${hostel.id}`}
            className="bg-[#F10000] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-sm hover:shadow-md focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Book Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}