"use client";
import { DeleteAlertDialog } from "@/components/shared";

;
import { IoMdMore } from "react-icons/io";

import { WorkspaceDocument, WorkspaceDocumentProps, WorkspaceList } from "@/services/types";
import { useHistoryStore } from "@/stores/zustand/history-store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { HiArrowLongRight } from "react-icons/hi2";
import { timePassedSince } from "@/lib/date-transform";
import React, { useEffect, useState } from "react";
import { DeletePopOver } from "@/components/shared/History/HistoryItems";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDeleteDocs, useMoveDocToWorkspace } from "@/services/workspace";
import useSuccessToast from "@/hooks/useSuccessToast";
import useErrorToast from "@/hooks/useErrorToast";
import { PiArrowBendDoubleUpRightLight } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

/**
 * installed document card used in workspace app list tab
 * @param document - document item
 * @param app_type
 * @param workspace_id
 * @constructor
 */
interface Props{
  workspaces: WorkspaceList[] | undefined
  document: WorkspaceDocumentProps,
  app_type:string,
  workspace_id:number
  route:string
}

//route names

function InstalledDocCard({ document,app_type,workspace_id,workspaces,route }: Props) {
  //toast components
  const { showSuccess } = useSuccessToast();
  const { showError } = useErrorToast();

  //open and close popovers
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

  //delete and move document to another workspace
  const {mutate:DeleteMutate,isError:DeleteIsError,isSuccess:DeleteIsSuccess} =useDeleteDocs({app_type})
  const {mutate:MoveMutate,isSuccess:MoveIsSuccess ,isError:MoveIsError } =useMoveDocToWorkspace({sourceWorkspace:workspace_id})

  //router
  const router = useRouter()

  //show toast after server actions
  useEffect(() => {
    DeleteIsSuccess && showSuccess('document deleted')
    DeleteIsError && showError('document didnt deleted')
  }, [DeleteIsError,DeleteIsSuccess]);

  useEffect(() => {
    MoveIsSuccess && showSuccess('document moved')
    MoveIsError && showError('document didnt moved')
  }, [MoveIsSuccess,MoveIsError]);

  //handle click on the card
  const  clickHandler= () => {
    const url =`/${route}?item=${document.history.id}`
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    } else {
      router.push(url);
    }
  };

  const items =

      (

        <div onClick={clickHandler}   className='flex flex-col w-full max-w-[285px] ' key={document.id}>


          <div

            className={cn(
              "flex min-h-[73px] w-full cursor-pointer flex-col gap-3 rounded-lg border  bg-white  transition-all hover:bg-muted-dark",

            )}

          >
            {/*title and delete and bookmark button*/}

            <div  className="py-[12px] flex flex-col w-full items-start px-[16px]  gap-2   ">
              <div className="w-full flex flex-row justify-between ">


                {app_type !== "translate" && (
                  <span
                    className={cn(
                      " max-w-[115px] truncate font-[400] overflow-x-hidden",
                    )}
                  >
                {document.history.answer_text}
              </span>
                )}{" "}
                {app_type === "translate" && (
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
                <div className="flex flex-row gap-2 text-[12px]">
                  <DeleteAlertDialog
                    title="Delete Workspace"
                    description="Are you sure you want to delete this Document?"

                    Trigger={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-fit w-fit  transition-all hover:scale-110"
                        onClick={e => {
                          e.stopPropagation();
                          setOuterOpen(true);
                        }}
                      >
                    <FaRegTrashCan className='fill-muted-foreground-light' />
                      </Button>

                    }

                    handleSubmit={()=>{
                      DeleteMutate({workspace_id,document_id:document.id})
                    }}
                  />

                  <Popover open={outerOpen} onOpenChange={setOuterOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-fit w-fit  transition-all hover:scale-110"
                        onClick={e => {
                          e.stopPropagation();
                          setOuterOpen(true);
                        }}
                      >
                        <PiArrowBendDoubleUpRightLight
                          className="fill-muted-foreground-light" // Customize this as needed
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" side="right" className="flex w-[159px] h-auto   flex-col gap-2" collisionPadding={20}>
                      <div onClick={(e) => {
                        e.stopPropagation();

                      }} className="flex flex-col    w-full h-full ">
                        {workspaces && workspaces.map(item => {
                          return (
                            <>
                              {item.workspace.id !== workspace_id &&
                                <div key={item.id} className="h-[30px] w-full flex justify-center items-center rounded-xl cursor-pointer border-b  lg:border-0 hover:bg-gray-200"
                                     onClick={(e) => {
                                       // AddMutate({workspace_id:item.workspace.id , app_id:app.id})
                                       MoveMutate({ document_id:document.id , workspace_id: item.workspace.id });
                                       e.stopPropagation();
                                       setInnerOpen(false);
                                     }}>{item.workspace.name}</div>
                              }
                            </>
                          );
                        })}
                      </div>

                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {/*delete and bookmark buttons*/}

              {/*data and Text & upload*/}
              {/* <div className="flex w-full items-center justify-start gap-8 text-muted-foreground-light">
            <span>48 Min ago</span>
            <span>Text & Upload doc</span>
          </div> */}
            {/*description*/}
            <div className="line-clamp-2 flex flex-row items-center  justify-between  w-full ">
              <div className={'w-full h-auto flex'}>


              {app_type === "grammar" && (
                <div className="flex flex-row items-center gap-2">
                  <p className=" text-[#B9BAC0]"> Spell </p>
                  <HiArrowLongRight className="text-[#B9BAC0]" />{" "}
                  <p className=" "> Your </p>
                </div>
              )}
              {app_type === "translate" && (
                <span
                  className={cn(
                    " mb-1 w-[115px] truncate font-[400]",

                  )}
                >
                {document.history.answer_text}
              </span>
              )}{" "}
              {app_type === "ai_writer" && (
                <span
                  className={cn(
                    " w-[115px] truncate font-[400] text-[#B9BAC0]",

                  )}
                >
                English
              </span>
              )}{" "}
              {app_type === "code" && (
                <span
                  className={cn(
                    " w-[115px] truncate font-[400] text-[#B9BAC0]",

                  )}
                >
                Convert and explanation
              </span>
              )}

              </div>
              <div className={`${app_type === "translate" && "mb-1 "} w-full flex  justify-end`}>
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
