"use client";
import { useCallback, useEffect, useState } from "react";


import { useGetDictionary } from "@/hooks";
import { SelectAndDrawer, SettingsDialog } from "@/components/shared";
import { useGetWorkspaceMembers } from "../hooks/useGetWorkspaceMembers";
import useErrorToast from "@/hooks/useErrorToast";
import { useTransferWorkSpaceOwnerShip } from "../hooks/useTransferWorkspaceOwnerShip";
import useSuccessToast from "@/hooks/useSuccessToast";



/**
 * transfer workspace to other members dialog used in workspace settings dialog
 * @constructor
 */
function TransferWorkspaceDialog({ workspace_id }: { workspace_id: number }) {
  //set the user that is chosen to be the new owner
  const [memberEmail, setMemberEmail] = useState<string | null>(null);
  const { showError } = useErrorToast();
  const {showSuccess} = useSuccessToast()
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

//show toast for transfer owner
  useEffect(() => {
    isTransferredOwnershipSuccess && showSuccess('Ownership Successfully changed');
    IsTransferOwnerShipError && showError(' Failed to transfer thw ownership');
  }, [isTransferredOwnershipSuccess,IsTransferOwnerShipError]);



  const onMemberChange = useCallback(async (email: string) => {
    setMemberEmail(email);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!memberEmail || !members) {
      showError("You have to select a member!");
      return;
    } else {
      const newMemberId = members.filter((member) => member.user.email === memberEmail);
      newMemberId.length===1 &&  transferOwnershipTo({ workspace_id, member_id: newMemberId[0].id });
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

      {members &&

      <SelectAndDrawer
        value={memberEmail? memberEmail : ''}
        setValue={(val)=>{
          setMemberEmail(val)
        }}
        items={members.filter(member=>member.role.title!=='owner').map(item=>item.user.email)}
      />
      }
    </SettingsDialog>
  );
}

export default TransferWorkspaceDialog;
