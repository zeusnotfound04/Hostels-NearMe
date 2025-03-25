"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import IconsBG from "../../../public/icons/IconsBG.png";
import Book from "../../../public/UI/book.png";
import View from "../../../public/UI/view.png";
import Compare from "../../../public/UI/compare.png";
import { Stepper, Step } from '@/components/ui/stepper'; 

export function StepBooking() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Mobile Stepper Content
  const MobileStepContent = () => (
    <Stepper className="w-full">
      <Step>
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white rounded-lg p-4 w-full aspect-square flex flex-col justify-between relative">
            <h1 className="text-[#7C2121] font-bold text-xl">VIEW</h1>
            <div className="flex items-center justify-center flex-1">
              <Image src={View} alt="Step 1" width={200} height={200} className="object-contain" />
            </div>
          </div>
          <p className="text-center font-bold text-lg text-white">
            Browse through available options
          </p>
        </div>
      </Step>

      <Step>
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white rounded-lg p-4 w-full aspect-square flex flex-col justify-between relative">
            <h1 className="text-[#7C2121] font-bold text-xl">COMPARE</h1>
            <div className="flex items-center justify-center flex-1">
              <Image src={Compare} alt="Step 2" width={200} height={200} className="object-contain" />
            </div>
          </div>
          <p className="text-center font-bold text-lg text-white">
            Compare different choices
          </p>
        </div>
      </Step>

      <Step>
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white rounded-lg p-4 w-full aspect-square flex flex-col justify-between relative">
            <h1 className="text-[#7C2121] font-bold text-xl">BOOK</h1>
            <div className="flex items-center justify-center flex-1">
              <Image src={Book} alt="Step 3" width={200} height={200} className="object-contain" />
            </div>
          </div>
          <p className="text-center font-bold text-lg text-white">
            Complete your booking
          </p>
        </div>
      </Step>
    </Stepper>
  );

  const DesktopContent = () => (
    <div className="overflow-x-auto w-full">
      <div className="bg-[#7C2121] rounded-xl p-10 flex gap-6 w-full max-w-6xl relative overflow-hidden">
        <Image 
          src={IconsBG}
          alt="Background icons" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-20 absolute inset-0"
        />

        {/* Step 1 */}
        <div className="flex flex-col p-4 flex-1 relative z-10 min-w-[300px]">
          <h2 className="text-white text-3xl font-bold text-left mb-10">
            Step 1
          </h2>
          <div className="bg-white rounded-lg p-8 w-full h-[20rem] flex flex-col justify-between relative overflow-hidden pb-12">
            <h1 className="text-[#7C2121] font-bold absolute top-4 left-6 text-xl">VIEW</h1>
            <div className="flex items-center justify-center w-full h-full">
              <Image src={View} alt="Step 1" width={600} height={600} className="mt-10 max-h-64 object-contain" />
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col p-4 flex-1 relative z-10 min-w-[300px]">
          <h3 className="text-white text-3xl font-bold text-left mb-10">
            Step 2
          </h3>
          <div className="bg-white rounded-lg p-4 w-full h-[20rem] flex flex-col justify-between relative overflow-hidden pb-12">
            <h1 className="text-[#7C2121] font-bold absolute top-4 left-6 text-xl">COMPARE</h1>
            <div className="flex items-center justify-center w-full h-full">
              <Image src={Compare} alt="Step 2" width={1100} height={1100} className="mt-14 max-h-64 object-contain" />
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col p-4 flex-1 relative z-10 min-w-[300px]">
          <h3 className="text-white text-3xl font-bold text-left mb-10">
            Step 3
          </h3>
          <div className="bg-white rounded-lg p-8 w-full h-[20rem] flex flex-col justify-between relative overflow-hidden pb-12">
            <h1 className="text-[#7C2121] font-bold absolute top-4 left-6 text-xl">BOOK</h1>
            <div className="flex items-center justify-center w-full h-full">
              <Image src={Book} alt="Step 3" width={600} height={600} className="mt-10 max-h-64 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col items-start justify-center py-10 px-6">
      <h2 className="text-4xl font-bold text-black mb-10">
        Three Simple Steps to Effortless Booking
      </h2>
      
      {isMobile ? (
        <div className="w-full bg-[#7C2121] rounded-xl p-6 relative">
          <Image 
            src={IconsBG}
            alt="Background icons" 
            layout="fill" 
            objectFit="cover" 
            className="opacity-20 absolute inset-0"
          />
          <div className="relative z-10">
            <MobileStepContent />
          </div>
        </div>
      ) : (
        <DesktopContent />
      )}
    </div>
  );
}