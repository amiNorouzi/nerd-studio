"use client";
import { FormEvent } from "react";

import { Label } from "@/components/ui/label";
import { CustomInput } from "@/components/forms";
import { SettingsDialog } from "@/components/shared";

import { useGetDictionary } from "@/hooks";

/**
 * change password dialog used in user panel account settings panel
 * get current and new password and change user password
 * @constructor
 */
function ChangePasswordDialog() {
  const {
    components: {
      user: { panel: userPanelDictionary },
    },
  } = useGetDictionary();

  //form submit handler
  //TODO: implement
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {};

  const renderMain = () => (
    <form
      onSubmit={e => handleSubmit(e)}
      className="col w-full gap-2"
      method="POST"
    >
      {/*old password */}
      <Label htmlFor="old-password">
        {userPanelDictionary.old_password_label}
      </Label>
      <CustomInput
        id="old-password"
        name="oldPass"
        rootClassName="mb-2"
        isPassword
        // value={formValues.oldPass}
        // onChange={handleChange}
      />

      {/*new password */}
      <Label htmlFor="new-password">
        {userPanelDictionary.new_password_label}
      </Label>
      <CustomInput
        id="new-password"
        name="newPass"
        rootClassName="mb-2"
        isPassword
        // value={formValues.oldPass}
        // onChange={handleChange}
      />

      {/*old password */}
      <Label htmlFor="new-password">
        {userPanelDictionary.confirm_password_label}
      </Label>
      <CustomInput
        id="conf-password"
        name="newRePass"
        isPassword
        // value={formValues.newRePass}
        // onChange={handleChange}
      />
    </form>
  );

  return (
    <SettingsDialog
      onSubmit={handleSubmit}
      triggerBtnLabel={userPanelDictionary.account_password_button_label}
      title={userPanelDictionary.change_password_title}
    >
      {renderMain()}
    </SettingsDialog>
  );
}

export default ChangePasswordDialog;
