
import { facilityLabels, houseRulesLabels } from "@/constants/label";
import { HostelType, HostelGender } from "@prisma/client";

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
} & Record<keyof typeof facilityLabels, boolean> & // Dynamically add facilities
  Record<keyof typeof houseRulesLabels, boolean>; // Dynamically add house rules

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

export interface Booking {
  id: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
  lastUpdatedAt: string;
  referenceId: string;
  notes?: string;
  hostelName?: string;
  username?: string;
  userGender?: string;
  phoneNumber?: string;
  address?: string;

  hostel: {
    id: string;
    name: string;
    address: string;
  };
  user: {
    id?: string;
    username?: string;
    userGender?: string;
    email?: string;

    phoneNumber?: string;
    address?: string;
  };
}

export interface Blog{
  id : string ;
  title : string;
  content : string;
  image : string;
  city: string;
  createdAt : Date;
  updatedAt : Date; 
}

export interface blogData{
  title: string;
  content : string;
  city : string;
  image : string;

}

export interface ParentHostelPageProps {
  params: {
    hostelId: string;
  };
}

export interface ParentBlogPageProps {
  params: {
    blogId: string;
  };
}

export interface TestingProps {
  params: {
    hostelId: string;
    hostelName?: string;
  };
}

export interface HostelFormProps {
  hostelId?: string;
  initialData?: Hostel;
}

export interface BlogFormProps{
  blogId? : string;
  initialData?: Blog ;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  city: string;
  image: string;
}

export interface BlogListProps {
  blogs: Blog[];
}



export interface BookingDetailsPageProps {
  params: {
    bookingId: string;
  };
}


export interface BookingDetails {
  id: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
  lastUpdatedAt: string;
  referenceId: string;
  notes?: string;
  hostelName?: string;
  username?: string;
  userGender?: string;
  phoneNumber?: string;
  address?: string;

  hostel: {
    id: string;
    name: string;
    address: string;
    airconditioner?: boolean;
    allDayElectricity?: boolean;
    allDayWarden?: boolean;
    allDayWaterSupply?: boolean;
    attachedWashroom?: boolean;
    bed?: boolean;
    cctv?: boolean;
    foodIncluded?: boolean;
    generator?: boolean;
    geyser?: boolean;
    gym?: boolean;
    wiFi?: boolean;
    hostelType?: string;
    gender?: string;
    price?: string;
    city?: string;
    state?: string;
  };
  user: {
    id?: string;
    username?: string;
    userGender?: string;
    email?: string;
    role?: string;
    phoneNumber?: string;
    address?: string;
  };
}




export type AdminInsights = {
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalUsers: number;
  newUsersThisMonth: number;
  activeHostelsCount: number;
  bookingConversionRate: number;
  cancellationRate: number;
  avgBookingsPerUser: number;
};


export interface FilterState {
  search : string;
  type : string;
  city : string;
  priceRange : {
    min : string;
    max : string;
  },
  page : number;
}


export interface HostelState {
  data: Hostel[];
  totalPages: number;
  loading: boolean;
  error: string | null;
}

export interface DeleteDialogState {
  isOpen: boolean;
  hostel: Hostel | null;
}


export interface HostelPageProps{
  hostelId?: string;
  hostel : Hostel
}



export interface FetchHostelParams {
  page: number;
  limit?: number;
  search?: string;
  city?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string; 
  sortOrder?: "asc" | "desc"; 
}

export interface HostelResponse {
  hostels: Hostel[];
  pagination: {
      totalPages: number;
      currentPage: number;
      totalItems: number;
  };
}