import React from "react";
import Link from "next/link";
import { HistorySheet } from "./history-sheet";
import { TabButtons } from "@/components/layout/header/apps-header/tabs-buttons";

import { useGetDictionary } from "@/hooks";
import { headerContent } from "@/constants/header-content";
import CreateTemplateButton from "@/components/layout/header/apps-header/create-temlplate-button";
import HighlightSheet from "@/components/layout/header/apps-header/highlight-sheet";

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
        <h6 className="hidden text-[16px] font-semibold md:block">
          {apps_header[appTitle]}
        </h6>
        <Link
          href="/workspace"
          className="hidden text-sm text-muted-foreground md:block"
        >
          My WorkSpace
        </Link>
      </div>
      {/* tabs button (run , info)*/}
      <TabButtons />

      <div className="flex gap-2">
        <CreateTemplateButton />
        <HighlightSheet />
        {/*history button that when click on it ,Sheet open and show history content*/}
        <HistorySheet />
      </div>
    </div>
  );
}
