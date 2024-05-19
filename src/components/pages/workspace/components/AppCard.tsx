import { Answer } from "@/types/history";
import React, { useState } from "react";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { useGetDictionary } from "@/hooks";
import { useHistoryDelete } from "@/services/history";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FaRegTrashCan } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { IoIosMore } from "react-icons/io";
import { PiArrowBendDoubleUpRightLight } from "react-icons/pi";

export function   OptionPopover() {
  const [open, setOpen] = useState(false);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-fit w-fit p-1 transition-all hover:scale-110"
          onClick={e => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <IoIosMore
            className={cn(
              "fill-muted-foreground-light text-[20px] text-muted"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[116px] h-[85px] flex-col gap-4 border rounded-xl"
        collisionPadding={30}
      >

        <div className="flex flex-col justify-end gap-2">

          <Button
            variant="outline"
            onClick={e => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            <PiArrowBendDoubleUpRightLight/> move
          </Button>

          <Button
            variant="outline"
            className="border bg-inherit text-destructive hover:border-destructive hover:bg-inherit hover:text-destructive"
            onClick={e => {


              e.stopPropagation();
              setOpen(false);
            }}
          >
            <FaRegTrashCan/>delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}






export const AppCard = ()=>{

  return(
    <div className='flex w-[292px] h-[96px] border rounded-xl items-center  '>
      <div className='flex items-center mx-4 w-full justify-between  '>
        <div className='w-[64px] h-[64px] bg-green-800 rounded-xl border'></div>
        <span className=''>Ai Chatbot</span>

<OptionPopover/>
      </div>
    </div>

  )



}