"use client";
import { useState } from "react";

import {
  MdOutlineManageAccounts,
  MdOutlineNotifications,
  MdOutlineRoomPreferences,
} from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AccountDialog } from "./AccountDialog";
import { AccountMenuItem } from "./AccountMenuItem";

import { useTheme } from "@/hooks/useTheme";

import { cn, getFirstLetter } from "@/lib/utils";
import { accountSettingsItems } from "@/constants/account-menu";
import RenderIf from "@/components/shared/RenderIf";
import { UserBalance } from "@/components/layout/side-panel/UserBalance";
import { useUi } from "@/stores/zustand/ui";

export function AccountMenu({ isOpenSidePanel }: { isOpenSidePanel: boolean }) {
  const setHovered = useUi(state => state.setIsHoverOnSidePanel);
  const [openAccountDialog, setOpenAccountMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(accountSettingsItems[0].key);
  useTheme();

  const useInfoTextClass =
    "capitalize text-[11px] font-normal overflow-hidden text-ellipsis whitespace-nowrap";

  const user = {
    firstname: "Amir",
    lastname: "Abbasi",
  };
  const handleOpenAccountDialog = (menu?: string) => {
    setOpenAccountMenu(!openAccountDialog);
    setHovered(false);
    if (menu) {
      setActiveMenu(menu);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full items-center gap-1.5",
        isOpenSidePanel ? "flex-row" : "flex-col-reverse",
      )}
    >
      <HoverCard openDelay={100}>
        <HoverCardTrigger asChild>
          <Avatar
            onClick={() => handleOpenAccountDialog()}
            className="border-gradiant relative z-50 h-9 w-9 cursor-pointer"
          >
            {/*<AvatarImage src={userInfo.image} />*/}
            <AvatarFallback className="bg-primary/30">
              {`${getFirstLetter(user.firstname)}${getFirstLetter(user.lastname)}`}
            </AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent
          className="col !z-100 w-56 p-1 text-start"
          align="start"
          side="top"
          role="dialog"
        >
          <div className="row mb-1 gap-2 border-b p-2">
            <Avatar className=" h-9 w-9">
              {/*<AvatarImage src={userInfo.image} />*/}
              <AvatarFallback className="bg-primary/30">AA</AvatarFallback>
            </Avatar>
            <div className="col gap-[1px]">
              <p
                className={useInfoTextClass}
              >{`${user.firstname} ${user.lastname}`}</p>
              <p className={cn(useInfoTextClass, "text-muted-foreground")}>
                Amir.h.a@gmail.com
              </p>
            </div>
          </div>
          <AccountMenuItem
            onClick={() => {}}
            title="Notifications"
            icon={MdOutlineNotifications}
          />
          <AccountMenuItem
            onClick={() => handleOpenAccountDialog("account")}
            title="Account Settings"
            icon={MdOutlineManageAccounts}
          />
          <AccountMenuItem
            onClick={() => handleOpenAccountDialog("appearance")}
            title="Prefrences"
            icon={MdOutlineRoomPreferences}
          />
          <AccountMenuItem
            onClick={() => {}}
            title="Logout"
            icon={RiLogoutCircleRLine}
          />
        </HoverCardContent>
      </HoverCard>
      <AccountDialog
        isOpen={openAccountDialog}
        setIsOpen={setOpenAccountMenu}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      <RenderIf isTrue={isOpenSidePanel}>
        <UserBalance handleClick={() => handleOpenAccountDialog("upgrade")} />
      </RenderIf>
    </div>
  );
}
