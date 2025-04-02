"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Filter } from 'lucide-react';
import BlurText from '../ui/blurtext';
import { Cover } from '../ui/cover';
import Stack from '../ui/stack';
import RotatingText from '../ui/roatingtext';

const images = [
  { id: 1, img: "https://content.jdmagicbox.com/comp/ghaziabad/w4/011pxx11.xx11.191217190807.e5w4/catalogue/rpn-boy-s-hostel-dasna-ghaziabad-hostels-adyayiouqi.jpg" },
  { id: 2, img: "https://bgiedu.in/wp-content/uploads/2024/07/hostl-min-scaled.jpg" },
  { id: 3, img: "https://grdedu.in/wp-content/gallery/grd-imt-hostel/Hostel-1-2-e1629272260929.jpg" },
  { id: 4, img: "https://snit.edu.in/wp-content/uploads/2022/12/IMG_9036-1024x646.jpg" }
];

const HostelPromoCard = () => {
  // Color palette based on the primary brand color
  const colors = {
    primary: '#902920',
    light: '#f8f0ee',
    secondary: '#d68e84',
    dark: '#5a1a14',
    accent: '#ffb74d',
    gradient: 'linear-gradient(135deg, #902920 0%, #c0392b 100%)'
  };

  // Animation variants
  const cardVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        duration: 0.8,
        type: "spring",
        stiffness: 100
      } 
    }
  };
  
  const filterItemVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.8
    },
    visible: (custom : any) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: 0.2 + (custom * 0.08) 
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const numberVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [0, 1.3, 1],
      opacity: 1,
      transition: {
        duration: 0.6,
        times: [0, 0.6, 1]
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-8">
      <motion.div 
        className="w-4/5 bg-white rounded-3xl shadow-2xl overflow-hidden relative"
        style={{ maxWidth: "1200px", minHeight: "500px" }}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        layoutId="hostels-card"
      >
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <motion.div
            className="absolute top-10 right-10 rounded-full"
            style={{ backgroundColor: colors.primary, width: 120, height: 120 }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-40 rounded-full"
            style={{ backgroundColor: colors.secondary, width: 80, height: 80 }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
        
        {/* Header */}
        <motion.div 
          className="p-8 pb-6 flex justify-between items-center"
          style={{ 
            background: colors.gradient
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-white flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <BlurText
              text="Find Your Perfect Hostel 🌍"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-4xl mb-8"
            />
          </motion.h2>
          
          <motion.div 
            className="flex space-x-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div 
              className="h-3 w-3 rounded-full bg-white opacity-60"
              whileHover={{ scale: 1.2 }}
            ></motion.div>
            <motion.div 
              className="h-3 w-3 rounded-full bg-white"
              whileHover={{ scale: 1.2 }}
            ></motion.div>
            <motion.div 
              className="h-3 w-3 rounded-full bg-white opacity-60"
              whileHover={{ scale: 1.2 }}
            ></motion.div>
          </motion.div>
        </motion.div>
        
        {/* Main Content */}
        <div className="p-10 flex flex-col md:flex-row h-full">
          {/* Left Column - Now contains merged content */}
          <div className="w-full md:w-1/2 pr-0 md:pr-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="h-full flex flex-col justify-center"
            >
              <motion.div 
                className="mb-6"
                variants={filterItemVariants}
                custom={0}
              >
                <h3 className="text-2xl text-gray-700 font-medium mb-1">
                  We guarantee
                </h3>
                <div className="flex items-center">
                  <motion.div 
                    className="relative"
                    variants={circleVariants}
                  >
                    <div 
                      className="p-4 rounded-full relative z-10"
                      style={{ backgroundColor: `${colors.primary}15` }}
                    >
                      <Clock 
                        size={42} 
                        color={colors.primary} 
                        strokeWidth={2}
                      />
                    </div>
                    <motion.div
                      className="absolute top-0 left-0 w-full h-full rounded-full"
                      style={{ backgroundColor: `${colors.primary}10` }}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.7, 0, 0.7]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 0.5
                      }}
                    />
                  </motion.div>
                  <div className="ml-6">
                    <motion.h2 
                      className="text-xl sm:text-2xl lg:text-3xl font-bold"
                      variants={filterItemVariants}
                      custom={1}
                    >
                      Hostels delivered to you
                    </motion.h2>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-center mb-8"
                variants={numberVariants}
              >
                <motion.span 
                  className="text-6xl md:text-7xl lg:text-8xl font-black"
                  style={{ color: colors.primary }}
                  animate={{
                    scale: [1, 1.05, 1],
                    textShadow: [
                      "0 0 0px rgba(144, 41, 32, 0.3)",
                      "0 0 20px rgba(144, 41, 32, 0.5)",
                      "0 0 0px rgba(144, 41, 32, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <Cover>15 minutes</Cover> 
                </motion.span>
              </motion.div>
              
              <motion.p 
                className="text-gray-600 text-lg text-center mb-8"
                variants={filterItemVariants}
                custom={4}
              >
                Search, filter, and book your perfect stay faster than ever
              </motion.p>

              {/* Merged "Extensive Filter Options" section */}
              <motion.div 
                className="mt-8 flex items-center"
                variants={filterItemVariants}
                custom={5}
              >
                <motion.div 
                  animate={{
                    rotate: [0, 10, -10, 10, 0]
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    repeat: 1
                  }}
                >
                  <Filter 
                    size={36} 
                    color={colors.primary}
                    strokeWidth={2}
                    className="mr-4"
                  />
                </motion.div>
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                    Extensive Filter Options
                  </h2>
                  <p className="text-gray-600">Find exactly what you need</p>
                </div>
               
              </motion.div>
            </motion.div>
       {/* Search by and Rotating Text in the same line */}
<div className="flex items-center space-x-3 mt-4">
  <span className="text-xl sm:text-2xl font-bold text-gray-800">Search by</span>
  <RotatingText
    texts={['Gender', 'Accommodation type', 'Facility type', 'Sharing type', 'Sort', 'Nearby Coaching']}
    mainClassName="px-3 sm:px-4 md:px-5 bg-[#902920] text-white font-bold text-xl sm:text-2xl overflow-hidden py-1 sm:py-2 md:py-3 justify-center rounded-lg"
    staggerFrom={"last"}
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "-120%" }}
    staggerDuration={0.025}
    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
    transition={{ type: "spring", damping: 30, stiffness: 400 }}
    rotationInterval={2000}
  />
</div>

          </div>
             
          {/* Right Column - Hostel Image */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 flex flex-col items-center justify-center">
            <Stack
              randomRotation={true}
              sensitivity={180}
              sendToBackOnClick={false}
              cardDimensions={{ width: 300, height: 300 }}
              cardsData={images}
            />
            {/* Add your text below the stack images */}
            <h1 className="mt-4 text-2xl text-gray-700 font-bold text-center">
              Find your ideal hostel
            </h1>
          </div>
        </div>
        
        {/* Footer */}
        <motion.div 
          className="px-10 py-6 flex justify-between items-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Pulsing Indicator */}
          <motion.div className="flex items-center">
            <motion.div
              className="h-3 w-3 rounded-full mr-2"
              style={{ backgroundColor: colors.accent }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            />
            <span className="text-gray-500 text-sm">
              Quick Booking
            </span>
          </motion.div>
          
          {/* CTA Button */}
          <motion.button
            className="px-8 py-3 rounded-full font-semibold text-white"
            style={{ background: colors.gradient }}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 10px 25px -5px rgba(144, 41, 32, 0.4)"
            }}
            whileTap={{ scale: 0.97 }}
          >
            Book Now
          </motion.button>
        </motion.div>
        
        {/* Animated Progress Bar */}
        
          
      </motion.div>
    </div>
  );
};

export default HostelPromoCard;