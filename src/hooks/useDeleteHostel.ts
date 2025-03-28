import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface DeleteResponse {
  message: string;
}

interface MutationContext {
  previousHostels?: DeleteResponse[];
}

const deleteHostel = async (hostelId: string): Promise<DeleteResponse> => {
  console.log("Deleting hostel with id:", hostelId);
  const response = await axios.delete(`/api/hostels/${hostelId}`);
  return response.data;
};

export function useDeleteHostel() {
  const queryClient = useQueryClient();

  return useMutation<DeleteResponse, Error, string, MutationContext>({
    mutationFn: deleteHostel,

    // Optimistic Update with proper context typing
    onMutate: async (hostelId) => {
      await queryClient.cancelQueries({ queryKey: ['hostels'] });

      const previousHostels = queryClient.getQueryData<DeleteResponse[]>(['hostels']);

      queryClient.setQueryData<DeleteResponse[]>(['hostels'], (old) =>
        old ? old.filter((h: any) => h.id !== hostelId) : []
      );

      return { previousHostels };
    },

    onError: (error, hostelId, context) => {
      console.error('Error deleting hostel:', error);
      
      // Ensure context is properly typed
      if (context?.previousHostels) {
        queryClient.setQueryData(['hostels'], context.previousHostels);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['hostels'] });
    },
  });
}
