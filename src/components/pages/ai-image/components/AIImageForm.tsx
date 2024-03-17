"use client";

import { useRef, useState } from "react";

import { TbCamera } from "react-icons/tb";
import { useResizeObserver } from "usehooks-ts";

import { EngineSelect } from "@/components/shared";
import ImageFromTabs from "./ImageFromTabs";
import { Button } from "@/components/ui/button";
import UploadZone from "./UploadZone";
import PromptTextArea from "./PromptTextArea";
import RenderIf from "@/components/shared/RenderIf";
import { Label } from "@/components/ui/label";
import CommonSettings from "./CommonSettings";
import AdvanceSettings from "./AdvanceSettings";

import { useGetDictionary } from "@/hooks";
import useImageTabs from "@/components/pages/ai-image/hooks/useImageTabs";

//list of engines
//TODO: replace with real engines data from api
const engines = [
  {
    id: "1",
    name: "Stable Diffusion XL v1.0",
    image: "/images/stable-diffusion.jpg",
  },
  {
    id: "2",
    name: "Stable Diffusion v1.6",
    image: "/images/stable-diffusion.jpg",
  },
  {
    id: "3",
    name: "DALL-E 2",
    image: "/images/gpt.jpeg",
  },
  {
    id: "4",
    name: "DALL-E 3",
    image: "/images/gpt.jpeg",
  },
];

/**
 * Left panel of image page
 * get some input and generate image by click on generate button
 * used in ai-image index page
 * @constructor
 */
export function AIImageForm() {
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();
  const { currentTab } = useImageTabs();

  const [activeEngine, setActiveEngine] = useState(engines[0].id);
  // get items container ref for calculate width for set to engine select width
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  //calculate width of container
  const { width = 0 } = useResizeObserver({
    ref: itemsContainerRef,
    box: "content-box",
  });

  return (
    <section className="relative col-span-12 flex h-fit flex-col overflow-y-auto bg-background lg:col-span-4 lg:h-full lg:max-h-full ">
      {/*header*/}
      <h1 className="row gap-1.5 border-b px-4 py-2.5 text-xl">
        <TbCamera size="1.5rem" />
        {imageDictionary.page_title}
      </h1>
      <ImageFromTabs />
      <div
        className="col h-fit flex-grow gap-2 p-4 lg:p-5 xl:p-6"
        ref={itemsContainerRef}
      >
        {/*select engine base on current tab*/}
        <Label>{imageDictionary.engines_label}</Label>
        <EngineSelect
          value={activeEngine}
          setValue={setActiveEngine}
          engines={engines}
          contentWidth={width}
          triggerClassName=" mb-2 lg:mb-3 xl:mb-5"
        />

        {/*
          get prompt to generate
          don't need it in upscale
        */}
        <RenderIf isTrue={currentTab !== "image-upscale"}>
          <PromptTextArea />
        </RenderIf>

        {/*
          upload image for image to image and upscale
          not render in text to image
        */}
        <UploadZone />

        {/*
          - resolution and style
          - style not render in upscale
        */}
        <CommonSettings />

        {/*
        advance settings id different for all tabs
        */}
        <AdvanceSettings />
      </div>

      {/*generate button*/}
      <div className="sticky bottom-0 bg-background p-4 lg:p-4 xl:p-6">
        <Button className="w-full">
          {currentTab === "image-upscale"
            ? imageDictionary.upscale_button_label
            : imageDictionary.generate_label}
        </Button>
      </div>
    </section>
  );
}
