"use client";
import { useCallback, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDictionary } from "@/hooks";
import { SettingsDialog } from "@/components/shared";
import { useGetWorkspaceMembers } from "../hooks/useGetWorkspaceMembers";
import useErrorToast from "@/hooks/useErrorToast";
import { useTransferWorkSpaceOwnerShip } from "../hooks/useTransferWorkspaceOwnerShip";

type transferredMemberDataType = {
  workspace_id: number;
  email: string;
};

/**
 * transfer workspace to other members dialog used in workspace settings dialog
 * @constructor
 */
function TransferWorkspaceDialog({ workspace_id }: { workspace_id: number }) {
  const [memberEmail, setMemberEmail] = useState<string | null>(null);
  const { showError } = useErrorToast();

  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();
  const {
    data: members,
    isError,
    error,
    isSuccess,
  } = useGetWorkspaceMembers({ workspace_id });
  const {
    mutate: transferOwnershipTo,
    isError: IsTransferOwnerShipError,
    error: TransferOwnerShipError,
    data: transferredOwnershipData,
    isSuccess: isTransferredOwnershipSuccess,
  } = useTransferWorkSpaceOwnerShip({ workspace_id });

  console.log("Workspace member_id: ", workspace_id);
  console.log("Workspace members: ", members);

  useEffect(() => {
    if (isError) {
      showError(
        "Transferring ownership to ${} was unsuccessful. please try again! ",
      );
      console.error(error);
    }
  }, [error, isError, showError]);

  const onMemberChange = useCallback(async (email: string) => {
    setMemberEmail(email);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!memberEmail) {
      showError("You have to select a member!");
      return;
    } else {
      const transferredMemberData = {
        workspace_id,
        email: memberEmail,
      } as transferredMemberDataType;
      console.log(transferredMemberData);
      transferOwnershipTo({ workspace_id, email: memberEmail });
      return;
    }
  }, [memberEmail, showError, transferOwnershipTo, workspace_id]);

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
      <Select onValueChange={onMemberChange}>
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
          {members?.map(member => (
            <SelectItem key={member.id} value={member.user.email}>
              {member.user.first_name} {member.user.last_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SettingsDialog>
  );
}

export default TransferWorkspaceDialog;
