"use client";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

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

import useCheckSidePanelOpen from "@/components/layout/side-panel/hooks/useCheckSidePanelOpen";
import { accountSettingsItems } from "@/constants/user-panel";
import { cn } from "@/lib/utils";

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

  const { data: session } = useSession();

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
        "flex w-full items-center gap-1.5 px-3",
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
              imageSrc={session?.user?.image || ""}
              name={session?.user?.name || ""}
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
              imageSrc={session?.user?.image || ""}
              name={session?.user?.name || ""}
            />
            <div className="col gap-[1px]">
              <p className={useInfoTextClass}>{session?.user?.name}</p>
              <p className={cn(useInfoTextClass, "text-muted-foreground")}>
                {session?.user?.email}
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
            onClick={() => signOut()}
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
