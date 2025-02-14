import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Hostel } from "@/types";
import axios from "axios";


interface FetchHostelParams {
    page : number;
    limit? : number;
    search? : string;
    city? : string;
    gender? : string;
    minPrice? : number;
    maxPrice? : number;   
}


interface HostelResponse {
    hostel : Hostel[];
    pagination : {
        totalPages : number;
        currentPage : number;
        totalItems : number;
    }
}

const fetchHostels = async (params: FetchHostelParams): Promise<HostelResponse> => {
    const urlParams = new URLSearchParams({
        page: params.page.toString(),
        isAvailable: "true"
    });

    if (params.limit !== undefined && params.limit !== null) {
        urlParams.append('limit', params.limit.toString());
    }

    if (params.gender && params.gender !== "all") {
        urlParams.append('gender', params.gender);
    }

    if (params.search?.trim()) {
        urlParams.append('search', params.search.trim());
    }

    if (params.city?.trim()) {
        urlParams.append('city', params.city.trim());
    }

    const minPriceNum = Number(params.minPrice);
    const maxPriceNum = Number(params.maxPrice);

    if (!isNaN(minPriceNum) && minPriceNum >= 0) {
        urlParams.append('minPrice', minPriceNum.toString());
    }

    if (!isNaN(maxPriceNum) && maxPriceNum >= 0) {
        urlParams.append('maxPrice', maxPriceNum.toString());
    }

    console.log("Calling the API...");
    const response = await axios.get(`/api/hostels?${urlParams.toString()}`);


    return response.data;
};


export function useFetchHostels(params: FetchHostelParams, limit?: number) {
    return useQuery<HostelResponse, Error>({
        queryKey: ['hostels', params, limit],
        queryFn: () => fetchHostels({ ...params, limit }),

        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
}
