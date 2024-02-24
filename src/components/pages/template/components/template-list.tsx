"use client";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { TemplateCard } from "./template-card";
import { categories } from "./constant";
import { cn } from "@/lib/utils";
export function TemplateList() {
  const searchParams = useSearchParams();
  const selectedTemplate =
    searchParams.get("select-template-category") ?? "All Template";

  const items = useMemo(() => {
    if (selectedTemplate === "All Template") {
      return categories
        .filter(category => category !== "All Template")
        .map(category => (
          <div key={category} className="mb-10 flex flex-col gap-2">
            <h3 className="text-base font-semibold text-muted-foreground">
              {category}:
            </h3>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {mockTemplateData
                .filter(item => item.category === category)
                .map(item => (
                  <TemplateCard key={item.id} {...item} />
                ))}
            </div>
          </div>
        ));
    }
    return mockTemplateData
      .filter(item => item.category === selectedTemplate)
      .map(item => <TemplateCard key={item.id} {...item} />);
  }, [selectedTemplate]);

  return (
    <div
      className={cn(
        selectedTemplate !== "All Template" &&
          "grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3",
      )}
    >
      {items}
    </div>
  );
}

const mockTemplateData = [
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
  {
    id: "13",
    icon: "/images/logo.png",
    favorite: true,
    title: "Clickbait Titles",
    description: "Write an attention grabbing ad headlines",
    category: "Blog Posts",
    prompt: "is simply dummy text of the printing and typesetting industry.",
    inputs: [
      {
        pId: "13",
        id: "1",
        title: "label one",
        placeHolder: "placeholder one",
      },
    ],
  },
  {
    id: "14",
    icon: "/images/artist.png",
    favorite: false,
    title: "Ad Headlines",
    description: "Clickbait Titles",
    category: "Ads",
    prompt:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    inputs: [
      {
        pId: "14",
        id: "1",
        title: "label one",
        placeHolder: "placeholder one",
      },
      {
        pId: "14",
        id: "2",
        title: "label two",
        placeHolder: "placeholder two",
      },
      {
        pId: "14",
        id: "3",
        title: "label three",
        placeHolder: "placeholder three",
      },
    ],
  },
  {
    id: "15",
    icon: "/images/logo.png",
    favorite: true,
    title: "Ad Headlines",
    description:
      "Write an attention grabbing ad headlines.is simply dummy text of the printing and typesetting industry's.",
    category: "Ads",
    prompt:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    inputs: [
      {
        pId: "15",
        id: "1",
        title: "label one",
        placeHolder: "placeholder one",
      },
    ],
  },
  {
    id: "16",
    icon: "/images/gpt.jpeg",
    favorite: false,
    title: "Clickbait Titles",
    description: "Write an attention grabbing ad headlines",
    category: "Contents",
    prompt:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    inputs: [
      {
        pId: "16",
        id: "1",
        title: "label one",
        placeHolder: "placeholder one",
      },
      {
        pId: "16",
        id: "2",
        title: "label two",
        placeHolder: "placeholder two",
      },
    ],
  },
];
