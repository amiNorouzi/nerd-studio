"use client";
import { useState } from "react";

import { HiMiniPlus } from "react-icons/hi2";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useGetDictionary } from "@/hooks";

//create new workspace dialog open by click on workspaces combo box

export function CreateWorkspaceDialog() {
  const [workspaceName, setWorkspaceName] = useState("");
  const workspaceDictionary = useGetDictionary().components.workspace;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="row w-full justify-start gap-1 px-3 text-primary hover:!bg-hover"
        >
          <HiMiniPlus />
          {workspaceDictionary.workspace_new_button_label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {workspaceDictionary.workspace_create_dialog_title}
          </DialogTitle>
        </DialogHeader>
        <Input
          value={workspaceName}
          onChange={e => setWorkspaceName(e.target.value)}
          placeholder={workspaceDictionary.workspace_create_input_placeholder}
          className="my-2"
        />
        <DialogFooter>
          <Button type="submit">
            {workspaceDictionary.workspace_create_dialog_button_label}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
