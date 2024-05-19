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

// const permissionOptions:{title:string,type:string}[] = [{title:'Owner',type:'owner'},{title:'Can Read',type:'read'},{title:'Can Write',type:'write'}]
/**
 * member tab content in workspace page
 * show all members and their permissions
 * @constructor
 */
export function WorkspaceMembers({ workspace_id }: { workspace_id: number }) {
  const [email, setEmail] = useState("");
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const { showSuccess } = useSuccessToast();
  const { showError } = useErrorToast();
  const { data: session } = useSession();

  //deleting member from the workspace
  const {mutate:DeleteMemberMutate,isSuccess:deleteMemberIsSuccess,isError:deleteMemberIsError} = useDeleteUserFromWorkspace()

  //show some toast with actions
  useEffect(() => {
    deleteMemberIsSuccess && showSuccess('member deleted successfully.');
    deleteMemberIsError && showError('member is not deleted');
  }, [deleteMemberIsSuccess,deleteMemberIsError]);

  const {
    common: { search },
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  //get members of the workspace
  const {
    data: members,
    isError,
    error,
    isSuccess,
  } = useGetWorkspaceMembers({ workspace_id });

  //set if the user is the owner of the workspace or not for some actions like deleting and changing permissions
  useEffect(() => {
    if(members && session){
      console.log('owner checking is running');
    const OwnerAccount = members.filter(member=>member.role.title==='owner');
      session.user.email === OwnerAccount[0].user.email && setIsOwner(true)
    }else{
      setIsOwner(false)
    }


  }, [members,session]);

  //invite member with email service

  const {
    mutate: inviteMember,
    isError: isInviteMemberError,
    isSuccess: isInviteMemberSuccess,

    data: invitedMemberResponseData,
    error: invitedMemberError,
  } = useInviteMember({ workspace_id });

  //show toast for invitation action
  useEffect(() => {
    isInviteMemberSuccess && showSuccess('check your email')
    invitedMemberError && showError('enter a correct email')
  }, [isInviteMemberSuccess,invitedMemberError]);
  const countVerifiedMembers = useCallback((members: WorkspaceMember[]) => {
    let verifiedMembers = 0;
    let notVerifiedMembers = 0;

    for (let member of members) {
      if (member.user.is_verified) {
        verifiedMembers++;
      } else {
        notVerifiedMembers++;
      }
    }

    return { verifiedMembers, notVerifiedMembers };
  }, []);

  //error handling of getting members of the workspace
  useEffect(() => {
    if (isError) {
      console.log("error");
      console.log(error);
    }
  }, [error, isError]);

  //handle clicking on the invite button
  const InviteMemberHandler = useCallback(() => {
    if (email.length === 0) {
      showError("Email is not provided yet!");
    }

    inviteMember({
      email,
      workspace_id,
      role:'member_can_read'
    });
  }, [email, inviteMember, showError, workspace_id]);


    return (
      <>
        {!isSuccess && <div>member area</div>

        }
        {isSuccess &&


      <div className='flex flex-row w-full   max-h-page'>
        {/*
        hero section
        show number of members and pending members
      */}
        <div className='flex w-[300px] h-full    '>


<div className='flex flex-col gap-5'>

          <div className=" w-[248px] h-[294px] flex border rounded-xl bg-muted items-center justify-center">
            <span className="text-3xl font-bold">
              {countVerifiedMembers(members).verifiedMembers}
            </span>
            <p className="text-[15px]">{workspaceDictionary.members_label}</p>
          </div>

          <div className="w-[248px] h-[294px] flex border rounded-xl bg-muted items-center justify-center">
            <span className="text-3xl font-bold">
              {countVerifiedMembers(members).notVerifiedMembers}
            </span>
            <p className="row gap-1 text-[15px]">
              {workspaceDictionary.members_pending_label}
              <DescriptionHoverCard
                description={workspaceDictionary.members_pending_description}
              />
            </p>
          </div>

</div>

        </div>
        <div className="flex flex-1  ">
          <div className="flex flex-col w-full gap-5 ">


            {/*search box*/}
            <div className="flex flex-row gap-2">
              <div className="fit relative">
                <Input
                  type="search"
                  className="w-60 bg-muted ps-7 font-light"
                  placeholder={search}
                />
                <FiSearch
                  size="1rem"
                  className="absolute start-2 top-1/2 -translate-y-1/2"
                />
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  {/*invite member button*/}
                  <Button className="w-fit">
                    <LuUserPlus className="me-2 h-4 w-4" />
                    {workspaceDictionary.members_invite_button_label}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md ">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Invite Member</AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="relative ">
                <span className="absolute left-2 top-1/2 -translate-y-1/2">
                  <MdOutlineEmail size={16} className="text-gray-400" />
                </span>
                    <Input
                      placeholder="Email"
                      className="pl-7 ps-7"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <AlertDialogFooter>
                    {/*
                cancel button that close the dialog
              */}
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {/*
                    delete button that call handleSubmit function
                */}
                    <Button variant="destructive" onClick={InviteMemberHandler}>
                      Invite New Member
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className="flex flex-col w-full h-full  gap-2   ">
              <div className='flex flex-row justify-between w-full h-[40px] border-b'>
                <p className='text-muted-foreground-light text-[15px]'>User Name</p>
                <p className='text-muted-foreground-light text-[15px]'>permissions</p>

              </div>
              {members.length > 0 &&
              <div className='flex flex-col gap-5'>
                {members.map((member, index) =>{
                  return(
                    <div className='flex flex-row justify-between border-b pb-4'>
                      <div>

                                <div className="row gap-2" key={member.id}>

                                <UserAvatar
                                  imageSrc=""
                                  name={`${member.user.first_name} ${member.user.last_name}`}
                                />
                                <p className="font-normal capitalize">
                                  {member.user.username}
                                </p>
                              </div>
                      </div>
                      <div className='text-[15px] gap-4  rounded-lg  flex items-center justify-center px-1'>
                        {member.role.title ==='owner' &&
                        <div className='border text-white bg-primary rounded-lg px-1 py-1'>
                          Owner
                        </div>
                        }
                        {
                          isOwner && member.role.title !=='owner' &&


                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              {/*invite member button*/}
                              <div className=" cursor-pointer" >
                                <FaRegTrashCan className="hover:text-muted-foreground rounded-lg " />
                              </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="max-w-md ">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Member</AlertDialogTitle>
                              </AlertDialogHeader>
                              <div className="relative ">
               <span className='text-[15px]'>
                 This will remove the member from the workspace.
               </span>
                              </div>
                              <AlertDialogFooter>
                                {/*
                cancel button that close the dialog
              */}
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                {/*
                    delete button that call handleSubmit function
                */}
                                <Button variant="destructive" onClick={()=>{
                                  DeleteMemberMutate({workspace_id,member_id:member.id})
                                }}>
                                  Delete
                                </Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>



                        }
                        <SelectAndDrawer
                          value={'owner'}
                          setValue={()=>{}}
                          items={member.role.access_level.map(item=>item.title)}
                        />
                      </div>
                    </div>
                  )
                })}

              </div>
              }
            </div>
          </div>
        </div>

      </div>
        }
      </>
    );
}
