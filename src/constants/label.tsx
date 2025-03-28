  import {
    ArrowDown,
    ArrowRight,
    ArrowUp,
    CheckCircle,
    Circle,
    CircleOff,
    HelpCircle,
    Timer,
  } from "lucide-react"
import { 
  AirConditionerIcon, 
  FemaleIcon, 
  LocationIcon, 
  MaleIcon, 
  ParkingIcon, 
  VegetarianMessIcon, 
  WashroomIcon,
  AlmirahIcon,
  CCTVIcon,
  ChairIcon,
  CoolerIcon,
  InvertorIcon,
  CleaningIcon,
  ElectricityIcon,
  GeneratorIcon,
  GeyserIcon,
  IndoorGamesIcon,
  PillowIcon,
  ROWaterIcon,
  SecurityGuardIcon,
  TableIcon,
  WifiIcon,
  FoodIcon,
  BedIcon,
  WaterSupply,
  GymIcon,
  WardenIcon
} from "@/components/ui/icon";



  
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
    allDayWarden: "24x7 Warden",
    airconditioner: "Air Conditioner",
  };
  
  export const houseRulesLabels: Record<string, string> = {
    isNonVeg: "Non-Veg Allowed",
  };
  


  export const amenityGroups = {
    basicFurniture: {
      title: 'Basic Furniture',
      items: ['bed', 'pillow', 'table', 'chair', 'Almirah']
    },
    facilities: {
      title: 'Facilities',
      items: ['attachedWashroom', 'parking', 'gym', 'indoorGames']
    },
    services: {
      title: 'Services',
      items: ['biweeklycleaning', 'securityGuard', 'allDayWarden']
    },
    comfort: {
      title: 'Comfort & Utilities',
      items: ['wiFi', 'airconditioner', 'cooler', 'geyser']
    },
    power: {
      title: 'Power & Water',
      items: ['allDayElectricity', 'inverterBackup', 'generator', 'waterByRO', 'allDayWaterSupply']
    },
    food: {
      title: 'Food & Dining',
      items: ['foodIncluded', 'vegetarienMess', 'isNonVeg']
    },
    security: {
      title: 'Security',
      items: ['cctv']
    }
  };
  

  export const customAmenityTexts: Record<string, string> = {
    bed: "Comfortable Beds for Rest",
    pillow: "Soft Pillows for Comfort",
    table: "Study Tables for Focus",
    chair: "Ergonomic Chairs for Support",
    Almirah: "Spacious Almirahs for Storage",
    attachedWashroom: "Private Washrooms for Convenience",
    parking: "Secure Parking for Vehicles",
    gym: "Fully Equipped Gym for Fitness",
    indoorGames: "Indoor Games for Leisure",
    biweeklycleaning: "Regular Cleaning for Hygiene",
    securityGuard: "24/7 Security for Safety",
    allDayWarden: "On-Site Warden for Assistance",
    wiFi: "High-Speed WiFi for Access",
    airconditioner: "Cool, Air-Conditioned Rooms",
    cooler: "Room Coolers for Comfort",
    geyser: "Hot Water Geysers for Convenience",
    allDayElectricity: "Nonstop Electricity, Always Available",
    inverterBackup: "Power Backup for Reliability",
    generator: "Generator Backup for Emergencies",
    waterByRO: "RO-Purified Water for Safety",
    allDayWaterSupply: "24/7 Water Supply",
    foodIncluded: "Delicious Meals Provided",
    vegetarienMess: "Healthy Vegetarian Meals",
    isNonVeg: "Tasty Non-Veg Options",
    cctv: "CCTV Surveillance for Security",
  };
  



  
  export const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
  export const statuses = [
    {
      value: "backlog",
      label: "Backlog",
      icon: HelpCircle,
    },
    {
      value: "todo",
      label: "Todo",
      icon: Circle,
    },
    {
      value: "in progress",
      label: "In Progress",
      icon: Timer,
    },
    {
      value: "done",
      label: "Done",
      icon: CheckCircle,
    },
    {
      value: "canceled",
      label: "Canceled",
      icon: CircleOff,
    },
  ]
  
  export const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDown,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRight,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUp,
    },
  ]



  export const facilityIcons = [
    { property: "wiFi", icon: <WifiIcon className="w-6 h-6" />, name: "Free Wi-fi" },
    { property: "attachedWashroom", icon: <WashroomIcon className="w-6 h-6" />, name: "Attached Washroom" },
    { property: "airconditioner", icon: <AirConditionerIcon className="w-6 h-6" />, name: "AC Rooms" },
    { property: "parking", icon: <ParkingIcon className="w-6 h-6" />, name: "Bicycle Parking" },
    { property: "Almirah", icon: <AlmirahIcon className="w-6 h-6" />, name: "Almirah" },
    { property: "cctv", icon: <CCTVIcon className="w-6 h-6" />, name: "CCTV" },
    { property: "chair", icon: <ChairIcon className="w-6 h-6" />, name: "Chair" },
    { property: "cooler", icon: <CoolerIcon className="w-6 h-6" />, name: "Cooler" },
    { property: "inverterBackup", icon: <InvertorIcon className="w-6 h-6" />, name: "Inverter Backup" },
    { property: "biweeklycleaning", icon: <CleaningIcon className="w-6 h-6" />, name: "Biweekly Cleaning" },
    { property: "allDayElectricity", icon: <ElectricityIcon className="w-6 h-6" />, name: "24/7 Electricity" },
    { property: "generator", icon: <GeneratorIcon className="w-6 h-6" />, name: "Generator" },
    { property: "geyser", icon: <GeyserIcon className="w-6 h-6" />, name: "Geyser" },
    { property: "indoorGames", icon: <IndoorGamesIcon className="w-6 h-6" />, name: "Indoor Games" },
    { property: "pillow", icon: <PillowIcon className="w-6 h-6" />, name: "Pillow" },
    { property: "waterByRO", icon: <ROWaterIcon className="w-6 h-6" />, name: "RO Water" },
    { property: "securityGuard", icon: <SecurityGuardIcon className="w-6 h-6" />, name: "Security Guard" },
    { property: "table", icon: <TableIcon className="w-6 h-6" />, name: "Table" },
    { property: "foodIncluded", icon: <FoodIcon height={24} width={24} className="w-6 h-6" />, name: "Food Included" },
    { property: "bed", icon: <BedIcon className="w-6 h-6" />, name: "Bed" },
    { property: "allDayWaterSupply", icon: <WaterSupply className="w-6 h-6" />, name: "24/7 Water Supply" },
    { property: "gym", icon: <GymIcon className="w-6 h-6" />, name: "Gym" },
    { property: "allDayWarden", icon: <WardenIcon className="w-6 h-6" />, name: "24/7 Warden" },
  ];