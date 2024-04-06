import React from "react";

import { Button } from "@/components/ui/button";
import { useGetDictionary } from "@/hooks";
import { useParams, usePathname } from "next/navigation";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { TbHistory } from "react-icons/tb";
import { iconVariants } from "@/constants/variants";

export function HistorySheet() {
  const { components } = useGetDictionary();
  const pathname = usePathname();
  const { lang } = useParams();
  const setHistoryIsOpen = useHistoryStore.use.setHistoryIsOpen();
  const isHistoryOpen = useHistoryStore.use.isHistoryOpen();

  if (pathname.includes("image") || pathname === `/${lang}/template`)
    return null;

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setHistoryIsOpen(!isHistoryOpen)}
        className="px-2.5 md:px-4"
      >
        <TbHistory className={iconVariants({ size: "sm" })} />
        <span className="ms-1.5 hidden md:block">
          {components.apps_header.history}
        </span>
      </Button>
    </>
  );
}
