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



export const requiredFields = [
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