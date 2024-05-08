"use client";
import { DeleteAlertDialog, SettingItem } from "@/components/shared";
import ChangeWorkspaceNameDialog from "./ChangeWorkspaceNameDialog";
import TransferWorkspaceDialog from "./TransferWorkspaceDialog";

import { useGetDictionary } from "@/hooks";
import { useSession } from "next-auth/react";
import { useDeleteWorkSpace } from "@/components/pages/workspace/hooks/useDeleteWorkSpace";
import { useCallback } from "react";

/**
 * settings tab content in workspace page
 * contains workspace settings like change name, transfer and delete workspace
 * @constructor
 */
export function WorkspaceSettings({ workspace_id }: { workspace_id: number }) {
  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();
  const { data: session } = useSession();
  const { mutate: deleteWorkSpace } = useDeleteWorkSpace();

  const myWorkspace = session?.user.workspace;

  const deleteWorkspaceHandler = useCallback(() => {
    if (myWorkspace?.id) deleteWorkSpace({ workspace_id: myWorkspace?.id });
  }, [deleteWorkSpace, myWorkspace?.id]);

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
          <p className="text-foreground/80">{myWorkspace?.name}</p>
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
          Action={<TransferWorkspaceDialog workspace_id={workspace_id} />}
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
              handleSubmit={deleteWorkspaceHandler}
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
