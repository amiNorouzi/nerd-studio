"use client";

import { Show } from "@/components/shared";
import ImageFromTabs from "./ImageFromTabs";
import UploadZone from "./UploadZone";
import PromptTextArea from "./PromptTextArea";
import RenderIf from "@/components/shared/RenderIf";
import CommonSettings from "./CommonSettings";
import AdvanceSettings from "./AdvanceSettings";
import FormSkeleton from "@/components/shared/skeleton/FormSkeleton";

import useImageTabs from "../hooks/useImageTabs";
import useImageModels from "../hooks/useImageModels";
import ModelAndSubmit from "@/components/pages/ai-image/components/ModelAndSubmit";

/**
 * Left panel of image page
 * get some input and generate image by click on generate button
 * used in ai-image index page
 * @constructor
 */
export function AIImageForm() {
  const { currentTab } = useImageTabs();

  const {
    models,
    activeModel,
    setActiveModel,
    basicInputs,
    advanceInputs,
    isLoading,
    activeModelUrl,
  } = useImageModels();

  return (
    <section className="relative col-span-12 flex h-fit flex-col overflow-y-auto bg-background lg:col-span-4 lg:h-full lg:max-h-full ">
      <ImageFromTabs />
      <div className="col form-padding form-gap h-fit flex-grow">
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
              {/* <UploadZone /> */}

              {/*
                -resolution and style
                - style not render in upscale
              */}
              {/* <CommonSettings settings={basicInputs} /> */}

              {/*
                advance settings id different for all tabs
              */}
              <AdvanceSettings settings={advanceInputs} />
            </>
          </Show.Else>
        </Show>

        <ModelAndSubmit
          activeModel={activeModel}
          setActiveModel={setActiveModel}
          models={models}
          activeModelUrl={activeModelUrl}
        />
      </div>
    </section>
  );
}
