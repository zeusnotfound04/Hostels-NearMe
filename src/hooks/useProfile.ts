import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner'; // Replace with your actual toast import

// Define types for the profile data
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  pfpUrl : string;
  username: string;
  gender?: string;
  city?: string;
  state?: string;
  role: string;
  createdAt: string;
}

export interface ProfileUpdateData {
  name?: string;
  username?: string;
  gender?: string;
  city?: string;
  state?: string;
}

// Function to fetch the user profile
const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await axios.get('/api/profile');
  return response.data;
};

// Function to update the user profile
const updateUserProfile = async (data: ProfileUpdateData): Promise<UserProfile> => {
  const response = await axios.patch('/api/profile', data);
  return response.data;
};

// Custom hook for profile management
export function useProfile() {
  const queryClient = useQueryClient();

  // Query hook for fetching profile
  const { data: profile, isLoading, error, refetch } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Mutation hook for updating profile
  const { 
    mutate: updateProfile, 
    isPending: isUpdating,
    error: updateError 
  } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedData) => {
      // Update cache with new data
      queryClient.setQueryData(['userProfile'], updatedData);
      console.log("PROFILE UPDATED")
    //   toast({
    //     title: "Profile updated",
    //     description: "Your profile has been updated successfully.",
    //   });
    },
    onError: (error: any) => {
      console.error("Error updating profile:", error);
      
      // Handle specific errors
      if (error.response?.status === 409) {
        console.error(error.message)
        // toast({
        //   title: "Update failed",
        //   description: error.response.data.error || "Username is already taken.",
        //   variant: "destructive",
        // });
      } else {
        // toast();
      }
    }
  });

  // Helper function to upload avatar
  const uploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    try {
      const response = await axios.post('/api/profile/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Invalidate profile query to refetch after avatar update
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      
    //   toast({
    //     title: "Avatar updated",
    //     description: "Your profile picture has been updated successfully.",
    //   });
      
      return response.data;
    } catch (error) {
      console.error("Error uploading avatar:", error);
    //   toast({
    //     title: "Upload failed",
    //     description: "Could not upload your avatar. Please try again.",
    //     variant: "destructive",
    //   });
      throw error;
    }
  };

  return {
   
    isLoading,
    error,
    updateProfile,
    isUpdating,
    updateError,
    uploadAvatar,
    refetchProfile: refetch
  };
}