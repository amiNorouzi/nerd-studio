import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SharePopover } from "./share-popover";
import { SharePopoverContent } from "./share-popover-content";
import { HistorySheet } from "./history-sheet";

import { headerContent } from "@/constants/header-content";

type HeaderContentType = typeof headerContent;
type AppType = HeaderContentType["apps"][keyof HeaderContentType["apps"]];
export function AppsHeader(props: AppType) {
  const { title } = props;
  return (
    <div className="flex flex-1 items-center justify-between">
      <div>
        <h6 className="text-base font-semibold">{title}</h6>
        <Link href="/workspace" className="text-muted-foreground">
          My WorkSpace
        </Link>
      </div>

      <Button className="w-[100px] text-sm">Info</Button>

      <div className="flex gap-2">
        <HistorySheet>
          <div>this is content</div>
        </HistorySheet>
        <SharePopover>
          <SharePopoverContent />
        </SharePopover>
      </div>
    </div>
  );
}
