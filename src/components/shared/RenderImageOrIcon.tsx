import React from "react";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  icon: string | IconType;
}
export function RenderImageOrIcon({ icon, className, ...otherProps }: IProps) {
  const ReactIcon = icon;
  if (typeof icon === "string") {
    return (
      <div
        className={cn(
          "relative aspect-square h-7 w-7 overflow-hidden rounded",
          className,
        )}
        {...otherProps}
      >
        <Image src={icon} alt={"app icon"} fill sizes="100%" />
      </div>
    );
  }

  return <ReactIcon className={cn("h-7 w-7 ", className)} />;
}
