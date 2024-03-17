import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface IProps extends ButtonProps {
  imageSrc: string;
  imageClassname?: string;
  isActive?: boolean;
}

/**
 * used for history item and generated image list
 * @param imageSrc
 * @param  className - extra classname for button
 * @param imageClassname extra classnames for image
 * @param isActive - if open as main image
 * @param otherProps
 * @constructor
 */
function ImageThumb({
  imageSrc,
  className,
  imageClassname,
  isActive = false,
  ...otherProps
}: IProps) {
  return (
    <Button
      variant="ghost"
      className={cn("relative h-fit w-28 overflow-hidden p-0.5", className)}
      {...otherProps}
    >
      <Image
        src={imageSrc}
        alt="ai image"
        width={100}
        height={100}
        className={cn("w-full rounded-lg", imageClassname)}
      />
      <div
        className={cn(
          "absolute inset-0 z-10 bg-[#ffffff70] transition-all duration-200 hover:bg-[#00000070]",
          isActive && "bg-transparent",
        )}
      />
    </Button>
  );
}

export default ImageThumb;
