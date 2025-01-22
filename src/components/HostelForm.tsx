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
import { Save,  Check, ChevronsUpDown, PencilIcon } from "lucide-react";
import { facilityLabels , houseRulesLabels } from "@/constants/label";
import { Checkbox } from "./ui/checkbox";
import { cities , hostelGenders , states , sharingtypes } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";




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
  // Make images completely optional and allow empty arrays
  images: z.array(z.instanceof(File)).max(4).optional().default([]),
  // Add existing images field
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
interface HostelFormProps {
  hostelId?: string;
  initialData?: any;
}

export default function HostelForm({hostelId  , initialData  }: HostelFormProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isEditMode = !!hostelId;
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...Object.keys(facilityLabels).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as Record<string, boolean>),
      ...Object.keys(houseRulesLabels).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as Record<string, boolean>),
      images: undefined,
      existingImages: [],
    },
  });
  useEffect(() => {
    if (initialData) {
      const formattedData = {
        ...initialData,
        price: initialData.price.toString(),
        images: undefined,
        existingImages: initialData.images || [], // Store existing image URLs
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
  
    try {
      let imageUrls: string[] = [...(values.existingImages || [])];
  
      if (values.images && values.images.length > 0) {
        const formData = new FormData();
        values.images.forEach((file: File) => {
          formData.append("files", file);
        });
  
        const uploadResponse = await axios.post("/api/imageUpload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrls = [...imageUrls, ...uploadResponse.data.fileUrls];
      }
  
      // Create base hostel data
      const baseHostelData = {
        name: values.name,
        about: values.about,
        price: values.price,
        gender: values.gender,
        state: values.state,
        city: values.city,
        hostelType: values.hostelType,
        address: values.address,
        images: imageUrls,
      };
  
      // Add facilities
      const facilities = Object.keys(facilityLabels).reduce((acc, key) => {
        acc[key] = Boolean(values[key as keyof typeof facilityLabels]);
        return acc;
      }, {} as Record<string, boolean>);
  
      // Add house rules
      const houseRules = Object.keys(houseRulesLabels).reduce((acc, key) => {
        acc[key] = Boolean(values[key as keyof typeof houseRulesLabels]);
        return acc;
      }, {} as Record<string, boolean>);
  
      // Combine all data
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
                                name={key}    
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
                                      >
                                        {field.value
                                          ? states.find(
                                              (state) => state.value === field.value
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
                                          {states.map((state) => (
                                            <CommandItem
                                              value={state.label}
                                              key={state.value}
                                              onSelect={() => {
                                                form.setValue("state", state.value);
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
                                    >
                                      {field.value
                                        ? cities.find((city) => city.value === field.value)
                                            ?.label
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
                                        {cities.map((city) => (
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
              const newFiles = field.value ? [...field.value, ...files] : files;
              field.onChange(newFiles.slice(0, 4));
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
  */


              <FormLabel>House Rules</FormLabel>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {Object.entries(houseRulesLabels).map(([key, label]) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={key}
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
