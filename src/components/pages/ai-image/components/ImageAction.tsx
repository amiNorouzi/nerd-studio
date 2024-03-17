import { memo } from "react";

import type { IconType } from "react-icons";

import { Button, ButtonProps } from "@/components/ui/button";
import { MyTooltip } from "@/components/shared/myTooltip";

import { cn } from "@/lib/utils";

interface IActionButtonProps extends ButtonProps {
  title: string;
  Icon: IconType;
  iconClassname?: string;
}

/**
 * ImageAction is a button with an icon and a tooltip
 * @param title - tooltip title
 * @param Icon - icon component
 * @param iconClassname - extra class for the icon
 * @param className - extra class for the button
 * @param otherProps - other props for the button
 * @constructor
 */
function ImageAction({
  title,
  Icon,
  iconClassname,
  className,
  ...otherProps
}: IActionButtonProps) {
  return (
    <MyTooltip title={title}>
      <Button
        variant="ghost"
        className={cn(
          "fit z-10 rounded-full bg-[#98989860] p-2 text-primary hover:bg-muted  hover:text-primary-dark",
          className,
        )}
        {...otherProps}
      >
        <Icon className={cn("h-5 w-5", iconClassname)} />
      </Button>
    </MyTooltip>
  );
}

export default memo(ImageAction);
