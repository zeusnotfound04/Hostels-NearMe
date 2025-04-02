"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Filter, MapPin, Star, Wifi, Coffee, Sun, Moon, DollarSign, Users } from 'lucide-react';
import BlurText from '../ui/blurtext';

const HostelPromoCard = () => {
  const [activeSection, setActiveSection] = useState('delivery');
  const [animationInProgress, setAnimationInProgress] = useState(false);
  
  // Toggle between main sections
  useEffect(() => {
    const interval = setInterval(() => {
      if (!animationInProgress) {
        setAnimationInProgress(true);
        setActiveSection(prev => prev === 'delivery' ? 'filters' : 'delivery');
        setTimeout(() => setAnimationInProgress(false), 700);
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [animationInProgress]);

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
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
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

  // All filters for animation
  const filters = [
    { icon: <MapPin size={22} />, label: "Location", color: "#FF5252" },
    { icon: <Star size={22} />, label: "Rating", color: "#FFD740" },
    { icon: <Wifi size={22} />, label: "Amenities", color: "#448AFF" },
    { icon: <Coffee size={22} />, label: "Breakfast", color: "#8D6E63" },
    { icon: <Sun size={22} />, label: "Atmosphere", color: "#FF6D00" },
    { icon: <Moon size={22} />, label: "Private Rooms", color: "#7C4DFF" },
    { icon: <DollarSign size={22} />, label: "Price Range", color: "#00C853" },
    { icon: <Users size={22} />, label: "Group Size", color: "#00B8D4" }
  ];

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
  className="text-2xl mb-8"
/>
            <motion.span 
              className="ml-2 inline-block origin-center"
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{ 
                duration: 1.2, 
                repeat: Infinity, 
                repeatDelay: 8 
              }}
            >
              
            </motion.span>
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
          {/* Left Column */}
          <div className="w-full md:w-1/2 pr-0 md:pr-8">
            <AnimatePresence mode="wait">
              {activeSection === 'delivery' ? (
                <motion.div
                  key="delivery-section"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
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
                      15
                    </motion.span>
                    <motion.span 
                      className="text-4xl ml-3 font-bold text-gray-600"
                      variants={filterItemVariants}
                      custom={3}
                    >
                      minutes
                    </motion.span>
                  </motion.div>
                  
                  <motion.p 
                    className="text-gray-600 text-lg text-center mb-8"
                    variants={filterItemVariants}
                    custom={4}
                  >
                    Search, filter, and book your perfect stay faster than ever
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  key="filters-section"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={containerVariants}
                  className="h-full flex flex-col justify-center"
                >
                  <motion.div 
                    className="mb-6 flex items-center"
                    variants={filterItemVariants}
                    custom={0}
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
                  
                  <motion.div 
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
                    variants={containerVariants}
                  >
                    {filters.map((filter, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={filterItemVariants}
                        className="flex flex-col items-center justify-center p-4 rounded-xl"
                        style={{ 
                          backgroundColor: `${filter.color}10`,
                          border: `1px solid ${filter.color}30` 
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: `${filter.color}20`,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <motion.div
                          className="p-2 rounded-full mb-2"
                          style={{ backgroundColor: `${filter.color}20` }}
                          whileHover={{
                            rotate: [0, 10, -10, 0],
                            transition: { duration: 0.5 }
                          }}
                        >
                          <div style={{ color: filter.color }}>
                            {filter.icon}
                          </div>
                        </motion.div>
                        <span className="text-sm font-medium text-gray-700 text-center">
                          {filter.label}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Right Column - Hostel Image */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 flex items-center justify-center">
            <motion.div 
              className="rounded-2xl overflow-hidden shadow-lg relative"
              style={{ width: "90%", height: "320px" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ 
                  backgroundImage: `url("/api/placeholder/600/320")`
                }}
              ></div>
              
              {/* Image Overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <motion.h3 
                  className="text-xl font-bold text-white mb-1"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  Find your ideal hostel
                </motion.h3>
                <motion.div 
                  className="flex items-center mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-white text-sm ml-2">5.0 (2,504 reviews)</span>
                </motion.div>
              </motion.div>
            </motion.div>
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
              {activeSection === 'delivery' ? 'Quick Booking' : 'Smart Filtering'}
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
        <motion.div 
          className="h-1 bg-gray-200 relative"
        >
          <motion.div 
            className="absolute top-0 left-0 h-full"
            style={{ backgroundColor: colors.accent }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HostelPromoCard;