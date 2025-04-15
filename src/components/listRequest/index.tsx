/* eslint-disable react/no-unescaped-entities */
/* eslint-disable  @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Building2, Mail, MapPin, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/acecard"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/aceinput"
import { Textarea } from "@/components/ui/textarea"
import { useMobile } from "@/hooks/useMobile"
import { cn } from "@/utils/utils"
import HostelAnimation from "@/components/listRequest/hostelAnimations"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const formSchema = z.object({
    ownerName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    contactEmail: z.string().email({ message: "Please enter a valid email address." }),
    contactPhone: z.string().min(10, { message: "Please enter a valid phone number." }),
    hostelName: z.string().min(2, { message: "Hostel Name must be at least 2 characters." }),
    state: z.string().min(1, { message: "State is required." }),
    city: z.string().min(1, { message: "City is required." }),
    address: z.string().min(2, { message: "Address must be at least 2 characters." }),
    message: z.string().optional(),
})

export default function ListRequest() {
    const isMobile = useMobile()
    const formContainerRef = useRef<HTMLDivElement>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
  
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        ownerName: "",
        contactEmail: "",
        contactPhone: "",
        hostelName: "",
        state: "",
        city: "",
        address: "",
        message: "",
      },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        const response = await axios.post("/api/listRequest", values)
        setIsSubmitted(true)
        toast.success("Request submitted successfully")
        
        // Redirect after a short delay to show the success message
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } catch (error) {
        console.error("Form submission error", error)
        toast.error("Failed to submit the form. Please try again.")
      }
    }

    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col lg:flex-row min-h-[80vh]">
          {/* Left side - Form */}
          <div
            ref={formContainerRef}
            className={cn(
              "w-full lg:w-1/2 lg:order-1 order-2",
              "flex items-center justify-center p-4 md:p-6",
            )}
          >
            <Card className="w-full max-w-md shadow-md border-primary/10">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-primary">
                  List Your Hostel
                </CardTitle>
                <CardDescription>
                  Fill out the form to register your property on our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Request Submitted!</h3>
                    <p className="text-muted-foreground">
                      We've received your hostel listing request and will get back to you soon.
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                        <FormField
                          control={form.control}
                          name="ownerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="Enter your name"
                                    className="pl-9"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="hostelName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hostel Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="Enter hostel name"
                                    className="pl-9"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                        <FormField
                          control={form.control}
                          name="contactEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="your@email.com"
                                    className="pl-9"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="contactPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="Your phone number"
                                    className="pl-9"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="City"
                                    className="pl-9"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    placeholder="State"
                                    className="pl-9"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Complete address"
                                  className="pl-9"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Details (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any specific details about your property..."
                                className="min-h-24 resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full transition-all text-white"
                      >
                        Submit Listing Request
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right side - Animation */}
          <div
            className={cn(
              "w-full lg:w-1/2 lg:order-2 order-1",
              "bg-white min-h-[40vh] lg:min-h-screen sticky top-0",
            )}
          >
            <HostelAnimation />
          </div>
        </div>
      </div>
    )
}