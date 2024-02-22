"use client";
import { ReactNode, useRef } from "react";

import { UserAvatar } from "@/components/user";

import { useGetDictionary } from "@/hooks";

import type { ChildrenProps } from "@/services/types";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ChangeUsernameDialog from "./ChangeUsernameDialog";
import ChangeEmailDialog from "./ChangeEmailDialog";
import { DeleteAlertDialog } from "@/components/shared";
import { Button } from "@/components/ui/button";

interface ISettingItemProps {
  title: string;
  Action: ReactNode;
}

/**
 * SettingItem component show the setting item with title, Action and children
 * @param title
 * @param Action button or any action
 * @param children
 * @constructor
 */
const SettingItem = ({
  title,
  Action,
  children,
}: ChildrenProps<ISettingItemProps>) => (
  <div className="row border-b px-3 py-4 last:border-b-0">
    <p className="w-40 text-foreground/80">{title}</p>
    <div className="row w-full px-2">{children}</div>
    {Action}
  </div>
);

// AccountSettings component show the account settings on user panel
function AccountSettings() {
  const {
    components: {
      user: { panel: userPanelDictionary },
    },
  } = useGetDictionary();
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const user = {
    firstname: "Amir",
    lastname: "Abbasi",
    email: "amir.h.abbas.g@gmail.com",
  };

  return (
    <div className="col gap-2">
      <h4>{userPanelDictionary.account_profile_title}</h4>
      <div className="col mb-4 rounded-md border">
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

        <SettingItem
          title={userPanelDictionary.account_username_label}
          Action={<ChangeUsernameDialog />}
        >
          <p className="text-foreground/80">{`${user.firstname} ${user.lastname}`}</p>
        </SettingItem>

        <SettingItem
          title={userPanelDictionary.account_password_label}
          Action={<ChangePasswordDialog />}
        >
          <></>
        </SettingItem>

        <SettingItem
          title={userPanelDictionary.account_email_label}
          Action={<ChangeEmailDialog />}
        >
          <p className="text-foreground/80">{user.email}</p>
        </SettingItem>
      </div>

      <h4>{userPanelDictionary.account_danger_title}</h4>
      <div className="rounded-md border">
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
