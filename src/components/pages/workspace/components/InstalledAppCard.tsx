"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

import { MdDeleteOutline } from "react-icons/md";
import { IoIosMore, IoMdMore } from "react-icons/io";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";

import type { Workspace, WorkspaceApp, WorkspaceList } from "@/services/types";
import { AllApps, useAddAppToWorkspace, useDeleteApps, useMoveAppToWorkspace } from "@/services/workspace";
import { PiArrowBendDoubleUpRightLight } from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ResponseGetWorkspaceAppsParams } from "@/components/pages/workspace/hooks/useGetWorkspaceApps";
import useSuccessToast from "@/hooks/useSuccessToast";
import useErrorToast from "@/hooks/useErrorToast";

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
  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();
  // console.log('AllApps',app);
  // const {mutate:AddMutate} =useAddAppToWorkspace()
  // move and delete services for apps
  const {mutate:DeleteMutate,isSuccess:DeleteIsSuccess,isError:DeleteIsError,error:DeleteErrorResponse} = useDeleteApps()
  const {mutate:MoveMutate,isSuccess:MoveIsSuccess,isError:MoveIsError,error:MoveErrorResponse} =useMoveAppToWorkspace({sourceWorkspace:workspace_id})

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
    <Link href={`/${lang}/template/${app.id}`}>
      <article className="row group w-full cursor-pointer gap-2 rounded-md border bg-background p-4 transition-all duration-300 hover:shadow-card-hover">

        <div className='h-10 w-10 rounded-xl bg-green-400'></div>
        <h3>{app.topic}</h3>
        {/*hover card that show all action of installed app*/}
        <HoverCard openDelay={10} closeDelay={50}>
          <HoverCardTrigger asChild>
            <Button
              variant="ghost"
              className="fit ms-auto p-1 opacity-0 transition-all duration-200 group-hover:opacity-100 data-[state=open]:opacity-100"
            >
              <IoMdMore size="1rem" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent side="bottom" className="col max-w-36 p-1">
            {/*
              delete action
              with danger text and background color
            */}
            <div className="flex flex-col justify-end gap-2">
              <Popover   open={open} onOpenChange={setOpen} defaultOpen={false}>
                <PopoverTrigger  asChild>




              <Button
                variant="outline"
                onClick={e => {
                  e.stopPropagation();

                }}
              >
                <PiArrowBendDoubleUpRightLight /> move
              </Button>
                </PopoverTrigger>
                {workspaces && workspaces.length>0 &&

                <PopoverContent
                  align='start'
side='right'
                  className="m-0 p-0 w-[70px]"
                  collisionPadding={30}
                >
                  <div onClick={(e)=>e.stopPropagation()} className='flex flex-col    w-[70px] h-full bg-white border'>
                    {workspaces.map(item=>{
                      return(
                        <>
                        {item.workspace.id !== workspace_id &&
                          <div key={item.id} className='h-[30px] w-[70px] cursor-pointer border-b hover:bg-gray-200' onClick={()=>{
                            // AddMutate({workspace_id:item.workspace.id , app_id:app.id})
                            MoveMutate({ app_id:appId,workspace_id:item.workspace.id })
                            setOpen(false)}}>{item.workspace.name}</div>
                        }
                        </>
                      )
                    })}
                  </div>
                </PopoverContent>
                }
              </Popover>
              <Button
                variant="outline"
                className="border bg-inherit text-destructive hover:border-destructive hover:bg-inherit hover:text-destructive"
                onClick={e => {


                  e.stopPropagation();
                  DeleteMutate({workspace_id:workspace_id, app_id:appId})
                }}
              >
                <FaRegTrashCan />delete
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
      </article>
    </Link>
  );
}

export default InstalledAppCard;

