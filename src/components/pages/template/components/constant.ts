export const categories = [
  "All Template",
  "Ads",
  "Blog Posts",
  "Contents",
  "Ecommerce",
  "Emails",
  "Frameworks",
  "Marketing",
  "Social Media",
  "Video",
  "Websites",
  "Other",
];

const titles = [
  "Education",
  "Health",
  "Finance",
  "Business",
  "Technology",
  "Science",
  "Art",
  "Entertainment",
  "Sports",
  "Travel",
  "Food",
  "Lifestyle",
  "Fashion",
  "Music",
  "News",
];
export const mockData = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  title: titles[Math.floor(Math.random() * titles.length)],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
}));
