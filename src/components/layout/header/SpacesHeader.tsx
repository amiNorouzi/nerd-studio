import React from "react";
import { ToggleSidePanelButton } from "@/components/layout/header/ToggleSidePanelButton";
import { Workspace } from "@/components/layout/workspace";
import { ChildrenProps } from "@/services/types";
import { cn } from "@/lib/utils";

interface IProps {
  rootClassName?: string;
  childrenWrapperClassName?: string;
}

/**
 * header component used in workspace, app store and dashboard
 * @param rootClassName extra classNames for root div element
 * @param childrenWrapperClassName extra classNames for children wrapper div element
 * @param children
 * @constructor
 */
function SpacesHeader({
  rootClassName,
  childrenWrapperClassName,
  children,
}: ChildrenProps<IProps>) {
  return (
    <header
      className={cn(
        "h-header row w-full border-b bg-background px-2 pt-2",
        rootClassName,
      )}
    >
      <div className="row pb-2">
        <ToggleSidePanelButton />
        <Workspace isHeader />
      </div>
      <div className={cn("row h-full w-full pb-2", childrenWrapperClassName)}>
        {children}
      </div>
    </header>
  );
}

export default SpacesHeader;
