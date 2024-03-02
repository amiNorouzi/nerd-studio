import React, { useState } from "react";
import Image from "next/image";

import { HiOutlineChevronRight } from "react-icons/hi";
import { useMediaQuery } from "usehooks-ts";

import { Label } from "@/components/ui/label";
import { SelectAndDrawer } from "@/components/shared";
import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";

// TODO: replace with real data
const resolutions = ["1024 x 1024", "789 x 1024", "1024 x 2048", "2048 x 2048"];
const styles = [
  {
    id: "1",
    title: "None",
    image: "none.png",
  },
  {
    id: "2",
    title: "Abstract",
    image: "abstract.jpg",
  },
  {
    id: "3",
    title: "Realism",
    image: "realism.jpg",
  },
  {
    id: "4",
    title: "3D Model",
    image: "3d_model.webp",
  },
  {
    id: "5",
    title: "Cartoon",
    image: "cartoon.jpg",
  },
  {
    id: "6",
    title: "Anime",
    image: "anime.webp",
  },
  {
    id: "7",
    title: "Digital Art",
    image: "digitalart.jpg",
  },
  {
    id: "8",
    title: "Art Deco",
    image: "artdeco.jpg",
  },
  {
    id: "9",
    title: "Pixel Ar",
    image: "pixelart.jpg",
  },
  {
    id: "10",
    title: "Origami",
    image: "origami.webp",
  },
  {
    id: "11",
    title: "Photographic",
    image: "thumb-72.webp",
  },
  {
    id: "12",
    title: "Pencil Drawing",
    image: "sketch.webp",
  },
];

/**
 * style and resolution settings
 * @constructor
 */
function CommonSettings() {
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();
  const [selectedResolution, setSelectedResolution] = useState("1024 x 1024");
  const [currentStyle, setCurrentStyle] = useState("none"); //selected style
  const [searchParams] = useCustomSearchParams();
  //get current tab for don't render style in upscale tab
  const currentTab = searchParams.get("feature") || "text-to-image";
  //mobile size for change side of style popover
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <div className="row mb-2 gap-4 lg:mb-3 xl:mb-5">
      {/*resolution select*/}
      <div className="col w-full">
        <Label className="mb-2">Resolution</Label>
        <SelectAndDrawer
          value={selectedResolution}
          setValue={setSelectedResolution}
          items={resolutions}
        />
      </div>

      {/*
        style popover
        won't render in upscale
      */}
      <RenderIf isTrue={currentTab !== "image-upscale"}>
        <div className="col w-full">
          <Label className="mb-2">Style</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="muted"
                className="row w-full justify-between capitalize text-foreground"
              >
                {currentStyle}
                <HiOutlineChevronRight />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side={isMobile ? "top" : "right"}
              align={isMobile ? "end" : "center"}
              className="w-[300px] lg:w-[400px]"
            >
              {/*
                  3 item in a row for mobile size and 4 for desktop size
              */}
              <div className="grid grid-cols-3 gap-2 lg:grid-cols-4">
                {styles.map(item => (
                  // style item
                  // a button with style image and title in it
                  <Button
                    variant="muted"
                    className={cn(
                      "col h-full w-full gap-1 border p-1.5 text-[10px] text-foreground hover:border-muted-dark",
                      currentStyle === item.title &&
                        "border-primary bg-primary-light",
                    )}
                    key={item.id}
                    onClick={() => setCurrentStyle(item.title)}
                  >
                    <Image
                      src={`/images/image-style/${item.image}`}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="aspect-square h-full rounded-lg"
                    />
                    {item.title}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </RenderIf>
    </div>
  );
}

export default CommonSettings;
