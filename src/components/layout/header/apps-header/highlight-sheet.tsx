"use client"
import React from "react";

import { Button } from "@/components/ui/button";
import { useGetDictionary } from "@/hooks";
import { useParams, usePathname } from "next/navigation";
import { TbHighlight } from "react-icons/tb";
import { iconVariants } from "@/constants/variants";
import useHighlightStore from "@/stores/zustand/highlight-store";
import { useHistoryStore } from "@/stores/zustand/history-store";

export default function HighlightSheet() {
  const { components } = useGetDictionary();
  const pathname = usePathname();
  const { lang } = useParams();
  const setHighlightIsOpen = useHighlightStore.use.setHighlightIsOpen();
  const isHighlightOpen = useHighlightStore.use.isHighlightOpen();
  const setHistoryIsOpen = useHistoryStore.use.setHistoryIsOpen();
  const isHistoryOpen = useHistoryStore.use.isHistoryOpen();
  if (pathname.includes("image") || pathname === `/${lang}/template`)
    return null;

  const toggleDrawer = () => {
    isHistoryOpen && setHistoryIsOpen(false);
    setHighlightIsOpen(!isHighlightOpen);
  };

  return (
    <>
      <Button
        variant={isHighlightOpen ? "secondary" : "outline"}
        onClick={toggleDrawer}
        className="px-2.5 md:px-4"
      >
        <TbHighlight className={iconVariants({ size: "sm" })} />
        <span className="ms-1.5 hidden md:block">
          {components.apps_header.highlight}
        </span>
      </Button>
    </>
  );
}
