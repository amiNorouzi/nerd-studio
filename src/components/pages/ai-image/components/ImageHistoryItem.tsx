"use client";
import React, { memo } from "react";
import Image from "next/image";

import { TbBookmark, TbTrash } from "react-icons/tb";

import { useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";

import type { HistoryItem } from "@/services/types";
import { MinimalButton } from "@/components/shared";
import { timePassedSince } from "@/lib/date-transform";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useSetFavorites } from "@/services/favorite-history";
import { useHistoryDelete } from "@/services/history";
import { Button } from "@/components/ui/button";
import { DeletePopOver } from "@/components/shared/HistoryItems";
import { BsFillPinAngleFill, BsPinAngle } from "react-icons/bs";
import { useSetPinHistory } from "@/services/pin-history";

/**
 * Image history item component
 * used in image history list(ImageHistory.tsx
 * @param history - history item
 * @param isActive - is selected
 * @param onClick - on click on item handler
 * @constructor
 */
function ImageHistoryItem({
  history,
  isActive,
  onClick,
  favorite,
  pin,
}: {
  history: Answer;
  isActive: boolean;
  onClick: () => void;
  favorite: boolean | null;
  pin: boolean | null;
}) {
  const {
    common: { delete_label, save_label },
    page: { image: imageDictionary },
  } = useGetDictionary();
  const { data: toggleFavoriteAnswer, mutate: mutateFavoriteItems } =
    useSetFavorites();
  const { mutate: mutateDelete } = useHistoryDelete();
  const { data: togglePinAnswer, mutate: mutatePinItems } = useSetPinHistory();

  return (
    <article
      onClick={onClick}
      className={cn(
        "flex h-28 cursor-pointer gap-2 rounded-lg border p-2 hover:border-muted-dark hover:bg-muted-dark",
        isActive && "border-primary bg-primary-light",
      )}
    >
      {/*thumb image*/}
      <Image
        src={history.answer_text[0]}
        alt="image"
        width={100}
        height={100}
        className="h-full w-[75px] rounded-md object-cover"
      />
      <div className="col w-full gap-1">
        <p className="font-xs overflow-hidden text-ellipsis font-normal text-muted-foreground">
          image
        </p>
        <p className="text-[10px] font-normal text-muted-foreground-light">
          {timePassedSince(history.created_at)}
        </p>
        {/*<p className="text-[10px] font-normal text-muted-foreground-light">*/}
        {/*  {history.imageCount} {imageDictionary.generated_count_message}*/}
        {/*</p>*/}
        <div className="mt-auto flex items-center justify-end gap-2 ">
          <Button
            variant="ghost"
            size="icon"
            className={` h-fit w-fit ${pin && "bg-[#F2EEFD]"} p-1 transition-all hover:scale-110`}
          >
            {pin && (
              <BsFillPinAngleFill
                className={cn("fill-primary")}
                onClick={e => {
                  e.stopPropagation();

                  mutatePinItems({
                    answer_id: history.id,
                    is_pinned: false,
                  });
                }}
              />
            )}
            {!pin && (
              <BsPinAngle
                className={cn("fill-muted-foreground-light")}
                onClick={e => {
                  e.stopPropagation();

                  mutatePinItems({
                    answer_id: history.id,
                    is_pinned: true,
                  });
                }}
              />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={` h-fit w-fit ${favorite && "bg-[#F2EEFD]"} p-1 transition-all hover:scale-110`}
          >
            {favorite && (
              <FaBookmark
                className={cn("fill-primary")}
                onClick={e => {
                  e.stopPropagation();

                  mutateFavoriteItems({
                    answer_id: history.id,
                    is_favorite: false,
                  });
                }}
              />
            )}
            {!favorite && (
              <FaRegBookmark
                className={cn("fill-muted-foreground-light")}
                onClick={e => {
                  e.stopPropagation();

                  mutateFavoriteItems({
                    answer_id: history.id,
                    is_favorite: true,
                  });
                }}
              />
            )}
          </Button>
          {/*delete button*/}
          <DeletePopOver item={history} />
        </div>
      </div>
    </article>
  );
}

export default memo(ImageHistoryItem);
