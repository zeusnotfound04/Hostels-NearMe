"use client"
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { useUpdateBooking } from "@/hooks/useBookings";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertCircle, Save, User, Phone, MapPin, Calendar, Clock, 
  Home, Mail, Shield, IndianRupee, Users, Check, X,
  LucideIcon
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookingDetails } from "@/types";
import { toast } from "sonner";


interface BookingUpdateData {
    status: "PENDING" | "CONFIRMED" | "CANCELLED";
    notes?: string;
  }
  
  interface BookingEditFormProps {
    booking: BookingDetails;
  }

interface AmenityItemProps { 
    name: string; 
    value: boolean; 
    }   


interface infoItemProps {
    icon: LucideIcon;
    label: string;
    value: string;
    accent?: boolean;
  }
interface AnimatedSectionProps {
    title: string;
    children: React.ReactNode;
    delay?: number;
  }  

const AnimatedSection = ({ title, children, delay = 0 } : AnimatedSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white rounded-xl border-2 border-[#902920]/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
  >
    <div className="bg-gradient-to-r from-[#902920] to-[#a33f36] px-6 py-3">
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">
      {children}
    </div>
  </motion.div>
);

const InfoItem = ({ icon: Icon, label, value, accent = false } : infoItemProps) => (
  <motion.div 
    className={`flex items-center space-x-3 p-4 rounded-lg border-2 
    ${accent ? 'border-[#902920] bg-[#902920]/5' : 'border-gray-200 bg-gray-50'}
    hover:shadow-md transition-all duration-300`}
    whileHover={{ scale: 1.02, x: 5 }}
  >
    <Icon className={`w-5 h-5 ${accent ? 'text-[#902920]' : 'text-gray-600'}`} />
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-bold text-gray-900">{value || 'Not specified'}</p>
    </div>
  </motion.div>
);

const AmenityItem = ({ name, value } : AmenityItemProps ) => (
  <motion.div
    className={`p-4 rounded-lg border-2 ${value ? 'border-green-500 bg-green-50' : 'border-red-300 bg-red-50'}`}
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center justify-between">
      <p className="font-semibold">{name}</p>
      {value ? 
        <Check className="w-5 h-5 text-green-500" /> : 
        <X className="w-5 h-5 text-red-500" />
      }
    </div>
  </motion.div>
);

const BookingEditForm: React.FC<BookingEditFormProps> = ({ booking }) => {
  const router = useRouter();
  const updateBooking = useUpdateBooking();
  const [status, setStatus] = useState<BookingUpdateData['status']>(booking.status);
  const [notes, setNotes] = useState(booking.notes || "");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");

    try {
      await updateBooking.mutateAsync({ 
        bookingId: booking.id, 
        formData: { status, notes } 
      });
      
      toast.success("Booking Updated", {
        description: `Booking ${booking.referenceId} has been successfully updated`
      });

      router.push('/admin/bookings');
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : "Failed to update booking";
      
      setLocalError(errorMessage);
      toast.error("Update Failed", {
        description: errorMessage
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto"
    >
      {/* Header Card */}
      <motion.div 
        className="bg-gradient-to-r from-[#902920] to-[#a33f36] rounded-2xl shadow-2xl mb-8 p-8 text-white"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">{booking.hostelName}</h1>
            <p className="text-xl opacity-90">{booking.referenceId}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Clock className="w-5 h-5" />
              <p className="opacity-75">Created: {new Date(booking.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <motion.div
            className={`px-6 py-3 rounded-full text-lg font-bold
              ${status === 'CONFIRMED' ? 'bg-green-500' : 
                status === 'CANCELLED' ? 'bg-red-500' : 'bg-yellow-500'}`}
            whileHover={{ scale: 1.05 }}
          >
            {status}
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <AnimatedSection title="Guest Information" delay={0.1}>
          <div className="space-y-4">
            <InfoItem icon={User} label="Guest Name" value={booking.username as string} accent={true} />
            <InfoItem icon={Users} label="Gender" value={booking.userGender as string} />
            <InfoItem icon={Phone} label="Contact" value={booking.phoneNumber as string} accent={true} />
            <InfoItem icon={Mail} label="Email" value={booking.user.email as string} />
            <InfoItem icon={Shield} label="User Role" value={booking.user.role as string} />
          </div>
        </AnimatedSection>

       
        <AnimatedSection title="Hostel Details" delay={0.2}>
          <div className="space-y-4">
            <InfoItem icon={Home} label="Hostel Type" value={booking.hostel.hostelType as string} accent={true} />
            <InfoItem icon={Users} label="Gender Type" value={booking.hostel.gender as string} />
            <InfoItem icon={MapPin} label="Address" value={`${booking.hostel.address}, ${booking.hostel.city}, ${booking.hostel.state}`} accent={true} />
            <InfoItem icon={IndianRupee} label="Monthly Rent" value={`₹${booking.hostel.price?.toLocaleString()}` } accent={true} />
          </div>
        </AnimatedSection>

     
        <AnimatedSection title="Hostel Amenities" delay={0.3}>
          <div className="grid grid-cols-2 gap-4">
            <AmenityItem name="Air Conditioner" value={booking.hostel.airconditioner as boolean} />
            <AmenityItem name="24/7 Electricity" value={booking.hostel.allDayElectricity as boolean} />
            <AmenityItem name="Warden Available" value={booking.hostel.allDayWarden as boolean} />
            <AmenityItem name="Water Supply" value={booking.hostel.allDayWaterSupply as boolean} />
            <AmenityItem name="Attached Washroom" value={booking.hostel.attachedWashroom as boolean} />
            <AmenityItem name="Bed Provided" value={booking.hostel.bed as boolean} />
            <AmenityItem name="CCTV" value={booking.hostel.cctv as boolean} />
            <AmenityItem name="Food Included" value={booking.hostel.foodIncluded as boolean} />
            <AmenityItem name="Generator" value={booking.hostel.generator as boolean} />
            <AmenityItem name="Geyser" value={booking.hostel.geyser as boolean} />
            <AmenityItem name="Gym" value={booking.hostel.gym as boolean} />
            <AmenityItem name="WiFi" value={booking.hostel.wiFi as boolean} />
          </div>
        </AnimatedSection>

        {/* Update Form */}
        <AnimatedSection title="Update Booking" delay={0.4}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {localError && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{localError}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              <div>
                <label className="text-base font-semibold text-gray-700 block mb-2">
                  Update Status
                </label>
                <Select
                  value={status}
                  onValueChange={(value: BookingUpdateData['status']) => setStatus(value)}
                >
                  <SelectTrigger className="w-full border-2 focus:border-[#902920] focus:ring-[#902920]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-base font-semibold text-gray-700 block mb-2">
                  Add Notes
                </label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes about the booking..."
                  className="min-h-[100px] border-2 focus:border-[#902920] focus:ring-[#902920]"
                />
              </div>
            </div>

            <motion.div 
              className="flex justify-end"
              whileHover={{ scale: 1.02 }}
            >
              <Button 
                type="submit" 
                disabled={updateBooking.isPending}
                className="bg-[#902920] hover:bg-[#7a231b] text-white px-8 py-6 text-lg font-bold rounded-xl transition-all duration-300"
              >
                <Save className="w-5 h-5 mr-2" />
                {updateBooking.isPending ? "Saving Changes..." : "Update Booking"}
              </Button>
            </motion.div>
          </form>
        </AnimatedSection>
      </div>
    </motion.div>
  );
};

export default BookingEditForm;