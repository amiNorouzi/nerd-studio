import { useCustomSearchParams } from "@/hooks";

const tabs = {
  textToImage: "text-to-image",
  imageToImage: "image-to-image",
  imageUpscale: "image-upscale",
};
export type TabsType = keyof typeof tabs;

/**
 * hook for get image page current tab and set it
 */
function useImageTabs() {
  const [searchParams, setSearchParams] = useCustomSearchParams(); //for check current tab
  const currentTab = searchParams.get("feature") || "text-to-image"; //current tab set in tabs component,

  const setTab = (tab: TabsType) => {
    setSearchParams("feature", tab);
  };

  return {
    currentTab,
    setTab,
    tabs,
  };
}

export default useImageTabs;
