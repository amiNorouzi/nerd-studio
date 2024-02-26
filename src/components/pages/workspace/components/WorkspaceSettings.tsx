"use client";
import { DeleteAlertDialog, SettingItem } from "@/components/shared";
import ChangeWorkspaceNameDialog from "./ChangeWorkspaceNameDialog";
import TransferWorkspaceDialog from "./TransferWorkspaceDialog";

import { useGetDictionary } from "@/hooks";

/**
 * settings tab content in workspace page
 * contains workspace settings like change name, transfer and delete workspace
 * @constructor
 */
export function WorkspaceSettings() {
  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  return (
    <>
      {/* basic settings */}
      <h4 className="mb-1.5 text-[15px] font-semibold">
        {workspaceDictionary.basic_setting_title}
      </h4>
      {/* workspace name setting */}
      <div className="col mb-5 rounded-md border">
        <SettingItem
          title={workspaceDictionary.setting_name_label}
          Action={<ChangeWorkspaceNameDialog />}
        >
          <p className="text-foreground/80">My Workspace</p>
        </SettingItem>
      </div>

      {/* danger settings */}
      <h4 className="mb-1.5 text-[15px] font-semibold">
        {workspaceDictionary.danger_setting_title}
      </h4>
      <div className="rounded-md border">
        {/*
            transfer workspace ownership to other member
            only workspace owner can transfer workspace
            TODO: implement conditional rendering based on user role(only for owner)
         */}
        <SettingItem
          title={workspaceDictionary.setting_transfer_label}
          Action={<TransferWorkspaceDialog />}
        >
          <p className="text-xs text-muted-foreground">
            {workspaceDictionary.setting_transfer_description}
          </p>
        </SettingItem>

        {/*
            delete workspace
            only workspace owner can delete workspace
            TODO: implement conditional rendering based on user role(only for owner)
        */}
        <SettingItem
          title={workspaceDictionary.setting_delete_label}
          Action={
            <DeleteAlertDialog
              title="Delete Workspace"
              description="Are you sure you want to delete this workspace?"
              handleSubmit={() => {}}
            />
          }
        >
          <p className="text-xs text-muted-foreground">
            {workspaceDictionary.setting_delete_description}
          </p>
        </SettingItem>
      </div>
    </>
  );
}
