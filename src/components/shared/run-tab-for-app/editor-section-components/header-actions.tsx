"use client";
import { useMemo, useState } from "react";
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
import { useHandleCopyAndDownloadAction } from "./useHandleCopyAndDownloadAction";

import { downloadDropdownItems, value } from "./constants";
import { Save } from "@/components/svg-icons/Save";
import { SelectAndDrawer } from "@/components/shared";

function InputAndSelectSpace() {
  const [selectValue, setSelectValue] = useState(value[0]);
  const items = useMemo(() => {
    return value.map(item => (
      <SelectItem key={item} value={item} className="text-xsm">
        {item}
      </SelectItem>
    ));
  }, []);
  return (
    <div className="flex flex-1 gap-3">
      <Input
        type="text"
        className=" w-full max-w-[230px] px-6 py-1 text-xsm"
        defaultValue="New Document"
      />

      <SelectAndDrawer
        value={selectValue}
        setValue={setSelectValue}
        items={value}
        buttonStyle="w-full max-w-[230px] px-6 py-1"
      />
    </div>
  );
}

function DownloadAndSaveButtons() {
  const {
    components: { editor_section },
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
          {editor_section[item.title]}
        </DropdownMenuItem>
      )),
    [],
  );
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="group h-[42px] w-[42px] bg-muted p-0"
          >
            <DownloadIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuGroup>{dropdownItems}</DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/*save button*/}
      <Button variant="ghost" className="group h-[42px] w-[42px] bg-muted p-0">
        <Save />
      </Button>
    </div>
  );
}

export function EditorSectionHeader() {
  return (
    <div className="flex flex-col  justify-between gap-2 p-5 sm:flex-row">
      <InputAndSelectSpace />
      <DownloadAndSaveButtons />
    </div>
  );
}
