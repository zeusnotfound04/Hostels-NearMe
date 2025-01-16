import * as z from "zod";

export const facilityLabels: Record<string, string> = {
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
  gym: "Gym",
  allDayWarden: "24x7 Warden",
  airconditioner: "Air Conditioner",
};

export const hostelFormSchema = z.object({
  name: z.string().min(3, { message: "Hostel Name must be at least 3 characters long" }),
  about: z.string().min(10, { message: "About section must be at least 10 characters long" }),
  price: z.number().min(0).max(10000),
  hostelType: z.enum(["SINGLE", "SHARED", "DORMITORY"]),
  location: z.string().min(3),
  latitude: z.number().optional().refine(val => val === undefined || (val >= -90 && val <= 90)),
  longitude: z.number().optional().refine(val => val === undefined || (val >= -180 && val <= 180)),
  address: z.string().min(5),
  houseRules: z.array(z.string()).min(1),
  images: z.array(
    z.instanceof(File).refine(file => file.size > 0, { message: "File cannot be empty" })
  ).nonempty("At least one file is required"),
  gender: z.enum(["BOYS", "GIRLS"]),
  isAvailable: z.boolean(),
  // Facilities
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

export type HostelFormValues = z.infer<typeof hostelFormSchema>;



















