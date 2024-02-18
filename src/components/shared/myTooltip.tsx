"use client";
import React, { FC, ReactNode } from "react";

import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditorContext } from "@/stores/contexts/useEditorContext";
import type { ChildrenProps } from "@/services/types";
import { cn } from "@/lib/utils";
import RenderIf from "@/components/shared/RenderIf";

interface IProps {
  title: string | ReactNode;
  delayDuration?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "center" | "start" | "end";
  alignOffset?: number;
  open?: boolean;
  setOpen?: (val: boolean) => {};
  contentClass?: string;
  responseTab?: boolean;
  arrow?: boolean;
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
export const MyTooltip: FC<ChildrenProps<IProps>> = ({
  title,
  side = "top",
  delayDuration = 100,
  align,
  alignOffset,
  children,
  contentClass,
  responseTab,
  arrow = true,
}) => {
  const { editorAndFooterButtonsWrapperRef } = useEditorContext();
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          alignOffset={alignOffset}
          className={cn("!z-100 max-md:hidden", contentClass)}
          {...(responseTab && {
            container: editorAndFooterButtonsWrapperRef.current,
          })}
        >
          <p className="text-sm first-letter:capitalize">{title}</p>
          <RenderIf isTrue={arrow}>
            <TooltipArrow className="fill-background" />
          </RenderIf>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
