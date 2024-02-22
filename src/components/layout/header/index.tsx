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
      {lastPath in headerContent.apps ? (
        <AppsHeader
          {...headerContent.apps[lastPath as keyof HeaderContentType["apps"]]}
        />
      ) : null}
    </header>
  );
}
