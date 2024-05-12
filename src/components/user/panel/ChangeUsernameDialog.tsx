"use client";
import { FormEvent } from "react";

import { CustomInput } from "@/components/forms";
import { SettingsDialog } from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import { useSession } from "next-auth/react";

/**
 * change username dialog used in user panel account settings panel
 * @constructor
 */
function ChangeUsernameDialog() {
  const { data: session } = useSession();
  const {
    components: {
      user: { panel: userPanelDictionary },
    },
  } = useGetDictionary();

  const user = session?.user;

  //form submit handler
  //TODO: implement
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {};

  return (
    <SettingsDialog
      onSubmit={handleSubmit}
      triggerBtnLabel={userPanelDictionary.account_edit_button_label}
      title={userPanelDictionary.change_username_title}
    >
      <CustomInput
        placeholder={userPanelDictionary.username_input_placeholder}
        value={session?.user?.name?.toString()}
        // onChange={handleChange}
      />
    </SettingsDialog>
  );
}

export default ChangeUsernameDialog;
