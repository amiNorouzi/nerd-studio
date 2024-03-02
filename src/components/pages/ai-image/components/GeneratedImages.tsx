"use client";
import { useState } from "react";
import Image from "next/image";

import { LuDownload } from "react-icons/lu";
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

import { useCustomSearchParams, useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";

const sendActions = [
  {
    id: "1",
    title18KEy: "text_to_image_send_label",
    page: "text-to-image",
  },
  {
    id: "2",
    title18KEy: "image_to_image_send_label",
    page: "image-to-image",
  },
  {
    id: "3",
    title18KEy: "upscale_image_send_label",
    page: "image-upscale",
  },
] as const;

function GeneratedImages({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [searchParams] = useCustomSearchParams();
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();

  const currentTab = searchParams.get("feature") || "text-to-image";

  return (
    <div className="flex h-full w-fit flex-col gap-2 rounded-2xl bg-primary-light/60 p-4 max-xl:items-center max-xl:justify-center lg:p-5 xl:h-fit xl:flex-row xl:p-9">
      <div className="fit group relative overflow-hidden rounded-lg">
        <Image
          src={selectedImage}
          alt="generated"
          width={300}
          height={300}
          className="mx-auto rounded-lg max-xl:max-h-[350px]"
        />
        <div
          className="absolute inset-x-0 bottom-0 z-10 flex h-1/2 items-end justify-end gap-2 bg-gradient-to-t from-[#00000090] to-transparent
           p-2 opacity-100 transition-all duration-300 dark:from-gray-900 lg:opacity-0 lg:group-hover:opacity-100"
        >
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
          <ImageAction
            title={imageDictionary.share_button_label}
            Icon={PiShareNetwork}
          />
          <ImageAction
            title={imageDictionary.download_button_label}
            Icon={LuDownload}
          />
        </div>
        <div className="row absolute bottom-0 end-0 z-10 gap-2 p-2"></div>
      </div>
      <div className="flex h-fit flex-row gap-1 xl:h-full xl:flex-col">
        {images.map(image => (
          <ImageThumb
            imageSrc={image}
            key={image}
            className="w-20"
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
