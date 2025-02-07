"use client"

import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/utils/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  PhoneInput
} from "@/components/ui/phone-input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Check,
  ChevronsUpDown
} from "lucide-react"
import {
  Textarea
} from "@/components/ui/textarea"
import { states , cities } from "@/constants"
import axios from "axios"
import { useRouter } from "next/navigation"



const formSchema = z.object({
    ownerName: z.string(),
    contactEmail: z.string(),
    contactPhone: z.string(),
    hostelName: z.string(),
    state: z.string(),
    city: z.string(),
    address : z.string(),
    message: z.string()
});

export default function ListRequestForm() {
    const router = useRouter();

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <FormField
          control={form.control}
          name="ownerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Name</FormLabel>
              <FormControl>
                <Input 
                placeholder="Your Name"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input 
                placeholder="email"
                
                type="email"
                {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
              <FormLabel>Phone number</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    placeholder="XXXXXXXXXX"
                    {...field}
                    defaultCountry="IN"
                  />
                </FormControl>
              <FormDescription>Enter your phone number.</FormDescription>
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
                <Input 
                placeholder="Hostel Name"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-12 gap-4">
          
          <div className="col-span-6">
            <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>States</FormLabel>
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
                      <CommandEmpty>No state found.</CommandEmpty>
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
              <FormDescription>This is the information that will be used for contacting you.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
          <div className="col-span-6">
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
                        ? cities.find(
                            (city) => city.value === field.value
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
                      <CommandEmpty>No city found.</CommandEmpty>
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
              <FormDescription>This is the information that will be used for contacting you.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input 
                placeholder="shadcn"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription>This is the information that will be used for contacting you.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message here"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>You can @mention other users and organizations.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}