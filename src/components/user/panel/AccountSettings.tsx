"use client";
import { ChangeEvent, useRef, useState } from "react";

import { useSession } from "next-auth/react";

import { UserAvatar } from "@/components/user";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ChangeUsernameDialog from "./ChangeUsernameDialog";
import ChangeEmailDialog from "./ChangeEmailDialog";
import { DeleteAlertDialog, SettingItem } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";
import { useGetUserInfo, useUploadProfileImage } from "@/services/user-setting";
import Image from "next/image";

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

  //store uploaded image
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  //get user info
  const {data:userData} =useGetUserInfo()

  //using upload service
  const {mutate,isSuccess,isError} = useUploadProfileImage()


  //handle upload image
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      mutate(file)
    }
  };
  //user info
  const { data: session } = useSession();

  return (
    <div className="col gap-2 ">
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
              <input type="file" hidden ref={uploadInputRef} onChange={handleFileChange}/>
            </>
          }
        >
          <UserAvatar
            imageSrc={userData?.profile_image || ""}
            name={session?.user?.name || ""}
          />


        </SettingItem>

        {/*change username*/}
        <SettingItem
          title={userPanelDictionary.account_username_label}
          Action={<ChangeUsernameDialog />}
        >
          <p className="text-foreground/80">{session?.user?.name}</p>
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
          <p className="text-foreground/80">{session?.user?.email}</p>
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
