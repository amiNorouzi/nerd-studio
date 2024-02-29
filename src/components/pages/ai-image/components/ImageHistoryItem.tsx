"use client";
import { memo } from "react";
import Image from "next/image";

import { MdDeleteOutline } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { MyTooltip } from "@/components/shared/myTooltip";

import { useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";

import type { HistoryItem } from "@/services/types";

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
        "flex h-28 cursor-pointer gap-2 rounded-lg border p-2 hover:bg-muted-dark",
        isActive && "border-primary bg-primary-light",
      )}
    >
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
        <MyTooltip title={delete_label}>
          <Button
            variant="ghost"
            className="fit ms-auto mt-auto p-0 text-destructive"
          >
            <MdDeleteOutline size="1.2rem" />
          </Button>
        </MyTooltip>
      </div>
    </article>
  );
}

export default memo(ImageHistoryItem);
