import { useMutation, useQuery , useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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


const updateBookingDetails = async ({bookingId , formData} : {bookingId : string , formData : {status : string , notes? : string}}) => {
  const response = await axios.patch(`/api/bookings/${bookingId}`, formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn : updateBookingDetails,
    onSuccess : () => {
      queryClient.invalidateQueries( { queryKey :  ["bookings"]});
    }
  })
}