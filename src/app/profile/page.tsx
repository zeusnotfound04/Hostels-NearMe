"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Save, Upload, User, Sparkles, CheckCircle2, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { useLocation } from "@/hooks/useLocation"
import { genderOptions } from "@/constants"






interface CityType {
  name: string;
}

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must not be longer than 50 characters.",
    }),
  gender: z.string().min(1, { message: "Please select a gender" }),
  city: z.string().min(1, { message: "Please select a city" }),
  state: z.string().min(1, { message: "Please select a state" }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// Particle effect component
const Particles = ({ count = 10 }: { count?: number }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#902920] opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15],
            x: [0, Math.random() * 30 - 15],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

const AnimatedFormField = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        type: "spring",
        stiffness: 100,
      }}
    >
      {children}
    </motion.div>
  )
}

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
   const [selectedState, setSelectedState] = useState<string>("");
    const [selectedStateCode, setSelectedStateCode] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [availableCities, setAvailableCities] = useState<CityType[]>([]);


  const { states, getCities, loading } = useLocation();

  useEffect(() => {
    if (selectedStateCode) {
      const cities = getCities(selectedStateCode); 
      setAvailableCities(cities);
    } else {
      setAvailableCities([]);
    }
    setSelectedCity("");
  }, [selectedStateCode, getCities]);  // ✅ No infinite loop due to memoization

  const handleStateChange = (value: string) => {
    const selectedStateObj = states.find((state) => state.name === value);
    setSelectedState(value);
    setSelectedStateCode(selectedStateObj ? selectedStateObj.isoCode : "");
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
  };





  // Default values for the form
  const defaultValues: Partial<ProfileFormValues> = {
    username: "johndoe",
    name: "John Doe",
    gender: "Prefer not to say",
    city: "San Francisco",
    state: "California",
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })


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

  function onSubmit(data: ProfileFormValues) {
    setIsSaving(true)

    
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccessAnimation(true)

      setTimeout(() => {
        setShowSuccessAnimation(false)
      }, 2000)

      try {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        })
      } catch (error) {
        console.log("Profile updated successfully")
      }
    }, 1500)

    console.log(data)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string)
        }
        setTimeout(() => {
          setIsUploading(false)
        }, 1000)
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full px-4 py-8 sm:py-10 ">
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8 relative">
                <AnimatedFormField index={0}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#902920] font-semibold">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                            className="border-[#902920]/20 focus:border-[#902920] transition-all duration-300 shadow-sm focus:shadow-md focus:shadow-[#902920]/10"
                          />
                        </FormControl>
                        <FormDescription className="text-xs sm:text-sm">Your full name that will be displayed on your profile.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AnimatedFormField>

                <AnimatedFormField index={1}>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#902920] font-semibold">Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="johndoe"
                            {...field}
                            className="border-[#902920]/20 focus:border-[#902920] transition-all duration-300 shadow-sm focus:shadow-md focus:shadow-[#902920]/10"
                          />
                        </FormControl>
                        <FormDescription className="text-xs sm:text-sm">
                          This is your public display name. It can be your real name or a pseudonym.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AnimatedFormField>

                {/* New Gender Select Field */}
                <AnimatedFormField index={2}>
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#902920] font-semibold">Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-[#902920]/20 focus:border-[#902920] transition-all duration-300 shadow-sm focus:shadow-md focus:shadow-[#902920]/10">
                              <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genderOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs sm:text-sm">How you identify yourself.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AnimatedFormField>

                <AnimatedFormField index={3}>
                  <FormField
                    control={form.control}
                    name="state"
                    disabled={loading}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#902920] font-semibold">State</FormLabel>
                        <Select 
                          onValueChange={handleStateChange} 
                          value={selectedState}>
                            
                          <FormControl>
                            <SelectTrigger className="border-[#902920]/20 focus:border-[#902920] transition-all duration-300 shadow-sm focus:shadow-md focus:shadow-[#902920]/10">
                              <SelectValue placeholder="Select your state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                          {states.map((state) => (
                    <SelectItem key={state.isoCode} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs sm:text-sm">The state you're currently living in.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AnimatedFormField>


                {/* New City Select Field */}
                <AnimatedFormField index={4}>
                  <FormField
                    control={form.control}
                    name="city"
                    disabled={!selectedState || loading}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#902920] font-semibold">City</FormLabel>
                        <Select onValueChange={handleCityChange} defaultValue={selectedCity}>
                          <FormControl>
                            <SelectTrigger className="border-[#902920]/20 focus:border-[#902920] transition-all duration-300 shadow-sm focus:shadow-md focus:shadow-[#902920]/10">
                              <SelectValue placeholder="Select your city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                          {availableCities.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-xs sm:text-sm">The city you're currently living in.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AnimatedFormField>

                {/* New State Select Field */}
                
                <AnimatedFormField index={5}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative">
                    <Button
                      type="submit"
                      className="w-full bg-[#902920] hover:bg-[#7a231c] text-white relative overflow-hidden"
                      disabled={isSaving}
                    >
                      {showSuccessAnimation ? (
                        <div className="flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Saved Successfully!
                        </div>
                      ) : isSaving ? (
                        <div className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving Changes...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </div>
                      )}

                      <div
                        className="absolute inset-0 w-0 h-full bg-white opacity-20"
                        style={{
                          animation: "shine 2s infinite linear",
                        }}
                      />
                    </Button>
                  </motion.div>
                  <style jsx={true}>{`
                    @keyframes shine {
                      0% { width: 0; left: -10%; }
                      100% { width: 120%; left: 100%; }
                    }
                  `}</style>
                </AnimatedFormField>
              </form>
            </Form>
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
            <Card className="border-[#902920]/20 overflow-hidden shadow-lg shadow-[#902920]/5 backdrop-blur-sm bg-white/80">
              <CardHeader className="text-center bg-gradient-to-r from-[#902920]/10 to-transparent">
                <motion.h3
                  className="text-lg font-medium text-[#902920]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Your Avatar
                </motion.h3>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6 p-4 sm:p-6">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    rotate: 5,
                    boxShadow: "0 0 15px rgba(144, 41, 32, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative rounded-full"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#902920] to-[#d85a4f] rounded-full opacity-75 blur-sm" />
                  <div className="relative h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-[#f0f0f0] to-white z-10">
                    {avatar ? (
                      <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center  text-[#902920]/40">
                        <User className="h-16 w-16 sm:h-20 sm:w-20" />
                      </div>
                    )}

                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                        <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 text-white animate-spin" />
                      </div>
                    )}
                  </div>
                </motion.div>

                <div className="w-full">
                  <label htmlFor="avatar-upload">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        variant="outline"
                        className="w-full border-[#902920]/30 text-[#902920] hover:bg-[#902920]/5 hover:text-[#902920] hover:border-[#902920] transition-all duration-300 group"
                        disabled={isUploading}
                        type="button"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {isUploading ? "Uploading..." : "Upload New Avatar"}
                      </Button>
                    </motion.div>
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                    disabled={isUploading}
                  />
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Recommended: Square JPG or PNG at least 500×500px.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}