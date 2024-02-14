"use client";
import React, { FC, ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChildrenProps } from "@/custom-types/props";

interface IProps {
  title: string | ReactNode;
  delayDuration?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "center" | "start" | "end";
  alignOffset?: number;
  open?: boolean;
  setOpen?: (val: boolean) => {};
}

/**
 * tooltip for button
 * @param title tooltip title
 * @param side tooltip content side to button default is top
 * @param delayDuration delay duration to open in millisecond default is 100
 * @param align align of tooltip content to button
 * @param alignOffset
 * @param children
 * @constructor
 */
const MyTooltip: FC<ChildrenProps<IProps>> = ({
  title,
  side = "top",
  delayDuration = 100,
  align,
  alignOffset,
  children,
}) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild onFocus={e => e.preventDefault()}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          alignOffset={alignOffset}
          className="!z-100 max-md:hidden"
        >
          <p className="text-xs first-letter:capitalize">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MyTooltip;
