import { TbInfoCircle } from "react-icons/tb";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useCopyTextInClipBoard, useGetDictionary } from "@/hooks";

import { dirInLocalStorage } from "@/stores/browser-storage";

import type { HistoryItem } from "@/services/types";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { MinimalButton } from "@/components/shared";
import { UserAvatar } from "@/components/user";

/**
 * Info item box component used in ImageHistoryInfo for rendering information
 * @param text - text to display
 * @param title - title of the box
 * @param rootClassName - additional class name for root div
 * @param contentClassName - additional class name for content div
 * @param renderContents - render additional contents
 * @constructor
 */
const InfoItemBox = ({
  text,
  title,
  rootClassName,
  contentClassName,
  renderContents,
}: {
  text: string;
  title: string;
  rootClassName?: string;
  contentClassName?: string;
  renderContents?: () => ReactNode;
}) => (
  <div className={cn("col gap-2", rootClassName)}>
    <Label>{title}</Label>
    <div
      className={cn(
        "relative w-full rounded-lg border border-foreground p-2.5",
        contentClassName,
      )}
    >
      {renderContents && renderContents()}
      {text}
    </div>
  </div>
);
interface IProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  history: HistoryItem;
}

/**
 * Image history info component used in ImageHistory
 * open a sheet to display information about the selected history item
 * open on click item
 * @param isOpen - is open sheet
 * @param setIsOpen - set state to open/close sheet
 * @constructor
 */
function ImageHistoryInfo({ isOpen, setIsOpen }: IProps) {
  const dir = dirInLocalStorage.get().dir ?? "ltr";
  const side = dir === "ltr" ? "right" : "left";
  const {
    common: { copy },
    page: { image: imageDictionary },
  } = useGetDictionary();
  //for copy prompt
  const [handleCopy, isCopied] = useCopyTextInClipBoard();

  const tags = [
    "Email",
    "Message",
    "Twitter",
    "Social Medias",
    "Instagram",
    "Profile",
    "Youtube",
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side={side} className="w-full max-w-[400px] sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex gap-2 text-sm font-medium text-primary">
            <TbInfoCircle size={20} />
            {imageDictionary.information_title}
          </SheetTitle>
          <div className="mb-5 grid w-full grid-cols-2 content-start gap-5 py-5">
            <InfoItemBox title="State" text="Image to Image" />
            <InfoItemBox
              title="Engine"
              text="Stable Diffusion"
              contentClassName="row gap-1.5"
              renderContents={() => (
                <UserAvatar
                  imageSrc="/images/stable-diffusion.jpg"
                  name="Stable Diffusion"
                  className="h-5 w-5"
                />
              )}
            />
            <InfoItemBox
              title="Prompt"
              rootClassName="col-span-2"
              contentClassName="pb-8"
              renderContents={() => (
                <MinimalButton
                  Icon={isCopied ? LuCopyCheck : LuCopy}
                  title={copy}
                  onClick={() => handleCopy("prompt")}
                  className="absolute bottom-2 end-2 bg-transparent"
                />
              )}
              text=" Draw the man in the picture as a warrior fighting a demon  Draw the man in the picture as a warrior fighting a demon  Draw the man in the picture as a warrior fighting a demon  Draw the man in the picture as a warrior fighting a demon ."
            />

            <InfoItemBox title="Resolution" text="1024 x 1024" />
            <InfoItemBox title="Style" text="Anime" />

            <div className="col col-span-2 gap-2">
              <Label>Tags</Label>
              <div className="row flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="rounded-lg border bg-muted px-2.5 py-1.5"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default ImageHistoryInfo;
