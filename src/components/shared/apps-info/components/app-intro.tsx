"use client"

import React from "react";

import type { ParamsType } from "@/services/types";

import { useGetDictionary } from "@/hooks";
import "@/styles/mark-down.css";

interface IProps {
  children: React.ReactNode;
  params: ParamsType;
}
export function AppIntroMD({ children, params }: IProps) {
  const {
    components: { info_tab },
  } =  useGetDictionary();
  return (
    <div className="flex w-full  flex-col items-start justify-start gap-2 divide-y overflow-hidden">
      <h4 className="ms-3 font-semibold">{info_tab.app_intro}</h4>
      <div className="mdStyles  h-full overflow-y-auto py-6">{children}</div>
    </div>
  );
}
