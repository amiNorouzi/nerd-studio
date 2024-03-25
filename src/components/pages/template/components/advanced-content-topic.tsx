import { TemplateCard } from "@/components/pages/template/components/template-card";

export function AdvancedContentTopic() {
  return (
    <div className="grid w-full grid-cols-1 items-center justify-center gap-x-8 gap-y-3 rounded-xl border p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {mockData.map(item => (
        <TemplateCard key={item.id} {...item} />
      ))}
    </div>
  );
}

const mockData = [
  {
    id: "1",
    icon: "/images/artist.png",
    favorite: false,
    title: "Ad Headlines",
    description: "Write an attention grabbing ad headlines",
    category: "Ads",
    prompt:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    inputs: [
      {
        pId: "1",
        id: "1",
        title: "label one",
        placeHolder: "placeholder one",
      },
      {
        pId: "1",
        id: "2",
        title: "label two",
        placeHolder: "placeholder two",
      },
      {
        pId: "1",
        id: "3",
        title: "label three",
        placeHolder: "placeholder three",
      },
    ],
  },
  {
    id: "111",
    icon: "/images/artist.png",
    favorite: false,
    title: "Ad Headlines",
    description: "Write an attention grabbing ad headlines",
    category: "Ads",
    prompt:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    inputs: [
      {
        pId: "1",
        id: "1",
        title: "label one",
        placeHolder: "placeholder one",
      },
      {
        pId: "1",
        id: "2",
        title: "label two",
        placeHolder: "placeholder two",
      },
      {
        pId: "1",
        id: "3",
        title: "label three",
        placeHolder: "placeholder three",
      },
    ],
  },
  {
    id: "122",
    icon: "/images/artist.png",
    favorite: false,
    title: "Ad Headlines",
    description: "Write an attention grabbing ad headlines",
    category: "Ads",
    prompt:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    inputs: [
      {
        pId: "1",
        id: "1",
        title: "label one",
        placeHolder: "placeholder one",
      },
      {
        pId: "1",
        id: "2",
        title: "label two",
        placeHolder: "placeholder two",
      },
      {
        pId: "1",
        id: "3",
        title: "label three",
        placeHolder: "placeholder three",
      },
    ],
  },
  {
    id: "144",
    icon: "/images/artist.png",
    favorite: false,
    title: "Ad Headlines",
    description: "Write an attention grabbing ad headlines",
    category: "Ads",
    prompt:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    inputs: [
      {
        pId: "1",
        id: "1",
        title: "label one",
        placeHolder: "placeholder one",
      },
      {
        pId: "1",
        id: "2",
        title: "label two",
        placeHolder: "placeholder two",
      },
      {
        pId: "1",
        id: "3",
        title: "label three",
        placeHolder: "placeholder three",
      },
    ],
  },
  {
    id: "133",
    icon: "/images/artist.png",
    favorite: false,
    title: "Ad Headlines",
    description: "Write an attention grabbing ad headlines",
    category: "Ads",
    prompt:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    inputs: [
      {
        pId: "1",
        id: "1",
        title: "label one",
        placeHolder: "placeholder one",
      },
      {
        pId: "1",
        id: "2",
        title: "label two",
        placeHolder: "placeholder two",
      },
      {
        pId: "1",
        id: "3",
        title: "label three",
        placeHolder: "placeholder three",
      },
    ],
  },
  {
    id: "155",
    icon: "/images/artist.png",
    favorite: false,
    title: "Ad Headlines",
    description: "Write an attention grabbing ad headlines",
    category: "Ads",
    prompt:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    inputs: [
      {
        pId: "1",
        id: "1",
        title: "label one",
        placeHolder: "placeholder one",
      },
      {
        pId: "1",
        id: "2",
        title: "label two",
        placeHolder: "placeholder two",
      },
      {
        pId: "1",
        id: "3",
        title: "label three",
        placeHolder: "placeholder three",
      },
    ],
  },
  {
    id: "166",
    icon: "/images/artist.png",
    favorite: false,
    title: "Ad Headlines",
    description: "Write an attention grabbing ad headlines",
    category: "Ads",
    prompt:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    inputs: [
      {
        pId: "1",
        id: "1",
        title: "label one",
        placeHolder: "placeholder one",
      },
      {
        pId: "1",
        id: "2",
        title: "label two",
        placeHolder: "placeholder two",
      },
      {
        pId: "1",
        id: "3",
        title: "label three",
        placeHolder: "placeholder three",
      },
    ],
  },
  {
    id: "12",
    icon: "/images/gpt.jpeg",
    favorite: false,
    title: "Clickbait Titles",
    description: "Clickbait Titles",
    category: "Ads",
    prompt:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    inputs: [
      {
        pId: "12",
        id: "1",
        title: "label one",
        placeHolder: "placeholder one",
      },
      {
        pId: "12",
        id: "2",
        title: "label two",
        placeHolder: "placeholder two",
      },
    ],
  },
];
