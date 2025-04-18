/* eslint-disable react/no-unescaped-entities */

"use client";
import { useState , useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload } from "@/components/ui/acefileupload";
import * as z from "zod";
import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover";
import { Save,  Check, ChevronsUpDown, PencilIcon, Loader2 } from "lucide-react";
import { facilityLabels , houseRulesLabels } from "@/constants/label";
import { Checkbox } from "@/components/ui/checkbox";
import { hostelGenders , sharingtypes } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { HostelFormProps } from "@/types";
import { MultiSelect } from "@/components/ui/multi-select";
import AdminLoadingScreen from "../loading/AdminLoader";
import { useLocations } from "@/hooks/useLocations";
import { useCoachings } from "@/hooks/useCoachings";

type AdditionalFormFields = {
  [key: string]: boolean;
};


const formSchema = z.object({
  name: z.string(),
  about: z.string(),
  price: z.preprocess(
    (val) => (val !== "" ? Number(val) : undefined),
    z.number().min(1).max(10000)
  ),
  gender: z.string(),
  state: z.string(),
  city: z.string(),
  hostelType: z.string(),
  address: z.string(),
  images: z.any().optional().default([]), // Changed from z.instanceof(File) to z.any()
  nearByCoaching: z.array(z.string()).optional().default([]),
  existingImages: z.array(z.string()).optional().default([]),
  ...Object.keys(facilityLabels).reduce((acc, key) => {
    acc[key] = z.boolean();
    return acc;
  }, {} as Record<string, z.ZodBoolean>),
  ...Object.keys(houseRulesLabels).reduce((acc, key) => {
    acc[key] = z.boolean();
    return acc;
  }, {} as Record<string, z.ZodBoolean>)
});

type FormValues = z.infer<typeof formSchema>;

