import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FetchHostelParams,  HostelResponse } from "@/types";
import axios from "axios";
import useDebounce from "./useDebounce";

// Keep the existing useDebounce hook

const fetchHostels = async (params: FetchHostelParams): Promise<HostelResponse> => {
    const urlParams = new URLSearchParams({
        page: params.page.toString(),
        isAvailable: "true"
    });

    // Existing filters
    if (params.limit) urlParams.append("limit", params.limit.toString());
    if (params.gender && params.gender !== "all") urlParams.append("gender", params.gender);
    if (params.search?.trim()) urlParams.append("search", params.search.trim());
    if (params.city?.trim()) urlParams.append("city", params.city.trim());

    // Price filters
    if (!isNaN(Number(params.minPrice)) && Number(params.minPrice) >= 0) {
        urlParams.append("minPrice", params.minPrice!.toString());
    }

    if (!isNaN(Number(params.maxPrice)) && Number(params.maxPrice) >= 0) {
        urlParams.append("maxPrice", params.maxPrice!.toString());
    }

    if (params.nearByCoaching?.trim()) {
        urlParams.append("nearByCoaching", params.nearByCoaching.trim());
    }

    // Sorting
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

export function useFetchHostels(params: FetchHostelParams, limit?: number) {
    const debouncedSearch = useDebounce(params.search || "", 500);
    const debouncedNearByCoaching = useDebounce(params.nearByCoaching || "", 500);

    return useQuery<HostelResponse, Error>({
        queryKey: [
            'hostels', 
            { 
                ...params, 
                search: debouncedSearch,
                nearByCoaching: debouncedNearByCoaching 
            }, 
            limit
        ],
        queryFn: () => fetchHostels({ 
            ...params, 
            search: debouncedSearch,
            nearByCoaching: debouncedNearByCoaching,
            limit 
        }),
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        retry: 3, 
    });
}