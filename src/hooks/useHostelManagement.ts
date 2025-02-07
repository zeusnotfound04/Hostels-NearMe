import { useState , useEffect , useCallback , useMemo } from "react";
import axios from "axios";
import { FilterState , HostelState , DeleteDialogState } from "@/types";


export default function useHostelManagement () {
    // Consolidated states
    const [filters, setFilters] = useState<FilterState>({
      search: '',
      type: 'all',
      city: '',
      priceRange: {
        min: '',
        max: ''
      },
      page: 1
    });
  
    const [hostelState, setHostelState] = useState<HostelState>({
      data: [],
      totalPages: 1,
      loading: false,
      error: null
    });
  
    const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
      isOpen: false,
      hostel: null
    });
  
    // Memoized query parameters
    const queryParams = useMemo(() => {
      const params = new URLSearchParams({
        page: filters.page.toString(),
        limit: '10',
        isAvailable: 'true'
      });
  
      if (filters.type !== 'all') {
        params.append('gender', filters.type);
      }
  
      if (filters.search?.trim()) {
        params.append('search', filters.search.trim());
      }
  
      if (filters.city?.trim()) {
        params.append('city', filters.city.trim());
      }
  
      if (filters.priceRange.min) {
        params.append('minPrice', filters.priceRange.min);
      }
  
      if (filters.priceRange.max) {
        params.append('maxPrice', filters.priceRange.max);
      }
  
      return params;
    }, [filters]);
    const fetchHostels = useCallback(async () => {
        try {
          setHostelState(prev => ({ ...prev, loading: true, error: null }));
          
          const response = await axios.get(`/api/hostels?${queryParams.toString()}`);
          
          setHostelState({
            data: response.data.hostels || [],
            totalPages: response.data.pagination?.totalPages || 1,
            loading: false,
            error: null
          });
        } catch (error: any) {
          setHostelState(prev => ({
            ...prev,
            loading: false,
            error: error.response?.data?.details || error.message
          }));
        }
      }, [queryParams]);
    
      // Debounced effect for search and filters
      useEffect(() => {
        const timer = setTimeout(fetchHostels, 500);
        return () => clearTimeout(timer);
      }, [fetchHostels]);
    
      // Filter update handlers
      const updateFilters = useCallback((updates: Partial<FilterState>) => {
        setFilters(prev => ({ ...prev, ...updates }));
      }, []);
    
      const handlePriceRangeChange = useCallback((value: string) => {
        if (value === "all") {
          updateFilters({ 
            priceRange: { min: '', max: '' },
            page: 1 
          });
        } else {
          const [min, max] = value.split("-");
          updateFilters({ 
            priceRange: { min, max },
            page: 1 
          });
        }
      }, [updateFilters]);
    
      const clearFilters = useCallback(() => {
        setFilters({
          search: '',
          type: 'all',
          city: '',
          priceRange: { min: '', max: '' },
          page: 1
        });
      }, []);
    
      // Delete hostel handler
      const handleDelete = useCallback(async (hostelId: string) => {
        try {
          const response = await axios.delete(`/api/hostels/${hostelId}`);
          if (response.data.message === "Hostel deleted successfully") {
            setDeleteDialog({ isOpen: false, hostel: null });
            fetchHostels();
          }
        } catch (error: any) {
          setHostelState(prev => ({
            ...prev,
            error: error.response?.data?.error || "Failed to delete hostel"
          }));
        }
      }, [fetchHostels]);
    
      return {
        filters,
        hostelState,
        deleteDialog,
        updateFilters,
        handlePriceRangeChange,
        clearFilters,
        handleDelete,
        setDeleteDialog
      };
    };
    