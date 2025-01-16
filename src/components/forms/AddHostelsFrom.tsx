"use client"
import * as z from "zod"
import { Hostel } from "@prisma/client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { FileUpload } from "../ui/acefileupload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import useLocation from "@/hooks/useLocation";
import { useState, useEffect } from "react";
import { ICity, IState } from "country-state-city";
import { Loader2, Pencil, PencilLine } from "lucide-react";

interface AddHostelFormProps {
  hostel: Hostel
}

const houseRulesLabels : Record<string , string> = {
  isNonVeg : "Non-Veg Allowed",
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

  state: z
    .string()
    .min(1, {
      message: "Please select a state",
    }),

  city: z
    .string()
    .min(1, {
      message: "Please select a city",
    }),

  location: z
    .string()
    .min(3, {
      message: "Location must be at least 3 characters long",
    }),

  address: z
    .string()
    .min(5, {
      message: "Address must be at least 5 characters long",
    }),

  images: z
    .array(
      z.instanceof(File).refine((file) => file.size > 0, {
        message: "File cannot be empty",
      })
    )
    .nonempty("At least one file is required"),

  gender: z.enum(["BOYS", "GIRLS"], {
    errorMap: () => ({
      message: "Gender selection is required",
    }),
  }),

  isAvailable: z.boolean(),
  isNonVeg : z.boolean(),
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

export const AddHostelForm = ({ hostel }: AddHostelFormProps) => {
  
  const [files, setFiles] = useState<FileList | null>(null);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getCountryStates, getStateCities } = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues :  {
      name: "",
      about:  "",
      price:  0,
      hostelType:  "SINGLE", // Default to "SINGLE" if not provided
      location:  "",
      address:  "",
      images: [],
      gender: "BOYS", 
      isNonVeg: false,
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
  });

  useEffect(() => {
    const fetchStates = async () => {
      setIsLoading(true);
      try {
        const allStates = await getCountryStates();
        setStates(allStates);
      } catch (error) {
        console.error('Error fetching states:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStates();
  }, []);

  // Watch for state changes and fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      const selectedState = form.getValues("state");
      if (!selectedState) {
        setCities([]);
        return;
      }

      setIsLoading(true);
      try {
        const allCities = await getStateCities(selectedState);
        setCities(allCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCities([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [form.watch("state")]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
}

function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        console.log("Form values:", values);
    } catch (error) {
      console.error('Error submitting form:', error);
      
    }
  }
    return <div>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-lg font-bold">
              {hostel ? "Update your Hostel" : "Add the New Hostel"}
            </h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-6">
                {/* Hostel Name Field */}
                      <FormField
                        control={form.control}
                        name="name"
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

                      {/* About Hostel Field */}
                      <FormField
                        control={form.control}
                        name="about"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>About Hostel</FormLabel>
                            <FormDescription>Add a description about your Hostel.</FormDescription>
                            <FormControl>
                              <Textarea
                                placeholder="Welcome to Govindam Residency, your home away from home! Nestled in a peaceful yet vibrant location, our hostel offers a comfortable and relaxing stay for travelers and students alike."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Facilities Checkbox */}
                          <div>
                            <FormLabel>Choose Facility</FormLabel>
                            <FormDescription>Choose the Facility Carefully.</FormDescription>
                              <div className="grid grid-cols-2 gap-4 mt-2">
                                  {Object.entries(facilityLabels).map(([fieldName, label]) => (
                                          <FormField
                                            key={fieldName}
                                            control={form.control}
                                            name={fieldName}
                                            render={({ field }) => (
                                              <FormItem className="flex flex-row items-center space-x-3">
                                                <FormControl>
                                                  <Checkbox
                                                    checked={!!field.value}
                                                    onCheckedChange={field.onChange}
                                                  />
                                                </FormControl>
                                                <FormLabel>{label}</FormLabel>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        ))}
                                </div>
                          </div>

                          <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Upload the Image</FormLabel>
                         
                            <FormControl>
                              <Input
                                type="file"
                                name="images"
                                accept="image/*"
                                onChange={handleChange}
                                
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />


                </div>
          
              <div className="flex-1 flex flex-col gap-6">
                    {/* Price */}
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hostel's Price</FormLabel>
                            <FormDescription>Enter the price per month.</FormDescription>
                            <FormControl>
                              <Input
                                placeholder="7,000"
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />


                        {/* Gender for Hostel */}
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Choose the hostel's gender</FormLabel>
                              <FormDescription>
                                Specify whether the hostel is for boys or girls.
                              </FormDescription>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue
                                    defaultValue={field.value}
                                    placeholder="Select Hostel's Gender"
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="BOYS">Boys</SelectItem>
                                <SelectItem value="GIRLS">Girls</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                 {/* Hostel Type Field */}
                  <FormField
                    control={form.control}
                    name="hostelType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Hostel's Sharing type</FormLabel>
                        <FormDescription>
                          Choose the sharing type of the hostel.
                        </FormDescription>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Hostel type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SINGLE">Single</SelectItem>
                            <SelectItem value="SHARED">Shared</SelectItem>
                            <SelectItem value="DORMITORY">Dormitory</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                {/* State and City Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select State</FormLabel>
                          <FormDescription>
                            Select the state as per the hostel's actual location.
                          </FormDescription>
                          <Select
                            disabled={isLoading}
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Select State"
                              />
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

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select City</FormLabel>
                          <FormDescription>
                            Select the city as per the hostel's actual location.
                          </FormDescription>
                          <Select
                            
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Select City"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {cities.map((city) => (
                                <SelectItem key={city.name} value={city.name}>
                                  {city.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                    {/* House Rules */}
                    <div>
                        <FormLabel>Choose House Rules</FormLabel>
                        <FormDescription>Choose the House Rules Carefully.</FormDescription>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {Object.entries(houseRulesLabels).map(([fieldName, label]) => (
                            <FormField
                              key={fieldName}
                              control={form.control}
                              name={fieldName}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3">
                                  <FormControl>
                                    <Checkbox
                                      checked={!!field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel>{label}</FormLabel>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                </div>
                <div>
                      <div className="flex justify-between gap-2 flex-wrap">
                                  <Button type="submit" className="w-full md:w-auto">
                                <Pencil className="mr-2 h-4 w-4" />Create Hostel
                </Button>

              </div>
                </div>

            </div>
          </div>
          
        </form>
        </Form>

    </div>
 }