"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Home,
  Info,
  MapPin,
  MoreHorizontal,
  Phone,
  User,
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useCancelBooking, useDeleteMyBooking } from "@/hooks/useMyBookings";
import { Booking } from "@/types";
import { cn } from "@/utils/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BookingCardProps {
  booking: Booking
}

const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-600 hover:text-white",
  CONFIRMED: "bg-green-100 text-green-800 border-green-300 hover:bg-green-600 hover:text-white",
  CANCELLED: "bg-red-100 text-red-800 border-red-300 hover:bg-red-600 hover:text-white",
};

const statusIcons = {
  PENDING: <Clock className="mr-1.5 h-3.5 w-3.5" />,
  CONFIRMED: <Calendar className="mr-1.5 h-3.5 w-3.5" />,
  CANCELLED: <X className="mr-1.5 h-3.5 w-3.5" />,
};

const BookingCard = ({booking}  : BookingCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const cancelBooking = useCancelBooking();
  const deleteBooking = useDeleteMyBooking();
  const canCancel = booking.status === "PENDING";
  const canDelete = booking.status === "CANCELLED";
  
  const handleCancel = () => {
    cancelBooking.mutate({ bookingId: booking.id });
    setIsOpen(false);
  };
  
  const handleDelete = () => {
    deleteBooking.mutate(booking.id);
  };
  
  const viewDetails = () => {
    router.push(`/bookings/${booking.id}`);
  };
  
  const daysSinceBooking = Math.floor(
    (new Date().getTime() - new Date(booking.createdAt).getTime()) / (1000 * 3600 * 24)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      layout
      className="w-full"
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden border-2 hover:shadow-lg transition-all duration-300 relative">
        {/* Top ribbon for new bookings - Improved positioning and styling */}
        {daysSinceBooking < 2 && (
          <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 z-10 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute top-[12px] right-[-35px] bg-blue-600 text-white text-xs font-semibold py-1 px-10 shadow-md transform rotate-45 block"
            >
              NEW
            </motion.div>
          </div>
        )}
        
        <CardHeader className="bg-gradient-to-r from-[#902920] to-[#a33f36] p-5">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-white">{booking.hostelName}</h3>
              <div className="flex items-center text-white/80 text-sm">
                <Info className="h-3 w-3 mr-1.5" />
                Ref: {booking.referenceId}
              </div>
            </div>
            <motion.div
              whileHover={{ 
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge className={cn(
                `${statusStyles[booking.status]} px-3 py-1.5 font-medium flex items-center`,
                "transition-all duration-300 cursor-pointer"
              )}>
                {statusIcons[booking.status]}
                {booking.status}
              </Badge>
            </motion.div>
          </div>
        </CardHeader>
        
        <CardContent className="p-5 space-y-4">
          {/* Location Info */}
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p>{booking.hostel.address}</p>
              <p>{booking.hostel.city}, {booking.hostel.state}</p>
            </div>
          </div>
          
          {/* Booking Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Booked on: {format(new Date(booking.createdAt), 'PPP')}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span>Gender: {booking.userGender}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>Phone: {booking.phoneNumber}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Home className="h-4 w-4 text-gray-500" />
              <span>Price: ₹{booking.hostel.price.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 bg-gray-50 flex justify-between items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  onClick={viewDetails}
                  className="text-sm hover:bg-gray-100 transition-all"
                >
                  View Details
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View complete booking details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full hover:bg-gray-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {canCancel && (
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem 
                      onSelect={(e) => e.preventDefault()}
                      className="text-red-500 focus:text-red-500"
                    >
                      Cancel Booking
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will cancel your booking. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No, keep it</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleCancel}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Yes, cancel booking
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              
              {canDelete && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem 
                      onSelect={(e) => e.preventDefault()}
                      className="text-red-500 focus:text-red-500"
                    >
                      Delete Booking
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this booking?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove this booking from your history. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDelete} 
                        className="bg-red-500 hover:bg-red-600"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BookingCard;