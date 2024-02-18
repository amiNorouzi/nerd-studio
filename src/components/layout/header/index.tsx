"use client";
import React from "react";
import { OpenSidePanelButton } from "./OpenSidePanelButton";
import { Workspace } from "@/components/layout/workspace";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type IProps = React.ComponentPropsWithoutRef<"header">;

const headerContent = {
  apps: {
    write: {
      title: "write",
    },
  },
};

export function Header({ className, ...otherProps }: IProps) {
  const pathName = usePathname();
  const lastPath = pathName.split("/").pop() ?? "";
  return (
    <header
      className={cn("row h-12 w-full border-b px-2", className)}
      {...otherProps}
    >
      {/*<OpenSidePanelButton />*/}
      {/*<Workspace isHeader />*/}
      {/*<h1>Header</h1>*/}
      {Object.keys(headerContent.apps).includes(lastPath) ? (
        <AppsHeader />
      ) : (
        <WorkSpaceHeader />
      )}
    </header>
  );
}

export function AppsHeader() {
  return <div>hello</div>;
}
export function WorkSpaceHeader() {
  return <div>hi</div>;
}
