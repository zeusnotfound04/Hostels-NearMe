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