"use client";

import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { GenderIcon, BedIcon, SharingIcon, SortingIcon, NextIcon, NearByIcon } from "@/components/ui/icon";
import Image from "next/image";
import { HostelCard } from "./HostelCard";
import { useFetchHostels } from "@/hooks/useFetchHostels";
import FacilityIcon from "../../../public/icons/Facility.png";
import { Hostel } from "@/types/index";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Checkbox,
} from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ScrollReveal from "../ui/animations/scrollReveal";

const filterOptions = [
  { id: 1, name: "Gender", icon: <GenderIcon className="w-4 h-4" /> },
  { id: 2, name: "Accommodation type", icon: <BedIcon color="#000000" className="w-4 h-4" /> },
  { id: 3, name: "Facility type", icon: <Image src={FacilityIcon} width={16} height={16} alt="Facility" /> },
  { id: 4, name: "Sharing type", icon: <SharingIcon className="w-4 h-4" /> },
  { id: 5, name: "Sort", icon: <SortingIcon className="w-4 h-4" /> },
  { id: 6, name: "Nearby Coaching", icon: <NearByIcon color="#000000" className="w-4 h-4" /> },
];

const facilityOptions = [
  { id: "attachedWashroom", label: "Attached Washroom" },
  { id: "cctv", label: "CCTV" },
  { id: "wifi", label: "WiFi" },
  { id: "cooler", label: "Cooler" },
  { id: "inverterBackup", label: "Inverter Backup" },
  { id: "parking", label: "Parking" },
  { id: "biweeklycleaning", label: "Bi-weekly Cleaning" },
  { id: "allDayElectricity", label: "24/7 Electricity" },
  { id: "geyser", label: "Geyser" },
  { id: "indoorGames", label: "Indoor Games" },
  { id: "waterByRO", label: "RO Water" },
  { id: "securityGuard", label: "Security Guard" },
  { id: "foodIncluded", label: "Food Included" },
  { id: "vegetarienMess", label: "Vegetarian Mess" },
  { id: "allDayWaterSupply", label: "24/7 Water Supply" },
  { id: "gym", label: "Gym" },
  { id: "allDayWarden", label: "24/7 Warden" },
  { id: "airconditioner", label: "Air Conditioner" },
];

const coachingOptions = [
  { id: "ALLEN CAREER OF COACHING", label: "ALLEN CAREER OF COACHING" },
  { id: "Physics Wallah", label: "Physics Wallah" },
  { id: "Akash", label: "Akash" },
  { id: "Lakshay", label: "Lakshay" },
  { id: "Impact", label: "Impact" },
];

const sortingOptions = [
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" },
  { id: "newest", label: "Newest First" },
];

