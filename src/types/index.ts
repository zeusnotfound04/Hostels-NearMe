import { facilityLabels, houseRulesLabels } from "@/constants/label";



export type FormSchema = {
    name: string;
    about: string;
    price: number;
    hostelType: "SINGLE" | "SHARED" | "DORMITORY";
    state: string;
    city: string;
    address: string;
    images: File[]; // Adjust based on your file handling logic
    gender: "BOYS" | "GIRLS";
    isAvailable: boolean;
    isNonVeg: boolean;
  } & Record<keyof typeof facilityLabels, boolean> // Dynamically add facilities
    & Record<keyof typeof houseRulesLabels, boolean>; // Dynamically add house rules