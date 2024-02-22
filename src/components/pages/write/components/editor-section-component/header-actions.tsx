"use client";
import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DownloadIcon, Share } from "@/components/svg-icons";

import { useGetDictionary } from "@/hooks";
import { useHandleCopyAndDownloadAction } from "@/components/pages/write/hooks";

import { downloadDropdownItems, value } from "./constants";

function InputAndSelectSpace() {
  const items = useMemo(() => {
    return value.map(item => (
      <SelectItem key={item} value={item} className="text-xsm">
        {item}
      </SelectItem>
    ));
  }, []);
  return (
    <div className="flex flex-1 gap-2">
      <Input
        type="text"
        className="text-xsm h-[42px] w-full max-w-[292px]"
        defaultValue="New Document"
      />
      <Select defaultValue={value[0]} onValueChange={v => console.log(v)}>
        <SelectTrigger className="m-0 h-[42px]  w-full max-w-[292px]">
          <SelectValue placeholder="Select a workspace" className="text-xsm" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{items}</SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function DownloadAndSaveButtons() {
  const {
    page: { writing },
  } = useGetDictionary();
  const { handleCopyAction, handleDownLoadAction } =
    useHandleCopyAndDownloadAction();
  const dropdownItems = useMemo(
    () =>
      downloadDropdownItems.map(item => (
        <DropdownMenuItem
          key={item.title}
          onClick={() =>
            item.type === "copy"
              ? handleCopyAction(item.action)
              : handleDownLoadAction(item.download)
          }
          className="flex gap-2"
        >
          <item.Icon />
          {writing[item.title]}
        </DropdownMenuItem>
      )),
    [],
  );
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="group h-[42px] w-[42px] p-0">
            <DownloadIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuGroup>{dropdownItems}</DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/*save button*/}
      <Button variant="outline" className="group h-[42px] w-[42px] p-0">
        <Share />
      </Button>
    </div>
  );
}

export function EditorSectionHeader() {
  return (
    <div className="flex justify-between gap-2 p-5">
      <InputAndSelectSpace />
      <DownloadAndSaveButtons />
    </div>
  );
}
