"use client";
import EmptyResult from "./EmptyResult";
import ImageHistory from "./ImageHistory";
import GeneratedImages from "./GeneratedImages";
import { Generate } from "@/components/svg-icons";

import { useGetDictionary } from "@/hooks";

import { isEmpty } from "@/lib/utils";

import type { HistoryItem } from "@/services/types";

const images: string[] = [
  "/images/generateds/4.webp",
  "/images/generateds/5.webp",
  "/images/generateds/6.webp",
  "/images/generateds/7.webp",
];

const histories: HistoryItem[] = [
  {
    id: "1",
    imageCount: 5,
    title: "My Image",
    thumbnailImage: "/images/generateds/1.webp",
    date: "40 Min ago",
  },
  {
    id: "21",
    imageCount: 1,
    title: "Image",
    thumbnailImage: "/images/generateds/2.webp",
    date: "4 Day ago",
  },
  {
    id: "3",
    imageCount: 5,
    title: "New Image",
    thumbnailImage: "/images/generateds/3.webp",
    date: "1 Week ago",
  },
];

export function ResultSection() {
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();

  return (
    <section className="col-span-12 h-fit overflow-hidden p-3 lg:col-span-6 lg:h-full lg:p-5 xl:col-span-8">
      <div className="flex h-fit overflow-hidden rounded-xl border bg-background shadow-2xl lg:h-full ">
        {isEmpty(images) && isEmpty(history) ? (
          <EmptyResult />
        ) : (
          <>
            <div className="col h-full w-full">
              <div className="row gap-2.5 border-b px-4 py-2.5">
                <Generate classname="w-4 h-4" />
                <h2 className="font-bold">{imageDictionary.generate_label}</h2>
                <p className="font-normal">
                  Draw the man in the picture as a warrior fighting a demon ...
                </p>
              </div>
              <div className="centered-col h-full w-full pb-5">
                <GeneratedImages images={images} />
              </div>
            </div>
            <ImageHistory histories={histories} />
          </>
        )}
      </div>
    </section>
  );
}
