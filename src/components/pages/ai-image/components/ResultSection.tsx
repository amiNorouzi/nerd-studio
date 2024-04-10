"use client";
import { useState } from "react";

import { GoHistory } from "react-icons/go";

import EmptyResult from "./EmptyResult";
import ImageHistory from "./ImageHistory";
import GeneratedImages from "./GeneratedImages";
import ImageCompare from "./ImageCompare";
import { Generate } from "@/components/svg-icons";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";
import useImageTabs from "../hooks/useImageTabs";

import { cn, isEmpty } from "@/lib/utils";

import type { HistoryItem } from "@/services/types";
import { Show } from "@/components/shared";
import { iconVariants } from "@/constants/variants";
import { useAiImageStore } from "@/stores/zustand/ai-image-store";
import { ImageModelType } from "@/stores/zustand/types";

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
  const { currentTab, tabs } = useImageTabs();
  const images =
    useAiImageStore.use.generatedImages()[
      currentTab.replaceAll("-", "_") as ImageModelType
    ];

  return (
    <section className="col-span-12 h-full overflow-hidden p-3 lg:col-span-8  lg:p-5 ">
      <div className="flex h-full overflow-hidden rounded-xl border bg-background shadow-2xl ">
        {/*
          if there is no generated images or history, show the empty result
        */}
        {isEmpty(images) && isEmpty(histories) ? (
          <EmptyResult />
        ) : (
          <>
            <div className="col h-full w-full">
              <div className="row gap-2.5 border-b px-4 py-2.5">
                <Generate
                  classname={cn(
                    iconVariants({ size: "sm" }),
                    "fill-muted-foreground",
                  )}
                />
                <h2 className="font-bold">{imageDictionary.generate_label}</h2>
                <p className="overflow-hidden text-ellipsis text-nowrap font-normal lg:max-w-72 xl:max-w-full"></p>
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

              <div className="centered-col h-full w-full p-4 pb-5">
                <Show>
                  <Show.When isTrue={currentTab === tabs.imageUpscale}>
                    <div className="h-fit w-full rounded-2xl bg-primary-light/60 p-4 lg:p-5 xl:p-9">
                      <ImageCompare
                        beforeImage="/images/upscale-before.png"
                        afterImage="/images/upscale-after.png"
                      />
                    </div>
                  </Show.When>

                  <Show.Else>
                    <GeneratedImages images={images} />
                  </Show.Else>
                </Show>
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
