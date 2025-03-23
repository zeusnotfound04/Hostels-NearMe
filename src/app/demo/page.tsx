import React from "react";
import Image from "next/image";
import { ChevronDown, Menu, Search, User } from "lucide-react";
import { LocationIcon } from "@/components/ui/icon";


function Page(){
    return    <div className="min-h-screen bg-white">


    {/* Main Content */}
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add Another Hostel */}
        <div className="flex flex-col items-center justify-center">
          <div className="border-2 border-dashed border-[#912923] rounded-md p-10 mb-2 flex items-center justify-center">
            <span className="text-4xl text-[#858484]">+</span>
          </div>
          <button className="bg-[#d9d9d9] rounded-md px-4 py-2 text-sm">Add another hostel</button>
        </div>

        {/* Namo Residency */}
        <div className="flex flex-col">
          <div className="rounded-md overflow-hidden mb-2">
            <Image
              src="/placeholder.svg?height=150&width=300"
              alt="Namo Residency"
              width={300}
              height={150}
              className="w-full h-[150px] object-cover"
            />
          </div>
          <h3 className="text-xl font-bold text-center">Namo Residency</h3>
        </div>

        {/* Ganesh Residency */}
        <div className="flex flex-col">
          <div className="rounded-md overflow-hidden mb-2">
            <Image
              src="/placeholder.svg?height=150&width=300"
              alt="Ganesh Residency"
              width={300}
              height={150}
              className="w-full h-[150px] object-cover"
            />
          </div>
          <h3 className="text-xl font-bold text-center">Ganesh Residency</h3>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mt-8">
        {/* Price Row */}
        <div className="grid grid-cols-3 gap-4 items-center border-t border-b border-dashed border-[#912923] py-4">
          <div>
            <div className="bg-[#912923] text-white rounded-md py-2 px-6 inline-block">
              <span className="font-bold">Price</span>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-[#d9d9d9] rounded-md py-2 px-6 inline-block">
              <span className="font-bold">₹10,500/-</span>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-[#d9d9d9] rounded-md py-2 px-6 inline-block">
              <span className="font-bold">₹7,500/-</span>
            </div>
          </div>
        </div>

        {/* Hostel Type Row */}
        <div className="grid grid-cols-3 gap-4 items-center border-b border-dashed border-[#912923] py-4">
          <div>
            <div className="bg-[#912923] text-white rounded-md py-2 px-6 inline-block">
              <span className="font-bold">Hostel Type</span>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-[#d9d9d9] rounded-md py-2 px-6 inline-block">
              <span>Single</span>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-[#d9d9d9] rounded-md py-2 px-6 inline-block">
              <span>Shared</span>
            </div>
          </div>
        </div>

        {/* Amenities Row */}
        <div className="grid grid-cols-3 gap-4 items-start border-b border-dashed border-[#912923] py-4">
          <div>
            <div className="bg-[#912923] text-white rounded-md py-2 px-6 inline-block">
              <span className="font-bold">Amenities</span>
            </div>
          </div>
          <div className="text-left">
            <div className="bg-[#d9d9d9] rounded-md py-4 px-6">
              <ul className="list-disc pl-4 space-y-2">
                <li>Wi-Fi</li>
                <li>Indoor Games</li>
                <li>Food Included</li>
                <li>CCTV</li>
                <li>Parking</li>
              </ul>
            </div>
          </div>
          <div className="text-left">
            <div className="bg-[#d9d9d9] rounded-md py-4 px-6">
              <ul className="list-disc pl-4 space-y-2">
                <li>RO Water</li>
                <li>Cooler</li>
                <li>Security Guard</li>
                <li>CCTV</li>
                <li>Parking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Hostel Rules Row */}
        <div className="grid grid-cols-3 gap-4 items-start border-b border-dashed border-[#912923] py-4">
          <div>
            <div className="bg-[#912923] text-white rounded-md py-2 px-6 inline-block">
              <span className="font-bold">Hostel Rules</span>
            </div>
          </div>
          <div className="text-left">
            <div className="bg-[#d9d9d9] rounded-md py-4 px-6">
              <ul className="list-disc pl-4 space-y-2">
                <li>No smoking</li>
                <li>No Loud Music</li>
              </ul>
            </div>
          </div>
          <div className="text-left">
            <div className="bg-[#d9d9d9] rounded-md py-4 px-6">
              <ul className="list-disc pl-4 space-y-2">
                <li>Resident respect</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Hostel Type (Boys) Row */}
        <div className="grid grid-cols-3 gap-4 items-center border-b border-dashed border-[#912923] py-4">
          <div>
            <div className="bg-[#912923] text-white rounded-md py-2 px-6 inline-block">
              <span className="font-bold">Hostel Type</span>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-[#d9d9d9] rounded-md py-2 px-6 inline-block">
              <span>Boys</span>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-[#d9d9d9] rounded-md py-2 px-6 inline-block">
              <span>Boys</span>
            </div>
          </div>
        </div>
      </div>

      {/* Made in India */}
      <div className="text-center mt-16 mb-8">
        <p className="text-lg font-bold">
          Made in <span className="text-[#912923]">India</span>. For the <span className="text-[#912923]">World</span>
        </p>
      </div>

     
    </main>

  </div>


}


export default Page;