"use client";
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
import RenderIf from "@/components/shared/RenderIf";
import { UserAvatar } from "@/components/user/UserAvatar";
import { UserMenuItem } from "./UserMenuItem";

import { useTheme } from "@/hooks/useTheme";
import { useGetDictionary } from "@/hooks";
import { TbBell } from "react-icons/tb";
import { useUiStore } from "@/stores/zustand/ui-store";

import useCheckSidePanelOpen from "@/components/layout/side-panel/hooks/useCheckSidePanelOpen";
import { cn } from "@/lib/utils";
import { MinimalButton } from "@/components/shared";

/**
 * a hover card used in bottom of side panel
 * by hover open a menu
 * by click open user panel dialog
 * @constructor
 */

export function UserMenu() {
  const setHovered = useUiStore.use.setIsHoverOnSidePanel();
  const setUserPanelActiveMenu = useUiStore.use.setUserPanelActiveMenu();
  const setOpenUserPanelDialog = useUiStore.use.setOpenUserPanelDialog();

  useTheme(); //for apply prev selected theme in first load
  const isOpenSidePanel = useCheckSidePanelOpen();

  const {
    components: {
      user: { menu: userMenuDictionary },
    },
  } = useGetDictionary();

  const useInfoTextClass =
    "capitalize text-[11px] font-normal overflow-hidden text-ellipsis whitespace-nowrap max-w-[160px]";

  const { data: session } = useSession();

  /**
   * open user panel dialog
   * @param menu if menu passed select go to target menu panel after open dialog
   */
  const handleOpenAccountDialog = (menu?: string) => {
    setOpenUserPanelDialog(true);
    setHovered(false);
    if (menu) {
      setUserPanelActiveMenu(menu);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 px-3",
        isOpenSidePanel ? "flex-row" : "flex-col-reverse",
      )}
    >
      <HoverCard openDelay={100} closeDelay={0}>
        <HoverCardTrigger asChild>
          <div>
            {/*
              on hover open user menu and on click open user panel dialog
            */}
            <UserAvatar
              imageSrc={session?.user?.image || ""}
              name={session?.user?.name || ""}
              onClick={() => handleOpenAccountDialog()}
              className="border-gradiant hover-border-gradiant z-50 cursor-pointer"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          className="col w-56 p-1 text-start"
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
      <RenderIf isTrue={isOpenSidePanel}>
        <div className="spacing-row w-full ">
          <div className="col">
            <p className="max-w-[18ch] overflow-hidden text-ellipsis text-nowrap capitalize">
              {session?.user?.name || "User"}
            </p>
            <span className="text-xs font-light text-muted-foreground">
              Free
            </span>
          </div>

          <MinimalButton
            Icon={TbBell}
            title="Notification"
            iconClassname="h-5 w-5"
          />
        </div>
      </RenderIf>

      {/*
        user current plan
        render when side panel is open
      */}
      {/*<RenderIf isTrue={isOpenSidePanel}>*/}
      {/*  <UserBalance handleClick={() => handleOpenAccountDialog("upgrade")} />*/}
      {/*</RenderIf>*/}
    </div>
  );
}
