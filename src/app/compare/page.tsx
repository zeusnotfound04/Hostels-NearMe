'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCompare } from '@/context/compare-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, X } from 'lucide-react';
import { Hostel } from '@/types';
import {
  LocationIcon, FemaleIcon, AirConditionerIcon, VegetarianMessIcon, 
  WashroomIcon, WifiIcon, CCTVIcon, ElectricityIcon, GymIcon, 
  IndoorGamesIcon, SecurityGuardIcon, ParkingIcon, FoodIcon, 
  ROWaterIcon, MaleIcon 
} from '@/components/ui/icon';

export default function ComparePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { compareList, removeFromCompare } = useCompare();
  const [hostels, setHostels] = useState<Hostel[]>([]);

  useEffect(() => {
    // Get hostels from URL or use compare list
    const hostelParam = searchParams.get('hostels');
    
    if (hostelParam) {
      // If hostels are specified in URL, filter the compare list by those IDs
      const hostelIds = hostelParam.split(',');
      const filteredHostels = compareList.filter(h => hostelIds.includes(h.id));
      setHostels(filteredHostels);
    } else {
      // Otherwise use the current compare list
      setHostels(compareList);
    }
  }, [compareList, searchParams]);

  // Return to previous page
  const handleBack = () => {
    router.back();
  };

  // Handle removing a hostel from comparison
  const handleRemove = (hostelId: string) => {
    removeFromCompare(hostelId);
    
    // If we're removing the last hostel or second-to-last, go back
    if (hostels.length <= 2) {
      router.back();
    }
  };

  if (hostels.length < 2) {
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

  // Define all possible amenities for comparison
  const amenityDefinitions = [
    { key: 'airconditioner', label: 'Air Conditioner', icon: <AirConditionerIcon width={16} height={16} color="black" /> },
    { key: 'cooler', label: 'Cooler', icon: <AirConditionerIcon width={16} height={16} color="black" /> },
    { key: 'isNonVeg', label: 'Non-Veg Allowed', icon: <VegetarianMessIcon width={16} height={16} color="black" /> },
    { key: 'attachedWashroom', label: 'Attached Washroom', icon: <WashroomIcon width={16} height={16} color="black"/> },
    { key: 'wiFi', label: 'WiFi', icon: <WifiIcon width={16} height={16} color="black" /> },
    { key: 'cctv', label: 'CCTV', icon: <CCTVIcon width={16} height={16} color="black" /> },
    { key: 'inverterBackup', label: 'Inverter Backup', icon: <ElectricityIcon width={16} height={16} color="black" /> },
    { key: 'generator', label: 'Generator', icon: <ElectricityIcon width={16} height={16} color="black" /> },
    { key: 'gym', label: 'Gym', icon: <GymIcon width={16} height={16} color="black" /> },
    { key: 'indoorGames', label: 'Indoor Games', icon: <IndoorGamesIcon width={16} height={16} color="black"/> },
    { key: 'securityGuard', label: 'Security Guard', icon: <SecurityGuardIcon width={16} height={16} color="black" /> },
    { key: 'parking', label: 'Parking', icon: <ParkingIcon width={16} height={16} color="black" /> },
    { key: 'foodIncluded', label: 'Food Included', icon: <FoodIcon width={16} height={16} color="black" /> },
    { key: 'waterByRO', label: 'RO Water', icon: <ROWaterIcon width={16} height={16} color="black" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto p-5 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hostel Comparison</h1>
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          {/* Header */}
          <thead>
            <tr>
              <th className="p-3 bg-gray-50 text-left w-48 font-semibold text-gray-700 border-b"></th>
              
              {hostels.map((hostel) => (
                <th key={hostel.id} className="p-3 bg-gray-50 border-b min-w-64 w-1/4">
                  <div className="relative">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute -top-1 -right-1 h-7 w-7 p-0 rounded-full hover:bg-gray-200"
                      onClick={() => handleRemove(hostel.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    
                    <div className="text-center space-y-2">
                      <div className="relative h-40 w-full mb-2 overflow-hidden rounded-md">
                        {Array.isArray(hostel.images) && hostel.images.length > 0 ? (
                          <Image
                            src={hostel.images[0]}
                            alt={hostel.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <p className="text-gray-400">No Image</p>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="font-bold">{hostel.name}</h3>
                      
                      <div className="flex justify-center">
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
                      
                      <div className="flex items-center justify-center text-sm text-gray-600">
                        <LocationIcon className="w-3.5 h-3.5 mr-1" />
                        <span>{hostel.city}, {hostel.state}</span>
                      </div>
                      
                      <div className="font-bold text-xl text-[#f10000]">₹{hostel.price}/-</div>
                      
                      <Button 
                        className="bg-[#f10000] hover:bg-[#d10000] text-white w-full"
                        onClick={() => router.push(`/hostel/${hostel.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {/* Basic Information Section */}
            <tr>
              <td colSpan={hostels.length + 1} className="p-3 bg-gray-100 font-bold border-b">
                Basic Information
              </td>
            </tr>
            <tr>
              <td className="p-3 border-b font-medium">Address</td>
              {hostels.map((hostel) => (
                <td key={`${hostel.id}-address`} className="p-3 border-b text-center">
                  {hostel.address || "N/A"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 border-b font-medium">Type</td>
              {hostels.map((hostel) => (
                <td key={`${hostel.id}-type`} className="p-3 border-b text-center">
                  {hostel.hostelType || "N/A"}
                </td>
              ))}
            </tr>
          
            <tr>
              <td className="p-3 border-b font-medium">Room Type</td>
              {hostels.map((hostel) => (
                <td key={`${hostel.id}-roomType`} className="p-3 border-b text-center">
                  {hostel.hostelType || "N/A"}
                </td>
              ))}
            </tr>
            
            {/* Amenities Section */}
            <tr>
              <td colSpan={hostels.length + 1} className="p-3 bg-gray-100 font-bold border-b">
                Amenities
              </td>
            </tr>
            
            {amenityDefinitions.map((amenity) => (
              <tr key={amenity.key}>
                <td className="p-3 border-b font-medium flex items-center gap-2">
                  {amenity.icon}
                  {amenity.label}
                </td>
                {hostels.map((hostel) => (
                  <td key={`${hostel.id}-${amenity.key}`} className="p-3 border-b text-center">
                    {hostel[amenity.key as keyof Hostel] === true ? (
                      <span className="text-green-600 font-bold">✓</span>
                    ) : hostel[amenity.key as keyof Hostel] === false ? (
                      <span className="text-red-500 font-bold">✗</span>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            
            {/* Rules Section
            <tr>
              <td colSpan={hostels.length + 1} className="p-3 bg-gray-100 font-bold border-b">
                Rules and Policies
              </td>
            </tr>
           

            <tr>
              <td className="p-3 border-b font-medium">Notice Period</td>
              {hostels.map((hostel) => (
                <td key={`${hostel.id}-notice`} className="p-3 border-b text-center">
                  {hostel.noticePeriod ? `${hostel.noticePeriod} days` : "N/A"}
                </td>
              ))}
            </tr>
             */}
            {/* Contact Section */}
            {/* <tr>
              <td colSpan={hostels.length + 1} className="p-3 bg-gray-100 font-bold border-b">
                Contact Information
              </td>
            </tr>
            <tr>
              <td className="p-3 border-b font-medium">Owner Name</td>
              {hostels.map((hostel) => (
                <td key={`${hostel.id}-owner`} className="p-3 border-b text-center">
                  {hostel.ownerName || "N/A"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 border-b font-medium">Phone Number</td>
              {hostels.map((hostel) => (
                <td key={`${hostel.id}-phone`} className="p-3 border-b text-center">
                  {hostel.phoneNumber || "N/A"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 border-b font-medium">Email</td>
              {hostels.map((hostel) => (
                <td key={`${hostel.id}-email`} className="p-3 border-b text-center">
                  {hostel.email || "N/A"}
                </td>
              ))}
            </tr> */}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-center mt-6">
        <Button variant="outline" onClick={handleBack}>
          Back to Listings
        </Button>
      </div>
    </div>
  );
}