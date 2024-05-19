"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

import { MdDeleteOutline } from "react-icons/md";
import { IoMdMore } from "react-icons/io";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";

import type { WorkspaceDocument } from "@/services/types";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { useFavorites, useSetFavorites } from "@/services/favorite-history";
import { usePinHistory, useSetPinHistory } from "@/services/pin-history";
import { useHistories } from "@/services/history";
import { Answer } from "@/types/history";
import { cn } from "@/lib/utils";
import { BsFillPinAngleFill, BsPinAngle } from "react-icons/bs";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import { timePassedSince } from "@/lib/date-transform";
import { HistoryChild } from "@/components/shared/History/HistoryChild";
import React from "react";
import { DeletePopOver } from "@/components/shared/History/HistoryItems";

/**
 * installed document card used in workspace app list tab
 * @param document - document item
 * @constructor
 */
function InstalledDocCard({ document,appName }: { document: WorkspaceDocument,appName:string }) {

  const setSelectHistoryItem = useHistoryStore.use.setSelectHistoryItem();



  const items =

      (

        <div className='flex flex-col w-full' key={document.id}>


          <div

            className={cn(
              "flex min-h-[73px] w-full cursor-pointer flex-col gap-3 rounded-lg border  bg-white p-2 transition-all hover:bg-muted-dark",

            )}

          >
            {/*title and delete and bookmark button*/}

            <div className="mt-1 flex w-full items-start  justify-between  px-2">
              {appName !== "translate" && (
                <span
                  className={cn(
                    " w-[115px] truncate font-[400]",

                  )}
                >
                {document.history.answer_text}
              </span>
              )}{" "}
              {appName === "translate" && (
                <div className=" flex flex-col gap-2.5 ">
                <span
                  className={cn(
                    " w-[115px] truncate text-[12px] font-[400]",

                  )}
                >
                  English to Persian
                </span>
                  <div>
                    {" "}
                    <span className=" text-[#B9BAC0]"> text & upload doc</span>
                  </div>
                </div>
              )}
              {/*delete and bookmark buttons*/}

            {/*data and Text & upload*/}
            {/* <div className="flex w-full items-center justify-start gap-8 text-muted-foreground-light">
            <span>48 Min ago</span>
            <span>Text & Upload doc</span>
          </div> */}
            {/*description*/}
            <div className="mt-1 line-clamp-2 flex flex-row items-center  justify-between  px-2">
              {appName === "grammar" && (
                <div className="flex flex-row items-center">
                  <p className="mx-1 text-[#B9BAC0]"> Spell </p>
                  <HiArrowLongRight className="text-[#B9BAC0]" />{" "}
                  <p className="mx-1 "> Your </p>
                </div>
              )}
              {appName === "translate" && (
                <span
                  className={cn(
                    " mb-1 w-[115px] truncate font-[400]",

                  )}
                >
                {document.history.answer_text}
              </span>
              )}{" "}
              {appName === "ai_writer" && (
                <span
                  className={cn(
                    " w-[115px] truncate font-[400] text-[#B9BAC0]",

                  )}
                >
                English
              </span>
              )}{" "}
              {appName === "code" && (
                <span
                  className={cn(
                    " w-[115px] truncate font-[400] text-[#B9BAC0]",

                  )}
                >
                Convert and explanation
              </span>
              )}
              <div className={`${appName === "translate" && "mb-1 "}`}>
                {" "}
                <span className="text-[#B9BAC0]">
                {" "}
                  {timePassedSince(document.history.created_at)}
              </span>
              </div>
            </div>
          </div>

        </div>
        </div>
      )

  return (
    <div className="flex w-full flex-col items-center justify-start gap-3 overflow-y-auto">
      {items}
    </div>
  );
}

export default InstalledDocCard;
