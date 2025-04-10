import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

// Fetch user's bookings
const fetchUserBookings = async () => {
  const response = await fetch('/api/mybooking');
  if (!response.ok) {
    throw new Error("Failed to fetch your bookings");
  }
  const data = await response.json();
  return data.bookings;
};

// Hook for fetching user's bookings
export const useMyBookings = () => {
  return useQuery({
    queryKey: ["myBookings"],
    queryFn: fetchUserBookings,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

// Hook for cancelling a booking
export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ bookingId }: { bookingId: string }) => {
      const response = await axios.patch(`/api/mybooking/${bookingId}`, {
        status: "CANCELLED"
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Booking cancelled successfully");
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    },
    onError: () => {
      toast.error("Failed to cancel booking");
    }
  });
};

// Hook for deleting a booking
export const useDeleteMyBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingId: string) => {
      await axios.delete(`/api/mybooking/${bookingId}`);
    },
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    },
    onError: () => {
      toast.error("Failed to delete booking");
    }
  });
};