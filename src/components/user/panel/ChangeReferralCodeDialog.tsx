"use client";
import { FormEvent } from "react";

import { CustomInput } from "@/components/forms";

import { useGetDictionary } from "@/hooks";
import { SettingsDialog } from "@/components/shared";

/**
 * change referral code dialog used in user panel account settings panel
 * @constructor
 */
function ChangeReferralCodeDialog() {
  const {
    components: {
      user: { panel: userPanelDictionary },
    },
  } = useGetDictionary();

  //form submit handler
  //TODO: implement
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {};

  return (
    <SettingsDialog
      triggerBtnVariant="ghost"
      onSubmit={handleSubmit}
      triggerBtnLabel={userPanelDictionary.referral_code_edit_title}
      triggerBtnClass="text-primary hover:text-primary/70 hover:bg-transparent"
      title={userPanelDictionary.referral_code_edit_title}
    >
      <CustomInput
      // value={formValues.oldPass}
      // onChange={handleChange}
      />
    </SettingsDialog>
  );
}

export default ChangeReferralCodeDialog;
