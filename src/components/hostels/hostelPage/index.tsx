"use client"
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  FemaleIcon,
  LocationIcon,
  MaleIcon,
  VegetarianMessIcon,
} from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { HostelPageProps } from "@/types";
import Image from "next/image";
import BookingForm from "./bookingForm";
import { facilityIcons } from "@/constants/label";
import { X, ChevronLeft, ChevronRight, Maximize } from "lucide-react";

export default function HostelPage({ hostelId, hostel }: HostelPageProps) {
  // State for fullscreen gallery
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Filter available facilities
  const availableFacilities = facilityIcons.filter(
    (facility) => hostel[facility.property as keyof typeof hostel] === true
  );

  // Handle fullscreen toggle
  const toggleFullscreen = (index: number) => {
    setActiveImageIndex(index);
    setIsFullscreen(!isFullscreen);
  };

  // Handle navigation
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => 
      prev === 0 ? (hostel.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => 
      prev === (hostel.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full relative px-4 md:px-8 lg:px-0">
      {/* Header Section */}
      <div className="w-full mb-4 md:mb-8">
        <div className="ml-0 md:ml-4 lg:ml-[138px]">
          <div className="text-base md:text-xl">
            <span className="font-black text-[#902920]">Hostels NearMe</span>
            <span className="font-semibold text-black">
              /{hostel.city}/{hostel.name}
            </span>
          </div>

          <h1 className="font-black text-black text-2xl md:text-3xl lg:text-[40px] mt-3 md:mt-6">
            {hostel.name}
          </h1>

          <div className="flex items-center mt-2">
            <LocationIcon className="w-4 h-6 md:w-[21px] md:h-[30px] mr-2" />
            <span className="font-light text-black text-lg md:text-xl lg:text-[25px]">
              {hostel.address}, {hostel.city}
            </span>
          </div>

          <div className="absolute top-4 right-4">
            <Badge className="bg-[#902920] text-white rounded-full px-3 py-1 md:px-4 md:py-1.5 flex items-center gap-1 shadow-sm">
              {hostel.gender === "BOYS" ? (
                <MaleIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
              ) : (
                <FemaleIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
              )}
              <span className="font-bold text-xs tracking-wide">
                {hostel.gender === "BOYS" ? "BOYS" : "GIRLS"}
              </span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col ml-0 md:ml-4 lg:ml-[131px]">
        {/* Image Gallery and Booking Form Row for Desktop */}
        <div className="flex flex-col lg:flex-row lg:gap-6 mb-6">
          {/* Image Gallery */}
          <Card className="w-full lg:w-[815px] h-auto rounded-[10px] bg-[#f5f5f5] mb-6 lg:mb-0 shadow-md">
            <CardContent className="p-3 md:p-4">
              {hostel.images && hostel.images.length > 0 ? (
                <>
                  <div 
                    className="w-full h-[200px] md:h-[300px] lg:h-[352px] relative mb-3 md:mb-4 rounded-md overflow-hidden group cursor-pointer"
                    onClick={() => toggleFullscreen(0)}
                  >
                    <Image
                      className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                      alt={`${hostel.name} main view`}
                      src={hostel.images[0]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 781px"
                      priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <Maximize className="text-white opacity-0 group-hover:opacity-100 w-10 h-10" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 md:gap-4 h-[80px] md:h-[120px] lg:h-[168px]">
                    {hostel.images.slice(1, 4).map((image, index) => (
                      <div 
                        key={index} 
                        className="relative rounded-md overflow-hidden group cursor-pointer"
                        onClick={() => toggleFullscreen(index + 1)}
                      >
                        <Image
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          alt={`${hostel.name} view ${index + 1}`}
                          src={image}
                          fill
                          sizes="(max-width: 640px) 33vw, (max-width: 768px) 33vw, 240px"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <Maximize className="text-white opacity-0 group-hover:opacity-100 w-6 h-6" />
                        </div>
                      </div>
                    ))}
                    {/* If less than 3 additional images, add placeholders */}
                    {Array.from({ length: Math.max(0, 4 - hostel.images.length) }).map((_, index) => (
                      <div key={`placeholder-${index}`} className="flex-1 bg-gray-200 rounded-md" />
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full h-[300px] md:h-[400px] lg:h-[520px] bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No images available</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Booking Form - Desktop Position (Right Side) */}
          <div className="hidden lg:block flex-shrink-0">
            <BookingForm
              hostelId={hostel.id}
              hostelName={hostel.name}
              price={hostel.price}
              gender={hostel.gender}
            />
          </div>
        </div>

        {/* Fullscreen Gallery Modal */}
        {isFullscreen && hostel.images && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close button */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Navigation buttons */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={handleNextImage}
                className="absolute right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Main image */}
              <div className="relative w-[90%] h-[80%] md:w-[80%] md:h-[80%]">
                <Image
                  src={hostel.images[activeImageIndex]}
                  alt={`${hostel.name} view ${activeImageIndex}`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-4 py-2 rounded-full text-white text-sm">
                {activeImageIndex + 1} / {hostel.images.length}
              </div>
            </div>
          </div>
        )}

        {/* Booking Form - Mobile Position (Below Image Gallery) */}
        <div className="mb-6 lg:hidden flex justify-center">
          <BookingForm
            hostelId={hostel.id}
            hostelName={hostel.name}
            price={hostel.price}
            gender={hostel.gender}
          />
        </div>
        <hr />
        <br />
        {/* Info Sections */}
        <div className="flex flex-col w-full lg:w-[795px]">
          {/* Facilities Section */}
          <div className="w-full mb-6 md:mb-8">
            <div className="flex items-center">
              <h2 className="font-normal text-black text-2xl md:text-3xl lg:text-[40px] ml-2 md:ml-5">
                Facilities
              </h2>
            </div>
            <Separator className="mb-4 md:mb-6" />

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 ml-2 md:ml-5">
              {availableFacilities.map((facility, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[#c7c7c7] rounded-[30px] opacity-60 flex items-center justify-center">
                    {facility.icon}
                  </div>
                  <span className="ml-3 md:ml-[18px] font-black text-black text-sm md:text-lg">
                    {facility.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <br />

          {/* House Rules Section */}
          <div className="w-full mb-6 md:mb-8">
            <div className="flex items-center">
              <h2 className="font-normal text-black text-2xl md:text-3xl lg:text-[40px] ml-2 md:ml-5">
                House Rules
              </h2>
            </div>
            <Separator className="mb-4 md:mb-6" />

            <div className="flex items-center ml-2 md:ml-5">
              <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[#c7c7c7] rounded-[30px] opacity-60 flex items-center justify-center">
                <VegetarianMessIcon className="w-6 h-6" />
              </div>
              <span className="ml-3 md:ml-[18px] font-black text-black text-sm md:text-lg">
                {hostel.vegetarienMess
                  ? "Veg Only"
                  : hostel.isNonVeg
                  ? "Non-Veg Allowed"
                  : "Food Policy Not Specified"}
              </span>
            </div>
          </div>
          <hr />
          <br />
          {/* Location Section */}
          <div className="w-full mb-6 md:mb-8">
            <div className="flex items-center">
              <h2 className="font-normal text-black text-2xl md:text-3xl lg:text-[40px] ml-2 md:ml-5">
                Location
              </h2>
            </div>
            <Separator className="mb-4 md:mb-6" />

            <div className="flex items-center ml-2 md:ml-[26px]">
              <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[#c7c7c7] rounded-[30px] opacity-60 flex items-center justify-center">
                <LocationIcon className="w-4 h-6 md:w-[21px] md:h-[30px]" />
              </div>
              <span className="ml-3 md:ml-[20px] font-black text-black text-sm md:text-lg">
                {hostel.address}, {hostel.city}, {hostel.state}
              </span>
            </div>
          </div>

          <hr />
          <br />

          {/* About Section */}
          <div className="w-full mb-6 md:mb-8">
            <div className="flex items-center">
              <h2 className="font-normal text-black text-2xl md:text-3xl lg:text-[40px] ml-2 md:ml-5">
                About
              </h2>
            </div>
            <Separator className="mb-4 md:mb-6" />

            <p className="ml-2 md:ml-[23px] font-normal text-black text-sm md:text-lg">
              {hostel.about || (
                <>
                  Welcome to <span className="font-bold">{hostel.name}</span>,
                  your home away from home! Nestled in a peaceful yet vibrant
                  location, our hostel offers a comfortable and relaxing stay for
                  travelers and students alike. With a focus on providing the
                  essentials for a hassle-free experience, we feature clean and
                  cozy rooms with attached bathrooms, ensuring your privacy and
                  convenience. Stay connected with our complimentary high-speed
                  Wi-Fi, whether you're working, streaming, or keeping in touch
                  with loved ones.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}