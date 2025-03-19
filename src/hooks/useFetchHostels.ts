import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FetchHostelParams, Hostel, HostelResponse } from "@/types";
import axios from "axios";
import { useState, useEffect } from "react";



const useDebounce = (value: string, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};


const fetchHostels = async (params: FetchHostelParams): Promise<HostelResponse> => {
    const urlParams = new URLSearchParams({
        page: params.page.toString(),
        isAvailable: "true"
    });

    if (params.limit) urlParams.append("limit", params.limit.toString());
    if (params.gender && params.gender !== "all") urlParams.append("gender", params.gender);
    if (params.search?.trim()) urlParams.append("search", params.search.trim());
    if (params.city?.trim()) urlParams.append("city", params.city.trim());

    if (!isNaN(Number(params.minPrice)) && Number(params.minPrice) >= 0) {
        urlParams.append("minPrice", params.minPrice!.toString());
    }

    if (!isNaN(Number(params.maxPrice)) && Number(params.maxPrice) >= 0) {
        urlParams.append("maxPrice", params.maxPrice!.toString());
    }

    if (params.sortBy) urlParams.append("sortBy", params.sortBy);
    if (params.sortOrder) urlParams.append("sortOrder", params.sortOrder);

    try {
        console.log("Fetching hostels...");
        const response = await axios.get(`/api/hostels?${urlParams.toString()}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching hostels:", error);
        throw error;
    }
};

// 🔹 Custom Hook to Fetch Hostels
export function useFetchHostels(params: FetchHostelParams, limit?: number) {
    const debouncedSearch = useDebounce(params.search || "", 500);

    return useQuery<HostelResponse, Error>({
        queryKey: ['hostels', { ...params, search: debouncedSearch }, limit],
        queryFn: () => fetchHostels({ ...params, search: debouncedSearch, limit }),
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        retry: 3, 
  
    });
}
