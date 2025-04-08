"use client"
import React, { useEffect, useState } from 'react';
import { X, ChevronRight, ArrowLeft, ShoppingBasket, Info } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCompare } from '@/context/compare-context';
import { useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { MaleIcon, FemaleIcon } from '@/components/ui/icon';
import {toast} from 'sonner'

export const CompareBar = () => {
  const { compareList, removeFromCompare, clearCompareList } = useCompare();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Update sidebar visibility when compare list changes
  useEffect(() => {
    // Show sidebar when first item is added and the sidebar is not manually closed
    if (compareList.length > 0 && !open && !localStorage.getItem('compareBarManuallyClosed')) {
      setOpen(true);
    }
    
    // Hide sidebar when list becomes empty
    if (compareList.length === 0 && open) {
      setOpen(false);
      localStorage.removeItem('compareBarManuallyClosed');
    }
  }, [compareList.length, open]);

  // Handle manual toggle
  const handleToggle = () => {
    const newState = !open;
    setOpen(newState);
    
    // Store the manual state in localStorage
    if (!newState && compareList.length > 0) {
      localStorage.setItem('compareBarManuallyClosed', 'true');
    } else {
      localStorage.removeItem('compareBarManuallyClosed');
    }
  };

  const handleCompare = () => {
    if (compareList.length < 2) {
      toast.warning("Add at least 2 hostels to compare");
      return;
    }
    
    // Create a query string with all hostel IDs
    const hostelIds = compareList.map(h => h.id).join(',');
    router.push(`/compare?hostels=${hostelIds}`);
  };

  // Don't render anything if the compare list is empty
  if (compareList.length === 0) {
    return null;
  }

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar 
        side="right" 
        variant="floating" 
        className="!max-w-80 z-20 group-data-[state=expanded]:w-80"
      >
        <SidebarHeader className="border-b border-white py-4">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <ShoppingBasket className="h-5 w-5" />
              <h3 className="font-semibold">Compare Hostels</h3>
              <Badge variant="outline" className="ml-1">
                {compareList.length}
              </Badge>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggle}
              aria-label="Close compare panel"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="py-4">
          <div className="space-y-4">
            {compareList.map((hostel) => (
              <div key={hostel.id} className="px-4 relative group">
                <div className="flex gap-3 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-all">
                  <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                    {Array.isArray(hostel.images) && hostel.images.length > 0 ? (
                      <Image
                        src={hostel.images[0]}
                        alt={hostel.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <p className="text-gray-400 text-xs">No Image</p>
                      </div>
                    )}
                    <Badge className="absolute top-1 right-1 bg-[#902920] text-white p-1 h-5 w-5 flex items-center justify-center rounded-full">
                      {hostel.gender === "BOYS" ? 
                        <MaleIcon className="w-3 h-3" /> : 
                        <FemaleIcon className="w-3 h-3" />
                      }
                    </Badge>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate pr-6">{hostel.name}</h4>
                    <p className="text-xs text-gray-500 mb-1">{hostel.city}, {hostel.state}</p>
                    <p className="font-bold text-sm">₹{hostel.price}/-</p>
                  </div>
                  
                  <button
                    onClick={() => removeFromCompare(hostel.id)}
                    className="absolute top-2 right-5 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all"
                    aria-label="Remove from compare"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SidebarContent>
        
        <SidebarFooter className="border-t border-white p-4">
          <div className="space-y-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between text-gray-500"
              onClick={clearCompareList}
            >
              <span>Clear all</span>
              <X className="h-4 w-4" />
            </Button>
            
            <Button
              className="w-full justify-between bg-[#f10000] hover:bg-[#d10000] text-white"
              disabled={compareList.length < 2}
              onClick={handleCompare}
            >
              <span>Compare Now</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      
      {/* Compare button that serves as both indicator and toggle */}
    <div className="fixed bottom-16 right-6 z-20">
  <Button
    className={`rounded-full h-14 w-14 bg-[#f10000] hover:bg-[#d10000] text-white shadow-lg transition-transform transform hover:scale-110 flex items-center justify-center`}
    onClick={handleToggle}
    aria-label={open ? "Minimize compare panel" : "Open compare panel"}
  >
    {open ? (
      <ArrowLeft className="h-6 w-6" />
    ) : (
      <ShoppingBasket className="h-6 w-6" />
    )}
    <Badge className="absolute -top-2 -right-2 bg-white text-black border-white border-red-500 text-xs h-5 min-w-5 flex items-center justify-center">
      {compareList.length}
    </Badge>
  </Button>
</div>

    </SidebarProvider>
  );
};