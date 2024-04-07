"use client";

import { useRef } from "react";

import { useResizeObserver } from "usehooks-ts";

import { EngineSelect, Show } from "@/components/shared";
import ImageFromTabs from "./ImageFromTabs";
import { Button } from "@/components/ui/button";
import UploadZone from "./UploadZone";
import PromptTextArea from "./PromptTextArea";
import RenderIf from "@/components/shared/RenderIf";
import { Label } from "@/components/ui/label";
import CommonSettings from "./CommonSettings";
import AdvanceSettings from "./AdvanceSettings";
import FormSkeleton from "./FormSkeleton";

import useImageTabs from "../hooks/useImageTabs";
import useImageModels from "../hooks/useImageModels";
import { useGetDictionary } from "@/hooks";

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

  // get items container ref for calculate width for set to engine select width
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  //calculate width of container
  const { width = 0 } = useResizeObserver({
    ref: itemsContainerRef,
    box: "content-box",
  });

  const {
    models,
    activeModel,
    setActiveModel,
    basicInputs,
    advanceInputs,
    isLoading,
  } = useImageModels();

  return (
    <section className="relative col-span-12 flex h-fit flex-col overflow-y-auto bg-background lg:col-span-4 lg:h-full lg:max-h-full ">
      <ImageFromTabs />
      <div
        className="col form-padding form-gap h-fit flex-grow"
        ref={itemsContainerRef}
      >
        {/*select engine base on current tab*/}
        <div className="col gap-label-space">
          <Label>{imageDictionary.engines_label}</Label>
          <EngineSelect
            value={activeModel}
            setValue={setActiveModel}
            engines={models}
            contentWidth={width}
          />
        </div>
        <Show>
          <Show.When isTrue={isLoading}>
            <FormSkeleton />
          </Show.When>
          <Show.Else>
            <>
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
                -resolution and style
                - style not render in upscale
              */}
              <CommonSettings settings={basicInputs} />

              {/*
                advance settings id different for all tabs
              */}
              <AdvanceSettings settings={advanceInputs} />
            </>
          </Show.Else>
        </Show>
      </div>

      {/*generate button*/}
      <div className="form-padding sticky bottom-0 mt-auto bg-background">
        <Button className="w-full">
          {currentTab === "image-upscale"
            ? imageDictionary.upscale_button_label
            : imageDictionary.generate_label}
        </Button>
      </div>
    </section>
  );
}
