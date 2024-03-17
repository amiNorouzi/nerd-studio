import { Button, ButtonProps } from "@/components/ui/button";
import type { IconType } from "react-icons";
import { MyTooltip } from "@/components/shared/myTooltip";
import { cn } from "@/lib/utils";

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
        className={cn("fit p-0.5", className)}
        {...otherProps}
      >
        <Icon size="1rem" className={iconClassname} />
      </Button>
    </MyTooltip>
  );
}
