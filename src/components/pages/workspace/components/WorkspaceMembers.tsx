"use client";
import { useCallback, useEffect, useState } from "react";

import { LuUserPlus } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";

import { DescriptionHoverCard, SelectAndDrawer } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserAvatar } from "@/components/user";

import { useGetDictionary } from "@/hooks";
import { useGetWorkspaceMembers } from "../hooks/useGetWorkspaceMembers";
import type { WorkspaceMember } from "../types/members";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import useErrorToast from "@/hooks/useErrorToast";
import { useInviteMember } from "../hooks/useInviteMember";
import useSuccessToast from "@/hooks/useSuccessToast";
import { languages } from "@/components/shared/run-tab-for-app/form-section-components/contants";
import { useSession } from "next-auth/react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDeleteUserFromWorkspace } from "@/services/workspace";
import MembersStatus from "@/components/pages/workspace/components/MembersStatus";
import MembersSearchInvite from "@/components/pages/workspace/components/MembersSearchInvite";
import MembersTable from "@/components/pages/workspace/components/MembersTable";
import useIsWorkspaceOwner from "@/hooks/use-isWorkspaceOwner";

// const permissionOptions:{title:string,type:string}[] = [{title:'Owner',type:'owner'},{title:'Can Read',type:'read'},{title:'Can Write',type:'write'}]
/**
 * member tab content in workspace page
 * show all members and their permissions
 * @constructor
 */
export function WorkspaceMembers({ workspace_id }: { workspace_id: number }) {

  const { data: session } = useSession();

  //get members of the workspace
  const {
    data: members,
    isError,
    error,
    isSuccess,
  } = useGetWorkspaceMembers({ workspace_id });

  //set if the user is the owner of the workspace or not for some actions like deleting and changing permissions
  const {isOwner} =useIsWorkspaceOwner({members})


  //error handling of getting members of the workspace
  useEffect(() => {
    if (isError) {
      console.log("error");
      console.log(error);
    }
  }, [error, isError]);


    return (
      <>
        {!isSuccess && <div>member area</div>

        }
        {isSuccess &&


      <div className='flex gap-[24px] flex-col lg:flex-row w-full   max-h-page'>
        {/*members status and count*/}
        <div className='flex w-full  items-center justify-center lg:w-[300px] h-full    '>

              <MembersStatus members={members} />
        </div>
        <div className="flex flex-1  ">
          <div className="flex flex-col w-full gap-5 ">

            {/*members invite and search*/}

            <MembersSearchInvite
              isOwner={isOwner} workspace_id={workspace_id}/>
              {/*members table list*/}
            <MembersTable members={members} isOwner={isOwner} workspace_id={workspace_id}  />
          </div>
        </div>

      </div>
        }
      </>
    );
}
