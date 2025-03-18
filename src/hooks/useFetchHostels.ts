import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { Hostel } from "@/types";
import axios, { AxiosError } from "axios";
import { useEffect, useState, useRef } from "react";

export interface FetchHostelParams {
    page: number;
    limit?: number;
    search?: string;
    city?: string;
    gender?: string;
    hostelType?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface HostelResponse {
    hostels: Hostel[];
    pagination: {
        totalPages: number;
        currentPage: number;
        totalItems: number;
    }
}

const fetchHostels = async (params: FetchHostelParams): Promise<HostelResponse> => {
    try {
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

        if (params.hostelType && params.hostelType !== "all") {
            urlParams.append('hostelType', params.hostelType);
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

        if (params.sortBy) {
            urlParams.append('sortBy', params.sortBy);
            urlParams.append('sortOrder', params.sortOrder || 'asc');
        }

        const response = await axios.get(`/api/hostels?${urlParams.toString()}`, {
            
            timeout: 10000,
            
            signal: new AbortController().signal
        });

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response) {
               
                console.error("API Error:", error.response.status, error.response.data);
                throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            } else if (error.request) {
                
                console.error("Network Error:", error.message);
                throw new Error("Network error: No response received from server");
            }
        }
        console.error("Unexpected Error:", error);
        throw error;
    }
};

export function useFetchHostels(initialParams: FetchHostelParams, debounceTime = 500) {
    const queryClient = useQueryClient();
    const [debouncedParams, setDebouncedParams] = useState<FetchHostelParams>(initialParams);
    const [params, setParams] = useState<FetchHostelParams>(initialParams);
    const abortControllerRef = useRef<AbortController | null>(null);
    
    useEffect(() => {
        
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        
        abortControllerRef.current = new AbortController();
        
        const needsDebounce = 
            params.search !== debouncedParams.search ||
            params.city !== debouncedParams.city;
            
        if (needsDebounce) {
            const timer = setTimeout(() => {
                setDebouncedParams(params);
            }, debounceTime);
            
            return () => clearTimeout(timer);
        } else {
            setDebouncedParams(params);
        }
    }, [params, debounceTime]);
    
    useEffect(() => {
        if (debouncedParams.page < 1) return;
        
        const nextPage = debouncedParams.page + 1;
        queryClient.prefetchQuery({
            queryKey: ['hostels', { ...debouncedParams, page: nextPage }],
            queryFn: () => fetchHostels({ ...debouncedParams, page: nextPage }),
            staleTime: 1 * 60 * 1000 // 1 minute
        });
    }, [debouncedParams.page, queryClient]);
    
    const queryResult = useQuery<HostelResponse, Error>({
        queryKey: ['hostels', debouncedParams],
        queryFn: () => fetchHostels(debouncedParams),
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        retry: (failureCount, error) => {
            // Don't retry on 4xx errors
            if (error.message.includes('4')) return false;
            // Retry up to 3 times on other errors
            return failureCount < 3;
        },
    });
    
    return {
        ...queryResult,
        updateParams: (newParams: Partial<FetchHostelParams>) => {
            setParams(prev => ({ ...prev, ...newParams }));
        },
        resetParams: () => setParams(initialParams),
        params: debouncedParams,
        isDebouncing: JSON.stringify(params) !== JSON.stringify(debouncedParams)
    };
}