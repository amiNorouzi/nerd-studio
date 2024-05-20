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

import { useGetDictionary } from "@/hooks";
import { useHandleCopyAndDownloadAction } from "./useHandleCopyAndDownloadAction";

import { downloadDropdownItems, value } from "./constants";
import { SelectAndDrawer } from "@/components/shared";
import { iconVariants } from "@/constants/variants";
import { useEditorStore } from "@/stores/zustand/editor-slice";
import { RiFullscreenExitFill, RiFullscreenFill } from "react-icons/ri";
import { TbDownload } from "react-icons/tb";
import { Save } from "lucide-react";
import { useWorkspaces } from "@/components/pages/workspace/hooks/useWorkspaces";
import { useWorkspaceStore } from "@/stores/zustand/workspace";

function InputAndSelectSpace() {
  //fetch all workspaces available
  const {data:workspaces} = useWorkspaces();

  //using global state to store selected workspace and document name for generating
    const setWorkspaceID = useWorkspaceStore.use.setWorkspaceID()
    const setDocumentName = useWorkspaceStore.use.setDocumentName()

 ;
  const [selectValue, setSelectValue] =
    useState(workspaces? workspaces.map(item=>item.workspace.name)[0] : '');
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
        className="text-xsm w-full max-w-[180px] px-6 py-1"
        defaultValue="New Document"
        onChange={(e)=>{
          setDocumentName(e.target.value)
        }}
      />
      {
        workspaces &&

      <SelectAndDrawer
        value={selectValue}
        setValue={(val)=>{
          setSelectValue(val)
          const selectedID = workspaces!.filter(item=>item.workspace.name === val)[0].workspace.id
          setWorkspaceID(selectedID)
        }}
        items={workspaces.map(workspace=>workspace.workspace.name)}
        buttonStyle="w-full max-w-[180px] px-6 py-1 capitalize"
        itemClassName="capitalize"
      />
      }
    </div>
  );
}

function DownloadAndSaveButtons() {
  const {
    components: { editor_section },
  } = useGetDictionary();
  const { handleCopyAction, handleDownLoadAction } =
    useHandleCopyAndDownloadAction();
  const isFullScreen = useEditorStore.use.isFullScreen();
  const toggleFullScreen = useEditorStore.use.toggleFullScreen();

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
    [editor_section, handleCopyAction, handleDownLoadAction],
  );
  return (
    <div className="flex gap-2">
      <Button
        variant="muted"
        size="icon"
        className=" text-muted-foreground"
        onClick={toggleFullScreen}
      >
        {isFullScreen ? (
          <RiFullscreenExitFill className={iconVariants({ size: "md" })} />
        ) : (
          <RiFullscreenFill className={iconVariants({ size: "md" })} />
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="muted" size="icon" className="text-muted-foreground">
            <TbDownload className={iconVariants({ size: "md" })} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full" align="end" alignOffset={-40}>
          <DropdownMenuGroup>{dropdownItems}</DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/*save button*/}
      <Button variant="muted" className="text-muted-foreground" size="icon">
        <Save className={iconVariants({ size: "md" })} />
      </Button>
    </div>
  );
}

export default function EditorSectionHeader() {
  return (
    <div className="flex flex-col  justify-between gap-2 px-4 pb-1 pt-4 sm:flex-row">
      <InputAndSelectSpace />
      <DownloadAndSaveButtons />
    </div>
  );
}
