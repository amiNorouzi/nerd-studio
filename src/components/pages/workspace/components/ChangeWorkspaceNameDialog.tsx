"use client";
import { FormEvent, useEffect, useState } from "react";

import { CustomInput } from "@/components/forms";
import { SettingsDialog } from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import { useSession } from "next-auth/react";
import { useUpdateWorkSpaceName } from "../hooks/useUpdateWorkSpaceName";
import useErrorToast from "@/hooks/useErrorToast";
import { useChangeWorkspaceName } from "@/services/workspace";
import useSuccessToast from "@/hooks/useSuccessToast";

/**
 * edit workspace name dialog used in workspace settings dialog
 * @constructor
 */
function ChangeWorkspaceNameDialog({workspace_id}:{workspace_id:number}) {
  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();
  const { data: session } = useSession();
  const [workspaceName, setWorkspaceName] = useState(
    session?.user.workspace.name || "",
  );
  const { showError } = useErrorToast();
  const {showSuccess} = useSuccessToast()
// custom hook for changing workspace name
  const {mutate:updateWorkspaceName,isError:updateWorkspaceNameIsError,isSuccess:updateWorkspaceNameIsSuccess}=useChangeWorkspaceName({workspace_id})




  // form submit handler
  const myWorkspace = session?.user.workspace;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (myWorkspace?.id)
      updateWorkspaceName({
        name: workspaceName,
      });
    else showError("No Workspace Found");
  };

  useEffect(() => {
    updateWorkspaceNameIsSuccess && showSuccess('workspace name is updated')
    updateWorkspaceNameIsError && showError('could not update workspace name')
  }, [updateWorkspaceNameIsError,updateWorkspaceNameIsSuccess]);

  return (
    <SettingsDialog
      onSubmit={handleSubmit}
      triggerBtnLabel={workspaceDictionary.edit_button_label}
      title={workspaceDictionary.edit_workspace_name_title}
    >
      <CustomInput
        value={workspaceName}
        // value={formValues.oldPass}
        onChange={e => setWorkspaceName(e.target.value)}
      />
    </SettingsDialog>
  );
}

export default ChangeWorkspaceNameDialog;
