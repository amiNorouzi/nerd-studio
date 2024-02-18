import React from "react";
import Link from "next/link";

import { SharePopover } from "./share-popover";
import { SharePopoverContent } from "./share-popover-content";

import { headerContent } from "@/constants/header-content";

type HeaderContentType = typeof headerContent;
type AppType = HeaderContentType["apps"][keyof HeaderContentType["apps"]];
export function AppsHeader(props: AppType) {
  const { title } = props;
  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <h6 className="text-base font-semibold">{title}</h6>
        <Link href="/workspace" className="text-muted-foreground">
          My WorkSpace
        </Link>
      </div>

      <span className="text-sm">Info</span>

      <SharePopover>
        <SharePopoverContent />
      </SharePopover>
    </div>
  );
}
