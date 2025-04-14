"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import IconsBG from "../../../public/icons/IconsBG.png";
import Book from "../../../public/UI/book.png";
import View from "../../../public/UI/view.png";
import Compare from "../../../public/UI/compare.png";
import { Stepper, Step } from '@/components/ui/stepper'; 
import { motion } from 'framer-motion';

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const stepCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: { 
        duration: 0.3
      }
    }
  };

  const labelVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

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
      <motion.div 
        className="bg-[#7C2121] rounded-xl p-10 flex gap-6 w-full max-w-6xl relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image 
          src={IconsBG}
          alt="Background icons" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-20 absolute inset-0"
        />

        {/* Step 1 */}
        <motion.div 
          className="flex flex-col p-4 flex-1 relative z-10 min-w-[300px]"
          variants={stepCardVariants}
        >
          <motion.h2 
            className="text-white text-3xl font-bold text-left mb-10"
            variants={titleVariants}
          >
            Step 1
          </motion.h2>
          <motion.div 
            className="bg-white rounded-lg p-8 w-full h-[20rem] flex flex-col justify-between relative overflow-hidden pb-12 hover:shadow-lg transition-shadow duration-300"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h1 
              className="text-[#7C2121] font-bold absolute top-4 left-6 text-xl"
              variants={labelVariants}
            >
              VIEW
            </motion.h1>
            <div className="flex items-center justify-center w-full h-full">
              <motion.div
                variants={imageVariants}
                whileHover="hover"
              >
                <Image src={View} alt="Step 1" width={600} height={600} className="mt-10 max-h-64 object-contain" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Step 2 */}
        <motion.div 
          className="flex flex-col p-4 flex-1 relative z-10 min-w-[300px]"
          variants={stepCardVariants}
        >
          <motion.h3 
            className="text-white text-3xl font-bold text-left mb-10"
            variants={titleVariants}
          >
            Step 2
          </motion.h3>
          <motion.div 
            className="bg-white rounded-lg p-4 w-full h-[20rem] flex flex-col justify-between relative overflow-hidden pb-12 hover:shadow-lg transition-shadow duration-300"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h1 
              className="text-[#7C2121] font-bold absolute top-4 left-6 text-xl"
              variants={labelVariants}
            >
              COMPARE
            </motion.h1>
            <div className="flex items-center justify-center w-full h-full">
              <motion.div
                variants={imageVariants}
                whileHover="hover"
              >
                <Image src={Compare} alt="Step 2" width={1400} height={1400} className="mt-10 max-h-64 object-contain" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Step 3 */}
        <motion.div 
          className="flex flex-col p-4 flex-1 relative z-10 min-w-[300px]"
          variants={stepCardVariants}
        >
          <motion.h3 
            className="text-white text-3xl font-bold text-left mb-10"
            variants={titleVariants}
          >
            Step 3
          </motion.h3>
          <motion.div 
            className="bg-white rounded-lg p-8 w-full h-[20rem] flex flex-col justify-between relative overflow-hidden pb-12 hover:shadow-lg transition-shadow duration-300"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h1 
              className="text-[#7C2121] font-bold absolute top-4 left-6 text-xl"
              variants={labelVariants}
            >
              BOOK
            </motion.h1>
            <div className="flex items-center justify-center w-full h-full">
              <motion.div
                variants={imageVariants}
                whileHover="hover"
              >
                <Image src={Book} alt="Step 3" width={600} height={600} className="mt-10 max-h-64 object-contain" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <div className="flex w-full flex-col items-start justify-center py-10 px-6">
      <motion.h2 
        className="text-4xl font-bold text-black mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Three Simple Steps to Effortless Booking
      </motion.h2>
      
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