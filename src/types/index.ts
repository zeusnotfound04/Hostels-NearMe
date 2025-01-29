import { Hostel } from '@/types/';
import { facilityLabels, houseRulesLabels } from "@/constants/label";
import { HostelType , HostelGender } from "@prisma/client";


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


  

export interface Hostel {
  id: string;
  name: string;
  price: number;
  hostelType: HostelType;
  gender: HostelGender;
  state: string;
  city: string;
  address: string;
  about: string;
  images: string[];
  isAvailable: boolean;
  isNonVeg: boolean;
  Almirah: boolean;
  attachedWashroom: boolean;
  cctv: boolean;
  chair: boolean;
  cooler: boolean;
  inverterBackup: boolean;
  parking: boolean;
  biweeklycleaning: boolean;
  allDayElectricity: boolean;
  generator: boolean;
  geyser: boolean;
  indoorGames: boolean;
  pillow: boolean;
  waterByRO: boolean;
  securityGuard: boolean;
  table: boolean;
  wiFi: boolean;
  foodIncluded: boolean;
  bed: boolean;
  vegetarienMess: boolean;
  allDayWaterSupply: boolean;
  gym: boolean;
  allDayWarden: boolean;
  airconditioner: boolean;
  createdAt: Date;
  updatedAt: Date;
}



export interface EditHostelPageProps {
  params: {
    hostelId: string;
  };
}


export interface TestingProps{
  params : {
    hostelId : string
    hostelName? : string 
  }
}


export interface HostelFormProps {
  hostelId?: string;
  initialData?: any;
}


export interface BookingDetailsPageProps {
  params: {
    bookingId: string;
  };
}