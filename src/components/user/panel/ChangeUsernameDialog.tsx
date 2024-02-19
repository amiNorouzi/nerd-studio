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
import { CustomInput } from "@/components/forms";

import { useGetDictionary } from "@/hooks";

/**
 * change username popover used in user panel account settings panel
 * @constructor
 */
function ChangeUsernameDialog() {
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
      <DialogContent className="col max-h-[100dvh] max-w-sm bg-popover">
        <DialogHeader className="mb-4">
          <DialogTitle>{userPanelDictionary.change_username_title}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={e => handleSubmit(e)}
          className="col w-full gap-2"
          method="POST"
        >
          <CustomInput
            placeholder={userPanelDictionary.username_input_placeholder}
            // value={formValues.oldPass}
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
      </DialogContent>
    </Dialog>
  );
}

export default ChangeUsernameDialog;
