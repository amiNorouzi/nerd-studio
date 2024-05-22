"use client";

import { useParams, useRouter } from "next/navigation";

import {  IoMdMore } from "react-icons/io";


import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";

import type { WorkspaceList } from "@/services/types";
import { AllApps, useDeleteApps, useMoveAppToWorkspace } from "@/services/workspace";
import { PiArrowBendDoubleUpRightLight } from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useSuccessToast from "@/hooks/useSuccessToast";
import useErrorToast from "@/hooks/useErrorToast";
import useMediaQuery from "@/hooks/useMediaQuery";

/**
 * installed app card used in workspace app list tab
 * @param app - app item
 * @constructor
 */

interface Props{
  workspaces:WorkspaceList[]  | undefined,
  app: AllApps ,workspace_id:number
  appId:number
}
function InstalledAppCard({ app,workspace_id ,workspaces,appId}: Props) {
  // get language from url for adding start of link href
  const { lang } = useParams();
  const [open, setOpen] = useState(false);

  //open move modal for mobile size
  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  // move and delete services for apps
  const {mutate:DeleteMutate,isSuccess:DeleteIsSuccess,isError:DeleteIsError,error:DeleteErrorResponse} = useDeleteApps()
  const {mutate:MoveMutate,isSuccess:MoveIsSuccess,isError:MoveIsError,error:MoveErrorResponse} =useMoveAppToWorkspace({sourceWorkspace:workspace_id})

  //using router to navigate user to the template page with the selected App
  const router = useRouter();

//states for popover
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

  const { showSuccess } = useSuccessToast();
  const { showError } = useErrorToast();
// show toasts for actions
  useEffect(() => {
    DeleteIsSuccess && showSuccess('App is deleted')
    DeleteIsError && showError('App not deleted')
    MoveIsSuccess && showSuccess('App is moved')
    MoveIsError && showError('could not move the app')
  }, [DeleteIsSuccess,DeleteIsError,MoveIsSuccess,MoveIsError]);
  return (
    // Link to app detail page
    <div>
    <div onClick={()=>{
      console.log('clicked on link');
      router.push(`/${lang}/template/${app.id}`)
    }}>
      <article className="row group w-full cursor-pointer gap-2 rounded-md border bg-background p-4 transition-all duration-300 hover:shadow-card-hover">

        <div className='h-10 w-10 rounded-xl bg-green-400'></div>
        <h3>{app.topic}</h3>

        <Popover open={outerOpen} onOpenChange={setOuterOpen}>
          <PopoverTrigger asChild>

            <Button
              variant="ghost"
              size="icon"
              className="h-fit w-fit p-1 transition-all hover:scale-110 ml-auto"
              onClick={e => {
e.stopPropagation()
                setOuterOpen(true);
              }}
            >
              <IoMdMore size="1rem"    />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex  w-[116px] h-[85px] rounded-lg flex-col gap-4 items-center justify-center" collisionPadding={30}>

            <div className="flex flex-col w-full   gap-2">

              <Popover open={innerOpen} onOpenChange={setInnerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={e => {
                      e.stopPropagation();
                      setInnerOpen(true);
                    }}
                  >
                    <PiArrowBendDoubleUpRightLight /> move
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
                                   MoveMutate({ app_id: appId, workspace_id: item.workspace.id });
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
              <Button
                      variant="outline"
                      className="border bg-inherit text-destructive hover:border-destructive hover:bg-inherit hover:text-destructive"
                      onClick={e => {


                        e.stopPropagation();
                        DeleteMutate({workspace_id:workspace_id, app_id:appId})
                        setOuterOpen(false);

                      }}
                    >
                      <FaRegTrashCan />delete
                    </Button>
            </div>
          </PopoverContent>
        </Popover>

      </article>

    </div>

    </div>
  );
}

export default InstalledAppCard;