export default function HostelListing() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState<number | null>(null);
  
  const [filters, setFilters] = useState({
    gender: "",
    hostelType: "",
    facilities: [] as string[],
    sharingType: "",
    sort: "",
    priceRange: [0, 50000] as [number, number],
    nearByCoaching: "",
  });

  const [queryParams, setQueryParams] = useState<{
    page: number;
    search: string;
    city: string;
    gender: string;
    hostelType: string;
    minPrice?: number | undefined;  
    maxPrice?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: 'asc' | 'desc' | undefined;
    nearByCoaching?: string | undefined;
  }>({
    page: 1,
    search: "",
    city: "",
    gender: "",
    hostelType: "",
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: undefined,
    sortOrder: undefined,
    nearByCoaching: undefined,
  });

  useEffect(() => {
    const newQueryParams = {
      page: parseInt(searchParams.get("page") || "1"),
      search: searchParams.get("search") || "",
      city: searchParams.get("city") || "",
      gender: searchParams.get("gender") || "",
      hostelType: searchParams.get("hostelType") || "",
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      sortOrder: (searchParams.get("sortOrder") as 'asc' | 'desc' | null) || undefined,
      nearByCoaching: searchParams.get("nearByCoaching") || undefined,
    };

    setQueryParams(newQueryParams);

    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");
    let sortValue = "";
    if (sortBy && sortOrder) {
        sortValue = `${sortBy}_${sortOrder}`;
    }
    
    setFilters(prev => ({
      ...prev,
      gender: searchParams.get("gender") || "",
      hostelType: searchParams.get("hostelType") || "",
      priceRange: [
          searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0,
          searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 50000
      ],
      sort: sortValue,
    }));
    console.log(filters)
    console.log(queryParams)

  }, [searchParams]);

  const { data, isLoading, error } = useFetchHostels(queryParams);

  const hostels = data?.hostels || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const currentPage = queryParams.page;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const url = new URL(window.location.href);
    url.searchParams.set("page", newPage.toString());
    router.push(url.pathname + url.search);
  };

  const handleOpenDialog = (filterId: number) => {
    setOpenDialog(filterId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const handleApplyFilters = () => {
    const url = new URL(window.location.href);
    
    url.searchParams.set("page", "1");

    if (filters.gender) {
      url.searchParams.set("gender", filters.gender);
    } else {
      url.searchParams.delete("gender");
    }

    if (filters.nearByCoaching) {
      url.searchParams.set("nearByCoaching", filters.nearByCoaching);
    } else {
      url.searchParams.delete("nearByCoaching");
    }
    
    if (filters.hostelType) {
      url.searchParams.set("hostelType", filters.hostelType);
    } else {
      url.searchParams.delete("hostelType");
    }
    
    url.searchParams.set("minPrice", filters.priceRange[0].toString());
    url.searchParams.set("maxPrice", filters.priceRange[1].toString());
    
    if (filters.sort) {
      // Parse the combined sort parameter
      const [sortBy, sortOrder] = filters.sort.split('_');
      url.searchParams.set("sortBy", sortBy);
      url.searchParams.set("sortOrder", sortOrder);
    } else {
      url.searchParams.delete("sortBy");
      url.searchParams.delete("sortOrder");
    }
    
    // Apply facility filters
    // This would require backend support for filtering by facilities
    
    // Close dialog before navigation
    handleCloseDialog();
    
    // Navigate to the new URL
    router.push(url.pathname + url.search);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">Error loading hostels.</p>
      </div>
    );
  }

  return (
    <div className="px-4 mt-2 md:px-6 max-w-6xl mx-auto">
      
      <div className="flex gap-2 mb-6 justify-center overflow-x-auto">
        {filterOptions.map((filter) => (
          <Button
            key={filter.id}
            variant="outline"
            className="min-w-[120px] h-10 sm:h-8 bg-[#cecece] rounded-full border border-[#902920] flex items-center gap-1 px-4 sm:px-3 text-sm transition duration-150 ease-in-out hover:bg-[#d3d3d3]"
            onClick={() => handleOpenDialog(filter.id)}
          >
            <span className="mr-1">{filter.icon}</span>
            <span className="font-normal text-black text-xs md:text-sm">{filter.name}</span>
            <ChevronDownIcon className="w-3 h-3 ml-1" />
          </Button>
        ))}
      </div>
      
      {/* Gender Filter Dialog */}
      <Dialog open={openDialog === 1} onOpenChange={() => handleCloseDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter by Gender</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup 
              value={filters.gender} 
              onValueChange={(value) => setFilters({...filters, gender: value})}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="BOYS" id="boys" />
                <Label htmlFor="boys">Boys Hostel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="GIRLS" id="girls" />
                <Label htmlFor="girls">Girls Hostel</Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleApplyFilters} className="bg-[#902920]">Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Accommodation Type Dialog */}
      <Dialog open={openDialog === 2} onOpenChange={() => handleCloseDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter by Accommodation Type</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup 
              value={filters.hostelType} 
              onValueChange={(value) => setFilters({...filters, hostelType: value})}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SINGLE" id="single" />
                <Label htmlFor="single">Single Room</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SHARED" id="shared" />
                <Label htmlFor="shared">Shared Room</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="DORMITORY" id="dormitory" />
                <Label htmlFor="dormitory">Dormitory</Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleApplyFilters} className="bg-[#902920]">Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Facility Type Dialog */}
      <Dialog open={openDialog === 3} onOpenChange={() => handleCloseDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter by Facilities</DialogTitle>
          </DialogHeader>
          <div className="py-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {facilityOptions.map((facility) => (
                <div key={facility.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={facility.id} 
                    checked={filters.facilities.includes(facility.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({
                          ...filters, 
                          facilities: [...filters.facilities, facility.id]
                        });
                      } else {
                        setFilters({
                          ...filters, 
                          facilities: filters.facilities.filter(id => id !== facility.id)
                        });
                      }
                    }}
                  />
                  <Label htmlFor={facility.id}>{facility.label}</Label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleApplyFilters} className="bg-[#902920]">Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Sharing Type Dialog - Maps to hostelType */}
      <Dialog open={openDialog === 4} onOpenChange={() => handleCloseDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter by Sharing Type</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup 
              value={filters.hostelType} 
              onValueChange={(value) => setFilters({...filters, hostelType: value})}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SINGLE" id="sharing-single" />
                <Label htmlFor="sharing-single">Single Occupancy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SHARED" id="sharing-shared" />
                <Label htmlFor="sharing-shared">Double Sharing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="DORMITORY" id="sharing-dormitory" />
                <Label htmlFor="sharing-dormitory">Multiple Sharing</Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleApplyFilters} className="bg-[#902920]">Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Sort Dialog */}
      <Dialog open={openDialog === 5} onOpenChange={() => handleCloseDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sort Hostels</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup 
              value={filters.sort} 
              onValueChange={(value) => setFilters({...filters, sort: value})}
              className="flex flex-col gap-2"
            >
              {sortingOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="py-4">
            <h3 className="mb-4 font-medium">Price Range</h3>
            <div className="px-2">
              <Slider
                defaultValue={filters.priceRange}
                max={50000}
                step={1000}
                value={filters.priceRange}
                onValueChange={(value) => setFilters({...filters, priceRange: value as [number, number]})}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>₹{filters.priceRange[0]}</span>
                <span>₹{filters.priceRange[1]}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleApplyFilters} className="bg-[#902920]">Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={openDialog === 6} onOpenChange={() => handleCloseDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter by Nearby Coaching</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup 
              value={filters.nearByCoaching} 
              onValueChange={(value) => setFilters({...filters, nearByCoaching: value})}
              className="flex flex-col gap-2"
            >
              {coachingOptions.map((coaching) => (
                <div key={coaching.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={coaching.id} id={`coaching-${coaching.id}`} />
                  <Label htmlFor={`coaching-${coaching.id}`}>{coaching.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleApplyFilters} className="bg-[#902920]">Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  
      <div className="space-y-6">
        {hostels.length > 0 ? (
          hostels.map((hostel: Hostel) => <HostelCard key={hostel.id} hostel={hostel} />)
        ) : (
          <div className="text-center text-gray-600">No hostels found.</div>
        )}
      </div>

      <div className="flex justify-center mt-8 gap-4">
        <Button
          className="w-[50px] h-[50px] bg-[#902920] text-white rounded-[10px] p-0"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <span className="font-black text-[25px]">{currentPage - 1}</span>
        </Button>

        <Button className="w-[50px] h-[50px] bg-[#902920] text-white rounded-[10px] p-0" disabled>
          <span className="font-black text-[25px]">{currentPage}</span>
        </Button>

        <Button
          className="w-[50px] h-[50px] bg-[#902920] text-white rounded-[10px] p-0"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          <NextIcon className="w-7 h-[18px]" />
        </Button>
      </div>


      <div className="text-center mt-10 font-bold text-gray-600 text-xl">
        <p>
          Made in <span className="text-red-900">India</span>. For the <span className="text-red-900">World</span>
        </p>
      </div>
    </div>
  );
}