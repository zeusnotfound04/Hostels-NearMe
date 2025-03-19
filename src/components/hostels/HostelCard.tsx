import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LocationIcon, FemaleIcon, AirConditionerIcon, VegetarianMessIcon, WashroomIcon, WifiIcon, CCTVIcon, ElectricityIcon, GymIcon, IndoorGamesIcon, SecurityGuardIcon, ParkingIcon, FoodIcon, ROWaterIcon, MaleIcon } from "@/components/ui/icon";
import { Hostel } from "@/types";
import { useRouter } from "next/navigation";

export const HostelCard = ({ hostel }: { hostel: Hostel }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();
  
  const cycleImage = (direction: number) => {
    if (!Array.isArray(hostel.images) || hostel.images.length === 0) return;
    const newIndex = (currentImage + direction + hostel.images.length) % hostel.images.length;
    setCurrentImage(newIndex);
  };

  const amenities = useMemo(() => [
    { label: 'AC & Non AC', show: hostel.airconditioner || hostel.cooler, icon: <AirConditionerIcon width={16} height={16} color="black" /> },
    { label: 'Veg Only', show: !hostel.isNonVeg, icon: <VegetarianMessIcon width={16} height={16} color="black" /> },
    { label: 'Attached Washroom', show: hostel.attachedWashroom, icon: <WashroomIcon width={16} height={16} color="black"/> },
    { label: 'WiFi', show: hostel.wiFi, icon: <WifiIcon width={16} height={16} color="black" /> },
    { label: 'CCTV', show: hostel.cctv, icon: <CCTVIcon width={16} height={16} color="black" /> },
    { label: 'Power Backup', show: hostel.inverterBackup || hostel.generator, icon: <ElectricityIcon width={16} height={16} color="black" /> },
    { label: 'Gym', show: hostel.gym, icon: <GymIcon width={16} height={16} color="black" /> },
    { label: 'Indoor Games', show: hostel.indoorGames, icon: <IndoorGamesIcon width={16} height={16} color="black"/> },
    { label: 'Security Guard', show: hostel.securityGuard, icon: <SecurityGuardIcon width={16} height={16} color="black" /> },
    { label: 'Parking', show: hostel.parking, icon: <ParkingIcon width={16} height={16} color="black" /> },
    { label: 'Food Included', show: hostel.foodIncluded, icon: <FoodIcon width={16} height={16} color="black" /> },
    { label: 'RO Water', show: hostel.waterByRO, icon: <ROWaterIcon width={16} height={16} color="black" /> }
  ].filter(amenity => amenity.show), [hostel]);

  return (
    <Card className="w-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-56 md:h-64 w-full md:w-1/3 flex-shrink-0">
            {Array.isArray(hostel.images) && hostel.images.length > 0 ? (
              <div className="relative w-full h-full">
                <Image
                  src={hostel.images[currentImage] || "/default-image.jpg"}
                  alt={`${hostel.name} - Image ${currentImage + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={currentImage === 0}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <p className="text-gray-500 font-medium">No Image Available</p>
              </div>
            )}

            {Array.isArray(hostel.images) && hostel.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    cycleImage(-1);
                  }}
                  aria-label="Previous image"
                  className="absolute top-1/2 -translate-y-1/2 left-2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full z-10 transition-colors"
                >
                  &#9664;
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    cycleImage(1);
                  }}
                  aria-label="Next image"
                  className="absolute top-1/2 -translate-y-1/2 right-2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full z-10 transition-colors"
                >
                  &#9654;
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {hostel.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImage(i);
                      }}
                      aria-label={`Go to image ${i + 1}`}
                      className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex-1 p-4 md:p-5 relative">
            <div className="absolute top-4 right-4">
              <Badge className="bg-[#902920] text-white rounded-full px-4 py-1.5 flex items-center gap-1 shadow-sm">
                {hostel.gender === "BOYS" ? 
                  <MaleIcon className="w-3.5 h-3.5" /> : 
                  <FemaleIcon className="w-3.5 h-3.5" />
                }
                <span className="font-bold text-xs tracking-wide">
                  {hostel.gender === "BOYS" ? "BOYS" : "GIRLS"}
                </span>
              </Badge>
            </div>

            <h2 className="font-bold text-xl md:text-2xl text-black mb-2 pr-20">{hostel.name}</h2>

            <div className="flex items-center mb-2">
              <LocationIcon className="w-4 h-4 mr-1.5 flex-shrink-0 text-gray-600" />
              <span className="font-normal text-sm text-gray-700">{hostel.city}, {hostel.state}</span>
            </div>

            <div className="flex items-center mb-3">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
              <span className="font-medium text-xs text-green-600">Available</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5 mt-3">
              {amenities.length > 0 ? (
                amenities.map((amenity, index) => (
                  <Badge key={index} className="bg-gray-100 text-gray-800 rounded-full border border-[#902920] px-2 py-1 text-xs flex items-center gap-1 hover:bg-gray-200 transition-colors">
                    <span className="flex-shrink-0">{amenity.icon}</span>
                    <span className="whitespace-nowrap">{amenity.label}</span>
                  </Badge>
                )) 
              ) : (
                <p className="text-gray-500 text-sm italic">No amenities listed</p>
              )}
            </div>

            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
              <div>
                <p className="font-bold text-xl md:text-2xl text-black">₹{hostel.price}/-</p>
                <p className="font-light text-xs text-gray-600">Starting From</p>
              </div>
              <Button 
                  className="bg-[#f10000] hover:bg-[#d10000] text-white rounded-md h-10 px-4 shadow-sm transition-colors"
                  onClick={() =>
                    router.push(`/hostels/${hostel.id}`)
                  }
              >
                <span className="font-bold text-sm">Book Now</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};