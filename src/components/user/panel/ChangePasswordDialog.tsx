"use client";
import { FormEvent, useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { CustomInput } from "@/components/forms";
import { SettingsDialog } from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import { useChangePassword } from "@/services/user-setting";
import useSuccessToast from "@/hooks/useSuccessToast";
import useErrorToast from "@/hooks/useErrorToast";

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

  //toast
  const{showSuccess} =useSuccessToast()
  const {showError}= useErrorToast()

  //old password
  const [oldPassword, setOldPassword] = useState("");

  //new password
  const [newPassword, setNewPassword] = useState("");

  //confirm newPassword
  const[confirmNewPassword, setConfirmNewPassword] = useState("");

  //change password service
  const {mutate,isSuccess,isError} =useChangePassword()

  useEffect(() => {
    isSuccess && showSuccess('password changed successfully')
    isError && showError('password change failed')
  }, [isSuccess,isError]);
  //form submit handler
  //TODO: implement
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    mutate({old_password: oldPassword, new_password: newPassword, confirm_password: confirmNewPassword});
  };

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
        onChange={(e)=>setOldPassword(e.target.value)}
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
        onChange={(e)=>setNewPassword(e.target.value)}
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
        onChange={(e)=>setConfirmNewPassword(e.target.value)}
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
