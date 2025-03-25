"use client"
import { LeftDoodle1, LeftDoodle2, LeftDoodle3, LeftDoodle4, RightDoodle1, RightDoodle2, RightDoodle3, RightDoodle4 } from '@/components/ui/icon';
import React, { useState } from 'react';

interface LocationData {
  title: string;
  description: string;
  imageUrl: string;
}

const CityExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const locations: LocationData[] = [
    {
      title: 'Anandi Water Park',
      description: 'When we thought of getting in this sector, we asked ourselves, who exactly is it we are going to help or solve problems for as we will be connecting 2 parties together, we knew that we will be bringing the Hostel Owners and Students under one roof. When we glanced into this unorganized sector more thoroughly we realized we will be helping the Students but with that we won\'t be leaving the Hostel Owners. That moment we decided to find a broader approach to get the Hostel Owners more benefits if they are bringing their business online. We need our numbers again (with more focus on the local and geographical area) to be their support and then we started seeing both the parties on Two sides of a same coin and decided to be more than just and fair with them.',
      imageUrl: '/anandi-water-park.jpg'
    },
    {
      title: 'Janeshwar Mishra Park',
      description: 'When we thought of getting in this sector, we asked ourselves, who exactly is it we are going to help or solve problems for as we will be connecting 2 parties together, we knew that we will be helping the students by saving their time and their resources and so on. But, when we glanced into this unorganized sector more thoroughly we realized we will be helping the Students but with that we won\'t be leaving the Hostel Owners. That moment we decided to find a broader approach to get the Hostel Owners more benefits if they are bringing their business online. We need our numbers again (with more focus on the local and geographical area) to be their support and then we started seeing both the parties on Two sides of a same coin and decided to be more than just and fair with them.',
      imageUrl: '/janeshwar-mishra-park.jpg'
    },
    {
      title: 'Aminabad',
      description: 'When we thought of getting in this sector, we asked ourselves, who exactly is it we are going to help or solve problems for as we will be connecting 2 parties together, we knew that we will be helping the Hostel Owners and Students under one roof. When we glanced into this unorganized Sector more thoroughly we realized we will be helping the Students but with that we won\'t be leaving the Hostel Owners. That moment we decided to find a broader approach to get the Hostel Owners more benefits if they are bringing their business online. We need our numbers again (with more focus on the local and geographical area) to be their support and then we started seeing both the parties on Two sides of a some coin and decided to be more than just and fair with them.',
      imageUrl: '/aminabad.jpg'
    }
  ];

  return (
    <div className="relative min-h-screen bg-white font-sans">
      {/* Fixed Vector Borders - Only visible on desktop */}
      <div className="hidden md:block fixed inset-0 pointer-events-none z-10">
        <div className="absolute top-20 left-0 w-full h-full">
          <LeftDoodle1 props="absolute top-0 left-0" />
          <LeftDoodle2 props="absolute top-1/4 left-0 " />
          <LeftDoodle3 props="absolute top-1/2 left-0 " />
          <LeftDoodle4 props="absolute bottom-20 left-0 " />

          <RightDoodle1  props="absolute top-0 right-0 rotate-0" />
          <RightDoodle2 props="absolute top-1/4 right-0 rotate-135"/>
          <RightDoodle3 props="absolute top-1/2 right-0 rotate-225" />
          <RightDoodle4 props="absolute bottom-20 right-0 rotate-315" />
        </div>
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">
          Explore Your City, Find Your Perfect Stay
        </h1>

        <div className="max-w-md mx-auto mb-8">
          <input 
            type="text" 
            placeholder="Lucknow" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border-2 border-red-500 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>

        <div className="space-y-8">
          {locations.map((location, index) => (
            <div 
              key={index} 
              className="bg-white border-2 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row"
            >
              <div className="w-full md:w-1/2 p-4">
                <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-4">{location.title}</h2>
                <p className="text-gray-700 line-clamp-6">{location.description}</p>
              </div>
              <div className="w-full md:w-1/2">
                <img 
                  src={location.imageUrl} 
                  alt={location.title} 
                  className="w-full h-48 md:h-full object-cover border-8 border-[#8B0000]"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Previous
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Next
          </button>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-600">
        Made in India. For the World
      </div>
    </div>
  );
};

export default CityExplorer;