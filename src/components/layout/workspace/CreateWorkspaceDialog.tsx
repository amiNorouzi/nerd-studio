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
import { useCreateNewWorkSpace } from "@/components/pages/workspace/hooks/useCreateNewWorkspace";
import useErrorToast from "@/hooks/useErrorToast";
import { useSession } from "next-auth/react";

//create new workspace dialog open by click on workspaces combobox

export function CreateWorkspaceDialog() {
  const { update, data:session } = useSession();
  const [workspaceName, setWorkspaceName] = useState("");
  const {showError} = useErrorToast();
  const workspaceDictionary = useGetDictionary().components.workspace;
  const {mutate:createWorkspaceMutation, isError, error, data:workspace, isSuccess, isPending } = useCreateNewWorkSpace();

  const createNewFromHandler = () => {
    createWorkspaceMutation({ name: workspaceName });
  }

  if(isError) {
    console.error(error);
    showError(error.message)
  }

  if(isSuccess) {
    // update session with created new workspace
    console.log(
      {
        ...session,
        workspace: workspace
      }
    );
    update({
      ...session,
      workspace: workspace
    });
  };

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
          <Button type="submit" onClick={createNewFromHandler}>
            {isPending ? "creating..." : workspaceDictionary.workspace_create_dialog_button_label}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
