"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FemaleIcon, LocationIcon, MaleIcon } from "@/components/ui/icon";
import { Input } from "@/components/ui/aceinput";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner"
import { Phone, User } from "lucide-react";
import { IconAddressBook } from "@tabler/icons-react";
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"



type BookingFormProps = {
  hostelId : string;
  hostelName : string;
  price: number;
  gender: "BOYS" | "GIRLS";
};

const formSchema = z.object({
    name: z.string(),
    phoneNumber: z.string(),
    address: z.string(),
    userGender: z.string(),
    terms: z.boolean(),

});
import axios from "axios";
import React, { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Separator } from '@/components/ui/separator';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Phone } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';


import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';



export default function BookingForm({ hostelId , hostelName,   price }: BookingFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      address: '',
      userGender: undefined,
      terms: false
    }
  });

  async function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
        const bookingData = { hostelId, hostelName ,  ...values, } 
        console.log("Booking Data" , bookingData)

        const response = await axios.post("/api/bookings", bookingData);

        
        if (response.status === 201) {
          toast.success("Booking created successfully!");
          console.log("BOOKING CREATED SUCCESSFULLY::::::::::::::")
          console.log("Booking Response:", response.data);
        } else {
          toast.error("Failed to create booking. Please try again.");
        }
      
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
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
            >
              <span className="font-black text-white text-xl">
                Book Now
              </span>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}