"use client";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

import { RiLogoutCircleRLine } from "react-icons/ri";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserMenuItem } from "../UserMenuItem";
import AppearanceSettings from "./AppearanceSettings";
import LanguageSettings from "./LanguageSettings";
import Connections from "./Connections";
import About from "./About";
import AccountSettings from "./AccountSettings";
import Referral from "./Referral";
import Upgrade from "./Upgrade";
import Transactions from "@/components/user/panel/Transactions";
import { IoChevronBackOutline } from "react-icons/io5";
import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";

import {
  accountSettingsItems,
  extraSettingsItems,
  generalSettingsItems,
} from "@/constants/user-panel";

import type { StateSetterType } from "@/services/types";

interface IProps {
  isOpen: boolean;
  setIsOpen: StateSetterType<boolean>;
  activeMenu: string;
  setActiveMenu: StateSetterType<string>;
}

/**
 * user panel dialog open by clicking on user avatar in side panel
 * @param isOpen - state of dialog
 * @param setIsOpen set state of dialog
 * @param activeMenu - active panel in dialog
 * @param setActiveMenu - set active panel in dialog
 * @constructor
 */
export function UserPanel({
  isOpen,
  setIsOpen,
  activeMenu,
  setActiveMenu,
}: IProps) {
  const { panel: userPanelDictionary, menu: menuDictionary } =
    useGetDictionary().components.user;

  //set active panel to first one on close dialog
  useEffect(() => {
    if (!isOpen) {
      setActiveMenu("account");
    }
  }, [isOpen]);

  //get title of active panel
  const getActiveMenuTitle = () => {
    //first get find active panel from list of panels
    //then get i18Key to get i18 value of title form dictionary
    const key = [
      ...accountSettingsItems,
      ...generalSettingsItems,
      ...extraSettingsItems,
    ].find(item => item.key === activeMenu)?.i18Key;

    return userPanelDictionary[key as keyof typeof userPanelDictionary];
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex h-5/6 max-w-[100vw] gap-0 overflow-hidden p-0 text-foreground/80 lg:max-w-5xl">
        {/*
          left side of dialog
          list of panels
          in two category of account and general
        */}
        <div className="col relative h-full w-60 border-e bg-popover p-2 pt-5 lg:min-w-60">
          {/*all panels about account settings*/}
          <h2 className="mb-2 ms-2">
            {userPanelDictionary.account_items_title}
          </h2>
          {accountSettingsItems.map(item => (
            <UserMenuItem
              classNames={cn(
                "mb-1",
                activeMenu === item.key && "bg-active text-primary",
              )}
              title={
                userPanelDictionary[
                  item.i18Key as keyof typeof userPanelDictionary
                ]
              }
              icon={item.icon}
              key={item.id}
              onClick={() => setActiveMenu(item.key)}
            />
          ))}
          {/*all panels about general settings*/}
          <h2 className="mb-2 ms-2 mt-4">
            {userPanelDictionary.general_items_title}
          </h2>
          {generalSettingsItems.map(item => (
            <UserMenuItem
              classNames={cn(
                "mb-1",
                activeMenu === item.key && "bg-active text-primary",
              )}
              title={
                userPanelDictionary[
                  item.i18Key as keyof typeof userPanelDictionary
                ]
              }
              icon={item.icon}
              key={item.id}
              onClick={() => setActiveMenu(item.key)}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 border-t p-2">
            {/*logout button*/}
            <UserMenuItem
              onClick={() => signOut()}
              title={menuDictionary.logout_label}
              icon={RiLogoutCircleRLine}
            />
          </div>
        </div>
        {/*
          right side of dialog
          content of active panel
        */}
        <div className="h-full flex-grow overflow-y-auto px-12 py-6">
          <h3 className="row mb-4 gap-1.5 border-b pb-1 text-[15px] font-semibold">
            <RenderIf isTrue={activeMenu === "transactions"}>
              <Button
                variant="ghost"
                className="fit p-0"
                onClick={() => setActiveMenu("upgrade")}
              >
                <IoChevronBackOutline size="1.2rem" />
              </Button>
            </RenderIf>
            {getActiveMenuTitle()}
          </h3>
          {/*switch component to render suitable panel based on active menu state*/}
          {
            {
              account: <AccountSettings />,
              connections: <Connections />,
              upgrade: <Upgrade setActiveMenu={setActiveMenu} />,
              referral: <Referral />,
              appearance: <AppearanceSettings />,
              language: <LanguageSettings />,
              about: <About />,
              transactions: <Transactions />,
            }[activeMenu]
          }
        </div>
      </DialogContent>
    </Dialog>
  );
}
