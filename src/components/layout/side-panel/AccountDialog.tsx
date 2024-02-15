"use client";
import { useEffect } from "react";

import { RiLogoutCircleRLine } from "react-icons/ri";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AccountMenuItem } from "./AccountMenuItem";
import { AppearanceSettings } from "./AppearanceSettings";

import { cn } from "@/lib/utils";

import {
  accountSettingsItems,
  generalSettingsItems,
} from "@/constants/account-menu";
import { LanguageSettings } from "@/components/layout/side-panel/LanguageSettings";
import { About } from "@/components/layout/side-panel/About";
import { Connections } from "@/components/layout/side-panel/Connections";

interface IProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  activeMenu: string;
  setActiveMenu: (val: string) => void;
}

export function AccountDialog({
  isOpen,
  setIsOpen,
  activeMenu,
  setActiveMenu,
}: IProps) {
  useEffect(() => {
    if (!isOpen) {
      setActiveMenu("account");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex h-5/6 gap-0 overflow-hidden p-0 sm:max-w-5xl">
        <div className="col relative h-full w-60 border-e bg-popover p-2 pt-5">
          <h2 className="mb-2 ms-2">Account</h2>
          {accountSettingsItems.map(item => (
            <AccountMenuItem
              classNames={cn(
                "mb-1",
                activeMenu === item.key && "bg-active text-primary",
              )}
              title={item.title}
              icon={item.icon}
              key={item.id}
              onClick={() => setActiveMenu(item.key)}
            />
          ))}
          <h2 className="mb-2 ms-2 mt-4">General</h2>
          {generalSettingsItems.map(item => (
            <AccountMenuItem
              classNames={cn(
                "mb-1",
                activeMenu === item.key && "bg-active text-primary",
              )}
              title={item.title}
              icon={item.icon}
              key={item.id}
              onClick={() => setActiveMenu(item.key)}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 border-t p-2">
            <AccountMenuItem
              onClick={() => {}}
              title="Logout"
              icon={RiLogoutCircleRLine}
            />
          </div>
        </div>
        <div className="h-full flex-grow px-12 py-6">
          <h3 className="mb-4 border-b pb-1 text-[15px] font-semibold">
            {
              [...accountSettingsItems, ...generalSettingsItems].find(
                item => item.key === activeMenu,
              )?.title
            }
          </h3>
          {
            {
              connections: <Connections />,
              appearance: <AppearanceSettings />,
              language: <LanguageSettings />,
              about: <About />,
            }[activeMenu]
          }
        </div>
      </DialogContent>
    </Dialog>
  );
}
