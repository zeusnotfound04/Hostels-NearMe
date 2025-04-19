/* eslint-disable react/no-unescaped-entities */


"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload } from "@/components/ui/acefileupload";
import * as z from "zod";
import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Save, Check, ChevronsUpDown, PencilIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { BlogFormProps } from "@/types";
import { useLocations } from "@/hooks/useLocations";


const formSchema = z.object({
  title: z.string(),
  content: z.string(),
  city: z.string(),
  stateId: z.string(), // Added stateId field
  image: z.any(), // Changed from z.instanceof(File).optional() to z.any()
  existingImage: z.string()
})

type FormValues = z.infer<typeof formSchema>;

export default function BlogForm({ blogId, initialData }: BlogFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const isEditMode = !!blogId;
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Get dynamic locations from the API
  const { states: dbStates, cities: dbCities, loading: locationsLoading, error: locationsError } = useLocations();
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      city: initialData?.city || '',
      stateId: '', // Initialize stateId
      image: undefined,
      existingImage: initialData?.image || "",
    },
  });

  async function onSubmit(values: FormValues) {
    console.log("Form Submission Values:", values);

    if (!session?.user) {
      toast({
        variant: "destructive",
        description: "Please log in to create a Blog",
      });
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      let imageUrl: string = values.existingImage || "";

      if (values.image) {
        const formData = new FormData();
        formData.append('imageType', "blog");
        formData.append("files", values.image);
        const uploadResponse = await axios.post("/api/imageUpload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = uploadResponse.data.fileUrls[0];
      }
      
      // Find the city name from the city ID
      const selectedCity = citiesForSelectedState.find(city => city.value === values.city);
      const cityName = selectedCity?.label || '';
      
      const blogData = {
        title: values.title,
        content: values.content,
        city: cityName, // Use the city name
        image: imageUrl
      };

      console.log("Blog Data to Submit:", blogData);

      if (isEditMode && blogId) {
        console.log(`Updating blog with ID: ${blogId}`);
        const response = await axios.patch(`/api/blogs/${blogId}`, blogData);
        console.log("Update Response:", response.data);

        toast({
          variant: "success",
          description: "Blog Updated Successfully! 🎉🎉",
        });
      } else {
        const response = await axios.post("/api/blogs", blogData);
        console.log("Create Response:", response.data);

        toast({
          variant: "success",
          description: "Blog Created Successfully! 🎉🎉",
        });
      }

      router.push("/admin/blogs");
    } catch (error) {
      console.error("Full Error Object:", error);

      if (axios.isAxiosError(error)) {
        console.error("Axios Error Response:", error.response?.data);
        toast({
          variant: "destructive",
          description: error.response?.data?.message || "Error creating/updating blog. Please try again.",
        });
      } else {
        toast({
          variant: "destructive",
          description: "An unexpected error occurred. Please try again.",
        });
      }
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Blog Title "
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter your Blog Title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Welcome to Govindam Residency, your home away from home!"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add a Blog Content.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-x-4">
              <FormField
                control={form.control}
                name="stateId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>State</FormLabel>
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
                              ? dbStates.find((state) => state.value === field.value)
                                ?.label
                              : "Select state"}
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
                                    form.setValue("stateId", state.value);
                                    setSelectedStateId(state.value);
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
                      Select the state as per the blog's actual location.
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
                              ? citiesForSelectedState.find((city) => city.value === field.value)
                                ?.label
                              : "Select city"}
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
                      Select the city as per the blog's actual location.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Images</FormLabel>
                  <FormControl>
                    <FileUpload

                      onChange={(files) => {
                        // Only update if there's a file and it's different from the current one
                        const singleFile = files && files.length > 0 ? files[0] : null;
                        // Only update if the file has changed (either added or removed)
                        const currentFile = field.value;
                        if ((!currentFile && singleFile) || 
                            (currentFile && !singleFile) || 
                            (currentFile?.name !== singleFile?.name)) {
                          field.onChange(singleFile);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    {isEditMode
                      ? "Leave empty to keep existing images, or upload new ones to replace them."
                      : "You can upload up to 1 image. Supported formats: PNG."}
                  </FormDescription>
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">
                      {form.getValues("existingImage")?.length
                        ? `Existing images: ${form.getValues("existingImage").length}`
                        : "No existing images"}
                    </p>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    Update Blog
                  </>
                ) : (
                  <>
                    <PencilIcon className="mr-2 h-4 w-4" />
                    Create Blog
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
