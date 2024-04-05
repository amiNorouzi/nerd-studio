"use client";

import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { withCn, withProps } from "@udecode/cn";
import { useEditorContext } from "@/stores/contexts/useEditorContext";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipPortal = TooltipPrimitive.Portal;

export const TooltipContent = withCn(
  withProps(TooltipPrimitive.Content, {
    sideOffset: 4,
  }),
  "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md",
);

export function withTooltip<
  T extends React.ComponentType<any> | keyof HTMLElementTagNameMap,
>(Component: T) {
  return React.forwardRef<
    React.ElementRef<T>,
    React.ComponentPropsWithoutRef<T> & {
      tooltip?: React.ReactNode;
      tooltipContentProps?: Omit<
        React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
        "children"
      >;
      tooltipProps?: Omit<
        React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>,
        "children"
      >;
    }
  >(function ExtendComponent(
    { tooltip, tooltipContentProps, tooltipProps, ...props },
    ref,
  ) {
    const [mounted, setMounted] = React.useState(false);
    const { editorAndFooterButtonsWrapperRef } = useEditorContext();
    React.useEffect(() => {
      setMounted(true);
    }, []);

    const component = <Component ref={ref} {...(props as any)} />;

    if (tooltip && mounted) {
      return (
        <Tooltip {...tooltipProps}>
          <TooltipTrigger asChild>{component}</TooltipTrigger>

          <TooltipPortal container={editorAndFooterButtonsWrapperRef.current}>
            <TooltipContent {...tooltipContentProps}>{tooltip}</TooltipContent>
          </TooltipPortal>
        </Tooltip>
      );
    }

    return component;
  });
}
