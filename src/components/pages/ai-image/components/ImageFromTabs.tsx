import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useGetDictionary } from "@/hooks";
import useImageTabs, { type TabsType } from "../hooks/useImageTabs";

/**
 * tabs for switch between text-to-image, image-to-image and image-upscale to render suitable options
 * @constructor
 */
function ImageFromTabs() {
  // get search params and set search params
  const { currentTab, setTab } = useImageTabs();
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();

  return (
    <Tabs
      defaultValue={currentTab}
      className=" w-full"
      onValueChange={v => setTab(v as TabsType)}
    >
      <TabsList className=" grid h-12 w-full grid-cols-3 gap-1 overflow-hidden border-b bg-muted pb-0">
        <TabsTrigger value="text-to-image" className="border-b-tab h-full">
          {imageDictionary.text_to_image_tab_label}
        </TabsTrigger>

        <TabsTrigger value="image-to-image" className="border-b-tab h-full">
          {imageDictionary.image_to_image_tab_label}
        </TabsTrigger>
        <TabsTrigger value="image-upscale" className="border-b-tab h-full">
          {imageDictionary.upscale_tab_label}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default ImageFromTabs;
