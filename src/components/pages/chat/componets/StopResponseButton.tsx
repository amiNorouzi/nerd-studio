import { TbPlayerStopFilled } from "react-icons/tb";

import { Button, ButtonProps } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";
import { iconVariants } from "@/constants/variants";

interface IProps extends ButtonProps {}

/**
 * this component is for stop responding that comes from AI
 * @param className
 * @param props
 * @constructor
 */
export function StopResponseButton({ className, ...props }: IProps) {
  const {
    page: { chat },
  } = useGetDictionary();
  return (
    <Button
      variant="secondary"
      className={cn("items-center gap-2 shadow-2xl", className)}
      onClick={() => console.log("stop responding")}
      {...props}
    >
      <TbPlayerStopFilled
        className={cn(
          "fill-primary stroke-primary",
          iconVariants({ size: "md" }),
        )}
      />
      {chat.stop_response_button_label}
    </Button>
  );
}
