"use client";
import React from "react";
import { useCustomSearchParams } from "@/hooks";

interface IProps {
  children: React.ReactNode;
  appName: string;
  appSearchParamValue: string;
}
export function SetSearchParamProvider({
  children,
  appSearchParamValue,
  appName,
}: IProps) {
  useCustomSearchParams(appName, appSearchParamValue);

  return <>{children}</>;
}
