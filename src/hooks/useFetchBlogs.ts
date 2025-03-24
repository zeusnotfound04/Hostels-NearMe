import { Blog } from "@/types";
import { useQuery, QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, 
      gcTime: 1000 * 60 * 10, 
      refetchOnWindowFocus: false, 
      refetchOnReconnect: true, 
      retry: 3, 
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    }
  }
});

const fetchBlogs = async (city?: string): Promise<Blog[]> => {
  try {
    console.log("Fetching blogs...");
    const { data } = await axios.get('/api/blogs', {
      params: city ? { city } : {},  
      timeout: 5000,
      headers: {
        "Cache-Control": "no-cache",
      }
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
};

export const useBlogSearch = (city?: string) => {
  return useQuery<Blog[], Error>({
    queryKey: ['blogs', city || "all"],  
    queryFn: () => fetchBlogs(city),
    enabled: true,  
    placeholderData: (prevData) => prevData ?? [],  
    gcTime: 1000 * 60 * 30,  
  });
};
