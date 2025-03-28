"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import gsap from "gsap"
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
    hostelName : z.string().min(2 , {message : "Hostel Name must be at least 2 characters."}),
    state: z.string(),
    city: z.string(),
    address : z.string().min(2, { message: "Name must be at least 2 characters." }),
    message: z.string().optional(),
})


export default function ListRequest(){
    const isMobile = useMobile()
    const formContainerRef = useRef<HTMLDivElement>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
  

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        ownerName: "",
        contactEmail : "",
        contactPhone : "",
        hostelName: "",
        state : "",
        city : "",
        address : "",
        message : "",

      },
    })

    useEffect(() => {
      if (formContainerRef.current) {
        gsap.from(formContainerRef.current.querySelectorAll(".animate-in"), {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        })
      }
    }, [])
  
  async function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      const response = await axios.post("/api/listRequest", values);
      console.log(response);        
      toast.success("Request submitted successfully");
      router.push("/");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }
    return (
        <div className="flex flex-col min-h-screen lg:flex-row">
        <div
          ref={formContainerRef}
          className={cn("w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 lg:p-12", "bg-background")}
        >
          <Card className="w-full max-w-md shadow-lg animate-in">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Hostel Request</CardTitle>
              <CardDescription>Fill out the form below to request a hostel booking.</CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Request Submitted!</h3>
                  <p className="text-muted-foreground">
                    We've received your hostel request and will get back to you soon.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="ownerName"
                      render={({ field }) => (
                        <FormItem className="animate-in">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                placeholder="Enter your name"
                                className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
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
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem className="animate-in">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                placeholder="Enter your email"
                                className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
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
                        <FormItem className="animate-in">
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                placeholder="Enter your phone number"
                                className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
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
                        <FormItem className="animate-in">
                          <FormLabel>Hostel Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                placeholder="Enter your Hostel Name"
                                className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
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
                      name="city"
                      render={({ field }) => (
                        <FormItem className="animate-in">
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                placeholder="Enter your city"
                                className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
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
                        <FormItem className="animate-in">
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                placeholder="Enter your State Name"
                                className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
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
                      name="address"
                      render={({ field }) => (
                        <FormItem className="animate-in">
                          <FormLabel>Hostel Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                placeholder="Enter your Hostel Address"
                                className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
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
                        <FormItem className="animate-in">
                          <FormLabel>Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any specific requirements or preferences?"
                              className="min-h-[100px] resize-none transition-all focus:ring-2 focus:ring-primary/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full animate-in transition-all hover:shadow-lg">
                      Submit Request
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
  
        
        <div
          className={cn(
            "w-full lg:w-1/2 bg-gradient-to-br from-primary/5 to-primary/20",
            "flex items-center justify-center",
            isMobile ? "h-[400px]" : "min-h-screen",
          )}
        >
          <HostelAnimation />
        </div>
      </div>
    )
}