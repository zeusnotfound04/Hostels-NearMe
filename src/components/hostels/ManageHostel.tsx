"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { amenityGroups } from "@/constants/label";
import { customAmenityTexts } from "@/constants/label";
import {
  GymIcon,
  WardenIcon,
  GeneratorIcon,
  GeyserIcon,
  GirlsIcon,
  BoysIcon,
  CCTVIcon,
  LocationIcon,
  AirConditionerIcon,
  ChairIcon,
  SecurityGuardIcon,
  ROWaterIcon,
  CleaningIcon,
  CoolerIcon,
  VegetarianMessIcon,
  TableIcon,
  PillowIcon,
  FoodIcon,
  IndoorGamesIcon,
  WashroomIcon,
  WaterSupply,
  BedIcon,
  ElectricityIcon,
  InvertorIcon,
  ParkingIcon,
  AlmirahIcon,
  WifiIcon,
} from "@/components/ui/icon";
import { Hostel } from "@/types/";

// Icons
import {
  Pencil,
  Trash2,
  Building2,
  MapPin,
  IndianRupee,
  Utensils,
  Shield,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { SkeletonGrid } from "@/components/hostels/components/skeleton";
import { useFetchHostels } from "@/hooks/useFetchHostels";
import { useDeleteHostel } from "@/hooks/useDeleteHostel";

const amenityIcons: Record<string, JSX.Element> = {
  bed: <BedIcon width={18} height={18} />,
  pillow: <PillowIcon width={18} height={18} />,
  table: <TableIcon width={18} height={18} />,
  chair: <ChairIcon width={18} height={18} />,
  Almirah: <AlmirahIcon width={18} height={18} />,
  attachedWashroom: <WashroomIcon width={18} height={18} />,
  parking: <ParkingIcon width={18} height={18} />,
  gym: <GymIcon width={18} height={18} />,
  indoorGames: <IndoorGamesIcon width={18} height={18} />,
  biweeklycleaning: <CleaningIcon width={18} height={18} />,
  securityGuard: <SecurityGuardIcon width={18} height={18} />,
  allDayWarden: <Shield className="h-4 w-4" />,
  wiFi: <WifiIcon width={18} height={18} />,
  airconditioner: <AirConditionerIcon width={18} height={18} />,
  cooler: <CoolerIcon width={18} height={18} />,
  geyser: <GeyserIcon width={18} height={18} />,
  allDayElectricity: <ElectricityIcon width={18} height={18} />,
  inverterBackup: <InvertorIcon width={18} height={18} />,
  generator: <GeneratorIcon width={18} height={18} />,
  waterByRO: <ROWaterIcon width={18} height={18} />,
  allDayWaterSupply: <WaterSupply width={18} height={18} />,
  foodIncluded: <FoodIcon width={18} height={18} />,
  vegetarienMess: <VegetarianMessIcon width={18} height={18} />,
  isNonVeg: <Utensils className="h-4 w-4" />,
  cctv: <CCTVIcon width={18} height={18} />,
};

export default function HostelManagement() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data, isLoading, isError, error, isFetching } = useFetchHostels({
    page: currentPage,
    search: searchTerm,
    city: selectedCity,
    gender: selectedType,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });

  const deleteHostelMutation = useDeleteHostel();

  const handlePriceRangeChange = (value: string) => {
    setPriceRange(value);
    if (value === "all") {
      setMinPrice("");
      setMaxPrice("");
    } else {
      const [min, max] = value.split("-");
      setMinPrice(min);
      setMaxPrice(max);
    }
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const handleDelete = (hostelId: string) => {
    deleteHostelMutation.mutate(hostelId, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Hostel deleted successfully",
        });
        setShowDeleteDialog(false);
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data?.error || "Failed to delete hostel",
        });
      },
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setPriceRange("all");
    setSelectedCity("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  if (isLoading && !isFetching) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <h1>Loading....</h1>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <SkeletonGrid />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 text-destructive">
        <AlertCircle className="h-8 w-8" />
        <div className="ml-2">
          <h3 className="font-semibold">Error loading hostels</h3>
          <p>{error?.message || "An unexpected error occurred"}</p>
        </div>
      </div>
    );
  }

  const hostels = data?.hostels || [];
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Search and Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Search hostels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Select value={selectedType} onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select hostel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="BOYS">Boys Hostel</SelectItem>
            <SelectItem value="GIRLS">Girls Hostel</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priceRange} onValueChange={handlePriceRangeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Price range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="0-5000">Under ₹5,000</SelectItem>
            <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
            <SelectItem value="10000-20000">₹10,000 - ₹20,000</SelectItem>
            <SelectItem value="20000-50000">Above ₹20,000</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pagination Controls */}
      {hostels.length > 0 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1 || isFetching}
          >
            Previous
          </Button>
          <span className="py-2 px-4 border rounded">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages || isFetching}
          >
            Next
          </Button>
        </div>
      )}

      {/* Hostels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hostels.map((hostel: Hostel) => (
          <Card
            key={hostel.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <CardHeader className="p-0">
              <div className="relative h-64">
                <div className="absolute inset-0 grid grid-cols-2 gap-0.5 bg-gray-200">
                  {hostel.images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className="relative w-full h-32 overflow-hidden"
                    >
                      <Image
                        src={image || "/placeholder-hostel.jpg"}
                        alt={`${hostel.name} - Image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-200"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute top-2 right-2 flex gap-2 z-10">
                  {!hostel.isAvailable && (
                    <Badge variant="destructive">Not Available</Badge>
                  )}
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 bg-white/90 backdrop-blur-sm"
                  >
                    {hostel.gender === "GIRLS" ? (
                      <>
                        <GirlsIcon width={18} height={18} />
                        <span>Girls Hostel</span>
                      </>
                    ) : (
                      <>
                        <BoysIcon width={18} height={18} />
                        <span>Boys Hostel</span>
                      </>
                    )}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{hostel.name}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      router.push(`/admin/hostels/${hostel.id}/edit`)
                    } //--->`/admin/booking/${hostel.id}/`
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedHostel(hostel);
                      setShowDeleteDialog(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <IndianRupee className="h-4 w-4" />
                  <span>{formatPrice(hostel.price)}/month</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building2 className="h-4 w-4" />
                  <span>{hostel.hostelType} Hostel</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <LocationIcon height={18} width={18} />
                  <span>
                    {hostel.city}, {hostel.state}
                  </span>
                </div>
              </div>

              <Tabs defaultValue="amenities" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                </TabsList>
                <TabsContent value="amenities" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(amenityGroups).map(
                      ([groupKey, group]) =>
                        group.items.some(
                          (item) => hostel[item as keyof typeof hostel]
                        ) && (
                          <div key={groupKey} className="space-y-2">
                            <h4 className="text-sm font-medium">
                              {group.title}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {group.items.map(
                                (item) =>
                                  hostel[item as keyof typeof hostel] && (
                                    <Badge
                                      key={item}
                                      variant="secondary"
                                      className="flex items-center gap-1"
                                    >
                                      {amenityIcons[item] || (
                                        <span className="h-4 w-4" />
                                      )}{" "}
                                      {/* Fallback icon */}
                                      <span>
                                        {customAmenityTexts[item] ||
                                          item
                                            .replace(/([A-Z])/g, " $1")
                                            .trim()}
                                      </span>
                                    </Badge>
                                  )
                              )}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="about">
                  <p className="text-sm text-gray-600">{hostel.about}</p>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="p-4 bg-gray-50">
              <Button
                className="w-full"
                onClick={() => router.push(`/hostels/${hostel.id}`)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {hostels.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No hostels found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              hostel "{selectedHostel?.name}" and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => selectedHostel && handleDelete(selectedHostel.id)}
              disabled={deleteHostelMutation.isLoading}
            >
              {deleteHostelMutation.isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add New Hostel Button */}
      <Button
        className="fixed bottom-6 right-6"
        size="lg"
        onClick={() => router.push("/admin/hostels/addHostels")}
      >
        Add New Hostel
      </Button>
    </div>
  );
}
