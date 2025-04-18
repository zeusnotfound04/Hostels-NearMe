import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Hostel } from '@/types';

interface DeleteResponse {
  message: string;
}

interface MutationContext {
  previousHostels?: Hostel[];
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

    
    onMutate: async (hostelId) => {
      await queryClient.cancelQueries({ queryKey: ['hostels'] });

      const previousHostels = queryClient.getQueryData<Hostel[]>(['hostels']);

      queryClient.setQueryData<Hostel[]>(['hostels'], (old) =>
        old ? old.filter((hostel) => hostel.id !== hostelId) : []
      );

      return { previousHostels };
    },

    onError: (error, hostelId, context) => {
      console.error('Error deleting hostel:', error);
      
      if (context?.previousHostels) {
        queryClient.setQueryData(['hostels'], context.previousHostels);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['hostels'] });
    },
  });
}
