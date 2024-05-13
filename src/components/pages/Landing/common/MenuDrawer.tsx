"use client";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { TbHistory, TbSearch } from "react-icons/tb";
import { useMediaQuery } from "usehooks-ts";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

import { useHistoryStore } from "@/stores/zustand/history-store";

import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import { iconVariants } from "@/constants/variants";
import { useUiStore } from "@/stores/zustand/ui-store";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

/**
 * this component is a wrapper for history content(history items)
 * @param children - history items
 * @param className
 * @param props
 * @constructor
 */
export function MenuDrawer({ children, className, ...props }: IProps) {
  const setDrawer = useUiStore.use.setIsLandingDrawerOpen()
  const  isDrawerOpen= useUiStore.use.isLandingDrawerOpen()
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const {
    components: { history_box },
  } = useGetDictionary();


  return (
    <Drawer direction='top' open={isDrawerOpen} onOpenChange={setDrawer}  >
      <DrawerContent  className="w-screen h-[230px]  pt-0 mt-[2rem] top-0 gap-2 border-0 bg-muted border-b outline-0 rounded-none backdrop-blur-sm   ">

        {children}
      </DrawerContent>
    </Drawer>
  );
}
