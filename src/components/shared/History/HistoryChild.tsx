'use client'
import { cn } from "@/lib/utils";

import { useHistoryVersion } from "@/services/history";
import { timePassedSince } from "@/lib/date-transform";
import { useHistoryStore } from "@/stores/zustand/history-store";

interface Props{
  uuid:string
  mainAnswer:string
}

export function HistoryChild({uuid,mainAnswer}:Props){

  const {data} = useHistoryVersion({uuid})
  const setSelectHistoryItem = useHistoryStore.use.setSelectHistoryItem();
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();

  const clickHandler = (data:HistoryVersion)=>{
  const obj = {
 id:data.versions[0].id,
    answer_text:data.versions[0].answer_text,
    uuid:data.answer.uuid,
    app_type:data.answer.app_type,
    created_at:data.versions[0].created_at

  }
    setSelectHistoryItem(obj)
  }
  return(
    <>
      {
        data &&
data.versions[0].answer_text !== mainAnswer &&
        <div onClick={()=>clickHandler(data)} className={cn("mt-1 h-full flex w-[90%] items-start cursor-pointer   px-2 bg-white border rounded-xl min-h-[60px] ",selectedHistoryItem && selectedHistoryItem.id === data.versions[0].id&& 'bg-secondary')}>

          <div className="flex h-[52px] flex-col justify-between  w-full m-2 ">

          <span
            className={cn(
              " w-[115px] truncate font-[400] ",
            )}
          >
                {data.versions[0].answer_text}
              </span>

              {" "}
              <span className="text-[#B9BAC0] ml-auto">
                {" "}
                {timePassedSince(data.versions[0].created_at)}
              </span>

            {/*delete and bookmark buttons*/}

          </div>
        </div>

      }
    </>

  )


}

