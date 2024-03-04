import { IconType } from "react-icons";

import { Button } from "@/components/ui/button";
import RenderIf from "@/components/shared/RenderIf";

import { cn } from "@/lib/utils";

interface IItemProps {
  title: string;
  icon: IconType;
  onClick?: () => void;
  classNames?: string;
}

/**
 * button used as item of menu
 * @param title button title
 * @param onClick butte=on click handler
 * @param Icon used in left side of title in button
 * @param classNames extra classNames
 * @constructor
 */
export function UserMenuItem({ title, onClick, icon, classNames }: IItemProps) {
  const Icon = icon;

  return (
    <Button
      variant="ghost"
      className={cn(
        "h-fit w-full px-2.5 py-2 text-foreground/70 hover:bg-hover hover:text-primary-light focus-visible:ring-offset-0",
        classNames,
      )}
      onClick={onClick}
    >
      <RenderIf isTrue={!!icon}>
        <Icon className="mr-2 h-5 w-5" />
      </RenderIf>
      <span className="w-full text-start font-normal capitalize">{title} </span>
    </Button>
  );
}
