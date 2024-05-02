"use client";
import { FormEvent, useState } from "react";

import { CustomInput } from "@/components/forms";
import { SettingsDialog } from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import { useSession } from "next-auth/react";
import { useUpdateWorkSpace } from "../hooks/useUpdateWorkSpace";
import useErrorToast from "@/hooks/useErrorToast";

/**
 * edit workspace name dialog used in workspace settings dialog
 * @constructor
 */
function ChangeWorkspaceNameDialog() {
  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();
  const { data:session } = useSession();
  const [workspaceName, setWorkspaceName] = useState(session?.user.workspace.name || "");
  const {showError} = useErrorToast();
  const { mutate: updateWorkspace, isPending, isSuccess, isError, error, data:workspace } = useUpdateWorkSpace();


  // form submit handler
  const myWorkspace = session?.user.workspace;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const newWorkspaceName = e.target[0].value;

    if(myWorkspace?.id)
      updateWorkspace({ workspace_id: myWorkspace?.id, name: newWorkspaceName });
    else 
      showError("No Workspace Found");
  };

  if(isError) {
    console.error(error);
    showError(error.message)
  }

  return (
    <SettingsDialog
      onSubmit={handleSubmit}
      triggerBtnLabel={workspaceDictionary.edit_button_label}
      title={workspaceDictionary.edit_workspace_name_title}
    >
      <CustomInput
        value={workspaceName}
        // value={formValues.oldPass}
        onChange={(e) => setWorkspaceName(e.target.value)}
      />
    </SettingsDialog>
  );
}

export default ChangeWorkspaceNameDialog;
