"use client";
import { FormEvent } from "react";

import { CustomInput } from "@/components/forms";
import { SettingsDialog } from "@/components/shared";

import { useGetDictionary } from "@/hooks";

/**
 * edit workspace name dialog used in workspace settings dialog
 * @constructor
 */
function ChangeWorkspaceNameDialog() {
  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  // form submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {};

  return (
    <SettingsDialog
      onSubmit={handleSubmit}
      triggerBtnLabel={workspaceDictionary.edit_button_label}
      title={workspaceDictionary.edit_workspace_name_title}
    >
      <CustomInput
        value="My Workspace"
        // value={formValues.oldPass}
        // onChange={handleChange}
      />
    </SettingsDialog>
  );
}

export default ChangeWorkspaceNameDialog;
