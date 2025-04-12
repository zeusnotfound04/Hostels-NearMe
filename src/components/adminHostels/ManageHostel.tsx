"use client";

import { useState, useMemo, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

import { SkeletonGrid } from "@/components/adminHostels/components/skeleton";
import { useFetchHostels } from "@/hooks/useFetchHostels";
import { useDeleteHostel } from "@/hooks/useDeleteHostel";

const amenityIcons: Record<string, React.ReactNode> = {
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
  allDayWarden: <Shield   className="h-4 text-primary w-4" />,
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

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [sortBy, setSortBy] = useState<string>("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    data,
    isLoading: isFetchingHostels,
    isError: isHostelError,
    error: hostelError,
    isFetching,
  } = useFetchHostels({
    page: currentPage,
    search: searchTerm,
    city: selectedCity,
    gender: selectedType,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });

  const {
    mutate: deleteHostel,
    isPending: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteHostel();

  const handlePriceRangeChange = useCallback((value: string) => {
    setPriceRange(value);
    if (value === "all") {
      setMinPrice("");
      setMaxPrice("");
    } else {
      const [min, max] = value.split("-");
      setMinPrice(min);
      setMaxPrice(max);
    }
  }, []);

  const handleTypeChange = useCallback((value: string) => {
    setSelectedType(value);
  }, []);

  const handleDelete = useCallback(
    (hostelId: string) => {
      deleteHostel(hostelId, {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Hostel deleted successfully",
            className: "bg-green-50 border-green-200",
          });
          setShowDeleteDialog(false);
        },
        onError: (error: any) => {
          toast({
            variant: "destructive",
            title: "Error",
            description:
              error.response?.data?.error || "Failed to delete hostel",
          });
        },
      });
    },
    [deleteHostel, toast]
  );

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedType("all");
    setPriceRange("all");
    setSelectedCity("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
    setCurrentPage(1);
  }, []);

  const sortedHostels = useMemo(() => {
    if (!data?.hostels) return [];

    const hostels = [...data.hostels];

    switch (sortBy) {
      case "price-asc":
        return hostels.sort((a, b) => a.price - b.price);
      case "price-desc":
        return hostels.sort((a, b) => b.price - a.price);
      case "name-asc":
        return hostels.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return hostels.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return hostels;
    }
  }, [data?.hostels, sortBy]);

  const totalPages = data?.pagination?.totalPages || 1;
  const showSkeleton = isFetchingHostels && !isFetching;
  const showHostels = !showSkeleton && sortedHostels.length > 0;
  const showEmptyState =
    !showSkeleton && sortedHostels.length === 0 && !isFetchingHostels;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-sm p-4 border"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Manage Hostels</h2>
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2"
          >
            <span>Filters</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform duration-200 ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Button>
        </div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Input
                  placeholder="Search hostels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                <Select value={selectedType} onValueChange={handleTypeChange}>
                  <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
                    <SelectValue placeholder="Select hostel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="BOYS">Boys Hostel</SelectItem>
                    <SelectItem value="GIRLS">Girls Hostel</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                >
                  <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
                    <SelectValue placeholder="Price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-5000">Under ₹5,000</SelectItem>
                    <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                    <SelectItem value="10000-20000">
                      ₹10,000 - ₹20,000
                    </SelectItem>
                    <SelectItem value="20000-50000">Above ₹20,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 12H5M12 19V5" />
                  </svg>
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {showHostels && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mt-4"
        >
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1 || isFetching}
            className="group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mr-1 group-hover:-translate-x-1 transition-transform"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Previous
          </Button>
          <div className="py-2 px-4 border rounded bg-white">
            <span className="font-medium text-primary">{currentPage}</span>
            <span className="text-muted-foreground"> of {totalPages}</span>
          </div>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages || isFetching}
            className="group"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="ml-1 group-hover:translate-x-1 transition-transform"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </motion.div>
      )}

      {showSkeleton && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto p-4 space-y-6"
        >
          <div className="flex justify-center items-center gap-4 py-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="text-lg font-medium">Loading hostels...</span>
          </div>
          <SkeletonGrid />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {showHostels && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ staggerChildren: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sortedHostels.map((hostel: Hostel) => (
              <motion.div
                key={hostel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="transition-all duration-200"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col bg-white border-gray-100">
                  <CardHeader className="p-0">
                    <div className="relative h-64 group">
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
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                          </div>
                        ))}
                      </div>
                      <div className="absolute top-2 right-2 flex gap-2 z-10">
                        {!hostel.isAvailable && (
                          <Badge
                            variant="destructive"
                            className="animate-pulse"
                          >
                            Not Available
                          </Badge>
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
                  <CardContent className="p-4 space-y-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl line-clamp-2">
                        {hostel.name}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            router.push(`/admin/hostels/${hostel.id}/edit`)
                          }
                          className="rounded-full hover:bg-primary/10 transition-colors"
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
                          className="rounded-full hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
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
                        <TabsTrigger
                          value="amenities"
                          className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                        >
                          Amenities
                        </TabsTrigger>
                        <TabsTrigger
                          value="about"
                          className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                        >
                          About
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent
                        value="amenities"
                        className="mt-4 max-h-40 overflow-y-auto custom-scrollbar"
                      >
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
                                            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                                          >
                                            {amenityIcons[item] || (
                                              <span className="h-4 w-4" />
                                            )}
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

                      <TabsContent
                        value="about"
                        className="max-h-40 overflow-y-auto custom-scrollbar"
                      >
                        <p className="text-sm text-gray-600">
                          {hostel.about || "No description available."}
                        </p>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="p-4 bg-gray-50">
                    <Button
                      className="w-full group hover:shadow-md transition-all duration-300"
                      onClick={() => router.push(`/hostels/${hostel.id}`)}
                    >
                      <span className="text-white">View Details</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        className="ml-1 group-hover:translate-x-1 transition-transform"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {showEmptyState && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center  py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="mx-auto text-gray-400 mb-4"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 8h6M9 12h6M9 16h6" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">No hostels found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or add new hostels
            </p>
            <div className="flex justify-center gap-3">
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
              <Button  onClick={() => router.push("/admin/hostels/addHostels")}>
                Add New Hostel
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Delete Hostel?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              This action cannot be undone. This will permanently delete the
              hostel "{selectedHostel?.name}" and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="mt-0 sm:mt-0">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 transition-colors"
              onClick={() =>
                selectedHostel && handleDelete(selectedHostel.id)
              }
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                <>Delete Hostel</>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-10"
      >
        <Button
          className="rounded-full shadow-lg flex items-center gap-2 px-6"
          size="lg"
          onClick={() => router.push("/admin/hostels/addHostels")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add New Hostel
        </Button>
      </motion.div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </div>
  );
}
