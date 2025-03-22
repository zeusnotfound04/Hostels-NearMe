import React from 'react';
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
  const [open, setOpen] = React.useState(compareList.length > 0);

  // Open sidebar when items are added
  React.useEffect(() => {
    if (compareList.length > 0 && !open) {
      setOpen(true);
    }
  }, [compareList.length, open]);

  const handleCompare = () => {
    if (compareList.length < 2) {
      toast.warning("Add at least 2 hostels to compare");
      return;
    }
    
    // Create a query string with all hostel IDs
    const hostelIds = compareList.map(h => h.id).join(',');
    router.push(`/compare?hostels=${hostelIds}`);
  };

  return (
    <SidebarProvider defaultOpen={compareList.length > 0} open={open} onOpenChange={setOpen}>
      <Sidebar 
        side="right" 
        variant="floating" 
        className="!max-w-80 z-20 group-data-[state=expanded]:w-80"
      >
        <SidebarHeader className="border-b border-sidebar-border py-4">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <ShoppingBasket className="h-5 w-5" />
              <h3 className="font-semibold">Compare Hostels</h3>
              <Badge variant="outline" className="ml-1">
                {compareList.length}
              </Badge>
            </div>
            
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        
        <SidebarContent className="py-4">
          {compareList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <Info className="h-12 w-12 text-gray-300 mb-4" />
              <h4 className="font-medium text-gray-500 mb-2">No hostels to compare</h4>
              <p className="text-sm text-gray-400">
                Add hostels to compare by clicking the "Add to Compare" option from the hostel card menu.
              </p>
            </div>
          ) : (
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
          )}
        </SidebarContent>
        
        <SidebarFooter className="border-t border-sidebar-border p-4">
          <div className="space-y-3">
            {compareList.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between text-gray-500"
                onClick={clearCompareList}
              >
                <span>Clear all</span>
                <X className="h-4 w-4" />
              </Button>
            )}
            
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
      
      {/* Compare button for mobile */}
      {compareList.length > 0 && (
        <div className="fixed bottom-4 right-4 md:hidden z-20">
          <Button
            className="rounded-full h-12 w-12 bg-[#f10000] hover:bg-[#d10000] text-white shadow-lg"
            onClick={() => setOpen(true)}
          >
            <ShoppingBasket className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 bg-white text-black border border-red-500 text-xs h-5 min-w-5 flex items-center justify-center">
              {compareList.length}
            </Badge>
          </Button>
        </div>
      )}
    </SidebarProvider>
  );
};