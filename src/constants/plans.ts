export const plans = [
  {
    id: "1",
    title: "Free",
    isActive: true,
    isFree: true,
    isDaily: true,
    price: 0,
    yearlyPrice: 0,
    creditsAmount: 30,
    description: "Reset every day at 0:00 UTC, non-accumulative.",
    features: [
      {
        id: "11",
        title: "Access to all basic functions",
        description: "",
      },
      {
        id: "12",
        title: "Limited batch running",
        description:
          "Only batch runs the first 10 rows of data from the spreadsheet per time.",
      },
      {
        id: "13",
        title: "Only 1 image per generation",
        description: "",
      },
      {
        id: "14",
        title: "Supports GPT-3.5, GPT-4, Claude Instant, Claude-2, etc.",
        description: "",
      },
    ],
  },
  {
    id: "2",
    title: "Basic",
    isActive: false,
    isFree: false,
    isDaily: false,
    price: 12.9,
    yearlyPrice: 9.9,
    creditsAmount: 9000,
    description:
      "Credits added immediately on upgrade and monthly after. Credits reset at the end of each billing cycle.",
    features: [
      {
        id: "21",
        title: "Unlimited batch running",
        description: "",
      },
      {
        id: "22",
        title: "Up to 8 images per generation",
        description: "",
      },
      {
        id: "22",
        title: "Dedicated Client Service",
        description: "",
      },
    ],
  },
  {
    id: "3",
    title: "Pro",
    isActive: false,
    isFree: false,
    isDaily: false,
    price: 24.9,
    yearlyPrice: 19.9,
    creditsAmount: 19000,
    description:
      "Credits added immediately on upgrade and monthly after. Credits reset at the end of each billing cycle",
    features: [
      {
        id: "31",
        title: "Unlimited batch running",
        description: "",
      },
      {
        id: "32",
        title: "Up to 8 images per generation",
        description: "",
      },
      {
        id: "33",
        title: "Dedicated Client Service",
        description: "",
      },
    ],
  },
  {
    id: "4",
    title: "Premium",
    isActive: false,
    isFree: false,
    isDaily: false,
    price: 45.9,
    yearlyPrice: 39.9,
    creditsAmount: 39000,
    description:
      "Credits added immediately on upgrade and monthly after. Credits reset at the end of each billing cycle",
    features: [
      {
        id: "41",
        title: "Unlimited batch running",
        description: "",
      },
      {
        id: "42",
        title: "Up to 8 images per generation",
        description: "",
      },
      {
        id: "43",
        title: "Dedicated Client Service",
        description: "",
      },
    ],
  },
];
