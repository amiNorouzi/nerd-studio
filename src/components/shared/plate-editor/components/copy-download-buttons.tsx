import React from "react";
import { cn } from "@udecode/cn";
import { CopyButton } from "./copy-button";
import { DownloadDropDown } from "./download-button";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}
export function CopyAndDownloadButtons(props: IProps) {
  const { children, className, ...divAtt } = props;
  return (
    <div
      className={cn(
        "flex space-x-1 bg-blue-100 dark:bg-blue-950 print:hidden",
        className,
      )}
      {...divAtt}
      contentEditable={false}
    >
      {children}
    </div>
  );
}

CopyAndDownloadButtons.CopyButton = CopyButton;
CopyAndDownloadButtons.DownloadDropDown = DownloadDropDown;
