"use client";
import { FormEvent } from "react";

import { CustomInput, InputWithButton } from "@/components/forms";
import { SettingsDialog } from "@/components/shared";

import { useGetDictionary } from "@/hooks";

/**
 * change email popover used in user panel account settings panel
 * @constructor
 */
function ChangeEmailDialog() {
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
      onSubmit={handleSubmit}
      triggerBtnLabel={userPanelDictionary.account_edit_button_label}
      title={userPanelDictionary.change_email_title}
    >
      <CustomInput
        placeholder={userPanelDictionary.email_input_placeholder}
        rootClassName="mb-2"
        type="email"
        // value={formValues.oldPass}
        // onChange={handleChange}
      />

      <InputWithButton
        btnTitle={userPanelDictionary.change_email_send_code_button_label}
        btnVariant="outline"
        btnClassName="text-primary"
        handleClickButton={() => {}}
      />
    </SettingsDialog>
  );
}

export default ChangeEmailDialog;
