"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Filter } from 'lucide-react';
import BlurText from '../ui/blurtext';
import { Cover } from '../ui/cover';
import Stack from '../ui/stack';
import {RotatingText} from '../ui/roatingtext';
import GradientText from '../ui/animations/GradientText';

const images = [
  { id: 1, img: "https://content.jdmagicbox.com/comp/ghaziabad/w4/011pxx11.xx11.191217190807.e5w4/catalogue/rpn-boy-s-hostel-dasna-ghaziabad-hostels-adyayiouqi.jpg" },
  { id: 2, img: "https://bgiedu.in/wp-content/uploads/2024/07/hostl-min-scaled.jpg" },
  { id: 3, img: "https://grdedu.in/wp-content/gallery/grd-imt-hostel/Hostel-1-2-e1629272260929.jpg" },
  { id: 4, img: "https://snit.edu.in/wp-content/uploads/2022/12/IMG_9036-1024x646.jpg" }
];

const HostelPromoCard = () => {
  // Client-side flag to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  // Color palette based on the primary brand color
  const colors = {
    primary: '#902920',
    light: '#f8f0ee',
    secondary: '#d68e84',
    dark: '#5a1a14',
    accent: '#ffb74d',
    gradient:"linear-gradient(135deg, #902920 0%, #c0392b 40%, #ff6f61 100%)"
  };

  // Screen size detection
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Responsive card dimensions based on screen size
  const [cardDimensions, setCardDimensions] = useState({ 
    width: 450, 
    height: 400 
  });
  
  // Update dimensions on resize and component mount
  useEffect(() => {
    setIsMounted(true);
    
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
      
      if (width < 640) {
        // Mobile dimensions
        setCardDimensions({
          width: Math.min(width * 0.6, 260),
          height: Math.min(width * 0.4, 160)
        });
      } else if (width < 1024) {
        // Tablet dimensions
        setCardDimensions({
          width: Math.min(width * 0.4, 350),
          height: Math.min(width * 0.3, 220)
        });
      } else {
        // Desktop dimensions - increased height
        setCardDimensions({
          width: 450,
          height: 400
        });
      }
    };
    
    // Initial check
    if (typeof window !== 'undefined') {
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkScreenSize);
      }
    };
  }, []);

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
    visible: (custom: number) => ({
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

  const getResponsiveSize = (mobile: number, tablet: number, desktop: number) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  const minCardHeight = isMounted ? 
    (isMobile ? "400px" : isTablet ? "550px" : "750px") : 
    "650px";

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <motion.div 
        className="w-full sm:w-11/12 md:w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden relative"
        style={{ 
          maxWidth: "1400px", 
          minHeight: minCardHeight 
        }}
        variants={cardVariants}
        initial="initial"
        animate={isMounted ? "animate" : "initial"}
        layoutId="hostels-card"
      >
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/4 sm:w-1/3 h-full opacity-10 pointer-events-none">
          <motion.div
            className="absolute top-5 sm:top-10 right-5 sm:right-10 rounded-full"
            style={{ 
              backgroundColor: colors.primary, 
              width: getResponsiveSize(60, 80, 120), 
              height: getResponsiveSize(60, 80, 120) 
            }}
            animate={isMounted ? {
              scale: [1, 1.05, 1],
              opacity: [0.4, 0.7, 0.4],
            } : {}}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 sm:bottom-20 right-20 sm:right-40 rounded-full"
            style={{ 
              backgroundColor: colors.secondary, 
              width: getResponsiveSize(40, 60, 80), 
              height: getResponsiveSize(40, 60, 80) 
            }}
            animate={isMounted ? {
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            } : {}}
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
          className="p-3 sm:p-6 md:p-8 lg:p-10 flex justify-between items-center"
          style={{ 
            background: colors.gradient,
            minHeight: isMobile ? "60px" : "auto"
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={isMounted ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={isMounted ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <BlurText
              text="Find Your Perfect Hostel 🌍"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-lg sm:text-xl md:text-2xl lg:text-4xl mb-1 sm:mb-2 md:mb-8"
            />
          </motion.div>
          
          <motion.div 
            className="flex space-x-1 sm:space-x-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isMounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div 
              className="h-2 w-2 sm:h-3 sm:w-3 md:h-5 md:w-5 rounded-full bg-white opacity-60"
              whileHover={{ scale: 1.2 }}
            ></motion.div>
            <motion.div 
              className="h-2 w-2 sm:h-3 sm:w-3 md:h-5 md:w-5 rounded-full bg-white"
              whileHover={{ scale: 1.2 }}
            ></motion.div>
            <motion.div 
              className="h-2 w-2 sm:h-3 sm:w-3 md:h-5 md:w-5 rounded-full bg-white opacity-60"
              whileHover={{ scale: 1.2 }}
            ></motion.div>
          </motion.div>
        </motion.div>
        
        {/* Main Content */}
        <div className="p-3 sm:p-4 md:p-6 lg:p-10 flex flex-col md:flex-row h-full">
          {/* Left Column - Now contains merged content */}
          <div className="w-full md:w-1/2 pr-0 md:pr-4 lg:pr-8">
            <motion.div
              initial="hidden"
              animate={isMounted ? "visible" : "hidden"}
              variants={containerVariants}
              className="h-full flex flex-col justify-center"
            >
              <motion.div 
                className="mb-2 sm:mb-4 md:mb-6"
                variants={filterItemVariants}
                custom={0}
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mr-0 sm:mr-16 text-gray-700 font-bold mb-1">
                  We guarantee
                </h3>
                <div className="flex items-center">
                  <motion.div 
                    className="relative"
                    variants={circleVariants}
                  >
                    <div 
                      className="p-2 sm:p-3 md:p-4 rounded-full relative z-10"
                      style={{ backgroundColor: `${colors.primary}15` }}
                    >
                      <Clock 
                        size={isMobile ? 18 : isTablet ? 24 : 30}
                        className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] md:w-[30px] md:h-[30px]"
                        color={colors.primary} 
                        strokeWidth={2}
                      />
                    </div>
                    <motion.div
                      className="absolute top-0 left-0 w-full h-full rounded-full"
                      style={{ backgroundColor: `${colors.primary}10` }}
                      animate={isMounted ? {
                        scale: [1, 1.4, 1],
                        opacity: [0.7, 0, 0.7]
                      } : {}}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 0.5
                      }}
                    />
                  </motion.div>
                  <div className="ml-2 sm:ml-4 md:ml-6">
                    <motion.h2 
                      className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold"
                      variants={filterItemVariants}
                      custom={1}
                    >
                      Hostels delivered to you
                    </motion.h2>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-center mb-2 sm:mb-4 md:mb-8"
                variants={numberVariants}
              >
                <motion.span 
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black"
                  style={{ color: colors.primary }}
                  animate={isMounted ? {
                    scale: [1, 1.05, 1],
                    textShadow: [
                      "0 0 0px rgba(144, 41, 32, 0.3)",
                      "0 0 20px rgba(144, 41, 32, 0.5)",
                      "0 0 0px rgba(144, 41, 32, 0.3)"
                    ]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <Cover>15 minutes</Cover> 
                </motion.span>
              </motion.div>
              
              {isMounted && (
                <GradientText
                  colors={[ "#902920", "#F7C59F  ", "#2A324B ", "#E1D89F ", "#6A0572 "]}
                  animationSpeed={3}
                  showBorder={false}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center mb-2 sm:mb-4 md:mb-8"
                >
                  Search, filter, and book your perfect stay faster than ever
                </GradientText>
              )}
              {!isMounted && (
                <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center mb-2 sm:mb-4 md:mb-8">
                  Search, filter, and book your perfect stay faster than ever
                </div>
              )}

              {/* Merged "Extensive Filter Options" section */}
              <motion.div 
                className="mt-2 sm:mt-4 md:mt-8 flex items-center"
                variants={filterItemVariants}
                custom={5}
              >
                <motion.div 
                  animate={isMounted ? {
                    rotate: [0, 10, -10, 10, 0]
                  } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    repeat: 1
                  }}
                >
                  <Filter 
                    size={isMobile ? 20 : isTablet ? 28 : 36}
                    className="w-[20px] h-[20px] sm:w-[28px] sm:h-[28px] md:w-[36px] md:h-[36px] mr-2 sm:mr-3 md:mr-4" 
                    color={colors.primary}
                    strokeWidth={2}
                  />
                </motion.div>
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800">
                    Extensive Filter Options
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">Find exactly what you need</p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Search by and Rotating Text in the same line */}
            <div className="flex items-center flex-wrap space-x-1 sm:space-x-2 mr-1 sm:mr-2 md:mr-10 mt-2 sm:mt-4">
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800">Search by</span>
              {isMounted ? (
                <RotatingText
                  texts={['Gender', 'Accommodation type', 'Facility type', 'Sharing type', 'Sort', 'Nearby Coaching']}
                  mainClassName="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary"
                  animationClassName="text-accent"
                  rotationInterval={3000}
                  auto={true}
                />
              ) : (
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary">Gender</span>
              )}
            </div>
          </div>
             
          {/* Right Column - Hostel Image */}
          <div className="w-full md:w-1/2 mt-4 md:mt-0 flex flex-col items-center justify-center">
            <div className="w-full flex justify-center">
              <Stack
                randomRotation={isMounted}
                sensitivity={180}
                sendToBackOnClick={false}
                cardDimensions={cardDimensions}
                cardsData={images}
              />
            </div>
            {/* Add your text below the stack images */}
            <h1 className="mt-2 sm:mt-4 text-base sm:text-xl md:text-2xl text-gray-700 font-extrabold text-center">
              Find your ideal hostel
            </h1>
          </div>
        </div>
        
        {/* Footer */}
        <motion.div 
          className="px-3 sm:px-6 md:px-10 py-2 sm:py-4 md:py-6 flex justify-between items-center"
          initial={{ y: 50, opacity: 0 }}
          animate={isMounted ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Pulsing Indicator */}
          <motion.div className="flex items-center">
            <motion.div
              className="h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-3 md:w-3 rounded-full mr-1 sm:mr-2"
              style={{ backgroundColor: colors.accent }}
              animate={isMounted ? {
                scale: [1, 1.2, 1],
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            />
            <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">
              Quick Booking
            </span>
          </motion.div>
          
          {/* CTA Button */}
          <motion.button
            className="px-2 sm:px-4 md:px-8 py-1.5 sm:py-2 md:py-3 rounded-full font-semibold text-white text-xs sm:text-sm md:text-base"
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
      </motion.div>
    </div>
  );
};

export default HostelPromoCard;