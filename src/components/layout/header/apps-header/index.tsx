import React from "react";
import Link from "next/link";

import { SharePopover } from "./share-popover";
import { SharePopoverContent } from "./share-popover-content";
import { HistorySheet } from "./history-sheet";
import { TabButtons } from "@/components/layout/header/apps-header/tabs-buttons";

import { useGetDictionary } from "@/hooks";
import { headerContent } from "@/constants/header-content";

type HeaderContentType = typeof headerContent;
type AppType = HeaderContentType["apps"][keyof HeaderContentType["apps"]];
export function AppsHeader(props: AppType) {
  const { title: appTitle } = props;
  const {
    components: { apps_header },
  } = useGetDictionary();
  return (
    <div className="flex flex-1 items-center justify-between">
      <div>
        <h6 className="text-[18px] font-semibold">{apps_header[appTitle]}</h6>
        <Link href="/workspace" className="text-muted-foreground">
          My WorkSpace
        </Link>
      </div>
      {/* tabs button (run , info)*/}
      <TabButtons />

      <div className="flex gap-2">
        {/*history button that when click on it ,Sheet open and show history content*/}
        <HistorySheet>
          <div>this is content</div>
        </HistorySheet>
        {/*share button and share popover that contains share link in social media and copy*/}
        <SharePopover>
          <SharePopoverContent />
        </SharePopover>
      </div>
    </div>
  );
}
