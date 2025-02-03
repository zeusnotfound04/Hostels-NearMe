"use client"
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { BlurFade } from "@/components/ui/blur-fade";

interface Hostel {
  name: string;
  address: string;
}

interface User {
  name: string;
  gender: string;
  phone: string;
  address: string;
}

interface Booking {
  bookingId: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
  lastUpdatedAt: string;
  hostel: Hostel;
  user: User;
  referenceId: string;
  notes?: string;
}

interface BookingDetailsProps {
  bookingId: string;
}

const statusColors: Record<Booking['status'], string> = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  CONFIRMED: "bg-green-100 text-green-700 border-green-200",
  CANCELLED: "bg-blue-100 text-blue-700 border-blue-200",
};

const fetchBookingDetails = async (bookingId: string) => {
  const response = await fetch(`/api/bookings/${bookingId}`);
  if (!response.ok) throw new Error("Failed to fetch booking details");
  return response.json();
};

const BookingDetails: React.FC<BookingDetailsProps> = ({ bookingId }) => {
  const { data: booking, isLoading, error } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => fetchBookingDetails(bookingId),
    enabled: !!bookingId,
    staleTime: 1000 * 60 * 5,
    gcTime: 10 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p className="text-gray-700">Loading...</p>;
  if (error) return <p className="text-red-600">Error loading booking details.</p>;
  if (!booking) return <p className="text-gray-700">No booking found.</p>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl sm:rounded-3xl border border-gray-200"
    >
      <BlurFade delay={0.3} inView>
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4 sm:pb-6 lg:pb-8 gap-4 sm:gap-0"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-wide text-[#902920]">
              Booking Details
            </h1>
            <span
              className={`px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 text-sm sm:text-base lg:text-lg font-bold rounded-full shadow-lg border ${
                statusColors[booking.status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {booking.status}
            </span>
          </motion.div>
          
          <div className="mt-4 sm:mt-6 lg:mt-8">
            <p className="text-base sm:text-lg font-medium text-gray-600">Booking Reference ID:</p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 text-transparent bg-clip-text">
              {booking.referenceId}
            </p>
          </div>
          <p className="mt-2 sm:mt-3 lg:mt-4 text-sm sm:text-base text-gray-500">
            <span className="font-semibold">Date of Booking:</span>{' '}
            <span className="font-bold">{new Date(booking.createdAt).toLocaleString()}</span>
          </p>
        </div>
      </BlurFade>

      <BlurFade delay={0.3 * 2} inView>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 sm:mb-10 lg:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-10">Booking Summary</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10">
            <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl sm:rounded-2xl border border-gray-300 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">Hostel Information</h3>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <p className="text-sm sm:text-base text-gray-600">
                  <span className="font-medium">Hostel Name:</span>{' '}
                  <span className="font-bold text-gray-900">{booking.hostel.name}</span>
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  <span className="font-medium">Hostel Address:</span>{' '}
                  <span className="font-bold text-gray-900">{booking.hostel.address}</span>
                </p>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl sm:rounded-2xl border border-gray-300 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">User Details</h3>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <p className="text-sm sm:text-base text-gray-600">
                  <span className="font-medium">Name:</span>{' '}
                  <span className="font-bold text-gray-900">{booking.user.name}</span>
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  <span className="font-medium">Gender:</span>{' '}
                  <span className="font-bold text-gray-900">{booking.user.gender}</span>
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  <span className="font-medium">Phone:</span>{' '}
                  <span className="font-bold text-gray-900">{booking.user.phone}</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </BlurFade>

      <BlurFade delay={0.3 * 2} inView>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-6 sm:mb-8 lg:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-10">Additional Details</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-10">
            <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl sm:rounded-2xl border border-gray-300 hover:shadow-xl transition-shadow duration-300">
              <p className="text-sm sm:text-base text-gray-600">
                <span className="font-medium">User Address:</span>{' '}
                <span className="font-bold text-gray-900">{booking.user.address}</span>
              </p>
            </div>
            
            <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl sm:rounded-2xl border border-gray-300 hover:shadow-xl transition-shadow duration-300">
              <p className="text-sm sm:text-base text-gray-600">
                <span className="font-medium">Last Updated:</span>{' '}
                <span className="font-bold text-gray-900">{new Date(booking.lastUpdatedAt).toLocaleString()}</span>
              </p>
            </div>
          </div>
          
          {booking.notes && (
            <div className="mt-4 sm:mt-6 lg:mt-10 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl sm:rounded-2xl border border-gray-300 hover:shadow-xl transition-shadow duration-300">
              <p className="text-sm sm:text-base text-gray-600">
                <span className="font-medium">Notes:</span>{' '}
                <span className="font-bold text-gray-900">{booking.notes}</span>
              </p>
            </div>
          )}
        </motion.div>
      </BlurFade>
    </motion.div>
  );
}

export default BookingDetails;