"use client";
import React, { useMemo } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { FaHtml5 } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa";
import { BsFiletypeDocx } from "react-icons/bs";
import { DownloadIcon, Share } from "@/components/svg-icons";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { PlateEditor } from "@/components/shared/plate-editor/editor";

import { useEditorContext } from "@/stores/contexts/useEditorContext";

import "../styles/editor-section.css";
export function EditorSection() {
  const { editorAndFooterButtonsWrapperRef } = useEditorContext();

  return (
    <div className=" col-span-12 h-fit overflow-hidden  bg-card  lg:col-span-6 lg:h-full xl:col-span-9">
      <EditorSectionHeader />
      <div ref={editorAndFooterButtonsWrapperRef} className="editorWrapper">
        <PlateEditor
          isActiveEditor
          editorValue=""
          onChangeEditorValue={v => console.log(v)}
        />
      </div>
      <EditorSectionFooter />
    </div>
  );
}

const value = ["all work space", "my work space", "second work space"];

const downloadDropdownItems = [
  {
    title: "Copy text",
    Icon: FaRegCopy,
    action: () => console.log("click on copy text"),
  },
  {
    title: "Copy Html",
    Icon: FaHtml5,
    action: () => console.log("click on copy Html"),
  },
  {
    title: "Pdf",
    Icon: FaRegFilePdf,
    action: () => console.log("click on Pdf"),
  },
  {
    title: "MS Word",
    Icon: BsFiletypeDocx,
    action: () => console.log("click on Ms Word"),
  },
] as const;
export function EditorSectionHeader() {
  const dropdownItems = useMemo(
    () =>
      downloadDropdownItems.map(({ title, Icon, action }) => (
        <DropdownMenuItem key={title} onClick={action} className="flex gap-2">
          <Icon />
          {title}
        </DropdownMenuItem>
      )),
    [],
  );
  return (
    <div className="flex justify-between gap-2 p-5">
      <div className="flex flex-1 gap-2">
        <Input
          type="text"
          className="text-xsm h-[42px] w-full max-w-[292px]"
          defaultValue="New Document"
        />
        <Select
          defaultValue={value[0]}
          onValueChange={value => console.log(value)}
        >
          <SelectTrigger className="m-0 h-[42px]  w-full max-w-[292px]">
            <SelectValue
              placeholder="Select a workspace"
              className="text-xsm"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {value.map(item => (
                <SelectItem key={item} value={item} className="text-xsm">
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
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
        <Button variant="outline" className="group h-[42px] w-[42px] p-0">
          <Share />
        </Button>
      </div>
    </div>
  );
}

const characterValueItems = ["Words", "Char", "Sentence", "Token"] as const;
export function EditorSectionFooter() {
  return (
    <div className="h-14">
      <Select
        defaultValue={characterValueItems[0]}
        onValueChange={value => console.log(value)}
      >
        <SelectTrigger className=" h-[42px] w-[200px] border-none">
          <SelectValue placeholder="Select an option" className="text-xsm" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {characterValueItems.map(item => (
              <SelectItem key={item} value={item} className="text-xsm">
                {`Total ${item}: `}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
