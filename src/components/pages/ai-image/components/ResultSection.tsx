"use client";
import React, { useEffect, useState } from "react";
import ImageHistory from "./ImageHistory";

import { useGetDictionary } from "@/hooks";
import useImageTabs from "../hooks/useImageTabs";

import { isEmpty } from "@/lib/utils";

import type { HistoryItem } from "@/services/types";
import { HistoryBox, Show } from "@/components/shared";
import { useImageUrlStore } from "@/stores/zustand/ai-image-store";
import Image from "next/image";
import GeneratedImages from "./GeneratedImages";
import ImageCompare from "./ImageCompare";
import EmptyResult from "./EmptyResult";

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
export default function ResultSection() {
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();
  const [isOpenMobileImageHistory, setIsOpenMobileImageHistory] =
    useState(false);
  const { currentTab, tabs } = useImageTabs();
  const imageUrl = useImageUrlStore.use.imageUrl();
  useEffect(() => {
     }, [imageUrl]);
  return (
    <section className="col-span-12 flex h-full gap-2.5 overflow-hidden bg-white   lg:col-span-8  ">
      <div className="my-4 ml-6 mr-4 flex h-[95%] w-full overflow-hidden rounded-xl border bg-background shadow-2xl ">
        {/* if there is no generated images or history, show the empty result */}

        {isEmpty(imageUrl) ? (
          <EmptyResult />
        ) : (
          <>
            <Show>
              <Show.When isTrue={currentTab !== tabs.textToImage}>
                <div className="col flex h-full w-full items-center justify-center py-[15%]">
                  <Image
                    className=" h-[140%] w-5/6 rounded-xl"
                    src={imageUrl}
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>
              </Show.When>
            </Show>

            {/* <div className="col h-full w-full">
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
                    <GeneratedImages images={imageUrl} />
                  </Show.Else>
                </Show>
              </div>
            </div> */}

            {/*<ImageHistory*/}
            {/*  histories={histories}*/}
            {/*  isOpenMobileImageHistory={isOpenMobileImageHistory}*/}
            {/*  setIsOpenMobileImageHistory={setIsOpenMobileImageHistory}*/}
            {/*/>*/}
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
                <GeneratedImages images={[imageUrl]} />
              </Show.Else>
            </Show>
          </>
        )}
      </div>
      <HistoryBox>
        <ImageHistory
          histories={histories as any}
          isOpenMobileImageHistory={isOpenMobileImageHistory}
          setIsOpenMobileImageHistory={setIsOpenMobileImageHistory}
        />
      </HistoryBox>
    </section>
  );
}
