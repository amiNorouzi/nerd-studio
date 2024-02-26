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

import { UserPanel } from "./panel";
import { UserMenuItem } from "./UserMenuItem";
import { UserAvatar } from "@/components/user/UserAvatar";
import UserBalance from "./UserBalance";
import RenderIf from "@/components/shared/RenderIf";

import { useTheme } from "@/hooks/useTheme";
import { useUiStore } from "@/stores/zustand/ui-store";
import { useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";
import { accountSettingsItems } from "@/constants/user-panel";
import useCheckSidePanelOpen from "@/components/layout/side-panel/hooks/useCheckSidePanelOpen";

/**
 * a hover card used in bottom of side panel
 * by hover open a menu
 * by click open user panel dialog
 * @constructor
 */

export function UserMenu() {
  const setHovered = useUiStore.use.setIsHoverOnSidePanel();
  const [openAccountDialog, setOpenAccountMenu] = useState(false);
  //active panel of user panel dialog
  const [activeMenu, setActiveMenu] = useState<string>(
    accountSettingsItems[0].key,
  );
  useTheme(); //for apply prev selected theme in first load
  const isOpenSidePanel = useCheckSidePanelOpen();

  const {
    components: {
      user: { menu: userMenuDictionary },
    },
  } = useGetDictionary();

  const useInfoTextClass =
    "capitalize text-[11px] font-normal overflow-hidden text-ellipsis whitespace-nowrap";

  //user info
  //TODO: replace with real user info
  const user = {
    firstname: "Amir",
    lastname: "Abbasi",
  };

  /**
   * open user panel dialog
   * @param menu if menu passed select go to target menu panel after open dialog
   */
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
      <HoverCard openDelay={100} closeDelay={200}>
        <HoverCardTrigger asChild>
          <div>
            {/*
              on hover open user menu and on click open user panel dialog
            */}
            <UserAvatar
              imageSrc=""
              firstname={user.firstname}
              lastname={user.lastname}
              onClick={() => handleOpenAccountDialog()}
              className="border-gradiant relative z-50 cursor-pointer"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          className="col !z-100 w-56 p-1 text-start"
          align="start"
          side="top"
          role="dialog"
        >
          {/*user info and avatar*/}
          <div className="row mb-1 gap-2 border-b p-2">
            <UserAvatar
              imageSrc=""
              firstname={user.firstname}
              lastname={user.lastname}
            />
            <div className="col gap-[1px]">
              <p
                className={useInfoTextClass}
              >{`${user.firstname} ${user.lastname}`}</p>
              <p className={cn(useInfoTextClass, "text-muted-foreground")}>
                Amir.h.a@gmail.com
              </p>
            </div>
          </div>
          {/*user menu items*/}
          <UserMenuItem
            onClick={() => {}}
            title={userMenuDictionary.notification_label}
            icon={MdOutlineNotifications}
          />
          <UserMenuItem
            onClick={() => handleOpenAccountDialog("account")}
            title={userMenuDictionary.account_label}
            icon={MdOutlineManageAccounts}
          />
          <UserMenuItem
            onClick={() => handleOpenAccountDialog("appearance")}
            title={userMenuDictionary.preferences_label}
            icon={MdOutlineRoomPreferences}
          />
          <UserMenuItem
            onClick={() => {}}
            title={userMenuDictionary.logout_label}
            icon={RiLogoutCircleRLine}
          />
        </HoverCardContent>
      </HoverCard>
      {/*user panel dialog*/}
      <UserPanel
        isOpen={openAccountDialog}
        setIsOpen={setOpenAccountMenu}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      {/*
        user current plan
        render when side panel is open
      */}
      <RenderIf isTrue={isOpenSidePanel}>
        <UserBalance handleClick={() => handleOpenAccountDialog("upgrade")} />
      </RenderIf>
    </div>
  );
}
