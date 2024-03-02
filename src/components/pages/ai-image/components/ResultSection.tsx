"use client";
import EmptyResult from "./EmptyResult";
import ImageHistory from "./ImageHistory";
import GeneratedImages from "./GeneratedImages";
import { Generate } from "@/components/svg-icons";

import { useGetDictionary } from "@/hooks";

import { isEmpty } from "@/lib/utils";

import type { HistoryItem } from "@/services/types";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoMdMore } from "react-icons/io";
import { GoHistory } from "react-icons/go";

//list of images
//TODO: replace with real data
const images: string[] = [
  "/images/generateds/4.webp",
  "/images/generateds/5.webp",
  "/images/generateds/6.webp",
  "/images/generateds/7.webp",
];

//list of history
//TODO: replace with real data
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

/**
 * right section of the page
 * show the generated images and history
 * if there is no generated images or history, show the empty result
 * @constructor
 */
export function ResultSection() {
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();
  const [isOpenMobileImageHistory, setIsOpenMobileImageHistory] =
    useState(false);

  return (
    <section className="col-span-12 h-full overflow-hidden p-3 lg:col-span-8  lg:p-5 ">
      <div className="flex h-full overflow-hidden rounded-xl border bg-background shadow-2xl ">
        {/*
          if there is no generated images or history, show the empty result
        */}
        {isEmpty(images) && isEmpty(history) ? (
          <EmptyResult />
        ) : (
          <>
            <div className="col h-full w-full">
              <div className="row gap-2.5 border-b px-4 py-2.5">
                <Generate classname="w-4 h-4" />
                <h2 className="font-bold">{imageDictionary.generate_label}</h2>
                <p className="overflow-hidden text-ellipsis text-nowrap font-normal lg:max-w-72 xl:max-w-full">
                  Draw the man in the picture as a warrior fighting a demon
                </p>
                <Button
                  variant="ghost"
                  className="fit ms-auto p-1 md:hidden"
                  onClick={() =>
                    setIsOpenMobileImageHistory(!isOpenMobileImageHistory)
                  }
                >
                  <GoHistory size="1rem" />
                </Button>
              </div>

              <div className="centered-col h-full w-full p-2 pb-5">
                <GeneratedImages images={images} />
              </div>
            </div>
            <ImageHistory
              histories={histories}
              isOpenMobileImageHistory={isOpenMobileImageHistory}
              setIsOpenMobileImageHistory={setIsOpenMobileImageHistory}
            />
          </>
        )}
      </div>
    </section>
  );
}
