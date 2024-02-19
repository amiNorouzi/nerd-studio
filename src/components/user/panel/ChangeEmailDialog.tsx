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
import Loading from "@/components/shared/Loading";
import { CustomInput, InputWithButton } from "@/components/forms";

import { useGetDictionary } from "@/hooks";

/**
 * change email popover used in user panel account settings panel
 * @constructor
 */
function ChangeEmailDialog() {
  const isSubmitting = false;
  const {
    common: { save_label },
    components: {
      user: { panel: userPanelDictionary },
    },
  } = useGetDictionary();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {userPanelDictionary.account_edit_button_label}
        </Button>
      </DialogTrigger>
      <DialogContent className="col max-h-[100dvh] max-w-lg bg-popover">
        <DialogHeader className="mb-4">
          <DialogTitle>{userPanelDictionary.change_email_title}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={e => handleSubmit(e)}
          className="col w-full gap-2"
          method="POST"
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
      </DialogContent>
    </Dialog>
  );
}

export default ChangeEmailDialog;
