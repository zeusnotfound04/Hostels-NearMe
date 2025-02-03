import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useDeleteBookings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: string) => {
      await axios.delete(`/api/bookings/${bookingId}`);
    },

    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] }); 
    },

    onError: () => {
      toast.error("Failed to delete booking");
    },
  });
}
