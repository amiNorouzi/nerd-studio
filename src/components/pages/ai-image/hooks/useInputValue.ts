import useImageTabs from "@/components/pages/ai-image/hooks/useImageTabs";
import { useAiImageStore } from "@/stores/zustand/ai-image-store";

type ImageModelType = "text_to_image" | "image_to_image" | "image_upscale";

function useInputValue() {
  const { currentTab } = useImageTabs();
  const currentModelType = currentTab.replaceAll("-", "_") as ImageModelType;
  const changeInputValue = useAiImageStore.use.changeInputValue();
  const inputs = useAiImageStore.use.inputs();

  const getValue = (key: string) => {
    return inputs[currentModelType][key];
  };

  const changeValue = (key: string, val: string | number) => {
    changeInputValue(currentModelType, key, val);
  };

  return { getValue, changeValue };
}

export default useInputValue;
