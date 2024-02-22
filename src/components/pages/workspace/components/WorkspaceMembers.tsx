"use client";

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

const users = [
  {
    id: "1",
    firstname: "Amir",
    lastname: "Abbasi",
    permissions: "owner",
  },
  {
    id: "1",
    firstname: "Ali Reza",
    lastname: "Kamali",
    permissions: "admin",
  },
] as const;

export function WorkspaceMembers() {
  const {
    common: { search },
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  return (
    <>
      <div className="bg-gradiant row mb-5 h-40 w-full justify-around rounded-lg text-center">
        <div className="col gap-1">
          <span className="text-3xl font-bold">2</span>
          <p className="text-[15px]">{workspaceDictionary.members_label}</p>
        </div>

        <div className="col gap-1">
          <span className="text-3xl font-bold">0</span>
          <p className="row gap-1 text-[15px]">
            {workspaceDictionary.members_pending_label}
            <DescriptionHoverCard
              description={workspaceDictionary.members_pending_description}
            />
          </p>
        </div>
      </div>

      <div className="sm: mb-5 flex flex-col justify-between gap-2 border-b pb-4 sm:flex-row sm:items-center">
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

        <Button className="w-fit">
          <LuUserPlus className="me-2 h-4 w-4" />
          {workspaceDictionary.members_invite_button_label}
        </Button>
      </div>

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
          {users.map(item => (
            <TableRow key={item.id} className="[&>td]:py-2">
              <TableCell>
                <div className="row gap-2">
                  <UserAvatar
                    imageSrc=""
                    firstname={item.firstname}
                    lastname={item.lastname}
                  />
                  <p className="font-normal capitalize">
                    {item.firstname} {item.lastname}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-green-600">
                <span className="rounded-md border border-primary bg-active px-2 py-1 font-normal capitalize text-primary">
                  {item.permissions}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
