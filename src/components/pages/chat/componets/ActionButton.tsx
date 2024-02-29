import { Button, ButtonProps } from "@/components/ui/button";
import type { IconType } from "react-icons";
import { MyTooltip } from "@/components/shared/myTooltip";

interface IActionButtonProps extends ButtonProps {
  title: string;
  Icon: IconType;
  iconClassname?: string;
}

/**
 * action button for chat card
 * @param title button title fot tooltip
 * @param Icon button icon
 * @param otherProps button props
 * @param iconClassname extra classnames for icon
 * @constructor
 */
function ActionButton({
  title,
  Icon,
  iconClassname,
  ...otherProps
}: IActionButtonProps) {
  return (
    <>
      <MyTooltip title={title}>
        <Button variant="ghost" className="fit p-0.5" {...otherProps}>
          <Icon size="1rem" className={iconClassname} />
        </Button>
      </MyTooltip>
      <div className="vr mx-1 h-5 last:hidden" />
    </>
  );
}

export default ActionButton;
