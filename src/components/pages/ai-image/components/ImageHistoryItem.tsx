"use client";
import { memo } from "react";
import Image from "next/image";

import { FaRegTrashCan } from "react-icons/fa6";
import { BsBookmark } from "react-icons/bs";

import { useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";

import type { HistoryItem } from "@/services/types";
import { MinimalButton } from "@/components/shared";

/**
 * Image history item component
 * used in image history list(ImageHistory.tsx
 * @param history - history item
 * @param isActive - is selected
 * @constructor
 */
function ImageHistoryItem({
  history,
  isActive,
}: {
  history: HistoryItem;
  isActive: boolean;
}) {
  const {
    common: { delete_label, save_label },
    page: { image: imageDictionary },
  } = useGetDictionary();

  return (
    <article
      className={cn(
        "flex h-28 cursor-pointer gap-2 rounded-lg border p-2 hover:border-muted-dark hover:bg-muted-dark",
        isActive && "border-primary bg-primary-light",
      )}
    >
      {/*thumb image*/}
      <Image
        src={history.thumbnailImage}
        alt={history.title}
        width={100}
        height={100}
        className="h-full w-[75px] rounded-md object-cover"
      />
      <div className="col w-full gap-1">
        <p className="font-xs overflow-hidden text-ellipsis font-normal text-muted-foreground">
          {history.title}
        </p>
        <p className="text-[10px] font-normal text-muted-foreground-light">
          {history.date}
        </p>
        <p className="text-[10px] font-normal text-muted-foreground-light">
          {history.imageCount} {imageDictionary.generated_count_message}
        </p>
        <div className="mt-auto flex items-end justify-end">
          <MinimalButton
            Icon={BsBookmark}
            title={save_label}
            iconClassname={isActive ? "text-primary" : "text-muted-foreground"}
          />
          {/*delete button*/}
          <MinimalButton
            Icon={FaRegTrashCan}
            title={delete_label}
            iconClassname="text-destructive"
          />
        </div>
      </div>
    </article>
  );
}

export default memo(ImageHistoryItem);