export default function HostelForm({hostelId  , initialData  }: HostelFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const isEditMode = !!hostelId;
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Get dynamic locations from the API
  const { states: dbStates, cities: dbCities, loading: locationsLoading, citiesLoading, setCityLoadingState } = useLocations();
  const { coachings, loading: coachingsLoading } = useCoachings();
  const [selectedStateId, setSelectedStateId] = useState<string>("");
  const [citiesForSelectedState, setCitiesForSelectedState] = useState<{ label: string; value: string }[]>([]);

  // Effect to update cities based on selected state
  useEffect(() => {
    if (selectedStateId && dbCities[selectedStateId]) {
      setCitiesForSelectedState(dbCities[selectedStateId]);
    } else {
      setCitiesForSelectedState([]);
    }
  }, [selectedStateId, dbCities]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      about: '',
      price: 0,
      gender: '',
      state: '',
      city: '',
      hostelType: '',
      address: '',
      nearByCoaching: [],
      ...Object.keys(facilityLabels).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as AdditionalFormFields),
      ...Object.keys(houseRulesLabels).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as AdditionalFormFields),
      images: [],
      existingImages: [],
    },
  });
  useEffect(() => {
    if (initialData) {
      const formattedData = {
        ...initialData,
        price: Number(initialData.price), 
        images: [],
        existingImages: initialData.images || [],
      };
      form.reset(formattedData);
    }
  }, [initialData, form]);
 
  async function onSubmit(values: FormValues) {
    if (!session?.user) {
      toast({
        variant: "destructive",
        description: "Please log in to create a hostel",
      });
      router.push("/login");
      return;
    }
    
    setLoading(true);
    console.log("Hostel Data  ::::" , values)
    try {
      let imageUrls: string[] = [...(values.existingImages || [])];
      console.log("EXISTING IMAGES :::: " , imageUrls)
      if (values.images && values.images.length > 0) {
        const formData = new FormData();
        formData.append('imageType', "hostel");
      
        values.images.forEach((file: File) => {
          formData.append("files", file);
        });
        console.log("FORM DATA GOING TO IMAGE UPLOAD" , formData)
        const uploadResponse = await axios.post("/api/imageUpload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrls = [...imageUrls, ...uploadResponse.data.fileUrls];
      }
  
      
      const baseHostelData = {
        name: values.name,
        about: values.about,
        price: values.price,
        gender: values.gender,
        state: values.state,
        city: values.city,
        hostelType: values.hostelType,
        address: values.address,
        nearByCoaching : values.nearByCoaching,
        images: imageUrls,
      };
  
      // Add facilities
      const facilities = Object.keys(facilityLabels).reduce((acc, key) => {
        acc[key] = Boolean((values as Record<string, unknown>)[key]);
        return acc;
      }, {} as Record<string, boolean>);
      
      const houseRules = Object.keys(houseRulesLabels).reduce((acc, key) => {
        acc[key] = Boolean((values as Record<string, unknown>)[key]);
        return acc;
      }, {} as Record<string, boolean>);
      
      
      
  

      const hostelData = {
        ...baseHostelData,
        ...facilities,
        ...houseRules
      };
      

      if (isEditMode) {
        await axios.patch(`/api/hostels/${hostelId}`, hostelData);
        toast({
          variant: "success",
          description: "Hostel Updated Successfully! 🎉🎉",
        });
      } else {
        await axios.post("/api/hostels", hostelData);
        toast({
          variant: "success",
          description: "Hostel Created Successfully! 🎉🎉",
        });
      }
      router.push("/admin/hostels");
    } catch (error) {
      console.error("Error creating/updating hostel:", error);
      toast({
        variant: "destructive",
        description: "Error creating/updating hostel. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return <AdminLoadingScreen/>
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <div className="flex flex-col space-x-10 md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hostel Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Govindam Residency "
                                  type="text"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>Enter your Hostel Name.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
            
                      <FormField
                        control={form.control}
                        name="about"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>About Hostel</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Welcome to Govindam Residency, your home away from home!"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Add a description about your Hostel
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                          <FormLabel>Facilities</FormLabel>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            {Object.entries(facilityLabels).map(([key, label]) => (
                              <FormField
                                key={key}
                                control={form.control}
                                name={key as keyof FormValues}    // Typecast to keyof FormValues
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-4">
                                    <FormControl>
                                      <Checkbox
                                        checked={!!field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer">{label}</FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>

                          <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="916, Gali Chandi Wali, Main Bazaar, Rajeev Gandhi Nagar, Kota, Rajasthan"
                                  type="text"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>Enter your Address.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

<FormField
              control={form.control}
              name="nearByCoaching"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add the Near by Coaching</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={coachings}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select options"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                      asChild={true}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose the frameworks you are interested in.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


                  </div>

              <div className="flex-1 flex flex-col gap-6">

                  <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input placeholder="Price" type="number" {...field} />
                          </FormControl>
                          <FormDescription>Enter the price per month</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Choose the hostel's gender</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-[200px] justify-between",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? hostelGenders.find(
                                            (hostelGender) => hostelGender.value === field.value
                                          )?.label
                                        : "Select language"}
                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Search language..." />
                                    <CommandList>
                                      <CommandEmpty>No Gender found.</CommandEmpty>
                                      <CommandGroup>
                                        {hostelGenders.map((hostelGender) => (
                                          <CommandItem
                                            value={hostelGender.label}
                                            key={hostelGender.value}
                                            onSelect={() => {
                                              form.setValue("gender", hostelGender.value);
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                hostelGender.value === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                            {hostelGender.label}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormDescription>
                                Specify whether the hostel is for boys or girls.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-x-4">
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Select State</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                          "w-[200px] justify-between",
                                          !field.value && "text-muted-foreground"
                                        )}
                                        disabled={locationsLoading}
                                      >
                                        {locationsLoading ? (
                                          <div className="flex items-center justify-between w-full">
                                            <span className="text-muted-foreground">Loading states...</span>
                                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                          </div>
                                        ) : field.value ? (
                                          dbStates.find(
                                            (state) => state.value === field.value
                                          )?.label || "Select state"
                                        ) : (
                                          "Select state"
                                        )}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                      <CommandInput placeholder="Search state..." />
                                      <CommandList>
                                        <CommandEmpty>No state found.</CommandEmpty>
                                        <CommandGroup>
                                          {dbStates.map((state) => (
                                            <CommandItem
                                              value={state.label}
                                              key={state.value}
                                              onSelect={() => {
                                                form.setValue("state", state.value);
                                                setSelectedStateId(state.value);
                                                // Clear city when state changes
                                                form.setValue("city", "");
                                              }}
                                            >
                                              <Check
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  state.value === field.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                                )}
                                              />
                                              {state.label}
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                <FormDescription>
                                  Select the state as per the hostel's actual location.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
        

              
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>City</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "w-[200px] justify-between",
                                        !field.value && "text-muted-foreground"
                                      )}
                                      disabled={!selectedStateId || citiesLoading}
                                    >
                                      {citiesLoading && selectedStateId ? (
                                        <div className="flex items-center justify-between w-full">
                                          <span className="text-muted-foreground">Loading cities...</span>
                                          <Loader2 className="h-4 w-4 animate-spin text-primary" /> 
                                        </div>
                                      ) : field.value ? (
                                        citiesForSelectedState.find(
                                          (city) => city.value === field.value
                                        )?.label || "Select city"
                                      ) : (
                                        "Select city"
                                      )}
                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Search city..." />
                                    <CommandList>
                                      <CommandEmpty>No city found.</CommandEmpty>
                                      <CommandGroup>
                                        {citiesForSelectedState.map((city) => (
                                          <CommandItem
                                            value={city.label}
                                            key={city.value}
                                            onSelect={() => {
                                              form.setValue("city", city.value);
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                city.value === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                            {city.label}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormDescription>
                                Select the city as per the hostel's actual location.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                </div>
                <FormField
                  control={form.control}
                  name="hostelType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Select Hostel's Sharing type</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? sharingtypes.find(
                                    (sharingtype) => sharingtype.value === field.value
                                  )?.label
                                : "Select language"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search language..." />
                            <CommandList>
                              <CommandEmpty>No language found.</CommandEmpty>
                              <CommandGroup>
                                {sharingtypes.map((sharingtype) => (
                                  <CommandItem
                                    value={sharingtype.label}
                                    key={sharingtype.value}
                                    onSelect={() => {
                                      form.setValue("hostelType", sharingtype.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        sharingtype.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {sharingtype.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Choose the sharing type of the Hostel
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                    )}
                  />
 <FormField
    control={form.control}
    name="images"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Upload Images</FormLabel>
        <FormControl>
          <FileUpload
            onChange={(files) => {
              // Prevent unnecessary updates if files are the same
              const newFiles = files.slice(0, 4);
              // Only update if the arrays have different lengths
              // or if we're not already processing the same files
              if (!field.value || field.value.length !== newFiles.length) {
                field.onChange(newFiles);
              }
            }}
          />
        </FormControl>
        <FormDescription>
          {isEditMode 
            ? "Leave empty to keep existing images, or upload new ones to replace them."
            : "You can upload up to 4 images. Supported formats: PNG."}
        </FormDescription>
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">
            {form.getValues("existingImages")?.length 
              ? `Existing images: ${form.getValues("existingImages").length}`
              : "No existing images"}
          </p>
        </div>
        <FormMessage />
      </FormItem>
    )}
  />
  


              <FormLabel>House Rules</FormLabel>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {Object.entries(houseRulesLabels).map(([key, label]) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={key as keyof FormValues}    // Typecast to keyof FormValues
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-4">
                        <FormControl>
                          <Checkbox
                            checked={!!field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="cursor-pointer">{label}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="flex justify-between gap-2 flex-wrap">
          <Button 
            className="w-full border-s-black md:w-auto" 
            type="submit" 
            disabled={loading}
          >
            {loading ? (
              "Processing..."
            ) : isEditMode ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Update Hostel
              </>
            ) : (
              <>
                <PencilIcon className="mr-2 h-4 w-4" />
                Create Hostel
              </>
            )}
          </Button>
        </div>
        </div>
      </div>
      </form>
    </Form>
  );
}
