import { HostelCard } from "@/components/home/HostelCard";

export function HostelListing({ hostels = [] }) {
    return (
        <div className="bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Discover Our Finest Stays
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Discover hostels designed for comfort and convenience, tailored just for you.
              </p>
            </div>
    
            {/* Mobile Scroll Container */}
            <div className="md:hidden -mx-4 px-4">
              <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scrollbar-hide">
                {hostels.map((hostel) => (
                  <div key={hostel.id} className="snap-center">
                    <HostelCard hostel={hostel} />
                  </div>
                ))}
              </div>
            </div>
    
            {/* Desktop Grid Layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hostels.map((hostel) => (
                <HostelCard key={hostel.id} hostel={hostel} />
              ))}
            </div>
          </div>
        </div>
      );
    };
 
    const ScrollbarHideStyles = `
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
  `;

