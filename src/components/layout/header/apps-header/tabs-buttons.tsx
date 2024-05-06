"use client"
import React, { memo } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { cn } from "@/lib/utils";

function ToggleTabs() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const value = searchParams.get("apps-tab") ?? "run";
  const { components } = useGetDictionary();
  function onChange(val: string) {
    const currentValue = searchParams.get("apps-tab") === val;
    if (currentValue) return;
    if (!val) return;
    setSearchParams("apps-tab", val);
  }

  const tabClass =
    "w-full h-full bg-transparent transition-all duration-200 data-[state=on]:bg-background data-[state=on]:shadow-sm text-muted-foreground " +
    "data-[state=on]:!text-foreground";

  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={onChange}
      className="h-9 rounded-md bg-muted p-[1px]"
    >
      <ToggleGroupItem
        value="run"
        aria-label="Toggle run"
        data-state={value === "run" ? "on" : "off"}
        className={tabClass}
      >
        {components.apps_header.run}
      </ToggleGroupItem>
      <ToggleGroupItem
        value="info"
        aria-label="Toggle info"
        data-state={value === "info" ? "on" : "off"}
        className={tabClass}
      >
        {components.apps_header.info}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
export const TabButtons = memo(ToggleTabs);
