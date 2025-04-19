/* eslint-disable react/no-unescaped-entities */
/* eslint-disable  @typescript-eslint/no-unused-vars */
"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Save, Upload, User, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { genderOptions } from "@/constants"
import { profileFormSchema } from "./schema"
import { Particles } from "./Particles"
import { AnimatedFormField } from "./Fields"
import { useLocation } from "@/hooks/useLocation"
import axios from "axios"
import Image from "next/image"

type ProfileFormValues = z.infer<typeof profileFormSchema>

export interface ProfileData {
  username: string;
  name: string;
  gender: string | null;
  city: string | null;
  state: string | null;
  id: string;
  role: "USER" | "ADMIN";
  email: string;
  createdAt: Date;
  pfpUrl?: string;
}

interface ProfileProps {
  initialProfile?: ProfileData | { error: string };
}

export default function ProfilePage({ initialProfile }: ProfileProps) {
  const [avatar, setAvatar] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const [selectedStateName, setSelectedStateName] = useState<string>("")
  const [stateCode, setStateCode] = useState<string>("");

  // Use the enhanced location hook with loading states
  const { states, getCities, loading: statesLoading, citiesLoading } = useLocation();
  const [cities, setCities] = useState<Array<{name: string}>>([]);

  // Effect to get cities when stateCode changes
  useEffect(() => {
    if (stateCode) {
      setCities(getCities(stateCode));
    } else {
      setCities([]);
    }
  }, [stateCode, getCities]);

  console.log("INITIAL DATA ::::", initialProfile)

  const defaultValues: Partial<ProfileFormValues> = {
    username: "",
    name: "",
    gender: "",
    city: "",
    state: "",
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  useEffect(() => {
    if (initialProfile && "name" in initialProfile) {
      
      let stateIsoCode = "";
      if (initialProfile.state) {
        
        const stateObj = states.find(s => s.name === initialProfile.state);
        if (stateObj) {
          stateIsoCode = stateObj.isoCode;
          setStateCode(stateIsoCode);
        } else {
          
          setStateCode(initialProfile.state);
        }
        setSelectedStateName(initialProfile.state);
      }

      form.reset({
        name: initialProfile.name || "",
        username: initialProfile.username || "",
        gender: initialProfile.gender || "",
        city: initialProfile.city || "",
        state: initialProfile.state || "",
      });
  
    }
  }, [initialProfile, form, states]);
  
  async function onSubmit(data: ProfileFormValues) {
    setIsUpdating(true);

    try {
      const response = await axios.post('/api/update-profile', data);
      
      if (response.status === 200) {
        setShowSuccessAnimation(true);
        
        setTimeout(() => {
          setShowSuccessAnimation(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleAvatarUpload(file: File) {
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const uploadResponse = await axios.post("/api/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      setAvatar(uploadResponse.data.url);
      toast({
        title: "Success",
        description: "Avatar uploaded successfully!",
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        title: "Error",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleAvatarUpload(file);
    }
  }

  const handleStateChange = (stateIsoCode: string) => {
    setStateCode(stateIsoCode); 
    const stateObj = states.find(s => s.isoCode === stateIsoCode);
    const stateName = stateObj?.name || "";
    setSelectedStateName(stateName); 
    
    form.setValue("state", stateName);
    form.setValue("city", ""); 
  };
  
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
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-center text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#902920] to-[#d85a4f] bg-clip-text text-transparent">
            Update Your Profile
          </h1>
          <p className="text-center mt-2 text-muted-foreground max-w-xl mx-auto">
            Manage your account information, preferences, and personalize your experience.
          </p>
        </motion.div>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-[1fr_250px]">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
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
                            className="border-[#902920]/20 focus:border-[#902920] focus:ring-[#902920]/10"
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
                          Your unique username used across the site. Only alphanumeric characters allowed.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AnimatedFormField>

                <AnimatedFormField index={2}>
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#902920] font-semibold">Gender</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#902920] font-semibold">State</FormLabel>
                        <div className="relative">
                          <Select 
                            onValueChange={handleStateChange}
                            value={stateCode}
                            disabled={statesLoading}
                          >
                            <FormControl>
                              <SelectTrigger className="border-[#902920]/20 focus:border-[#902920] transition-all duration-300 shadow-sm focus:shadow-md focus:shadow-[#902920]/10">
                                {statesLoading ? (
                                  <div className="flex items-center justify-between w-full">
                                    <span className="text-muted-foreground">Loading states...</span>
                                    <Loader2 className="h-4 w-4 animate-spin text-[#902920]" />
                                  </div>
                                ) : (
                                  <SelectValue placeholder="Select your state" />
                                )}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {states.map((state) => (
                                <SelectItem key={state.isoCode} value={state.isoCode}>
                                  {state.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormDescription className="text-xs sm:text-sm">The state you're currently living in.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AnimatedFormField>

                <AnimatedFormField index={4}>
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#902920] font-semibold">City</FormLabel>
                        <div className="relative">
                          <Select 
                            onValueChange={field.onChange} 
                            value={field.value || ""}
                            disabled={!stateCode || citiesLoading}
                          >
                            <FormControl>
                              <SelectTrigger className="border-[#902920]/20 focus:border-[#902920] transition-all duration-300 shadow-sm focus:shadow-md focus:shadow-[#902920]/10">
                                {citiesLoading && stateCode ? (
                                  <div className="flex items-center justify-between w-full">
                                    <span className="text-muted-foreground">Loading cities...</span>
                                    <Loader2 className="h-4 w-4 animate-spin text-[#902920]" /> 
                                  </div>
                                ) : (
                                  <SelectValue placeholder={stateCode ? "Select your city" : "Select a state first"} />
                                )}
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cities.map((city) => (
                                <SelectItem key={city.name} value={city.name}>
                                  {city.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormDescription className="text-xs sm:text-sm">The city you're currently living in.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AnimatedFormField>

                <AnimatedFormField index={5}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative">
                    <Button
                      type="submit"
                      className="w-full bg-[#902920] hover:bg-[#7a231c] text-white relative overflow-hidden"
                      disabled={isUpdating}
                    >
                      {showSuccessAnimation ? (
                        <div className="flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Saved Successfully!
                        </div>
                      ) : isUpdating ? (
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

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#902920] to-[#d85a4f] text-white p-4">
                  <motion.h3 
                    className="text-xl font-bold text-center"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Profile Picture
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
                        <Image src={avatar} alt="Avatar" className="h-full w-full object-cover" width={160} height={160} />
                      ) : initialProfile && 'pfpUrl' in initialProfile && initialProfile.pfpUrl ? (
                        <Image src={initialProfile.pfpUrl as string} alt="Avatar" className="h-full w-full object-cover" width={160} height={160} />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[#902920]/40">
                          <User className="h-16 w-16 sm:h-20 sm:w-20" />
                        </div>
                      )}
                    </div>
                  </motion.div>

                  <div className="w-full">
                    <Button
                      variant="outline"
                      className="w-full border-[#902920]/30 text-[#902920] hover:bg-[#902920]/5 hover:text-[#902920] hover:border-[#902920] transition-all duration-300 group"
                      disabled={isUploading}
                      type="button"
                      onClick={() => document.getElementById('avatar-upload')?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {isUploading ? "Uploading..." : "Upload New Avatar"}
                    </Button>
                    <Input
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
    </div>
  )
}