import Image from "next/image";
import { MapPin, Wind, Bath, Coffee, Wifi, Camera, BatteryCharging } from 'lucide-react';


export function HostelCard({ hostel }) {
    const amenityIcons = [
        { label: 'AC & Non AC', show: hostel.airconditioner, icon: <Wind className="w-4 h-4" /> },
        { label: 'Veg Only', show: !hostel.isNonVeg, icon: <Coffee className="w-4 h-4" /> },
        { label: 'Attached Washroom', show: hostel.attachedWashroom, icon: <Bath className="w-4 h-4" /> },
        { label: 'WiFi', show: hostel.wiFi, icon: <Wifi className="w-4 h-4" /> },
        { label: 'CCTV', show: hostel.cctv, icon: <Camera className="w-4 h-4" /> },
        { label: 'Power Backup', show: hostel.inverterBackup, icon: <BatteryCharging className="w-4 h-4" /> }
      ];
  return (
    <div className="flex-shrink-0 w-[300px] md:w-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
        <div className="relative h-48 w-full">
            {hostel.images && hostel.images[0] ? ( 
                <Image
                    src={hostel.images[0]}
                    alt="hostel"
                    fill
                    className="object-cover"
                    />
            ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No Image Available</p>
                </div>
            )}        

        </div>

        <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{hostel.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-5 h-5 mr-2 text-red-500" />
          <span className="text-sm">{`${hostel.address}, ${hostel.city}`}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {amenityIcons.map((amenity, index) => (
            amenity.show && (
              <div 
                key={index}
                className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 border border-gray-100 hover:bg-gray-100 transition-colors"
              >
                <span className="text-blue-500 mr-1.5">{amenity.icon}</span>
                {amenity.label}
              </div>
            )
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{hostel.price.toLocaleString()}</span>
            <span className="text-gray-600 text-sm ml-1">/- Starting From</span>
          </div>
          <button 
            className="bg-red-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            onClick={() => window.location.href = `/book/${hostel.id}`}
          >
            Book Now
          </button>
        </div>
      </div>

    </div>
  );

}