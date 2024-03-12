import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Stop } from "@/components/svg-icons";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

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
      variant="ghost"
      className={cn(
        "items-center gap-3 rounded-xl bg-primary-light p-4 text-base text-primary hover:text-primary-dark",
        className,
      )}
      onClick={() => console.log("stop responding")}
      {...props}
    >
      <Stop className="fill-primary stroke-primary" />
      {chat.stop_response_button_label}
    </Button>
  );
}
