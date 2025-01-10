"use client"
import * as z from "zod"
import { Hostel } from "@prisma/client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { FileUpload } from "./ui/acefileupload";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"

import useLocation from "@/hooks/useLocation";
import { useState , useEffect} from "react";
import { ICity, IState } from "country-state-city";



interface AddHostelFormProps{
    hostel : Hostel
}

const facilityLabels: Record<string, string> = {
    Almirah: "Almirah",
    attachedWashroom: "Attached Washroom",
    cctv: "CCTV Surveillance",
    chair: "Chair",
    cooler: "Cooler",
    inverterBackup: "Inverter Backup",
    parking: "Parking Facility",
    biweeklycleaning: "Rooms cleaned twice a week",
    allDayElectricity: "24x7 Electricity",
    generator: "Generator Backup",
    geyser: "Geyser",
    indoorGames: "Indoor Games",
    pillow: "Pillow",
    waterByRO: "RO Water",
    securityGuard: "Security Guard",
    table: "Table",
    wiFi: "Wi-Fi",
    foodIncluded: "Food Included",
    bed: "Bed",
    vegetarienMess: "Vegetarian Mess",
    allDayWaterSupply: "24x7 Water Supply",
    allDayWarden: "24x7 Warden",
    airconditioner: "Air Conditioner",
  };

const formSchema = z.object({
    name: z
      .string()
      .min(3, {
        message: "Hostel Name must be at least 3 characters long",
      }),
  
    about: z
      .string()
      .min(10, {
        message: "About section must be at least 10 characters long",
      }),
  
    price: z
      .number()
      .min(0, {
        message: "Price must be a positive number",
      })
      .max(10000, {
        message: "Price cannot be more than 10000",
      }),
  
    hostelType: z.enum(["SINGLE", "SHARED", "DORMITORY"], {
      errorMap: () => ({
        message: "Hostel Type is required",
      }),
    }),
  
    location: z
      .string()
      .min(3, {
        message: "Location must be at least 3 characters long",
      }),
  
    latitude: z
      .number()
      .optional()
      .refine((val) => val === undefined || (val >= -90 && val <= 90), {
        message: "Latitude must be between -90 and 90",
      }),
  
    longitude: z
      .number()
      .optional()
      .refine((val) => val === undefined || (val >= -180 && val <= 180), {
        message: "Longitude must be between -180 and 180",
      }),
  
    address: z
      .string()
      .min(5, {
        message: "Address must be at least 5 characters long",
      }),
  
    houseRules: z
      .array(z.string())
      .min(1, {
        message: "At least one house rule must be provided",
      }),
  
    images: z
      .array(z.string())
      .min(1, {
        message: "At least one image URL is required",
      }),
  
    gender: z.enum(["BOYS", "GIRLS"], {
      errorMap: () => ({
        message: "Gender selection is required",
      }),
    }),
  
    isAvailable: z.boolean(),
  
    Almirah: z.boolean(),
    attachedWashroom: z.boolean(),
    cctv: z.boolean(),
    chair: z.boolean(),
    cooler: z.boolean(),
    inverterBackup: z.boolean(),
    parking: z.boolean(),
    biweeklycleaning: z.boolean(),
    allDayElectricity: z.boolean(),
    generator: z.boolean(),
    geyser: z.boolean(),
    indoorGames: z.boolean(),
    pillow: z.boolean(),
    waterByRO: z.boolean(),
    securityGuard: z.boolean(),
    table: z.boolean(),
    wiFi: z.boolean(),
    foodIncluded: z.boolean(),
    bed: z.boolean(),
    vegetarienMess: z.boolean(),
    allDayWaterSupply: z.boolean(),
    gym: z.boolean(),
    allDayWarden: z.boolean(),
    airconditioner: z.boolean(),
  });


export const AddHostelForm = ({hostel}:AddHostelFormProps) =>{
      const [states, setStates] = useState<IState[]>([]); 
      const [cities, setCities] = useState<ICity[]>([]); // Default as empty array
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const { getCountryStates, getStateCities } = useLocation();

      useEffect(() => {
        const fetchStates = async () => {
          setIsLoading(true);
          try {
            const allStates = await getCountryStates(); // Assuming this is async
            setStates(allStates);
          } catch (error) {
            console.error('Error fetching states:', error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchStates();
      }, []);
      

      const handleStateChange = (stateCode: string) => {
        setIsLoading(true);
        const allCities = getStateCities(stateCode); // Get cities based on selected state
        setCities(allCities);
        setIsLoading(false);
      };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
                name: "",
                about:  "",
                price:  0,
                hostelType:  "SINGLE", // Default to "SINGLE" if not provided
                location:  "",
                latitude: undefined,
                longitude: undefined,
                address:  "",
                houseRules: [],
                images: [],
                gender: "BOYS", 
                isAvailable: true, // Default to true if not provided
                Almirah: false,
                attachedWashroom: false,
                cctv: false,
                chair:  false,
                cooler:  false,
                inverterBackup:  false,
                parking:  false,
                biweeklycleaning:  false,
                allDayElectricity:  false,
                generator:  false,
                geyser:  false,
                indoorGames: false,
                pillow: false,
                waterByRO:  false,
                securityGuard: false,
                table: false,
                wiFi: false,
                foodIncluded: false,
                bed:  false,
                vegetarienMess: false,
                allDayWaterSupply:  false,
                gym:  false,
                allDayWarden: false,
                airconditioner: false,
              
            }
    })


    function onSubmit(values : z.infer<typeof formSchema>){
        // We will define later
    }
    return <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-6">
                <h3 className="text-lg font-bold">
                    {hostel ? "Update your Hostel" : "Add the New Hostel"}
                </h3>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name ="hostelName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hostel Name</FormLabel>
                                        <FormDescription>Enter your Hostel Name.</FormDescription>
                                            <FormControl>
                                                <Input placeholder="Govindam Residency" {...field} />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name ="aboutHostel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>About Hostel</FormLabel>
                                        <FormDescription>Add Desciption about your Hostel </FormDescription>
                                            <FormControl>
                                                <Textarea placeholder="Welcome to Govindam Residency, your home away from home! Nestled in a peaceful yet vibrant location, our hostel offers a comfortable and relaxing stay for travelers and students alike." {...field} />
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <FormLabel>Choose Facility</FormLabel>
                                <FormDescription>Choose the Facility Carefully</FormDescription>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                {Object.entries(facilityLabels).map(([fieldName, label]) => (
                                    <FormField
                                        key={fieldName}
                                        control={form.control}
                                        name={fieldName}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <FormLabel>{label}</FormLabel>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                            </div>
                            <div className="border-dashed border-2 border-black-600">
                              <FileUpload/>
                            </div>
                          
                    </div>
                      <div className="flex-1 flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Select State</FormLabel>
                                <FormDescription>Select the state as per the hostel actual location</FormDescription>
                                <Select
                                  disabled={isLoading}
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue defaultValue={field.value} placeholder="Select State" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {states.map((state) => (
                                      <SelectItem key={state.isoCode} value={state.isoCode}>
                                        {state.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        <FormField control={form.control} name="city" render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Select City</FormLabel>
                                  <FormDescription>Select the city as per the hostel actual location</FormDescription>
                                  <Select
                                    disabled={isLoading || cities.length === 0} // Disable if no cities loaded
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue defaultValue={field.value} placeholder="Select City" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {cities.map((city) => (
                                        <SelectItem key={city.isoCode} value={city.isoCode}>
                                          {city.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )} />
                          </div>
                    </div>
                </div>
                
            </form>
        </Form>
    </div>
}

