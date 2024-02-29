"use client";
import { useState } from "react";
import Image from "next/image";

import { LuDownload } from "react-icons/lu";
import { PiShareNetwork } from "react-icons/pi";

import { MyTooltip } from "@/components/shared/myTooltip";
import { Button, ButtonProps } from "@/components/ui/button";
import ImageThumb from "./ImageThumb";

import { cn } from "@/lib/utils";

import type { IconType } from "react-icons";

interface IActionButtonProps extends ButtonProps {
  title: string;
  Icon: IconType;
  iconClassname?: string;
}

const ImageAction = ({
  title,
  Icon,
  iconClassname,
  ...otherProps
}: IActionButtonProps) => (
  <MyTooltip title={title}>
    <Button
      variant="ghost"
      className="fit z-10 rounded-full bg-[#98989860] p-2 text-primary hover:bg-muted  hover:text-primary-dark"
      {...otherProps}
    >
      <Icon className={cn("h-5 w-5", iconClassname)} />
    </Button>
  </MyTooltip>
);

function GeneratedImages({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex h-fit w-fit gap-2 rounded-2xl bg-primary-light/60 p-9">
      <div className="fit group relative overflow-hidden rounded-lg">
        <Image
          src={selectedImage}
          alt="generated"
          width={300}
          height={300}
          className="rounded-lg"
        />
        <div
          className="absolute inset-x-0 bottom-0 z-10 flex h-1/2 items-end justify-end gap-2 bg-gradient-to-t from-[#00000090] to-transparent
           p-2 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:from-gray-900"
        >
          <ImageAction title="Download" Icon={PiShareNetwork} />
          <ImageAction title="Sahre" Icon={LuDownload} />
        </div>
        <div className="row absolute bottom-0 end-0 z-10 gap-2 p-2"></div>
      </div>
      <div className="col h-full gap-1">
        {images.map(image => (
          <ImageThumb
            imageSrc={image}
            key={image}
            className="w-20"
            imageClassname="h-24"
            onClick={() => setSelectedImage(image)}
            isActive={selectedImage === image}
          />
        ))}
      </div>
    </div>
  );
}

export default GeneratedImages;
