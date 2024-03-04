export const statuses = [
  {
    value: "en-us",
    label: "English (USA)",
  },
  {
    value: "fr",
    label: "French",
  },
  {
    value: "fa",
    label: "Persian",
  },
  {
    value: "zh",
    label: "Chinese",
  },
] as const;

export const selectValues = {
  creativity: [
    "Auto",

    "Original",
    "Repetitive",
    "Deterministic",
    "Creative",
    "Imaginative",
  ],
  tone: [
    "Auto",

    "Professional",
    "Exciting",
    "Friendly",
    "Witty",
    "Humorous",
    "Convincing",
    "Empathetic",
    "Inspiring",
    "Supportive",
    "Trusting",
    "Playful",
    "Excited",
    "Positive",
    "Negative",
    "Engaging",
    "Worried",
    "Urgent",
    "Passionate",
    "Informative",
    "Funny",
    "Casual",
    "Sarcastic",
    "Dramatic",
  ],
  point: ["Auto", "Default", "First Person", "Second Person", "Third Person"],
} as const;

export const selectValuesDescription = {
  creativity: "form_creativity_description",
  tone: "form_tone_description",
} as const;

export const languages = [
  {
    id: "en",
    value: "English",
    image: "/images/gpt.jpeg",
  },
  {
    id: "pr",
    value: "Persian",
  },
  {
    id: "ar",
    value: "Arabic",
  },
  {
    id: "fr",
    value: "French",
  },
];

export const enginesImage = {
  "GPT-3.5 Turbo": "/images/gpt.jpeg",
  "GPT-4 Turbo": "/images/gpt.jpeg",
  "Claude-instant": "/images/cloude.png",
  "Claude-2": "/images/cloude.png",
  "Gemini Pro": "/images/gemni.jpeg",
};
export const engines = [
  "GPT-3.5 Turbo",
  "GPT-4 Turbo",
  "Claude-instant",
  "Claude-2",
  "Gemini Pro",
];
