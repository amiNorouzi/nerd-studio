import React from "react";
import { OpenSidePanelButton } from "./OpenSidePanelButton";
import { Workspace } from "@/components/layout/workspace";
import { cn } from "@/lib/utils";

type IProps = React.ComponentPropsWithoutRef<"header">;
export function Header({ className, ...otherProps }: IProps) {
  return (
    <header
      className={cn("row h-12 w-full border-b px-2", className)}
      {...otherProps}
    >
      <OpenSidePanelButton />
      <Workspace isHeader />
      <h1>Header</h1>
    </header>
  );
}
