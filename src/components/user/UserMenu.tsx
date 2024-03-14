"use client";
import { signOut, useSession } from "next-auth/react";

import {
  MdOutlineManageAccounts,
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
import { MinimalButton, Show } from "@/components/shared";
import { PiDiscordLogo } from "react-icons/pi";
import { UserBalanceIcon } from "@/components/svg-icons";

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

  const hasPlan = false;
  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 px-3",
        isOpenSidePanel ? "flex-row" : "flex-col-reverse",
      )}
    >
      <HoverCard openDelay={100} closeDelay={0}>
        <HoverCardTrigger asChild>
          <div className="relative">
            {/*
              on hover open user menu and on click open user panel dialog
            */}
            <UserAvatar
              imageSrc={session?.user?.image || ""}
              name={session?.user?.name || ""}
              onClick={() => handleOpenAccountDialog()}
              className="border-gradiant hover-border-gradiant cursor-pointer"
            />
            <RenderIf isTrue={!isOpenSidePanel}>
              <div className="absolute -end-0.5 bottom-1 z-20 h-2.5 w-2.5 rounded-full border border-background bg-red-500" />
            </RenderIf>
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
            title={userMenuDictionary.community_label}
            icon={PiDiscordLogo}
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
            <Show>
              <Show.When isTrue={hasPlan}>
                <div className="row gap-1 text-xs text-muted-foreground">
                  <UserBalanceIcon className="h-4 w-4 fill-muted-foreground" />
                  67.66
                </div>
              </Show.When>

              <Show.Else>
                <span className="text-xs font-light text-muted-foreground">
                  {userMenuDictionary.free_plan_label}
                </span>
              </Show.Else>
            </Show>
          </div>

          <div className="relative">
            <MinimalButton
              Icon={TbBell}
              title={userMenuDictionary.notification_label}
              iconClassname="h-5 w-5 text-muted-foreground"
            />
            <div className="absolute end-0.5 top-0.5 z-20 h-2 w-2 rounded-full border border-background bg-red-500" />
          </div>
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
