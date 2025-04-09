"use client"

import React, { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building, Home, Key, CheckCircle, MapPin, Star, Users, Coffee, Wifi, Shield, BookOpen } from "lucide-react"
import { useMobile } from "@/hooks/useMobile"

export default function HostelAnimation() {
  const isMobile = useMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Animation steps for the listing process
  const steps = [
    { 
      icon: <Building className="h-6 w-6" />, 
      text: "List your property",
      delay: 0 
    },
    { 
      icon: <MapPin className="h-6 w-6" />, 
      text: "Share your location", 
      delay: 0.4 
    },
    { 
      icon: <Star className="h-6 w-6" />, 
      text: "Showcase amenities", 
      delay: 0.8 
    },
    { 
      icon: <Key className="h-6 w-6" />, 
      text: "Welcome guests", 
      delay: 1.2 
    },
    { 
      icon: <CheckCircle className="h-6 w-6" />, 
      text: "Get bookings", 
      delay: 1.6 
    }
  ]

  // Amenity bubbles that will float around
  const amenities = [
    { icon: <Wifi className="h-4 w-4" />, text: "WiFi", color: "bg-blue-100 text-blue-600" },
    { icon: <Coffee className="h-4 w-4" />, text: "Mess", color: "bg-amber-100 text-amber-600" },
    { icon: <Users className="h-4 w-4" />, text: "Roommates", color: "bg-green-100 text-green-600" },
    { icon: <Shield className="h-4 w-4" />, text: "Security", color: "bg-purple-100 text-purple-600" },
    { icon: <BookOpen className="h-4 w-4" />, text: "Study", color: "bg-rose-100 text-rose-600" }
  ]

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-background via-primary/5 to-primary/10">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent rounded-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.2, 0.8], 
          opacity: [0, 0.3, 0] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="grid grid-cols-6 grid-rows-6 gap-4 h-full w-full p-4">
            {Array(36).fill(0).map((_, i) => (
              <div 
                key={i} 
                className="border border-primary/20 rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating amenity bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {amenities.map((amenity, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full px-3 py-1.5 shadow-sm flex items-center gap-1.5 text-xs font-medium ${amenity.color}`}
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${50 + (i % 3) * 10}%`,
            }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              x: [0, i % 2 === 0 ? 15 : -15, 0]
            }}
            transition={{
              delay: 1 + (i * 0.2),
              opacity: { duration: 0.6 },
              y: { duration: 1.5, ease: "easeOut" },
              x: { 
                duration: 4 + i, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            {amenity.icon}
            <span>{amenity.text}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 md:px-8 py-10">
        {/* Section title with underline */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-2xl font-medium text-center text-primary mb-8"
        >
          <span className="relative">
            Your Hostel on Our Platform
            <motion.span 
              className="absolute -bottom-1 left-0 h-0.5 bg-primary/60 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </span>
        </motion.h2>
        
        {/* Multi building group - central building with smaller buildings on sides */}
        <div className="relative mb-8 flex items-end justify-center space-x-2 md:space-x-4">
          {/* Left building */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 0.7, scale: 0.7, y: 10 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative mt-auto"
          >
            <div className="w-14 h-20 md:w-16 md:h-24 bg-gradient-to-b from-primary/50 to-primary/30 rounded-lg shadow-md">
              <div className="absolute inset-1.5 grid grid-cols-2 grid-rows-4 gap-px">
                {Array(8).fill(0).map((_, i) => (
                  <div key={i} className="bg-white/20 rounded-sm" />
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Main central building */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-24 h-32 md:w-32 md:h-40 bg-gradient-to-b from-primary/80 to-primary/50 rounded-lg shadow-lg">
              <div className="absolute inset-2 grid grid-cols-3 grid-rows-4 gap-1">
                {Array(12).fill(0).map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="bg-white/25 rounded-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + (i * 0.05) }}
                  />
                ))}
              </div>
              
              {/* Building entrance */}
              <motion.div 
                className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-6 h-8 md:w-8 md:h-10 bg-primary/40 rounded-t-lg"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              />
              
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.4, type: "spring" }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
              >
                <Home className="h-8 w-8 text-primary drop-shadow-lg" />
              </motion.div>
            </div>

            {/* Reflection */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="w-24 h-8 md:w-32 md:h-10 mt-2 bg-gradient-to-b from-primary/20 to-transparent rounded-lg blur-sm transform scale-x-100 scale-y-50" 
            />
          </motion.div>
          
          {/* Right building */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 0.7, scale: 0.8, y: 5 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="relative mt-auto"
          >
            <div className="w-16 h-24 md:w-20 md:h-28 bg-gradient-to-b from-primary/60 to-primary/40 rounded-lg shadow-md">
              <div className="absolute inset-1.5 grid grid-cols-2 grid-rows-4 gap-px">
                {Array(8).fill(0).map((_, i) => (
                  <div key={i} className="bg-white/20 rounded-sm" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Circular map pin with pulse */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute bottom-[40%] md:bottom-[35%] w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-md z-10"
        >
          <MapPin className="h-6 w-6 text-primary" />
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        {/* Process steps */}
        <div className="w-full max-w-xs md:max-w-sm mt-8">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-lg md:text-xl font-medium mb-6 text-primary"
          >
            Simple Listing Process
          </motion.h3>
          
          <div className="relative">
            {/* Timeline line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute left-3 top-3 bottom-3 w-0.5 bg-primary/30 origin-top"
            />
            
            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: step.delay, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <motion.div 
                    className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-sm"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.3)" }}
                  >
                    {step.icon}
                  </motion.div>
                  <span className="text-sm md:text-base">{step.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      

      {/* Floating particles */}
      {Array(8).fill(0).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/30"
          style={{
            left: `${10 + (Math.random() * 80)}%`,
            top: `${10 + (Math.random() * 60)}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0],
            y: [0, -40],
            x: [0, Math.random() > 0.5 ? 20 : -20]
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

