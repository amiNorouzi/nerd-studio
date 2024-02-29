import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCustomSearchParams, useGetDictionary } from "@/hooks";

function ImageFromTabs() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();

  return (
    <Tabs
      defaultValue={searchParams.get("feature") ?? "text-to-image"}
      className="h-full w-full"
      onValueChange={v => setSearchParams("feature", v)}
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
