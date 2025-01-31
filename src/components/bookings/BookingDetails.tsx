"use client"
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

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
  status: "PENDING" | "CONFIRMED" | "REJECTED" | "COMPLETED";
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
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  COMPLETED: "bg-blue-100 text-blue-700",
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
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 10 * 60 * 30, // 30 minutes
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
      className="max-w-6xl mx-auto p-10 bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-3xl border border-gray-200"
    >
      {/* Header Section */}
      <div className="mb-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center border-b pb-6"
        >
          <h1 className="text-5xl font-bold text-[#902920]">Booking Details</h1>
          <span
            className={`px-5 py-2 text-base font-semibold rounded-full shadow-lg ${
              statusColors[booking.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {booking.status}
          </span>
        </motion.div>
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-600">Booking Reference ID:</p>
          <p className="text-3xl font-bold text-gray-700">{booking.referenceId}</p>
        </div>
        <p className="mt-4 text-sm text-gray-500">Date of Booking: {new Date(booking.createdAt).toLocaleString()}</p>
      </div>

      {/* Booking Summary Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Booking Summary</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hostel Information */}
          <div className="p-8 bg-gradient-to-br from-white to-gray-50 shadow-md rounded-2xl border border-gray-300">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Hostel Information</h3>
            <p className="text-sm text-gray-600 mb-2">Hostel Name: <span className="font-semibold">{booking.hostel.name}</span></p>
            <p className="text-sm text-gray-600">Hostel Address: <span className="font-semibold">{booking.hostel.address}</span></p>
          </div>
          {/* User Details */}
          <div className="p-8 bg-gradient-to-br from-white to-gray-50 shadow-md rounded-2xl border border-gray-300">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">User Details</h3>
            <p className="text-sm text-gray-600 mb-2">Name: <span className="font-semibold">{booking.user.name}</span></p>
            <p className="text-sm text-gray-600 mb-2">Gender: <span className="font-semibold">{booking.user.gender}</span></p>
            <p className="text-sm text-gray-600">Phone: <span className="font-semibold">{booking.user.phone}</span></p>
          </div>
        </div>
      </motion.div>

      {/* Additional Details Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Additional Details</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Address */}
          <div className="p-8 bg-gradient-to-br from-white to-gray-50 shadow-md rounded-2xl border border-gray-300">
            <p className="text-sm text-gray-600">User Address: <span className="font-semibold">{booking.user.address}</span></p>
          </div>
          {/* Last Updated */}
          <div className="p-8 bg-gradient-to-br from-white to-gray-50 shadow-md rounded-2xl border border-gray-300">
            <p className="text-sm text-gray-600">Last Updated: <span className="font-semibold">{new Date(booking.lastUpdatedAt).toLocaleString()}</span></p>
          </div>
        </div>
        {booking.notes && (
          <div className="mt-8 p-8 bg-gradient-to-br from-white to-gray-50 shadow-md rounded-2xl border border-gray-300">
            <p className="text-sm text-gray-600">Notes: <span className="font-semibold">{booking.notes}</span></p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default BookingDetails;



// Example usage
// const booking = {
//   bookingId: "BOOK12345",
//   status: "CONFIRMED",
//   createdAt: "2025-01-26T10:00:00Z",
//   lastUpdatedAt: "2025-01-27T10:00:00Z",
//   hostel: {
//     name: "Sunrise Hostel",
//     address: "123, Main Street, City",
//   },
//   user: {
//     name: "John Doe",
//     gender: "Male",
//     phone: "+91 12345 67890",
//     address: "45, Elm Road, City",
//   },
//   notes: "Requested early check-in.",
// };

// <BookingDetails booking={booking} />