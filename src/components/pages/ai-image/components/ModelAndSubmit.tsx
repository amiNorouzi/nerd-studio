import React from "react";
import { Label } from "@/components/ui/label";
import EngineSelect from "@/components/pages/ai-image/components/EngineSelect";
import { Button } from "@/components/ui/button";
import RenderIf from "@/components/shared/RenderIf";
import Loading from "@/components/shared/Loading";
import { useGetDictionary } from "@/hooks";
import { EngineItem, StateSetterType } from "@/services/types";
import useImageTabs from "@/components/pages/ai-image/hooks/useImageTabs";
import {
  useAiImageStore,
  useImageUrlStore,
  usePicFileStore,
} from "@/stores/zustand/ai-image-store";
import useInputValue from "@/components/pages/ai-image/hooks/useInputValue";
import { useGeneratePic, useGeneratePicToPic } from "@/services/ai-image";

interface IProps {
  activeModel: string;
  setActiveModel: StateSetterType<string>;
  models: EngineItem[];
  activeModelUrl: string;
}

function ModelAndSubmit({
  setActiveModel,
  activeModelUrl,
  activeModel,
  models,
}: IProps) {
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();
  const { currentModelType } = useImageTabs();
  const inputs = useAiImageStore.use.inputs();
  const currentTabInputs = inputs[currentModelType];

  const { mutateAsync, data, isPending, isSuccess } = useGeneratePic();
  const {
    mutateAsync: imageToImageRespose,
    isPaused: isPausedImageToImage,
    isSuccess: isSuccessimageToImage,
  } = useGeneratePicToPic();

  const { getValue, changeValue } = useInputValue();
  const setImage = useImageUrlStore.use.setUrlImage();
  const picToImageToImage = usePicFileStore.use.pic();
  const { currentTab, tabs } = useImageTabs();
  setImage("");


  const getPic = async () => {
    console.log("isPending", isPending);
    console.log("isPausedImageToImage", isPausedImageToImage);
  

    if (getValue("text")) {
      console.log("test input");
      
      if (currentTab == tabs.textToImage) {
        const data = await mutateAsync({
          model: activeModel,
          sizePic: "",
          prompt: String(getValue("text") || ""),
        });
        console.log("isPending", isSuccess);
      }
      if (currentTab == tabs.imageToImage) {
        const dataImageToImage = imageToImageRespose({
          model: activeModel,
          sizePic: "",
          prompt: String(getValue("text") || ""),
          pic: picToImageToImage[0],
        });
        if (isSuccessimageToImage) {
          console.log("test if");
          setImage(dataImageToImage);
        }
      }
    }
  };
  return (
    <div className="form-padding form-gap sticky bottom-0 mt-auto grid grid-cols-1 items-end bg-background sm:grid-cols-2">
      {/*select engine base on current tab*/}
      <div className="col w-full gap-label-space">
        <Label>{imageDictionary.engines_label}</Label>
        <EngineSelect
          value={activeModel}
          setValue={setActiveModel}
          engines={models}
        />
      </div>

      <Button
        className="row w-full"
        onClick={getPic}
        disabled={isPending || isPausedImageToImage}
      >
        <RenderIf isTrue={isPending || isPausedImageToImage}>
          <Loading
            rootClass="-ms-1 me-1"
            svgClass="w-6 h-6 !stroke-primary-foreground"
          />
        </RenderIf>
        {currentModelType === "image_upscale"
          ? imageDictionary.upscale_button_label
          : imageDictionary.generate_label}
      </Button>
    </div>
  );
}

export default ModelAndSubmit;
