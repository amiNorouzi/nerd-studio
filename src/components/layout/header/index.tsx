"use client";
import React from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import { ToggleSidePanelButton } from "./ToggleSidePanelButton";
import { AppsHeader } from "./apps-header";

import { cn } from "@/lib/utils";
import { headerContent } from "@/constants/header-content";
import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetDictionary } from "@/hooks";

type IProps = React.ComponentPropsWithoutRef<"header">;

type HeaderContentType = typeof headerContent;
export function Header({ className, ...otherProps }: IProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const appPage = searchParams.get("app") ?? "";

  const {
    components: {
      apps_header: { back_to_library_button_label },
    },
  } = useGetDictionary();

  return (
    <header
      className={cn("row w-full items-center border-b px-4", className)}
      {...otherProps}
    >
      <ToggleSidePanelButton />

      {/* in this condition check if lastPath is in headerContent.app like(write or chat)
          if it is then we show apps header
       */}
      {appPage in headerContent.apps ? (
        <>
          {/* we passed apps info like title to header*/}
          <AppsHeader
            {...headerContent.apps[appPage as keyof HeaderContentType["apps"]]}
          />
        </>
      ) : null}

      <RenderIf isTrue={pathname.includes("/template/custom-template/create")}>
        <Link href="/template" className="ms-auto">
          <Button size="sm">{back_to_library_button_label}</Button>
        </Link>
      </RenderIf>
    </header>
  );
}
