"use client";
import { useCallback, useEffect, useState } from "react";

import { LuUserPlus } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";

import { DescriptionHoverCard } from "@/components/shared";
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

// list of workspace members
// TODO: replace with real data from api
//
// const users = [
//   {
//     id: 1,
//     user: {
//       first_name: "Amir",
//       last_name: "Abbasi",
//       email: "Amire@gmail.com",
//       username: "Amir Abbasi",
//       is_active: true,
//       date_joined: "01/01/2024",
//       phone_number: "09354587896",
//       description: "description",
//       is_verified: true,
//     },
//     role: "Admin",
//   },
//   {
//     id: 2,
//     user: {
//       first_name: "Ali",
//       last_name: "Rezaie",
//       email: "Amire@gmail.com",
//       username: "Ali Rezaie",
//       is_active: true,
//       date_joined: "01/01/2024",
//       phone_number: "09354587896",
//       description: "description",
//       is_verified: true,
//     },
//     role: "User",
//   },
// ] as WorkspaceMember[];

/**
 * member tab content in workspace page
 * show all members and their permissions
 * @constructor
 */
export function WorkspaceMembers({ workspace_id }: { workspace_id: number }) {
  const [email, setEmail] = useState("");

  const { showError } = useErrorToast();
  const {
    common: { search },
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();
  const {
    data: members,
    isError,
    error,
    isSuccess,
  } = useGetWorkspaceMembers({ workspace_id });
  const {
    mutate: inviteMember,
    isError: isInviteMemberError,
    isSuccess: isInviteMemberSuccess,
    data: invitedMemberResponseData,
    error: invitedMemberError,
  } = useInviteMember({ workspace_id });

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

  useEffect(() => {
    if (isError) {
      console.log("error");
      console.log(error);
    }
  }, [error, isError]);

  const InviteMemberHandler = useCallback(() => {
    if (email.length === 0) {
      showError("Email is not provided yet!");
    }

    inviteMember({
      email,
      workspace_id,
    });
  }, [email, inviteMember, showError, workspace_id]);

  if (isSuccess)
    return (
      <div>
        {/*
        hero section
        show number of members and pending members
      */}
        <section className="bg-linearGradient row mb-5 h-40 w-full justify-around rounded-lg text-center">
          <div className="col gap-1">
            <span className="text-3xl font-bold">
              {countVerifiedMembers(members).verifiedMembers}
            </span>
            <p className="text-[15px]">{workspaceDictionary.members_label}</p>
          </div>

          <div className="col gap-1">
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
        </section>

        <div className="sm: mb-5 flex flex-col justify-between gap-2 border-b pb-4 sm:flex-row sm:items-center">
          {/*search box*/}
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
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Invite Member</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="relative">
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

        {/*members table*/}
        <Table className="font-normal">
          <TableHeader>
            <TableRow>
              <TableHead>
                {workspaceDictionary.members_user_column_label}
              </TableHead>
              <TableHead>
                {workspaceDictionary.members_permissions_column_label}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length <= 0 && <div>No Members!</div>}
            {members?.length > 0 &&
              members?.map(member => (
                <TableRow key={member.id} className="[&>td]:py-2">
                  <TableCell>
                    {/*user full name and user avatar*/}
                    <div className="row gap-2">
                      <UserAvatar
                        imageSrc=""
                        name={`${member.user.first_name} ${member.user.last_name}`}
                      />
                      <p className="font-normal capitalize">
                        {member.user.first_name} {member.user.last_name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-green-600">
                    {/*user permission(role)*/}
                    <span className="rounded-md border border-primary bg-active px-2 py-1 font-normal capitalize text-primary">
                      {member.role}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
}
