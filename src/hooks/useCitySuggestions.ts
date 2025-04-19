"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useEffect, useMemo } from "react";
import useDebounce from "./useDebounce";

// Check if code is running in browser environment
const isBrowser = typeof window !== 'undefined';

// Types for the API response
interface State {
  id: string;
  name: string;
  cities: City[];
}

interface City {
  id: string;
  name: string;
  stateId: string;
}

// Type for the formatted city suggestion
export interface CitySuggestion {
  id: string;
  name: string;
  state: string;
  formattedName: string; // "City, State" format
}

// Mock data for development - will display if API fails
const mockCitySuggestions: CitySuggestion[] = [
  { id: '1', name: 'Lucknow', state: 'Uttar Pradesh', formattedName: 'Lucknow, Uttar Pradesh' },
  { id: '2', name: 'Kanpur', state: 'Uttar Pradesh', formattedName: 'Kanpur, Uttar Pradesh' },
  { id: '3', name: 'Varanasi', state: 'Uttar Pradesh', formattedName: 'Varanasi, Uttar Pradesh' },
  { id: '4', name: 'New Delhi', state: 'Delhi', formattedName: 'New Delhi, Delhi' },
  { id: '5', name: 'Mumbai', state: 'Maharashtra', formattedName: 'Mumbai, Maharashtra' },
  { id: '6', name: 'Pune', state: 'Maharashtra', formattedName: 'Pune, Maharashtra' },
  { id: '7', name: 'Bangalore', state: 'Karnataka', formattedName: 'Bangalore, Karnataka' },
  { id: '8', name: 'Chennai', state: 'Tamil Nadu', formattedName: 'Chennai, Tamil Nadu' },
];

// Function to safely access localStorage
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (!isBrowser) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  }
};

// Function to fetch locations data from the API
const fetchCitiesWithStates = async (): Promise<CitySuggestion[]> => {
  try {
    // Avoid timestamp parameter on subsequent calls
    const cachedData = safeLocalStorage.getItem('citySuggestionsCache');
    const cachedTime = safeLocalStorage.getItem('citySuggestionsCacheTime');
    
    // If we have cached data and it's less than 1 hour old, use it
    if (cachedData && cachedTime) {
      const cacheAge = Date.now() - parseInt(cachedTime);
      if (cacheAge < 3600000) { // 1 hour in milliseconds
        return JSON.parse(cachedData) as CitySuggestion[];
      }
    }
    
    const response = await axios.get<{ states: State[] }>(`/api/locations/states`);
    const statesData: State[] = response.data.states;
    
    if (!statesData || !Array.isArray(statesData)) {
      return mockCitySuggestions;
    }

    // Format the data to have cities with their respective states
    const citySuggestions: CitySuggestion[] = [];

    statesData.forEach((state) => {
      if (state.cities && Array.isArray(state.cities)) {
        state.cities.forEach((city) => {
          citySuggestions.push({
            id: city.id,
            name: city.name,
            state: state.name,
            formattedName: `${city.name}, ${state.name}`,
          });
        });
      }
    });
    
    // If no cities were found in the API response, return mock data
    if (citySuggestions.length === 0) {
      return mockCitySuggestions;
    }
    
    // Cache the results in localStorage for future use
    safeLocalStorage.setItem('citySuggestionsCache', JSON.stringify(citySuggestions));
    safeLocalStorage.setItem('citySuggestionsCacheTime', Date.now().toString());
    
    return citySuggestions;
  } catch (error) {
    // Return mock data in case of errors
    return mockCitySuggestions;
  }
};

interface UseCitySuggestionsOptions {
  enabled?: boolean;
  searchQuery?: string;
  debounceMs?: number;
}

interface UseCitySuggestionsResult {
  suggestions: CitySuggestion[];
  allSuggestions: CitySuggestion[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  fetchStatus: string;
  status: string;
}

export function useCitySuggestions({
  enabled = true,
  searchQuery = "",
  debounceMs = 300,
}: UseCitySuggestionsOptions = {}): UseCitySuggestionsResult {
  const queryClient = useQueryClient();
  const debouncedSearchQuery = useDebounce<string>(searchQuery, debounceMs);

  // Main query for fetching city suggestions
  const {
    data: allCitySuggestions = [],
    isLoading,
    isError,
    error,
    refetch,
    status,
    fetchStatus
  } = useQuery({
    queryKey: ["citySuggestions"],
    queryFn: fetchCitiesWithStates,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled,
    refetchOnWindowFocus: false,
    // Optimize refetching strategy
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
    // Initialize with cached data if available
    initialData: (): CitySuggestion[] => {
      const cachedData = safeLocalStorage.getItem('citySuggestionsCache');
      if (cachedData) {
        try {
          return JSON.parse(cachedData) as CitySuggestion[];
        } catch {
          return [];
        }
      }
      return [];
    }
  });

  // Memoize the filtered suggestions to prevent recalculation on every render
  const filteredSuggestions: CitySuggestion[] = useMemo(() => {
    if (!debouncedSearchQuery) return [];
    
    return allCitySuggestions.filter((city: CitySuggestion) =>
      city.formattedName
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase())
    );
  }, [allCitySuggestions, debouncedSearchQuery]);

  // Memoize the display suggestions to prevent recalculation
  const displaySuggestions: CitySuggestion[] = useMemo(() => {
    if (debouncedSearchQuery) {
      return filteredSuggestions;
    }
    return [];
  }, [debouncedSearchQuery, filteredSuggestions]);

  // Only refetch when explicitly needed
  const triggerRefetch = useCallback(() => {
    const cachedTime = safeLocalStorage.getItem('citySuggestionsCacheTime');
    
    // Only refetch if cache is older than 1 hour
    if (!cachedTime || (Date.now() - parseInt(cachedTime) > 3600000)) {
      refetch();
    }
  }, [refetch]);

  // Prefetch city suggestions on first use if needed
  useEffect(() => {
    if (enabled) {
      triggerRefetch();
    }
  }, [enabled, triggerRefetch]);

  return {
    suggestions: displaySuggestions,
    allSuggestions: allCitySuggestions,
    isLoading,
    isError,
    error,
    refetch: triggerRefetch,
    fetchStatus,
    status
  };
}