import { Button, ButtonProps } from "@/components/ui/button";
import type { IconType } from "react-icons";
import { MyTooltip } from "@/components/shared/myTooltip";
import { cn } from "@/lib/utils";
import { iconVariants } from "@/constants/variants";

interface IButtonProps extends ButtonProps {
  Icon: IconType;
  iconClassname?: string;
}

/**
 * Minimal button with icon and title for tooltip
 * @param className - additional class name
 * @param title - tooltip title
 * @param Icon - icon component
 * @param iconClassname - additional class name for icon
 * @param otherProps - other button props
 * @constructor
 */
export function MinimalButton({
  className,
  title,
  Icon,
  iconClassname,
  ...otherProps
}: IButtonProps) {
  return (
    <MyTooltip title={title}>
      <Button
        variant="ghost"
        className={cn("fit p-0.5 text-muted-foreground", className)}
        {...otherProps}
      >
        <Icon className={cn(iconVariants({ size: "sm" }), iconClassname)} />
      </Button>
    </MyTooltip>
  );
}
