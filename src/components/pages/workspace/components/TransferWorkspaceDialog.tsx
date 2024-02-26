"use client";
import { FormEvent } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetDictionary } from "@/hooks";
import { SettingsDialog } from "@/components/shared";

/**
 * transfer workspace to other members dialog used in workspace settings dialog
 * @constructor
 */
function TransferWorkspaceDialog() {
  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {};

  return (
    <SettingsDialog
      onSubmit={handleSubmit}
      triggerBtnLabel={workspaceDictionary.setting_transfer_label}
      title={workspaceDictionary.transfer_workspace_title}
      submitBtnLabel={workspaceDictionary.setting_transfer_label}
    >
      {/*
        select member to transfer workspace to
        TODO: get members from server
      */}
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              workspaceDictionary.transfer_workspace_select_placeholder
            }
          />
        </SelectTrigger>
        <SelectContent>
          {/*
            TODO: get members from server and map through it and render SelectItem
          */}
          <SelectItem value="light">Ali Reza Kamali</SelectItem>
        </SelectContent>
      </Select>
    </SettingsDialog>
  );
}

export default TransferWorkspaceDialog;
