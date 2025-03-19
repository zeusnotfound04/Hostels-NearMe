import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  AirConditionerIcon, 
  FemaleIcon, 
  LocationIcon, 
  MaleIcon, 
  ParkingIcon, 
  VegetarianMessIcon, 
  WashroomIcon,
  AlmirahIcon,
  CCTVIcon,
  ChairIcon,
  CoolerIcon,
  InvertorIcon,
  CleaningIcon,
  ElectricityIcon,
  GeneratorIcon,
  GeyserIcon,
  IndoorGamesIcon,
  PillowIcon,
  ROWaterIcon,
  SecurityGuardIcon,
  TableIcon,
  WifiIcon,
  FoodIcon,
  BedIcon,
  WaterSupply,
  GymIcon,
  WardenIcon
} from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { HostelPageProps } from "@/types";
import { IconAddressBook } from "@tabler/icons-react";
import { Phone } from "lucide-react";
import Image from "next/image";
import BookingForm from "./bookingForm";

export default function HostelPage({ hostelId, hostel }: HostelPageProps) {
  // Dynamic facilities mapping based on hostel properties
  const facilityIcons = [
    { property: "wiFi", icon: <WifiIcon className="w-6 h-6" />, name: "Free Wi-fi" },
    { property: "attachedWashroom", icon: <WashroomIcon className="w-6 h-6" />, name: "Attached Washroom" },
    { property: "airconditioner", icon: <AirConditionerIcon className="w-6 h-6" />, name: "AC Rooms" },
    { property: "parking", icon: <ParkingIcon className="w-6 h-6" />, name: "Bicycle Parking" },
    { property: "Almirah", icon: <AlmirahIcon className="w-6 h-6" />, name: "Almirah" },
    { property: "cctv", icon: <CCTVIcon className="w-6 h-6" />, name: "CCTV" },
    { property: "chair", icon: <ChairIcon className="w-6 h-6" />, name: "Chair" },
    { property: "cooler", icon: <CoolerIcon className="w-6 h-6" />, name: "Cooler" },
    { property: "inverterBackup", icon: <InvertorIcon className="w-6 h-6" />, name: "Inverter Backup" },
    { property: "biweeklycleaning", icon: <CleaningIcon className="w-6 h-6" />, name: "Biweekly Cleaning" },
    { property: "allDayElectricity", icon: <ElectricityIcon className="w-6 h-6" />, name: "24/7 Electricity" },
    { property: "generator", icon: <GeneratorIcon className="w-6 h-6" />, name: "Generator" },
    { property: "geyser", icon: <GeyserIcon className="w-6 h-6" />, name: "Geyser" },
    { property: "indoorGames", icon: <IndoorGamesIcon className="w-6 h-6" />, name: "Indoor Games" },
    { property: "pillow", icon: <PillowIcon className="w-6 h-6" />, name: "Pillow" },
    { property: "waterByRO", icon: <ROWaterIcon className="w-6 h-6" />, name: "RO Water" },
    { property: "securityGuard", icon: <SecurityGuardIcon className="w-6 h-6" />, name: "Security Guard" },
    { property: "table", icon: <TableIcon className="w-6 h-6" />, name: "Table" },
    { property: "foodIncluded", icon: <FoodIcon className="w-6 h-6" />, name: "Food Included" },
    { property: "bed", icon: <BedIcon className="w-6 h-6" />, name: "Bed" },
    { property: "allDayWaterSupply", icon: <WaterSupply className="w-6 h-6" />, name: "24/7 Water Supply" },
    { property: "gym", icon: <GymIcon className="w-6 h-6" />, name: "Gym" },
    { property: "allDayWarden", icon: <WardenIcon className="w-6 h-6" />, name: "24/7 Warden" },
  ];

  // Filter available facilities
  const availableFacilities = facilityIcons.filter(
    facility => hostel[facility.property as keyof typeof hostel] === true
  );

  return (
    <div className="w-full relative">
      {/* Header Section */}
      <div className="w-full mb-8">
        <div className="ml-[138px]">
          <div className="text-xl">
            <span className="font-black text-[#902920]">Hostels NearMe</span>
            <span className="font-semibold text-black">
              /{hostel.city}/{hostel.name}
            </span>
          </div>

          <h1 className="font-black text-black text-[40px] mt-6">
            {hostel.name}
          </h1>

          <div className="flex items-center mt-2">
            <LocationIcon className="w-[21px] h-[30px] mr-2" />
            <span className="font-light text-black text-[25px]">
              {hostel.address}, {hostel.city}
            </span>
          </div>

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
      </div>

      {/* Main Content */}
      <div className="flex gap-6 ml-[131px]">
        {/* Left Column - Images and Info */}
        <div className="flex flex-col">
          {/* Image Gallery */}
          <Card className="w-[815px] h-auto rounded-[10px] bg-[#d9d9d9] mb-8">
            <CardContent className="p-4">
              {hostel.images && hostel.images.length > 0 ? (
                <>
                  <div className="w-full h-[352px] relative mb-4">
                    <Image
                      className="object-cover rounded-md"
                      alt={`${hostel.name} main view`}
                      src={hostel.images[0]}
                      fill
                      sizes="(max-width: 781px) 100vw, 781px"
                      priority
                    />
                  </div>
                  <div className="flex gap-4 h-[168px]">
                    {hostel.images.slice(1, 4).map((image, index) => (
                      <div key={index} className="flex-1 relative">
                        <Image
                          className="object-cover rounded-md"
                          alt={`${hostel.name} view ${index + 1}`}
                          src={image}
                          fill
                          sizes="(max-width: 240px) 100vw, 240px"
                        />
                      </div>
                    ))}
                    {/* If less than 3 additional images, add placeholders */}
                    {Array.from({ length: Math.max(0, 4 - hostel.images.length) }).map((_, index) => (
                      <div key={`placeholder-${index}`} className="flex-1 bg-gray-200 rounded-md" />
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full h-[520px] bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No images available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Facilities Section */}
          <div className="w-[795px] mb-8">
            <div className="flex items-center">
              <h2 className="font-normal text-black text-[40px] ml-5">
                Facilities
              </h2>
            </div>
            <Separator className="mb-6" />

            <div className="grid grid-cols-2 gap-8 ml-5">
              {availableFacilities.map((facility, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-[60px] h-[60px] bg-[#c7c7c7] rounded-[30px] opacity-60 flex items-center justify-center">
                    {facility.icon}
                  </div>
                  <span className="ml-[18px] font-black text-black text-lg">
                    {facility.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* House Rules Section */}
          <div className="w-[795px] mb-8">
            <div className="flex items-center">
              <h2 className="font-normal text-black text-[40px] ml-5">
                House Rules
              </h2>
            </div>
            <Separator className="mb-6" />

            <div className="flex items-center ml-5">
              <div className="w-[60px] h-[60px] bg-[#c7c7c7] rounded-[30px] opacity-60 flex items-center justify-center">
                <VegetarianMessIcon className="w-6 h-6" />
              </div>
              <span className="ml-[18px] font-black text-black text-lg">
                {hostel.vegetarienMess ? "Veg Only" : hostel.isNonVeg ? "Non-Veg Allowed" : "Food Policy Not Specified"}
              </span>
            </div>
          </div>

          {/* Location Section */}
          <div className="w-[795px] mb-8">
            <div className="flex items-center">
              <h2 className="font-normal text-black text-[40px] ml-5">
                Location
              </h2>
            </div>
            <Separator className="mb-6" />

            <div className="flex items-center ml-[26px]">
              <div className="w-[60px] h-[60px] bg-[#c7c7c7] rounded-[30px] opacity-60 flex items-center justify-center">
                <LocationIcon className="w-[21px] h-[30px]" />
              </div>
              <span className="ml-[20px] font-black text-black text-lg">
                {hostel.address}, {hostel.city}, {hostel.state}
              </span>
            </div>
          </div>

          {/* About Section */}
          <div className="w-[795px]">
            <div className="flex items-center">
              <h2 className="font-normal text-black text-[40px] ml-5">About</h2>
            </div>
            <Separator className="mb-6" />

            <p className="ml-[23px] font-normal text-black text-lg">
              {hostel.about || (
                <>
                  Welcome to <span className="font-bold">{hostel.name}</span>,
                  your home away from home! Nestled in a peaceful yet vibrant
                  location, our hostel offers a comfortable and relaxing stay for
                  travelers and students alike. With a focus on providing the
                  essentials for a hassle-free experience, we feature clean and cozy
                  rooms with attached bathrooms, ensuring your privacy and
                  convenience. Stay connected with our complimentary high-speed
                  Wi-Fi, whether you're working, streaming, or keeping in touch
                  with loved ones.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="flex-shrink-0">
          <BookingForm 
            price={hostel.price} 
            gender={hostel.gender}
          />
          </div>
      </div>
    </div>
  );
}