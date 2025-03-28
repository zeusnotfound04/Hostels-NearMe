"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FemaleIcon, LocationIcon, MaleIcon } from "@/components/ui/icon";
import { Input } from "@/components/ui/aceinput";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner"
import { Check, Phone, User } from "lucide-react";
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios";
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from "framer-motion";



type BookingFormProps = {
  hostelId : string;
  hostelName : string;
  price: number;
  gender: "BOYS" | "GIRLS";
};

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phoneNumber: z.string().min(10, "Valid phone number required"),
    address: z.string().min(1, "Address is required"),
    userGender: z.string().min(1, "Please select your gender"),
    terms: z.boolean().refine(val => val === true, {
      message: "You must accept the terms and conditions"
  }),
});


import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';



export default function BookingForm({ hostelId, hostelName, price }: BookingFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      address: '',
      userGender: '',
      terms: false  
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const bookingData = { hostelId, hostelName, ...values }
      console.log("Booking Data", bookingData)

      const response = await axios.post("/api/bookings", bookingData);
      
      if (response.status === 201) {
        // Show the success animation instead of toast
        setShowSuccess(true);
        console.log("BOOKING CREATED SUCCESSFULLY::::::::::::::")
        console.log("Booking Response:", response.data);
        
        // Reset form after some delay
        setTimeout(() => {
          form.reset();
          setShowSuccess(false);
        }, 5000);
      } else {
        toast.error("Failed to create booking. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 p-6">
          <CardTitle className="font-black text-white text-3xl flex items-center justify-between">
            <span>Booking Details</span>
            <span className="text-white bg-white/20 py-1 px-3 rounded-lg text-2xl">
              ₹{price.toLocaleString()}/-
            </span>
          </CardTitle>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="p-6 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          className="h-12 pl-10 bg-gray-50 rounded-lg border border-gray-200 focus:border-red-500 focus:ring focus:ring-red-200 transition-all"
                          placeholder="Full Name"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          <User className="w-5 h-5" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          className="h-12 pl-20 bg-gray-50 rounded-lg border border-gray-200 focus:border-red-500 focus:ring focus:ring-red-200 transition-all"
                          placeholder="Mobile Number"
                          type="tel"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center text-gray-700">
                          <Phone className="w-4 h-4 mr-1" />
                          <span className="font-medium">+91</span>
                        </div>
                        <Separator
                          orientation="vertical"
                          className="absolute left-16 top-3 h-6"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          className="h-12 pl-10 bg-gray-50 rounded-lg border border-gray-200 focus:border-red-500 focus:ring focus:ring-red-200 transition-all"
                          placeholder="Address"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          <LocationIcon className="w-5 h-5" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userGender"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium text-gray-700">Select Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 flex-1 hover:bg-gray-100 transition-all cursor-pointer">
                          <RadioGroupItem value="MALE" id="male" />
                          <Label htmlFor="male" className="flex items-center text-sm font-medium cursor-pointer">
                            <svg className="w-4 h-4 mr-2 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="10" r="7" />
                              <line x1="12" y1="17" x2="12" y2="22" />
                              <line x1="9" y1="20" x2="15" y2="20" />
                            </svg>
                            Male
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 flex-1 hover:bg-gray-100 transition-all cursor-pointer">
                          <RadioGroupItem value="FEMALE" id="female" />
                          <Label htmlFor="female" className="flex items-center text-sm font-medium cursor-pointer">
                            <svg className="w-4 h-4 mr-2 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="10" r="7" />
                              <line x1="12" y1="17" x2="12" y2="22" />
                              <line x1="8" y1="22" x2="16" y2="22" />
                            </svg>
                            Female
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-gray-600">
                        I have read and agree to the{" "}
                        <span className="font-bold text-gray-800 hover:text-red-600 transition-colors cursor-pointer">terms and conditions</span> and{" "}
                        <span className="font-bold text-gray-800 hover:text-red-600 transition-colors cursor-pointer">privacy policy</span> and hereby
                        confirm to proceed.
                      </FormLabel>
                      <FormMessage className="text-xs text-red-500" />
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            
            <CardFooter className="px-6 pb-6 pt-2">
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 rounded-lg h-14 transition-all shadow-lg shadow-red-600/30"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="font-black text-white text-xl">Processing...</span>
                ) : (
                  <span className="font-black text-white text-xl">Book Now</span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            className="absolute inset-0 bg-white flex flex-col items-center justify-center rounded-xl shadow-lg z-10 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Background elements (animated circles) */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial="hidden"
              animate="visible"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-red-600/10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1 + i*0.4], 
                    opacity: [0, 0.8, 0] 
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  style={{ 
                    width: '300px', 
                    height: '300px',
                  }}
                />
              ))}
            </motion.div>
            
            {/* Checkmark */}
            <motion.div 
              className="bg-red-600 rounded-full p-4 mb-6 shadow-xl shadow-red-600/30"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.2 
              }}
            >
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Check className="w-12 h-12 text-white" strokeWidth={3} />
              </motion.div>
            </motion.div>
            
            {/* Success text */}
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Booking Confirmed!
            </motion.h2>
            
            <motion.div
              className="text-center max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <p className="text-gray-600 mb-4">
                Your booking at {hostelName} has been successfully created.
              </p>
              <p className="text-red-600 font-medium">
                We'll contact you soon with more details.
              </p>
            </motion.div>
            
            {/* Confetti effect */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4'][Math.floor(Math.random() * 5)]
                }}
                initial={{ 
                  top: '-10%', 
                  opacity: 1,
                  scale: 0
                }}
                animate={{ 
                  top: `${100 + Math.random() * 50}%`,
                  opacity: [1, 1, 0],
                  scale: [0, 1, 0.5],
                  x: (Math.random() - 0.5) * 200
                }}
                transition={{ 
                  duration: 2 + Math.random() * 3,
                  delay: Math.random() * 0.5,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}