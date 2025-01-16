"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover";
import { Check, ChevronsUpDown, PencilIcon } from "lucide-react";
import { facilityLabels , houseRulesLabels } from "@/constants/label";
import { Checkbox } from "./ui/checkbox";
import { cities , hostelGenders , states , sharingtypes } from "@/constants";

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
  ...Object.keys(facilityLabels).reduce((acc, key) => {
    acc[key] = z.boolean();
    return acc;
  }, {} as Record<string, z.ZodBoolean>),
  ...Object.keys(houseRulesLabels).reduce((acc, key) => {
    acc[key] = z.boolean();
    return acc;
  }, {} as Record<string, z.ZodBoolean>)
});

export default function AddhostelForm() {
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
    
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
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
                                placeholder="Placeholder"
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
                                name={key}    // Flattened facility key
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
              <Button className="w-full border-s-black md:w-auto" type="submit"> <PencilIcon className="mr-2 h-4 w-4" />Create Hostel</Button>
          </div>
        </div>
      </div>
      </form>
    </Form>
  );
}
