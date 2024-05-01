"use client";

import { Show } from "@/components/shared";
import ImageFromTabs from "./ImageFromTabs";
import UploadZone from "./UploadZone";
import PromptTextArea from "./PromptTextArea";
import RenderIf from "@/components/shared/RenderIf";
import CommonSettings from "./CommonSettings";
import AdvanceSettings from "./AdvanceSettings";
import FormSkeleton from "./FormSkeleton";

import useImageTabs from "../hooks/useImageTabs";
import useImageModels from "../hooks/useImageModels";
import ModelAndSubmit from "@/components/pages/ai-image/components/ModelAndSubmit";
import { DialogForUpload } from "@/components/shared/run-tab-for-app/form-section-components/dialog-for-upload";
import { useState } from "react";
import {
  usePdfFileStore,
  useSelectedFilePdfStore,
} from "@/stores/zustand/chat-pdf-file";

/**
 * Left panel of image page
 * get some input and generate image by click on generate button
 * used in ai-image index page
 * @constructor
 */
export function AIImageForm() {
  const { currentTab, tabs } = useImageTabs();

  const {
    models,
    activeModel,
    setActiveModel,
    basicInputs,
    advanceInputs,
    isLoading,
    activeModelUrl,
  } = useImageModels();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [url, setFile] = useState<File[]>([]);
  const setUrlPdf = usePdfFileStore.use.setUrlPdf();
  const urlPdf = usePdfFileStore.use.urlPdf();
  const selectedFilePdf = useSelectedFilePdfStore.use.selectedFilePdf();
  const uploadStatus = [true, true];
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
              <RenderIf isTrue={currentTab == tabs.textToImage}>
                <PromptTextArea />
              </RenderIf>

              {/*
                upload image for image to image and upscale
                not render in text to image
              */}
              <RenderIf
                isTrue={
                  currentTab == tabs.imageUpscale ||
                  currentTab == tabs.imageToImage
                }
              >
                <DialogForUpload
                  open={openDialog}
                  setOpen={setOpenDialog}
                  handleSave={() => console.log("")}
                  documentFiles={url}
                  setDocumentFiles={setFile}
                  url={""}
                  setUrl={() => console.log("url")}
                  files={urlPdf}
                  handleDeleteFilesFromParent={() => console.log()}
                  setExtractedText={() => console.log()}
                  startConverting={setUrlPdf}
                  uploadIndex={1}
                  uploadProgress={100}
                  uploadStatus={[...uploadStatus]}
                />
              </RenderIf>
              <UploadZone
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
              />

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
