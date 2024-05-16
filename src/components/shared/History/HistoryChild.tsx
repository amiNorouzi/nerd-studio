'use client'
import { cn } from "@/lib/utils";

import { useHistoryVersion } from "@/services/history";
import { timePassedSince } from "@/lib/date-transform";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { PiArrowElbowDownRightLight } from "react-icons/pi";
import { HistoryVersion, Version } from "@/types/history";

interface Props{
  uuid:string
  versions:Version
  appType:string
  mainAnswer:string
}

export function HistoryChild({uuid,versions,appType,mainAnswer}:Props){

  const setSelectHistoryItem = useHistoryStore.use.setSelectHistoryItem();
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();

  const clickHandler = (data:Version)=>{
  const obj = {
 id:data.id,
    answer_text:data.answer_text,
    uuid:uuid,
    app_type:appType,
    created_at:versions.updated_at

  }
    setSelectHistoryItem(obj)
  }
  return(
    <>
      {versions.answer_text !== mainAnswer &&
        <div className='flex flex-row'>
          <div className='flex w-[10%]'>

          <PiArrowElbowDownRightLight className='text-[30px] text-blue-300'/>
          </div>
        <div onClick={()=>clickHandler(versions)} className={cn("mt-1 h-full flex w-[90%] items-start cursor-pointer   px-2 bg-white border rounded-xl min-h-[60px] ",selectedHistoryItem && selectedHistoryItem.id === versions.id&& 'bg-secondary')}>

          <div className="flex h-[52px] flex-col justify-between  w-full m-2 ">

          <span
            className={cn(
              " w-[115px] truncate font-[400] ",
            )}
          >
                {versions.answer_text}
              </span>

              {" "}
              <span className="text-[#B9BAC0] ml-auto">
                {" "}
                {timePassedSince(versions.updated_at)}
              </span>

            {/*delete and bookmark buttons*/}

          </div>
        </div>
        </div>

      }
    </>

  )


}

