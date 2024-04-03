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
import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@/components/svg-icons";

import { useGetDictionary } from "@/hooks";
import { useHandleCopyAndDownloadAction } from "./useHandleCopyAndDownloadAction";

import { downloadDropdownItems, value } from "./constants";
import { Save } from "@/components/svg-icons/Save";
import { SelectAndDrawer } from "@/components/shared";
import { iconVariants } from "@/constants/variants";

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
        buttonStyle="w-full max-w-[230px] px-6 py-1 capitalize"
        itemClassName="capitalize"
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
          <Button variant="ghost" className="fit group bg-muted p-2">
            <DownloadIcon className={iconVariants({ size: "md" })} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuGroup>{dropdownItems}</DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/*save button*/}
      <Button variant="ghost" className="fit group bg-muted p-2">
        <Save className={iconVariants({ size: "md" })} />
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
