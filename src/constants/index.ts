export const hostelGenders = [
    {
      label: "Boys",
      value: "BOYS",
    },
    {
      label: "Girls",
      value: "GIRLS",
    },
  ] as const;

export const states = [
    {
      label: "Uttar Pradesh",
      value: "Uttar Pradesh",
    },
    {
      label: "Madhya Pradesh",
      value: "Madhya Pradesh",
    },
  ] as const;
export const cities = [
    {
      label: "Lucknow",
      value: "Lucknow",
    },
    {
      label: "Jhansi",
      value: "Jhansi",
    },
  ] as const;


export const sharingtypes = [
      {
        label: "Single",
        value: "SINGLE",
      },
      {
        label: "Shared",
        value: "SHARED",
      },
      {
        label: "Dormitory",
        value: "DORMITORY",
      },
    ] as const;


export const hostelRequiredFields = [
      'name',
      'about',
      'price',
      'gender',
      'state',
      'city',
      'hostelType',
      'address',
      'images'
    ];
// Require fields to create Blogs :::
export const blogRequiredFields = [
  'title',
  'content',
  'city',
  'image',
];




    export enum BookingStatus {
      PENDING = "PENDING",
      CONFIRMED = "CONFIRMED",
      CANCELLED = "CANCELLED",
    }
    
    export enum Gender {
      MALE = "MALE",
      FEMALE = "FEMALE"
    }
    


    
    export const Coaching = [
      {
        value: "allen",
        label: "ALLEN CAREER OF COACHING",
      },
      {
        value: "PW",
        label: "Physics Wallah",

      },
      {
        value: "akash",
        label: "Akash",
      },
      {
        value: "lakshay",
        label: "Lakshay",
      },
      {
        value: "impact",
        label: "Impact",
      },
    ];    