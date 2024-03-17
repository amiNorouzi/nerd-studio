import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {}
export function ChatTools({ className, ...props }: IProps) {
  const {
    page: { chat },
  } = useGetDictionary();
  return (
    <div
      className={cn(
        "grid w-full gap-3 rounded-lg bg-white px-4 py-3",
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-2">
        <Switch id="web-access" />
        <Label htmlFor="web-access" className="col justify-start gap-1">
          <span className="text-xs">{chat.chat_tools_webAccess_label}</span>
          <span className="text-[10px] text-muted-foreground">
            Lorem ipsum dolor sit amet
          </span>
        </Label>
      </div>
      <div className="flex items-start gap-2">
        <Switch id="web-access" />
        <Label htmlFor="web-access" className="col justify-start gap-1">
          <span className="text-xs">{chat.chat_tools_painter_label}</span>
          <span className="text-[10px] text-muted-foreground">
            Lorem ipsum dolor sit amet
          </span>
        </Label>
      </div>
    </div>
  );
}
