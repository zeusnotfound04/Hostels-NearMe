import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface DeleteResponse {
    message : string;
}

const deleteHostel = async (hostelId : string) : Promise<DeleteResponse> => {
    const response = await axios.delete(`/api/hostels/${hostelId}`);
    return response.data;
}

export function useDeleteHostel() {
    const queryClient = useQueryClient();

    return useMutation<DeleteResponse , Error , string>(  {
        mutationFn : deleteHostel,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ['hostels']}) ;
        }
    })
}
