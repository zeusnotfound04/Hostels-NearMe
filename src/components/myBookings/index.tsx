"use client";

import { useMyBookings } from "@/hooks/useMyBookings";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowDownAZ, ArrowUpZA, CalendarIcon, Filter, Search } from "lucide-react";
import BookingCard from "./BookingCard";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import BookingCardSkeleton from "@/components/myBookings/BookingCardSkeleton";
import { Booking } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/utils";

export default function MyBookingPage() {
    const { data: bookings, isLoading, error } = useMyBookings();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [activeTab, setActiveTab] = useState<string>("all");

    const filteredBookings = useMemo(() => {
        if (!bookings) return [];

        let filtered = bookings.filter((booking: Booking) => {
            const matchesSearch = 
                booking.hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.hostel.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.hostel.city.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesStatus = statusFilter === "ALL" ? true : booking.status === statusFilter;

            
            const matchesTab = 
                activeTab === "all" ? true : 
                activeTab === "pending" ? booking.status === "PENDING" :
                activeTab === "confirmed" ? booking.status === "CONFIRMED" :
                activeTab === "cancelled" ? booking.status === "CANCELLED" : true;
            
            return matchesSearch && matchesStatus && matchesTab;
        });

        filtered = filtered.sort((a : any, b :any) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
        });

        return filtered;
    }, [bookings, searchTerm, statusFilter, sortOrder, activeTab]);

    const bookingCounts = useMemo(() => {
        if (!bookings) return { all: 0, pending: 0, confirmed: 0, cancelled: 0 };
        
        return {
            all: bookings.length,
            pending: bookings.filter((b :  { status: string } ) => b.status  === "PENDING").length,
            confirmed: bookings.filter((b :  { status: string } )=> b.status === "CONFIRMED").length,
            cancelled: bookings.filter((b :  { status: string } ) => b.status === "CANCELLED").length
        };
    }, [bookings]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-white-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
                <p className="text-gray-600">Manage and track all your hostel bookings in one place</p>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                    <TabsList className="grid grid-cols-4 mb-2">
                        <TabsTrigger value="all" className="relative">
                            All
                            {bookingCounts.all > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {bookingCounts.all}
                                </span>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="pending" className="relative">
                            Pending
                            {bookingCounts.pending > 0 && (
                                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {bookingCounts.pending}
                                </span>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="confirmed" className="relative">
                            Confirmed
                            {bookingCounts.confirmed > 0 && (
                                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {bookingCounts.confirmed}
                                </span>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="cancelled" className="relative">
                            Cancelled
                            {bookingCounts.cancelled > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {bookingCounts.cancelled}
                                </span>
                            )}
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </motion.div>

            {/* Filters and Search */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center bg-white p-4 rounded-lg shadow-sm"
            >
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search by hostel name, reference ID, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-gray-200"
                    />
                </div>
                
                <div className="flex items-center gap-3 sm:w-auto sm:flex-nowrap">
                    <div className="flex items-center gap-2 min-w-[180px]">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="w-full border-gray-200">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All Bookings</SelectItem>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                        className={cn(
                            "border-gray-200 transition-all",
                            sortOrder === "desc" && "bg-gray-100"
                        )}
                        title={sortOrder === "asc" ? "Sort Oldest First" : "Sort Newest First"}
                    >
                        {sortOrder === "asc" ? (
                            <ArrowDownAZ className="h-4 w-4" />
                        ) : (
                            <ArrowUpZA className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </motion.div>

            {/* Error State */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {error instanceof Error ? error.message : "Failed to load bookings"}
                        </AlertDescription>
                    </Alert>
                </motion.div>
            )}

            {/* Loading State */}
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <BookingCardSkeleton />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredBookings.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-16 px-4 bg-white rounded-lg shadow-sm border border-gray-100"
                >
                    <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <CalendarIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    {bookings && bookings.length > 0 ? (
                        <>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No matches found</h3>
                            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                                Try adjusting your search or filter to find what you're looking for.
                            </p>
                            <Button 
                                variant="outline" 
                                onClick={() => {
                                    setSearchTerm("");
                                    setStatusFilter("ALL");
                                    setActiveTab("all");
                                }}
                            >
                                Clear filters
                            </Button>
                        </>
                    ) : (
                        <>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings yet</h3>
                            <p className="text-sm text-gray-500 max-w-md mx-auto">
                                When you book a hostel, your bookings will appear here.
                            </p>
                        </>
                    )}
                </motion.div>
            )}

            
            {!isLoading && filteredBookings.length > 0 && (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredBookings.map((booking : Booking) => (
                            <BookingCard key={booking.id} booking={booking} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
}