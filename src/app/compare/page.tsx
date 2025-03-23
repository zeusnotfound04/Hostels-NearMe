'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCompare } from '@/context/compare-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, X, Plus } from 'lucide-react';
import { Hostel } from '@/types';
import { FemaleIcon, MaleIcon 
} from '@/components/ui/icon';

const MIN_HOSTELS_FOR_COMPARISON = 2;

const HOSTEL_TYPE_DISPLAY_MAP = {
  'SINGLE': 'Single',
  'SHARED': 'Shared',
  'DORMITORY': 'Dormitory'
};

export default function ComparePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { compareList, removeFromCompare } = useCompare();
  const [hostels, setHostels] = useState<Hostel[]>([]);

  // Get hostels from URL or use compare list
  useEffect(() => {
    const hostelParam = searchParams.get('hostels');
    
    if (hostelParam) {
      const hostelIds = hostelParam.split(',');
      setHostels(compareList.filter(h => hostelIds.includes(h.id)));
    } else {
      setHostels(compareList);
    }
  }, [compareList, searchParams]);

  // Calculate grid columns class based on number of hostels
  const gridColsClass = useMemo(() => {
    const gridCols = hostels.length + 1;
    return `grid-cols-${gridCols > 4 ? 4 : gridCols}`;
  }, [hostels.length]);

  // Navigation handlers
  const handleBack = () => router.back();
  
  const handleRemove = (hostelId: string) => {
    removeFromCompare(hostelId);
    
    // If we're removing the last hostel or second-to-last, go back
    if (hostels.length <= MIN_HOSTELS_FOR_COMPARISON) {
      router.back();
    }
  };
  
  const handleAddMore = () => router.push('/hostels');
  
  const navigateToHostelDetails = (hostelId: string) => router.push(`/hostel/${hostelId}`);

  // Function to get hostel type display name
  const getHostelTypeDisplay = (type: string | undefined): string => {
    if (!type) return "N/A";
    return HOSTEL_TYPE_DISPLAY_MAP[type as keyof typeof HOSTEL_TYPE_DISPLAY_MAP] || type;
  };

  // Memoized amenities function to prevent recalculations on each render
  const getAmenities = useMemo(() => {
    return (hostel: Hostel): string[] => {
      const amenities: string[] = [];
      
      // Room amenities
      if (hostel.bed) amenities.push("Bed");
      if (hostel.table) amenities.push("Table");
      if (hostel.chair) amenities.push("Chair");
      if (hostel.Almirah) amenities.push("Almirah");
      if (hostel.pillow) amenities.push("Pillow");
      if (hostel.attachedWashroom) amenities.push("Attached Washroom");
      if (hostel.airconditioner) amenities.push("Air Conditioner");
      if (hostel.cooler) amenities.push("Cooler");
      if (hostel.geyser) amenities.push("Geyser");
      
      // Facility amenities
      if (hostel.wiFi) amenities.push("Wi-Fi");
      if (hostel.parking) amenities.push("Parking");
      if (hostel.cctv) amenities.push("CCTV");
      if (hostel.securityGuard) amenities.push("Security Guard");
      if (hostel.gym) amenities.push("Gym");
      if (hostel.indoorGames) amenities.push("Indoor Games");
      
      // Utilities
      if (hostel.waterByRO) amenities.push("RO Water");
      if (hostel.allDayWaterSupply) amenities.push("24×7 Water Supply");
      if (hostel.allDayElectricity) amenities.push("24×7 Electricity");
      if (hostel.inverterBackup) amenities.push("Inverter Backup");
      if (hostel.generator) amenities.push("Generator");
      if (hostel.biweeklycleaning) amenities.push("Bi-weekly Cleaning");
      
      // Food related
      if (hostel.foodIncluded) amenities.push("Food Included");
      if (hostel.vegetarienMess) amenities.push("Vegetarian Mess");
      if (hostel.isNonVeg) amenities.push("Non-Veg Allowed");
      
      // Staff
      if (hostel.allDayWarden) amenities.push("24×7 Warden");
      
      return amenities;
    };
  }, []);

  // Get hostel rules based on hostel properties
  const getHostelRules = useMemo(() => {
    return (hostel: Hostel): string[] => {
      const rules: string[] = [];
      
      // Add dietary restrictions
      if (!hostel.isNonVeg) {
        rules.push("Non-Veg Not Allowed");
      }
      
      // More rules can be added here based on other hostel properties
      
      return rules;
    };
  }, []);

  // Early return for insufficient hostels
  if (hostels.length < MIN_HOSTELS_FOR_COMPARISON) {
    return (
      <div className="max-w-5xl mx-auto p-5 pt-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Hostel Comparison</h1>
        <p className="mb-8 text-gray-500">Not enough hostels to compare. Please add at least 2 hostels to compare.</p>
        <Button onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  // Render comparison table rows as a reusable component
  const renderComparisonRow = (
    label: string, 
    renderContent: (hostel: Hostel) => React.ReactNode
  ) => (
    <div className={`grid grid-cols-${hostels.length + 1} gap-4 items-center border-b border-dashed border-[#912923] py-4`}>
      <div>
        <div className="bg-[#912923] text-white rounded-md py-2 px-6 inline-block">
          <span className="font-bold">{label}</span>
        </div>
      </div>
      {hostels.map((hostel) => (
        <div key={`${hostel.id}-${label.toLowerCase().replace(/\s+/g, '-')}`} className="text-center">
          <div className="bg-[#d9d9d9] rounded-md py-2 px-6 inline-block">
            {renderContent(hostel)}
          </div>
        </div>
      ))}
    </div>
  );

  // Render list items in a consistent format for both amenities and rules
  const renderListItems = (items: string[]) => {
    return items.length > 0 ? (
      items.map((item, index) => <li key={index}>{item}</li>)
    ) : (
      <li>None listed</li>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Hostel Comparison</h1>
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Button>
      </div>
      
      {/* Hostel Cards */}
      <div className={`grid grid-cols-1 md:${gridColsClass} gap-6`}>
        {/* Add Another Hostel Card */}
        <div className="flex flex-col items-center justify-center cursor-pointer" onClick={handleAddMore}>
          <div className="border-2 border-dashed border-[#912923] rounded-md p-10 mb-2 flex items-center justify-center h-[150px] w-full">
            <Plus className="h-10 w-10 text-[#858484]" />
          </div>
          <button className="bg-[#d9d9d9] rounded-md px-4 py-2 text-sm">Add another hostel</button>
        </div>

        {/* Hostel Cards */}
        {hostels.map((hostel) => (
          <div key={hostel.id} className="flex flex-col relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute -top-1 -right-1 h-7 w-7 p-0 rounded-full hover:bg-gray-200 z-10"
              onClick={() => handleRemove(hostel.id)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="rounded-md overflow-hidden mb-2 w-full h-[150px] relative">
              {Array.isArray(hostel.images) && hostel.images.length > 0 ? (
                <Image
                  src={hostel.images[0]}
                  alt={hostel.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                  priority={true}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-400">No Image</p>
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold text-center">{hostel.name}</h3>
            <div className="flex justify-center mt-2">
              <Badge className="bg-[#902920] text-white rounded-full px-3 py-1 flex items-center gap-1">
                {hostel.gender === "BOYS" ? 
                  <MaleIcon className="w-3.5 h-3.5" /> : 
                  <FemaleIcon className="w-3.5 h-3.5" />
                }
                <span className="font-bold text-xs">
                  {hostel.gender === "BOYS" ? "BOYS" : "GIRLS"}
                </span>
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table - New Design */}
      <div className="mt-8 overflow-x-auto">
        {/* Price Row */}
        {renderComparisonRow(
          "Price", 
          (hostel) => <span className="font-bold">₹{hostel.price}/-</span>
        )}

        {/* Address Row */}
        {renderComparisonRow(
          "Address", 
          (hostel) => <span>{hostel.address || "N/A"}</span>
        )}

        {/* Hostel Type Row */}
        {renderComparisonRow(
          "Hostel Type", 
          (hostel) => <span>{getHostelTypeDisplay(hostel.hostelType)}</span>
        )}

        {/* Gender Row */}
        {renderComparisonRow(
          "Gender", 
          (hostel) => <span>{hostel.gender === "BOYS" ? "Boys" : "Girls"}</span>
        )}

        {/* Hostel Rules Row - New Addition */}
        <div className={`grid grid-cols-${hostels.length + 1} gap-4 items-start border-b border-dashed border-[#912923] py-4`}>
          <div>
            <div className="bg-[#912923] text-white rounded-md py-2 px-6 inline-block">
              <span className="font-bold">Hostel Rules</span>
            </div>
          </div>
          {hostels.map((hostel) => {
            const rules = getHostelRules(hostel);
            return (
              <div key={`${hostel.id}-rules`} className="text-left">
                <div className="bg-[#d9d9d9] rounded-md py-4 px-6">
                  <ul className="list-disc pl-4 space-y-2">
                    {renderListItems(rules)}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Amenities Row */}
        <div className={`grid grid-cols-${hostels.length + 1} gap-4 items-start border-b border-dashed border-[#912923] py-4`}>
          <div>
            <div className="bg-[#912923] text-white rounded-md py-2 px-6 inline-block">
              <span className="font-bold">Amenities</span>
            </div>
          </div>
          {hostels.map((hostel) => {
            const amenities = getAmenities(hostel);
            return (
              <div key={`${hostel.id}-amenities`} className="text-left">
                <div className="bg-[#d9d9d9] rounded-md py-4 px-6">
                  <ul className="list-disc pl-4 space-y-2">
                    {renderListItems(amenities)}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Availability Row */}
        {renderComparisonRow(
          "Availability", 
          (hostel) => (
            <span className={hostel.isAvailable ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
              {hostel.isAvailable ? "Available" : "Not Available"}
            </span>
          )
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {hostels.map((hostel) => (
          <div key={`${hostel.id}-action`} className="flex justify-center">
            <Button 
              className="bg-[#f10000] hover:bg-[#d10000] text-white w-full max-w-xs"
              onClick={() => navigateToHostelDetails(hostel.id)}
            >
              View Details
            </Button>
          </div>
        ))}
      </div>

      {/* Made in India */}
      <div className="text-center mt-16 mb-8">
        <p className="text-lg font-bold">
          Made in <span className="text-[#912923]">India</span>. For the <span className="text-[#912923]">World</span>
        </p>
      </div>

      <div className="flex justify-center mt-6">
        <Button variant="outline" onClick={handleBack}>
          Back to Listings
        </Button>
      </div>
    </div>
  );
}