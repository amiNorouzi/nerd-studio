"use client";
import { ReactNode, useRef } from "react";

import { UserAvatar } from "@/components/user";

import { useGetDictionary } from "@/hooks";

import type { ChildrenProps } from "@/services/types";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ChangeUsernameDialog from "./ChangeUsernameDialog";
import ChangeEmailDialog from "./ChangeEmailDialog";
import { DeleteAlertDialog, SettingItem } from "@/components/shared";
import { Button } from "@/components/ui/button";

/**
 * AccountSettings component show the account settings on user panel
 * @constructor
 * @return {JSX.Element} - JSX.Element
 */
function AccountSettings() {
  const {
    components: {
      user: { panel: userPanelDictionary },
    },
  } = useGetDictionary();
  // for handle when click on upload button open file dialog
  const uploadInputRef = useRef<HTMLInputElement>(null);

  //user info
  //TODO: get user info from server
  const user = {
    firstname: "Amir",
    lastname: "Abbasi",
    email: "amir.h.abbas.g@gmail.com",
  };

  return (
    <div className="col gap-2">
      {/*profile settings*/}
      <h4>{userPanelDictionary.account_profile_title}</h4>
      <div className="col mb-4 rounded-md border">
        {/*change avatar*/}
        <SettingItem
          title={userPanelDictionary.account_avatar_label}
          Action={
            <>
              <Button
                variant="outline"
                onClick={() => uploadInputRef.current?.click()}
              >
                {userPanelDictionary.account_edit_button_label}
              </Button>
              <input type="file" hidden ref={uploadInputRef} />
            </>
          }
        >
          <UserAvatar
            imageSrc=""
            firstname={user.firstname}
            lastname={user.lastname}
          />
        </SettingItem>

        {/*change username*/}
        <SettingItem
          title={userPanelDictionary.account_username_label}
          Action={<ChangeUsernameDialog />}
        >
          <p className="text-foreground/80">{`${user.firstname} ${user.lastname}`}</p>
        </SettingItem>

        {/*change password*/}
        <SettingItem
          title={userPanelDictionary.account_password_label}
          Action={<ChangePasswordDialog />}
        >
          <></>
        </SettingItem>

        {/*change email*/}
        <SettingItem
          title={userPanelDictionary.account_email_label}
          Action={<ChangeEmailDialog />}
        >
          <p className="text-foreground/80">{user.email}</p>
        </SettingItem>
      </div>

      {/*danger settings*/}
      <h4>{userPanelDictionary.account_danger_title}</h4>
      <div className="rounded-md border">
        {/*delete account*/}
        <SettingItem
          title={userPanelDictionary.account_danger_title}
          Action={
            <DeleteAlertDialog
              title="Delete Account"
              description="Are you sure you want to delete your account?"
              handleSubmit={() => {}}
            />
          }
        >
          <p className="text-xs text-muted-foreground">
            {userPanelDictionary.delete_account_description}
          </p>
        </SettingItem>
      </div>
    </div>
  );
}

export default AccountSettings;
