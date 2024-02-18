"use client";
import React from "react";
import { OpenSidePanelButton } from "./OpenSidePanelButton";
import { Workspace } from "@/components/layout/workspace";
import { AppsHeader } from "./apps-header";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { headerContent } from "@/constants/header-content";

type IProps = React.ComponentPropsWithoutRef<"header">;

type HeaderContentType = typeof headerContent;
export function Header({ className, ...otherProps }: IProps) {
  const pathName = usePathname();
  const lastPath = pathName.split("/").pop() ?? "";
  return (
    <header
      className={cn("row h-12 w-full items-center border-b px-5", className)}
      {...otherProps}
    >
      <OpenSidePanelButton />
      {/*<Workspace isHeader />*/}
      {/*<h1>Header</h1>*/}
      {lastPath in headerContent.apps ? (
        <AppsHeader
          {...headerContent.apps[lastPath as keyof HeaderContentType["apps"]]}
        />
      ) : (
        <WorkSpaceHeader />
      )}
    </header>
  );
}

export function WorkSpaceHeader() {
  return <div>hi</div>;
}
