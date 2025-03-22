import React, { createContext, useContext, useState, useEffect } from 'react';
import { Hostel } from '@/types';
import {toast} from "sonner"

type CompareContextType = {
  compareList: Hostel[];
  addToCompare: (hostel: Hostel) => void;
  removeFromCompare: (hostelId: string) => void;
  clearCompareList: () => void;
  isInCompareList: (hostelId: string) => boolean;
};

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<Hostel[]>([]);
  
  // Load compare list from localStorage on initial mount
  useEffect(() => {
    try {
      const savedList = localStorage.getItem('hostelCompareList');
      if (savedList) {
        setCompareList(JSON.parse(savedList));
      }
    } catch (error) {
      console.error('Error loading compare list from localStorage:', error);
    }
  }, []);
  
  
  useEffect(() => {
    try {
      localStorage.setItem('hostelCompareList', JSON.stringify(compareList));
    } catch (error) {
      console.error('Error saving compare list to localStorage:', error);
    }
  }, [compareList]);

  const addToCompare = (hostel: Hostel) => {
    console.log("HOSTEL ADDING TO COMPARE LIST" , hostel)
    // Only add if not already in the list
    if (!isInCompareList(hostel.id)) {
      if (compareList.length >= 4) {
        toast.warning("You can compare up to 4 hostels at a time");
        return;
      }

      setCompareList(prev => [...prev, hostel]);
      console.log("COMPARE LIST", compareList)
      toast.success(`${hostel.name} added to compare list`);
    } else {
      // If already in list, remove it
      console.log("REMOVING FROM THE COMPARE LIST" , hostel.name)
      removeFromCompare(hostel.id);
    }
  };

  const removeFromCompare = (hostelId: string) => {
    setCompareList(prev => prev.filter(h => h.id !== hostelId));
    toast.info("Removed from compare list");
  };

  const clearCompareList = () => {
    setCompareList([]);
    toast.info("Compare list cleared");
  };

  const isInCompareList = (hostelId: string) => {
    return compareList.some(hostel => hostel.id === hostelId);
  };

  return (
    <CompareContext.Provider value={{ 
      compareList, 
      addToCompare, 
      removeFromCompare, 
      clearCompareList,
      isInCompareList
    }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};