"use client";
import { useState } from "react";
import Image from "next/image";

import { PiShareNetwork } from "react-icons/pi";
import { VscSend } from "react-icons/vsc";

import { Button } from "@/components/ui/button";
import ImageThumb from "./ImageThumb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ImageAction from "./ImageAction";

import { useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";
import ImageDownloader from "@/components/pages/ai-image/components/ImageDownloader";
import useImageTabs from "@/components/pages/ai-image/hooks/useImageTabs";

//for send selected image to other tabs to use
const sendActions = [
  {
    id: "1",
    title18KEy: "image_to_image_send_label",
    page: "image-to-image",
  },
  {
    id: "2",
    title18KEy: "upscale_image_send_label",
    page: "image-upscale",
  },
] as const;

/**
 * show list of thumbs and main of selected
 *used in result section
 * @param images
 * @constructor
 */
function GeneratedImages({ images }: { images: string[] }) {
  const { currentTab } = useImageTabs();
  //for show main image of selected
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const {
    common: { share },
    page: { image: imageDictionary },
  } = useGetDictionary();

  return (
    <div className="flex h-full w-fit flex-col gap-2 rounded-2xl bg-primary-light/60 p-4 max-xl:items-center max-xl:justify-center lg:p-5 xl:h-fit xl:flex-row xl:p-9">
      {/*main image and actions*/}
      <div className="group relative overflow-hidden rounded-lg xl:h-full">
        {/*main image*/}
        <Image
          src={selectedImage}
          alt="generated"
          width={300}
          height={300}
          className="mx-auto rounded-lg max-xl:max-h-[350px] xl:h-full xl:max-h-[25rem]"
        />
        <div
          className="absolute inset-x-0 bottom-0 z-10 flex h-1/2 items-end justify-end gap-2 bg-gradient-to-t from-[#00000090] to-transparent
           p-2 opacity-100 transition-all duration-300 dark:from-gray-900 lg:opacity-0 lg:group-hover:opacity-100"
        >
          {/*send to actions*/}
          <Popover>
            <PopoverTrigger asChild>
              <div>
                <ImageAction title="Send To" Icon={VscSend} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-2" side="top">
              {sendActions.map(item => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "flex h-fit w-full justify-start px-3 py-1.5 ",
                    currentTab === item.page && "hidden",
                  )}
                >
                  {imageDictionary[item.title18KEy]}
                </Button>
              ))}
            </PopoverContent>
          </Popover>

          {/*share*/}
          <ImageAction title={share} Icon={PiShareNetwork} />

          {/*download*/}
          <ImageDownloader image={selectedImage} />
        </div>
        <div className="row absolute bottom-0 end-0 z-10 gap-2 p-2"></div>
      </div>

      {/*thumbs*/}
      <div className="flex h-fit flex-row gap-1 max-xl:max-w-xs max-xl:overflow-x-auto xl:h-full xl:max-h-[25rem] xl:flex-col xl:overflow-y-auto">
        {images.map(image => (
          <ImageThumb
            imageSrc={image}
            key={image}
            className="min-h-20 w-20 max-xl:min-w-20 xl:min-h-24"
            imageClassname="h-20 lg:h-24"
            onClick={() => setSelectedImage(image)}
            isActive={selectedImage === image}
          />
        ))}
      </div>
    </div>
  );
}

export default GeneratedImages;
