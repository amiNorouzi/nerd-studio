"use client";
import React from "react";
import { usePathname } from "next/navigation";

import { ToggleSidePanelButton } from "./ToggleSidePanelButton";
import { AppsHeader } from "./apps-header";

import { cn } from "@/lib/utils";
import { headerContent } from "@/constants/header-content";

type IProps = React.ComponentPropsWithoutRef<"header">;

type HeaderContentType = typeof headerContent;
export function Header({ className, ...otherProps }: IProps) {
  const pathName = usePathname();
  const lastPath = pathName.split("/").pop() ?? "";
  return (
    <header
      className={cn("row w-full items-center border-b px-4", className)}
      {...otherProps}
    >
      <ToggleSidePanelButton />

      {/* in this condition check if lastPath is in headerContent.app like(write or chat)
          if it is then we show apps header
       */}
      {lastPath in headerContent.apps ? (
        <>
          {/* we passed apps info like title to header*/}
          <AppsHeader
            {...headerContent.apps[lastPath as keyof HeaderContentType["apps"]]}
          />
        </>
      ) : null}
    </header>
  );
}
