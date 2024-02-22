"use client";
import { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Loading from "@/components/shared/Loading";
import { CustomInput } from "@/components/forms";

import { useGetDictionary } from "@/hooks";

/**
 * change password dialog used in user panel account settings panel
 * get current and new password and change user password
 * @constructor
 */
function ChangePasswordDialog() {
  const isSubmitting = false;
  const {
    common: { save_label },
    components: {
      user: { panel: userPanelDictionary },
    },
  } = useGetDictionary();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {};

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

      <Button
        type="submit"
        className="relative mt-4 w-full px-10 sm:ml-auto sm:w-fit md:px-5"
        disabled={isSubmitting}
      >
        {isSubmitting && (
          <div className=" absolute right-1/2 translate-x-1/2">
            <Loading showLabel={false} svgClass="w-5 h-5 z-10" />
          </div>
        )}
        {save_label}
      </Button>
    </form>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {userPanelDictionary.account_password_button_label}
        </Button>
      </DialogTrigger>
      <DialogContent className="col max-h-[100dvh] max-w-md bg-popover">
        <DialogHeader className="mb-4">
          <DialogTitle>{userPanelDictionary.change_password_title}</DialogTitle>
        </DialogHeader>
        {renderMain()}
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordDialog;
