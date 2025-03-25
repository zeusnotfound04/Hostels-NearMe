
"use client"
import { LeftDoodle1, LeftDoodle2, LeftDoodle3, LeftDoodle4, RightDoodle1, RightDoodle2, RightDoodle3, RightDoodle4 } from '@/components/ui/icon';
import { useBlogSearch } from '@/hooks/useFetchBlogs';
import React, { useState } from 'react';

interface LocationData {
    title: string;
    description: string;
    imageUrl: string;
  }



export default function MainBlogs() {
    const [searchQuery, setSearchQuery] = useState('');


    return(
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
            {blogs.map((blog, index) => (
              <div 
                key={index} 
                className="bg-white border-2 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row"
              >
                <div className="w-full md:w-1/2 p-4">
                  <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-4">{location.title}</h2>
                  <p className="text-gray-700 line-clamp-6">{location.}</p>
                </div>
                <div className="w-full md:w-1/2">
                  <img 
                    src={blog.imageUrl} 
                    alt={blog.title} 
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
    )
}


