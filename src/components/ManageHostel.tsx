'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,} from '@/components/ui/alert-dialog';


import { Hostel } from '@/types/';

// Icons
import {Pencil,Trash2,Building2,MapPin,IndianRupee,Wifi,Utensils,Shield,Warehouse,Trees,Power,Droplet,Dumbbell,Wind,} from 'lucide-react';

// Types
enum HostelType {
  BOYS = 'BOYS',
  GIRLS = 'GIRLS'
}

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}


const amenityGroups = {
  basicFurniture: {
    title: 'Basic Furniture',
    items: ['bed', 'pillow', 'table', 'chair', 'Almirah']
  },
  facilities: {
    title: 'Facilities',
    items: ['attachedWashroom', 'parking', 'gym', 'indoorGames']
  },
  services: {
    title: 'Services',
    items: ['biweeklycleaning', 'securityGuard', 'allDayWarden']
  },
  comfort: {
    title: 'Comfort & Utilities',
    items: ['wiFi', 'airconditioner', 'cooler', 'geyser']
  },
  power: {
    title: 'Power & Water',
    items: ['allDayElectricity', 'inverterBackup', 'generator', 'waterByRO', 'allDayWaterSupply']
  },
  food: {
    title: 'Food & Dining',
    items: ['foodIncluded', 'vegetarienMess', 'isNonVeg']
  },
  security: {
    title: 'Security',
    items: ['cctv']
  }
};

const amenityIcons: Record<string, JSX.Element> = {
  wiFi: <Wifi className="h-4 w-4" />,
  foodIncluded: <Utensils className="h-4 w-4" />,
  securityGuard: <Shield className="h-4 w-4" />,
  parking: <Warehouse className="h-4 w-4" />,
  indoorGames: <Trees className="h-4 w-4" />,
  allDayElectricity: <Power className="h-4 w-4" />,
  waterByRO: <Droplet className="h-4 w-4" />,
  gym: <Dumbbell className="h-4 w-4" />,
  airconditioner: <Wind className="h-4 w-4" />,
};

export default function HostelManagement() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { toast } = useToast();
    
    // State
    const [hostels, setHostels] = useState<Hostel[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedType, setSelectedType] = useState<string>("all");
    const [priceRange, setPriceRange] = useState<string>("all");
  
    // Debounced search effect
    useEffect(() => {
      const timer = setTimeout(() => {
        fetchHostels();
      }, 500);
  
      return () => clearTimeout(timer);
    }, [searchTerm]);
  
    useEffect(() => {
        const timer = setTimeout(() => {
          fetchHostels();
        }, 500);
        
        return () => clearTimeout(timer);
      }, [searchTerm, currentPage, selectedType, selectedCity, minPrice, maxPrice]);
  
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
  
    const fetchHostels = async () => {
      try {
        setLoading(true);
        
        // Base parameters
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: '10',
          isAvailable: 'true'
        });
    
        // Add filters only if they have valid values
        if (selectedType && selectedType !== "all") {
          params.append('hostelType', selectedType);
        }
    
        if (searchTerm?.trim()) {
          params.append('search', searchTerm.trim());
        }
    
        if (selectedCity?.trim()) {
          params.append('city', selectedCity.trim());
        }
    
        // Validate price values before adding
        const minPriceNum = Number(minPrice);
        const maxPriceNum = Number(maxPrice);
    
        if (!isNaN(minPriceNum) && minPriceNum >= 0) {
          params.append('minPrice', minPriceNum.toString());
        }
    
        if (!isNaN(maxPriceNum) && maxPriceNum > 0) {
          params.append('maxPrice', maxPriceNum.toString());
        }
    
        console.log('Request URL:', `/api/hostels?${params.toString()}`);
        
        const response = await axios.get(`/api/hostels?${params.toString()}`);
        
        if (!response.data) {
          throw new Error('No data received from server');
        }
    
        console.log('Response:', {
          status: response.status,
          data: response.data,
          hostels: response.data.hostels?.length
        });
    
        setHostels(response.data.hostels || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        
      } catch (error: any) {
        console.error('Fetch error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        
        toast({
          variant: "destructive",
          title: "Error fetching hostels",
          description: error.response?.data?.details || error.message || "An unexpected error occurred"
        });
      } finally {
        setLoading(false);
      }
    };
      const handleDelete = async (hostelId: string) => {
        try {
          const response = await axios.delete(`/api/hostels/${hostelId}`);
          
          if (response.data.message === "Hostel deleted successfully") {
            await fetchHostels();
            toast({
              title: "Success",
              description: "Hostel deleted successfully"
            });
            setShowDeleteDialog(false);
          }
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.response?.data?.error || "Failed to delete hostel"
          });
        }
      };
  
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
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
  
    if (loading && hostels.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      );
    }
  
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
              <SelectItem value={HostelType.BOYS}>Boys Hostel</SelectItem>
              <SelectItem value={HostelType.GIRLS}>Girls Hostel</SelectItem>
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
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1 || loading}
            >
              Previous
            </Button>
            <span className="py-2 px-4 border rounded">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages || loading}
            >
              Next
            </Button>
          </div>
        )}
  
        {/* Hostels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostels.map((hostel) => (
            <Card key={hostel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={hostel.images[0] || '/placeholder-hostel.jpg'}
                    alt={hostel.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {!hostel.isAvailable && (
                    <Badge variant="destructive" className="absolute top-2 right-2">
                      Not Available
                    </Badge>
                  )}
                </div>
              </CardHeader>
  
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{hostel.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/hostels/edit/${hostel.id}`)}
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
                    <MapPin className="h-4 w-4" />
                    <span>{hostel.city}, {hostel.state}</span>
                  </div>
                </div>
  
                <Tabs defaultValue="amenities" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                  </TabsList>
                  <TabsContent value="amenities" className="mt-4">
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(amenityGroups).map(([groupKey, group]) => (
                        group.items.some(item => hostel[item as keyof Hostel]) && (
                          <div key={groupKey} className="space-y-2">
                            <h4 className="text-sm font-medium">{group.title}</h4>
                            {group.items.map(item => (
                              hostel[item as keyof Hostel] && (
                                <Badge key={item} variant="secondary" className="mr-2">
                                  {amenityIcons[item] || null}
                                  <span className="ml-1">{item.replace(/([A-Z])/g, ' $1').trim()}</span>
                                </Badge>
                              )
                            ))}
                          </div>
                        )
                      ))}
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
        {hostels.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No hostels found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
            <Button onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
  
        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the hostel
                "{selectedHostel?.name}" and remove all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600"
                onClick={() => selectedHostel && handleDelete(selectedHostel.id)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
  
        {/* Add New Hostel Button */}
        <Button
          className="fixed bottom-6 right-6"
          size="lg"
          onClick={() => router.push('/hostels/new')}
        >
          Add New Hostel
        </Button>
      </div>
    );
  }