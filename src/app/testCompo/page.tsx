"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useProfile } from "@/hooks/useProfile"
import ProfileForm from "./ProfileForm"
import AvatarUploader from "./AvatarUploader"
import Particles from "./Particles"

export default function ProfilePage() {
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  
  const { 
    profile, 
    isLoading: isLoadingProfile, 
  } = useProfile()

  useEffect(() => {
    const handleScroll = () => {
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0
        if (isVisible) {
          controls.start({ opacity: 1, y: 0 })
        }
      }
    }

    // Initial check
    handleScroll()
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [controls])

  // Show loading state while profile is being fetched
  if (isLoadingProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#902920]" />
      </div>
    )
  }

  const handleSuccess = () => {
    setShowSuccessAnimation(true)
    setTimeout(() => {
      setShowSuccessAnimation(false)
    }, 2000)
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full px-4 py-8 sm:py-10">
      <div className="w-full max-w-4xl relative overflow-x-hidden bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-4 sm:p-6 md:p-8">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#902920] to-transparent opacity-10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#902920] to-transparent opacity-10 rounded-full blur-3xl -z-10"
          style={{ animationDuration: "8s" }}
        />

        <Particles count={6} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            bounce: 0.3,
          }}
          className="relative text-center sm:text-left"
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#902920]">Profile</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your profile information and how others see you.</p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ originX: 0 }}
        >
          <Separator className="my-4 sm:my-6 bg-gradient-to-r from-[#902920] to-transparent" />
        </motion.div>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-[1fr_250px]">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <ProfileForm 
              profile={profile} 
              onSuccess={handleSuccess} 
              showSuccessAnimation={showSuccessAnimation} 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              type: "spring",
              stiffness: 100,
            }}
            className="order-first lg:order-last mb-6 lg:mb-0"
          >
            <AvatarUploader profile={profile} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}