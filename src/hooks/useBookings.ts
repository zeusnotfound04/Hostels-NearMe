import { useQuery } from "@tanstack/react-query";

const fetchBookingDetails = async () => {
  const response = await fetch(`/api/bookings`);
  if (!response.ok) throw new Error("Failed to fetch booking details");
  const data = await response.json();
  return data.booking; 
};

// Custom hook to fetch bookings
export const useBookings = () => {
  return useQuery({
    queryKey: ["bookings"], 
    queryFn: fetchBookingDetails,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: false,
  });
};