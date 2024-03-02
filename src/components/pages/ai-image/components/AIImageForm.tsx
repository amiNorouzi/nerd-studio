"use client";

import { useRef, useState } from "react";

import { MdOutlineCameraAlt } from "react-icons/md";
import { useResizeObserver } from "usehooks-ts";

import { EngineSelect } from "@/components/shared";
import ImageFromTabs from "./ImageFromTabs";
import { Button } from "@/components/ui/button";
import UploadZone from "./UploadZone";
import PromptTextArea from "./PromptTextArea";
import RenderIf from "@/components/shared/RenderIf";
import { Label } from "@/components/ui/label";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import CommonSettings from "@/components/pages/ai-image/components/CommonSettings";
import AdvanceSettings from "@/components/pages/ai-image/components/AdvanceSettings";

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

export function AIImageForm() {
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();
  const [searchParams] = useCustomSearchParams();
  const currentTab = searchParams.get("feature") || "text-to-image";

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
      <h1 className="row gap-1.5 border-b px-4 py-2.5 text-xl">
        <MdOutlineCameraAlt size="1.5rem" />
        {imageDictionary.page_title}
      </h1>
      <ImageFromTabs />
      <div
        className="col h-fit flex-grow gap-2 p-4 lg:p-5 xl:p-6"
        ref={itemsContainerRef}
      >
        <Label>{imageDictionary.engines_label}</Label>
        <EngineSelect
          value={activeEngine}
          setValue={setActiveEngine}
          engines={engines}
          contentWidth={width}
          triggerClassName=" mb-2 lg:mb-3 xl:mb-5"
        />

        <RenderIf isTrue={currentTab !== "image-upscale"}>
          <PromptTextArea />
        </RenderIf>

        <UploadZone />

        <CommonSettings />

        <AdvanceSettings />
      </div>
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
