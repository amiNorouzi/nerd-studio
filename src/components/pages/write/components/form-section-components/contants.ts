export const statuses = [
  {
    value: "en-US",
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
    "Original",
    "Repetitive",
    "Deterministic",
    "Creative",
    "Imaginative",
  ],
  tone: [
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
  point: ["Default", "First Person", "Second Person", "Third Person"],
} as const;

export const selectValuesDescription = {
  creativity: "form_creativity_description",
  tone: "form_tone_description",
} as const;
